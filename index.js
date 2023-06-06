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
  subject: "主人，您的电费有新情况啦",
  // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
  to: "1987147904@qq.com",
  //这里可以添加html标签
  html: "",
};

function weekSearch() {
  console.log("开始查询周账单");

  getRecord().then(
    async (msg) => {
      console.log("打印查询周账单返回msg.data", msg.data);
      let str = "";
      msg.data.forEach((o) => {
        str += `<tr>
            <td>${o.electricMeterNum}</td>
            <td>${o.accountName}</td>
            <td>${o.balance}</td>
            <td>${o.acquisitionTime}</td>
            <td>${o.lastChargeDate}</td>
            <td>${o.lastChargeAmount}</td>
          </tr>`;
      });
      mail.html =
        `<style>
        td,
        th {
          border: 1px solid rgb(190, 190, 190);
          padding: 10px;
        }

        td {
          text-align: center;
          white-space: nowrap;
        }

        tr:nth-child(even) {
          background-color: #eee;
        }

        th[scope="col"] {
          background-color: #696969;
          color: #fff;
        }

        th[scope="row"] {
          background-color: #d7d9f2;
        }

        table {
          border-collapse: collapse;
          border: 2px solid rgb(200, 200, 200);
          letter-spacing: 1px;
          font-family: sans-serif;
          font-size: 0.8rem;
        }
      </style>
      
      <table>
        <caption>
          <h3>本周电费账单</h3>
        </caption>
        <tr>
          <th scope="col">电表号</th>
          <th scope="col">账号</th>
          <th scope="col">电费余额</th>
          <th scope="col">采集时间</th>
          <th scope="col">上次缴费时间</th>
          <th scope="col">上次缴费金额</th>
        </tr>` +
        str +
        "</table>";
      console.log("开始发送邮件");
      //  发送邮件
      sendMail();
    },
    (err) => {
      console.log("打印周账单查询返回err", err);
    }
  );
}
// 周日8点，查询周电费账单
schedule.scheduleJob({ hour: 10, minute: 0, dayOfWeek: 0 }, weekSearch);

async function daySearch() {
  let str = await queryElectricity();
  // 如果触发低量，则邮件提醒
  if (str !== null) {
    mail.html = str;
    // 发送邮件
    sendMail();
  }
}
// 每天8点查询电费账单，插入数据库
let rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 8;
rule.minute = 30;
schedule.scheduleJob(rule, daySearch);

function sendMail() {
  console.log("开始发短信");
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    transporter.close();
    console.log("mail sent:", info.response);
  });
}

queryElectricity();
