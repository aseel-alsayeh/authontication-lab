'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;
const userModel = require('./models/User.model');
const booksModel = require('./models/Books.model');

mongoose.connect('mongodb://localhost:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected :)');
});

userModel.remove({}, ()=>{
  console.log("userModel was removed")
})
const bookone = new booksModel({
  name: 'how to lie with statistics',
  description:
    'How to Lie with Statistics is a book written by Darrell Huff in 1954 presenting an introduction to statistics for the general reader. Not a statistician, Huff was a journalist who wrote many "how to" articles as a freelancer.',
  status: true,
});
const booktwo = new booksModel({
  name: 'Mein Kampf',
  description:
    'Mein Kampf (German: [maɪn ˈkampf]; My Struggle or My Fight) is a 1925 autobiographical manifesto by Nazi Party leader Adolf Hitler.',
  status: false,
});
const bookthree = new booksModel({
  name: 'Harry Potter',
  description: `Harry Potter and the Philosophers Stone is a fantasy novel written by British author J. K. Rowling `,
  status: true,
});

// bookone.save();
// booktwo.save();
// bookthree.save();

const userinfo = new userModel({
  email: 'aseelalsayeh97@gmail.com',
  books: [bookone, booktwo, bookthree],
});

userinfo.save();

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

app.get('/authorize', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    res.send(user);
  });
  res.send(token);
});

app.get('/books', (req, res) => {

  userModel.find(function (err, user) {
    if (err) return res.json(err);
    res.json(user);
  });
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
