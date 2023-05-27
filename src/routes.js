const {insertBookHandler, getAllBooksHandler,
  getBookByIdHandler, editBookByIdHandler} = require('./handler');

const routes = [
  {

    method: 'POST',
    path: '/books',
    handler: insertBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
];

module.exports = routes;

