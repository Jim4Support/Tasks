const mongoose = require('mongoose');
const GuestSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
});

const Guest = mongoose.model('Meetup', GuestSchema, 'meetups');

module.exports = Guest;
