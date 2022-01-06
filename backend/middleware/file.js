const multer = require('multer');

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

  module.exports =  multer({storage: storage}).single("image")
