const express = require('express')
const router = express.Router();
const path = require('path');
const data = {};

data.employee = require('../model/employee.json')


module.exports = router