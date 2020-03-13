var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var userAvatar = $api.getStorage('userAvatar');
var modify = false;

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    }
    //加载头像
    if (userAvatar != "") {
        $('#useravatarImg').attr("src", userAvatar);
    } else {
        $('#useravatarImg').attr("src", "../../image/nav/account_nav1_1.png");
    }


    //保存图片
    $('.btn-submit').click(function() {
        if (modify) {
            //有修改 提交保存
            var base64dataURL = $("#useravatarurl").val();
            if (base64dataURL != "") {
                loading();
                api.ajax({
                    url: baseUrl + "/api/Member/EditHeadImage",
                    method: 'post',
                    data: {
                        values: {
                            UserId: userId,
                            Token: userToKen,
                            Avatar: base64dataURL
                        }
                    }
                }, function(ret, err) {
                    optionResult(ret);
                    loading_close();
                });
            } else {
                tips("请选择图片");
            }

        } else {
            location.href = 'accountinfo.html';
        }
    });

}


function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, "accountinfo.html");
        } else {
            tips(json.msg);
            location.href = 'accountinfo.html';
        }
    } else {
        tips("服务器走神了，请重试");
    }
    loading_close();
}

function getimage(obj) {
    uploadfor.getimage(obj);
}

clips.creatclip(300, 300,
    function(dataURL) {
        modify = true;
        $("#useravatarImg").attr("src", dataURL);
        $("#useravatarurl").val(dataURL);
        //uploadfor.imgupload(dataURL);
    },
    function() {
        $("input[data-type='uploader']").val("");
    },
    function() {
        toast.hideloading()
    }
)
