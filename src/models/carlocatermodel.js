// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     year: { type: Number, required: true },
//     location: { type: String, required: true },
//     mileage: { type: String, required: true },
//     image: { type: String, required: true } // Path to the uploaded image
// });

// const CarModel = mongoose.model('CarModel', carSchema);
// module.exports = CarModel;

// models/Car.js
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    mileage: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    specifications: {
        engine: {
            type: String,
            required: true,
        },
        power: {
            type: String,
            required: true,
        },
        transmission: {
            type: String,
            required: true,
        },
        acceleration: { 
            type: String, 
            required: true 
        },
        topSpeed: { 
            type: String,
             required: true
             },
        // Add more fields as necessary
    },
    features: {
        type: [String], // Array of strings
        required: true,
    },
    seller: {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        rating: { 
            type: Number,
             required: true 
            },
            email: { 
                type: String,
                 required: true
                 },
                 title: { 
                    type: String, 
                    required: true 
                },
                experience: {
                     type: String,
                      required: true
                     },
                     responseTime: {
                         type: String, 
                         required: true
                         },
    },
    images: {
        type: [String], // Array of strings for image paths
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create a model from the schema
const Car = mongoose.model('Car2', carSchema);

// Export the model
module.exports = Car;