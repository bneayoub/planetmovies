import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  tmdbId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  posterPath: { type: String },
  releaseDate: { type: Date },
  voteAverage: { type: Number },
});

export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema);