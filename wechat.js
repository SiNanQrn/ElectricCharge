const { WechatyBuilder, ScanStatus } = require("wechaty"); // from 'wechaty'

const qrTerm = require("qrcode-terminal");
const { getRecord } = require("./index");

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
  let msg = {
    balance: 48.53,
    electricMeterNum: "211016098302",
    acquisitionTime: "2023-05-22 17:00:22",
    accountName: "6",
    lastChargeDate: "2023年05月17日",
    lastChargeAmount: "50.00",
  };
  await contact.say(msg);
  // 查询
  // getRecord().then(
  //   async (msg) => {
  //     console.log("打印查询返回msg", msg);
  //     // TODO:微信展示账单明细

  //     await contact.say(`${msg}`);
  //   },
  //   (err) => {
  //     console.log("打印查询返回err", err);
  //   }
  // );
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
