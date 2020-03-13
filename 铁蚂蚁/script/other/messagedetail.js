var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var messageId = $api.getStorage('messageId');

apiready = function() {
        exit_app(0);
        if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
            location.href = '../login/login.html';
        } else {
            GetMessageList();
        }

    }
    //获取用户信息
function GetMessageList() {
    // loading();
    var getUrl = baseUrl + "/api/Notice/ReadNoticeInfo";
    api.ajax({
        url: getUrl,
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                NoticeId: messageId
            }
        }
    }, function(ret, err) {
        if (ret) {
            optionResult(ret);

        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
        // loading_close();

    });
}


function optionResult(ret) {

    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        // console.log(JSON.stringify(ret));
        if (json.errcode == 0) {
            var dotTemplate = doT.template($('#messageDetailTemp').html());
            var templateHtml = dotTemplate(json.obj);
            $('#messageDetailTempMain').html(templateHtml);

        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }

}
