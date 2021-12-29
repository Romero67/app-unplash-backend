const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

//use the libs
require('dotenv').config();
const app = express();

//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//connection to database
mongoose.connect(process.env.DATABASE, {
 useNewUrlParser: true,
 useUnifiedTopology: true
}).then((res) => console.log('connect to database success'));

//routes setup
app.use('/api/articule', require('./routes/articule.route'));
app.use('/api/img', require('./routes/img.route'));
app.use('/api/auth', require('./routes/auth.route'));

//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server onn on port ${port}`));