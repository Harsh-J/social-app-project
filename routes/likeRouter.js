const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const authenticate=require('../authenticate');
const cors=require('./cors');

const Likes=require('../models/likes');

const likeRouter=express.Router();
likeRouter.use(bodyParser.json());

likeRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})
.get(cors.cors,(req,res,next)=>{

    Likes.find(req.query)
    .populate('postedBy')
    
    .then((likes)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(likes);
                
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    //check if the body contains the comment
    if(req.body!=null){

        req.body.postedBy=req.user._id;
        //we will add author prop
        //to the comment
        Likes.create(req.body)
        .then((like)=>{ 

            //we need to popluate author info
            Likes.findById(like._id)
            .populate('postedBy')
            .then((like)=>{

                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(like);
            })
            
        },(err)=>next(err))
        .catch((err)=>next(err));
    }
    else{

        err=new Error('Comment not found in request body');
        err.status=404;
        return next(err);
    }
    
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{

    res.statusCode = 403;
    res.end('PUT operation not supported on /comments/');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{

    //remove all the comments from the document

   Likes.remove({})
   
    .then((resp)=>{

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});


likeRouter.route('/unlike')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=(200);})

.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{

    Likes.deleteMany({"postId":req.body.postId,"postedBy":req.user._id})
    .then((resp) => {

       
      

            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
         },(err)=>next(err))
         .catch((err)=>next(err))
        }
);


   


           
   

module.exports=likeRouter;