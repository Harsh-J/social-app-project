
const mongoose =require('mongoose');
const Scehma=mongoose.Schema;


const likeSchema=new Scehma({
   
    postedBy:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post' //ref to dish model
    }
},{
    timestamps:true
});

var Likes=mongoose.model('Like',likeSchema);
module.exports=Likes;