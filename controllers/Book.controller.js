'use strict';
const userModel = require('../models/User.model');
const booksModel = require('../models/Books.model');

const createBook = (req, res) => {
  const { email, name, description, id } = req.query;
  userModel.findOne({ email: email }, (error, user) => {
    if (error) {
      res.send(error);
    }

    let book = new Object();
    book.name = name;
    book.description = description;
    book.id = id;

    const newBook = new booksModel({
      name: book.name,
      description: book.description,
      status: true,
      id: book.id,
    });

    user.books.push(newBook);

    user.save();

    res.json(user);
  });
};

const deleteBook = (req, res) => {
  const { email } = req.query;
  userModel.findOne({ email: email }, (error, user) => {
    if (error) {
      res.send(error);
    }

    user.books = user.books.filter((book) => {
      return book.id !== req.params.id;
    });

    user.save();

    res.json(user);
  });
};

const updateBook = (req, res) => {
  const { email, name, description } = req.query;
  userModel.findOne({ email: email }, (error, user) => {
    if (error) {
      res.send(error);
    }

    let x = 0;

    user.books = user.books.filter((book, i) => {
      book.id === req.params.id ? (x = i) : 0;
      return book.id !== req.params.id;
    });

    const newBook = new booksModel({
      name: name,
      description: description,
      status: true,
      id: req.params.id,
    });

    user.books.splice(x, 0, newBook);

    user.save();

    res.json(user);
  });
};

module.exports = { createBook, deleteBook, updateBook };
