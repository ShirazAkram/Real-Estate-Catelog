const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  PPDID: {
    type: String,
    required: true,
  },
  ImageUrls: {
    type: String,
    required: true,
  },
  Property: {
    type: String,
    required: true,
  },
  Contact: {
    type: Number,
    required: true,
  },
  Area: {
    type: Number,
    required: true,
  },
  Views: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  DaysLeft: {
    type: Number,
    required: true,
  },
  Action: {
    type: String,
    required: true,
  },
  
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
