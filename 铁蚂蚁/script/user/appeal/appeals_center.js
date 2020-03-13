userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var pageNo = 1;
var stop = true;
var appealType = 1;
var appealStatus = 1;

apiready = function() {
    exit_app(0);
    appealType = api.pageParam.appealType;
    appealStatus = api.pageParam.appealStatus;
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        // 获取所有申述类型  /api/Task/GetApplyStatementType
        //getAppealTab();
        //刚进来的时候加载list页面Tab=0的数据
        getAppealsList();
    }

    //获取分类  申诉的分类
    // function getAppealTab(){

    //     loading();
    //     api.ajax({
    //         url: baseUrl + "/api/Task/GetApplyStatementType",
    //         method: 'get',
    //     }, function(ret, err) {
    //         optionTabResult(ret);
    //         loading_close();
    //     });
    // }


    // api.setRefreshHeaderInfo({
    //     visible: true,
    //     loadingImg: '../image/loading_more.gif',
    //     bgColor: '#5c91f0',
    //     textColor: '#fff',
    //     textDown: '下拉刷新...',
    //     textUp: '松开刷新...',
    //     showTime: true
    // }, function(ret, err) {
    //     location.reload();
    //     //根据不同的框架，我这里是用vue渲染数据的
    //     //想办法帮上面这个方法在这里调用就行taskListWait（）
    //     setTimeout('api.refreshHeaderLoadDone()', '500');
    // });
}


function getAppealsList(num) {
    loading();
    var a = num;
    api.ajax({
        url: baseUrl + "/api/Appeal/GetAppealListPage", //    "/api/Task/GetApplyStatementType",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                // Complainant 传参
                UserId: userId,
                Token: userToKen,
                Page: pageNo, //当前页数
                PageSize: pageSize, //每页显示数量   是否必填：N
                Complainant: a, //申诉方 0-申诉我的 1-我发起的申诉   默认进来加载 【我收到的申诉】
            }
        }

    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            // console.log(JSON.stringify(ret));
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                // console.log(JSON.stringify(json.obj));
                // console.log("我收到的申诉");
                // console.log(json.obj.AppealList);
                //利用doT.js模版引擎渲染list页面
                if (json.obj.AppealList != null && json.obj.AppealList.length > 0) {
                    var dotTemplate = doT.template($('#gradeListTemp').html());
                    var templateHtml = dotTemplate(json.obj.AppealList);
                    $('#appealItems').append(templateHtml);
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

//tab切换事件
$(function() {
    $('#appeals_ul').on("click", "li", function() {
        $(this).addClass("active").siblings("li").removeClass("active");
        var a = $(this).attr("index");
        //清空现有的ul里面内容，重新请求加载新的内容
        $("#appealItems").html("");
        getAppealsList(a);
    });


});

//APICloud路由传参
function appealInfo(appealId) {
    api.openWin({
        name: 'apealsDetail',
        url: '../../../html/user/appeal/appeals_detail.html',
        slidBackEnabled: false,
        pageParam: {
            AppealId: appealId
        }
    });
}
