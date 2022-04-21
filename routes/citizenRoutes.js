const express = require('express');
const router = express.Router();
const citizenController = require('../controller/citizenController.js');


// register
router.get('/register', citizenController.getRegister);
router.post('/register', citizenController.postRegister);

// login
router.get('/login', citizenController.getLogin);
router.post('/login', citizenController.postLogin);

// dashboard
router.get('/dashboard', citizenController.getDashboard);

router.get('/dashboard/myCv', citizenController.getMyCv);
// // router.post('/login', generalController.postLogin);



// // router.get('/contact', generalController.getContact);
// // router.post('/contact', generalController.postContact);




module.exports = router;