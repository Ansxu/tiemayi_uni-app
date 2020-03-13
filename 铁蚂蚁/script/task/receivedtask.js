userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(1);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getMyOrderCount();
    }
    $("#advanceOrderStatus li").click(function() {
        var that = $(this);
        getMyOrderList(1, $(that).index() + 1);
    });
    $("#browseOrderStatus li").click(function() {
        var that = $(this);
        getMyOrderList(2, $(that).index() + 1);
    });

    // api.setRefreshHeaderInfo({
    //     visible: true,
    //     loadingImg: '../image/loading_more.gif',
    //     bgColor: '#5c91f0',
    //     textColor: '#fff',
    //     textDown: '下拉刷新...',
    //     textUp: '松开刷新...',
    //     showTime: true
    // }, function(ret, err) {
    //     getMyOrderCount();
    //     api.setRefreshHeaderInfo({visible: false});
    //     //根据不同的框架，我这里是用vue渲染数据的
    //     //想办法帮上面这个方法在这里调用就行taskListWait（）
    //     //setTimeout('api.refreshHeaderLoadDone()', '500');
    // });
}

function getMyOrderCount() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/GetMyOrderCount",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                if (json.obj.AdvanceUndone > 0) {
                    $("#advanceOrderStatus li").eq(0).find("span").show();
                    $("#advanceOrderStatus li").eq(0).find("span").html(json.obj.AdvanceUndone);
                }
                if (json.obj.AdvanceCompleted > 0) {
                    $("#advanceOrderStatus li").eq(1).find("span").show();
                    $("#advanceOrderStatus li").eq(1).find("span").html(json.obj.AdvanceCompleted);
                }
                if (json.obj.AdvanceRevoked > 0) {
                    $("#advanceOrderStatus li").eq(2).find("span").show();
                    $("#advanceOrderStatus li").eq(2).find("span").html(json.obj.AdvanceRevoked);
                }
                if (json.obj.AdvanceAppeal > 0) {
                    $("#advanceOrderStatus li").eq(3).find("span").show();
                    $("#advanceOrderStatus li").eq(3).find("span").html(json.obj.AdvanceAppeal);
                }
                if (json.obj.BrowseUndone > 0) {
                    $("#browseOrderStatus li").eq(0).find("span").show();
                    $("#browseOrderStatus li").eq(0).find("span").html(json.obj.BrowseUndone);
                }
                if (json.obj.BrowseCompleted > 0) {
                    $("#browseOrderStatus li").eq(1).find("span").show();
                    $("#browseOrderStatus li").eq(1).find("span").html(json.obj.BrowseCompleted);
                }
                if (json.obj.BrowseRevoked > 0) {
                    $("#browseOrderStatus li").eq(2).find("span").show();
                    $("#browseOrderStatus li").eq(2).find("span").html(json.obj.BrowseRevoked);
                }
                if (json.obj.BrowseAppeal > 0) {
                    $("#browseOrderStatus li").eq(3).find("span").show();
                    $("#browseOrderStatus li").eq(3).find("span").html(json.obj.BrowseAppeal);
                }
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

function getMyOrderList(taskType, taskStatus) {
    api.openWin({
        name: 'myorderlist',
        url: '../../html/task/myorderlist.html',
        slidBackEnabled: false,
        pageParam: {
            taskType: taskType,
            taskStatus: taskStatus
        }
    });
}
