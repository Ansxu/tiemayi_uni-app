userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var isture = false; //是否正在抽奖
apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        $(".btn_star").click(function() {
            if (!isture) {
                isture = true; //正在抽奖
                api.ajax({
                    url: baseUrl + "/api/PlayActivities/Clicklottery",
                    method: 'post',
                    data: {
                        values: {
                            UserId: userId,
                            Token: userToKen,
                            Id: $("#ActivitiesId").val()
                        }
                    }
                }, function(ret, err) {
                    if (ret) {
                        if (!isNullOrEmpty(JSON.stringify(ret))) {
                            var json = $.parseJSON(JSON.stringify(ret))
                            if (json.errcode == 0) {
                                if (json.obj[0].Nos == 10) {
                                    //没有抽中任何奖
                                    clickfunc(8, "精神鼓励奖");
                                } else {
                                    clickfunc(json.obj[0].lotteryLv, json.obj[0].Name);
                                }
                            } else if (json.errcode == 2) {
                                alert(json.msg)
                                location.href = '../login/login.html';
                            } else {
                                isture = false;
                                alert(json.msg); // 抽奖验证失败
                            }
                        } //用户验证失败
                        else {
                            tips("服务器走神了,请重试")
                        }
                    } else {
                        alert(JSON.stringify(err))
                    }
                });
            }
        });
        //读取绑定数据值
        lotteryrule();
        prizeInformation();
        MylotteryInformation();
    }
}

function clickfunc(Lv, Name) {
    var data = Lv;
    switch (data) {
        case 1:
            rotateFunc(1, 0, '恭喜您获得1等奖' + Name + '');
            break;
        case 2:
            rotateFunc(2, -45, '恭喜您获得2等奖' + Name + '');
            break;
        case 3:
            rotateFunc(3, -90, '恭喜您获得3等奖' + Name + '');
            break;
        case 4:
            rotateFunc(4, -135, '恭喜您获得4等奖' + Name + '');
            break;
        case 5:
            rotateFunc(5, 180, '恭喜您获得5等奖' + Name + '');
            break;
        case 6:
            rotateFunc(6, 135, '恭喜您获得6等奖' + Name + '');
            break;
        case 7:
            rotateFunc(7, 90, '恭喜您获得7等奖' + Name + '');
            break;
        case 8:
            rotateFunc(8, 45, '恭喜您获得8等奖' + Name + '');
            break;
    }
}

function rotateFunc(awards, angle, text) {
    isture = true;
    $('.zhuanpanBox').stopRotate();
    $('.zhuanpanBox').rotate({
        angle: 0, //旋转的角度数
        duration: 4000, //旋转时间
        animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
        callback: function() {
            isture = false; // 标志为 执行完毕
            alert(text);
            MylotteryInformation();
            //location.reload(); //刷新页面
        }
    });
};

//奖品信息
function prizeInformation() {
    api.ajax({
        url: baseUrl + "/api/PlayActivities/prizeInformation",
        method: 'post',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret))
                if (json.errcode == 2) {
                    //绑定数据
                    var obj = json.obj;
                    if (obj != null) {
                        var html = "";
                        for (var i = 0; i < obj.length; i++) {
                            html += "<li>" + obj[i].Name + "奖项数量为" + obj[i].TotalNum + ",目前已中奖个数" + obj[i].ReceiveNum + "人</li>";
                        }
                        $("#prizelist").html(html);
                    }
                }
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            alert(JSON.stringify(err));
        }
    });
}
//抽奖规则
function lotteryrule() {
    api.ajax({
        url: baseUrl + "/api/PlayActivities/lotteryrule",
        method: 'post',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 2) {
                    //绑定数据值
                    $("#rule").html("游戏规则：" + json.obj[0].Conment); // 抽奖规则
                    $("#ActivitiesId").val(json.obj[0].Id); //活动Id
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            console.log(JSON.stringify(err));
        }
    });
}
//我的抽奖记录
function MylotteryInformation() {
    api.ajax({
        url: baseUrl + "/api/PlayActivities/MylotteryInformation",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 2) {
                    // 绑定数据
                    var obj = json.obj;
                    if (obj != null) {
                        var html = "";
                        for (var i = 0; i < obj.length; i++) {
                            html += "<li>";
                            html += "<span class='left'>" + obj[i].PrizesName + "</span>";
                            html += "<span class='right time'>" + obj[i].AddTime + "</span>";
                            html += "</li>";
                        }
                        $("#MylotteryInformation").html(html);
                    }
                } else {
                    if (json.errcode == 3) {} else if (json.errcode == 4) {
                        tips(json.msg); //用户验证
                    }
                }
            } else {
                tips(json.msg);
            }
        } else {
            console.log(JSON.stringify(err));
        }
    });
}
