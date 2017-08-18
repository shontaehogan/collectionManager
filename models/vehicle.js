const mongoose = require('mongoose');

// get a reference to Schema
const Schema = mongoose.Schema;

// create a schema for a vehicle
const vehicleSchema = new Schema({
  id: { type: Number, required: true },
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  description: {
    color: { type: String },
    body: { type: String },
    extras: { type: String },
  price: { type: Number, required: true },
}
});

// create a model for a vehicle
const vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = vehicle;
