const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userController = require('../controller/user')

router.post("/signup", userController.createuser)

router.post("/login", userController.userLogin)



module.exports = router;
