'use strict';

var mongoose = require('mongoose');
var Houses = require('../models/gameModel');
//var House = mongoose.model('Houses', 'Houses');
var House = mongoose.model('Houses');

exports.listHouses = function(req, res) {
    House.find({}, function(err, house) {
        if (err)
            res.send(err);
        return res.json(house);
    })
        
};

exports.includeHouse = function(req, res) {
    var house = new House(req.body);
    house.save(function(err, house) {
        if (err)
            res.send(err);
        res.json(house);
    });
};

exports.consultHouseById = function(req, res) {
    House.findById(req.params.id, function(err, house) {
        if (err)
            res.send(err);
        res.json(house);
    });
};

exports.consultHouseByName = function(req, res) {
    House.findOne({name:req.params.name}, function(err, house) {
        if (err)
            res.send(err);
        res.json(house);
    });
};


exports.updateHouse = function(req, res) {
    House.findOneAndUpdate({_id: req.params.houseId}, req.body, {new: true}, function(err, house) {
        if (err)
            res.send(err);
        res.json(house);
    });
};


exports.deleteHouse = function(req, res) {
    House.remove({
        _id: req.params.houseId
    }, function(err, house) {
        if (err)
            return res.send(err);
        return res.json({ message: 'A casa foi extinta :´(' });
    });
};