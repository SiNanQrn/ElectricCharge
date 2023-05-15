const fs = require("fs");
fs.readFile("./domo.html", "utf8", (err, res) => {
  if (err) return console.log(err);

  const reg = /data: ({[\s\S]*}),\n\s*methods/;
  const matchRes = res.match(reg);

  let obj = JSON.parse(matchRes[1]);
  // console.log("拿到数据了", obj);

  // 余额 - balance
  let balance = obj.dashboard.value;
  console.log("余额:", balance);

  // 表号 - electricMeter
  let electricMeter = obj.dashboard.items[0].value.slice(0, 12);
  console.log("表号:", electricMeter);

  // 采集日期 - acquisitionTime 
  let acquisitionTime = obj.dashboard.items[1].value;
  console.log("采集日期:", acquisitionTime);

  // 户名 - accountName
  let accountName = obj.dashboard.items[2].value;
  console.log("户名:", accountName);

  // 上次缴费日期 - lastChargeDate
  let lastChargeDate = obj.payment.time + '日';
  console.log("上次缴费日期:", lastChargeDate);

  // 上次缴费金额 - lastChargeAmount
  let lastChargeAmount = obj.payment.opration.replace(/[^0-9|\.]/g, '');
  console.log("上次缴费金额:", lastChargeAmount);
});
