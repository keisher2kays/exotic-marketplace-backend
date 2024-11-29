const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL or path to the image
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;