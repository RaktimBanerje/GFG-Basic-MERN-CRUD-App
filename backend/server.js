let path = require('path');
let express = require('express');
let mongoose = require('mongoose');
let multer = require('multer')
let cors = require('cors');
let dbConfig = require('./database/db');

// Express Route
const studentRoute = require('../backend/routes/student.route')

// Connecting MongoDB Database
mongoose.connect(dbConfig.db, {
  'useNewUrlParser': true, 
  'useFindAndModify': false, 
  'useCreateIndex': true,
  'useUnifiedTopology': true
})
.then(() => console.log('Database sucessfully connected!'))
.catch( error => console.log('Could not connect to database : ' + error))

const app = express();
app.use(cors());
app.use('/asset/student', express.static(path.join(__dirname, 'public/studentPhoto')))
app.use('/students', studentRoute)


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  res.status(404).send('Error 404!')
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});