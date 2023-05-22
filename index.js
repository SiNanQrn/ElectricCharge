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
// 导入新增方法
const { insertRecord } = require("./apiMethods");

// 查询数据处理后，新增
function queryElectricity() {
  console.log("step1:调用电费系统查询接口：");
  axios
    .get("http://wx.tqdianbiao.com/Client/bcd7am211016098302")
    .then(function (response) {
      // 处理数据
      let afterHandle = handleData(response.data);
      // console.log("afterHandle", afterHandle);
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
        return "思南,请注意电费不足5大洋,记得缴费";
      }
    })
    .catch(function (error) {
      console.log("电费系统查询接口报错,快看看吧", error);
    });
}

module.exports = { queryElectricity };
