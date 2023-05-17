// 导入 数据库操作模块
const db = require("../db/index");

exports.insertRecord = (req, res) => {
  const listInfo = req.body;
  console.log("listInfo", listInfo);

  if (
    !listInfo.balance ||
    !listInfo.acquisitionTime ||
    !listInfo.lastChargeDate ||
    !listInfo.lastChargeAmount
  ) {
    return res.cc("电费余额、采集时间、上次缴费时间或者上次缴费金额不得为空");
  }

  const sql = "SELECT * FROM electricList WHERE acquisitionTime=?";
  db.query(sql, [listInfo.acquisitionTime], (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }

    // 判断 acquisitionTime 是否被占用
    if (results.length > 0) {
      return res.send({
        status: 503,
        msg: "acquisitionTime 已被占用",
      });
    }

    // 定义插入 electricList 表格的语句
    const insertSql = "INSERT INTO electricList set ?";
    db.query(
      insertSql,
      {
        balance: listInfo.balance,
        electricMeterNum: listInfo.electricMeterNum,
        accountName: listInfo.accountName,
        acquisitionTime: listInfo.acquisitionTime,
        lastChargeDate: listInfo.lastChargeDate,
        lastChargeAmount: listInfo.lastChargeAmount,
      },
      (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err);
        }

        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.cc("插入记录失败");
        }

        // 注册成功
        res.send({ status: 200, msg: "新增记录成功" });
      }
    );
  });
};
