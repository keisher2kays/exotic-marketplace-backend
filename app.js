const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const carDetails = require('./src/routes/cardetailsroutes');
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
// const allowedOrigins = ['http://localhost:3000', 'https://rare-rides.netlify.app/', ]; // Add your frontend URL(s) here
const allowedOrigins = [
  'http://localhost:3000', 
  'https://rare-rides.netlify.app', 
   'https://674f15c71b1ffd0877d3190f--rare-rides.netlify.app'
];
// Basic CORS setup
app.use(cors({
  origin: function(origin, callback) {
    console.log('Request Origin:', origin); // Log the origin
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) {
      return callback(null, true);
    }
  
    // Allow if origin is in whitelist or origin is undefined
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connction established'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// app.use('/api/cars3', carDetails);
app.use('/api', carlocator);
app.use('/api', carRoutes);
app.use('/api', carManagementRoutes);// Prefix all routes with /api

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the app for testing or other purposes


