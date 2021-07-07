'use strict';

const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  status: { type: Boolean },
  id: { type: String },
});

const bookModel = mongoose.model('bookModel', booksSchema);

module.exports = bookModel;
