// dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cattleRouter = require('./controllers/cattle');
const cloudinary = require('cloudinary').v2;
const expressFileUpload = require('express-fileupload');

//const methodOverride = require('method-override');

// intialize the app
const app = express();

// configure settings
require('dotenv').config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;
const db = mongoose.connection;

// connect to mongodb
mongoose.connect(DATABASE_URI);
// add mongoDB connected and error event listener
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));

// mount middleware
cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  });

app.use(expressFileUpload({ createParentPath: true }));
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// mount routes

// Homepage redirect route
app.get('/', (req, res) => res.redirect('/cattle'));


// mount router/controller
app.use(cattleRouter);


// tell the app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port${PORT}`);
});