const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors (excluding soft-deleted ones)
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({ isDeleted: false });
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve doctors' });
    }
});

router.get('/count', async (req, res) => {
    try {
        const count = await Doctor.countDocuments({ isDeleted: false });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the doctor count' });
    }
});

// Get a specific doctor by ID (excluding soft-deleted ones)
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ _id: req.params.id, isDeleted: false });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the doctor' });
    }
});

// Get a specific doctor by Name (excluding soft-deleted ones)
router.get('/name/:name', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ name: req.params.name, isDeleted: false });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the doctor' });
    }
});

// Add a new doctor (prevent duplicate email)
router.post('/', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;

    const errors = {};

    // Validation
    if (!name) errors.name = "Doctor's name is required";
    if (!specialty || specialty.length === 0) errors.specialty = "At least one specialty is required";
    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
    }
    if (!degree) errors.degree = "Degree is required";
    if (!experience) {
        errors.experience = "Experience is required";
    } else if (!/^\d+$/.test(experience)) {
        errors.experience = "Experience must be a number";
    }
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Check if a doctor with the same email exists and is not soft-deleted
        const existingDoctor = await Doctor.findOne({ email, isDeleted: false });
        if (existingDoctor) {
            return res.status(400).json({ errors: { email: "A doctor with this email already exists" } });
        }

        const doctor = new Doctor({ name, specialty, email, degree, experience, password });
        const savedDoctor = await doctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(500).json({ message: "An error occurred while saving the doctor", error: err.message });
    }
});

module.exports = router;


// Update an existing doctor by ID (only if not soft deleted)
router.put('/:id', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;

    const errors = {};

    // Validation
    if (!name) errors.name = "Doctor's name is required";
    if (!specialty || specialty.length === 0) errors.specialty = "At least one specialty is required";
    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
    }
    if (!degree) errors.degree = "Degree is required";
    if (!experience) {
        errors.experience = "Experience is required";
    } else if (!/^\d+$/.test(experience)) {
        errors.experience = "Experience must be a number";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Check for unique email if email is being updated
        const existingDoctorWithEmail = await Doctor.findOne({ email, _id: { $ne: req.params.id }, isDeleted: false });
        if (existingDoctorWithEmail) {
            return res.status(400).json({ errors: { email: "A doctor with this email already exists" } });
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { name, specialty, email, degree, experience, password },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found or has been deleted' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the doctor', error: err.message });
    }
});

// Update an existing doctor by Name (only if not soft deleted)
router.put('/name/:name', async (req, res) => {
    const { name, specialty, email, degree, experience, password } = req.body;

    const errors = {};

    // Validation
    if (!name) errors.name = "Doctor's name is required";
    if (!specialty || specialty.length === 0) errors.specialty = "At least one specialty is required";
    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Invalid email format";
    }
    if (!degree) errors.degree = "Degree is required";
    if (!experience) {
        errors.experience = "Experience is required";
    } else if (!/^\d+$/.test(experience)) {
        errors.experience = "Experience must be a number";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        // Check for unique email if email is being updated
        const existingDoctorWithEmail = await Doctor.findOne({ email, name: { $ne: req.params.name }, isDeleted: false });
        if (existingDoctorWithEmail) {
            return res.status(400).json({ errors: { email: "A doctor with this email already exists" } });
        }

        const updatedDoctor = await Doctor.findOneAndUpdate(
            { name: req.params.name, isDeleted: false },
            { name, specialty, email, degree, experience, password },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found or has been deleted' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the doctor', error: err.message });
    }
});

// Soft delete a doctor by ID
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        
        if (!doctor || doctor.isDeleted) {
            return res.status(404).json({ message: 'Doctor not found or already deleted' });
        }

        doctor.isDeleted = true;
        await doctor.save();

        res.json({ message: 'Doctor soft deleted successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the doctor' });
    }
});

// Soft delete a doctor by Name
router.delete('/name/:name', async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ name: req.params.name });

        if (!doctor || doctor.isDeleted) {
            return res.status(404).json({ message: 'Doctor not found or already deleted' });
        }

        doctor.isDeleted = true;
        await doctor.save();

        res.json({ message: 'Doctor soft deleted successfully', doctor });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the doctor' });
    }
});

module.exports = router;
