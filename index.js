const express = require('express');
const router = express.Router();

const guests = require('./guests');
const meetups = require('./meetups.js');

router.use('/guests', guests).use('/meetups', meetups);

module.exports = router;
