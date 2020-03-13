userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var pageNo = 1;
var stop = true;
var nextPage = true;
apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getTaskList();
        //加载方法
        var totalheight = 0;
        $(window).scroll(function() {
            //当前窗口的高度+窗口网上移动的距离
            totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
            if (parseFloat($(document).height()) <= totalheight) {
                if (stop == true) {
                    stop = false;
                    if (nextPage)
                        getTaskList();
                }
            }
        });
    }

    api.setRefreshHeaderInfo({
        visible: true,
        loadingImg: '../image/loading_more.gif',
        bgColor: '#5c91f0',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...',
        showTime: true
    }, function(ret, err) {
        pageNo = 1;
        getTaskList();
        setTimeout('api.refreshHeaderLoadDone()', '500');
    });
}

function getTaskList() {
    loading();
    var platId = api.pageParam.platformId;
    var accountId = api.pageParam.accountId;
    var maxAdvancePayMoney = api.pageParam.maxAdvancePayMoney;
    var taskType = api.pageParam.taskType;
    var timestamp = (new Date()).getTime(); //当前时间戳
    var sign = md5(appId + clientId + clientSecret + apikey + timestamp).toLowerCase(); //签名

    api.ajax({
        url: baseUrl + "/api/Task/GetTaskList",
        method: 'post',
        headers: {
            'AppId': appId,
            'Timetamp': timestamp,
            'Sign': sign
        },
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: pageNo,
                PageSize: pageSize,
                PlatId: platId,
                AppVersion:api.appVersion,
                AccountId: accountId,
                MaxAdvancePayMoney: maxAdvancePayMoney,
                TaskType: taskType
            }
        }
    }, function(ret, err) {
        if (pageNo == 1) {
            $('#taskList').html('');
        }
        pageNo++;
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#accountName").text(json.obj.PlatAccount);
                for (var i = 0; i < json.obj.TaskList.length; i++) {
                    $('#taskList').append(templateHtml(json.obj.TaskList[i]));
                }
                nextPage = json.obj.IsNextPage > 0 ? true : false;
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        stop = true;
        loading_close();
    });
}

function templateHtml(model) {
    var text = "";
    text += "<li>";
    text += "	<div class=\"box\">";
    text += "		<div class=\"box-left\">";
    text += "			<div class=\"title\"><span class=\"rb\">" + model.CommissionAvailable + "</span><span class=\"txt\">金  " + (model.TaskType == 1 ? "垫付任务" : "浏览任务") + "</span></div>";
    text += "			<p class=\"text\">ID:" + model.TaskListNo + "</p>";
    text += "		</div>";
    text += "		<div class=\"box-right\">";
    text += "			<a href=\"javascript:ConfirmationTask('" + model.TaskListNo + "');\" class=\"btn\">立即抢单</a>";
    text += "			<span>" + model.AdvancePaymentMoney + "元</span>";
    text += "		</div>";
    text += "	</div>";
    text += "</li>";

    return text;
}

function ConfirmationTask(taskListNo) {
    api.ajax({
        url: baseUrl + "/api/Task/UserDetermineTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AccountId: api.pageParam.accountId,
                TaskListNo: taskListNo
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#taskList").html('');
                pageNo = 1;
                getTaskList();
                promptHtml(json.obj);
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
}

function promptHtml(jsondata) {
    var str = "";
    str += '<div class="taskinfo">';
    str += '<ul>';
    str += '<li><p class="text">任务类型</p><span>' + jsondata.PlatType + '</span></li>';
    if (jsondata.AdvancePaymentMoney > 0) {
        str += '<li><p class="text">垫付金额</p><span>' + jsondata.AdvancePaymentMoney + '元</span></li>';
    }
    str += '<li><p class="text">任务佣金</p><span>' + jsondata.TaskCommission + '金币</span></li>';
    str += '<li><p class="text">时间限制</p><span>' + jsondata.OperationCountdown + '分钟</span></li>';
    str += '</ul>';
    str += '</div>';
    layer.open({
        title: '来任务啦',
        btn: '确认',
        content: str,
        yes: function(index) {
            layer.close(index);
            api.openWin({
                name: 'selectoperation',
                url: '../../html/task/selectoperation.html',
                slidBackEnabled: false,
                pageParam: {
                    taskAcceptNo: jsondata.TaskAcceptNo
                }
            });
        }
    });
}

//系统派单
function systemSendTask() {
    $('.ft_Orderbtn').text("派单中");
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/SystemSendTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AccountId: api.pageParam.accountId,
                PlatId: api.pageParam.platformId,
                MaxAdvancePayMoney: api.pageParam.maxAdvancePayMoney,
                TaskType: api.pageParam.taskType
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#taskList").html('');
                pageNo = 1;
                getTaskList();
                promptHtml(json.obj);
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
    loading_close();
}
