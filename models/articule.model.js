const mongoose = require('mongoose');

const articuleSchema = new mongoose.Schema({
 description: {
  type: String,
  maxlength: 100,
  required: true
 },
 photo: {
  data: Buffer,
  contentType: String
 }
},{
 timestamps: true
});

module.exports = mongoose.model('Articule', articuleSchema);