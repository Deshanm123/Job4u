const pool = require('../config/db-config');
const uuid = require('uuid');

class Citizen {

  static registerCitizen(email, userName, password, userRole) {
    let userId = uuid.v4();
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO user_tb (userId,email,userName,password,userRole) VALUES (?,?,?,?,?)", [userId, email, userName, password, userRole], (err, rows) => {
          // return connection to tthe pool
          connection.release();
          if (!err) {
            resolve(rows);
          }
          else {
            reject(err);
          }
        });
      });
    });
  }

  // get user detials by email
  static getCitizenDetailsByMail(email) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM user_tb WHERE email = ?", [email], (err, rows) => {
          connection.release();
          if (!err) {
            resolve(rows);
          }
          else {
            reject(err);
          }
        });
      });
    });
  }

  // get user detials from id 
  static getCitizenDetailsById(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM user_tb WHERE userId = ?", id, (err, rows) => {
          connection.release();
          if (!err) {
            resolve(rows);
          }
          else {
            reject(err);
          }
        });
      });
    });
  }


  // get cv details 
  static addCVDetails(input) {
    console.log(input)
    // converting affiliation array to json
    let affiliationsJson = JSON.stringify(Object.assign({}, input.affiliations));
    let locationjson = JSON.stringify(Object.assign({}, input.location));
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("INSERT INTO cvdetails_tb(userId, birthday, affiliations, location) VALUES(?,?,?,?)", [input.userId, input.birthday, affiliationsJson, locationjson], (err, rows) => {
          connection.release();
          if (!err) {
            resolve(rows);
          }
          else {
            reject(err);
          }
        });
      });
    });


  }

  // gct  all the citizen details-
  static viewCitizenDetails() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query("SELECT * FROM cvdetails_tb", (err, rows) => {
          connection.release();
          if (!err) {
            resolve(rows);
          }
          else {
            reject(err);
          }
        });
      });
    });

  }


}









module.exports = Citizen;