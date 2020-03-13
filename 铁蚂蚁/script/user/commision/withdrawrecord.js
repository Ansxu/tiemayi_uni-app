//  √ 分页获取提现记录 /api/Withdraw/GetWithdrawLogPage  UserId  Token  Page  PageSize  WalletType
userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var PageNo = 1;

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        getRecordInfo();
    }
}

function getRecordInfo() {
    var wallettype = api.pageParam.walletType;
    if (wallettype == 1) {
        $("#titletop").html("佣金提现记录");
    } else {
        $("#titletop").html("本金提现记录");
    }
    //titletop
    api.ajax({
        url: baseUrl + "/api/Withdraw/GetWithdrawLogPage", //提现记录
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: PageNo,
                PageSize: pageSize,
                WalletType: wallettype
            }
        }
    }, function(ret, err) {
        if (ret) {
            optionResult(ret);
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        }
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj.WithdrawList != null && json.obj.WithdrawList.length > 0) {
                var dotTemplate = doT.template($('#recordListTemp').html());
                var templateHtml = dotTemplate(json.obj.WithdrawList);
                $('#recordlist').append(templateHtml);
            }
        } else if (json.errcode == 2) {
            tips(json.msg);
            location.href = '../../../html/login/login.html';
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }

    //下拉加载更多
    api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0 // 距离底部还有多少触发scrolltobottom事件
        }
    }, function(ret, err) {
        // 加载更多
        setTimeout(function() {
            pageNo++;
            getRecordInfo();
        }, 200);
    });
}
