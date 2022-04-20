const express = require('express');
const router = express.Router();
const citizenController = require('../controller/citizenController.js');



router.get('/register', citizenController.getRegister);
router.post('/register', citizenController.postRegister);

// router.get('/login', userController.login);
// // router.get('/login', generalController.getlogin);
// // router.post('/login', generalController.postLogin);



// // router.get('/contact', generalController.getContact);
// // router.post('/contact', generalController.postContact);




module.exports = router;