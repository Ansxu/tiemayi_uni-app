apiready = function() {
    exit_app(1);
    // $('.shiftPwd').click(function() {
    //     if ($(this).hasClass("showPwd")) {
    //         $(this).parents('.weui-cell').find(".weui-input").attr("type", "password");
    //         $(this).addClass("hidePwd").removeClass("showPwd");
    //     } else {
    //         $(this).parents('.weui-cell').find(".weui-input").attr("type", "text");
    //         $(this).addClass("showPwd").removeClass("hidePwd");
    //     }
    // });
    $('input[name="isremember"]').click(function() {
        if ($('input[name="isremember"]').attr("checked")) {
            $('input[name="isremember"]').attr("checked", false);
        } else {
            $('input[name="isremember"]').attr("checked", true);
        }
    });
    var useraccount = $api.getStorage("userAccountName");
    var userpassword = $api.getStorage("userPassword");
    if (!isNullOrEmpty(useraccount) && !isNullOrEmpty(userpassword)) {
        $("#accountName").val(useraccount);
        $("#password").val(userpassword);
        $('input[name="isremember"]').attr("checked", true);
    }
    loading_close();
}

function login() {
    var accountName = $("#accountName").val().trim();
    if (telePhone(accountName)) {
        var password = $('#password').val().trim();
        if (password == '' || password == undefined) {
            tips('密码不能为空');
            return false;
        }
        checkPassword(accountName, password);
    }
}

function checkPassword(userName, password) {
    loading();
    var timestamp = (new Date()).getTime(); //当前时间戳
    var sign = md5(appId + clientId + clientSecret + apikey + timestamp).toLowerCase(); //签名
    api.ajax({
        url: baseUrl + "/api/Login/LoginByMobile",
        method: 'post',
        headers: {
            'AppId': appId,
            'Timetamp': timestamp,
            'Sign': sign
        },
        dataType: 'json',
        data: {
            values: {
                Mobile: userName,
                PassWord: password,
                client_id: clientId,
                client_secret: clientSecret
            }
        }
    }, function(ret, err) {
        if ($('input[name="isremember"]').attr("checked")) {
            $api.setStorage("userAccountName", userName);
            $api.setStorage("userPassword", password);
        } else {
            $api.rmStorage("userAccountName");
            $api.rmStorage("userPassword");
        }
        optionResult(ret);
        loading_close();
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips(json.msg);
            $api.setStorage('userName', json.obj.NickName);
            $api.setStorage('userId', json.obj.UserId);
            $api.setStorage('userAvatar', json.obj.Avatar);
            $api.setStorage('userToKen', json.obj.Token);
            $api.setStorage('userOpenid', json.obj.Openid);
            $api.setStorage('IsAddressBook', json.obj.IsAddressBook);
            location.href = '../user/member.html';
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}
