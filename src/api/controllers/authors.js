const { deleteFile } = require('../../utils/deleteFile');
const Author = require('../models/authors');

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate('books');
    return res.status(200).json(authors);
  } catch (error) {
    console.error(error); // Agrega esta línea para verificar si hay errores
    return res.status(400).json('Error al obtener los autores');
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id).populate('books');
    return res.status(200).json(author);
  } catch (error) {
    return res.status(400).json('Error al obtener el autor por ID');
  }
};

const postAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body);

    if (req.file) {
      newAuthor.image = req.file.path;
    }
    const authorSaved = await newAuthor.save();
    return res.status(201).json(authorSaved);
  } catch (error) {
    return res.status(400).json('Error al crear un nuevo autor');
  }
};

const putAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldAuthor = await Author.findById(id);
    const newAuthor = new Author(req.body);
    newAuthor._id = id;
    const books = req.body.books || [];
    newAuthor.books = [...oldAuthor.books, ...books];
    if (req.file) {
      newAuthor.image = req.file.path;
      deleteFile(oldAuthor.image);
    }

    const authorUpdated = await Author.findByIdAndUpdate(id, newAuthor, {
      new: true,
    });
    return res.status(200).json(authorUpdated);
  } catch (error) {
    return res.status(400).json('Error en la solicitud');
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const authorDeleted = await Author.findByIdAndDelete(id);
    deleteFile(authorDeleted.image);
    return res.status(200).json(authorDeleted);
  } catch (error) {
    return res.status(400).json('Error al eliminar el autor');
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  postAuthor,
  putAuthor,
  deleteAuthor,
};
