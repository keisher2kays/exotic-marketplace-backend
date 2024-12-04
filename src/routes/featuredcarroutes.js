

// src/routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/featuredcarcontroller');

// Use the upload middleware for the POST route
router.post('/cars', carController.upload, carController.addCar);
router.get('/cars', carController.getFeaturedCars);

module.exports = router;