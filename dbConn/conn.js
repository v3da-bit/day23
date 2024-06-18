const mongoose=require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const db = process.env.DATABASE
const port=process.env.PORT
console.log(db,port);

mongoose.connect(db).then(()=>{
    console.log("db connection successful");
}).catch((err)=>{
    console.log(err);
})
module.exports= port