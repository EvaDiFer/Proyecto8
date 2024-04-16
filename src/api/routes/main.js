const authorsRouter = require('./authors');
const booksRouter = require('./books');
const usersRoutes = require('./users');

const mainRouter = require('express').Router();

mainRouter.use('/authors', authorsRouter);
mainRouter.use('/books', booksRouter);
mainRouter.use('/users', usersRoutes);

module.exports = mainRouter;
