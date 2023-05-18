/*
  需求一：
    1.定时任务：每天凌晨调用电费系统的查询接口
    2.解析获取到html内容
    3.调用自己的新增接口，插入数据
    4.每周调用自己的查询接口，微信展示本周的电费数据
  需求二：
     1.每天凌晨调用电费系统的查询接口
     2.当电费越仅剩5元时，微信提醒交电费
*/

// 导入 dayjs 插件
const dayjs = require("dayjs");
// 导入 axios 插件
const axios = require("axios");
// 导入 demo
// const demo = require("./domo.js");
// let demon = String()
const demo = "";
// 数据处理函数
function handleData(data) {
  const reg = /data: {([\s\S]*)},\s*methods/;
  const matchRes = data.match(reg)[1];
  console.log(matchRes);
  let obj = JSON.parse(matchRes[1]);

  // // 余额 - balance
  // let balance = obj.dashboard.value;
  // console.log("余额:", balance);

  // // 表号 - electricMeterNum
  // let electricMeterNum = obj.dashboard.items[0].value.slice(0, 12);
  // console.log("表号:", electricMeterNum);

  // // 采集日期 - acquisitionTime
  // let acquisitionTime = obj.dashboard.items[1].value;
  // console.log("采集日期:", acquisitionTime);

  // // 户名 - accountName
  // let accountName = obj.dashboard.items[2].value;
  // console.log("户名:", accountName);

  // // 上次缴费日期 - lastChargeDate
  // let lastChargeDate = obj.payment.time + "日";
  // console.log("上次缴费日期:", lastChargeDate);

  // // 上次缴费金额 - lastChargeAmount
  // let lastChargeAmount = obj.payment.opration.replace(/[^0-9|\.]/g, "");
  // console.log("上次缴费金额:", lastChargeAmount);
}

// 调用电费系统查询接口
function queryElectricity() {
  console.log("开始调用电费系统查询接口：");
  axios
    .get("http://wx.tqdianbiao.com/Client/bcd7am211016098302")
    .then(function (response) {
      // console.log(response.data);
      handleData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// 获取当前时间
const now = new Date();
let currentDay = dayjs(now).format("YYYY-MM-DD") + " 08:00:00";
console.log("currentDay", currentDay);

// 间隔一天执行
// const delay = 86400000;
// 设置定时器，在明天凌晨执行函数
// setInterval(queryElectricity, 100000);

queryElectricity();
