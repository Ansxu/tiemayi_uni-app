var clips=
{
    nwidth: 600,
    nheight:600,
    clipArea: null,
    _islock:false, //防止执行多次
    init:function()
    {
        if ($("#clips").length == 0) {
            document.writeln("<div style='display:none' id='canvasarea'>");
            document.writeln("<canvas id=\"canvas\" data-for=\"uploaderInput\"></canvas>");
            document.writeln("</div>");
            document.writeln("<style>");
            document.writeln("#clips{ width:100vw; height:100vh;text-align: center;position:absolute; left:100vw; display:none;top:0;z-index:999; background-color:#fff; }");
            document.writeln("#clipArea{margin: 0px;	height: 100vh; }");
            document.writeln("</style>");
            document.writeln("<div id=\'clips\' ontouchstart=\'\'>");
            document.writeln("<div id=\'clipArea\'></div>");
            document.writeln("<div style=\'position:fixed;z-index:1000; bottom:10px; width:100%;\'>");
            document.writeln("<button id=\'cancelBtn\' class=\'weui-btn weui-btn_mini weui-btn_warn\'>取消</button>");
            document.writeln("<button id=\'clipBtn\' class=\'weui-btn weui-btn_mini weui-btn_primary\' style=\'margin-left:20%;\'>确定</button>");
            document.writeln("</div>");
            document.writeln("<script src=\'../../script/uploader/js/photoclip/iscroll_zoom.js\'></script>");
            document.writeln("<script src=\'../../script/uploader/js/photoclip/hammer.js\'></script>");
            document.writeln("<script src=\'../../script/uploader/js/photoclip/lrzallbundle.js\'></script>");
            document.writeln("<script src=\'../../script/uploader/js/photoclip/photoclipmin.js\'></script>");
            document.writeln("<script src=\'../../script/uploader/js/exif.js\'></script>");
        }
    },
    //w:长度 h:高度，
    //finishcallback:裁剪成功的操作
    //cancelcallback:取消按钮的炒作
    creatclip: function (w, h, finishcallback, cancelcallback, loadComplete)
    {
        var _this = this;
        this.nwidth = w;
        this.nheight = h;
        if (this.clipArea == null) {
            this.clipArea = new PhotoClip("#clipArea", {
                size: [w, h],
                outputSize: [w*2, h*2],
                outputQuality: 1,
                quality: 1,
                ok: "#clipBtn",
                loadStart: function () {
                },
                loadComplete: function () {
                    if (loadComplete) {
                        loadComplete();
                    }
                },
                clipFinish: function (dataURL) {
                    finishcallback(dataURL);
                    _this.compliteback();
                    $("#clips").animate({ left: "100vh" }, 300, function () { $("#clips").hide(); $("#clips").css("top", 0); $("body").css("overflow", ""); $("body").css("height", "auto;"); });
                }
            });
        }
        $("#cancelBtn").click(function () {
            $("#clips").animate({ left: "100vh" }, 300, function () { $("#clips").hide(); $("#clips").css("top", 0); $("body").css("overflow", ""); $("body").css("height", "auto;"); });
            _this.compliteback();
            cancelcallback();
        });

    },
    compliteback: function () {
        if (this.clipArea) {
            this._islock = false;
            var canvas = document.getElementById('canvas');
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }
    },

    //展示截图
    //urldata:url地址(不能跨域)或者base64，
    //显示截图效果后的操作
    showclip:function(urldata, loadcallback)
    {
        //alert(this.clipArea);
        if (this.clipArea == null) {
            alert('没有创建clipArea,初始化失败')
        }
        else {
            $("body").css("max-height", "100vh;");
            $("body").css("overflow", "hidden");
            this.clipArea.setImg(urldata);
            $("#clips").show();
            $("#clips").css("top", $(document).scrollTop());
            $("#clips").animate({ left: "0" }, 300, function () { });
            loadcallback();
        }
    },

    getimage: function (obj) {
        var _this = this;
        if (!_this._islock) {
            _this._islock = true;
            var fne = $(obj).prop("files")[0];
            var read = new FileReader();
            read.readAsDataURL(fne);
            read.onload = function () {
                var img = new Image();
                img.src = this.result;
                img.onload = function () {
                    var _orientation = 1;
                    //EXIF.getData(img, function () {
                    //    //var b1 = new Date().getTime();
                    //    EXIF.getAllTags(this);
                    //    var _orientation = EXIF.getTag(this, 'Orientation');
                    //    if (_orientation == undefined) {
                    //        _orientation = 1;
                    //    }
                    //});
                    _this.canvas(img, _orientation, obj);
                }
            }

        }
    },
    canvas: function (img, _rotate, names) {
        var _this = this;
        var newdata64;
        newdata64 = _this.forbasecanves(img, _rotate, 3)
        _this.showclip(newdata64, function () { });
    },
    basecanves: function (img, _rotate, names) {
        var newdata64 = forbasecanves(img, _rotate, 3);
        this.showclip(newdata64, function () { });

    },
    forbasecanves: function (img, _rotate,num) {
        //var b1 = new Date().getTime();
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        if (img.width > this.nwidth * num) {
            canvas.width = this.nwidth * num;
            canvas.height = (img.height / img.width) * this.nwidth * num;
        }
        else {
            canvas.width = img.width;
            canvas.height = img.height;
        }
        if (_rotate == 1 || _rotate == 3) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        else {
            if (_rotate = 6) {
                ctx.rotate(90 * Math.PI / 180);
                ctx.drawImage(img, 0, -((this.nheight * num > height ? height : this.nheight * num)));
            }
            if (_rotate = 8) {
                ctx.rotate(270 * Math.PI / 180);
                ctx.drawImage(img, -(this.nwidth * num > width ? width : this.nwidth * num), 0);
            }
        }
        var newdata64 = canvas.toDataURL("image/jpeg");
        //alert(new Date().getTime() - b1);
        return newdata64;
    }


}
clips.init();
