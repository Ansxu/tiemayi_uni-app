var helpClassId = 0;
var helpClassName = "";
var searchContent = "";
var pageNo = 1;

apiready = function() {
    exit_app(2);
    helpClassId = api.pageParam.helpClassId;
    helpClassName = api.pageParam.helpClassName;
    $(".center").html(helpClassName);
    GetGradeList();
}

function GetGradeList() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Help/GetHelpList",
        method: 'POST',
        dataType: 'json',
        data: {
            values: {
                HelpClassId: helpClassId,
                Page: pageNo,
                PageSize: pageSize,
                SarchKeyword: searchContent
            }
        }
    }, function(ret, err) {
        if (ret) {
            optionResult(ret);
        } else {
            api.alert({
                msg: "系统繁忙，请稍后再试…"
            });
        };
        loading_close();
    });
}

//问题列表
function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        // console.log(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj.HelpClassList != null && json.obj.HelpClassList.length > 0) {
                var dotTemplate = doT.template($('#FAQUserTemp').html());
                var templateHtml = dotTemplate(json.obj.HelpClassList);
                $('.downlist').append(templateHtml);
            }

        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }

    //下拉加载更多
    api.addEventListener({
        name: 'scrolltobottom',
        extra: {
            threshold: 0 // 距离底部还有多少触发scrolltobottom事件
        }
    }, function(ret, err) {
        // 加载更多
        setTimeout(function() {
            pageNo++;
            GetGradeList();
        }, 200);
    });
}

function search() {
    searchContent = $(".input").val();
    $('.downlist').html("");
    GetGradeList();
}

function showContent(e) {
    $(e).toggleClass('active').siblings().removeClass('active');
    $(e).find('.dropdown-box').slideToggle();
    $(e).siblings().find('.dropdown-box').hide();
}
