

// const CarModel = require('../models/carlocatermodel');
// const multer = require('multer');
// const path = require('path');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Specify the directory to save the uploaded files
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the file name
//     }
// });

// // Create the upload middleware
// const upload = multer({ storage: storage });

// // Export the upload function
// exports.upload = upload.single('image'); // 'image' is the name of the file input field

// // Function to fetch all cars
// exports.getCars = async (req, res) => {
//     try {
//         const cars = await CarModel.find();
//         res.json(cars);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching cars', error });
//     }
// };

// // Function to add a new car
// exports.addCar = async (req, res) => {
//     const { name, price, year, location, mileage } = req.body;
//     const image = req.file.path; // Get the path of the uploaded file

//     // Basic validation
//     if (!name || !price || !year || !location || !mileage || !image) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Clean the price input
//     const cleanedPrice = parseFloat(price.replace(/[$,]/g, '')); // Remove $ and commas, then convert to float

//     // Check if the cleaned price is a valid number
//     if (isNaN(cleanedPrice)) {
//         return res.status(400).json({ message: 'Price must be a valid number' });
//     }

//     const newCar = new CarModel({
//         name,
//         price: cleanedPrice, // Use the cleaned price
//         year,
//         location,
//         mileage,
//         image
//     });

//     try {
//         const savedCar = await newCar.save();
//         res.status(201).json(savedCar);
//     } catch (error) {
//         res.status(500).json({ message: 'Error saving car', error });
//     }
// };


const Car = require('../models/carlocatermodel'); // Adjust the path to your Car model

// Get all cars
// exports.getAllCars = async (req, res) => {
//     try {
//         const cars = await Car.find(); // Fetch all cars from the database
//         res.status(200).json(cars);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving cars', error });
//     }
// };
exports.getAllCars = async (req, res) => {
    const { location } = req.query; // Get the location from the query parameters

    try {
        let cars;
        if (location) {
            // If a location is provided, filter cars by location
            cars = await Car.find({ location: new RegExp(location, 'i') }); // Use a regex for case-insensitive matching
        } else {
            // If no location is provided, fetch all cars
            cars = await Car.find();
        }
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error });
    }
};

// Get a car by ID
exports.getCarById = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving car', error });
    }
};

// Create a new car
exports.createCar = async (req, res) => {
    const { name, price, year, location, mileage, description, specifications, features, seller } = req.body;

    // Handle images
    const images = req.files ? req.files.map(file => file.path) : []; // Extract paths from uploaded files

    // Create a new car object
    const newCar = new Car({
        name,
        price,
        year,
        location,
        mileage,
        description,
        specifications: JSON.parse(specifications), // Parse specifications if needed
        features: JSON.parse(features), // Parse features if needed
        seller: JSON.parse(seller),
        images
    });

    try {
        const savedCar = await newCar.save(); // Save new car to the database
        res.status(201).json(savedCar); // Respond with the created car
    } catch (error) {
        res.status(500).json({ message: 'Error creating car', error });
    }
};

// Update a car by ID
exports.updateCar = async (req, res) => {
    const { id } = req.params;
    const { name, price, year, location, mileage, description, specifications, features, seller } = req.body;

    // Handle images
    const images = req.files ? req.files.map(file => file.path) : []; // Extract paths from uploaded files

    // Create an updated car object
    const updatedCar = {
        name,
        price,
        year,
        location,
        mileage,
        description,
        specifications: JSON.parse(specifications), // Parse specifications if needed
        features: JSON.parse(features), // Parse features if needed
        seller,
        images
    };

    try {
        const car = await Car.findByIdAndUpdate(id, updatedCar, { new: true }); // Update the car in the database
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car); // Respond with the updated car
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
};

// Delete a car by ID
exports.deleteCar = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.findByIdAndDelete(id); // Delete the car from the database
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(204).json(); // Respond with no content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error });
    }
};