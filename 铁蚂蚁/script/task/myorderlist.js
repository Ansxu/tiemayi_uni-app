userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var pageNo = 1;
var stop = true;
var taskType = 1;
var orderStatus = 1;

apiready = function() {
    exit_app(2);
    taskType = api.pageParam.taskType;
    orderStatus = api.pageParam.taskStatus;
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getMyOrderList();
        //加载方法
        var totalheight = 0;
        $(window).scroll(function() {
            //当前窗口的高度+窗口网上移动的距离
            totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
            if (parseFloat($(document).height()) <= totalheight) {
                if (stop == true) {
                    stop = false;
                    getMyOrderList();
                }
            }
        });
    }

    $(".heardTitle").html(taskType == 1 ? "垫付任务" : "浏览任务");
    $("#orderStatus li").eq(orderStatus - 1).addClass('active').siblings().removeClass('active');
    $("#orderStatus li").click(function() {
        $(".noConPage").hide();
        $('.dd_orderList').html('');
        var that = $(this);
        var status = $(that).index() + 1;
        $(that).addClass('active').siblings().removeClass('active');
        orderStatus = status;
        pageNo = 1;
        getMyOrderList();
    });
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
        getMyOrderList();
        setTimeout('api.refreshHeaderLoadDone()', '500');
    });
}

function getMyOrderList() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/GetMemberTaskList",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                MemberAcceptTaskStatus: orderStatus,
                TaskType: taskType,
                Page: pageNo,
                PageSize: pageSize
            }
        }
    }, function(ret, err) {
        if (pageNo == 1) {
            $(".noConPage").hide();
            $('.dd_orderList').html('');
        }
        pageNo++;
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                if (pageNo == 1 && json.obj.AcceptTaskList.length <= 0) {
                    $(".noConPage").show();
                }
                for (var i = 0; i < json.obj.AcceptTaskList.length; i++) {
                    $('.dd_orderList').append(templateHtml(json.obj.AcceptTaskList[i]));
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
        stop = true;
        loading_close();
    });
}

function templateHtml(model) {
    var text = "";
    text += "<li>";
    text += "	<a href=\"javascript:orderInfo('" + model.TaskAcceptNo + "');\" class=\"outside\">";
    text += "		<div class=\"pictrueAll\">";
    text += "			<div class=\"pictrue\">";
    text += "				<img src=\"" + model.ProductImg + "\" alt=\"\" />";
    text += "			</div>";
    text += "		</div>";
    text += "		<div class=\"txtBox\">";
    text += "			<p class=\"title text\"><img class=\"plat_logo\" src=\"" + model.PlatFormLogo + "\" />" + model.TaskAcceptNo + "</p>";
    text += "			<div class=\"flex\">";
    text += "				<div class=\"flexItem flex1\">";
    text += "					<p class=\"priceArea\"><span>佣金:" + model.GetCommission + "</span></p>";
    text += "				</div>";
    text += "				<div class=\"flexItem\">";
    text += "					<p class=\"order-status c_Org\">" + model.AcceptTaskStatusText + "</p>";
    text += "				</div>";
    text += "			</div>";
    text += "			<div class=\"flex\">";
    text += "				<div class=\"flexItem flex1\">";
    text += "					<p class=\"name\">" + model.AccountName + "</p>";
    text += "				</div>";
    text += "				<div class=\"flexItem\">";
    text += "					<p class=\"time\">" + model.AcceptTaskTime + "</p>";
    text += "				</div>";
    text += "			</div>";
    text += "		</div>";
    text += "	</a>";
    text += "</li>";
    return text;
}

function orderInfo(acceptNo) {
    api.openWin({
        name: 'selectoperation',
        url: '../../html/task/selectoperation.html',
        slidBackEnabled: false,
        pageParam: {
            taskAcceptNo: acceptNo
        }
    });
}
