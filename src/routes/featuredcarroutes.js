// // src/routes/carRoutes.js
// const express = require('express');
// const router = express.Router();
// const carController = require('../controllers/featuredcarcontroller');

// router.get('/featured-cars', carController.getFeaturedCars);
// router.post('/featured-cars', carController.addCar);

// module.exports = router;

// src/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/featuredcarcontroller');

// Use the upload middleware for the POST route
router.post('/cars', carController.upload, carController.addCar);
router.get('/cars', carController.getFeaturedCars);

module.exports = router;