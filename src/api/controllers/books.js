const { deleteFile } = require('../../utils/deleteFile');
const Book = require('../models/books');

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ verified: true });
    // console.log(books);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json('Error al obtener los libros');
  }
};

const getBooksNotVerified = async (req, res, next) => {
  try {
    const books = await Book.find({ verified: false });
    // console.log(books);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json('Error al obtener los libros');
  }
};

const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).json('Error al obtener el libro por ID');
  }
};

const getBooksByGenre = async (req, res, next) => {
  try {
    const { genre } = req.params;
    const books = await Book.find({ genre });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json('Error al obtener los libros por género');
  }
};

const postBook = async (req, res, next) => {
  try {
    const newBook = new Book(req.body);

    if (req.file) {
      newBook.image = req.file.path;
    }

    if (req.user.roles === 'admin') {
      newBook.verified = true;
    } else {
      newBook.verified = false;
    }

    const bookSaved = await newBook.save();
    return res.status(201).json(bookSaved);
  } catch (error) {
    return res.status(400).json('Error al crear un nuevo libro');
  }
};

const putBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBook = new Book(req.body);
    newBook._id = id;

    if (req.file) {
      newBook.image = req.file.path;
      const oldBook = await Book.findById(id);
      deleteFile(oldBook.image);
    }

    const bookUpdated = await Book.findByIdAndUpdate(id, newBook, {
      new: true,
    });
    return res.status(200).json(bookUpdated);
  } catch (error) {
    return res.status(400).json('Error al actualizar el libro');
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bookDeleted = await Book.findByIdAndDelete(id);
    deleteFile(bookDeleted.image);
    return res.status(200).json(bookDeleted);
  } catch (error) {
    return res.status(400).json('Error al eliminar el libro');
  }
};

module.exports = {
  getBooks,
  getBookById,
  getBooksByGenre,
  postBook,
  putBook,
  deleteBook,
  getBooksNotVerified,
};
