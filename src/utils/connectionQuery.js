const { pool } = require('../db/index');
const connectionQuery = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        resolve(err);
      }
      conn.query(sql, (err, result) => {
        conn.release();
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  });
};
module.exports = connectionQuery;
