const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON data in requests

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Import Routes
const facilityRoutes = require('./routes/facilityRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const specializationRoutes = require('./routes/specializationRoutes'); // Add Specialization routes

// Routes
app.use('/api/facilities', facilityRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/specializations', specializationRoutes); // Use Specialization routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
