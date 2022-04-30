const express = require('express');
const router = express.Router();
const companyController = require('../controller/companyController');


//  bureauOfficer - johnbereau123@gmail.com

// company dashboard
router.get('/', companyController.getDashboard);


















module.exports = router;