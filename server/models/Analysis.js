import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  atsScore: {
    type: Number,
    min: 0,
    max: 100
  },
  jdMatchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  jobDescription: {
    type: String,
    default: ''
  },
  missingSkills: [{
    type: String
  }],
  weakSections: [{
    type: String
  }],
  bulletImprovements: [{
    original: String,
    improved: String,
    reason: String
  }],
  feedback: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Analysis', analysisSchema);

