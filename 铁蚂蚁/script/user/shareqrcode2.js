userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        GetMemberInfo();
    }

    $(".createqr").click(function() {
        html2canvas(document.getElementsByClassName("hahahaha"), {
            allowTaint: true,
            taintTest: false,
            onrendered: function(canvas) {
                canvas.id = "mycanvas";
                var dataUrl = canvas.toDataURL('image/png');
                if (isNullOrEmpty(dataUrl))
                    alert("dataUrl是空值");
                dataUrl = dataUrl.replace('data:image/png;base64,', '');
                // var dataUrl = canvas.toDataURL();
                //dataUrl=dataUrl.substring(dataUrl.lastIndexOf(",") + 1, dataUrl.length);
                var trans = api.require('trans');
                trans.saveImage({
                    base64Str: dataUrl,
                    imgPath: "fs://img/",
                    imgName: "tuiguangmb" + api.pageParam.imageNum + ".png",
                    album: true
                }, function(ret, err) {
                    if (ret.status) {
                        tips("图片保存成功");
                        location.href = '../../html/user/shareqrcode.html';
                    } else {
                        tips("图片保存失败");
                    }
                });
            }
        });
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
                    var referralCode = json.obj.ReferralCode;
                    GetUserQRcode(referralCode);
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

function GetUserQRcode(referralCode) {
    if (api.pageParam.imageNum != 100)
        $(".hahahaha").append('<img src="../../image/of/moban' + api.pageParam.imageNum + '.jpg" style="width:100%;" />');

    loading();
    var getUrl = website + '/ajax/tools/qrcode.ashx?chl=' + website + '/invite/register.html?rCode=' + referralCode;
    api.ajax({
        url: getUrl,
        method: 'get',
        dataType: 'text',
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(ret)) {
                $(".qrcode").append('<img src="data:image/png;base64,' + ret + '" />');

            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
         loading_close();
    });

    $(".qrcode").addClass("qrcode" + api.pageParam.imageNum);
}
