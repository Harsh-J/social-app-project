
const mongoose =require('mongoose');
const Scehma=mongoose.Schema;


const commentSchema=new Scehma({
   
    text:{
        type:String,
        required:true
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', //refernce to user module 
        
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post' //ref to dish model
    }
},{
    timestamps:true
});

var Comments=mongoose.model('Comment',commentSchema);
module.exports=Comments;