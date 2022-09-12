// controller dependencies
const express = require('express');
const router = express.Router();
const Cattle = require('../models/cattle');
const cloudinary = require('cloudinary').v2;


require('dotenv').config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;


cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: API_KEY, 
    api_secret: API_SECRET
  });


// Seed Route
router.get('/seed', (req, res) =>{
    const data = require('../data.json');
    Cattle.deleteMany({}, (err, result) => {
        Cattle.insertMany(data, (err, result) => {
        res.redirect('/cattle');
    });
});   
});

// Index route
router.get('/', (req, res) => {
    Cattle.find({}, (err, foundCattle) => {
        res.render('cattle/index.ejs', { 
            'cattle': foundCattle 
        });
    });
});

// New route
router.get('/new', (req, res) => {
    res.render('cattle/new.ejs');
});

// Delete route
router.delete('/:id', (req, res) => {
    Cattle.findByIdAndDelete(req.params.id, (err, deletedCattle) => {    
    console.log('deletecCattle: ', deletedCattle);
    res.redirect('/cattle');
        });
});

// Update route
router.put('/:id', (req, res) => {
    console.log('api_key', API_KEY);
    req.body.completed = !req.body.completed;
    const photo = req.files.image;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
          console.log(result)
          req.body.img = result.secure_url
          Cattle.findByIdAndUpdate(req.params.id, req.body, (err, oldCattleVersion) => {
            res.redirect('/cattle/' + req.params.id);  
          });
    }) 
});

// Create route
router.post('/', (req, res) => {
    console.log('its working');
    console.log('api key', API_KEY);
    const photo = req.files.image;
    photo.mv(`./uploads/${photo.name}`);
    cloudinary.uploader.upload(`./uploads/${photo.name}`).then(result => {
          console.log(result)
          req.body.img = result.secure_url
          Cattle.create(req.body, (err, createdCattle) => {
             res.redirect('/cattle');
        });
    })
});

// Edit route
router.get('/:id/edit', (req, res) => {
    Cattle.findById(req.params.id, (err, foundCattle) => {
        res.render('cattle/edit.ejs', {
            'cattle': foundCattle
        });
    });
});

// Show route
router.get('/:id', (req, res) => {
    Cattle.findById(req.params.id, (err, foundCattle) => {
        res.render('cattle/show.ejs', {'cattle': foundCattle})
    });
});

module.exports = router;