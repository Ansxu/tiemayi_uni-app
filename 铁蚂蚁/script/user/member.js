var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var IsAddressBook = $api.getStorage('IsAddressBook');

apiready = function() {
    exit_app(1);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../login/login.html';
    } else {
        GetMemberInfo();
        //检查是否完成新手任务
        IsCompleteNoviceTask2();
        //检查是否获取了用户通讯录
        if (IsAddressBook == null || IsAddressBook == "false" || IsAddressBook == "undefined") {
            TipsGetAddressBook();
        }
    }
    // api.getCacheSize(function(ret, err) {
    //     //size:        //缓存大小，单位为Byte，数字类型。（-1：无存储设备、-2：正在准备USB存储设备、-3：无法访问存储设备）
    //     var size = (ret.size / 1024 / 1024).toFixed(2) + 'M';
    //     var cacheSize = $api.byId('cacheSize');
    //     cacheSize.innerHTML = size;
    // });

    //退出登录
    $('.btn-loginOut').click(function() {
        layer.open({
            title: [
                '系统提示',
                'background-color:#5c91f0; color:#fff;'
            ],
            content: '<p class="layui-suremMsg">确定退出么</p>',
            btn: ['确认', '取消'],
            yes: function(index) {
                // $api.rmStorage('userId');
                // $api.rmStorage('userToKen');
                var userName = $api.getStorage("userAccountName");
                var userpassword = $api.getStorage("userPassword");
                $api.clearStorage();
                $api.setStorage("userAccountName", userName);
                $api.setStorage("userPassword", userpassword);
                layer.close(index);
                location.href = '../login/login.html';
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
            optionResult(ret);
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
        // loading_close();
    });
}


function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            var Avatar = json.obj.Avatar;
            var MemberID = json.obj.MemberID;
            var NickName = json.obj.NickName;
            var Mobile = json.obj.Mobile;
            var MobileStr = json.obj.MobileStr;
            var Amount = json.obj.Amount;
            var Wallet = json.obj.Wallet;
            var Level = json.obj.Level;
            var OrderUndone = json.obj.OrderUndone;
            var OrderCompleted = json.obj.OrderCompleted;
            var OrderRevoked = json.obj.OrderRevoked;
            var OrderAppeal = json.obj.OrderAppeal;
            var IsVip = json.obj.IsVip;
            var IsInviteRole = json.obj.IsInviteRole;
            var ReferralCode = json.obj.ReferralCode;
            var isAdvanceRange = isNullOrEmpty(json.obj.IsAdvanceRange) ? 0 : json.obj.IsAdvanceRange;
            if (!isNullOrEmpty(Avatar)) {
                $("#Avatar").attr("src", Avatar);
                $api.setStorage('userAvatar', Avatar);
            } else {
                $api.setStorage('userAvatar', "../../image/tx/tx_pic.png");
            }
            if (IsInviteRole==0)   $("#shareqrcode").hide();
            $api.setStorage('isAdvanceRange', isAdvanceRange);
            $("#UserId").html("ID：" + MemberID);
            $("#UserName").html("用户名：" + NickName);
            $("#UserGrade").html("等级：" + Level);
            $("#UserAmount").html(Amount);
            $("#UserWallet").html(Wallet);
            $("#OrderUndone").html(OrderUndone);
            $("#OrderCompleted").html(OrderCompleted);
            $("#OrderRevoked").html(OrderRevoked);
            $("#OrderAppeal").html(OrderAppeal);
            $("#UserReferralCode").html("邀请码：" + ReferralCode);
            //if (IsVip == 1) {
                //$("#isvipTime").show();
                //$("#isvipTime").html("VIP有效期：" + json.obj.VIPValidityPeriod);
            //}
            if (json.obj.IsAddressBook == 0)
                TipsGetAddressBook();
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);
            //location.href = '../login/login.html';
        }
    } else {
        tips("服务器走神了，请重试");
    }
}


//检查是否完成新手任务
function IsCompleteNoviceTask2() {
    api.ajax({
        url: baseUrl + "/api/Member/IsCompleteNoviceTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        optionTaskResult(ret);
    });
}


function optionTaskResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj) {
                $api.setStorage('IsCompleteNoviceTaskFlag', "true");
            } else {
                //未完成
                $api.setStorage('IsCompleteNoviceTaskFlag', "false");
            }
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function TipsGetAddressBook() {
    //获取用户通讯录
    layer.open({
        title: '通讯录授权',
        content: '<p class="layui-suremMsg">使用APP必须授权获取手机通讯录信息，若禁止授权将无法正确使用APP</p>',
      btn: ['确认'],
        yes: function(index) {
            layer.close(index);
            Getcontacts();
        }
    });
}

//获取用户通讯录
function Getcontacts() {
    var systemType = api.systemType;
    var systemVersion = api.systemVersion;
    systemVersion = systemVersion.split(".", 1);
    //判断版本号 ios9.0 使用allContacts方法
    var contacts = api.require('contacts');
    contacts.queryByPage({
            count: 2000,
            pageIndex: 0
        },
        function(ret, err) {
            if (ret.status) {
                var json = $.parseJSON(JSON.stringify(ret));
                var addressbook = JSON.stringify(json.contacts);
                if (addressbook == "" || addressbook == null) {
                    tips("请授权获取通讯录信息");
                    location.href = 'oauth.html';
                    //return false;
                } else {
                    //保存通讯录到
                    SaveAddressBook(addressbook);
                }
            } else {
                if (err.code == -1)
                    tips("你已拒绝访问通讯录信息，请在设置中设置为允许");
                else
                    tips(JSON.stringify(err));
                location.href = 'oauth.html';
            }
        });
}


//保存通讯录信息到服务器
function SaveAddressBook(addressbookStr) {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/SaveMemberAddressBook",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                AddressBookJson: addressbookStr
            }
        }
    }, function(ret, err) {
        SaveAddressBookResult(ret);
        loading_close();
    });
}

function SaveAddressBookResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            $api.setStorage('IsAddressBook', true);
            //tips("保存成功");
        } else if (json.errcode == 5) {
            tips("通讯录数据为空");
            location.href = 'oauth.html';
        } else if (json.errcode == 2) {
            tips("登陆失败，请重新登陆");
            location.href = '../login/login.html';
        } else {
            tips(json.msg);

        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function clearnCach() {
    api.clearCache(function() {
        api.toast({
            msg: '清除完成'
        });
    });
    api.getCacheSize(function(ret, err) {
        var size = (ret.size / 1024 / 1024).toFixed(2) + 'M';
        var cacheSize = $api.byId('cacheSize');
        cacheSize.innerHTML = size;
    });
}
