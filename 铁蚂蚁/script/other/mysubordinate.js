var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var selectval = 0;
var pageNo = 1;
var stop = true;

apiready = function() {
    exit_app(2);
    selectval = api.pageParam.clickval;
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        $(".tab-hd ul li").eq(selectval).addClass('active').siblings().removeClass('active');
        getMySubordinate();
    }
    $(".tab-hd ul li").click(function() {
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        selectval = index;
        pageNo = 1;
        $('#subordinateList').html("");
        getMySubordinate();
    });
}

function getMySubordinate() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetMemberSubordinate",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: pageNo,
                PageSize: 15,
                IsApprove: selectval
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
        stop = true;
        loading_close();
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (pageNo == 1)
                $('#subordinateList').html(" ");
            if (json.obj.SubordinateList != null && json.obj.SubordinateList.length > 0) {
                var dotTemplate = doT.template($('#subordinateListTemp').html());
                var templateHtml = dotTemplate(json.obj.SubordinateList);
                $('#subordinateList').append(templateHtml);
            } else if (pageNo == 1) {
                $('.not_subordinate').css('display', 'block');
            }
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
            getMySubordinate();
        }, 200);
    });
}
