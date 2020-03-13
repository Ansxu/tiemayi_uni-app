var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
        exit_app(0);
        if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
            location.href = '../login/login.html';
        } else {
            GetGradeList();
        }
    }
    //获取用户信息
function GetGradeList() {
    loading();
    var getUrl = baseUrl + "/api/Member/GetMemberGrade";
    api.ajax({
        url: getUrl,
        method: 'get',
        dataType: 'json',
    }, function(ret, err) {
        if (ret) {
            optionResult(ret);
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
        loading_close();
    });
}


function optionResult(ret) {

    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj != null && json.obj.length > 0) {
                var dotTemplate = doT.template($('#gradeListTemp').html());
                var templateHtml = dotTemplate(json.obj);
                $('#gradeList').append(templateHtml);
            }

        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}
