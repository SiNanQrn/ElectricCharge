/*
  需求一：
    1.定时任务：每天凌晨调用电费系统的查询接口
    2.解析获取到html内容
    3.调用自己的新增接口，插入数据
  需求二：
    1.当电费越仅剩5元时，微信提醒交电费
  需求三：
    1.每周调用自己的查询接口，微信展示本周的电费数据
*/

// 导入 axios 插件
const axios = require("axios");
// 导入 dayjs 插件
const dayjs = require("dayjs");
// 导入 node-schedule 插件
const schedule = require("node-schedule");

// 导入自定义工具函数
const { handleData } = require("./util/handleDataUtil");
// 导入新增方法
const { insertRecord, getRecord } = require("./apiMethods");

// 查询数据处理后，新增
function queryElectricity() {
  console.log("step1:调用电费系统查询接口：");
  axios
    .get("http://wx.tqdianbiao.com/Client/bcd7am211016098302")
    .then(function (response) {
      // 处理数据
      let afterHandle = handleData(response.data);
      // let afterHandle = {
      //   balance: 48.53,
      //   electricMeterNum: "211016098302",
      //   acquisitionTime: "2023-05-22 17:00:22",
      //   accountName: "6",
      //   lastChargeDate: "2023年05月17日",
      //   lastChargeAmount: "50.00",
      // };
      console.log("afterHandle", afterHandle);
      // 需求一：调新增接口
      insertRecord(afterHandle)
        .then((msg) => {
          console.log("打印新增方法msg", msg);
        })
        .catch((err) => {
          console.log("打印新增方法err", err);
        });

      // 需求二：低量提醒缴费
      if (afterHandle.balance <= 5) {
        // TODO:微信提醒缴费
      }
    })
    .catch(function (error) {
      console.log("电费系统查询接口报错,快看看吧", error);
    });
}

// queryElectricity();
// 查询
// getRecord().then(
//   (msg) => {
//     console.log("打印查询返回msg", msg);
//     // TODO:微信展示账单明细
//   },
//   (err) => {
//     console.log("打印查询返回err", err);
//   }
// );

// 每天8点，查询电费账单，插入数据库
schedule.scheduleJob({ hour: 8, minute: 0, dayOfWeek: 0 }, queryElectricity);

// 需求三：查询周电费账单
if (dayjs().get("day") === 0) {
  console.log("今天是周日");
  // 调用自己的查询接口
  getRecord().then(
    (msg) => {
      console.log("打印查询返回msg", msg);
      // TODO:微信展示账单明细
    },
    (err) => {
      console.log("打印查询返回err", err);
    }
  );
}

module.exports = { queryElectricity, getRecord };
