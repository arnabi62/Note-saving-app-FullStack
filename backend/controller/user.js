const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require("../models/user")
const user = require("../models/user")
exports.createuser = (req,res,next)=>
{

  bcrypt.hash(req.body.password, 10).then(

    hash=>{
      const u = new user({
        name: req.body.name,
        email: req.body.email,
        password: hash
      });
      //console.log(u);
      u.save().then(result=>

          {
           res.status(201).json({message:"Saved successfully", user:u});
          }


      ).catch(
        err=>
        {
          res.status(500).json({message:"Email id Already exists"})
        }
      )
    })
}

exports.userLogin = (req,res,next)=>
{
  let fetched_user;
  User.findOne({email:req.body.email}).then(
    u => {

      if(!u)
      {

       return res.status(401).json({message:"Email id does not exists"});
      }
      fetched_user = u;
     return  bcrypt.compare(req.body.password, u.password)
    }).then(result =>
      {

        if(!result)
        {
          return res.status(401).json({message:"Invalid credetials"});
        }
        const token = jwt.sign({email :fetched_user.email, id: fetched_user._id}, "secret_long_string", {expiresIn: "1h"});
        //console.log("token:"+token);
        res.status(200).json({token:token, name:fetched_user.name, id:fetched_user._id, expiresIn:3600})
      })
      .catch(

        err => { return res.status(401).json({message:"Auth failed3"});}
      )
}
