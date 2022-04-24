const Citizen = require('../model/Citizen');
const Document = require('../model/Document');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//encrypt password
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const encrptedPassword = await bcrypt.hash(password, salt);
  return encrptedPassword;
}

const maxAge = 10 * 24 * 60 * 60; //millsieconds
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};



// Registration
exports.getRegister = (req, res) => {
  res.render('register')
};

exports.postRegister = async (req, res) => {
  console.log("Registration citizen called")
  console.log(req.body);
  try {
    const { nic, userRole, birthday, userName, email, jobName, affiliations, location, password } = req.body;
    let emailRegisteredResults = await Citizen.getCitizenDetailsByMail(email);
    //   check  email is not  registered
    if (emailRegisteredResults.length === 0) {
      // encrypting password
      let encrptedPassword = await encryptPassword(password);
      console.log('encrptedPassword' + encrptedPassword)

      let result = await Citizen.registerCitizen(email, userName, encrptedPassword, userRole);
      //         //sucessful registration 
      if (result.affectedRows > 0) {
        let registeredUser = await Citizen.getCitizenDetailsByMail(email);

        // // creating JWT
        let token = createToken(registeredUser[0].userId);

        // storing cv details on
        let cvEntry = { userId: registeredUser[0].userId, nic, birthday, jobName, affiliations, location }

        let cvRecord = await Citizen.addCVDetails(cvEntry)
        console.log('cvRecord')
        console.log(cvRecord)


        console.log(token);
        // storing JWT inside a cookie
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        //   //sucessfully created
        // res.status(201).json({ token:token});
        res.status(201).send({ msgType: "success", msg: `Congratulations! your account has been successfully created. Please Login `, token: token, cvEntry: cvEntry });

      } else {
        // registration failed
        res.status(401).json({ msgType: "danger", msg: `user  with email ${email} registration failed` })
      }
    } else {
      //     console.log('user already in the dblist ');
      res.status(401).json({ msgType: "danger", msg: `user with  ${email} is already exsits.Try another mail.` })
    }
  } catch (e) {
    console.log(e);
  }
  // res.render('register-houseowner');
}




// login
exports.getLogin = (req, res) => {
  res.render('login')
};

exports.postLogin = async (req, res) => {

  try {
    const { email, password } = req.body;
    let userRegisteredResults = await Citizen.getCitizenDetailsByMail(email);
    // console.log(userRegisteredResults)
    // check user exists
    if (userRegisteredResults.length > 0) {
      const isValidPassword = await bcrypt.compare(password, userRegisteredResults[0].password)
      if (isValidPassword) {
        //  creating json web tokens
        let token = createToken(userRegisteredResults[0].userId);
        // storing JWT inside a cookie
        res.cookie('jwt', token, { maxAge: maxAge, httpOnly: true });

        res.status(201).send({ msgType: "success", msg: `Congratulations! your account has been successfully Logged `, token: token });
        // res.render('citizen/citizen-dashboard');

      } else {
        // if passwords donot match
        res.status(401).send({ msgType: "danger", msg: `please enter correct password` });
      }
    } else {

      res.status(401).send({ msgType: "danger", msg: `${email} is not registered. Please Register` });
    }

  } catch (e) {
    console.log(e);
  }
};




// dashboard
exports.getDashboard = (req, res) => {
  res.render('citizen/citizen-dashboard');
};

exports.getMyCv = (req, res) => {
  console.log(res.locals.user)
  res.render('citizen/citizen-cv');
};

// upload cv
exports.postCvDocument = async (req, res) => {
  console.log("Posting  CV")

  try {
    let user = res.locals.user;

    let fileName = req.file.filename;

    let result = await Document.uploadDocument(user.userId, fileName, 'cvDocument')
    console.log(result)
    if (result.affectedRows > 0) {
      console.log("submiited");
      res.status(201).send({ msgType: "success", msg: `Congratulations! your CV has successfully uploaded `, file: req.file });
    } else {
      console.log(" not submiited");
      // not acceptable 
      res.status(406).send({ msgType: "danger", msg: `CV UPLOAD FAIL : your ${req.file.originalfilename} is not uploaded.`, file: req.file });
    }
  } catch (err) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY') {
      // duplicate entry handled by 304 :not modified status code
      res.status(406).send({ msgType: "danger", msg: `CV UPLOAD FAIL : ERROR CV is already uploaded`, file: req.file });

    } else {
      // conflict -not sure
      res.status(409).send({ msgType: "danger", msg: `CV UPLOAD FAIL :ERROR ${err.message}`, file: req.file });
    }
  }

}

// uploadbirth certificate
exports.postBirthCertificateDocument = async (req, res) => {
  console.log("Posting  Birth Certificate")
  try {

    let user = res.locals.user;

    let fileName = req.file.filename;

    let result = await Document.uploadDocument(user.userId, fileName, 'birthCertificate')
    console.log(result)
    if (result.affectedRows > 0) {
      console.log("submiited");
      res.status(201).send({ msgType: "success", msg: `Congratulations! your Birth Certificate has successfully uploaded `, file: req.file });
    } else {
      console.log(" not submiited");
      // not acceptable 
      res.status(406).send({ msgType: "danger", msg: `Birth Certificate UPLOAD FAIL : your ${req.file.originalfilename} is not uploaded.`, file: req.file });
    }
  } catch (err) {
    console.log(err);
    if (err.code === 'ER_DUP_ENTRY') {
      // duplicate entry handled by 304 :not modified status code
      res.status(406).send({ msgType: "danger", msg: `Birth Certificate UPLOAD FAIL : ERROR CV is already uploaded`, file: req.file });

    } else {
      // conflict -not sure
      res.status(409).send({ msgType: "danger", msg: `Birth Certificate UPLOAD FAIL :ERROR ${err.message}`, file: req.file });
    }
  }

}

// upload certificates
exports.postCertificateDocuments = async (req, res) => {
  console.log("Posting Certificates")

  let user = res.locals.user;
  // console.log(req.body);

  console.log(req.files);
  // console.log(req.certificates);

  let files = req.files;
  // console.log(files)
  let  filePathArr=[];
  for(let i=0;i<files.length;i++){
    filePathArr.push(files[i].filename)
  }
  // console.log(filePathArr);
  try {
  let result = await Document.uploadDocument(user.userId, filePathArr, 'certificates')
  console.log(result);
  if (result.affectedRows > 0) {
    res.status(201).send({ msgType: "success", msg: `Congratulations! your Certificates have successfully uploaded `, file: files });
    // console.log("submitted");
    } else {
      // console.log(" not submiited");
      // not acceptable 
      res.status(406).send({ msgType: "danger", msg: ` Certificate UPLOAD FAIL : your  certificates are not uploaded.`, file: files });
    }
  } catch (err) {
    // console.log(err);
    if (err.code === 'ER_DUP_ENTRY') {
      // duplicate entry handled by 304 :not modified status code
      res.status(406).send({ msgType: "danger", msg: `Certificates UPLOAD FAIL : ERROR CV is already uploaded`, file: files });

    }else{
      // conflict -not sure
      res.status(409).send({ msgType: "danger", msg: `Certificates UPLOAD FAIL :ERROR ${err.message}`, file: files });
    }
  }

}



// logout

// ////////////////////logout
exports.logOut = (req, res) => {
  console.log("logout");

  res.clearCookie("jwt");


  res.redirect('/citizen/login'); //redirect to login

}


