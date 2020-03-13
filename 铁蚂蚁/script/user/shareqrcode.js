userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        GetMemberInfo();
    }
    $(".mbimg").click(function() {
        $(".mbimg").find('img').removeClass('mbimg_hover');
        $(this).find('img').addClass('mbimg_hover');
        $(this).find('img').addClass('mbimg_tap');
        setTimeout(function() {
            $(".mbimg").find('img').removeClass('mbimg_tap');
        }, 300);
    });
    $("#gotoqr").click(function() {
        var mbnum = 0;
        mbnum = $(".mbimg_hover").data("num");
        if (mbnum) {
            api.openFrame({
                name: 'shareqrcode2',
                url: '../../html/user/shareqrcode2.html',
                slidBackEnabled: false,
                pageParam: {
                    imageNum: mbnum
                }
            });
        } else {
            tips('请选择模版');
        }
    });
}

//获取用户信息
function GetMemberInfo() {
    // loading();
    var getUrl = baseUrl + "/api/Login/GetMemberInfo?UserId=" + userId + "&Token=" + userToKen;
    api.ajax({
        url: getUrl,
        method: 'get',
        dataType: 'json',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                if (json.errcode == 0) {

                } else if (json.errcode == 2) {
                    tips(json.msg);
                    location.href = '../login/login.html';
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
        // loading_close();
    });

}
