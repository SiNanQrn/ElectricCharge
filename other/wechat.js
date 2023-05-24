const { WechatyBuilder, ScanStatus } = require("wechaty"); // from 'wechaty'

const qrTerm = require("qrcode-terminal");
const { getRecord } = require("./apiMethods");
const { queryElectricity } = require("./index");
// 导入 node-schedule 插件
const schedule = require("node-schedule");

// 1. Declare your Bot!
const options = {
  name: "si-nan-bot",
};

const bot = WechatyBuilder.build(options);

// 2. Register event handlers for Bot
bot
  .on("logout", onLogout)
  .on("login", onLogin)
  .on("scan", onScan)
  .on("error", onError)
  .on("message", onMessage)

  // 3. Start the bot!
  .start()
  .catch(async (e) => {
    console.error("Bot start() fail:", e);
    await bot.stop();
    process.exit(-1);
  });

//  4. You are all set. ;-]

//  5. Define Event Handler Functions for:
function onScan(qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrTerm.generate(qrcode);

    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode),
    ].join("");

    console.info(
      "onScan: %s(%s) - %s",
      ScanStatus[status],
      status,
      qrcodeImageUrl
    );
  } else {
    console.info("onScan: %s(%s)", ScanStatus[status], status);
  }

  // console.info(`[${ScanStatus[status]}(${status})] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
}

async function onLogin(user) {
  console.info(`${user.name()} login`);
  const contact = await bot.Contact.find({ name: "草莓熊" });
  function weekSearch() {
    getRecord().then(
      async (msg) => {
        // console.log("打印查询返回msg", msg.data);
        let str = "";
        msg.data.forEach((o, index) => {
          str += `-----------电费账单(${index})----------\n电费余额: ${o.balance}元\n电表号: ${o.electricMeterNum}\n采集时间: ${o.acquisitionTime}\n电表号: ${o.accountName}\n上次缴费时间: ${o.lastChargeDate}\n上次缴费金额: ${o.lastChargeAmount}元\n---------------------------------\n`;
        });
        await contact.say(str.trim());
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
      await contact.say(str);
    }
  }
  // 每天8点查询电费账单，插入数据库
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 8;
  rule.minute = 30;
  schedule.scheduleJob(rule, daySearch);
}

function onLogout(user) {
  console.info(`${user.name()} logged out`);
}

function onError(e) {
  console.error("Bot error:", e);
}

//  6. The most important handler is for:

async function onMessage(msg) {
  console.info(msg.toString());

  if (msg.self()) {
    console.info("Message discarded because its outgoing");
    return;
  }

  if (msg.age() > 2 * 60) {
    console.info("Message discarded because its TOO OLD(than 2 minutes)");
    return;
  }

  if (
    msg.type() !== bot.Message.Type.Text ||
    !/^(ding|ping|bing|code)$/i.test(msg.text())
  ) {
    console.info(
      "Message discarded because it does not match ding/ping/bing/code"
    );
    return;
  }

  /**
   * 1. reply 'dong'
   */
  await msg.say("dong");

  /**
   * 3. reply 'scan now!'
   */
  await msg.say(
    [
      "Join Wechaty Developers Community\n\n",
      "Scan now, because other Wechaty developers want to talk with you too!\n\n",
      "(secret code: wechaty)",
    ].join("")
  );
}

/**
 *
 * 7. Output the Welcome Message
 *
 */
const welcome = `
| __        __        _           _
| \\ \\      / /__  ___| |__   __ _| |_ _   _
|  \\ \\ /\\ / / _ \\/ __| '_ \\ / _\` | __| | | |
|   \\ V  V /  __/ (__| | | | (_| | |_| |_| |
|    \\_/\\_/ \\___|\\___|_| |_|\\__,_|\\__|\\__, |
|                                     |___/

=============== Powered by Wechaty ===============
-------- https://github.com/wechaty/wechaty --------
          Version: ${bot.version()}

I'm a bot, my superpower is talk in Wechat.

If you send me a 'ding', I will reply you a 'dong'!
__________________________________________________

Hope you like it, and you are very welcome to
upgrade me to more superpowers!

Please wait... I'm trying to login in...

`;
console.info(welcome);
