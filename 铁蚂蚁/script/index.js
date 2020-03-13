userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(1);
    api.setStatusBarStyle({
        //style: 'dark',
        color: '#43dbe0'
    });
    getSysConfig();
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = 'html/login/login.html';
    } else {
        getBanner();
        getMemberInfo();
        getNotOperatedTask();
    }

    //			公告滚动
    function scrollNews(obj) {
        var $self = obj.find("ul:first");
        var lineHeight = $self.find("li:first").height();
        $self.animate({
            "margin-top": -lineHeight + "px"
        }, 600, function() {
            $self.css({
                "margin-top": "0px"
            }).find("li:first").appendTo($self);
        })
    }
    var $newsdiv = $(".noticeList");
    var scrollTimer;
    $newsdiv.hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer = setInterval(function() {
            scrollNews($newsdiv);
        }, 3000);
    }).trigger("mouseout");

    /*弹出（未完成新手任务时）*/
    // $('.navIcon a').click(function() {
    //     IsNovice();
    // });

    //点击新手任务
    ifTask = function() {
        api.ajax({
            url: baseUrl + "/api/Member/GetBindPageData",
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
                if (json.errcode === 0) {
                    if (json.obj.IsAUT === 1 && json.obj.BankStr != "" && json.obj.QQStr != "") {
                        for (var i = 0; i < json.obj.MemberAccount.length; i++) {
                            if (json.obj.MemberAccount[i].IsBindText === "已绑定") {
                                tips("已完成新手任务");
                            }
                        }
                    } else {
                        window.location.href = "html/user/bindinfo.html";
                    }
                }
            } else {
                tips("服务器走神了，请重试");
            }
        })
    }
    $(".notice_wechat").click(function() {
        var qrCodeUrl = $("#wechat_qrCode").val();
        layer.open({
            title: 'QQ咨询',
            content: '<img class="layer_img" src="' + qrCodeUrl + '"/><p class="layer_tips">保存图片使用QQ扫一扫添加或直接点击下方按钮复制QQ号</p>',
            btn: '点击复制QQ号',
            yes: function(index) { //layer.msg('yes');    //点击确定回调
                layer.closeAll();
                var clipBoard = api.require('clipBoard');
                clipBoard.set({
                    value: $("#wechat_num").html()
                }, function(ret, err) {
                    if (ret) {
                        tips("复制成功");
                        console.log(JSON.stringify(ret));
                    } else {
                        tips("复制失败");
                        console.log(JSON.stringify(err));
                    }
                });
            }
        });
    });
}

function getMemberInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Login/GetMemberInfo",
        method: 'get',
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
                $("#myCommission").html(json.obj.Amount);
                $("#myWallet").text(json.obj.Wallet);
                var isAdvanceRange = isNullOrEmpty(json.obj.IsAdvanceRange) ? 0 : json.obj.IsAdvanceRange;
                $api.setStorage('isAdvanceRange', isAdvanceRange);
            } else {
                tips("登录超时，请重新登录");
                loading_close();
                location.href = 'html/login/login.html';
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
        getMessageList();
        getUnreadCount();
    });
}
//滚动公告
function getMessageList() {
    api.ajax({
        url: baseUrl + "/api/Notice/GetNoticeByMember",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                Page: 1,
                PageSize: 3,
                SendType: 0
            }
        }
    }, function(ret, err) {
        if (ret) {
            optionResult(ret);
        } else {
            console.log(JSON.stringify(err));
        };
    });
}

function getUnreadCount() {
    api.ajax({
        url: baseUrl + "/api/Notice/GetNoticeUnreadCount",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                SendType: 1
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {
                    if (json.obj > 0) {
                        $("#noticeCount").show();
                        $("#noticeCount").html(json.obj);
                    }
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            console.log(JSON.stringify(err));
        };
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            var dotTemplate = doT.template($('#indexMessageListTemp').html());
            var templateHtml = dotTemplate(json.obj.NoticeList);
            $('.noticeList ul').append(templateHtml);
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function getSysConfig() {
    api.ajax({
        url: baseUrl + "/api/SysConfig/GetSysConfig",
        method: 'get',
        dataType: 'json'
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                $("#wechat_num").html(json.obj.AppQQ);
                $("#wechat_qrCode").val(json.obj.AppQQcode);
                var fanQQ = isNullOrEmpty(json.obj.ConsultationQQ) ? '933627038' : json.obj.ConsultationQQ;
                var fanUrl = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + fanQQ + "&card_type=group&source=qrcode"
                $("#fanInteraction").attr("href", fanUrl);
                var yonghuqunQQ= isNullOrEmpty(json.obj.APPusergroup) ? '759198439' : json.obj.APPusergroup;
                //console.log("yonghuqunQQ:"+yonghuqunQQ);
                $(".yhq").attr("href","mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + yonghuqunQQ + "&card_type=group&source=qrcode")
                appIsDown(json.obj.IOSVersionNumber,json.obj.IOSDownloadUrl);
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            alert(err.msg);
        };
    });
}

function getNotOperatedTask() {
    api.ajax({
        url: baseUrl + "/api/Task/GetMemberTaskList",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                MemberAcceptTaskStatus: 5,
                Page: 1
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                if (json.obj.AcceptTaskList.length > 0) {
                    for (var i = 0; i < json.obj.AcceptTaskList.length; i++) {
                        $('.notOperatedList').append(templateHtml(json.obj.AcceptTaskList[i]));
                    }
                } else {
                    $("#notOperated").hide();
                }
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = 'html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
}

function templateHtml(model) {
    var text = "";
    text += "<li>";
    text += "	<a href=\"javascript:orderInfo('" + model.TaskAcceptNo + "');\" class=\"outside\">";
    text += "		<div class=\"pictrue_div\">";
    text += "			<div class=\"pictrue\">";
    text += "				<img src=\"" + model.ProductImg + "\" alt=\"\" />";
    text += "			</div>";
    text += "		</div>";
    text += "		<div class=\"info_box\">";
    text += "			<div class=\"info_left\">";
    text += "				<p>" + model.TaskText + "<span>&nbsp;" + model.GetCommission + "金</span></p>";
    text += "				<p>" + model.AcceptTaskStatusText + "</p>";
    text += "			</div>";
    text += "			<div class=\"info_right\">查&nbsp;看</div>";
    text += "		</div>";
    text += "	</a>";
    text += "</li>";
    return text;
}

function orderInfo(acceptNo) {
    api.openWin({
        name: 'selectoperation',
        url: 'html/task/selectoperation.html',
        slidBackEnabled: false,
        pageParam: {
            taskAcceptNo: acceptNo
        }
    });
}

//banner图
function getBanner() {
    api.ajax({
        url: baseUrl + "/api/Advertisement/GetHomeBanners",
        method: 'get',
        dataType: 'json'
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {
                    var dotTemplate = doT.template($('#indexBannerListTemp').html());
                    var templateHtml = dotTemplate(json.obj);
                    $('.banner .swiper-wrapper').append(templateHtml);

                    //调用轮播
                    var swiper = new Swiper('.swiper-container', {
                        autoplay: true,
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    });
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            console.log(JSON.stringify(err));
        };
    });
}
//判断是否有抽奖活动
function lotteryUrl() {
    api.ajax({
        url: baseUrl + "/api/PlayActivities/lotteryUrl",
        method: 'post',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 2) {
                    //跳转页面
                    location.href = json.url;
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
            //alert( JSON.stringify( ret ) );
        } else {
            console.log(JSON.stringify(err));
        }
    });
}
