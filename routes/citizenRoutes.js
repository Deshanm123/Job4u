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
router.get('/dashboard', checkAuthunetication, verfiedUserInfo, citizenController.getDashboard);
// router.get('/dashboard', checkAuthunetication, verfiedUserInfo, citizenController.getDashboard);

router.get('/dashboard/myCv', checkAuthunetication, verfiedUserInfo, citizenController.getMyCv);

router.post('/dashboard/qualifications', checkAuthunetication, verfiedUserInfo, citizenController.postCitizenQualifications);
router.delete('/dashboard/qualifications', checkAuthunetication, verfiedUserInfo, citizenController.deleteCitizenQualifications);
// router.delete('/dashboard/qualifications/remove', checkAuthunetication, verfiedUserInfo, citizenController.deleteCitizenQualifications);
// // router.post('/login', generalContFroller.postLogin);

// update qualifications
router.get('/dashboard/updateQualifications', checkAuthunetication, verfiedUserInfo, citizenController.getupdateQualifications);
router.put('/dashboard/qualifications', checkAuthunetication, verfiedUserInfo, citizenController.updateCitizenQualifications);

// cv
router.post('/nid/cv', multer.upload.single('cv'), verfiedUserInfo, citizenController.postCvDocument);
router.put('/nid/cv', multer.upload.single('cv'), checkAuthunetication, verfiedUserInfo, citizenController.putCvDocument);
router.delete('/nid/cv', checkAuthunetication, verfiedUserInfo, citizenController.deleteCvDocument);

// BirthCertificate
router.post('/nid/birthCertificate', multer.upload.single('birthCertificate'), verfiedUserInfo, citizenController.postBirthCertificateDocument)
router.delete('/nid/birthCertificate', checkAuthunetication, verfiedUserInfo, citizenController.deleteBirthCertificateDocument);


// certificate
router.post('/nid/certificates', multer.upload.array('certificates', 3), verfiedUserInfo, citizenController.postCertificateDocuments)
router.delete('/nid/certificates',verfiedUserInfo, citizenController.deleteCertificateDocuments)

// // router.get('/contact', generalController.getContact);
// // router.post('/contact', generalController.postContact);




module.exports = router;