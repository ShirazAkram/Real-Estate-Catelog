const express = require('express');
const router = express.Router();
const Property = require('../models/property');


router.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/properties', async (req, res) => {
  const { title, description, price, location, bedrooms, bathrooms, imageUrls } = req.body;

  try {
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      bedrooms,
      bathrooms,
      imageUrls,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/properties/:id', async (req, res) => {
  const propertyId = req.params.id;

  try {
    const property = await Property.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
