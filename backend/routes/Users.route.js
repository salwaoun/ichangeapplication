const express = require('express');
const UsersRoute = express.Router();

// User model
let UsersModel = require('../models/Users');

UsersRoute.route('/').get((req, res) => {
  UsersModel.find((error, data) => {
     if (error) {
       return error;
     } else {
       res.json(data)
     }
   })
 });


 UsersRoute.route('/FindbyId').get((req, res) => {
  UsersModel.findById(req.query.UserId,(error, data) => {
     if (error) {
       return error;
     } else {
       res.json(data)
     }
   })
 })

 UsersRoute.route('/FindbyEmail').get((req, res) => {
  UsersModel.findOne({ email: req.query.UserEmail},(error, data) => {
     if (error) {
       return error;
     } else {
       res.json(data);
       console.log((data)+ "is the response of the find");
     }
   })
 })


 UsersRoute.route('/create-user').post((req, res, next) => {
  UsersModel.create(req.body, (error, data) => {
    if (error) {
      return error
    } else {
      res.json(data)
    }
  })
});


// Update User
UsersRoute.route('/update-user').post((req, res, next) => {
  console.log(req);
  UsersModel.findByIdAndUpdate(req.query.UserId, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data)
      console.log('user successfully updated!')
    }
  })
})

module.exports = UsersRoute;