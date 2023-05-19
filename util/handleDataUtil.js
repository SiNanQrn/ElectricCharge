// 导入自定义工具函数
const { getEightTime } = require("./timeUtil")
// 获取当前时间
const currentDay = getEightTime()

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
    lastChargeAmount: lastChargeAmount,
    currentDay: currentDay
  }
}


module.exports = { handleData }