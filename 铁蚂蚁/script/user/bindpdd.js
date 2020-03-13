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

    //提交图片
    $('.btn-submit').click(function() {
        var userAccount = $("#pddName").val(); // 平台用户名
        if (isNullOrEmpty(userAccount)) {
            tips("必须填写平台的账号");
            return false;
        }
        var shouhuoren = $("#shouhuoren").val(); //收货人
        if (isNullOrEmpty(shouhuoren)) {
            tips("必须填写收货人");
            return false;
        }
        var lianxidianhua = $("#lianxidianhua").val(); //联系电话
        if (!telePhone(lianxidianhua)) {
            return false;
        }
        var shengfen = $("#provinceCode").val(); //省份
        if (isNullOrEmpty(shengfen)) {
            tips("必须选择省市区");
            return false;
        }
        var shiqu = $("#cityCode").val(); //市区
        var quxian = $("#districtCode").val(); //区县
        var xiangxidizhi = $("#xiangxidizhi").val(); //详细地址
        if (isNullOrEmpty(xiangxidizhi)) {
            tips("必须填写收货详细地址");
            return false;
        }
        var nannv = $("#sexId option:selected").text(); //男女性别
        if ($("#sexId option:selected").val() <= 0) {
            tips("必须选择性别");
            return false;
        }
        var nianling = $("#nianling").val(); //年龄
        if (isNullOrEmpty(nianling)) {
            tips("必须填写年龄");
            return false;
        }
        var reg = /^[0-9]\d*$/;
        if (!reg.test(nianling)) {
            tips("请输入正确的年龄数值");
            return false;
        }
        var orderNuber = $("#orderNumber").val(); //订单号
        if (isNullOrEmpty(orderNuber)) {
            tips("必须填写一个交易订单号");
            return false;
        }
        var zhanghujietuImg = $("#pic0").val(); //账户截图base64
        if (isNullOrEmpty(zhanghujietuImg)) {
            tips("必须上传账户截图");
            return false;
        }
        var orderCheckImg = $("#pic1").val(); //订单验证截图base64
        if (isNullOrEmpty(orderCheckImg)) {
            tips("必须上传订单验证截图");
            return false;
        }
        loading();
        api.ajax({
            url: baseUrl + "/api/Member/BindOnAccount",
            method: 'post',
            data: {
                values: {
                    UserId: userId,
                    Token: userToKen,
                    PlatId: 5, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                    AccountId: accountId,
                    PlatAccount: userAccount, //平台账号√
                    ConsigneeName: shouhuoren, //收货人√
                    ConsigneeCall: lianxidianhua, //联系电话√
                    ProvinceCode: shengfen, //省份code √
                    CityCode: shiqu, //市区code √
                    DistrictCode: quxian, //区县code √
                    Address: xiangxidizhi, //详细地址 √
                    Gender: nannv, //男女性别 √
                    Age: nianling, //年龄 √

                    OrderNo: orderNuber, //订单号 √ 可为空
                    //TODO: 这里还有待商榷，拼多多这里传哪个字段给服务器
                    UserCenterImg: zhanghujietuImg, //拼多多账户截图图片base64  √
                    CreditRatingImg: orderCheckImg, //订单验证截图图片base64 √
                }
            }
        }, function(ret, err) {
            optionResult(ret);
            loading_close();
        });
    });
}

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
                PlatId: 5, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                AccountId: accountId
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#pddName").val(json.obj.PlatAccount);
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
