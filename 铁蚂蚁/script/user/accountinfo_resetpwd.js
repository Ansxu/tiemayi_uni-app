var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    }
    //重置密码
    $('.btn-submit').click(function() {
        var oldpwd = $.trim($('#txtpassword').val()); //密码
        var pwd = $.trim($('#txtnewpassword').val()); //密码
        var pwd2 = $.trim($("#txtnewpassword2").val()); //验证码
        if (yanzheng()) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Member/SubmitModifyByPassword",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        OldLoginPwd: oldpwd,
                        NewLoginPwd: pwd
                    }
                }
            }, function(ret, err) {
                optionResult(ret);
                loading_close();
            });
        }
    });

}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            $api.rmStorage('userId');
            $api.rmStorage('userToKen');
            tips_url(json.msg, "../login/login.html");
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}
//验证
function yanzheng() {
    var oldpwd = $.trim($('#txtpassword').val()); //密码
    var pwd = $.trim($('#txtnewpassword').val()); //密码
    var pwd2 = $.trim($("#txtnewpassword2").val()); //验证码
    if (oldpwd == "") {
        tips("旧密码不能为空");
        return false;
    }
    if (CheckPassWord(pwd) == false) {
        tips("新密码必须是字母加数字且长度不小于6位");
        return false;
    }
    if (pwd != pwd2) {
        tips("两次输入的密码不一致");
        return false;
    }
    return true;
}
