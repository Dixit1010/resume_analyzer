import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const MAX_RETRIES = 3;
const MAX_TOKENS = 4000;

const truncateText = (text, maxLength = 10000) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const parseJSONResponse = (response) => {
  try {
    const content = response.choices[0].message.content.trim();
    
    // With json_object format, content should be valid JSON
    // But handle markdown code blocks as fallback
    let jsonStr = content;
    if (content.startsWith('```')) {
      const match = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) jsonStr = match[1];
    }
    
    return JSON.parse(jsonStr);
  } catch (error) {
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
};

export const analyzeATS = async (resumeText) => {
  const truncatedText = truncateText(resumeText, 8000);
  
  const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility. Return ONLY valid JSON, no other text.

Resume text:
${truncatedText}

Return JSON in this exact format:
{
  "ats_score": <number 0-100>,
  "missing_skills": [<array of missing important skills>],
  "weak_sections": [<array of section names that need improvement>],
  "bullet_improvements": [
    {
      "original": "<original bullet point>",
      "improved": "<improved version with action verbs and quantification>",
      "reason": "<brief explanation>"
    }
  ]
}

Evaluate based on:
- Keyword relevance and density
- Section completeness (summary, experience, skills, education)
- Quantification in achievements
- Action verb usage
- Formatting and structure`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert ATS analyzer. Always return valid JSON only, no markdown, no explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' }
    });

    return parseJSONResponse(response);
  } catch (error) {
    throw error;
  }
};

export const matchJobDescription = async (resumeText, jobDescription) => {
  const truncatedResume = truncateText(resumeText, 6000);
  const truncatedJD = truncateText(jobDescription, 4000);
  
  const prompt = `Compare this resume against the job description. Return ONLY valid JSON, no other text.

Resume:
${truncatedResume}

Job Description:
${truncatedJD}

Return JSON in this exact format:
{
  "match_percentage": <number 0-100>,
  "missing_skills": [<array of required skills from JD that are missing>],
  "suggested_changes": [<array of specific suggestions to improve match>]
}

Calculate match based on:
- Required skills presence
- Experience alignment
- Keyword matching
- Qualification fit`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert recruiter. Always return valid JSON only, no markdown, no explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' }
    });

    return parseJSONResponse(response);
  } catch (error) {
    throw error;
  }
};

export const generateRewriteSuggestions = async (resumeText) => {
  const truncatedText = truncateText(resumeText, 8000);
  
  const prompt = `Analyze this resume and provide specific rewrite suggestions. Return ONLY valid JSON, no other text.

Resume:
${truncatedText}

Return JSON in this exact format:
{
  "bullet_improvements": [
    {
      "original": "<exact original bullet point>",
      "improved": "<improved version with strong action verbs, quantification, and ATS-friendly language>",
      "reason": "<brief explanation of improvement>"
    }
  ],
  "overall_feedback": "<brief overall feedback>"
}

Focus on:
- Replacing weak verbs with strong action verbs
- Adding quantification (numbers, percentages, metrics)
- Making language more ATS-friendly
- Improving impact and clarity`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer. Always return valid JSON only, no markdown, no explanations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: MAX_TOKENS,
      response_format: { type: 'json_object' }
    });

    return parseJSONResponse(response);
  } catch (error) {
    throw error;
  }
};

