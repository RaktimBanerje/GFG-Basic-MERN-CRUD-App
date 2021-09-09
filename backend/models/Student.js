const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rollno: {
    type: Number,
    required: true
  }, 
  gender: {
    type: String, 
    required: true
  },
  course: {
    type: Array,
    reuired: true
  },
  file: {}
})

module.exports = mongoose.model('Student', studentSchema)