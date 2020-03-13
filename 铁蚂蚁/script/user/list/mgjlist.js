var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        GetBindJDInfo();
    }
}

function GetBindJDInfo() {
    loading();
    var timestamp = (new Date()).getTime(); //当前时间戳
    var sign = md5(appId + clientId + clientSecret + apikey + timestamp).toLowerCase(); //签名
    api.ajax({
        url: baseUrl + "/api/Member/LoadMemberAccountList",
        method: 'post',
        headers: {
            'AppId': appId,
            'Timetamp': timestamp,
            'Sign': sign
        },
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                PlatId: 7
            }
        }
    }, function(ret, err) {
        optionBindResult(ret);
        loading_close();
    });
}

function optionBindResult(ret) {

    //console.log(JSON.stringify(ret));
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        //console.log(json.obj.AccountList);
        if (json.errcode == 0) {
            //取到数组对象进行渲染
            if (json.obj.AccountList != null && json.obj.AccountList.length > 0) {
                var dotTemplate = doT.template($('#gradeListTemp').html());
                var templateHtml = dotTemplate(json.obj.AccountList);
                $('#mgjlist').append(templateHtml);
            }
            if (json.obj.AccountCount >= json.obj.MaxBindAccount)
                $(".addAcount__footer").hide();
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function pageJump(accountId, reviewStatus) {
    if (reviewStatus == 1) {
        tips("账号已通过审核，无法修改，若要修改请联系平台管理员");
    } else {
        api.openWin({
            name: 'bindmgj',
            url: '../../../html/user/bindmgj.html',
            slidBackEnabled: false,
            pageParam: {
                accountId: accountId
            }
        });
    }
}
