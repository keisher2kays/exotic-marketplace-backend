// routes/cars.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const carController = require('../controllers/carlocatorcontrollers'); // Adjust the path to your controller

// Set up Multer storage for multiple files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
  },
});

// Initialize Multer for multiple files
const upload = multer({ storage }).array('images', 3); // Accept up to 3 files

// Route to get all cars
router.get('/cars2', carController.getAllCars);

// Route to get a car by ID
router.get('/cars2/:id', carController.getCarById);

// Route to create a new car with image upload
router.post('/cars2', upload, carController.createCar); // Use upload middleware

// Route to update a car by ID with optional image upload
router.put('/cars2/:id', upload, carController.updateCar); // Use the same upload middleware

// Route to delete a car by ID
router.delete('/cars2/:id', carController.deleteCar);

module.exports = router;