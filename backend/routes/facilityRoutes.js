const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// Get all facilities (excluding soft deleted ones)
router.get('/', async (req, res) => {
    try {
        const facilities = await Facility.find({ isDeleted: false });
        res.json(facilities);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve facilities' });
    }
});

// Get a specific facility by ID (only if not soft deleted)
router.get('/:id', async (req, res) => {
    try {
        const facility = await Facility.findOne({ _id: req.params.id, isDeleted: false });
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json(facility);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the facility' });
    }
});

// Get a specific facility by Name (only if not soft deleted)
router.get('/name/:name', async (req, res) => {
    try {
        const facility = await Facility.findOne({ name: req.params.name, isDeleted: false });
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json(facility);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the facility' });
    }
});

// Add a new facility
router.post('/', async (req, res) => {
    const { name, rooms } = req.body;

    // Validation
    if (!name || !rooms || rooms.length === 0) {
        return res.status(400).json({ message: 'Name and at least one room are required' });
    }

    const facility = new Facility({ name, rooms });

    try {
        const savedFacility = await facility.save();
        res.status(201).json(savedFacility);
    } catch (err) {
        res.status(400).json({ message: 'Error saving the facility', error: err.message });
    }
});

// Update an existing facility by ID (only if not soft deleted)
router.put('/:id', async (req, res) => {
    const { name, rooms } = req.body;

    // Validation
    if (!name || !rooms || rooms.length === 0) {
        return res.status(400).json({ message: 'Name and at least one room are required' });
    }

    try {
        const updatedFacility = await Facility.findOneAndUpdate(
            { _id: req.params.id, isDeleted: false },
            { name, rooms },
            { new: true, runValidators: true }
        );
        
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found or has been deleted' });
        }

        res.json(updatedFacility);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the facility', error: err.message });
    }
});

// Update an existing facility by Name (only if not soft deleted)
router.put('/name/:name', async (req, res) => {
    const { name, rooms } = req.body;

    // Validation
    if (!name || !rooms || rooms.length === 0) {
        return res.status(400).json({ message: 'Name and at least one room are required' });
    }

    try {
        const updatedFacility = await Facility.findOneAndUpdate(
            { name: req.params.name, isDeleted: false },
            { name, rooms },
            { new: true, runValidators: true }
        );
        
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found or has been deleted' });
        }

        res.json(updatedFacility);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the facility', error: err.message });
    }
});

// Soft delete a facility by ID
router.delete('/:id', async (req, res) => {
    try {
        const updatedFacility = await Facility.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.json({ message: 'Facility soft deleted successfully', facility: updatedFacility });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the facility' });
    }
});

// Soft delete a facility by Name
router.delete('/name/:name', async (req, res) => {
    try {
        const updatedFacility = await Facility.findOneAndUpdate(
            { name: req.params.name },
            { isDeleted: true },
            { new: true }
        );

        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.json({ message: 'Facility soft deleted successfully', facility: updatedFacility });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the facility' });
    }
});

module.exports = router;
