apiready = function() {
    exit_app(0);
    var OnlyVal = "";
    OnlyVal = CreatOnlyVal();
    //获取图形验证码
    $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
    //获取新的图形验证码
    $("#ValidateImg").click(function() {
        //修改src属性
        OnlyVal = CreatOnlyVal();
        $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
        return false; //阻止href动作
    });

    //短信验证码
    var has_click = false;
    var timer = "";
    var timerStart = function() {
        var i = 59;
        timer = setInterval(function() {
            if (i == 0) {
                $('#send-code').html('获取验证码');
                has_click = false;
                clearInterval(timer);
            } else {
                $('#send-code').html(i + 's后再试');
                --i;
            }
        }, 1000);
    }

    var ClearTimer = function() {
        clearInterval(timer);
        $('#send-code').html('获取验证码');
    }

    //获取验证码
    $("#send-code").click(function() {
        var mobile = $("#txtMobile").val(); //手机号码
        var code = $("#txtcode").val(); //手机号码
        var VerifyType = "2"; //忘记密码
        if (telePhone(mobile)) {
            if (code == "") {
                tips("请输入图形验证码");
                $("#txtcode").focus();
                return false;
            }
            if (!has_click) {
                has_click = true;
                timerStart();

                api.ajax({
                    url: baseUrl + "/api/Member/GetSms",
                    method: 'post',
                    dataType: 'json',
                    data: {
                        values: {
                            Mobile: mobile,
                            VerifyType: VerifyType,
                            ImgCode: code,
                            OnlyVal: OnlyVal
                        }
                    }
                }, function(ret, err) {
                    if (!isNullOrEmpty(JSON.stringify(ret))) {
                        var json = $.parseJSON(JSON.stringify(ret));
                        if (json.errcode == 0) {
                            tips(json.msg);
                            $('#send-code').html('60s后再试');
                        } else if (json.errcode == 2) {
                            OnlyVal = CreatOnlyVal();
                            $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
                            has_click = false;
                            ClearTimer();
                            tips(json.msg);
                        } else {
                            OnlyVal = CreatOnlyVal();
                            $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
                            has_click = false;
                            ClearTimer();
                            tips(json.msg);
                        }
                    } else {
                        tips("服务器走神了，请重试");
                    }
                });
            }
        }
    });


    //第一步
    $('.btn-oneStep').click(function() {
        if (yanzheng()) {
            $('.twoStep__defaultPage').show();
        }
    });

    //第二步
    $('.twoStep__defaultPage .btn_back').click(function() {
        $('.twoStep__defaultPage').hide();
    });

    //注册
    $(".btn-twoStep").click(function() {
        var mobile = $("#txtMobile").val(); //手机号码
        var VerifyCode = $("#VerifyCode").val();
        var password = $("#txtpassword").val();
        var password2 = $("#txtpassword2").val();

        if (yanzheng2()) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Member/SubmitResetLoginPwd",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        Mobile: mobile,
                        VerifyType: 2,
                        VerifyCode: VerifyCode,
                        NewLoginPwd: password,
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
            tips_url(json.msg, "login.html");
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}



//修改密码验证
function yanzheng() {
    var mobile = $("#txtMobile").val(); //手机号码
    var code = $("#txtcode").val();
    var VerifyCode = $("#VerifyCode").val();
    if (!telePhone(mobile)) {
        tips("手机号不正确");
        return false;
    }
    if (code == "") {
        tips("图形验证码不能为空");
        return false;
    }

    if (VerifyCode == '') {
        tips("短信验证码不能为空");
        return false;
    }
    return true;
}

//验证
function yanzheng2() {
    var mobile = $("#txtMobile").val(); //手机号码
    var code = $("#txtcode").val();
    var VerifyCode = $("#VerifyCode").val();
    var password = $("#txtpassword").val();
    var password2 = $("#txtpassword2").val();
    if (!telePhone(mobile)) {
        tips("手机号不正确");
        return false;
    }
    if (code == "") {
        tips("图形验证码不能为空");
        return false;
    }

    if (VerifyCode == '') {
        tips("短信验证码不能为空");
        return false;
    }
    if (!CheckPassWordTwo(password)) {
        tips("密码必须由字母或数字或符号(@_.)且长度在6-16");
        return false;
    }
    if (password != password2) {
        tips("两次密码不一致");
        return false;
    }
    return true;
}
