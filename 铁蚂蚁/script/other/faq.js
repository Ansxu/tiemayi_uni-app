apiready = function() {
    exit_app(0);
    GetGradeList();
}

function GetGradeList() {
    var getUrl = baseUrl + "/api/Help/GetAllHelpClass";
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

    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj.HelpClassList != null && json.obj.HelpClassList.length > 0) {
                var dotTemplate = doT.template($('#FAQListTemp').html());
                var templateHtml = dotTemplate(json.obj.HelpClassList);
                $('.li50').append(templateHtml);
            }
            var qqurl = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + json.obj.ConsultationQQ + "&card_type=group&source=qrcode";
            $(".qqbtn").attr('href', qqurl);
        } else {
            tips(json.msg);
        }
        //遍历加监听获取当前点击messageId,并缓存
        var len = $(".li50 li").length;
        for (var i = 0; i < len; i++) {
            $(".li50 li").eq(i).click(function(e) {
                var helpClassId = $(this).find("div").text();
                var helpClassName = $(this).find("p").text();
                api.openWin({
                    name: 'faqdetail',
                    url: './faqdetail.html',
                    pageParam: {
                        helpClassId: helpClassId,
                        helpClassName: helpClassName
                    }
                });
            })
        };
    } else {
        tips("服务器走神了，请重试");
    }
}
