// // controllers/carController.js
// const Car = require('../models/cardetailmodel');

// // Get a car by ID
// exports.getCarById = async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
//     res.json(car);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

// // Create a new car
// exports.createCar = async (req, res) => {
//   try {
//     const { name, price, year, location, mileage, description, specifications, seller, features } = req.body;

//     // Map the uploaded file paths to the images array
//     const images = req.files.map(file => file.path);

//     const car = new Car({
//       name,
//       price,
//       year,
//       location,
//       mileage,
//       images,
//       description,
//       specifications: JSON.parse(specifications), // Make sure to parse if it's a JSON string
//       seller: JSON.parse(seller),
//       features: JSON.parse(features) // Make sure to parse if it's a JSON string
//     });

//     await car.save();
//     res.status(201).json(car);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

const mongoose = require('mongoose');
const Car = require('../models/cardetailmodel');

// Get a car by ID
exports.getCarById = async (req, res) => {
  try {
    console.log('Received ID:', req.params.id);

    // Try to convert to ObjectId
    let carId;
    try {
      carId = mongoose.Types.ObjectId(req.params.id);
    } catch (idError) {
      console.error('Invalid ID format:', idError);
      return res.status(400).json({ message: 'Invalid car ID format' });
    }

    const car = await Car.findById(carId);
    
    console.log('Car found:', car);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    
    res.json(car);
  } catch (error) {
    console.error('Server error in getCarById:', error);
    res.status(500).json({ 
      message: 'Server error', 
      errorName: error.name,
      errorMessage: error.message 
    });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { name, price, year, location, mileage, description, specifications, seller, features } = req.body;

    // Map the uploaded file paths to the images array
    const images = req.files.map(file => file.path);

    const car = new Car({
      name,
      price,
      year,
      location,
      mileage,
      images,
      description,
      specifications: JSON.parse(specifications), // Make sure to parse if it's a JSON string
      seller: JSON.parse(seller),
      features: JSON.parse(features) // Make sure to parse if it's a JSON string
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};