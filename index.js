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
const dayjs = require('dayjs')

// 定义要执行的函数
function queryElectricity() {
  console.log("调用电费系统查询接口");
  // 在这里调用电费系统的查询接口
}

// 获取当前时间
const now = new Date();
let currentDay = dayjs(now).format('YYYY-MM-DD') + ' 08:00:00'
console.log("currentDay", currentDay);

// 间隔一天执行
// const delay = 86400000;
// 设置定时器，在明天凌晨执行函数
setInterval(queryElectricity, 1000);