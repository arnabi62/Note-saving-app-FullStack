const express= require('express');
const bodyParser =require('body-parser')
const app=express();
const path= require('path')
//const Post = require('./models/post')
//const router = express.Router()
const mongoose = require('mongoose');
const postRoute = require('./routes/post');
const userRoute = require('./routes/user')

mongoose.connect('mongodb+srv://arnabi:arnabi@cluster0.dyo7z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true},
{ useUnifiedTopology: true } ).then(
  ()=>{console.log("connected")}
).catch(
  ()=> {console.log("connection failed")}
)
// app.use(bodyParser.json());
app.use(express.json())
app.use("/images", express.static(path.join('backend/images')))

app.use((req, res, next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With,auth');
 res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS,USE');
  next();
});


app.use("/post", postRoute);
app.use("/user", userRoute);

module.exports = app;
