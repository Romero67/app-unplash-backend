const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.verifyToken = async (req, res, next) => {
 const token = req.headers['token'];

 if(!token) return res.status(400).json({
  message: 'No token provided'
 })

 try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded._id;

  const user = await User.findById(req.userId);
  if(!user) return res.status(400).json({
   message: 'No user found'
  })

  console.log(req.body)

  if(!user.authenticate(req.body.password)) return res.status(400).json({
   message: 'Password is incorrect'
  })

  next();
 } catch (error) {
  return res.status(401).json({ message: "Unauthorized!" });
 }
}