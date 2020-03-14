//TODO:银行卡后台没有显示“已绑定”
var userId = $api.getStorage('userId');
var userToKen = $api.getStorage('userToKen');

apiready = function() {
    exit_app(0);
    getSysConfig();
    getBank();
    if (isNullOrEmpty(userId) || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        GetBindBankInfo(); //   文档位置：4.9.1
        ///api/Area/GetAreaList
        // GetAreaList();
    }
    //提交图片
    $('.btn-submit').click(function() {
        var BankCardName1 = $("#BankCardName").val(); //持卡人姓名
        var BankAddress1 = $("#BankAddress").val(); //开卡行地址
        var BankCardNo1 = $("#BankCardNo").val(); //卡号
        var BankName1 = $("#BankName").val(); // 银行名称
        var provinceCode1 = $("#provinceCode").val(); // 省
        var cityCode1 = $("#cityCode").val(); // 市
        var districtCode1 = $("#districtCode").val(); // 区

        if (!isNullOrEmpty(BankCardName1) && !isNullOrEmpty(BankAddress1) &&
        !isNullOrEmpty(BankCardNo1) && !isNullOrEmpty(BankName1)&& !isNullOrEmpty(provinceCode1)
        && !isNullOrEmpty(cityCode1)&& !isNullOrEmpty(districtCode1)) {
            loading();
            api.ajax({
                //TODO: 添加银行卡接口有问题，提示银行卡已经绑定，并且认证通过
                url: baseUrl + "/api/Member/BindUserBank", ///api/Member/BindUserBank
                method: 'post',
                data: {
                    values: {
                        UserId: userId,
                        Token: userToKen,
                        ProvinceCode: provinceCode1,
                        CityCode: cityCode1,
                        DistrictCode: districtCode1,
                        BankCardName: BankCardName1, //持卡人姓名
                        BankAddress: BankAddress1, //开卡行银行地址 ; 深圳龙华建设银行支行
                        BankCardNo: BankCardNo1, //银行卡号
                        BankName: BankName1, //银行名称； 建设银行，农业银行 ....
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

function getBank() {
  api.ajax({
      url: baseUrl + "/api/Help/GetAllBank",
      method: 'get',
      dataType: 'json'
  }, function(ret, err) {
      if (ret) {
          if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            var dotTemplate = doT.template($('#bankListTemp').html());
            var templateHtml = dotTemplate(json.obj.BankList);
            $('#banklist').append(templateHtml);
          } else {
              tips("服务器走神了，请重试");
          }
      } else {
          api.alert({
              msg: JSON.stringify(err)
          });
      };
  });
}

function GetBindBankInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Member/GetUserBankInfo",
        method: 'post',
        data: {
            values: {
                UserId: userId,
                Token: userToKen
            }
        }
    }, function(ret, err) {
        optionBindResult(ret);
        loading_close();
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

function optionBindResult(ret) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            if (json.obj.IsAUT != 1) {
                //显示返回按钮
                tips("不能绑定银行卡，身份证未绑定或认证失败");
                location.href = 'bindinfo.html';
            } //如果已经认证了，则禁止一些input标签
            else if (json.obj.IsAUT == 1) {
                var BankCardName = json.obj.BankCardName; //绑定的银行卡用户名
                var BankCardNo = json.obj.BankCardNo; //银行卡卡号
                var BankName = json.obj.BankName; //银行卡对应的银行名称
                var BankProvince = json.obj.BankProvince; //银行所属省市
                var BankCity = json.obj.BankCity; //银行所属城市
                var BankArea = json.obj.BankArea; //银行所属地区
                var BankAddress = json.obj.BankAddress; //详细地址
                var BankRegionText = json.obj.BankRegionText; //银行所属省市城市地区文本
                console.log(BankRegionText);
                $("#provinceCode").val(BankProvince);
                $("#cityCode").val(BankCity);
                $("#districtCode").val(BankArea);
                $("#area").val(BankRegionText);
                $("#BankCardName").val(BankCardName);
                $("#BankCardNo").val(BankCardNo);
                $("#BankName").val(BankName);
                $("#BankAddress").val(BankAddress);
                if (json.obj.IsBindBank == 1) {
                    document.getElementById("BankCardName").readOnly = true;
                    document.getElementById("BankCardNo").readOnly = true;
                    document.getElementById("BankAddress").readOnly = true;
                    document.getElementById("area").readOnly = true;
                    //移除掉银行展示div块
                    $(".selectBankNamePage").remove();
                    $(".btn-submit").remove();
                    $("#isbandtext").show();
                    $(".main").append("<a href=\"bindinfo.html\" class=\"weui-btn weui-btn-active\" style=\"margin:.2rem 12px .2rem;\">返回</a>");
                }
            }
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

function getSysConfig() {
    api.ajax({
        url: baseUrl + "/api/SysConfig/GetSysConfig",
        method: 'get',
        dataType: 'json'
    }, function(ret, err) {
        if (ret) {
            if (!isNullOrEmpty(JSON.stringify(ret))) {
                var json = $.parseJSON(JSON.stringify(ret));
                $("#isbandtext").html("修改银行卡资料请联系我们微信客服：" + json.obj.WechatNum);
            } else {
                tips("服务器走神了，请重试");
            }
        } else {
            api.alert({
                msg: JSON.stringify(err)
            });
        };
    });
}
