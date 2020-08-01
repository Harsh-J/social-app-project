const express=require('express');
const cors=require('cors');
const app=express();

//contains all the orignin that 
//serve is willing to accept

const whitelist=['http://localhost:3000','http://localhost:3001','https://getsocialapplication.herokuapp.com/'];
var corsOptionsDelegate=(req,callback)=>{

    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) !==-1){

        corsOptions={origin:true};
        //cors will allow the request
    }
    else{
        //req.header('origin') is not in the white list
        corsOptions={origin:false};
        //access allow origin will not be returned
        //by the server side
    }

    callback(null,corsOptions);

};


exports.cors=cors();
exports.corsWithOptions=cors(corsOptionsDelegate);
