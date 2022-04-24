const express = require('express');
const router = express.Router();
const citizenController = require('../controller/citizenController.js');
const multer = require('../services/multer');



const { checkAuthunetication, verfiedUserInfo } = require('./../middleware/authenticationMiddleware');

// NOTE MAKE ROUTE AS CITIZENS

// register
router.get('/register', citizenController.getRegister);
router.post('/register', citizenController.postRegister);

// login
router.get('/login', citizenController.getLogin);
router.post('/login', citizenController.postLogin);

// logout
router.get('/logout', citizenController.logOut);

// dashboard
router.get('/dashboard', checkAuthunetication, citizenController.getDashboard);
// router.get('/dashboard', checkAuthunetication, verfiedUserInfo, citizenController.getDashboard);

router.get('/dashboard/myCv', checkAuthunetication, verfiedUserInfo, citizenController.getMyCv);
// // router.post('/login', generalContFroller.postLogin);
router.post('/nid/cv', multer.upload.single('cv'), verfiedUserInfo, citizenController.postCvDocument);

// postBirthCertificatetDocument
router.post('/nid/birthCertificate', multer.upload.single('birthCertificate'), verfiedUserInfo, citizenController.postBirthCertificateDocument)

router.post('/nid/certificates', multer.upload.array('certificates',3), verfiedUserInfo, citizenController.postCertificateDocuments)
 
// // router.get('/contact', generalController.getContact);
// // router.post('/contact', generalController.postContact);




module.exports = router;