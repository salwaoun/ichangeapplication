const express = require('express');
const ChalleangeRoute = express.Router();

// Challeange model
let ChalleangeModel = require('../models/Challeanges');

ChalleangeRoute.route('/').get((req, res) => {
  ChalleangeModel.find((error, data) => {
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

 ChalleangeRoute.route('/FindbyId').get((req, res) => {
  ChalleangeModel.findById(req.query.ChallaeangeId,(error, data) => {
    console.log(data);
     if (error) {
       return next(error)
     } else {
       res.json(data)
     }
   })
 })

module.exports = ChalleangeRoute;