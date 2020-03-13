//caianhua
var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var isIdCard = 0;
var isBank = 0;
var isQQ = 0;
//alert(userId);
//alert(userToKen);
apiready = function() {
        exit_app(0);
        // var num = $api.getStorage('keybacknum');
        // $api.setStorage('keybacknum', num);
        if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
            location.href = '../../html/login/login.html';
        } else {
            GetMemberInfo();
        }
    }
    //获取用户信息
function GetMemberInfo() {
    // loading();
    var postUrl = baseUrl + "/api/Member/GetBindPageData"; ///api/Member/GetBindPageData

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
            optionResult(ret);
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
        // loading_close();
    });

}

function optionResult(ret) {
    //  alert("进入到optionResult");
    // console.log(JSON.stringify(ret));
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        //alert("ret不为空");
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            isIdCard = json.obj.IsAUT;
            isBank = json.obj.IsBankAUT;
            isQQ = json.obj.IsQQ;
            var IsAUTStr = json.obj.IsAUTStr;
            var BankStr = json.obj.BankStr;
            var QQStr = json.obj.QQStr;
            for (var i = 0; i < json.obj.MemberAccount.length; i++) {
                switch (json.obj.MemberAccount[i].PlatName) {
                    case "绑定淘宝账号":
                        $("#TbAccount").html(json.obj.MemberAccount[i].IsBindText);
                        break;
                    case "绑定京东账号":
                        $("#JdAccount").html(json.obj.MemberAccount[i].IsBindText);
                        break;
                    case "绑定拼多多账号":
                        $("#PddAccount").html(json.obj.MemberAccount[i].IsBindText);
                        break;
                    case "绑定阿里巴巴账号":
                        $("#AlbbAccount").html(json.obj.MemberAccount[i].IsBindText);
                        break;
                        // case "绑定蘑菇街账号":
                        //    $("#MgjAccount").html(json.obj.MemberAccount[i].IsBindText);
                        //   break;
                        // case "绑定美丽说账号":
                        //    $("#MlsAccount").html(json.obj.MemberAccount[i].IsBindText);
                        //   break;
                    default:
                }
            }
            //平台绑定显示
            for (var i = 0; i < json.obj.MemberAccountShow.length; i++) {
                switch (json.obj.MemberAccountShow[i].PlatName) {
                    case "淘宝":
                        if(json.obj.MemberAccountShow[i].PlatStatus==1)
                          {  $("#TbAccountShow").hide();}
                        break;
                    case "京东":
                      if(json.obj.MemberAccountShow[i].PlatStatus==1)
                          {  $("#JdAccountShow").hide();}
                        break;
                    case "拼多多":
                        if(json.obj.MemberAccountShow[i].PlatStatus==1)
                            {  $("#PddAccountShow").hide();}
                        break;
                    case "阿里巴巴":
                        if(json.obj.MemberAccountShow[i].PlatStatus==1)
                          {  $("#AlbbAccountShow").hide();}
                        break;
                    default:
                }
            }
            var ddd = json.obj.MemberAccount[0].PlatName;
            $("#IdentityCard").html(IsAUTStr);
            $("#BankCard").html(BankStr);
            $("#QACQ").html(QQStr);
            if (isIdCard == 0) {
                $(".popup-mask-box").show();
                // $(".popup-mask-box").addClass('boxvisible');
            }
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);
            //location.href = '../login/login.html';
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function bindAccountPage(url, msg) {
    if (isIdCard != 1 || isQQ != 1) {
        alert("身份证绑定并认证以及绑定QQ号后才可以绑定" + msg + "账号")
    } else
        location.href = url;
}
