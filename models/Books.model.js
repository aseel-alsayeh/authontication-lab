'use strict';

const mongoose=require('mongoose');

/*
first define a schema 
schema: description about how the data must looklike in the database
cats:
    name:{type:String}
*/

const booksSchema= new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    status:{type:Boolean},
})



const bookModel=mongoose.model('bookModel',booksSchema)

const seedbooks=()=>{
        const bookone=new bookModel({
            name:'how to lie with statistics',
            description:'How to Lie with Statistics is a book written by Darrell Huff in 1954 presenting an introduction to statistics for the general reader. Not a statistician, Huff was a journalist who wrote many "how to" articles as a freelancer.',
            status:true

        });
        bookone.save()
        const booktwo=new bookModel({
            name:'Mein Kampf',
            description:'Mein Kampf (German: [maɪn ˈkampf]; My Struggle or My Fight) is a 1925 autobiographical manifesto by Nazi Party leader Adolf Hitler.',
            status:false 


        });
        booktwo.save()
        const bookthree=new bookModel({
            name:'Harry Potter',
            description:`Harry Potter and the Philosophers Stone is a fantasy novel written by British author J. K. Rowling `,
            status:true

        });
        bookthree.save()
        
    }

module.exports=bookModel