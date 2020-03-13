var commform = {
    //上传图片,obj是对象,fn：图片上传成功后的执行的函数，before:图片上传前执行的函数
    uploadimg_min: function (obj, fn, before) {
        var _this = this;
        var read = new FileReader();
        read.readAsDataURL(obj.files[0]);
        read.onload = function () {
            var img = new Image();
            var rs = this.result;
            img.src = rs;
            img.onload = function () {
                if (before) {
                    before(img);
                }
                $(obj).parent().parent().css("background-image", "url('" + rs + "')");
                $(obj).parent().hide();
                $.ajax({
                    type: 'post',
                    data: rs,
                    url: '/upload/base64upload.aspx?type=image',
                    success: function (msg) {
                        var json = $.parseJSON(msg);
                        $(obj).parent().prev().val(json.Obj);
                        $(obj).parent().next().css("display", "block");
                        $(obj).parent().next().on("click", function () { _this.delloadimg_min($(obj).parent().next()) });
                        if (fn) { fn(json.Obj); }
                    },
                    error: function () {
                        $.use("/js/toast.js", function () {
                            toast.showDialog("网络异常");
                        });
                    },
                });
            }
        }
    }
    ///删除对象的图片
    , delloadimg_min: function (obj) {
        $(obj).parent().css("background-image", "url('/images/nopicture.jpg')");
        $(obj).prev().find("input[type='file']").val("");
        $(obj).prev().show();
        $(obj).prev().prev().val("");
        $(obj).hide();
    }
    ///加载图片,id:用户用户加载div的ID,arr:用于保存图片的地址的数组,fn:加载成功后，执行的函数
    , loadpic: function (id, arr, fn,ist)
        {
            arr = Array.isArray(arr) ? arr : new Array("/images/nopicture.jpg");
            arr.forEach(function (v) {
                var data = { pic: ((v == null || v == "") ? "/images/nopicture.jpg" : v), id: id, isshow: (v == null || v == "" || v == "/images/nopicture.jpg") ? true : false };
                $.load("/html/imgupload_min.html", function (d) {
                    $("#" + id).append($.tpl(d, data));
                    $(".ddlev-delete-icon").on("click", function () { var t = this; $.use("/js/commform.js", function () { commform.delloadimg_min(t); }); })
                    if (fn) { fn()}
                }, "html");
            });
    }
    ///设置表单的值,id:用户上传图片或者自定义熟悉集合div的ID和用于保存图片的input name是一样的,jsonorstr,表示json保存还是str保存(见productedit.aspx)
    , getdata: function (id, jsonorstr) {
        jsonorstr= jsonorstr==undefined ? "" : jsonorstr;
        var stype = jsonorstr.toLowerCase() == "json" ? {} : new Array();
        $("input[data-forid='" + id + "']").each(function () {
            var _this = $(this);
            if (_this.val().trim().length > 0)
                if (Array.isArray(stype)) {
                    stype.push(_this.val());
                }
                else {
                    var pop = _this.attr("data-name");
                    stype[pop]= _this.val();
                }
        });
        return Array.isArray(stype) ? stype.join(",") : JSON.stringify(stype);
    }
    ///把表单的值赋值到div里面的input去,用于用户上传图片或者自定义熟悉集合。data:数组或者对象
    , setdata: function (id, data) {
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) { $($("input[data-forid='" + id + "']")[i]).val(data[i]); }
        }
        else {
            $("input[data-forid='" + id + "']").each(function () {
                if (data.hasOwnProperty($(this).attr("data-name"))) { $(this).val(data[$(this).attr("data-name")]) }
            })
        };
    }
    , required: function (formid) {
        if ($("#required_errtext").length == 0) {
            var sr = "<div id='required_errtext' style='background-color: #fff;line-height:30px;position: absolute;z-index: 100000000;top: 50%;left: 50%;border: 1px solid #ddd;padding: 10px 15px;border-radius: 4px; display:none;'> <i style='font-size: 30px;color: #ff0000;float: left; margin-right:10px;font-style:normal;'>×</i><span style='float: left;line-height: 30px;'>{{=msg}}</span></div>";
            $(document.body).append(sr);
        }
        var isok = true;
        $("#" + formid + " [data-required]").each(function () {
            var _this = $(this);
            if (_this.attr("data-required") != undefined && _this.attr("data-required") != "") {
                var sp = _this.attr("data-required").split("|");
                for (var i = 0; i < sp.length; i++) {
                    if (sp[i] != "") {
                        var fn = eval("comm.check" + sp[i]);
                        var ret = { msg: "" };
                        var rs = fn(_this.val(), ret);
                        if (!rs) {
                            isok = false;
                            _this.focus();
                            $("#required_errtext span").html(ret["msg"]);
                            $("#required_errtext").css("margin-top", -($("#required_errtext").height() / 2) + ".px");
                            $("#required_errtext").css("margin-left", -($("#required_errtext").width() / 2) + ".px");
                            $("#required_errtext").css("left",($(window).width()-$("#required_errtext").width())/2);
                            $("#required_errtext").show();
                            window.setTimeout(function () { $("#required_errtext").hide(50); }, 3000);
                            return rs;
                        }
                    }
                }
            }
        })
        return isok;
    }
}