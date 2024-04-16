const mongoose = require('mongoose');

const authorShcema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    image: { type: String, required: true },
    nationality: { type: String, required: true },
    books: [{ type: mongoose.Types.ObjectId, ref: 'Book' }],
  },
  {
    timestamps: true,
    collection: 'authors',
  }
);

const Author = mongoose.model('authors', authorShcema, 'authors');
module.exports = Author;
