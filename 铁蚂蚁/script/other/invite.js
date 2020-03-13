var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {

        GetInviteInfo();
        //检查是否完成新手任务
    }

    $('#btnShare').click(function() {
        //分享操作
        var shareUrl = $("#ShareUrl").val();
        if (shareUrl != "") {

            var sharedModule = api.require('shareAction');
            sharedModule.share({
                text: '我在铁蚂蚁赚钱啦，快来一起赚钱吧！',
                type: 'url',
                path: shareUrl,
                arrowDirection: "any",
                thumbnail: "widget://icon//sharelogo.png"
            });
        }
    });
    $(".totalbox .box").click(function() {
        var index = $(this).index();
        api.openWin({
            name: 'mysubordinate',
            url: './mysubordinate.html',
            slidBackEnabled: false,
            pageParam: {
                clickval: index
            }
        });
    });
}
//复制邀请码
function CopyInviteCode() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#MyInvitationCode").text()
    }, function(ret, err) {
        if (ret) {
            tips("复制成功");
            //console.log(JSON.stringify(ret));
        } else {
            tips("复制失败");
            //console.log(JSON.stringify(err));
        }
    });
}
//获取签到信息
function GetInviteInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetMemberByInvite",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
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
            $("#MyInvitationCode").html(json.obj.MyInvitationCode);
            $("#CompletedTaskNum").html(json.obj.CompletedTaskNum);
            $("#PromotionSum").html(json.obj.PromotionSum);
            $("#RegisteredNum").html(json.obj.RegisteredNum + "人");
            $("#CertifiedNum").html(json.obj.CertifiedNum + "人");
            $("#RewardAmount").html(json.obj.RewardAmount);
            $("#ShareUrl").val(json.obj.ShareUrl);
            $("#promotionIncomeFee").html(json.obj.PromotionIncomeFee + "金");
            $("#promotionIncomeFeeTwo").html(json.obj.PromotionIncomeFeeTwo + "金");
            //console.log(JSON.stringify(json.obj));
            $("#promotionIncomeFeeThree").html(json.obj.PromotionIncomeFeeThree + "金");
            if (json.obj.IsInviteRole==0||json.obj.MyInvitationCode.indexOf("邀请码") != -1 )
                  $("#MyInvitationCode").attr("class", "c_Org");
            else $("#copyinvitebtn").show();
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}
