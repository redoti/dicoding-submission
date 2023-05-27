const {nanoid} = require('nanoid');
const books = require('./books');

// / START OF POST insertBookHandler =================================
const insertBookHandler = (request, h) => {
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage) ? true : false;

  // verify name book
  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // verify readpage
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
    finished,
  };
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// / END OF POST insertBookHandler =================================

// / START OF GET getAllBooksHandler =================================

const getAllBooksHandler = (request) => {
  const {name, reading, finished} = request.query;

  let filteredBooks = books;
  // // [OPTIONAL query name]
  if (name) {
    const lowercaseName = name.toLowerCase();
    filteredBooks = filteredBooks.filter(
        (book) => book.name.toLowerCase().includes(lowercaseName),
    );
  }
  // // [OPTIONAL query reading]
  if (reading) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) =>
      book.reading === isReading);
  }
  // // [OPTIONAL query finished]
  if (finished) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) =>
      book.finished === isFinished);
  }

  return {
    status: 'success',
    data: {
      books: filteredBooks.map(({id, name, publisher}) => ({
        id,
        name,
        publisher,
      })),
    },
  };
};


// / END OF GET getAllBooksHandler ===================================

// / START OF GET getBookByIdHandler =================================

const getBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const book = books.find((book) => book.id === id);

  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};


// / END OF GET getBookByIdHandler =================================

// / START OF PUT editBookByIdHandler ==============================

const editBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// / END OF PUT editBookByIdHandler ==============================

// / START OF DEL deleteBookByIdHandler ==============================


const deleteBookByIdHandler = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {insertBookHandler, getAllBooksHandler, getBookByIdHandler,
  editBookByIdHandler, deleteBookByIdHandler};

