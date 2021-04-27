const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let UsersSchema = new Schema({
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  UserName: {
    type: String
  },
  email: {
    type: String
  },
  Password: {
    type: String
  },
  Challeanges:[]
}, {
collection: 'Users'
});

UsersSchema.set('versionKey', false);

module.exports = mongoose.model('Users', UsersSchema)


