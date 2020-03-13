var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var page = 1;
apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        GetMessageList(0, '');
    }
}

function GetMessageList(userType, id) {
    loading();
    if (id != "" && id != undefined && id != null) {
        //添加样式
        $(".clear li").removeClass('active');
        $(id).addClass('active');
        $('.messageList ul').html("");
        $('.empty').css('display', 'none');
        page = 1;
    }
    api.ajax({
        url: baseUrl + "/api/Notice/GetNoticeByMember",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: page,
                PageSize: pageSize,
                SendType: 1,
                UserType: userType
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
                var dotTemplate = doT.template($('#messageListTemp').html());
                var templateHtml = dotTemplate(json.obj.NoticeList);
                $('.messageList ul').append(templateHtml);
            } else if (page == 1) {
                $('.empty').css('display', '');
                //$('.empty').css('display', 'block');
            }
        } else {
            tips(json.msg);
        }

        //遍历加监听获取当前点击messageId,并缓存
        var len = $(".box_ft").length;
        for (var i = 0; i < len; i++) {
            $(".box_ft").eq(i).click(function(e) {
                var messageId = $(this).next().text();
                $api.setStorage('messageId', messageId);
                window.location.href = "./messagedetail.html";
                // alert(messageId);
            });
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
