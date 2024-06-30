const mongoose = require('mongoose')
const income = new mongoose.Schema({
    userName:{
        type:String,
        // required:true,
        trim:true
       },
    title:{
        type: String,
        required: true,
        trim: true,
    }
    ,
    amount:{
        type: Number,
        required:true,
        trim:true,
    }
    ,
    type:{
        type: String,
        default:"Income"
    }
    ,
    date:{
        type:Date,
        required:true
    }
    ,
    category:{
        type:String,
        trim:true,
    }
    ,
    descritption:{
        type:String,
        max_length: 50,
        trim:true,
    }
},{timestamps:true})

module.exports = mongoose.model('Income',income)