const express=require('express');
const mongoose=require('mongoose');

const postSchmea=new mongoose.Schema({

    title:{
        type:String,
        default:'',
    },
    body:{
        type:String,
        default:'',
    },
    photo:{
        type:String,
        required:true,
    },
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    comments:[
        {
            text:String,
            postedBy:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
        }
    ],

    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', //refernce to user module  
    }
},{timestamps:true})

module.exports=mongoose.model('Post',postSchmea);
