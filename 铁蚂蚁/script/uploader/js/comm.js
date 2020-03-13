var comm = {
    checkrequired: function (val, ret) {
        if (val.length == 0) {
            if (ret)
            {
                ret["msg"] = "该项为必填项";
                //alert(ret["msg"]);
            }
            return false;
        }
        return true;
    },

    checkPhone: function (phone, ret) {
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            if (ret) {
                ret["msg"] = "手机号码格式不对"
            }
            return false;
        }
        else {
            return true;
        }
    },
    checkEmail: function (email, ret) {
        if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email))) {
            if (ret) {
                ret["msg"] = "email格式不对"
            }
            return false;
        }else {
            return true;
        }
    },
    checkdecimal: function (decimal,ret) { //用于检测数字和钱
        if (!(/^[0-9]+[.]?[0-9]{0,2}$/.test(email))) {
            if (ret) {
                ret["msg"] = "数字格式不对，最多只有小数点两位"
            }
            return false;
        } else {
            return true;
        }
    },
    checkmunber: function (munber,ret) { //用于检测数字正负
        if (!(/^[-0-9]+$/.test(munber))) {
            if (ret) {
                ret["msg"] = "数字格式不对,不支持小数点，支持负数"
            }
            return false;
        } else {
            return true;
        }
    },
    
    //隐藏微信分享的那些按钮
    wxhideOptionMenu: function ()
    {
        try
        {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', function () { WeixinJSBridge.call('hideOptionMenu'); }, false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', function () { WeixinJSBridge.call('hideOptionMenu'); });
                    document.attachEvent('onWeixinJSBridgeReady', function () { WeixinJSBridge.call('hideOptionMenu'); });
                }
            } else {
                WeixinJSBridge.call('hideOptionMenu'); 
            }
        }
        catch (e) {
        }
    },
    FormatDateTime: function (dt, fmt) { //author: meizz 
        var _this = new Date(dt.replace("T", " ").replace("-", "/"));
        var o = {
            "M+": _this.getMonth() + 1, //月份 
            "d+": _this.getDate(), //日 
            "h+": _this.getHours(), //小时 
            "H+": _this.getHours(), //小时 
            "m+": _this.getMinutes(), //分 
            "s+": _this.getSeconds(), //秒 
            "q+": Math.floor((_this.getMonth() + 3) / 3), //季度 
            "S": _this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}

