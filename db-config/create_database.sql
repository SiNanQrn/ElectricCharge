CREATE TABLE `electricList` (
  `balance` varchar(50) NOT NULL COMMENT '电费余额',
  `electricMeterNum` varchar(45) NOT NULL COMMENT '电表号',
  `acquisitionTime` varchar(45) NOT NULL COMMENT '采集时间',
  `accountName` varchar(45) NOT NULL COMMENT '户名',
  `lastChargeDate` varchar(45) NOT NULL COMMENT '上次缴费时间',
  `lastChargeAmount` varchar(45) NOT NULL COMMENT '上次缴费金额',
  PRIMARY KEY (`balance`,`electricMeterNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;