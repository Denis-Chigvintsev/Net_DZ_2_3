// под id пониммаем , что здесь мы берем те маршруты которые идут с :/id

const express = require('express');
const id_router = express.Router();
const app = require('../app.js');
id_router.use(express.static(`${__dirname}`));

////////////////////////////блок функций и ниже блок маршрутов///////////////

function getBookByID(req, res) {
  const { books } = app.store;

  let idx = books.findIndex((el) => el.id == id);
  if (idx == -1) {
    res.status(404);
    res.send('404 | данные не найдены');
  } else {
    /*res.send(books[idx]);*/ let i_book = books[idx];

    res.render('book_info.ejs', { i_book });
  }
}
//res.render('index.ejs', { books });

function editBookByID(req, res) {
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

  let idx = books.findIndex((el) => el.id == id);
  if (idx == -1) {
    res.status(404);
    res.send('404 | данные не найдены');
  } else {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    };
  }
  res.send(books[idx]);
}

function deleteBookByID(req, res) {
  const { books } = app.store;

  let idx = books.findIndex((el) => el.id == id);
  if (idx == -1) {
    res.status(404);
    res.send('404 | данные не найдены');
  } else {
    books.splice(idx, 1);
    res.status(201);
    res.send('OK');
  }
}
let id;
////блок маршрутов
id_router.param('id', (req, res, next, val) => {
  id = val;
  next();
});

function edit_form(req, res) {
  const { books } = app.store;

  let idx = books.findIndex((el) => el.id == id);
  if (idx == -1) {
    res.status(404);
    res.send('404 | данные не найдены');
  } else {
    let i_book = books[idx];
    res.render('edit_book', { i_book });
  }
}

id_router.get('/:id', getBookByID); ///

id_router.get('/:id/edit_form', edit_form);
id_router.put('/:id', editBookByID); ///
id_router.delete('/:id', deleteBookByID); ///

module.exports = id_router;
