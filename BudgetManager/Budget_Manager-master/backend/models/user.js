const mongoose=require('mongoose');
const user=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
},{timestamps:true});
module.exports=mongoose.model('User',user);