import mongoose from 'mongoose';

const TvShowSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  posterPath: { type: String },
  firstAirDate: { type: Date },
  voteAverage: { type: Number },
});

export default mongoose.models.TvShow || mongoose.model('TvShow', TvShowSchema);
