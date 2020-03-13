userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var accountId = 0;
var maxAdvancePayMoney = 500;

apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getMemberAccountList();
    }
    $('#selectbtn').click(function() {
        var box = $(this).parent().find('ul');
        var selectTxt = $(this).find('.name');
        box.slideToggle();
        box.children('li').click(function() {
            var txt = $(this).find('.name').text();
            $(this).addClass('select_ed').siblings().removeClass('select_ed');
            accountId = $(this).find('.name').attr("data_id");
            selectTxt.text(txt);
            box.hide();
        });
    });
    var isAdvanceRange = $api.getStorage('isAdvanceRange');
    if (api.pageParam.taskType == 1 && isAdvanceRange == 0) {
        $("#maxMoney").ionRangeSlider({
            min: 500,
            max: 20000,
            from: 500,
            step: 100,
            onChange: function(data) {
                maxAdvancePayMoney = data.from;
            },
        });
    } else {
        $("#selectMaxMoney").hide();
    }
}

function getMemberAccountList() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/GetMemberCanReceiveAccount",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                PlatId: api.pageParam.platformId,
                TaskType: api.pageParam.taskType
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $('#accountList').append(templateHtml(json.obj));
                $('#txtPlatName').text(json.msg);
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else if (json.errcode == 102)
                tips_url(json.msg, "../../html/user/bindinfo.html");
            else
                tips(json.msg);
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

function templateHtml(obj) {
    var text = '';
    for (var i = 0; i < obj.length; i++) {
        if (i == 0) {
            accountId = obj[i].Id;
            $("#selectbtn span").text(obj[i].PlatAccount);
        }
        text += '<li' + ((i == 0) ? ' class="select_ed"' : '') + '><span class="text name" data_id="' + obj[i].Id + '">' + obj[i].PlatAccount + '</span></li>'
    }
    return text;
}

function submitOk() {
    if (isNullOrEmpty(accountId) || accountId <= 0) {
        tips("必须选择接单账号");
        return false;
    }
    if (api.pageParam.taskType == 1) {
        api.openFrame({
            name: 'tasklist1',
            url: '../../html/task/list.html',
            slidBackEnabled: false,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            pageParam: {
                platformId: api.pageParam.platformId,
                taskType: api.pageParam.taskType,
                accountId: accountId,
                maxAdvancePayMoney: maxAdvancePayMoney
            }
        });
    } else {
        api.openFrame({
            name: 'tasklist2',
            url: '../../html/task/list.html',
            slidBackEnabled: false,
            rect: {
                x: 0,
                y: 0,
                w: api.winWidth,
                h: api.winHeight
            },
            pageParam: {
                platformId: api.pageParam.platformId,
                taskType: api.pageParam.taskType,
                accountId: accountId
            }
        });
    }
}
