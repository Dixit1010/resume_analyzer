import Analysis from '../models/Analysis.js';
import Resume from '../models/Resume.js';

export const getAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.userId })
      .populate('resumeId', 'fileName uploadedAt')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(analyses.map(analysis => ({
      id: analysis._id,
      resumeId: analysis.resumeId?._id,
      resumeName: analysis.resumeId?.fileName,
      atsScore: analysis.atsScore,
      jdMatchScore: analysis.jdMatchScore,
      createdAt: analysis.createdAt
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const { resumeId } = req.params;
    
    const analysis = await Analysis.findOne({ 
      resumeId, 
      userId: req.userId 
    }).populate('resumeId', 'fileName uploadedAt');

    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      id: analysis._id,
      resumeId: analysis.resumeId?._id,
      atsScore: analysis.atsScore,
      jdMatchScore: analysis.jdMatchScore,
      missingSkills: analysis.missingSkills,
      weakSections: analysis.weakSections,
      bulletImprovements: analysis.bulletImprovements,
      createdAt: analysis.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId })
      .sort({ uploadedAt: -1 })
      .limit(50);

    res.json(resumes.map(resume => ({
      id: resume._id,
      fileName: resume.fileName,
      fileUrl: resume.fileUrl,
      uploadedAt: resume.uploadedAt
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

