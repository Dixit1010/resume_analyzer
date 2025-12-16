import Resume from '../models/Resume.js';
import Analysis from '../models/Analysis.js';
import { extractTextFromPDF } from '../utils/pdfParser.js';
import { analyzeATS, matchJobDescription, generateRewriteSuggestions } from '../services/aiService.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const extractedText = await extractTextFromPDF(req.file.path);

    if (!extractedText || extractedText.trim().length < 50) {
      return res.status(400).json({ error: 'Failed to extract text from PDF or resume is too short' });
    }

    const resume = new Resume({
      userId: req.userId,
      fileUrl,
      fileName: req.file.originalname,
      extractedText
    });

    await resume.save();

    res.status(201).json({
      id: resume._id,
      fileUrl: resume.fileUrl,
      fileName: resume.fileName,
      uploadedAt: resume.uploadedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    if (!resume.extractedText || resume.extractedText.trim().length < 50) {
      return res.status(400).json({ error: 'Resume text is too short for analysis' });
    }

    const aiResult = await analyzeATS(resume.extractedText);

    const analysis = new Analysis({
      resumeId: resume._id,
      userId: req.userId,
      atsScore: aiResult.ats_score,
      missingSkills: aiResult.missing_skills || [],
      weakSections: aiResult.weak_sections || [],
      bulletImprovements: aiResult.bullet_improvements || [],
      feedback: JSON.stringify(aiResult)
    });

    await analysis.save();

    res.json({
      id: analysis._id,
      atsScore: analysis.atsScore,
      missingSkills: analysis.missingSkills,
      weakSections: analysis.weakSections,
      bulletImprovements: analysis.bulletImprovements,
      createdAt: analysis.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const matchJD = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({ error: 'Job description is required and must be at least 50 characters' });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const aiResult = await matchJobDescription(resume.extractedText, jobDescription);

    const analysis = await Analysis.findOneAndUpdate(
      { resumeId: resume._id, userId: req.userId },
      {
        jdMatchScore: aiResult.match_percentage,
        jobDescription: jobDescription.trim(),
        missingSkills: aiResult.missing_skills || [],
        $push: {
          bulletImprovements: {
            $each: (aiResult.suggested_changes || []).map(change => ({
              original: '',
              improved: change,
              reason: 'JD Match Suggestion'
            }))
          }
        }
      },
      { new: true, upsert: true }
    );

    res.json({
      id: analysis._id,
      matchPercentage: analysis.jdMatchScore,
      missingSkills: analysis.missingSkills,
      suggestedChanges: aiResult.suggested_changes || [],
      createdAt: analysis.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRewriteSuggestions = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId: req.userId });
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const aiResult = await generateRewriteSuggestions(resume.extractedText);

    res.json({
      bulletImprovements: aiResult.bullet_improvements || [],
      overallFeedback: aiResult.overall_feedback || ''
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

