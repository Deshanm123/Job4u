const Citizen = require('../model/Citizen');
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
  const { email, userName, password } = req.body;

  try {
    let emailRegisteredResults = await Citizen.getCitizenDetailsByMail(email);
    //   check  email is not  registered
    if (emailRegisteredResults.length === 0) {
      // encrypting password
      let encrptedPassword = await encryptPassword(password);
      console.log('encrptedPassword' + encrptedPassword)

      let result = await Citizen.registerCitizen(email, userName, encrptedPassword, 'citizen');
      //         //sucessful registration 
      if (result.affectedRows > 0) {
        let registeredUser = await Citizen.getCitizenDetailsByMail(email);
        // console.log(registeredUser.userId);
        // // creating JWT
        const token = createToken(registeredUser.userId);
        console.log(token);
        // storing JWT inside a cookie
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        //   //sucessfully created
        // res.status(201).json({ token:token});
        res.status(201).send({ msgType: "success", msg: `Congratulations! your account has been successfully created. Please Login `, token: token });

      } else {
        // registration failed
        res.status(401).json({ msgType: "danger", msg: `user  with email ${email} registration failed` })
      }
    } else {
      //     console.log('user already in the dblist ');
      res.status(401).json({ msgType: "danger", msg: `user with  ${email} is already exsits.Try another mail  ` })
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
  const { email, password } = req.body;
  try {
    let userRegisteredResults = await Citizen.getCitizenDetailsByMail(email);
    // console.log(userRegisteredResults)
    // check user exists
    if (userRegisteredResults.length > 0) {
       const isValidPassword = await bcrypt.compare(password, userRegisteredResults[0].password)
      if (isValidPassword){
      //  creating json web tokens
        const token = createToken(userRegisteredResults[0].userId);
       // storing JWT inside a cookie
        res.cookie('jwt', token, { maxAge: maxAge, httpOnly: true });

        res.status(201).send({ msgType: "success", msg: `Congratulations! your account has been successfully Logged `, token: token });
        res.render('citizen/citizen-dashboard');

      }else{
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





exports.getDashboard = (req, res) => {
  res.render('citizen/citizen-dashboard');
};
exports.getMyCv = (req, res) => {
  res.render('citizen/citizen-cv');
};
