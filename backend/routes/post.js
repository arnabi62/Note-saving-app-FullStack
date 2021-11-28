const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post')
//const router = express.Router()
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth')
const postController = require('../controller/post')

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

router.post('', checkAuth,  multer({storage: storage}).single("image"), postController.createPost)

router.put('/:id', checkAuth, multer({storage: storage}).single("image") , postController.update)

router.delete('/:id', checkAuth, postController.deletePost)
router.get('/:id', postController.getSiglePost)
router.get('',checkAuth, postController.getAllPosts);

module.exports = router;
