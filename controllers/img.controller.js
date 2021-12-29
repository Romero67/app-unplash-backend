const Img = require('../models/img.model');

exports.create = (req, res) => {
 const img = new Img(req.body);
 img.save((err, data) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried while saving the image'
   })
  }
  res.json(data);
 })
}

exports.list = (req, res) =>{
 Img.find().exec((err, data) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried while get the images'
   })
  }
  res.json(data);
 })
}

exports.remove = (req, res) =>{
 const img = req.img;
 img.remove((err, data) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried while trying delete the img'
   })
  }
  res.json({
   messagge: 'Img deleted successfully'
  })
 })
}

exports.imgById = (req, res, next, id) =>{
 Img.findById(id).exec((err, data) =>{
  if(err || !data){
   return res.status(400).json({
    error: 'An error ocurried while get the image'
   })
  }
  req.img = data;
  next();
 })
}