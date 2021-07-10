'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String },
  books: { type: Array },
});

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;
