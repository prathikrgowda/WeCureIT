const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve doctors' });
    }
});

// Get a specific doctor by ID
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the doctor' });
    }
});

// Get a specific doctor by Name
router.get('/name/:name', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ name: req.params.name });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the doctor' });
    }
});

// Add a new doctor
router.post('/', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;
    const doctor = new Doctor({ name, specialty, email, degree, experience, password });

    // Validation
    if (!name || !specialty || !email || !degree || !experience || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an existing doctor by ID
router.put('/:id', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;

    // Validation
    if (!name || !specialty || !email || !degree || !experience) {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { name, specialty, email, degree, experience, password },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the doctor', error: err.message });
    }
});

// Update an existing doctor by Name
router.put('/name/:name', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;

    // Validation
    if (!name || !specialty || !email || !degree || !experience) {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    try {
        const updatedDoctor = await Doctor.findOneAndUpdate(
            { name: req.params.name },
            { name, specialty, email, degree, experience, password },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the doctor', error: err.message });
    }
});

// Delete a doctor by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully', doctor: deletedDoctor });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the doctor' });
    }
});

// Delete a doctor by Name
router.delete('/name/:name', async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findOneAndDelete({ name: req.params.name });
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully', doctor: deletedDoctor });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the doctor' });
    }
});

module.exports = router;
