userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
//操作任务倒计时
var has_click = false;
var timer = "";
var evaluationTimer = "";

apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getTaskInfo();
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

function getTaskInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/LoadOperationalTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskAcceptNo: api.pageParam.taskAcceptNo
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                if (!isNullOrEmpty(json.obj.ImgJson)) {
                    var ImageJson = $.parseJSON(json.obj.ImgJson);
                    json.obj["ImgJson"] = ImageJson;
                }
                if (!isNullOrEmpty(json.obj.OkImgJson)) {
                    var OkImageJson = $.parseJSON(json.obj.OkImgJson);
                    json.obj["OkImgJson"] = OkImageJson;
                }

                var interText = doT.template($("#taskInfoTemp").text());
                $("#taskInfo").html(interText(json.obj));
                if (json.obj.AcceptTaskStatus == 0) {
                    timerStart(json.obj.OperationCountdown);
                }
                if (json.obj.AcceptTaskStatus == 2 && json.obj.EvaluationCountdown < 72) {
                    EvaluationTimerStart(json.obj.EvaluationCountdown);
                }
                //			缩略图全屏查看
                $('.thumbnails img').click(function() {
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

function timerStart(countdown) {
    var i = parseInt(countdown);
    var alls = 60 * i;
    var h = parseInt(i / 60);
    var m = i - (h * 60);
    if (m == 0) {
        --h;
        m = 59;
    } else
        --m
    var s = 59;
    timer = setInterval(function() {
        if (alls <= 0) {
            has_click = false;
            clearInterval(timer);
            $('#count_down').html("提交倒计时 00:00:00");
            tips("任务超时未处理，系统已取消");
            location.href = 'receivedtask.html';
        } else {
            var str = "";
            str = (h > 0 ? h >= 10 ? h : "0" + h : "00") + ":" + (m > 0 ? m >= 10 ? m : "0" + m : "00") + ":" + (s > 0 ? s >= 10 ? s : "0" + s : "00");
            $('#count_down').html("提交倒计时 " + str);
            --s;
            --alls;
            if (m == 0 && h > 0 && alls > 0) {
                --h;
                m = 59
            }
            if (s == 0) {
                --m;
                s = 60;
            }

        }
    }, 1000);
}

function ClearTimer() {
    clearInterval(timer);
    $('#count_down').html('');
}

function CopyTaskAcceptNo() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#txt_taskAcceptNo").text()
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

function CopyTaskNo() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#txt_taskNo").text()
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

function CopyPlatOrderNo() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#txt_platOrderNo").text()
    }, function(ret, err) {
        if (ret) {
            tips("复制成功");
        } else {
            tips("复制失败");
        }
    });
}
function cancelTheTask() {
    var cancelTypeId = -1;
    var cancelText = "";
    layer.open({
        content: '<p class="layer_tips">撤销次数超过10次后，再次撤销任务每次扣取0.1金币，确定取消任务？</p>' +
            '<div class="open-typebox"><ul>' +
            '<li>找不到商品</li><li>不想做这个任务</li><li>达不到商家的要求</li><li>其他</li>' +
            '</ul></div>',
        btn: ['确定', '取消'],
        yes: function(index) {
            if (cancelTypeId > -1 && !isNullOrEmpty(cancelText)) {
                loading();
                api.ajax({
                    url: baseUrl + "/api/Task/CancelTask",
                    method: 'post',
                    dataType: 'json',
                    data: {
                        values: {
                            UserId: userId,
                            Token: userToKen,
                            TaskAcceptNo: api.pageParam.taskAcceptNo,
                            TaskCancelReasons: cancelText
                        }
                    }
                }, function(ret, err) {
                    if (!isNullOrEmpty(JSON.stringify(ret))) {
                        var json = $.parseJSON(JSON.stringify(ret));
                        if (json.errcode == 0) {
                            tips(json.msg);
                            location.href = 'receivedtask.html';
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
            } else {
                alert("必须选择撤销理由");
            }
        }
    });
    parent.$('.open-typebox li').bind('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        cancelTypeId = $(this).index();
        cancelText = $(this).html();
        $(".questiontype_text").text($(this).html());
    });
}

function operationTask() {
    api.openWin({
        name: 'operationtask',
        url: '../../html/task/operationtask.html',
        slidBackEnabled: false,
        allowEdit: true,
        pageParam: {
            taskAcceptNo: api.pageParam.taskAcceptNo
        }
    });
}

function showAppeal() {
    api.openWin({
        name: 'operationtask',
        url: '../../html/task/initiateappeal.html',
        slidBackEnabled: false,
        pageParam: {
            taskAcceptNo: api.pageParam.taskAcceptNo
        }
    });
}

function urgeRebate() {
    layer.open({
        content: '<p class="layer_tips">确定催促商家返款？</p>',
        btn: ['确定', '取消'],
        yes: function(index) {
            loading();
            api.ajax({
                url: baseUrl + "/api/Task/RemindingRefunds",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        TaskAcceptNo: api.pageParam.taskAcceptNo,
                    }
                }
            }, function(ret, err) {
                if (!isNullOrEmpty(JSON.stringify(ret))) {
                    var json = $.parseJSON(JSON.stringify(ret));
                    if (json.errcode == 0) {
                        tips(json.msg);
                        location.reload();
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
    });
}

function EvaluationTimerStart(countdown) {
    var hour = (72 - countdown).toFixed(2);
    var h = parseInt(hour.split(".")[0]);
    var m = parseInt((hour-h)*60);
    var alls = 60 * 60 * h + m * 60;
    var s = 59;
    evaluationTimer = setInterval(function() {
        if (alls <= 0) {
            clearInterval(evaluationTimer);
            $('#evaluation_Countdown').html("评价倒计时 00:00:00");
        } else {
            var str = "";
            str = (h > 0 ? h >= 10 ? h : "0" + h : "00") + ":" + (m > 0 ? m >= 10 ? m : "0" + m : "00") + ":" + (s > 0 ? s >= 10 ? s : "0" + s : "00");
            $('#evaluation_Countdown').html("评价倒计时 " + str);
            --s;
            --alls;
            if (m == 0 && h > 0 && alls > 0) {
                --h;
                m = 59
            }
            if (s == 0) {
                --m;
                s = 60;
            }
        }
    }, 1000);
}


function confirmTask(evaluationCountdown) {
    if (evaluationCountdown < 72) {
        alert("发货不到三天，不能确认收货");
        return false;
    }
    var text = "";
    text += "<div class=\"piclist Uploadimg\">";
    text += "    <ul class=\"clear\">";
    text += "        <li>";
    text += "            <div class=\"img\">";
    text += "                <div class=\"upimg\" onclick=\"getpic(this,'logisticsReceiptImg',2)\"><img class=\"uploadImg\" /></div>";
    text += "                <input type=\"hidden\" id=\"logisticsReceiptImg\" readonly=\"true\" />";
    text += "            </div>";
    text += "        </li>";
    text += "        <li>";
    text += "            <div class=\"img\">";
    text += "                <div class=\"upimg\" onclick=\"getpic(this,'evaluationImg',2)\"><img class=\"uploadImg\" /></div>";
    text += "                <input type=\"hidden\" id=\"evaluationImg\" readonly=\"true\" />";
    text += "            </div>";
    text += "        </li>";
    text += "    </ul>";
    text += "</div>";
    layer.open({
        title: "确认已收货？",
        content: "<p class=\"layer_tips text_l\">请上传物流截图和评价截图</p>" + text,
        btn: ['确定', '取消'],
        yes: function(index) {
            var logisticsReceiptImg = $("#logisticsReceiptImg").val();
            if (isNullOrEmpty(logisticsReceiptImg)) {
                tips("请上传物流截图");
                return false;
            }
            var evaluationImg = $("#evaluationImg").val();
            if (isNullOrEmpty(evaluationImg)) {
                tips("请上传评价截图");
                return false;
            }
            var imgjson = {};
            imgjson["LogisticsReceiptImg"] = logisticsReceiptImg;
            imgjson["EvaluationImg"] = evaluationImg;
            loading();
            api.ajax({
                url: baseUrl + "/api/Task/CompleteTask",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        TaskAcceptNo: api.pageParam.taskAcceptNo,
                        OkImgJson: JSON.stringify(imgjson),
                    }
                }
            }, function(ret, err) {
                if (!isNullOrEmpty(JSON.stringify(ret))) {
                    var json = $.parseJSON(JSON.stringify(ret));
                    if (json.errcode == 0) {
                        tips(json.msg);
                        location.reload();
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
    });
}

function CopyPraiseText() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#praiseText").val()
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

function downEvaluationImg() {
    var i = 0;
    $(".evaluationImglst img").each(function() {
        i++;
        var imageName = "";
        var imageurl = $(this).attr("src");
        imageName = "saveimg" + new Date().Format("yyyyMMddhhmmsss") + i + "." + imageurl.substring(imageurl.lastIndexOf(".") + 1, imageurl.length);
        api.download({
            url: imageurl,
            savePath: 'fs://' + imageName,
            report: true,
            cache: true,
            allowResume: true
        }, function(ret, err) {
            if (ret.state == 1) {
                //下载成功
                saveImage(imageName);
            } else {
                //tips("图片下载失败");
                console.log(JSON.stringify(err));
            }
        });
    });
}

function saveImage(imageName) {
    api.saveMediaToAlbum({
        path: 'fs://' + imageName
    }, function(ret, err) {
        if (ret && ret.status) {
            tips('保存成功');
        } else {
            tips('保存失败');
        }
    });
}
function downVideo(videoUrl) {
  loading("视频下载中")
  var filename = "MLBvideo"+new Date().getTime()+".mp4";
  api.download({
      url: videoUrl,
      savePath: 'fs://'+filename,
      report: true,
      cache: true,
      allowResume: true
  }, function(ret, err) {
    // alert(JSON.stringify(ret))
    // alert(JSON.stringify(err))
      if (ret.state == 1) {
          //下载成功
          saveImage(filename);
          loading_close()
      } else {
          //tips("图片下载失败");
          console.log(JSON.stringify(err));
          loading_close()
      }
  });
}
