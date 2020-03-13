var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        GetPointInfo();
        //检查是否完成新手任务
    }

    //点击签到
    $('.Signbtn').click(function() {
        //不包含样式 签到
        if (!$(this).hasClass("active")) {
            loading();

            api.ajax({
                url: baseUrl + "/api/integral/SignInGetPoints",
                method: 'post',
                dataType: 'json',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen
                    }
                }
            }, function(ret, err) {
                optionSignResult(ret);
                loading_close();
            });

        }
    })


}

//签到回调方法
function optionSignResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips(json.msg);
            $("#MyPoint").html(json.obj);
            $(".Signbtn").addClass('active');
            $(".Signbtn").find('.txt').text('已签到');
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

//获取签到信息
function GetPointInfo() {
    loading();

    api.ajax({
        url: baseUrl + "/api/integral/LoadSignInPage",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
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
            $("#MyPoint").html(json.obj.Score);
            $("#ThisPoint").html("+" + json.obj.DayScore + "积分");
            $("#GotoDay").html("已经连续签到" + json.obj.GotoDay + "天/获得" + json.obj.DayScore + "积分");
            switch (json.obj.DayScore) {
                case 1:
                    $("#forOneDay").addClass("cur");
                    break;
                case 2:
                    $("#forTwoDay").addClass("cur");
                    break;
                case 3:
                    $("#forThreeDay").addClass("cur");
                    break;
                case 4:
                    $("#forFourDay").addClass("cur");
                    break;
                case 5:
                    $("#forFiveDay").addClass("cur");
                    break;
                case 6:
                    $("#forSixDay").addClass("cur");
                    break;
                case 7:
                    $("#forSevenDay").addClass("cur");
                    break;

            }
        } else if (json.errcode == 3) {
            //已签到
            $(".Signbtn").addClass('active');
            $(".Signbtn").find('.txt').text('已签到');
            $("#MyPoint").html(json.obj.Score);
            // $("#ThisPoint").html("+" + json.obj.DayScore + "积分");
            $("#GotoDay").html("已经连续签到" + json.obj.GotoDay + "天/获得" + json.obj.DayScore + "积分");
            switch (json.obj.DayScore) {
                case 1:
                    $("#forOneDay").addClass("cur");
                    break;
                case 2:
                    $("#forTwoDay").addClass("cur");
                    break;
                case 3:
                    $("#forThreeDay").addClass("cur");
                    break;
                case 4:
                    $("#forFourDay").addClass("cur");
                    break;
                case 5:
                    $("#forFiveDay").addClass("cur");
                    break;
                case 6:
                    $("#forSixDay").addClass("cur");
                    break;
                case 7:
                    $("#forSevenDay").addClass("cur");
                    break;

            }

        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}


function getDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); //注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tMonth + "-" + tDate;
}
