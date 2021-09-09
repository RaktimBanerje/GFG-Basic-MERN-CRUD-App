let path = require('path')
let fs = require('fs')
let mongoose = require('mongoose')
let express = require('express')
let multer = require('multer')
let router = express.Router()

// Student Model
let studentSchema = require('../models/Student');

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/studentPhoto/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
  })
}).single('photo')

// CREATE Student
router.post('/create-student', async (req, res, next) => {
  upload(req, res, async ()=>{
    const student = new studentSchema({
      name: req.body.name,
      email: req.body.email,
      rollno: req.body.rollno,
      gender: req.body.gender,
      course: req.body.course.split(','),
      file: req.file
    })
    try{
      const data = await student.save()
      res.json(data)
    }catch(err){ return next(err) }
  })
})

// READ Students
router.get('/', async (req, res, next) => {
  try{
    const data = await studentSchema.find()
    res.json(data)
  }catch(err){ return next(err) }
})

router.route('/update-student/:id')
  // Get Single Student
  .get(async (req, res, next) => {
    try{
      const data = await studentSchema.findById(req.params.id)
      res.json(data)
    }catch(err){ return next(err) }
  })

  // Update Student Data
  .put(async (req, res, next) => {
    upload(req, res, async ()=>{
      let obj = {
        name: req.body.name,
        email: req.body.email,
        rollno: req.body.rollno,
        gender: req.body.gender,
        course: req.body.course.split(','),
      }

      if(req.file){
        try{
          const data = await studentSchema.findById(req.params.id)
          if(data.file){
            fs.unlink(path.join(__dirname, '..', data.file.path), async (err) => {
              if(err){return next(err)}
              obj = {...obj, file: req.file}
              console.log(obj)
              const newData = await studentSchema.findByIdAndUpdate(req.params.id, obj)
              res.json(newData)
            })
          }         
        }catch(err){ return next(err) }
      }
      else{
        try{
          const data = await studentSchema.findByIdAndUpdate(req.params.id, obj)
          res.json(data)
        }catch(err){ return next(err) }
      }
    })
  })

// Delete Student
router.delete('/delete-student/:id', async (req, res, next) => {
  try{
    let data = await studentSchema.findById(req.params.id)
    fs.unlink(path.join(__dirname, '..', data.file.path), async (err) => {
      data = await studentSchema.findByIdAndRemove(req.params.id)
      res.json(data)
    })
  }catch(err){ return next(err) }
})

module.exports = router;