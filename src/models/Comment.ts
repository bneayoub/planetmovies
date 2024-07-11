import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contentType: { type: String, enum: ['movie', 'tvshow'], required: true },
  contentId: { type: Number, required: true },
  text: { type: String, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface IComment extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  contentType: 'movie' | 'tvshow';
  contentId: number;
  text: string;
  upvotes: mongoose.Types.ObjectId[];
  downvotes: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.models.Comment as mongoose.Model<IComment> || mongoose.model<IComment>('Comment', CommentSchema);