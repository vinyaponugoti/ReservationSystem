const mongoose = require('mongoose');

var Reservation = mongoose.model('Reservation', {
    name: { type: String },
    sport: { type: String },
    day: { type: String},
    time: { type: String }
});

module.exports = { Reservation };