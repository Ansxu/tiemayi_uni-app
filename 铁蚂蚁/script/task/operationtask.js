userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
//操作任务倒计时
var has_click = false;
var timer = "";
var isCheckProduct = false;
var isCheckShop = false;
var taskType = 0;
var taskExpressId = 0;
var isPresaleTask = 0;
var acceptTaskStatus = 0;
apiready = function() {
    exit_app(2);
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../html/login/login.html';
    } else {
        getTaskInfo();
    }
    // api.alert({
    //     title: "注意！",
    //     msg: "请完全按照商家要求操作，确认每一步都间隔足够时间，不按照要求做的，平台有权封停账号",
    //     buttons: ["我知道了"]
    // });
}

function getTaskInfo() {
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/LoadOperationalTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskAcceptNo: api.pageParam.taskAcceptNo
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {console.log(JSON.stringify(ret));
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
              //console.log("===========json.obj.objIsCollectionShop=============");
              //console.log(json.obj.IsCollectionShop);
                if (!isNullOrEmpty(json.obj.ImgJson)) {
                    var ImageJson = $.parseJSON(json.obj.ImgJson);
                    json.obj["ImgJson"] = ImageJson;
                }
                if (!isNullOrEmpty(json.obj.OkImgJson)) {
                    var OkImageJson = $.parseJSON(json.obj.OkImgJson);
                    json.obj["OkImgJson"] = OkImageJson;
                }
                taskType = json.obj.TaskType;
                taskExpressId = json.obj.TaskExpressId;
                isPresaleTask = json.obj.IsPresaleTask;
                acceptTaskStatus = json.obj.AcceptTaskStatus;
                if (isPresaleTask == 1) {
                    api.alert({
                        title: "注意！",
                        msg: "预售任务，付款时间：" + json.obj.PaymentStartTime + "-" + json.obj.PaymentEndTime + "。请完全按照商家要求操作，确认每一步都间隔足够时间，不按照要求做的，平台有权封停账号",
                        buttons: ["我知道了"]
                    });
                } else {
                    api.alert({
                        title: "注意！",
                        msg: "请完全按照商家要求操作，确认每一步都间隔足够时间，不按照要求做的，平台有权封停账号",
                        buttons: ["我知道了"]
                    });
                }
                $("#taskCommission").html(json.obj.Commission + "金");
                var interText = doT.template($("#taskInfoTemp").text());
                $("#taskInfo").html(interText(json.obj));
                if (json.obj.AcceptTaskStatus == 0) {
                    timerStart(json.obj.OperationCountdown);
                }
                //			缩略图全屏查看
                $('.attachClaimImg img').click(function() {
                    var photoBrowser = api.require('photoBrowser');
                    var imgsrc = $(this).attr("src");
                    photoBrowser.open({
                        images: [imgsrc],
                        placeholderImg: 'widget://image/loading_more.gif',
                        bgColor: '#000'
                    }, function(ret, err) {
                        if (ret) {
                            if (ret.eventType == 'click') {
                                photoBrowser.close()
                            }
                        } else {
                            alert(JSON.stringify(err));
                        }
                    });
                });
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

function timerStart(countdown) {
    var i = parseInt(countdown);
    var alls = 60 * i;
    var h = parseInt(i / 60);
    var m = i - (h * 60);
    if (m == 0) {
        --h;
        m = 59;
    } else
        --m
    var s = 59;
    timer = setInterval(function() {
        if (alls <= 0) {
            has_click = false;
            clearInterval(timer);
            tips("任务超时未处理，系统已取消");
            location.href = 'receivedtask.html';
        } else {
            --s;
            --alls;
            if (m == 0 && h > 0 && alls > 0) {
                --h;
                m = 59
            }
            if (s == 0) {
                --m;
                s = 60;
            }

        }
    }, 1000);
}

function ClearTimer() {
    clearInterval(timer);
    $('#count_down').html('');
}

function CopyContent() {
    var clipBoard = api.require('clipBoard');
    clipBoard.set({
        value: $("#proKeyWord").text()
    }, function(ret, err) {
        if (ret) {
            tips("复制成功");
            ///console.log(JSON.stringify(ret));
            console.log(JSON.stringify(err));
        } else {
            tips("复制失败");
            console.log(JSON.stringify(err));
        }
    });
}

function checkShop() {
    var txtShopName = "";
    $(".Examine .inputbox_group input[name='shopname']").each(function() {
        if (isNullOrEmpty($(this).val())) {
            tips("输入的店铺名不能为空");
            return false;
        }
        txtShopName += $(this).val();
    });
    txtShopName = txtShopName.replace(/\s+/g, "");
    if (isNullOrEmpty(txtShopName)) {
        tips("输入的店铺名不能为空");
        return false;
    }
    loading();
    api.ajax({
        url: baseUrl + "/api/Task/VerifyShopName",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskAcceptNo: api.pageParam.taskAcceptNo,
                ShopName: txtShopName
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                isCheckShop = true;
                api.alert({
                    title: "店铺名："+txtShopName,
                    msg: json.msg,
                }, function(ret, err){

                });
            } else if (json.errcode == 202) {
                tips(json.msg);
                location.href = '../../index.html';
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

function validationInput(e) {
    var str = e.value;
    str = str.replace(/\s+/g, "");
    if (!isNullOrEmpty(str) && str.length > 1) {
        tips("只能输入一个字符");
        e.value = str.substring(0, 1);
    }
}

// <div class="Step Step-2">
//     <div class="No"><span>核对商品链接是否正确  </span><a class="link_btn">点击查看示例</a></div>
//     <div class="hedui">
//         <div class="inputbox"><input class="input" type="text" id="txtProductUrl" placeholder="输入目标商品的链接地址" /></div>
//         <a class="btn" onclick="checkProductUrl()">核对</a>
//     </div>
// </div>
// function checkProductUrl() {
//   var txtProductUrl = $("#txtProductUrl").val();
//   if (isNullOrEmpty(txtProductUrl)) {
//       tips("输入的商品链接不能为空");
//       return false;
//   }
//   loading();
//   api.ajax({
//       url: baseUrl + "/api/Task/VerifyProductUrl",
//       method: 'post',
//       dataType: 'json',
//       data: {
//           values: {
//               UserId: userId,
//               Token: userToKen,
//               TaskAcceptNo: api.pageParam.taskAcceptNo,
//               ProductUrl: txtProductUrl
//           }
//       }
//   }, function(ret, err) {
//       if (!isNullOrEmpty(JSON.stringify(ret))) {
//           var json = $.parseJSON(JSON.stringify(ret));
//           if (json.errcode == 0) {
//               isCheckProduct = true;
//               tips(json.msg);
//           } else if (json.errcode == 2) {
//               tips(json.msg);
//               location.href = '../../html/login/login.html';
//           } else {
//               tips(json.msg);
//           }
//       } else {
//           tips("服务器走神了，请重试");
//       }
//    loading_close();
//   });
// }

function submitTask() {
  var huobisanjiaJson={};
    var imageJson = {};
    if ($("#searchImg")[0]) {
        if (isNullOrEmpty($("#searchImg").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["SearchPageImg"] = $("#searchImg").val();
    }
    //额外操作截图
    if ($("#scotherA")[0]) {
        if (isNullOrEmpty($("#scotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["ShouCanjpimg1"] = $("#scotherA").val(); //收藏竞品1
    }

    if ($("#scotherB")[0]) {
        if (isNullOrEmpty($("#scotherB").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["ShouCanjpimg2"] = $("#scotherB").val(); //收藏竞品2
    }

    if ($("#jgotherA")[0]) {
        if (isNullOrEmpty($("#jgotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["JiaGoujpimg1"] = $("#jgotherA").val(); //加购竞品1
    }

    if ($("#jgotherB")[0]) {
        if (isNullOrEmpty($("#jgotherB").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["JiaGoujpimg2"] = $("#jgotherB").val(); //加购竞品2
    }

    if ($("#scdpotherA")[0]) {
        if (isNullOrEmpty($("#scdpotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["ShouCandpimg"] = $("#scdpotherA").val(); //收藏店铺
    }

    if ($("#fbbotherA")[0]) {
        if (isNullOrEmpty($("#fbbotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["LiuLanfbbimg"] = $("#fbbotherA").val(); //浏览副宝贝
    }

    if ($("#dzotherA")[0]) {
        if (isNullOrEmpty($("#dzotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["DianZanhpimg"] = $("#dzotherA").val(); //点赞好评
    }

    if ($("#llwdjotherA")[0]) {
        if (isNullOrEmpty($("#llwdjotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["LiuLanwdjimg"] = $("#llwdjotherA").val(); //浏览问大家
    }

    if ($("#twwdjotherA")[0]) {
        if (isNullOrEmpty($("#twwdjotherA").val())) {
            tips("搜索结果截图不能为空");
            return false;
        }
        imageJson["TiWendjimg"] = $("#twwdjotherA").val(); //提问问大家
    }

    if ($("#huobisanj1")[0]) {
        if (isNullOrEmpty($("#huobisanj1").val())) {
            tips("货比三家链接不能为空");
            return false;
        }
        huobisanjiaJson["ShopAroundlink1"] = $("#huobisanj1").val(); //货比三家链接
    }

    if ($("#huobisanj2")[0]) {
        if (isNullOrEmpty($("#huobisanj2").val())) {
            tips("货比三家链接不能为空");
            return false;
        }
        huobisanjiaJson["ShopAroundlink2"] = $("#huobisanj2").val(); //货比三家链接
    }



    if ($("#otherA")[0]) {
        if (isNullOrEmpty($("#otherA").val())) {
            tips("其他商家A截图不能为空");
            return false;
        }
        imageJson["OtherShopProBottomImgA"] = $("#otherA").val();
    }
    if ($("#otherB")[0]) {
        if (isNullOrEmpty($("#otherB").val())) {
            tips("其他商家B截图不能为空");
            return false;
        }
        imageJson["OtherShopProBottomImgB"] = $("#otherB").val();
    }
    if ($("#targetTop")[0]) {
        if (isNullOrEmpty($("#targetTop").val())) {
            tips("目标商品顶部截图不能为空");
            return false;
        }
        imageJson["TargetProductTopImg"] = $("#targetTop").val();
    }
    if ($("#targetBottom")[0]) {
        if (isNullOrEmpty($("#targetBottom").val())) {
            tips("目标商品底部截图不能为空");
            return false;
        }
        imageJson["TargetProductBottomImg"] = $("#targetBottom").val();
    }
    if ($("#shopProA")[0]) {
        if (isNullOrEmpty($("#shopProA").val())) {
            tips("店内商品A截图不能为空");
            return false;
        }
        imageJson["ShopProductBottomImgA"] = $("#shopProA").val();
    }
    if ($("#shopProB")[0]) {
        if (isNullOrEmpty($("#shopProB").val())) {
            tips("店内商品B截图不能为空");
            return false;
        }
        imageJson["ShopProductBottomImgB"] = $("#shopProB").val();
    }
    if ($("#AdditionalProductA1")[0]) {
        if (isNullOrEmpty($("#AdditionalProductA1").val())) {
            tips("附加商品1顶部截图不能为空");
            return false;
        }
        imageJson["AdditionalProductA1"] = $("#AdditionalProductA1").val();
    }
    if ($("#AdditionalProductB1")[0]) {
        if (isNullOrEmpty($("#AdditionalProductB1").val())) {
            tips("附加商品1底部截图不能为空");
            return false;
        }
        imageJson["AdditionalProductB1"] = $("#AdditionalProductB1").val();
    }
    if ($("#AdditionalProductA2")[0]) {
        if (isNullOrEmpty($("#AdditionalProductA2").val())) {
            tips("附加商品2顶部截图不能为空");
            return false;
        }
        imageJson["AdditionalProductA2"] = $("#AdditionalProductA2").val();
    }
    if ($("#AdditionalProductB2")[0]) {
        if (isNullOrEmpty($("#AdditionalProductB2").val())) {
            tips("附加商品2底部截图不能为空");
            return false;
        }
        imageJson["AdditionalProductB2"] = $("#AdditionalProductB2").val();
    }
    if ($("#collectionShop")[0]) {
        if (isNullOrEmpty($("#collectionShop").val())) {
            tips("收藏店铺截图不能为空");
            return false;
        }
        imageJson["ShopCollectionImg"] = $("#collectionShop").val();
    }
    if ($("#collectionProduct")[0]) {
        if (isNullOrEmpty($("#collectionProduct").val())) {
            tips("收藏商品截图不能为空");
            return false;
        }
        imageJson["ProductCollectionImg"] = $("#collectionProduct").val();
    }
    if ($("#cartImg")[0]) {
        if (isNullOrEmpty($("#cartImg").val())) {
            tips("加入购物车截图不能为空");
            return false;
        }
        imageJson["ShoppingCartImg"] = $("#cartImg").val();
    }
    if ($("#merchantChatImg")[0]) {
        if (isNullOrEmpty($("#merchantChatImg").val())) {
            tips("商家聊天截图不能为空");
            return false;
        }
        imageJson["MerchantChatImg"] = $("#merchantChatImg").val();
    }
    if ($("#orderDetailsImg")[0]) {
        if (isNullOrEmpty($("#orderDetailsImg").val())) {
            tips("订单详情截图不能为空");
            return false;
        }
        imageJson["OrderDetailsImg"] = $("#orderDetailsImg").val();
    }
    if (!isCheckShop && acceptTaskStatus != 9) {
        tips("请核对店铺名称");
        return false;
    }
    // if (!isCheckProduct) {
    //     tips("请核对商品链接地址");
    //     return false;
    // }
    var orderMoney = 0;
    var consigneeName = $("#consignee").val();
    var consigneeMobile = $("#consigneeMobile").val();
    var province = $("#provinceCode").val();
    var city = $("#cityCode").val();
    var district = $("#districtCode").val();
    var addressInfo = $("#xiangxidizhi").val();
    if (taskType > 0 && (isPresaleTask == 0 || (isPresaleTask == 1 && acceptTaskStatus == 9))) {
        if (taskType == 1 && (isPresaleTask == 0 || (isPresaleTask == 1 && acceptTaskStatus == 9))) {
            orderMoney = $("#orderMoney").val();
            if (isNullOrEmpty(orderMoney)) {
                tips("任务为垫付任务，请输入平台下单的订单金额");
                return false;
            }
            var reg = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,4})?$/;
            if (!reg.test(orderMoney) || orderMoney > 1000000000000) {
                tips("请输入正确的订单金额");
                return false;
            }
            if (isNullOrEmpty($("#orderNo").val())) {
                tips("任务为垫付任务，请输入平台下单的订单号");
                return false;
            }
            if (taskExpressId > 0) {
                if (isNullOrEmpty(consigneeName)) {
                    tips("请填写平台下单的收货人名字");
                    return false;
                }
                if (!telePhone(consigneeMobile)) {
                    tips("请填写正确的收货人联系电话");
                    return false;
                }
                if (isNullOrEmpty(province) || isNullOrEmpty(city) || isNullOrEmpty(district)) {
                    tips("请选择平台下单的收货地址省市区");
                    return false;
                }
                if (isNullOrEmpty(addressInfo)) {
                    tips("请输入平台下单的收货详细地址");
                    return false;
                }
            }
        }
    }

    loading("正在提交……");
    api.ajax({
        url: baseUrl + "/api/Task/SubmitTask",
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
                TaskAcceptNo: api.pageParam.taskAcceptNo,
                ImgJson: JSON.stringify(imageJson),
                PlatOrderNo: $("#orderNo").val(),
                PlatOrderMoney: orderMoney,
                ConsigneeName: consigneeName,
                ConsigneeMobile: consigneeMobile,
                ProvinceCode: province,
                CityCode: city,
                DistrictCode: district,
                AddressInfo: addressInfo,
                ShopAroundjson:huobisanjiaJson
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                alert(json.msg);
                api.closeWin({
                    name: 'selectoperation'
                });
                location.href = 'receivedtask.html';
                // api.alert({
                //     msg: json.msg,
                //     buttons: ["确定"]
                // }, function() {
                //     location.href = 'receivedtask.html';
                // });
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../html/login/login.html';
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
        loading_close();
    });
}

// var topTime, bottomTime;
//
// function timeInterval(clickdiv, el) {
//     getpic(clickdiv, el, 20);
//     topTime = new Date();
// }
//
// function timeIntervalTwo(clickdiv, el) {
//     bottomTime = new Date();
//     if ((parseInt(bottomTime - topTime) / 1000 / 60) >= 3) {
//         getpic(clickdiv, el, 20);
//     } else {
//         alert("目标商品顶部图片上传与目标商品底部上传必须相隔3分钟以上");
//     }
// }

function showExamples(indexval) {
    api.openWin({
        name: 'taskexamples',
        url: '../../html/task/taskexamples.html',
        slidBackEnabled: false,
        pageParam: {
            indexval: indexval
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
