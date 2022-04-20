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

      let result = await Citizen.registerCitizen(email, userName, encrptedPassword);
      //         //sucessful registration 
      if (result.affectedRows > 0) {
        let registeredUser = await Citizen.getCitizenDetailsByMail(email);
        console.log(registeredUser.userId);
        // const userId = result[0].userId;
        // // creating JWT
        // const token = createToken(userId);
        // // storing JWT inside a cookie
        // res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        //   //sucessfully created
        // res.status(201).json({ userId: userId ,token:token});
        res.status(201).send({ msgType: "success", msg: `Congratulations! your account has been successfully created. Please Login ` });

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