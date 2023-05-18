const express = require("express");
// 创建 路由对象
const router = express.Router();

// 导入路由处理函数
const handler = require("../router_handler/index");

// 新增电费记录
router.post("/insertRecord", handler.insertRecord);

// 查询电费记录()
// router.get("/getRecord", handler.getRecord);

module.exports = router;
