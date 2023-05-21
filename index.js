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
const { getEightTime } = require("./util/timeUtil");
// 导入新增方法
const { insertRecord } = require("./apiMethods");

// 获取当前时间
const eightTime = getEightTime();
// 调用电费系统查询接口
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
      //   acquisitionTime: "2023-05-18 17:00:20",
      //   accountName: "6",
      //   lastChargeDate: "2023年05月17日",
      //   lastChargeAmount: "50.00",
      //   eightTime: eightTime,
      // };
      console.log("afterHandle", afterHandle);
      // 需求一：调新增接口
      insertRecord(afterHandle);
      // insertEleRecords(afterHandle);

      // 需求二：低量提醒缴费
      if (afterHandle.balance <= 5) {
        // TODO:微信提醒缴费
      }
    })
    .catch(function (error) {
      console.log("电费系统查询接口报错,快看看吧", error);
    });
}

queryElectricity();

// 调用自己的新增电费记录接口
function insertEleRecords(data) {
  console.log("step2:调用新增电费记录接口：");
  axios({
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "post",
    url: "http://127.0.0.1:3007/api/insertRecord",
    data: data,
  }).then(function (response) {
    console.log(response.data);
  });
}

// 每周日8点获取本周电费账单
schedule.scheduleJob({ hour: 8, minute: 0, dayOfWeek: 0 }, queryElectricity);

// 调用自己的查询接口
function listRecord() {
  axios.get("http://127.0.0.1:3007/api/getRecord").then(function (response) {
    console.log("response", response.data);
    // TODO:微信展示账单明细
  });
}

// 需求三：查询周电费账单
if (dayjs().get("day") === 0) {
  console.log("今天是周日");
  // 调用自己的查询接口
  // listRecord();
}
console.log("eightTime", dayjs().get("day"));
