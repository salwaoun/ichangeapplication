const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChalleangeSchema = new Schema({
    ChalleangeName: {
    type: String
  },
  ChalleangeLevel: {
    type: String
  },
  ChalleangeDetails: {
    type: String
  },
  ChalleangeDuration: {
    type: String
  },
  ChalleangeImg: {
    type: String
  },
  ChalleangeItems:[]
}, {
  collection: 'Challeange'
})

module.exports = mongoose.model('Challeange', ChalleangeSchema)