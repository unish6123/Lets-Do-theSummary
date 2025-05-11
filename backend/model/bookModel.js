import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
  chapterName: { type: String, required: true },
  startPage: { type: Number, required: true },
  endPage: { type: Number, required: true }
});

const bookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookName: { type: String, required: true },
  image: { type: String, required: true }, // S3 URL without query params
  pdf: { type: String, required: true },   // S3 URL without query params
  chapters: [chapterSchema],
  createdAt: { type: Date, default: Date.now }
});

const bookModel = mongoose.models.Book || mongoose.model('Book', bookSchema);

export default bookModel;
