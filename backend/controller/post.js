const Post = require('../models/post')

exports.createPost = (req,res,next)=>{
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
 }

 exports.update = (req,res,next)=>
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

       // console.log(p);
       p.save().then(result=>{
         //console.log(result);
         res.status(200).json({message:"update Succeful!", image:imagePath});
       }).catch(()=>
       {
         res.status(500).json({message:"Unable to update"})
       })
     }
       else
     {
       res.status(401).json({message:"Not autherized"})
     }
     }
     else
     {
      res.status(401).json({message:"Not autherized"})
     }
   })
}

exports.deletePost = (req,res,next)=>
{

  Post.deleteOne({_id: req.params.id, creator:req.userData.userId}).then(
    result => {

      if(result.n>0){

      res.status(200).json({message: 'Post deleted'})
    }
    else
    {
      res.status(401).json({message:"Not Autherized"})
    }
    }
  ).catch(()=>
      {
        res.status(500).json({message:"Unable to delete"})
      })
 // console.log("hi");

}

exports.getSiglePost = (req,res,next)=>
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
}

exports.getAllPosts = (req, res, next)=>
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
}
