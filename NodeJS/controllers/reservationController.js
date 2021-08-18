const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Reservation } = require("../models/reservation");

// => localhost:3000/reservations/

//gets a list of all the reservations
router.get('/', (req, res) => {
    Reservation.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Reservation :' + JSON.stringify(err, undefined, 2)); }
    });
});

//gets a specific reservation using its id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Reservation.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Reservation :' + JSON.stringify(err, undefined, 2)); }
    });
});

//creates a new reservation
router.post('/', (req, res) => {
    var reserv = new Reservation({
        name: req.body.name,
        sport: req.body.sport,
        day: req.body.day,
        time: req.body.time,
    });
    reserv.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reservation Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

//updates an existing reservation
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var reserv = {
        name: req.body.name,
        sport: req.body.sport,
        day: req.body.day,
        time: req.body.time,
    };
    Reservation.findByIdAndUpdate(req.params.id, { $set: reserv }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reservation Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//deletes reservation with given id
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Reservation.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Reservation Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;