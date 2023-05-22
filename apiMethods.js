// 导入 数据库操作模块
const db = require("./db/index");

exports.insertRecord = (req) => {
  return new Promise((resolve, reject) => {
    console.log("req", req);

    if (
      !req.balance ||
      !req.acquisitionTime ||
      !req.lastChargeDate ||
      !req.lastChargeAmount
    ) {
      return reject("电费余额、采集时间、上次缴费时间或者上次缴费金额不得为空");
    }

    const sql = "SELECT * FROM electricList WHERE acquisitionTime=?";
    db.query(sql, [req.acquisitionTime], (err, results) => {
      // 执行 SQL 语句失败
      if (err) {
        return reject(err);
      }

      // 判断 acquisitionTime 是否被占用
      if (results.length > 0) {
        return reject({
          status: 503,
          msg: "acquisitionTime 已被占用",
        });
      }

      // 定义插入 electricList 表格的语句
      const insertSql = "INSERT INTO electricList set ?";
      db.query(
        insertSql,
        {
          balance: req.balance,
          electricMeterNum: req.electricMeterNum,
          accountName: req.accountName,
          acquisitionTime: req.acquisitionTime,
          lastChargeDate: req.lastChargeDate,
          lastChargeAmount: req.lastChargeAmount,
        },
        (err, results) => {
          // 执行 SQL 语句失败
          if (err) {
            return reject(err);
          }

          // SQL 语句执行成功，但影响行数不为 1
          if (results.affectedRows !== 1) {
            return reject("插入记录失败");
          }

          // 注册成功
          resolve({ status: 200, msg: "新增记录成功" });
        }
      );
    });
  });
};

exports.getRecord = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM electricList WHERE YEARWEEK(acquisitionTime, 1) = YEARWEEK(NOW(), 1);`;
    db.query(sql, [], (err, results) => {
      // 执行 SQL 语句失败
      if (err) return reject(err);

      if (results.length === 0) {
        return reject({
          status: 503,
          msg: "未查询到电费记录",
        });
      }
      // 查询成功
      return resolve({
        status: 200,
        msg: "查询成功",
        data: results,
      });
    });
  });
};
