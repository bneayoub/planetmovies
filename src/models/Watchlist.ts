import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contentType: { type: String, enum: ['movie', 'tvshow'], required: true },
  contentId: { type: Number, required: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  addedAt: { type: Date, default: Date.now },
});

WatchlistSchema.index({ user: 1, contentType: 1, contentId: 1 }, { unique: true });

export default mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema);