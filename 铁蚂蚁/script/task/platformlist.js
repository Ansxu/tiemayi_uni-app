userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var taskType = 1;
var platformId = 0;

apiready = function() {
    exit_app(0);
    api.closeFrame({
        name: 'tasklist1'
    });
    api.closeFrame({
        name: 'tasklist2'
    });
    api.closeWin({
        name: 'tasklist1'
    });

    api.closeWin({
        name: 'tasklist2'
    });
    api.closeWin({
        name: 'selecttaskinfo'
    });
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    }
    getPlatformList();
    $('.tabList ul li').click(function() {
        var that = $(this);
        var index = $(that).index();
        $(that).addClass('active').siblings().removeClass('active');
        taskType = index + 1;
        $('#platformList').html("");
        getPlatformList();
        //$(that).parents('.Tabdiv').find('.tabCon > div').eq(index).fadeIn().siblings().hide();
    });
}

function getPlatformList() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/GetTaskTypePlatform",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskType: taskType
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                var dotTemplate = doT.template($('#platformListTemp').html());
                var templateHtml = dotTemplate(json.obj);
                $('#platformList').append(templateHtml);
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else
                tips(json.msg);
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

function SelectPlatform(platformVal) {
    // api.closewin();
    api.closeFrame({
        name: 'tasklist1'
    });

    api.closeFrame({
        name: 'tasklist2'
    });

    api.openWin({
        name: 'selecttaskinfo',
        url: '../../html/task/selecttaskinfo.html',
        slidBackEnabled: false,
        pageParam: {
            platformId: platformVal,
            taskType: taskType
        }
    });
}
