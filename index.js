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
// 导入自定义工具函数
const { handleData } = require("./util/handleDataUtil");
const { getCurrentDate } = require("./util/timeUtil");
// 导入新增方法
const { insertRecord } = require("./router_handler/index");
// console.log("insertRecord", insertRecord);
// 获取当前时间
const currentDay = getCurrentDate();

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
      //   currentDay: currentDay,
      // };
      console.log("afterHandle", afterHandle);
      // 需求一：调新增接口
      // insertRecord(afterHandle);
      insertEleRecords(afterHandle);

      // 需求二：低量提醒缴费
      if (afterHandle.balance <= 5) {
        // TODO:微信提醒缴费
      }
    })
    .catch(function (error) {
      console.log("电费系统查询接口报错,快看看吧", error);
    });
}

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

// 间隔一天执行
// const delay = 86400000;
// 设置定时器，在明天凌晨执行函数
// setInterval(queryElectricity, 100000);

queryElectricity();
