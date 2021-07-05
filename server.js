'use strict';

require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;
const userModel =require('./models/User.model')
const booksModel =require('./models/Books.model')



mongoose.connect('mongodb://localhost:27017/user',
    { useNewUrlParser: true, useUnifiedTopology: true }
);


const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey=(header, callback)=>{
  client.getSigningKey(header.kid, function(err, key) {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
}

app.get('/authorize',(req,res)=>{
  const token=req.headers.authorization.split(' ')[1];
  jwt.verify(token,getKey,{},(err,user)=>{
      if(err){
          res.send('invalid token');
      }
      res.send(user)
  })
  res.send(token);
});

app.get('/test', (request, response) => {

  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
