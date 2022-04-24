const pool = require('../config/db-config');


class Document {

  static uploadDocument(userId, document, docType) {
    let insertQry= '';
    
    if (docType === 'cvDocument' ){
      insertQry = "INSERT INTO cvdoc_tb (userId, cvDocPath) VALUES (?,?)"
    }
    if(docType === 'birthCertificate' ){
      insertQry = "INSERT INTO birthcertificate_tb (userId,birthDocPath) VALUES (?,?)"
    }
    if (docType === 'certificates') {
      document = JSON.stringify(Object.assign({}, document));
      insertQry = "INSERT INTO certificates_tb (userId,certificates) VALUES (?,?)";
      
      console.log(document);
     

    }
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(insertQry, [userId, document], (err, rows) => {
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


 



}









module.exports = Document;