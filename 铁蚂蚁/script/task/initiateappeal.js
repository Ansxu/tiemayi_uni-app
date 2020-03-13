userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var questionTypeId = -1;

apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {

    }
    $('#select_type').click(function() {
        loading();
        api.ajax({
            url: baseUrl + "/api/Task/GetApplyStatementType",
            method: 'get',
            dataType: 'json'
        }, function(ret, err) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {
                    var text = "";
                    for (var i = 0; i < json.obj.length; i++) {
                        text += "<li>" + json.obj[i].TypeText + "</li>";
                    }
                    layer.open({
                        title: '请选择申诉类型',
                        content: '<span class="closebtn">×</span><div class="open-typebox"><ul>' + text + '</ul></div>'
                    });
                    $('.closebtn').click(function() {
                        layer.closeAll() //关闭所有层
                    });
                    $('.open-typebox li').click(function() {
                        $(this).addClass('active').siblings().removeClass('active');
                        questionTypeId = $(this).index();
                        $(".questiontype_text").text($(this).html());
                        layer.closeAll(); //关闭所有层
                    });
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
            loading_close();
        });
    });
}

function submitAppeal() {
    if (questionTypeId <= -1) {
        tips("必须选择申诉类型");
        return false;
    }
    var txtQuestion = $("#txtQuestion").val();
    if (isNullOrEmpty(txtQuestion)) {
        tips("申诉说明不能为空");
        return false;
    }
    if (isNullOrEmpty($("#questionImgF").val()) && isNullOrEmpty($("#questionImgS").val()) && isNullOrEmpty($("#questionImgT").val())) {
        tips("必须上传一张图片说明");
        return false;
    }
    api.ajax({
        url: baseUrl + "/api/Task/InitiateAppeal",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskAcceptNo: api.pageParam.taskAcceptNo,
                AppealMsg: txtQuestion,
                AppealTypeId: questionTypeId,
                QuestionImgF: $("#questionImgF").val(),
                QuestionImgS: $("#questionImgS").val(),
                QuestionImgT: $("#questionImgT").val()
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                tips(json.msg);
                api.openWin({
                    name: 'myorderlist',
                    url: '../../html/task/myorderlist.html',
                    slidBackEnabled: false,
                    pageParam: {
                        taskType: json.obj,
                        taskStatus: 4
                    }
                });
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
}
