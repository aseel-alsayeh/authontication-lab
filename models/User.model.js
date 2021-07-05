'use strict';

const mongoose=require('mongoose');
const booksModel=require('./Books.model')

/*
first define a schema 
schema: description about how the data must looklike in the database
cats:
    name:{type:String}
*/

const userSchema= new mongoose.Schema({
    email:{type:String},
    books:{type:Array}
})
// const booksdata=new booksModel()
// booksdata.seedbooks()

const userModel=mongoose.model('userModel',userSchema)
const seeduser=()=>{
    const userinfo = new userModel({
        email:'aseelalsayeh97@gmail.com',
        books:[seedbooks()]
    })
console.log(userinfo.books)
}
seeduser()


module.exports=userModel