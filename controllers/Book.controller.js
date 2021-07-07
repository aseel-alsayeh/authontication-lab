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

    user.books = user.books.map((book) => {
      if (book.id === req.params.id) {
        book.name = name;
        book.description = description;
      }
      return book;
    });

    user.save();

    res.json(user);
  });
};

module.exports = { createBook, deleteBook, updateBook };
