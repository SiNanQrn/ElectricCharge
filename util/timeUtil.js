// 导入 dayjs 插件
const dayjs = require("dayjs");

// 获取当前时间
function getCurrentDate() {
  const now = new Date();
  let currentTime = dayjs(now).format("YYYY-MM-DD") + " 08:00:00";
  console.log("currentTime", currentTime);
  return currentTime;
}
module.exports = { getCurrentDate }
