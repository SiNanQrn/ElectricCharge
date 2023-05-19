// 导入 dayjs 插件
const dayjs = require("dayjs");

// 获取每天早上8点时间
function getEightTime() {
  const now = new Date();
  let eightTime = dayjs(now).format("YYYY-MM-DD") + " 08:00:00";
  // console.log("eightTime", eightTime);
  return eightTime;
}

// 获取当前时间
function getCurrent() {
  const now = new Date();
  let currentTime = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
  // console.log("currentTime", currentTime);
  return currentTime;
}
module.exports = { getEightTime, getCurrent }
