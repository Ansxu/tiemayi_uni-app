var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var page = 1;
apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        GetMessageList();
    }
}

function GetMessageList() {
    loading();
    var getUrl = baseUrl + "/api/Notice/GetNoticeByMember";
    api.ajax({
        url: getUrl,
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: page,
                SendType: 0
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
        loading_close();
    });
}


function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        // console.log(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj.NoticeList != null && json.obj.NoticeList.length > 0) {

                var dotTemplate = doT.template($('#noticeListTemp').html());
                var templateHtml = dotTemplate(json.obj.NoticeList);
                $('.noticeList ul').append(templateHtml);

            } else {

            }

        } else {
            tips(json.msg);
        }

        //遍历加监听获取当前点击messageId,并缓存
        var len = $(".noticeList li").length;
        for (var i = 0; i < len; i++) {
            $(".noticeList li").eq(i).click(function(e) {
                var noticeId = $(this).children("div").text();
                $api.setStorage('noticeId', noticeId);
                // alert(noticeId);
            })
        };
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
            page = page + 1;
            GetMessageList();
        }, 500);
    });
}
