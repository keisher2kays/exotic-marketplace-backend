// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Define storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  },
});

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;