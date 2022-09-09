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

// Homepage redirect route
app.get('/', (req, res) => res.redirect('/cattle'));

// Seed Route
app.get('/cattle/seed', (req, res) =>{
    const data = require('./data.json');
    Cattle.deleteMany({}, (err, result) => {
        Cattle.insertMany(data, (err, result) => {
        res.redirect('/cattle');
    });
})
    
});

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
    req.body.completed = !!req.body.completed;
    Cattle.create(req.body, (err, createdCattle) => {
        res.redirect('/cattle');
    });
});

// Update route
// Delete route
// Edit route
// Show route
app.get('/cattle/:id', (req, res) => {
    Cattle.findById(req.params.id, (err, foundCattle) => {
        res.render('show.ejs', {'cattle': foundCattle})
    });
});

// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});