var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');
var accountId = 0;

apiready = function() {
    exit_app(0);
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        accountId = isNullOrEmpty(api.pageParam.accountId) ? 0 : api.pageParam.accountId;
        if (accountId > 0)
            getBindInfo();
    }
}

//提交图片
$('.btn-submit').click(function() {
    var userAccount = $("#mlsName").val(); // 平台用户名
    var shouhuoren = $("#shouhuoren").val(); //收货人
    var lianxidianhua = $("#lianxidianhua").val(); //联系电话
    var shengfen = $("#provinceCode").val(); //省份
    var shiqu = $("#cityCode").val(); //市区
    var quxian = $("#districtCode").val(); //区县
    var xiangxidizhi = $("#xiangxidizhi").val(); //详细地址
    var zhanghujietuImg = $("#pic0").val(); //蘑菇街账户截图base64

    if (!isNullOrEmpty(userAccount) && !isNullOrEmpty(shouhuoren) && !isNullOrEmpty(lianxidianhua) && !isNullOrEmpty(shengfen) && !isNullOrEmpty(shiqu) && !isNullOrEmpty(quxian) && !isNullOrEmpty(xiangxidizhi) && !isNullOrEmpty(zhanghujietuImg)) {
        loading();
        api.ajax({
            url: baseUrl + "/api/Member/BindOnAccount",
            method: 'post',
            data: {
                values: {
                    UserId: userId,
                    Token: userToKen,
                    PlatId: 6, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                    AccountId: accountId,
                    PlatAccount: userAccount, //平台账号√
                    ConsigneeName: shouhuoren, //收货人√
                    ConsigneeCall: lianxidianhua, //联系电话√
                    ProvinceCode: shengfen, //省份code √
                    CityCode: shiqu, //市区code √
                    DistrictCode: quxian, //区县code √
                    Address: xiangxidizhi, //详细地址 √

                    UserInfoImg: zhanghujietuImg, //美丽说账户截图图片base64  √


                }
            }
        }, function(ret, err) {
            optionResult(ret);
            loading_close();
        });
    } else {
        tips("信息不全，请补充完整再提交");
    }
});

function optionResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, "bindinfo.html");
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


function picker3() {
    var nowValue = document.getElementById('area');
    new Picker({
        "title": '地区选择', //标题(可选)
        "defaultValue": nowValue.value, //默认值-多个以空格分开（可选）
        "data": cityData, //数据(必传)
        "keys": {
            "id": "Code",
            "value": "Name",
            "childData": "level" //最多3级联动
        }, //数组内的键名称(必传，id、text、data)
        "callBack": function(val) {
            api.ajax({
                url: baseUrl + "/api/Area/AreaByCode",
                method: 'post',
                data: {
                    values: {
                        AreaText: val
                    }
                }
            }, function(ret, err) {
                if (!isNullOrEmpty(JSON.stringify(ret))) {
                    var json = $.parseJSON(JSON.stringify(ret));
                    if (json.errcode == 0) {
                        $("#provinceCode").val(json.obj.provinceCode);
                        $("#cityCode").val(json.obj.cityCode);
                        $("#districtCode").val(json.obj.districtCode);
                    }
                } else {
                    alert("服务器走神了，请重试");
                }
            });
            //回调函数（val为选择的值）
            nowValue.value = val;
        }
    });
}

function getBindInfo() {
    api.ajax({
        url: baseUrl + "/api/Member/LoadMemberAccountInfo",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                PlatId: 6, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                AccountId: accountId
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#mlsName").val(json.obj.PlatAccount);
                $("#shouhuoren").val(json.obj.ConsigneeName);
                $("#lianxidianhua").val(json.obj.ConsigneeCall);
            } else if (json.errcode == 2) {
                tips("登陆失败，请重新登陆");
                location.href = '../login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            alert("服务器走神了，请重试");
        }
    });
}
