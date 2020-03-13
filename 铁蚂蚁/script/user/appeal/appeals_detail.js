userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
//操作任务倒计时
var has_click = false;
var timer = "";

apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        getAppealInfo();
    }

    //催返款按钮
    $('#urge').click(function() {
        layer.open({
            content: '<p class="layer_tips">提示商家返款</p>',
            btn: ['确认', '取消'],
            yes: function(index) {
                layer.open({
                    content: '执行操作'
                })
            }
        });
    });
}

function getAppealInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Appeal/GetAppealInfo", //获取申诉详情
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AppealId: api.pageParam.AppealId
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                var dId = api.pageParam.AppealId;
                var orderno = json.obj.OrderNo; //关联订单号
                var question = json.obj.Question; //问题描述
                var productimag = json.obj.ProductImg; //产品图片
                $("#orderid").html(orderno);
                $("#productimg").attr("src", productimag);
                $("#textcontent").html(question);
                if (json.obj.Status == 0) {
                    if (json.obj.AppealType == 0) {
                        $("#guanfangjieru").show();
                        $("#guanfangjieru").attr("onclick", "guanfangjieru()");
                    } else {
                        if (isNullOrEmpty(json.obj.Reply)) {
                            $(".reply_box").show();
                            $("#replyAppeal").attr("onclick", "replyAppeal()");
                        }
                    }
                } else {
                    $(".stepInfo li").eq(2).addClass("active");
                    $(".stepInfo li").eq(3).addClass("active");
                    $(".platformreply_text").html("平台回复内容：" + json.obj.PlatformReply);
                }
                if (!isNullOrEmpty(json.obj.QuestionImgF)) {
                    $("#questionImg span").eq(0).show();
                    $("#questionImg img").eq(0).attr("src", json.obj.QuestionImgF);
                }
                if (!isNullOrEmpty(json.obj.QuestionImgS)) {
                    $("#questionImg span").eq(1).show();
                    $("#questionImg img").eq(1).attr("src", json.obj.QuestionImgS);
                }
                if (!isNullOrEmpty(json.obj.QuestionImgT)) {
                    $("#questionImg span").eq(2).show();
                    $("#questionImg img").eq(2).attr("src", json.obj.QuestionImgT);
                }
                if (!isNullOrEmpty(json.obj.ReplyImgF))
                    $("#replyImg").append("<span class=\"img\"><img src=\"" + json.obj.ReplyImgF + "\" /></span>");
                if (!isNullOrEmpty(json.obj.ReplyImgS))
                    $("#replyImg").append("<span class=\"img\"><img src=\"" + json.obj.ReplyImgS + "\" /></span>");
                if (!isNullOrEmpty(json.obj.ReplyImgT))
                    $("#replyImg").append("<span class=\"img\"><img src=\"" + json.obj.ReplyImgT + "\" /></span>");
                if (!isNullOrEmpty(json.obj.Reply)) {
                    $(".reply_text").html((json.obj.AppealType == 0 ? "商家" : "会员") + "回复内容：" + json.obj.Reply);
                    $(".stepInfo li").eq(2).addClass("active");
                }

                //			缩略图全屏查看
                $('.appealsDetail img').click(function() {
                    var photoBrowser = api.require('photoBrowser');
                    var imgsrc = $(this).attr("src");
                    photoBrowser.open({
                        images: [imgsrc],
                        placeholderImg: 'widget://image/loading_more.gif',
                        bgColor: '#000'
                    }, function(ret, err) {
                        if (ret) {
                            if (ret.eventType == 'click') {
                                photoBrowser.close()
                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                });
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

//发起官方介入
function guanfangjieru() {
    layer.open({
        title: [
            '温馨提醒',
            'background-color: #5c91f0; color:#fff;'
        ],
        content: "您真的要发起官方介入吗？",
        btn: ['确定', '取消'],
        yes: function(index) {
            //确定执行的事件
            var VipId = api.pageParam.AppealId;
            layer.close(index);
            faqijieru(VipId); ///api/Appeal/InitiatePlatformInvolvement  发起介入   UserId    Token    AppealId
        },
        cancel: function(index) {
            //取消执行的事件
            layer.close(index);
        }
    });
}

function faqijieru(AppealId) {
    var Id = AppealId;
    loading();
    api.ajax({
        url: baseUrl + "/api/Appeal/InitiatePlatformInvolvement",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AppealId: Id
            }
        }
    }, function(ret, err) {
        optionResult(ret);
        loading_close();
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, "appeals_center.html");
            //console.log(json.url);
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function replyAppeal() {
    var replyText = $("#txtReply").val();
    if (isNullOrEmpty(replyText)) {
        tips("申诉回复不能为空");
        return false;
    }
    layer.open({
        title: [
            '温馨提醒',
            'background-color: #5c91f0; color:#fff;'
        ],
        content: "只能回复一次申诉信息，确认回复该内容？",
        btn: ['确定', '取消'],
        yes: function(index) {
            //确定执行的事件
            var appealId = api.pageParam.AppealId;
            layer.close(index);
            loading();
            api.ajax({
                url: baseUrl + "/api/Appeal/ReplySellerAppeal",
                method: 'post',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        AppealId: appealId,
                        ReplyContent: replyText,
                        ReplyImgF: $("#replyImgF").val(),
                        ReplyImgS: $("#replyImgS").val(),
                        ReplyImgT: $("#replyImgT").val()
                    }
                }
            }, function(ret, err) {
                optionResult(ret);
                loading_close();
            });
        },
        cancel: function(index) {
            //取消执行的事件
            layer.close(index);
        }
    });
}
