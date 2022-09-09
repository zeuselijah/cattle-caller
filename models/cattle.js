const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cattleSchema = new Schema({
    image: {type: String,  required: true},
    breed: {type: String, required: true},
    origin: {type: String, required: true},
    description: {type: String, required: true},
}, { timestamps: true});


module.exports = mongoose.model('Cattle', cattleSchema);