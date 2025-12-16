import express from 'express';
import { getAnalyses, getResumes, getAnalysis } from '../controllers/dashboardController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/analyses', getAnalyses);
router.get('/analyses/:resumeId', getAnalysis);
router.get('/resumes', getResumes);

export default router;

