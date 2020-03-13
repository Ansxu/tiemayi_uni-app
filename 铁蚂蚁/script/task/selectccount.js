var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        GetBindAccount();
    }
}

function GetBindAccount() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetBindPlatformAccountList",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                PlatId: api.pageParam.selectPlatId
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
            //取到数组对象进行渲染
            if (json.obj != null && json.obj.length > 0) {
                var dotTemplate = doT.template($('#accountListTemp').html());
                var templateHtml = dotTemplate(json.obj);
                $('#accountlist').append(templateHtml);
            }
        } else if (json.errcode == 2) {
            tips("登录超时，请重新登录");
            location.href = '../../html/login/login.html';
        //} else if (json.errcode == 7) {
            //api.confirm({
                //msg: 'VIP已到期，多账号使用权利已取消，现在去续费？',
                //buttons: ['确定', '取消']
            //}, function(ret, err) {
                //if (ret.buttonIndex == 1)
                    //location.href = '../../html/user/vip/vip.html';
                //else
                    //api.closeWin();
            //});
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function pageJump(accountId, platformId) {
    // console.log("accountId:" + accountId + "    platformId:" + platformId);
    api.closeWin({
        name: 'dispatchtask'
    });
    api.openWin({
        name: 'dispatchtask',
        url: '../../html/task/dispatchtask.html',
        slidBackEnabled: false,
        pageParam: {
            selectAccountId: accountId,
            selectPlatformId: platformId
        }
    });
}
