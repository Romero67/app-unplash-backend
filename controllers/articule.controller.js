const Articule = require('../models/articule.model');
const formidable = require('formidable');
const fs = require('fs');

exports.create = (req, res) =>{
 const form = new formidable.IncomingForm();
 form.keepExtensions = true;
 form.parse(req, (err, fields, files) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried while creating the articule'
   })
  }
  const articule = new Articule(fields);
  if(files.photo){
   if(files.photo.size > 1000000){
    return res.status(400).json({
     error: 'the image should less a 1mb'
    })
   }
   articule.photo.data = fs.readFileSync(files.photo.filepath);
   articule.photo.type = files.photo.type;
  }
  articule.save((err, result) => {
   if(err){
    return res.status(400).json({
     error: 'An error ocurried while saving the articule'
    })
   }
   res.json(result);
  })
 })
}

exports.list = (req, res) =>{
 Articule.find().select('-photo').exec((err, data) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried while load the articules'
   })
  }
  res.json(data);
 })
}

exports.remove = (req, res) =>{
 const articule = req.articule;
 articule.remove((err, data) => {
  if(err){
   return res.status(400).json({
    error: 'An error ocurried trying delete the articule'
   })
  }
  res.json({
   message: 'the articule successfully deleted'
  })
 })
} 

exports.articuleById = (req, res, next, id) =>{
 Articule.findById(id).exec((err, data) =>{
  if(err || !data){
   return res.status(400).json({
    error: 'An error ocurried with the articule'
   })
  }
  req.articule = data;
  next();
 })
}

exports.photo = (req, res, next) =>{
 if(req.articule.photo.data){
  res.set('Content-Type', req.articule.photo.contenType);
  return res.send(req.articule.photo.data);
 }
 next();
}