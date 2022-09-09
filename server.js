// dependencies
const express = require('express');
const mongoose = require('mongoose');
const Cattle = require('./models/cattle') 
//const methodOverride = require('method-override');

// intialize the app
const app = express();

// configure settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const db = mongoose.connection;

// connect to mongodb
mongoose.connect(DATABASE_URI);
// add mongoDB connected and error event listener
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));

// mount middleware
app.use(express.urlencoded({ extended: false}));
//app.arguments(methodOverride('_method'));

// mount routes


// Index route
app.get('/cattle', (req, res) => {
    Cattle.find({}, (err, foundCattle) => {
        res.render('index.ejs', { 
            'cattle': foundCattle 
        });
    });
});

// New route
app.get('/cattle/new', (req, res) => {
    res.render('new.ejs');
});

// Update route
// Create route
app.post('/cattle', (req, res) => {
    Cattle.create(req.body, (err, createdCattle) => {
        res.send(createdCattle);
    });
});

// Update route
// Delete route
// Edit route
// Show route


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});