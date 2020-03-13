userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var isAdvanceRange = $api.getStorage('isAdvanceRange');
var ishaveaccount = false;
var isAdvanceTask = true;
var platformIdList = "";
var accountIdList = "";
var taskAcceptNo = "";
var taskTypeVal = 0;
var maxMoney = 500;
var isokTask = true;
var timer = "";
var selectAccount = 0;
var selectPlatform = 0;
var flag = true;

apiready = function() {
    exit_app(0);
    api.closeWin({
        name: 'selectaccount'
    });
    api.setStatusBarStyle({
        //style: 'dark',
        color: '#5c91f1'
    });
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        selectAccount = api.pageParam.selectAccountId;
        selectPlatform = api.pageParam.selectPlatformId;
        getAllPlatFormAccount();
        getCompletionRate();
    }
    $("#selectMaxMoney").hide();
    $('.Btns a').click(function() {
        if (flag) {
            var that = $(this);
            var index = $(that).index();
            $(that).addClass('cur').siblings().removeClass('cur');
            taskTypeVal = index;
            rangeHideOrShow();
        }
    });
    //接单按钮
    $('.js-jointTask').on('touchstart', function() {
        platformIdList = "";
        accountIdList = "";
        taskAcceptNo = "";
        if (!$(this).hasClass('circle')) {
            if (!$('.js-accountList li').hasClass('acivebg')) {
                if (!getswitch()) {
                    return false;
                }
            }
            //检查定位
            $('.jiedan-over').addClass('visible');
            $('.stopTdisplay').css('display', 'none');
            $(this).attr('src', '../../image/icons/jiedaning_noword@2x.png');
            $(this).css('-webkit-animation', 'circle 1s infinite linear');
            $(this).next().html("接单");
            $(this).addClass("circle");
            $(this).prev().html("00:00:00");
            var h = 0;
            var m = 0;
            var s = 0;
            timer = setInterval(function() {
                if (s == 60) {
                    m++;
                    s = 0;
                } else
                    s++;
                if (m == 60) {
                    h++;
                    m = 0;
                }
                var str = (h > 9 ? h : "0" + h) + ":" + (m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s);
                $('.js-jointTask').prev().html(str);
            }, 1000);
            setTimeout("sendTask()", "15000");
        }
    });
    //手动停止接单
    $('.stopgetTask').click('tap', function() {
        closemask();
    });
    $('.task_ok').on('click', function() {
        api.openWin({
            name: 'selectoperation',
            url: '../../html/task/selectoperation.html',
            slidBackEnabled: false,
            pageParam: {
                taskAcceptNo: taskAcceptNo
            }
        });
    });
}

function sendTask() {

    if (isokTask) {
      var timestamp = (new Date()).getTime(); //当前时间戳
      var sign = md5(appId + clientId + clientSecret + apikey + timestamp).toLowerCase(); //签名

        api.ajax({
            url: baseUrl + "/api/Task/NewsSystemSendTask",
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
                    AccountIdList: accountIdList,
                    PlatIdList: platformIdList,
                    TaskType: taskTypeVal,
                    AppVersion:api.appVersion,
                    MaxAdvancePayMoney: maxMoney
                }
            }
        }, function(ret, err) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {
                    isokTask = false;
                    $('.js-jointTask').css('-webkit-animation', '');
                    $('.js-jointTask').removeClass("circle");
                    $(".new_task").addClass("disblock");
                    var main_container = $(".main_container");
                    main_container[0].innerText = json.obj.PlatType;
                    main_container[1].innerText = json.obj.AdvancePaymentMoney + '元';
                    main_container[2].innerText = json.obj.TaskCommission + '金';
                    main_container[3].innerText = json.obj.OperationCountdown + '分钟';
                    if (json.obj.AdvancePaymentMoney <= 0) {
                        main_container[1].innerText = '无需垫付';
                    }
                    taskAcceptNo = json.obj.TaskAcceptNo;
                } else if (json.errcode == 2) {
                    tips(json.msg);
                    location.href = '../../html/login/login.html';
                } else if (json.errcode == 3) {
                    tips(json.msg);
                    $('.stopTdisplay').css('display', 'block');
                    $('.js-jointTask').css('-webkit-animation', '');
                    $('.js-jointTask').removeClass("circle");
                    $('.js-jointTask').prev().html(" ");
                    clearInterval(timer);
                } else if (json.errcode == 99) {
                  $('.js-jointTask').css('-webkit-animation', '');
                  $('.js-jointTask').removeClass("circle");
                  $('.js-jointTask').prev().html(" ");
                  clearInterval(timer);
                  alert(json.msg);
                  //   location.href = json.url;
                }else {
                    tips(json.msg);
                    closemask();
                }
            } else {
                tips("服务器走神了，请重试");
                closemask();
            }
        });
    } else {
        tips("超时接单，请重试");
        closemask();
    }
}

