const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/user")

const mongoose = require('mongoose');
const user = require('../models/user');

router.post("/signup", (req,res,next)=>
{

  bcrypt.hash(req.body.password, 10).then(

    hash=>{
      const u = new user({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      u.save().then(result=>

        // User.find(u.email).then(p=>
        //   {
        //   if(p)
        //   {
        //     res.status(500).json({message:"emailId alreay exists"});
        //   }
        //   else
          {
           res.status(201).json({message:"Saved successfully", user:u});
          }


      ).catch(
        err=>
        {
          res.status(500).json({error:err})
        }
      )
    })


})

router.post("/login", (req,res,next)=>
{
  let fetched_user;
  User.findOne({email:req.body.email}).then(
    u => {

      if(!u)
      {

       return res.status(401).json({message:"Auth failed1"});
      }
      fetched_user = u;
     return  bcrypt.compare(req.body.password, u.password)
    }).then(result =>
      {

        if(!result)
        {
          return res.status(401).json({message:"Auth failed2"});
        }
        const token = jwt.sign({email :fetched_user.email, id: fetched_user._id}, "secret_long_string", {expiresIn: "1h"});
        //console.log("token:"+token);
        res.status(200).json({token:token, name:fetched_user.name, id:fetched_user._id, expiresIn:3600})
      })
      .catch(

        err => { return res.status(401).json({message:"Auth failed3"});}
      )
})



module.exports = router;
