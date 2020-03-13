var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    //检查登录状态
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    }
    var OnlyVal = "";
    OnlyVal = CreatOnlyVal();
    var OnlyVal2 = "";
    OnlyVal2 = CreatOnlyVal();
    //获取图形验证码
    $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
    //获取新的图形验证码
    $("#ValidateImg").click(function() {
        //修改src属性
        OnlyVal = CreatOnlyVal();
        $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
        return false; //阻止href动作
    });

    //获取图形验证码
    $("#ValidateImg2").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal2);
    //获取新的图形验证码
    $("#ValidateImg2").click(function() {
        //修改src属性
        OnlyVal = CreatOnlyVal();
        $("#ValidateImg2").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal2);
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


    $("#send-code").click(function() {
        var mobile = $("#txtMobile").val(); //手机号码
        var code = $("#txtcode").val(); //手机号码
        var VerifyType = "6"; //旧手机号验证并获取验证码参数
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
                        } else {
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




    //短信验证码
    var has_click2 = false;
    var timer2 = "";
    var timerStart2 = function() {
        var j = 59;
        timer2 = setInterval(function() {
            if (j == 0) {
                $('#send-code2').html('获取验证码');
                has_click2 = false;
                clearInterval(timer2);
            } else {
                $('#send-code2').html(j + 's后再试');
                --j;
            }
        }, 1000);
    }

    var ClearTimer2 = function() {
        clearInterval(timer2);
        $('#send-code2').html('获取验证码');
    }


    $("#send-code2").click(function() {
        var mobile = $("#txtNewMobile").val(); //手机号码
        var code = $("#txtcode2").val(); //手机号码
        var VerifyType = "7"; //修改手机号验证并获取验证码参数
        if (telePhone(mobile)) {
            if (code == "") {
                tips("请输入图形验证码");
                $("#txtcode2").focus();
                return false;
            }
            if (!has_click) {
                has_click2 = true;
                timerStart2();

                api.ajax({
                    url: baseUrl + "/api/Member/GetSms",
                    method: 'post',
                    dataType: 'json',
                    data: {
                        values: {
                            Mobile: mobile,
                            VerifyType: VerifyType,
                            ImgCode: code,
                            OnlyVal: OnlyVal2
                        }
                    }
                }, function(ret, err) {
                    if (!isNullOrEmpty(JSON.stringify(ret))) {
                        var json = $.parseJSON(JSON.stringify(ret));
                        if (json.errcode == 0) {
                            tips(json.msg);
                            $('#send-code2').html('60s后再试');
                        } else {
                            has_click2 = false;
                            ClearTimer2();
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
            $('.oneStep__defaultPage').hide();
            $('.twoStep__defaultPage').show();
        }
    });

    //第二步
    $('.twoStep__defaultPage .btn_back').click(function() {
        $('.oneStep__defaultPage').show();
        $('.twoStep__defaultPage').hide();
    });

    //修改手机号
    $('.btn-submit').click(function() {

        var mobile = $("#txtMobile").val(); //手机号码
        var newmobile = $("#txtNewMobile").val(); //手机号码
        var VerifyCode = $("#VerifyCode").val();
        var VerifyCode2 = $("#VerifyCode2").val();
        if (yanzheng2()) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Member/SubmitModifyByMobile",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        Mobile: mobile,
                        VerifyCode: VerifyCode,
                        NewMobile: newmobile,
                        NewVerifyCode: VerifyCode2,
                        UserId: userId,
                        Token: userToKen
                    }
                }
            }, function(ret, err) {
                optionResult(ret);
                loading_close();
            });
        }
    });


    function optionResult(ret) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                tips_url(json.msg, "member.html");
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
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

//修改密码验证
function yanzheng2() {
    var oldmobile = $("#txtMobile").val();
    var mobile = $("#txtNewMobile").val(); //手机号码
    var code = $("#txtcode2").val();
    var VerifyCode = $("#VerifyCode2").val();
    if (!telePhone(mobile)) {
        tips("新手机号不正确");
        return false;
    }
    if (oldmobile == mobile) {
        tips("旧手机号和新手机号不能相同");
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
