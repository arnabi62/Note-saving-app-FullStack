const jwt = require('jsonwebtoken');

module.exports = (req, res, next ) =>
{
  try{
  const token = req.headers.auth.split(" ")[1];
  //console.log(token);
  const decodedToken = jwt.verify(token, "secret_long_string");
  req.userData = {email: decodedToken.email, userId: decodedToken.id};
  next();
  }
  catch(err)
  {
    res.status(401).json({message: "failed"})
  }
}
