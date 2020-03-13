//佣金金额 佣金冻结金额  page91  /api/Withdraw/LoadingWithdrawPage  UserId Token
userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var pageNo = 1;

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        getWalletLogList();
    }
}

//APICloud路由传参
function toWithdraw(Id) {
    var indexId = Id;
    api.openWin({
        name: 'withdraw',
        url: '../../../html/user/commision/withdraw.html',
        slidBackEnabled: false,
        pageParam: {
            IndexId: indexId
        }
    });
}

function getWalletLogList() {
    api.ajax({
        url: baseUrl + "/api/Money/GetWalletLogList", //获取佣金明细
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: pageNo,
                PageSize: pageSize,
                WalletType: 1,
                Type: 0,
                IsNewMonth: 1
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
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            var commisionvalue = json.obj.Amount; //累计佣金
            $("#commisionvalue").html(commisionvalue);
            if (json.obj.RecordDetail != null && json.obj.RecordDetail.length > 0) {
                var dotTemplate = doT.template($('#recordListTemp').html());
                var templateHtml = dotTemplate(json.obj.RecordDetail);
                $('.commisionList').append(templateHtml);
            } else if (pageNo == 1) {
                $('.noConPage').css('display', 'block');
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
            getWalletLogList();
        }, 200);
    });
}
