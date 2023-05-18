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

// 数据处理函数
function handleData(data) {
  const reg = /data: ({[\s\S]*}),\s*methods/;
  const matchRes = data.match(reg)[1];
  let obj = JSON.parse(matchRes);

  // 余额 - balance
  let balance = obj.dashboard.value;
  console.log("余额:", balance);

  // 表号 - electricMeterNum
  let electricMeterNum = obj.dashboard.items[0].value.slice(0, 12);
  console.log("表号:", electricMeterNum);

  // 采集日期 - acquisitionTime
  let acquisitionTime = obj.dashboard.items[1].value;
  console.log("采集日期:", acquisitionTime);

  // 户名 - accountName
  let accountName = obj.dashboard.items[2].value;
  console.log("户名:", accountName);

  // 上次缴费日期 - lastChargeDate
  let lastChargeDate = obj.payment.time + "日";
  console.log("上次缴费日期:", lastChargeDate);

  // 上次缴费金额 - lastChargeAmount
  let lastChargeAmount = obj.payment.opration.replace(/[^0-9|\.]/g, "");
  console.log("上次缴费金额:", lastChargeAmount);
  return {
    balance: balance,
    electricMeterNum: electricMeterNum,
    acquisitionTime: acquisitionTime,
    accountName: accountName,
    lastChargeDate: lastChargeDate,
    lastChargeDate: lastChargeDate
  }
}

// 调用电费系统查询接口
function queryElectricity() {
  console.log("step1:调用电费系统查询接口：");
  axios
    .get("http://wx.tqdianbiao.com/Client/bcd7am211016098302")
    .then(function (response) {
      // console.log(response.data);
      // 处理数据
      // let afterHandle = handleData(response.data);
      let afterHandle = {
        balance: 48.53,
        electricMeterNum: '211016098302',
        acquisitionTime: '2023-05-18 17:00:20',
        accountName: '6',
        lastChargeDate: '2023年05月17日'
      }
      console.log('afterHandle', afterHandle)
      // 调新增接口
      insertEleRecords(afterHandle)

    })
    .catch(function (error) {
      console.log(error);
    });
}

// 调用自己的新增电费记录接口
function insertEleRecords(data) {
  console.log("step2:调用新增电费记录接口：");
  axios({
    method: 'post',
    url: 'http://127.0.0.1:3007/api/insertRecord',
    data: data
  }).then(function (response) {
    console.log(response.data);

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
