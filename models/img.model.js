const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
 description: {
  type: String,
  maxlength: 100,
  required: true
 },
 url:{
  type: String,
  maxlength: 200,
  required: true
 }
},{
 timestamps: true
});

module.exports = mongoose.model('Img', imgSchema);