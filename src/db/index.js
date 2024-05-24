require('dotenv').config();

//数据库连接池配置
const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT, //最大连接数
    host: process.env.DB_HOST, //ip地址
    user: process.env.DB_PASSWORD, //数据库用户名
    password: process.env.DB_PASSWORD, //数据库用户密码
    port: process.env.DB_PORT, //数据库端口
    database: process.env.DB_NAME, //数据库表名称
    connectTimeout: process.env.CONNECT_TIMEOUT, //连接超时
});
const repool = () => {
  pool.on('connection',()=>{
    console.log('someone connected!');
  })
};
module.exports = {
  pool, repool
}
