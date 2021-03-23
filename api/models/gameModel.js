'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currentLord = new Schema({
  name: {
      type: String
  },
  seasons:[{
      type: Number
  }]
});

var houseSchema = new Schema({
  name: {
    type: String
  },
  region: {
    type: String
  },
  founded: {
    type: String
  },
  currentLord: currentLord
});

module.exports = mongoose.model('Houses', houseSchema);