

// src/controllers/carController.js
const Car = require('../models/featuredCarModel'); // Ensure this model is defined correctly
const multer = require('multer');
const path = require('path');

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the file name
    }
});

// Initialize Multer
const upload = multer({ storage: storage });

// GET all featured cars
exports.getFeaturedCars = async (req, res) => {
    try {
        const cars = await Car.find(); // Fetch all cars from the database
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }
};

// POST a new car
exports.addCar = async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file.path; // Get the path of the uploaded file

    // Basic validation
    if (!name || !price || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newCar = new Car({
        name,
        price,
        description,
        image,
    });

    try {
        const savedCar = await newCar.save(); // Save to MongoDB
        res.status(201).json(savedCar); // Respond with the created car
    } catch (error) {
        res.status(500).json({ message: 'Error saving car', error });
    }
};

// Export the upload middleware
exports.upload = upload.single('image'); // 'image' is the name of the file input field