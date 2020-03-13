apiready = function() {
    exit_app(0);
    getInviterList();
}

function getInviterList() {
    api.ajax({
        url: baseUrl + "/api/Member/GetInviterList",
        method: 'get',
        dataType: 'json',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {
                    if (json.obj != null && json.obj.length > 0) {
                        var dotTemplate = doT.template($('#inviterListTemp').html());
                        var templateHtml = dotTemplate(json.obj);
                        $('#inviterList').append(templateHtml);
                    }
                } else {
                    tips(json.msg);
                }
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
    });
}
