[
  'data: {"dashboard":{"show":true,"title":"\\u5269\\u4f59\\u91d1\\u989d \\uff08\\u5143\\uff09","value":49.15,"items":[{"title":"\\u8868\\u53f7","value":"211016098302 <font color=\\"green\\">\\u5728\\u7ebf<\\/font>"},{"title":"\\u91c7\\u96c6\\u65f6\\u95f4","value":"2023-05-18 09:00:20"},{"title":"\\u6237\\u540d","value":"6"},{"title":"\\u603b\\u7535\\u91cf","value":"2086.85 kWh"}]},"configs":[{"name":"tq_alipay","on":true,"show":true,"checked":false,"text":"\\u652f\\u4ed8\\u5b9d"},{"name":"tqpay","on":true,"show":true,"text":"\\u5fae\\u4fe1\\u652f\\u4ed8","checked":true}],"payment":{"show":true,"time":"2023\\u5e7405\\u670817","opration":"\\u5145\\u503c 50.00\\u5143","state":"<font color=\\"green\\">\\u5145\\u503c\\u6210\\u529f<\\/font>","finished":true}},\r\n' +'        methods',
  '"dashboard":{"show":true,"title":"\\u5269\\u4f59\\u91d1\\u989d \\uff08\\u5143\\uff09","value":49.15,"items":[{"title":"\\u8868\\u53f7","value":"211016098302 <font color=\\"green\\">\\u5728\\u7ebf<\\/font>"},{"title":"\\u91c7\\u96c6\\u65f6\\u95f4","value":"2023-05-18 09:00:20"},{"title":"\\u6237\\u540d","value":"6"},{"title":"\\u603b\\u7535\\u91cf","value":"2086.85 kWh"}]},"configs":[{"name":"tq_alipay","on":true,"show":true,"checked":false,"text":"\\u652f\\u4ed8\\u5b9d"},{"name":"tqpay","on":true,"show":true,"text":"\\u5fae\\u4fe1\\u652f\\u4ed8","checked":true}],"payment":{"show":true,"time":"2023\\u5e7405\\u670817","opration":"\\u5145\\u503c 50.00\\u5143","state":"<font color=\\"green\\">\\u5145\\u503c\\u6210\\u529f<\\/font>","finished":true}',
  index: 3909,
  input: '<html> <head> <title>设备码充值</title> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> <meta name="renderer" content="webkit"> <link href="https://cdn.tqdianbiao.com/public/Client/detail-pay.css?1682624398" rel="stylesheet"> <link href="https://cdn.tqdianbiao.com/public/Client/bootstrap.min.css?1682624398" rel="stylesheet"> <link href="https://cdn.tqdianbiao.com/public/Client/jquery.mloading.css?1682624398" rel="stylesheet"> <script type="text/javascript">\t\tvar GLOBAL = {\r\n' +
    '\t\t\tRES_VERSION : "1682624398",\r\n' +
    '\t\t\tADDRESS:"bcd7am211016098302",\r\n' +
    '\t\t\tQUERY_ORDER_STATE_URL : "/client/order_state/id/bcd7am211016098302",\r\n' +
    '\t   \t\tLASTEST_PAYMENT_URL : "/client/lastest_payment/id/bcd7am211016098302",\r\n' +
    '\t\t};\r\n' +
    '\t</script> </head> <body> <div style="float:left" id="tips"><marquee><font style="font-size:12px">该二维码仅用于电费充值，谨防非法人员以投资理财、游戏充值、兼职刷单等理由诱骗支付。</font></marquee></div> <div id="vm_pay" v-cloak=""> <!-- 表盘显示方式 --> <div class="dashboard" v-show="dashboard.show"\r\n' +
    '\t\t\tstyle="box-shadow: 3px 3px 10px gray; background: -webkit-linear-gradient(left, #E8E8E8, #EFEFEF); background: -o-linear-gradient(right, #EFEFEF, #E8E8E8); background: -moz-linear-gradient(right, #EFEFEF, #E8E8E8); background: linear-gradient(to right, #EFEFEF, #E8E8E8);"> <div v-html="dashboard.title"></div> <div class="numberBox"> <img class="displayNum" v-bind:src="getImage(digit)" v-for="digit in digits" /> </div> <div class="content"> <table> <tr v-for="item in dashboard.items"> <td> <div class="item" v-if="item"> <div class="item-title" v-html="item.title" ></div> <div class="item-value" v-html="item.value" ></div> </div> </td> </tr> </table> </div> <div class="pay-panel"> <table v-if="payment.show" class="pay-record"> <tr> <td class="payment-time">{{payment.time}}</td> <td class="payment-opration" v-html="payment.opration"></td> <td v-html="payment.state" class="payment-state"></td> </tr> </table> </div> <div class="pay-panel"> <div> <table class="form-group has-success"> <tr> <td style="vertical-align:middle;"> <label class="control-label" for="amount">金额：</label> </td> <td> <input style="height:30px" type="text" class="form-control"\r\n' +
    '                        name="amount" placeHolder="0.00"/> </td> </tr> </table> </div> <div v-for="(config,idx) in configs" v-on:click="onClickPayment(idx)"\r\n' +
    '                v-if="config.show"> <table style="margin-top:10px;"> <tr> <td style="text-align:left;"> <img v-bind:src="getImage(config.name)"/> {{config.text}}\r\n' +
    '                      <label style="color:#FF0000;">{{config.on?"":"[未开通]"}}</label> </td> <td style="text-align:right;"> <img style="width:30px" v-bind:src="getPaymentCheck(idx)"/> </td> </tr> </table> </div> </div> <div style="padding:10px 10px;"> <a name="payBtn" type="button" class="btn btn-primary btn-block"\r\n' +
    '                v-on:click="onPay">确认付款</a> </div> </div> </div> </div> <div class="browser_warp_android" style="display: none;"> <div class="browser_bg"></div> <div class="open_browser_tips"> <img data-src="https://cdn.tqdianbiao.com/public/images/android_browser_tips.png?1682624398" alt="在浏览器打开" /> </div> </div> <div class="browser_warp_ios" style="display: none;"> <div class="browser_bg"></div> <div class="open_browser_tips"> <img data-src="https://cdn.tqdianbiao.com/public/images/ios_browser_tips.png?1682624398" alt="在浏览器打开" /> </div> </div> </body> <script src="https://cdn.tqdianbiao.com/public/Client/vue-2.4.2.min.js?1682624398"></script> <script src="https://cdn.tqdianbiao.com/public/Client/jquery-1.12.4.min.js?1682624398"></script> <script src="https://cdn.tqdianbiao.com/public/Client/jquery.mloading.js?1682624398"></script> <script src="https://cdn.tqdianbiao.com/public/Client/client.js?1682624398"></script> <script type="text/javascript">    var vm_pay = new Vue({\r\n' +
    "        el: '#vm_pay',\r\n" +
    '        data: {"dashboard":{"show":true,"title":"\\u5269\\u4f59\\u91d1\\u989d \\uff08\\u5143\\uff09","value":49.15,"items":[{"title":"\\u8868\\u53f7","value":"211016098302 <font color=\\"green\\">\\u5728\\u7ebf<\\/font>"},{"title":"\\u91c7\\u96c6\\u65f6\\u95f4","value":"2023-05-18 09:00:20"},{"title":"\\u6237\\u540d","value":"6"},{"title":"\\u603b\\u7535\\u91cf","value":"2086.85 kWh"}]},"configs":[{"name":"tq_alipay","on":true,"show":true,"checked":false,"text":"\\u652f\\u4ed8\\u5b9d"},{"name":"tqpay","on":true,"show":true,"text":"\\u5fae\\u4fe1\\u652f\\u4ed8","checked":true}],"payment":{"show":true,"time":"2023\\u5e7405\\u670817","opration":"\\u5145\\u503c 50.00\\u5143","state":"<font color=\\"green\\">\\u5145\\u503c\\u6210\\u529f<\\/font>","finished":true}},\r\n' +
    '        methods: {\r\n' +
    '            getPaymentCheck: function(idx) {\r\n' +
    '                if (this.$data.configs[idx].checked) {\r\n' +
    '                    return getImage("checkbox-checked"); \r\n' +
    '                } else {\r\n' +
    '                    return getImage("checkbox-unchecked");\r\n' +
    '                }\r\n' +
    '            },\r\n' +
    '            onClickPayment: function(idx) {\r\n' +
    '                if (this.$data.configs[idx].on) {\r\n' +
    '                    $.each(this.$data.configs,\r\n' +
    '                    function(idx, config) {\r\n' +
    '                        config.checked = false;\r\n' +
    '                    });\r\n' +
    '                    this.$data.configs[idx].checked = true;\r\n' +
    '                }\r\n' +
    '            },\r\n' +
    '        },\r\n' +
    '        computed: {\r\n' +
    '        \tdigits: function() {\r\n' +
    '        \t\tvar digits = ["none", "none", "none", "none", "none", "none", "dot", "none", "none"];\r\n' +
    '        \t\tvar length = digits.length;\r\n' +
    '        \t\tvar value = this.dashboard.value.toFixed(2).toString();\r\n' +
    '        \t\t\r\n' +
    '        \t\tif(value.length>length) {\r\n' +
    '        \t\t\t$.each(digits, function(idx, digit) {\r\n' +
    '        \t\t\t\tif(digit=="none") digits[idx] = "9";\r\n' +
    '        \t\t\t})\r\n' +
    '        \t\t\treturn digits;\r\n' +
    '        \t\t}\r\n' +
    "        \t\tvar reversed = value.split('').reverse();\r\n" +
    '        \t\treversed[2] = "dot";\r\n' +
    '        \t\tfor(var i=0; i < reversed.length; i++) {\r\n' +
    '        \t\t\tdigits[length-1-i] = reversed[i];\r\n' +
    '        \t\t}\r\n' +
    '        \t\treturn digits;\r\n' +
    '        \t}\r\n' +
    '        }\r\n' +
    '    });\r\n' +
    '    \r\n' +
    '    function initElements() {\r\n' +
    '    \tvar $amount = $("input[name=amount]");\r\n' +
    '        $amount.blur(function() {\r\n' +
    '            if (this.value != "") {\r\n' +
    '            \tthis.value = Number(this.value);\r\n' +
    '            \tif(this.value==0)  this.value = "";\r\n' +
    '            }\r\n' +
    '        });\r\n' +
    "        $amount.on('input propertychange', function() {\r\n" +
    '            this.value = format_num(this.value);\r\n' +
    '        });\r\n' +
    '    };\r\n' +
    '    \r\n' +
    '    initElements();\r\n' +
    '    \r\n' +
    '    function getSelectType(){\r\n' +
    '    \tvar payType = false;\r\n' +
    '\t\t$.each(vm_pay.configs, function(idx, config) {\r\n' +
    '\t\t\tif(config.checked)  payType = config.name; \r\n' +
    '\t\t});\r\n' +
    '\t\treturn payType;\r\n' +
    '    }\r\n' +
    '    \r\n' +
    '    function onPay(){\r\n' +
    '    \tvar payType = getSelectType();\r\n' +
    '\t\tif(payType == "alipay" && isMicroMessenger()){\r\n' +
    '\t\t\tshowOpenInBrowser();\r\n' +
    '\t\t\treturn;\r\n' +
    '    \t}\r\n' +
    '\t\t\r\n' +
    `    \tvar $amounts = $("input[name='amount']");\r\n` +
    '    \tvar amount = 0;\r\n' +
    '    \t$amounts.each(function() {\r\n' +
    '    \t\tif(Number($(this).val())>0)  amount = Number($(this).val());\r\n' +
    '    \t});\r\n' +
    '    \tif(amount <= 0) { showError("请输入充值金额"); return; }\r\n' +
    '    \tpostPayInfo(amount ,payType);\r\n' +
    '    }\r\n' +
    '\r\n' +
    '    //先检查再创建订单\r\n' +
    '    function postPayInfo(amount , payType,confirm = 0){\r\n' +
    '    \tshowLoading("正在创建订单...");\r\n' +
    '    \t$.ajax({\r\n' +
    "    \t\ttype:'post',\r\n" +
    '    \t\turl:"/client/pay/id/bcd7am211016098302",\r\n' +
    '    \t\tdata:{amount:amount , payType:payType,confirm:confirm},\r\n' +
    "    \t\tdataType:'json',\r\n" +
    '    \t\tsuccess:function(data){\r\n' +
    '    \t\t\tif(!data) { showError("请求失败"); return ;}\r\n' +
    '        \t\tif(data.status != 1) { showError(data.info); return ;}\r\n' +
    '        \t\tvar respData = data.info.data;\r\n' +
    '        \t\tif(respData.tip){\r\n' +
    '        \t\t\tshowConfirm(respData.title,respData.tip ,function(){\r\n' +
    '        \t\t\t\tpostPayInfo(amount,payType,1);\r\n' +
    '        \t\t\t},function(){\r\n' +
    '        \t\t\t\thideLoading();\r\n' +
    '        \t\t\t});\r\n' +
    '        \t\t}else{\r\n' +
    '        \t\t\tOnPayRequestSuccess(data.info);\r\n' +
    '        \t\t}\r\n' +
    '    \t\t},\r\n' +
    '    \t\terror:function(XMLHttpRequest, textStatus, errorThrown){\r\n' +
    '    \t\t\tshowError("请求失败");\r\n' +
    '    \t\t}\r\n' +
    '    \t});\r\n' +
    '    }    \r\n' +
    '    setTimeout(RefreshLastestPayment , 3000);\r\n' +
    '    setTimeout(function(){ $("#tips").hide(); },10000);\r\n' +
    '    </script> <html>',
  groups: undefined
]

