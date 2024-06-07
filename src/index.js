//文件夹下主入口文件
const path = require('path');
const router = require('./router')
const { repool } = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apply = express();
apply
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(cors())
    .use(router);
  
apply.use(express.static(path.join(__dirname, 'public')));  

repool();
const run = (port) => {
  return apply.listen(port, () => {
    console.log(port, 'successfully---boilng');
  });
};
module.exports = run;
