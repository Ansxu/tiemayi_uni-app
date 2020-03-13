 //使用微信端的接口
var uploadfor = {
    istrue: true,
    nowObj: null,
    getimage: function(obj, fn) {
        uploadfor.nowObj = obj;
        $(uploadfor.nowObj).on("change", function() {
            if (!uploadfor.istrue) {
                alert(uploadfor.istrue);
                toast.showDialog('图片正在上传中，请稍后...');
                return
            }
            toast.showloading("图片处理中..");
            if (fn) {
                fn();
            }
            clips.getimage($(uploadfor.nowObj))
        });
    },
    imgupload: function(base64, success, complete, before, error) {
            toast.showloading("上传中...");
            uploadfor.istrue = false;
            if (before) {
                before();
            }
            api.ajax({
                url: baseUrl + "/ajax/tools/uploader.aspx?type=image",
                method: 'post',
                data: {
                    values: {
                        base64Str: base64
                    }
                }
            }, function(ret, err) {
                var json = $.parseJSON(JSON.stringify(ret));
                //alert("err"+JSON.stringify(ret));
                if (json.isok) {
                    $("#useravatarImg").attr("src", baseUrl+json.obj);
                    $("#useravatarurl").val(json.obj);
                    $("#useravatar").show();
                    uploadfor.istrue = true;
                }
                toast.hideloading();

                //alert("err"+JSON.stringify(err));
                if (success) {
                    success(json);

                }
            });



            // $.ajax({
            //     type: 'post',
            //     data: base64,
            //     url: '/ajax/tools/uploader.aspx?type=image',
            //     success: function (msg) {
            //         var json = $.parseJSON(msg);
            //         $("input[data-name='" + $(uploadfor.nowObj).attr("data-for-inputname") + "']").val(json.Obj);
            //         $(uploadfor.nowObj).parent().css("background-image", "url('" + json.Obj + "')");
            //         $("input[data-type='uploader']").val("");
            //         if (success) {
            //             success(json);
            //         }
            //     },
            //     error: function () { toast.showDialog('图片上传失败，请确认你的图片大小和网络通畅'); if (error) { error() } },
            //     complete: function () {
            //         uploadfor.istrue = true;
            //         toast.hideloading();
            //         if (complete) { }
            //     }
            //
            // })
        }
        ///设置表单的值,id:用户上传图片或者自定义熟悉集合div的ID和用于保存图片的input name是一样的,jsonorstr,表示json保存还是str保存(见productedit.aspx)
        ,
    getdata: function(id, jsonorstr) {
            jsonorstr = jsonorstr == undefined ? "" : jsonorstr;
            var stype = jsonorstr.toLowerCase() == "json" ? {} : new Array();
            $("input[data-forid='" + id + "']").each(function() {
                var _this = $(this);
                if (_this.val().trim().length > 0)
                    if (Array.isArray(stype)) {
                        stype.push(_this.val());
                    } else {
                        var pop = _this.attr("data-name");
                        if (_this.attr("data-forval") != undefined && _this.attr("data-forval") != null && _this.attr("data-forval") != "") {
                            stype[pop] = [_this.attr("data-forval"), _this.val()];
                        } else {
                            stype[pop] = _this.val();
                        }
                    }
            });
            return Array.isArray(stype) ? stype.join(",") : JSON.stringify(stype);
        }
        ///把表单的值赋值到div里面的input去,用于用户上传图片或者自定义熟悉集合。data:数组或者对象
        ,
    setdata: function(id, data, isimg) {
        if (Array.isArray(data)) {
            for (var i = 0; i < data.length; i++) {
                var item = $("input[data-forid='" + id + "']")[i];
                $(item).val(data[i]);
                if (isimg && isimg == true) {
                    $(item).parent().css("background-image", "url('" + $(item).val() + "')");
                }
            }
        } else {
            $("input[data-forid='" + id + "']").each(function() {
                if (data.hasOwnProperty($(this).attr("data-name"))) {
                    var v = data[$(this).attr("data-name")];
                    if (Array.isArray(data[$(this).attr("data-name")])) {
                        v = v[1];
                    }
                    alert(v);
                    $(this).val(v);
                    if (isimg && isimg == true) {
                        $(this).parent().css("background-image", "url('" + $(this).val() + "')");
                    }
                }
            })
        };
    },
    setform: function(id, json) {
        for (var key in json) {
            if ($("#" + id + " [name='" + key + "']").length > 0) {
                var ipt = $("#" + id + " input[name='for_" + key + "']");
                if (ipt.length > 0 && (ipt.attr("type") == "checkbox" || ipt.attr("type") == "radio")) {
                    if (json[key] > 0) {
                        $("#" + id + " input[name='for_" + key + "']").prop("checked", true);
                    } else {
                        $("#" + id + " input[name='for_" + key + "']").prop("checked", false);
                    }
                }
                $("#" + id + " [name='" + key + "']").val(json[key]);
            }
        }
    }

}
