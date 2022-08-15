const { addBooksHandler, getAllBooksHandler, getBookByIdHandler, editeBookByIdHandler, deleteBookByIdHandler } = require("../handler/book.handlers");
const routes = [
  // Create a new book
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
  },
  // Get all books
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  // Get a book by id
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  // Update a book by id
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editeBookByIdHandler,
  },
  // Delete a book by id
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
