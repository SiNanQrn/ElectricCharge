const fs = require("fs");
fs.readFile("./domo.html", "utf8", (err, res) => {
  if (err) return console.log(err);

  const reg = /data: ({[\s\S]*}),\n\s*methods/;
  const result = res.match(reg);
  console.log("拿到数据了", JSON.parse(result && result[1]));
});
