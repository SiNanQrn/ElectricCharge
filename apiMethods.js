// 导入 数据库操作模块
const db = require("./db/index");

exports.insertRecord = (req) => {
  console.log("req", req);

  if (
    !req.balance ||
    !req.acquisitionTime ||
    !req.lastChargeDate ||
    !req.lastChargeAmount
  ) {
    return console.log(
      "电费余额、采集时间、上次缴费时间或者上次缴费金额不得为空"
    );
  }

  const sql = "SELECT * FROM electricList WHERE acquisitionTime=?";
  db.query(sql, [req.acquisitionTime], (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return console.log(err);
    }
    console.log("打印results", results);

    // 判断 acquisitionTime 是否被占用
    if (results.length > 0) {
      return console.log({
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
          return console.log(err);
        }

        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return console.log("插入记录失败");
        }

        // 注册成功
        console.log({ status: 200, msg: "新增记录成功" });
      }
    );
  });
};
