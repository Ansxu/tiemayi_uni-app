var toast = {
    init:function(){
        /*加载*/
        if ($("#loadingToast").length == 0) {
            $(document.body).append("<div id=\'loadingToast\' style=\'display:none;\'><div class=\'weui-mask_transparent\'></div><div class=\'weui-toast\'><i class=\'weui-loading weui-icon_toast\'></i><p class=\'weui-toast__content\'>加载中...</p></div></div>");
        }
        if ($("#toast").length == 0) {
            /*完成*/
            $(document.body).append("<div id=\'toast\' style=\'display: none;\'><div class=\'weui-mask_transparent\'></div><div class=\'weui-toast\'><i class=\'weui-icon-success-no-circle weui-icon_toast\'></i><p class=\'weui-toast__content\'>已完成</p></div></div>");
        }
        if ($("#jsIOS_dialog").length == 0) {
            /*提示*/
            $(document.body).append("<div class=\'js_dialog\' id=\'jsIOS_dialog\' style=\'display: none;\'><div class=\'weui-mask\'></div><div class=\'weui-dialog\'><div class=\'weui-dialog__bd\'>内容</div><div class=\'weui-dialog__ft\'></div></div></div>");
        }
        if ($("#jsARD_dialog").length == 0) {
            /*提示*/
            $(document.body).append("<div class=\"js_dialog\" id=\"jsARD_dialog\" style=\"display: none;\"><div class=\"weui-mask\"></div><div class=\"weui-dialog weui-skin_android\"><div class=\"weui-dialog__bd\">弹窗内容</div> <div class=\"weui-dialog__ft\"></div></div></div>");
        }

    },
    showloading: function (str, ms, fn) {
        this.init();
        if (str == null || str == "") {
            str = "加载中...";
        }
        $("#loadingToast p").html(str);
        $("#loadingToast").show();
        if (ms != null && ms > 0) {
            if (fn) {
                window.setTimeout(function () { toast.hideloading(); fn(); }, ms);
            }
            else {
                window.setTimeout(function () { toast.hideloading(); }, ms);
            }
        }
    },
    hideloading: function () {
        this.init();
        $("#loadingToast p").html("加载中...");
        $("#loadingToast").hide();
    },
    showDialog: function (str, fn, bt, bt2, fn2)
    {
        
        this.init();
        $("#jsIOS_dialog").hide();
        $("#jsIOS_dialog .weui-dialog__bd").html(str);
        $("#jsIOS_dialog").show();
        $("#jsIOS_dialog .weui-dialog__ft").html('');
        if (bt2) {
            $("#jsIOS_dialog .weui-dialog__ft").html("<a href=\"javascript:;\" class=\"weui-dialog__btn weui-dialog__btn_default\">" + bt2 + "</a>");
        }
        if (bt == null) { bt = "知道了"; }
        $("#jsIOS_dialog .weui-dialog__ft").append("<a  class=\'weui-dialog__btn weui-dialog__btn_primary\'>" + bt + "</a>");
        $("#jsIOS_dialog .weui-dialog__ft a").off("click");
        if (fn) {
            $("#jsIOS_dialog .weui-dialog__btn_primary").click(function () {
                toast.hideDialog();
                fn();
            });
        }
        else {
            $("#jsIOS_dialog .weui-dialog__btn_primary").click(function () {
                toast.hideDialog();
            });
        }

        if (fn2) {
            $("#jsIOS_dialog .weui-dialog__btn_default").click(function () {
                toast.hideDialog();
                fn2();
            });
        }
        else{
            $("#jsIOS_dialog .weui-dialog__btn_default").click(function () {
                toast.hideDialog();
            });
        }
    },
    //安卓提示
    showDialogARD: function (str, bt, fn, bt2, fn2) {
        this.init();
        $("#jsARD_dialog").hide();
        $("#jsARD_dialog .weui-dialog__bd").html(str);
        $("#jsARD_dialog").show();
        $("#jsARD_dialog .weui-dialog__ft").html("<a href=\"javascript:;\" class=\"weui-dialog__btn weui-dialog__btn_default\">" + bt2 + "</a><a  class=\'weui-dialog__btn weui-dialog__btn_primary\'>" + bt + "</a>");
        $("#jsARD_dialog .weui-dialog__ft a").off("click");
        if (fn) {
            $("#jsARD_dialog .weui-dialog__btn_primary").click(function () {
                toast.hideDialog();
                fn();
            });
        }
        else {
            $("#jsARD_dialog .weui-dialog__btn_primary").click(function () {
                toast.hideDialog();
            });
        }
        if (fn2) {
            $("#jsARD_dialog .weui-dialog__btn_default").click(function () {
                toast.hideDialog();
                fn2();
            });
        }
        else {
            $("#jsARD_dialog .weui-dialog__btn_default").click(function () {
                toast.hideDialog();
            });
        }
    },


    hideDialog: function () {
        this.init();
        $('#jsIOS_dialog').hide();
        $('#jsARD_dialog').hide();
    },
    showtoast: function (str, ms, fn) {
        this.init();
        if (str == null || str == "") {
            str = "已完成";
        }
        $("#toast p").html(str);
        $("#toast").show();
        if (ms != null && ms > 0) {
            if (fn) {
                window.setTimeout(function () { toast.hidetoast(); fn(); }, ms);
            }
            else {
                window.setTimeout(function () { toast.hidetoast(); }, ms);
            }
        }
    },
    hidetoast: function () {
        this.init();
        $("#toast p").html("已完成");
        $("#toast").hide();
    }
}