//引入模块 nodemailer
const nodemailer = require("nodemailer");
// 导入 node-schedule 插件
const schedule = require("node-schedule");
const { getRecord } = require("./apiMethods");
const { queryElectricity } = require("./handleApi");

//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport({
  service: "QQ",
  secure: false,
  auth: {
    // 发件人邮箱账号
    user: "1987147904@qq.com",
    //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
    pass: "htppmuabhdlfdede", //授权码生成之后，要等一会才能使用，否则验证的时候会报错，但是不要慌张哦
  },
});

//创建一个收件人对象
const mail = {
  // 发件人 邮箱  '昵称<发件人邮箱>'
  from: `1987147904@qq.com`,
  // 主题
  subject: "激活验证码",
  // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
  to: "1987147904@qq.com",
  //这里可以添加html标签
  html: "",
};

function weekSearch() {
  getRecord().then(
    async (msg) => {
      // console.log("打印查询返回msg", msg.data);
      let str = "";
      msg.data.forEach((o, index) => {
        str += `-----------电费账单(${index})----------\n电费余额: ${o.balance}元\n电表号: ${o.electricMeterNum}\n采集时间: ${o.acquisitionTime}\n电表号: ${o.accountName}\n上次缴费时间: ${o.lastChargeDate}\n上次缴费金额: ${o.lastChargeAmount}元\n---------------------------------\n`;
      });
      mail.html = str;
      //  发送邮件
      sendMail();
    },
    (err) => {
      console.log("打印查询返回err", err);
    }
  );
}

// 周日8点，查询周电费账单
schedule.scheduleJob({ hour: 8, minute: 30, dayOfWeek: 0 }, weekSearch);

async function daySearch() {
  let str = queryElectricity();
  // 如果触发低量，则微信提醒
  if (str !== undefined) {
    mail.html = str;
    //  发送邮件
    sendMail();
  }
}
// 每天8点查询电费账单，插入数据库
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 23;
rule.minute = 37;
schedule.scheduleJob(rule, daySearch);

function sendMail() {
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    transporter.close();
    console.log("mail sent:", info.response);
  });
}
