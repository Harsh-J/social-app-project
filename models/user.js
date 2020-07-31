const express=require('express');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var passportLocalMongoose=require('passport-local-mongoose');


var User=new Schema({

    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:'',
    },
    admin:{
        type:Boolean,
        default:false
    },
    photo:{
        type:String,
        default:'https://res.cloudinary.com/dndahpg5r/image/upload/v1595061489/user_eksmwe.png',
    },
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
});

User.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',User);
