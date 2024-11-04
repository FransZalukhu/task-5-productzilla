import mongoose, { Document, Schema } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  description: string;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", bookSchema);
