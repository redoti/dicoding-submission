const {insertBookHandler} = require('./handler');

const routes = [
  {

    method: 'POST',
    path: '/books',
    handler: insertBookHandler,

  },

];

module.exports = routes;

