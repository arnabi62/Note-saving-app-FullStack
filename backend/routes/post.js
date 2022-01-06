const express = require('express');
//const multer = require('multer');
const router = express.Router();
const Post = require('../models/post')
//const router = express.Router()
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check_auth')
const fileExtract = require('../middleware/file')
const postController = require('../controller/post')



router.post('', checkAuth,fileExtract , postController.createPost)

router.put('/:id', checkAuth, fileExtract , postController.update)

router.delete('/:id', checkAuth, postController.deletePost)
router.get('/:id', postController.getSiglePost)
router.get('',checkAuth, postController.getAllPosts);

module.exports = router;
