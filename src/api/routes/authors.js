const { isAuth, isAdmin } = require('../../middlewares/auth');
const upload = require('../../middlewares/file');
const {
  getAuthors,
  getAuthorById,
  postAuthor,
  putAuthor,
  deleteAuthor,
} = require('../controllers/authors');

const authorsRouter = require('express').Router();

authorsRouter.get('/:id', getAuthorById);

authorsRouter.get('/', getAuthors);

authorsRouter.post('/', [isAdmin], upload.single('image'), postAuthor);

authorsRouter.put('/:id', [isAdmin], upload.single('image'), putAuthor);

authorsRouter.delete('/:id', [isAdmin], deleteAuthor);

module.exports = authorsRouter;
