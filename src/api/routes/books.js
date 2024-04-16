const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getBooks,
  getBookById,
  getBooksByGenre,
  postBook,
  putBook,
  deleteBook,
  getBooksNotVerified,
} = require('../controllers/books');

const booksRouter = require('express').Router();

booksRouter.get('/not-verified', [isAdmin], getBooksNotVerified);
booksRouter.get('/genre/:genre', getBooksByGenre);

booksRouter.get('/:id', getBookById);

booksRouter.get('/', getBooks);

booksRouter.post('/', [isAuth], upload.single('image'), postBook);

booksRouter.put('/:id', [isAdmin], upload.single('image'), putBook);

booksRouter.delete('/:id', [isAdmin], deleteBook);

module.exports = booksRouter;
