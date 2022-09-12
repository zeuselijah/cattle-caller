// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cattleRouter = require('./controllers/cattle');
const expressFileUpload = require('express-fileupload');



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


app.use(expressFileUpload({ createParentPath: true }));
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// mount routes

// Homepage redirect route
app.get('/', (req, res) => res.render('index.ejs'));


// mount router/controller
app.use('/cattle',cattleRouter);


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});