function getAllPlatFormAccount() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetSysSendTaskAccount", //GetAllPlatFormCanReceiveAccount",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                SelectAccountId: selectAccount,
                SelectPlatFormId: selectPlatform
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            // console.log(JSON.stringify(ret));
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                if (json.obj.length > 0) {
                    for (var i = 0; i < json.obj.length; i++) {
                        $('.account_list').append(templateHtml(json.obj[i]));
                    }
                    if (ishaveaccount) {
                        $('.js-alertMask').addClass('dis');
                    } else {
                        api.confirm({
                            msg: '没有绑定账号或账号未审核',
                            buttons: ['确定', '取消']
                        }, function(ret, err) {
                            if (ret.buttonIndex == 1)
                                location.href = '../../html/user/bindinfo.html';
                            else
                                location.href = '../../index.html';
                        });
                    }
                    if (!isAdvanceTask) {
                        $(".Btns a").eq(2).addClass('cur').siblings().removeClass('cur');
                        flag = false;
                        taskTypeVal = 2;
                    }
                }
            } else if (json.errcode == 2) {
                tips("登录超时，请重新登录");
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

function templateHtml(model) {
    var text = "";
    if (model.IsBind > 0 && model.ReviewStatus == 1) {
        ishaveaccount = true;
        isAdvanceTask = isAdvanceTask ? model.IsAdvanceTask : false;
        //绑定了账号
        text += "<div class='receiving'><div class='clearfix content'><img src='" + model.Logo + "' class='task_icon pull-left' />";
        text += "<div class='discribe pull-left' " + (model.PlatformAccountNum > 1 ? "onclick='selectOrdersAccount(" + model.PlatId + ")'" : "") + "><p class='task_name '>" + model.AccountName;
        text += "</p><p class='task_rate'>今日已接垫付：" + model.DayCountText + "&nbsp;浏览" + model.BrowseDayCount + "/∞单";
        text += "</p></div></div>";
        text += "<p class='task_type' data-ifband='true'>" + model.PlatName + "任务</p>";
        //判断是否开启
        text += "<img src='../../image/icons/switch_on@2x.png' class='switch account_id' data-accountId='" + model.AccountId + "' data-platId='" + model.PlatId + "' data-isadvance='" + model.IsAdvanceTask + "' onclick='switchOnOrOff(this)' />";
        text += "</div>";
    } else {
        //未绑定账号
        text += "<li class=\"clearfix\" onclick='testIsBand(this)'>";
        text += "<img src=\"" + model.Logo + "\" class=\"account_icon pull-left\">";
        text += "<p class=\"account_name\">添加" + model.PlatName + "账号</p>";
        text += "</li>";
    }
    return text;
}

function getCompletionRate() {
    api.ajax({
        url: baseUrl + "/api/Member/GetCompletionRate",
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
                $("#useridd").text('ID:' + userId + ' | 完成率' + json.obj);
            } else if (json.errcode == 2) {
                tips("登录超时，请重新登录");
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
}

function switchOnOrOff(el) {
    var isokadvance = true;
    if ($(el).attr('src') == '../../image/icons/switch_on@2x.png') {
        $(el).attr('src', '../../image/icons/switch_off@2x.png');
    } else if ($(el).attr('src') == '../../image/icons/switch_off@2x.png') {
        $(el).attr('src', '../../image/icons/switch_on@2x.png');
    } else {
        console.log('null src');
    }
    $(".account_id").each(function() {
        //console.log($(this).attr("data-isadvance"));
        if ($(this).attr('src') == '../../image/icons/switch_on@2x.png' && $(this).attr("data-isadvance") == "false") {
            isokadvance = $(this).attr("data-isadvance");
        }
    });
    if (isokadvance == "false") {
        flag = false;
        $(".Btns a").eq(2).addClass('cur').siblings().removeClass('cur');
        taskTypeVal = 2;
    } else {
        flag = true;
        $(".Btns a").eq(0).addClass('cur').siblings().removeClass('cur');
        taskTypeVal = 0;
    }
}

function testIsBand(el) {
    if ($(el).find('.task_type').data('ifband')) {
        $(el).addClass('acivebg');
    } else {
        api.confirm({
            msg: '你还未绑定该账号，是否立即前往绑定！',
            buttons: ['确定', '取消']
        }, function(ret, err) {
            if (ret.buttonIndex == 1) {
                openwin('bindInfoPage', '../../html/user/bindinfo.html');
            }
        });
    }
}

function getswitch() {
    $('.switch').each(function() {
        if ($(this).attr('src') == '../../image/icons/switch_on@2x.png') {
            accountIdList += $(this).attr('data-accountId') + (isNullOrEmpty($(this).attr('data-accountId')) ? "" : ',');
            platformIdList += $(this).attr('data-platId') + (isNullOrEmpty($(this).attr('data-platId')) ? "" : ',');
        }
    });
    if (isNullOrEmpty(platformIdList) || isNullOrEmpty(accountIdList)) {
        tips('请先选择接单账号！');
        return false;
    } else {
        return true;
    }
}

function closemask() {
    clearInterval(timer);
    $('.stopTdisplay').css('display', 'none');
    $('.jiedan-over').removeClass('visible');
    $('.js-jointTask').attr('src', '../../image/icons/jiedan@2x.png');
    $('.js-jointTask').css('-webkit-animation', '');
    $('.js-jointTask').next().html(" ");
    $('.js-jointTask').removeClass("circle");
    $('.js-jointTask').prev().html(" ");
}

function rangeHideOrShow() {
    if (taskTypeVal == 1 && isAdvanceRange == 0) {
        $("#selectMaxMoney").show();
        $("#maxMoney").ionRangeSlider({
            min: 500,
            max: 20000,
            from: 500,
            step: 100,
            onChange: function(data) {
                maxMoney = data.from;
            },
        });
    } else {
        $("#selectMaxMoney").hide();
    }
}

function description() {
    api.alert({
        title: "注意！",
        msg: "后台根据用户资料，系统自动派单！垫付任务每个平台账号每天限制接4-6单，接满之后自动下线。如果开通VIP，自动切换下一个账号接单，每天0点后已下线的账号会自动上线。如果需要做浏览任务，比如：点击接单按钮，账号已下线，请移步到APP首页-全部任务-浏览任务-选择账号-立刻抢单！浏览任务接单数量不限制！",
        buttons: ["我知道了"]
    });
}

function selectOrdersAccount(selectPlatId) {
    api.openWin({
        name: 'selectaccount',
        url: '../../html/task/selectaccount.html',
        slidBackEnabled: false,
        pageParam: {
            selectPlatId: selectPlatId
        }
    });
}
