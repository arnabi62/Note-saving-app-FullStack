const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post')
//const router = express.Router()
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth')

const MIME_TYPE ={
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
destination: (req, file, cb) =>
{
  const isvalid = MIME_TYPE[file.mimetype];
  let error = new Error("invalid file type");
  if(isvalid)
  {
    error= null;
  }
  cb(null, 'backend/images');
},
filename: (req,file, cb) =>
{
  const name= file.originalname.toLowerCase().split(' ').join('_');
  const ext = MIME_TYPE[file.mimetype];
  cb(null, name+'_'+Date.now()+'.'+ext);
}
  })

router.post('', checkAuth,  multer({storage: storage}).single("image"), (req,res,next)=>{
  const url = req.protocol+'://'+req.get("host");
 // console.log(url);
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    date:new Date(req.body.date),
    imagePath: url+ "/images/" + req.file.filename,
    creator: req.userData.userId
  })
  //const post= req.body;
 post.save().then(createdpost =>
    {
      console.log("saved")
      res.status(201).json({
        message: 'Post added succesfully',
        id:createdpost._id,
        p:createdpost.imagePath
      });
    });
 })

router.put('/:id', checkAuth, multer({storage: storage}).single("image") , (req,res,next)=>
{
let imagePath= req.body.imagePath;
if(req.file)
{
  const url = req.protocol+'://'+req.get("host");
  imagePath = url+ "/images/" + req.file.filename
}
  Post.findById(req.params.id).then(p=>{
    if(p)
    {

      if(p.creator == req.userData.userId){
      p.title = req.body.title
      p.content= req.body.content
      p.date = new Date(req.body.date)
      p.imagePath = imagePath

      console.log(p);
      p.save().then(result=>{
        console.log(result);
        res.status(200).json({message:"update Succeful!", image:imagePath});
      }).catch((p)=>{
          console.log("error", p);})
      }
      else
    {
      res.status(401).json({message:"unautherize"})
    }
    }
    else
    {
      res.status(400).json({message:"unable to fetch"})
    }
  })

})

router.delete('/:id', checkAuth, (req,res,next)=>
{

  Post.deleteOne({_id: req.params.id, creator:req.userData.userId}).then(
    result => {
      console.log(result);
      if(result.n>0){
      console.log(result);
      res.status(200).json({message: 'deleted'})
    }
    else
    {
      res.status(401).json({message:"unautherized"})
    }
    }
  )
 // console.log("hi");

})
router.get('/:id', (req,res,next)=>
{
  Post.findById(req.params.id).then(p=>{
    if(p)
    {
      res.status(200).json(p);
    }
    else
    {
      res.json(400).json({message:"unable to fetch"})
    }
  })
})
router.get('',checkAuth, (req, res, next)=>
{
  const pageSize = +req.query.pageSize;
  const currpage = +req.query.page;
  const postQuery = Post.find({creator:req.userData.userId});
  let fetchedPost;
  if(pageSize && currpage){
    postQuery.skip(pageSize * (currpage - 1)).limit(pageSize);
  }
  if(!postQuery)
    res.status(200).json({message:"no post"})
  postQuery.then(doc =>
    {
      fetchedPost =doc;
      return Post.countDocuments()
    }
  ).then(
    (count)=>
    {
      res.status(200).json({message:"successful", post:fetchedPost, maxPost:count});
    });
});

module.exports = router;
