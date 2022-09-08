const mongoose = require('mongoose');
const cattleSchema = new mongoose.Schema({
    image: Image,
    breed: String,
    origin: String,
    description: String,
})
