// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/cardetailscontroller');
const upload = require('../middlewares/multer');

// Route to get a car by ID
router.get('/:id', carController.getCarById);

// Route to create a new car with images
router.post('/', upload.array('images', 3), carController.createCar); // Accept up to 3 images

module.exports = router;