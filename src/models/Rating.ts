import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contentType: { type: String, enum: ['movie', 'tvshow'], required: true },
  contentId: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

RatingSchema.index({ user: 1, contentType: 1, contentId: 1 }, { unique: true });

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);