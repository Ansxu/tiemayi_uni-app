//TODO: /api/Member/GetUserBindIdCardInfo 绑定信息加载
var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        GetBindIdCardInfo();
    }

    //提交图片
    $('.btn-submit').click(function() {
        var realName = $("#realName").val(); //真实姓名
        var idNum = $("#idNum").val(); //身份证号
         var pic0 = $("#pic0").val(); //身份证正面
         var pic1 = $("#pic1").val(); //身份证反面
        // && pic0.length != 0 && pic1.length != 0
        var pic2 = $("#pic2").val(); //手持身份证
        if (realName.length != 0 && idNum.length != 0 && pic0.length != 0&& pic1.length != 0) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Member/BindUserIdCard",
                method: 'post',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        UserRName: realName,
                        Idcard: idNum,
                        IdCardImgOne: pic0,
                        IdCardImgTwo: pic1,
                        IdCardImgThree: pic2
                    }
                }
            }, function(ret, err) {
                optionResult(ret);
                loading_close();
            });
        } else {
            alert("信息不全，请补充完整再提交");
        }
    });
}

function GetBindIdCardInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetUserBindIdCardInfo",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        optionBindResult(ret);
        loading_close();
    });
}

function optionBindResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            //如果认证还没有通过，则加载数据可以再次修改提交
            if (json.obj.IsAUT != 1 && !isNullOrEmpty(json.obj.Idcard)) {
                var realName = json.obj.UserRName; //真实姓名
                var idNum = json.obj.Idcard; //身份证号
                  var pic0 = json.obj.IdcardPositive; //身份证正面
                  var pic1 = json.obj.IdcardNegative; //身份证反面
                var pic2 = json.obj.IdcardInHand; //手持身份证

                $("#realName").val(realName);
                $("#idNum").val(idNum);
                $(".btn-submit").html("重新提交");
                // $("#IdcardPositive").attr("src", pic0);
                // $("#IdcardNegative").attr("src", pic1);
                // $("#IdcardInHand").attr("src", pic2);
            } //如果认证通过，则加载数据不能再次提交
            else if (json.obj.IsAUT == 1) {
                $('.btn-submit').hide();
                $(".main").append("<a href=\"bindinfo.html\" class=\"weui-btn weui-btn-active\" style=\"margin:.2rem 12px .2rem;\">返回</a>");
                var realName = json.obj.UserRName; //真实姓名
                var idNum = json.obj.Idcard; //身份证号
                var pic0 = json.obj.IdcardPositive; //身份证正面
                var pic1 = json.obj.IdcardNegative; //身份证反面
                var pic2 = json.obj.IdcardInHand; //手持身份证
                // console.log(pic0);
                //console.log(pic1);
                //console.log(pic2);
                $("#realName").val(realName);
                $("#idNum").val(idNum);
                $("#IdcardPositive").attr("src", pic0);
                $("#IdcardNegative").attr("src", pic1);
                $("#IdcardInHand").attr("src", pic2);
                //input只读模式，图片框不再响应click事件
                document.getElementById("realName").readOnly = true;
                document.getElementById("idNum").readOnly = true;
                //禁止图片修改操作
                document.getElementById("getpic0").onclick = null;
                document.getElementById("getpic1").onclick = null;
                document.getElementById("getpic2").onclick = null;

                //document.getElementsByClassName("upimg").onclick=null;
                // $("#getpic1").onclick=null;
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
    loading_close();
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, "bindinfo.html");
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
    loading_close();
}
