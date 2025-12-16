import express from 'express';
import { uploadResume, analyzeResume, matchJD, getRewriteSuggestions } from '../controllers/resumeController.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(authenticate);

router.post('/upload', upload.single('resume'), uploadResume);
router.post('/analyze/:resumeId', analyzeResume);
router.post('/match-jd/:resumeId', matchJD);
router.get('/rewrite/:resumeId', getRewriteSuggestions);

export default router;

