!function () {
    var iswxa = false;
    var wxasdk = 10;
    try {
        wx.ready(function () {
            iswxa = window.__wxjs_environment == 'miniprogram' ? true : false;
            if (iswxa) {
                wx.getSystemInfo({ success: function (res) { wxasdk = parseInt(res.SDKVersion.replace(".", "")) } });//获取版本号
                if (wxasdk < 164) {
                    //提示不支持 web-view
                }
            }
        })
    }
    catch (ex) {
        iswxa = false;
    }
    function clips(code, width, height) {
        if (iswxa) {
            setInterval("getimgs(" + code + ")", 1000);
            wx.miniProgram.navigateTo({ url: "../clip/clip?code=" + code + "&width=" + width + "&height=" + height });
        } else {
            document.writeln("<script src=\'/m/static/js/uploader/js/clips.js\'></script>");
        }
    };
    //获取图片
    function getimgs(uniquecode) {
        $.ajax({
            type: 'post',
            data: "utoken=" + uniquecode,
            url: '/upload/base64upload.aspx?method=GetH5WxaImgUpload',
            success: function (msg) {
                var json = $.parseJSON(msg);
                console.log(json);
                if (json.Code && json.Obj) {
                    $("input[data-name=" + uniquecode + "] ").parant().css("background-image",json.Obj);
                }

            },
            error: function () {  if (error) { error() } },
            complete: function () {
                if (complete) { }
            }

        })
    }
    window.clips = clips;
}($)
