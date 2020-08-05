var express = require('express');

const bodyParser = require('body-parser');
const User = require('../models/user');
const Post=require('../models/posts');
var passport = require('passport');
var authenticate = require('../authenticate');
var cors=require('./cors');



var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.options('*',cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
router.get('/', function (req, res, next) {
  User.find({})
    .then((users) => {

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
    }, (err) => next(err))
    .catch((err) => next(err))
});

router.get('/currentuser',authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

  User.findById(req.user._id)
  .populate({
    path: 'followers',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'followers' }
})
  .populate('following')

  .then(user=>{

    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(user);
  },(err)=>next(err))
  .catch((err)=>next(err))
})

router.post('/signup',cors.corsWithOptions, (req, res, next)=> {

  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {


      if (err) {

        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
       
        user.save((err, user) => {

          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!', user: user });
          });


        });
      }
    });
});



router.post('/login',cors.corsWithOptions, (req, res,next) => {

  passport.authenticate('local',(err,user,info) =>{

    if(err){
      return next(err);
    }
    if(!user){
      //it was not a error which occuerd
      //but a user is null

      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!',err:info });

    }
    //passport will add this method to req.user
    req.logIn(user,(err)=>{
      if(err){
        res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: false, status: 'Login Unsuccessful!',err:'Could not log in user' });

      }
    

      var token = authenticate.getToken({ _id: req.user._id });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
     
      res.json({ success: true, status: 'Login Successful!',token:token });
    });
  })(req,res,next);
});
router.get('/logout', (req, res) => {


  if (req.session) {
    req.session.destroy();
    //sesison is destroyed
    //and the info is removed form the server side
    //so we need to delete the cookie on the client side also
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }

});



router.get('/checkJWTToken',(req,res,next)=>{

  //will return true/false
  passport.authenticate('jwt',{session:false},(err,user,info)=>{

    if(err){
      return next(err);

      if(!user){
        //means the json web token expired
        res.statusCode=401;
        res.setHeader('Content-Type','application/json');
        return res.json({status:'JWT invalid',success:false,err:info})
      }
      else{

        //then user is a valid user

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        return res.json({status:'JWT invalid',success:true,user:user})
       }
    }
  })(req,res);
})

router.get('/:id',cors.cors,(req,res,next)=>{

  User.findOne({_id:req.params.id})
  .populate({
    path: 'followers',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'followers' }
})
  .populate('following')
  .then((user)=>{
    //we want to get all the posts created by the this user
    Post.find({postedBy:req.params.id})
    .populate('postedBy')
    .then((posts)=>{
      //return user and posts by that user
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({user,posts});
    })
  },(err)=>next(err))
  .catch((err)=>next(err))
})

//route to follow a user 
router.put('/:followId/follow',authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

  //followId is id of the user which we want to follow

  User.findByIdAndUpdate(req.params.followId,{
    $push:{followers:req.user._id}
  },{new:true}
  )
  .then((result)=>{

    //now update the following of logged in user or current logged in user
    User.findByIdAndUpdate(req.user._id,{
      $push:{following:req.params.followId}
    },{
      new:true,
    })
    .then((result)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))

  },(err)=>next(err))
  .catch((err)=>next(err))


})

router.put('/:unfollowId/unfollow',authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

  //followId is id of the user which we want to follow

  User.findByIdAndUpdate(req.params.unfollowId,{
    $pull:{followers:req.user._id}
  },{new:true}
  )
  .then((result)=>{

    //now update the following of logged in user or current logged in user
    User.findByIdAndUpdate(req.user._id,{
      $pull:{following:req.params.unfollowId}
    },{
      new:true,
    })
    .then((result)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))

  },(err)=>next(err))
  .catch((err)=>next(err))



})
router.put('/updatepic',authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{

  User.findByIdAndUpdate(req.user._id,{
    $set:{photo:req.body.photo}
  },{new:true,})
.then(user=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json(user);
},(err)=>next(err))
.catch((err)=>next(err))

})
router.post('/search-users',authenticate.verifyUser,cors.corsWithOptions,(req,res,next)=>{
 
 
  let userPat=new RegExp("^"+req.body.query);
  User.find({firstname:{$regex:userPat}})
    .then(user=>{
      res.json({user});
    },(err)=>next(err))
    .catch((err)=>next(err))
  
  })



module.exports = router;
