const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChalleangeItemSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
}, {
  collection: 'ChalleangeItem'
})

module.exports = mongoose.model('ChalleangeItem', ChalleangeItemSchema)