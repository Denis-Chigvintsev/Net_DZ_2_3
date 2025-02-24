const express = require('express');
const all_router = express.Router();
const app = require('../app.js');
const { v4: uuidv4 } = require('uuid');
// под all_имеется ввиду когда запросы идут без :/id

const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

all_router.use(expressLayouts);

all_router.use(express.urlencoded({ extended: false }));

all_router.use(express.static(`${__dirname}`));

class Book {
  constructor(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
    id = uuidv4()
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

/////блок функций
function getAllBooks(req, res) {
  const { books } = app.store;
  res.send(books);
  res.render('index.ejs', { books });
}
function postNewBook(req, res) {
  const { books } = app.store;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );

  // console.log(  );

  books.push(newBook);
  //res.status(201);
  //res.send(newBook);

  res.redirect(`/api/books/${newBook.id}`);
}

all_router.use(express.static(`${__dirname}`));

all_router.get('/', (req, res) => {
  res.status = 200;
  let { books } = app.store;
  res.render('index.ejs', { books });
});

////

all_router.get('/add_book', (req, res) => {
  //res.status = 200;
  res.render('add_book.ejs');
});
all_router.post('/add_book', (req, res) => {
  //res.status = 200;
  const { books } = app.store;
  const {
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  } = req.body;

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );
  books.push(newBook);
  res.redirect('/');
});

////блок маршрутов
all_router.get('/', getAllBooks); //
all_router.post('/', postNewBook); //

module.exports = all_router;
