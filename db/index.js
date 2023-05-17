// 导入 mysql 模块
const mysql = require("mysql");

// 创建数据库
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "123456789",
  database: "electric_charge",
});

module.exports = db;
