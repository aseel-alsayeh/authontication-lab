'use strict';
const userModel = require('../models/User.model');
const booksModel = require('../models/Books.model');

const createBook=(req,res)=>{
    const { userEmail,bookName } = req.body;
    userModel.findOne({ email: userEmail }, (error, userData) => {
        if (error) {
            res.send(error)
        } 
        // here we are going to add the new cat
        const newBook={ name: bookName }
        console.log(userData)
        userData.books.push(newbook);
        userData.save();
        res.json(userData);

    })
}

module.exports={
    
    createBook,
}