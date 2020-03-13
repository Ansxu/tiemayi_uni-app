/*    /api/Money/UserBuyVIP  购买VIP套餐，购买VIP，并验证该用户是否能够进行VIP购买
UserId
Token
SetMealId 确认购买的套餐ID
    /api/Money/GetVIPList  获取VIP套餐数据列表。  get方式获取
*/

var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        //buyvip();
        getVipList(); //获取vip list列表数据
    }
    joinVIPHeight();
    //加入
    $('#btn-joinVIP').click(function() {
        $('html,body').css({
            "overflow": "hidden"
        });
        $('.selectSetMealPage').show();
    });
    //关闭选择套餐
    $('.allScreenPage .btn_back').click(function() {
        $(this).parents(".allScreenPage").hide();
        $('html,body').css({
            "overflow": "inherit"
        });
    });
    //选择套餐
    $('.setMealList').on("click", "li", function() {
        $(this).addClass("active").siblings("li").removeClass("active");
        var price = $(this).val();
        var str = "立即支付" + price + "金";
        $('#btn-pay').html(str);
        this.VipName = $(this).attr("name");
        this.VipPrice = $(this).val();

    });
    //付款
    $('#btn-pay').click(function() {
        var VipId = $(".active").attr("index");
        var VipPrice = $(".active").val();
        var VipName = $(".active").attr("name");
        var cntstr = "<p>您购买铁蚂蚁" + VipName + "套餐,<br/>需支付" + VipPrice + "金币</p>";
        if (!isNullOrEmpty(VipName) && !isNullOrEmpty(VipPrice)) {
            layer.open({
                title: [
                    '温馨提醒',
                    'background-color: #5c91f0; color:#fff;'
                ],
                content: cntstr,
                btn: ['确定', '取消'],
                yes: function(index) {
                    //确定执行的事件

                    layer.close(index);
                    buyvip(VipId);
                },
                cancel: function(index) {
                    //取消执行的事件
                    layer.close(index);
                }
            });
        } else {
            tips("请选择一个套餐类型");
        }
    });
}

function getVipList() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Money/GetVIPList",
        method: 'get',
    }, function(ret, err) {
        optionListResult(ret);
        loading_close();
    });
}

//绑定vip 种类数据
function optionListResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        //var arrraylist=JSON.stringify(json.obj);
        //console.log(arrraylist);//vip种类,list数组对象
        if (json.obj != null && json.obj.length > 0) {
            var dotTemplate = doT.template($('#gradeListTemp').html());
            var templateHtml = dotTemplate(json.obj);
            $('#vipselect').append(templateHtml);

            //vip部分，“收费方式”说明文本
            var dotTemplate2 = doT.template($('#gradeListTemp2').html());
            var templateHtml2 = dotTemplate2(json.obj);
            $('#vipitem').append(templateHtml2);

        } else {
            tips(json.msg);
        }
    }
}

function buyvip(mealId) {
    var Id = parseInt(mealId);
    loading();
    api.ajax({
        url: baseUrl + "/api/Money/UserBuyVIP",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                SetMealId: Id
            }
        }
    }, function(ret, err) {
        optionResult(ret);
        loading_close();
    });
}

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, '../../../html/user/member.html');
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function joinVIPHeight() {
    var screenHeight = $(window).innerHeight();
    var objOffsetTop = $('.joinVIP').offset().top;
    $('.joinVIP').css({
        "minHeight": screenHeight - objOffsetTop + 'px'
    });
}
