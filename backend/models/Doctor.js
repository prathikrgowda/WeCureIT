const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specialty: [String],
    email: { type: String, required: true, unique: true },
    degree: String,
    experience: String,
    password: String, // This should be hashed in the future
});

module.exports = mongoose.model('Doctor', DoctorSchema);
