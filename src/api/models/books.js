const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        'Fiction',
        'Non-fiction',
        'Drama',
        'Romance',
        'Science fiction',
        'Fantasy',
        'Mystery',
        'Adventure',
        'Biography',
        'Historical',
        'Others',
      ],
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: 'books',
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
