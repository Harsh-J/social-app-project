const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate=require('../authenticate');
const cors=require('./cors');

const Post=require('../models/posts');

const { authorize } = require('passport');
const posts = require('../models/posts');


const postsRouter=express.Router();
postsRouter.use(bodyParser.json());

postsRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.get(cors.cors,(req,res,next)=>{

    Post.find(req.query)
    .populate('postedBy')
    .populate('comments.postedBy')
    .sort('-createdAt')
    .then((posts)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(posts);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

.post(authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{
    if(req.body!==null){

    req.body.postedBy=req.user;

    Post.create(req.body)
    .then((post)=>{
        console.log('Post created',post);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(post);
    },(err)=>next(err))
    .catch((err)=>next(err));

}

})
.put(authenticate.verifyUser,(req,res,next)=>{

    res.json('PUT operation not supported');
})
.delete(authenticate.verifyUser,(req,res,next)=>{

    Post.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err))


})

//creating a route to see all the post of a particular user
postsRouter.route('/myposts')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})

.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
  

    Post.find({postedBy:req.user._id})
    .populate('postedBy')
    .populate('postedBy.followers')
    .populate('postedBy.following')
    .then((posts)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(posts);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

postsRouter.route('/:postId/like')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.put(authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

    Post.findByIdAndUpdate(req.params.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    

    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
postsRouter.route('/:postId/unlike')
.put(authenticate.verifyUser,(req,res,next)=>{

    Post.findByIdAndUpdate(req.params.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

postsRouter.route('/:postId/comment')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.put(authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }

    Post.findByIdAndUpdate(req.params.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate('postedBy')
    .populate('comments.postedBy')
    

    .then((result)=>{
        
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

postsRouter.route('/:postId/delete')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.delete(authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{


    Post.findOne({_id:req.params.postId})
    .populate('postedBy',"_id")
    .then((post)=>{

        if(post.postedBy._id.toString() === req.user._id.toString()){
            //go on a deleting the post
            post.remove()
            .then((result)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(result);
            },(err)=>next(err))
        }
    },(err)=>next(err))
    .catch((err)=>next(err))
})

//making a route for :dishId/comments
postsRouter.route('/getSubPosts')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    
    Post.find({postedBy:{$in:req.user.following}})
    .populate('postedBy')
    .populate('comments.postedBy')
    .sort('-createdAt')
    .then((posts)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(posts);
    },(err)=>next(err))
    .catch((err)=>next(err))
})




module.exports=postsRouter;