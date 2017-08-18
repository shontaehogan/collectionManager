const express = require('express');
const routes = express.Router();
const vehicle = require('../models/vehicle');

routes.get('/', (req, res) => {
  vehicle.find()
    // then show my vehicle
    .then(vehicle => res.render('listVehicle', { vehicle: vehicle }))
    // handle errors
    .catch(err => res.send('there was an error :('));
});

routes.get('/vehicleForm', (req, res) => {
  if (req.query.id) {
    vehicle.findById(req.query.id)
      // render form with this vehicle
      .then(vehicle => res.render('vehicleForm', { vehicle: vehicle }));
  } else {
    res.render('vehicleForm');
  }
});

routes.post('/saveVehicle', (req, res) => {
  console.log('body: ', req.body);


  // check to see if we received an id for a vehicle
  if (req.body.id) {
    // find the vehicle by id and update it
    vehicle.findByIdAndUpdate(req.body.id, req.body,)
      // redirect to the homepage
      .then(() => res.redirect('/'))
      // catch validation errors
      .catch(err => {
        console.log(err);
        res.render('vehicleForm', {
          errors: err.errors,
          vehicle: req.body
        });
      });
  } else {
    // this is a new vehicle
    new vehicle(req.body)
      .save()
      // then redirect to the homepage
      .then(() => res.redirect('/'))
      // catch validation errors
      .catch(err => {
        console.log(err.errors);
        res.render('vehicleForm', {
          errors: err.errors,
          vehicle: req.body
        });
      });
  }
});

routes.get('/delete', (req, res) => {
  vehicle.findById(req.query.id)
    .remove()
    // then redirect to the homepage
    .then(() => res.redirect('/'));
});

module.exports = routes;
