const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cattleSchema = new Schema({
    img: {type: String, default: 'https://cdn.pixabay.com/photo/2020/10/11/18/45/cow-5646719_1280.png', required: false},
    breed: {type: String, required: true},
    origin: {type: String, required: true},
    color: {type: String, required: true},
    description: {type: String, required: true},
}, { timestamps: true});


module.exports = mongoose.model('Cattle', cattleSchema);