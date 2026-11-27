require('dotenv').config();

let express = require('express');
let path = require('path');
let indexRouter = require('../routes/index');
let workoutsRouter = require('../routes/workout');
let app = express();
let mongoose = require('mongoose');
let DB = require('./db');

mongoose.connect(DB.URI)
    .then(function() {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(function() {
        console.log('Database connection failed. Check your connection settings.');
    });

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/bootstrap', express.static(
    path.join(__dirname, '../node_modules/bootstrap/dist')
));

app.use('/', indexRouter);
app.use('/workouts', workoutsRouter);
module.exports = app;