const { nanoid } = require("nanoid");
const books = require("../data/books");

module.exports = {
  addBooksHandler: (request, h) => {
    if (!request.payload.name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (request.payload.readPage > request.payload.pageCount) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const id = nanoid(16);
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage ? true : false;

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
      insertedAt: insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    });

    response.code(500);
    return response;
  },

  getAllBooksHandler: (request, h) => {
    if (request.query.name) {
      const book = books.filter((book) => book.name.toLowerCase().includes(request.query.name.toLowerCase()));

      if (book !== undefined) {
        return h.response({
          status: "success",
          data: {
            books: book.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }
    }

    if (request.query.reading) {
      const book = books.filter((book) => book.reading === !!Number(request.query.reading));

      if (book !== undefined) {
        return h.response({
          status: "success",
          data: {
            books: book.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }
    }

    if (request.query.finished) {
      const book = books.filter((book) => book.finished === !!Number(request.query.finished));

      if (book !== undefined) {
        return h.response({
          status: "success",
          data: {
            books: book.map((book) => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            })),
          },
        });
      }
    }

    return h.response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
  },

  getBookByIdHandler: (request, h) => {
    const book = books.filter((book) => book.id === request.params.bookId)[0];

    if (book !== undefined) {
      return {
        status: "success",
        data: {
          book,
        },
      };
    }

    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });

    response.code(404);
    return response;
  },

  editeBookByIdHandler: (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    if (!request.payload.name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (request.payload.readPage > request.payload.pageCount) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const index = books.findIndex((book) => book.id === request.params.bookId);

    if (index === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

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
    }

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  },

  deleteBookByIdHandler: (request, h) => {
    const index = books.findIndex((book) => book.id === request.params.bookId);

    if (index === -1) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    if (index !== -1) {
      books.splice(index, 1);
      return h
        .response({
          status: "success",
          message: "Buku berhasil dihapus",
        })
        .code(200);
    }

    return h
      .response({
        status: "fail",
        message: "Gagal menghapus buku",
      })
      .code(500);
  },
};
