const { pool } = require('../db/index');
const connectionQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        resolve(err);
      }
        conn.query(sql, params, (err, result) => {
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
