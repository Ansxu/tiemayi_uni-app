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

    //弹出协议
    $('#showAgreementShade').click(function() {
        $(".shade,.shade-item").show();
    });
    //关闭协议
    $('.shade .btn-close').click(function() {
        $(this).parents(".shade,.shade-item").hide();
    });

    //获取验证码
    $("#send-code").click(function() {
        var mobile = $("#txtMobile").val(); //手机号码
        var code = $("#txtcode").val(); //手机号码
        var VerifyType = "0";
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
                            has_click = false;
                            ClearTimer();
                            tips(json.msg);
                            OnlyVal = CreatOnlyVal();
                            $("#ValidateImg").attr("src", baseUrl + "/api/Member/GetImageCode?OnlyVal=" + OnlyVal);
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

    //注册
    $("#btnReg").click(function() {
        var mobile = $("#txtMobile").val(); //手机号码
        var password = $("#txtPassword").val();
        var code = $("#txtcode").val();
        var inviteCode = $("#txtInviteCode").val();
        var mailbox = $("#txtEmail").val();
        var VerifyCode = $("#VerifyCode").val();
        var txtQQ = $("#txtQQ").val();
        if (telePhone(mobile) && yanzheng()) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Login/MobileRegister",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        Mobile: mobile,
                        VerifyCode: VerifyCode,
                        Password: password,
                        InviteCode: inviteCode,
                        Mailbox: mailbox,
                        QQ:txtQQ
                    }
                }
            }, function(ret, err) {
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
                loading_close();
            });
        }
    });
}

//注册验证
function yanzheng() {
    var pwd = $.trim($('#txtPassword').val()); //密码
    var pwd2 = $.trim($('#txtPassword2').val()); //密码
    var code = $.trim($("#txtcode").val()); //验证码
    var txtQQ = $("#txtQQ").val();
    if (txtQQ == "") {
        api.toast({
            msg: 'QQ不能为空'
        });
        return false;
    }
    if (code == "") {
        api.toast({
            msg: '验证码不能为空'
        });
        return false;
    }
    if (pwd == '') {
        api.toast({
            msg: '密码不能为空'
        });
        return false;
    }
    if (CheckPassWordTwo(pwd) == false) {
        api.toast({
            msg: '密码必须由字母或数字或符号(@_.)且长度在6-16'
        });
        return false;
    }
    if (pwd != pwd2) {
        api.toast({
            msg: '两次输入的密码不一致'
        });
        return false;
    }
    var jly = $("#isagree").prop("checked");
    if (jly == false) {
        api.toast({
            msg: '您必须接受此条款'
        });
        return false;
    }
    return true;
}
