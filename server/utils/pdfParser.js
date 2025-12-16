import pdfParse from 'pdf-parse';
import fs from 'fs';

export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text || '';
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};

