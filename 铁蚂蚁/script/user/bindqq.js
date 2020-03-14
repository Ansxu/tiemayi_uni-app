var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        GetBindInfo();
    }
    $('.btn-submit').click(function() {
        var qqid = $("#qqNum").val();
        var result = isqq(qqid);
        if (result == '1') {
            loading();
            api.ajax({
                url: baseUrl + "/api/Member/BindUserQQ",
                method: 'post',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        UserQQ: qqid
                    }
                }
            }, function(ret, err) {
                optionResult(ret);
                loading_close();
            });
        } else {
            tips("信息不全，请补充完整再提交");
        }
    });
}

//获取用户信息
function GetBindInfo() {
    loading();
    var postUrl = baseUrl + "/api/Member/GetUserQQInfo";
    api.ajax({
        url: postUrl,
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        if (ret) {
            optionBindResult(ret);
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
        loading_close();
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            //  tips_url(json.msg, "bindinfo.html");
            //getElementById('qqNum').value=ret.obj.QQ;
            var qq = json.obj.QQ;
            document.getElementById("qqNum").value = qq;
            document.getElementById("qqNum").readOnly = true;
            tips_url(json.msg, "bindinfo.html");
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function optionBindResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            //未绑定QQ 则可以修改
            if (json.obj.IsBindQQ == 0) {
                var qq = json.obj.QQ;
                document.getElementById("qqNum").value = qq;
                // document.getElementById("qqNum").readOnly=true;
            } else if (json.obj.IsBindQQ == 1) {
                var qq = json.obj.QQ;
                document.getElementById("qqNum").value = qq;
                document.getElementById("qqNum").readOnly = true;
                $(".btn-submit").remove();
                $(".main").append("<a href=\"bindinfo.html\" class=\"weui-btn weui-btn-active\" style=\"margin:.2rem 12px .2rem;\">返回</a>");
            }
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function isqq(qqNum) {
    var qq = qqNum;
    //alert(typeof(qq));
    var firstChar = qq.substr(0, 1);
    var y = qqNum.indexOf('.') + 1;
    if (isNaN(qq)) {
        tips("输入的不是数字，请重新输入..");
        return 0;
    } else if (firstChar == '0') {
        tips("不能以0为开头，请重新输入..");
        return 0;
    } else if (y > 0) {
        tips("QQ号不能含有小数点");
        return 0;
    } else if (qqNum.length < 5) {
        tips("QQ号不能为空或小于5位");
        return 0;
    } else if (qqNum.length > 12) {
        tips("QQ号不能大于12位");
        return 0;
    } else {
        return 1;
    }

}
