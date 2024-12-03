const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const carDetails = require('./src/routes/cardetailsroutes');
const carlocator = require('./src/routes/carlocatorroutes'); 
const carRoutes = require('./src/routes/featuredcarroutes'); 
const carManagementRoutes = require('./src/routes/carlocatorroutes'); 
const path = require('path');
const cors = require('cors'); 

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString() 
    });
  });

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cars3', carDetails);
app.use('/api', carlocator);
app.use('/api', carRoutes);
app.use('/api', carManagementRoutes);// Prefix all routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing or other purposes


