//bindIdCard.js
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
        //GetBindInfo();
        ///api/Area/GetAreaList
        // GetAreaList();
        GetShoppingCategory(); //获取账号绑定时的所有购物类目
    }
    //提交图片
    $('.btn-submit').click(function() {
        var userAccount = $("#taobaoName").val(); // 平台用户名
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
        var shiqu = $("#cityCode").val(); //市区
        var quxian = $("#districtCode").val(); //区县
        if (isNullOrEmpty(shengfen)) {
            tips("必须选择省市区");
            return false;
        }
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
        var xinyongdengji = $("#xydj option:selected").val(); //信用等级
        if (xinyongdengji <= 0) {
            tips("必须选择信用等级");
            return false;
        }
        var taoqizhi = $("#taoqizhi option:selected").text(); //淘气值
        if ($("#taoqizhi option:selected").val() <= 0) {
            tips("必须选择淘气值");
            return false;
        }
        var gouwuleimu = $("#shoppingCategoryIdArray").val(); //购物类目
        if (isNullOrEmpty(gouwuleimu)) {
            tips("必须选择购物类目");
            return false;
        }
        var xinyudengjiImg = $("#pic0").val(); //信誉等级图片base64
        if (isNullOrEmpty(xinyudengjiImg)) {
            tips("必须上传信誉等级截图");
            return false;
        }
        var taoqizhiImg = $("#pic1").val(); //淘气值图片base64
        if (isNullOrEmpty(taoqizhiImg)) {
            tips("必须上传淘气值截图");
            return false;
        }
        var shimingrenzhengImg = $("#pic2").val(); //实名认证图片base64
        if (isNullOrEmpty(shimingrenzhengImg)) {
            tips("必须上传实名认证截图");
            return false;
        }
        var huabeiIMg = $("#pic3").val(); //花呗图片base64
        loading();
        api.ajax({
            url: baseUrl + "/api/Member/BindOnAccount",
            method: 'post',
            data: {
                values: {
                    UserId: userId,
                    Token: userToKen,
                    PlatId: 1, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
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
                    CreditRating: xinyongdengji, //信用等级 √ 可为空
                    TaobaoValue: taoqizhi, //淘气值 √
                    ConsumerCategoryList: gouwuleimu, //购物类目 √ //购物类目Id集合字符串(例：”1,2,3”)，最多选择3个
                    CreditRatingImg: xinyudengjiImg, //信誉等级图片base64  √
                    TaobaoValueImg: taoqizhiImg, //淘气值图片base64 √
                    VerifiedImg: shimingrenzhengImg, //实名认证图片base64 √
                    BorrowingImg: huabeiIMg //花呗图片base64 √
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

function GetShoppingCategory() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetALLShoppingCategory",
        method: 'get',
    }, function(ret, err) {
        optionShoppingCategoryResult(ret); //处理获取到的数据
        loading_close();
    });
}

function optionShoppingCategoryResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            var dotTemplate = doT.template($('#shopingCategoryListTemp').html());
            var templateHtml = dotTemplate(json.obj);
            $('#shoppingcategory').append(templateHtml);
            // for(item in json.obj){
            //     // console.log("++++++++++"+item+"++++++++");
            //     // console.log(json.obj[item].Id);
            //     // console.log(json.obj[item].Name);
            //     // console.log("+++++++++++++++++++++++");
            // //     var dotTemplate = doT.template($('#shopingCategoryListTemp').html());
            // //      var templateHtml = dotTemplate(json.obj[item]);
            // //    $('#shoppingcategory').append(templateHtml);
            // }
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function getBindInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/LoadMemberAccountInfo",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                PlatId: 1, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                AccountId: accountId
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                $("#taobaoName").val(json.obj.PlatAccount);
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
        loading_close();
    });
}
