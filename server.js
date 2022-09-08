// dependencies
const express = require('express');
const mongoose = require('mongoose');
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
// New route
// Update route
// Create route
app.post('/cattle-caller', (req, res) => {
    res.send(req.body);
});

// Update route
// Delete route
// Edit route
// Show route


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});