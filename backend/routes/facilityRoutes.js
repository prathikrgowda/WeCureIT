const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// Get all facilities
router.get('/', async (req, res) => {
    try {
        const facilities = await Facility.find();
        res.json(facilities);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve facilities' });
    }
});

// Get a specific facility by ID
router.get('/:id', async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if (!facility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json(facility);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to retrieve the facility' });
    }
});

// Get a specific facility by Name
router.get('/name/:name', async (req, res) => {
    try {
        const facility = await Facility.findOne({ name: req.params.name });
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

// Update an existing facility by ID
router.put('/:id', async (req, res) => {
    const { name, rooms } = req.body;

    // Validation
    if (!name || !rooms || rooms.length === 0) {
        return res.status(400).json({ message: 'Name and at least one room are required' });
    }

    try {
        const updatedFacility = await Facility.findByIdAndUpdate(
            req.params.id,
            { name, rooms },
            { new: true, runValidators: true } // Options: return the new document after update
        );
        
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.json(updatedFacility);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the facility', error: err.message });
    }
});

// Update an existing facility by Name
router.put('/name/:name', async (req, res) => {
    const { name, rooms } = req.body;

    // Validation
    if (!name || !rooms || rooms.length === 0) {
        return res.status(400).json({ message: 'Name and at least one room are required' });
    }

    try {
        const updatedFacility = await Facility.findOneAndUpdate(
            { name: req.params.name },  // Search by facility name
            { name, rooms },
            { new: true, runValidators: true } // Options: return the new document after update
        );
        
        if (!updatedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }

        res.json(updatedFacility);
    } catch (err) {
        res.status(400).json({ message: 'Error updating the facility', error: err.message });
    }
});

// Delete a facility by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedFacility = await Facility.findByIdAndDelete(req.params.id);
        if (!deletedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json({ message: 'Facility deleted successfully', facility: deletedFacility });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the facility' });
    }
});

// Delete a facility by Name
router.delete('/name/:name', async (req, res) => {
    try {
        const deletedFacility = await Facility.findOneAndDelete({ name: req.params.name });
        if (!deletedFacility) {
            return res.status(404).json({ message: 'Facility not found' });
        }
        res.json({ message: 'Facility deleted successfully', facility: deletedFacility });
    } catch (err) {
        res.status(500).json({ message: 'Server Error: Unable to delete the facility' });
    }
});

module.exports = router;
