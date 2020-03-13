function openwin(name, url) {
    api.openWin({
        name: name,
        url: url,
        slidBackEnabled: false,
        pageParam: {
            name: '只跳转页'
        }
    });
}

//拨打电话
function takePhone(mobile) {
    api.call({
        number: mobile
    });
};

//版本更新
function fnCheckUpdate() {
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err) {
        if (ret && ret.status) {
            if (!ret.result.update) {
                api.alert({
                    title: '版本更新',
                    msg: '当前已是最新版本，版本号：' + api.appVersion
                });
            } else {
                api.confirm({
                    title: '有新版本',
                    msg: '已发布最新版本，建议您尽快更新。版本号：' + ret.result.version,
                    buttons: ['马上更新', '以后再说']
                }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                        alert('点击了马上更新');
                    }
                });
            }
        }
    });
}


function closewin(name) {
    api.closeWin({
        name: name
    });
}

function tips(obj) {
    api.toast({
        msg: obj
    });
}

function tips_url(obj, url) {
    api.toast({
        msg: obj
    });
    setTimeout(jump(url), 3000);
}

function jump(url) {
    location.href = url;
}

function loading(title, modal) {
    api.showProgress({
        title: '努力加载中',
        text: title,
        modal: modal
    });
}

function loading_close() {
    api.hideProgress();
}

//验证手机号码
function telePhone(obj) {
    var regu = /^[1][0-9][0-9]{9}$/;
    var r_phone = new RegExp(regu);
    if (obj == "") {
        tips('手机号码不能为空');
        return false;
    }
    if (!r_phone.test(obj)) {
        tips('请输入正确的手机号');
        return false;
    }
    return true;
}

//产生不相同的字符串
function CreatOnlyVal() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

//必须为字母加数字且长度在6-16位
function CheckPassWord(password) { //必须为字母加数字且长度在6-16位
    var str = password;
    if (str == null || str.length < 6) {
        return false;
    }
    if (str == null || str.length > 16) {
        return false;
    }
    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
    if (!reg1.test(str)) {
        return false;
    }
    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
    return true;
}

//字母或数字或符号(@、=、&)且长度在6-16位
function CheckPassWordTwo(password) { //字母或数字或符号且长度在6-16位
    var str = password;
    if (str == null || str.length < 6) {
        return false;
    }
    if (str == null || str.length > 16) {
        return false;
    }
    var reg1 = new RegExp(/^[a-zA-Z0-9_@!.&#]{6,16}$/);
    console.log(str);
    if (!reg1.test(str)) {
        return false;
    }
    return true;
}

function getcard_type(card_type) {
    var str;
    if (card_type == 2) {
        str = '储蓄卡';
    }
    if (card_type == 3) {
        str = '信用卡';
    }
    return str;
}

//身份证验证
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;

function isTrueValidateCodeBy18IdCard(a_idCard) {
    var lastnum = a_idCard[17];
    var sum = 0; // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        //a_idCard[17] = "10"; // 将最后位为x的验证码替换为10方便后续操作
        lastnum = 10;
        //alert(a_idCard[17]);
    }

    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i]; // 加权求和
    }
    valCodePosition = sum % 11; // 得到验证码所位置
    if (lastnum == ValideCode[valCodePosition]) {
        return true;
    } else {
        //alert("身份证格式错误");
        return false;
    }
}

function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        //alert("身份证格式错误");
        return false;
    } else
        return true;
}


// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。

//方法步骤很清晰，易理解，需要在页面引用Jquery.js

//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(bankno) {
    if (bankno == null || bankno == "") {
        return false;
    }
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9

    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9)
                arrJiShu.push(parseInt(newArr[j]) * 2);
            else
                arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算Luhm值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhm = 10 - k;

    if (lastNum == luhm) {
        //$("#banknoInfo").html("Luhm验证通过");
        return true;
    } else {
        //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
    }
}

//银行卡输入四位四位分开显示
function bankaccountOnkeyup() {
    this.value = this.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");;
};

function substringbank(bankno) {
    var _beforeStr;
    var _endStr;
    if (bankno.length > 10) {
        _beforeStr = bankno.substring(0, 5);
        _endStr = bankno.substring(bankno.length - 4);
        return _beforeStr + "****" + _endStr;
    } else {
        return "";
    }

}

function funbarberHight() {
    var systemType = api.systemType;
    if (systemType == 'ios') {
        $("header").css("padding-top", "20px");
    }
    if (systemType == 'android') {
        $("header").css("padding-top", "25px");
    }
}


//====以上最新添加====================================================================================================================================================================


//type(0:getToken,1:getTokenByPassword,2:getRegisterSMSAuthCode)
function getTokenValue(callback) {

    //$api.getStorage('name'); // => //获取localStorage数据，必须与$api.setStorage()配套使用
    //$api.setStorage('name','Tom');//设置localStorage数据
    //$api.rmStorage('name')//清除localStorage中与键名对应的值
    /*获取偏好设置值 getPrefs({params}, callback(ret, err))
	api.setPrefs({key: tokenKey, value: token});
   	api.getPrefs(
		    {key: tokenKey}, function(ret, err){
				    debug("getTokenValue:getPrefs",ret,err);

				});

	  */
    var token = $api.getStorage(userTokenKey); //用户Token
    if (token && token != null && token != '') {
        return token;
    }
    token = $api.getStorage(tokenKey); //未登录用户Token
    return token;

}
//type(0:getToken,1:getTokenByPassword,2:getRegisterSMSAuthCode)
function removeTokenValue(type) {
    //$api.getStorage('name'); // => //获取localStorage数据，必须与$api.setStorage()配套使用
    //$api.setStorage('name','Tom');//设置localStorage数据
    //$api.rmStorage('name')//清除localStorage中与键名对应的值
    /*获取偏好设置值 getPrefs({params}, callback(ret, err))
	api.setPrefs({key: tokenKey, value: token});
   	api.getPrefs(
		    {key: tokenKey}, function(ret, err){
				    debug("getTokenValue:getPrefs",ret,err);

				});

	 */
    if (type == undefined) {
        type = 0;
    }
    if (type == 1) {
        accessToke = '';
        $api.rmStorage(userTokenKey);
    } else {
        accessToke = '';
        $api.rmStorage(tokenKey);
        $api.rmStorage(userTokenKey);
    }
}

function getFileName(o) { //通过第一种方式获取文件名
    var pos = o.lastIndexOf("."); //查找最后一个\的位置
    return o.substring(pos + 1); //截取最后一个\位置到字符长度，也就是截取文件名
}

//设置顶部导航菜单
function setRootNavIndex(frmName) {
    //name：描述：（可选项）window名称，若要跨window执行脚本，该字段必须指定，首页的名称为root
    var setNavIndex = 'setNavIndex(' + frmName + ');';
    api.execScript({
        name: 'root',
        script: setNavIndex
    });
}

function setRootCityInfo(cityInfo) {
    if (cityInfo) {
        cityInfo.city = cityInfo.city.replace('市', '');
        if (cityInfo.city != cityName) {
            debug('initCity:start,longitude:' + longitude + ',latitude:' + latitude + ',cityName:' + cityName)
            cityName = cityInfo.city;
            longitude = cityInfo.longitude;
            latitude = cityInfo.latitude;
            debug('initCity:end,longitude:' + longitude + ',latitude:' + latitude + ',cityName:' + cityName)
                //name：描述：（可选项）window名称，若要跨window执行脚本，该字段必须指定，首页的名称为root
            var setCityName = 'setCityName("' + cityName + '");';
            api.execScript({
                name: 'root',
                script: setCityName
            });

        }
    }
}


function openWin(name, url, title, pageParam) {
    var comPageParam = {
        "winName": name,
        "title": title
    }
    if (pageParam == undefined || pageParam == null) {
        pageParam = {};
    }
    var tmpPageParam = mergeJson({}, [comPageParam, pageParam]);
    //debug('tmpPageParam:'+JSON.stringify(tmpPageParam));
    api.openWin({
        name: name,
        url: url,
        pageParam: tmpPageParam
    });
    //debug('openWin,name:'+name+',url:'+url+',title:'+title);
}

function HandlerBack() {
    api.closeWin({});
}

function checkLogin(loginCallback, isLogin) {
    if (isLogin == undefined) {
        isLogin = 0;
    }

    // alert('checkLogin,isLogin:'+isLogin+',userId:'+userId);
    if (userId < 1) {
        api.getPrefs({
                key: userKey
            },
            function(ret, err) {
                debug("checkLogin,getPrefs:", ret, err);
                //         	    alert("getPrefs:"+JSON.stringify(ret));
                if (ret != null && ret != '') {
                    if (ret.value) {
                        userData = $api.strToJson(ret.value);
                    }
                }
                debug('userData:' + JSON.stringify(userData));
                if (userData) {

                    userId = userData.userId;
                    avatars = userData.avatars;
                    nickName = userData.nickName;
                    loginCallback(userData);
                } else {
                    if (isLogin >= 1) {
                        handlerLogout();
                    }
                }

            }
        );
    } else {
        loginCallback();
    }
}

function getUserId(callback) {
    if (userId < 1) {

        api.getPrefs({
                key: userKey
            },
            function(ret, err) {
                //alert(JSON.stringify(ret));
                //debug("checkLogin,getPrefs:",ret,err);
                if (ret != null && ret != '') {
                    if (ret.value) {
                        userData = $api.strToJson(ret.value);
                    }
                }
                if (userData) {
                    userId = userData.userId;
                }
                callback(userId);
            }
        );
    } else {
        callback(userId);
    }
}

function handlerLogout(isLogin) {
    //	alert("isLogin:"+isLogin);
    if (isLogin == undefined) {
        isLogin = 1;
    }
    removeUserInfo();
    //debug('handlerLogout,frameName:'+api.frameName+',winName:'+api.winName);
    if (isLogin > 0) {
        var name = 'win_login';
        var title = '账号登录';
        var wgtRootDir = api.wgtRootDir; //widget:协议对应的真实目录，即 widget 网页包的根目录，字符串类型 注意该目录为只读，不要往该目录下面写文件
        var url = '';
        if (isLogin == 2) {
            url = wgtRootDir + '/html/user/win_loginMobile.html';
        } else {
            url = wgtRootDir + '/html/user/win_login.html';
        }
        var t = setTimeout(function() {
            openUserWin(name, url, title);
            //api.closeWin({
            //});
        }, 300);
        return;
    }
    //setTimeout(function(){
    //api.closeWin();
    //},300);

}

function openLoginWin(loginType) {
    removeUserInfo();
    var name = 'win_login';
    var title = '账号登录';
    var wgtRootDir = api.wgtRootDir; //widget:协议对应的真实目录，即 widget 网页包的根目录，字符串类型 注意该目录为只读，不要往该目录下面写文件
    var url = '';
    if (loginType == 2) {
        url = wgtRootDir + '/html/user/win_loginMobile.html';
    } else {
        url = wgtRootDir + '/html/user/win_login.html';
    }
    openUserWin(name, url, title);
}

function removeUserInfo() {
    removeTokenValue(1)
    api.removePrefs({
        key: userKey
    });
    //name：描述：（可选项）window名称，若要跨window执行脚本，该字段必须指定，首页的名称为root
    var initUserInfo = 'initUserInfo(null);';
    api.execScript({
        name: 'root',
        script: initUserInfo
    });
    userId = 0;
}

function openUserWin(name, url, title) {
    var frameName = api.frameName;
    var winName = api.winName;
    //debug('frameName:'+frameName+',winName:'+winName+',name:'+name+',url:'+url);
    api.openWin({
        name: name,
        url: url,
        pageParam: {
            "frameName": frameName,
            "winName": name,
            "title": title
        }
    });
}

function initLocation2(callback) {
    var aMapLBS = api.require('aMapLBS');
    aMapLBS.configManager({
        accuracy: 'hundredMeters',
        filter: 1
    }, function(ret, err) {
        if (ret.status) {
            getLocation(callback);
        }
    });
}

function getNameFromGps() {
    var aMap = api.require('aMap');
    aMap.getNameFromCoords({
        lon: longitude,
        lat: latitude
    }, function(ret, err) {
        if (ret.status) {
            cityData = ret;
            var citySmall;
            if (cityData.city.indexOf('市') != -1) {
                citySmall = cityData.city.substring(0, cityData.city.length - 1);
            }
            api.setPrefs({
                key: gpsCity,
                value: {
                    city: cityData.city,
                    citySmall: citySmall
                }
            });
            $api.setStorage("address", cityData.address);
        }
    });
}

function getNameFromGps2() {
    var aMapLBS = api.require('aMapLBS');
    aMapLBS.singleAddress({
        timeout: 10
    }, function(ret, err) {
        if (ret.status) {
            var citySmall;
            cityData = ret.address;
            // 	   		alert("cityData:"+JSON.stringify(cityData));
            var citySmall;
            if (cityData.city.indexOf('市') != -1) {
                citySmall = cityData.city.substring(0, cityData.city.length - 1);
            }
            api.setPrefs({
                key: gpsCity,
                value: {
                    city: cityData.city,
                    citySmall: citySmall
                }
            });
            $api.setStorage("address", cityData.formattedAddress);
        }
    });
}

function getNameFromGps1() {
    debug('getNameFromGps:start');
    var bMap = api.require('bMap');
    bMap.getNameFromCoords({
        lon: longitude,
        lat: latitude
    }, function(ret, err) {
        debug('bMap:getNameFromCoords', ret, err);
        //alert("OK");
        //alert(JSON.stringify(ret))
        if (ret.status) {
            //alert(JSON.stringify(ret));
            var citySmall;
            cityData = ret;
            // 	   		if(cityData.city.indexOf('市')!=-1)
            // 	   		{
            // 	   			citySmall.substring(0,citySmall.length-1);
            // 	   		}

            //api.setPrefs({key:cityKey,value:{city:cityData.city,citySmall:citySmall,address:cityData.address}})
            //cityData=ret;
            var citySmall;
            if (cityData.city.indexOf('市') != -1) {
                citySmall = cityData.city.substring(0, cityData.city.length - 1);
            }
            api.setPrefs({
                key: gpsCity,
                value: {
                    city: cityData.city,
                    citySmall: citySmall
                }
            });
            $api.setStorage("address", cityData.address);
            //alert("address:"+$api.getStorage("address"));
            //callback(ret,err);
            //{"lon":114.03182665670037,"address":"广东省深圳市宝安区和悦路11号","status":true,"province":"广东省","streetNumber":"11号","streetName":"和悦路","district":"宝安区","lat":22.642723294900122,"city":"深圳市"}

        }
    });


    //	var aMap = api.require('aMap');
    //	alert("longitude:"+longitude+" latitude:"+latitude);
    //	aMap.getNameFromCoords({
    //	    lon: longitude,
    //	    lat: latitude,
    //	}, function(ret, err) {
    //	    if (ret.status) {
    //	        alert(JSON.stringify(ret));
    //	   	   		var citySmall;
    //	   	   		cityData=ret;
    //// 	   		if(cityData.city.indexOf('市')!=-1)
    //// 	   		{
    //// 	   			citySmall.substring(0,citySmall.length-1);
    //// 	   		}
    //
    // 	   		//api.setPrefs({key:cityKey,value:{city:cityData.city,citySmall:citySmall,address:cityData.address}})
    // 	   		//cityData=ret;
    // 	   		var citySmall;
    // 	   		if(cityData.city.indexOf('市')!=-1)
    // 	   		{
    // 	   		  citySmall=cityData.city.substring(0,cityData.city.length-1);
    // 	   		}
    // 	   		api.setPrefs({key:cityKey,value:{city:cityData.city,citySmall:citySmall}});
    // 	   		$api.setStorage("address",cityData.address);
    // 	   		//alert("address:"+$api.getStorage("address"));
    // 	   		//callback(ret,err);
    // 	      //{"lon":114.03182665670037,"address":"广东省深圳市宝安区和悦路11号","status":true,"province":"广东省","streetNumber":"11号","streetName":"和悦路","district":"宝安区","lat":22.642723294900122,"city":"深圳市"}
    //
    //  } else {
    //      alert(JSON.stringify(err));
    //  }
    //});

}

function initLocation(callBack) {
    getLocation(callBack);
    // 	   if(longitude==0||latitude==0)
    //    {
    //	         api.getPrefs(
    //		         {
    //		              key: gpsKey
    //		          },
    //
    //	           	  function(ret, err){
    //	           	  //alert(JSON.stringify(ret));
    //	           	    debug("initLocation,getPrefs:",ret,err);
    //	           	    if(ret!=null&&ret!='')
    //	           	    {
    //	           	      if(ret.value)
    //	           	      {
    //		           	        gpsData=$api.strToJson(ret.value);
    //	           	       }
    //	           	    }
    //	           	    debug('gpsData',gpsData);
    //	           	   if(gpsData)
    //	       	       {
    //	       	          longitude=gpsData.lon;
    //				      latitude=gpsData.lat;
    //				      if(callback!=undefined)
    //					  {
    //						  callback(longitude,latitude);
    //					  }
    //	       	       }
    //	       	       else
    //	       	       {
    //	       	       	 //alert("进入初始化");
    //	       	         getLocation(callback)
    //	       	       }
    //
    //			     }
    //			 );
    //	  }
    //	  else
    //	  {
    //	     if(callback!=undefined)
    //		 {
    //		    callback(longitude,latitude);
    //		 }
    //	  }
}

function getLocation(callBack) {
    //	api.showProgress({});
    var aMap = api.require('aMap');
    setTimeout(function() {
        aMap.open({
            rect: {
                x: 1,
                y: 1,
                w: 1,
                h: 1
            },
            showUserLocation: true
        }, function(ret, err) {
            //alert("ret:"+JSON.stringify(ret));
            aMap.hide();
            aMap.getLocation(function(ret, err) {
                //			api.hideProgress();
                //			alert("ret:"+JSON.stringify(ret));
                if (ret.status) {
                    api.setPrefs({
                        key: gpsKey,
                        value: ret
                    });
                    longitude = ret.lon;
                    latitude = ret.lat;
                    getNameFromGps();
                }
                if (callBack != undefined) {
                    callBack(longitude, latitude);
                }
            });
        })
    }, 500);


}
//获取经纬度
function getLocation1(callback) {
    /*
		  getLocation
获取位置信息，获取成功后自动停止获取。

若之前已通过 startLocation() 方法进行定位，则直接返回上次定位的数据，否则使用默认设置进行定位
*/
    var startTime = new Date().getTime(); //起始时间
    var endTime = 0;
    try {
        var bMap = api.require('bMap');
        bMap.getLocation({
            accuracy: '100m', ///（可选项）定位精度 10m 100m 1km 3km
            autoStop: true,
            filter: 1
        }, function(ret, err) {
            endTime = new Date().getTime(); //结束时间
            debug('bMap:getLocation', ret, err);
            //alert(JSON.stringify(ret));
            //alert(JSON.stringify("status:"+ret.status));
            if (ret.status) {

                //alert(JSON.stringify("ret:"+JSON.stringify(ret)));
                api.setPrefs({
                    key: gpsKey,
                    value: ret
                });
                longitude = ret.lon;
                latitude = ret.lat;
                getNameFromGps();
            }
            if (callback != undefined) {
                callback(longitude, latitude);
            }
        });

    } catch (e) {

    }
}

//获取经纬度
function getLocation2(callback) {
    var aMapLBS = api.require('aMapLBS');
    aMapLBS.singleLocation({
        timeout: 10
    }, function(ret, err) {
        if (ret.status) {
            api.setPrefs({
                key: gpsKey,
                value: ret
            });
            longitude = ret.lon;
            latitude = ret.lat;
            getNameFromGps();
        }
        if (callback != undefined) {
            callback(longitude, latitude);
        }
        aMapLBS.stopUpdatingLocation();
    });
}

function resultCallback(ret, err) {
    alert("ret:" + JSON.stringify(ret));
}

function getBarberWorkCategoryId(callback) {

    api.getPrefs({
        key: 'workCategory'
    }, function(ret, err) {
        //alert(JSON.stringify("ret:"+JSON.stringify(ret)));
        if (ret != null && ret != '') {
            if (ret.value) {
                workCategoryData = $api.strToJson(ret.value);
                //alert(JSON.stringify(cityData));
            }
        }
        //alert(JSON.stringify("productCategoryData:"+productCategoryData));
        if (workCategoryData) {
            workBigCategory = workCategoryData.workBigCategory;
            workSmallCategory = workCategoryData.workSmallCategory;
        }
        //alert("productCategory:"+productCategory);
        callback(workCategoryData);
    });
}

function getProductCategoryId(callback) {

    if (productCategory == 0) {
        api.getPrefs({
            key: 'productCate'
        }, function(ret, err) {
            //alert(JSON.stringify("ret:"+ret));
            if (ret != null && ret != '') {
                if (ret.value) {
                    productCategoryData = $api.strToJson(ret.value);
                    //alert(JSON.stringify(cityData));
                }
            }
            //alert(JSON.stringify("productCategoryData:"+productCategoryData));
            if (productCategoryData) {
                productCategory = productCategoryData.id;
            }
            //alert("productCategory:"+productCategory);
            callback(productCategoryData);
        });
    } else {
        callback(productCategoryData);
    }
}

function getCity(callback) {
    // 	if(cityName=='')
    // {
    api.getPrefs({
            key: gpsCity
        },
        function(ret, err) {
            //debug("checkLogin,getPrefs:",ret,err);
            //alert("ret1:"+JSON.stringify(ret));
            if (ret != null && ret != '') {
                if (ret.value) {
                    cityData = $api.strToJson(ret.value);
                    //alert(JSON.stringify(cityData));
                }
            }

            if (cityData) {
                cityName = cityData.city;
            }
            callback(cityName);
        });
    // }
    // else
    // {
    //    callback(cityName);
    // }
}

function showNetworkError() {
    api.toast({
        msg: msgEnum.NETWORK_UNAVAILABLE,
        location: 'middle'
    });
}

function getStatusBarHeight() {
    var height = 0;
    var sysType = api.systemType;
    if (sysType == 'ios') {
        height = getfixIos7BarHeight();
    } else if (sysType == 'android') {
        var ver = api.systemVersion;
        ver = parseFloat(ver);
        if (ver >= 4.4) {
            height = 25;
        }
    }
    return height;

}

function getfixIos7BarHeight() {
    var height = 0;
    var strDM = api.systemType;
    if (strDM == 'ios') {
        var strSV = api.systemVersion;
        var numSV = parseInt(strSV, 10);
        var fullScreen = api.fullScreen;
        var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
        if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
            height = 20;
        }
    }
    return height;
}


function debug(msg, ret, err) {
    var tmpMsg = 'url:' + getUrl(window.location.href) + ',msg:' + getMsg(msg);
    if (ret) {
        tmpMsg = tmpMsg + ",ret:" + JSON.stringify(ret)
    }
    if (err) {
        tmpMsg = tmpMsg + ",err:" + JSON.stringify(err);
    }
    console.log(tmpMsg);
}

function getUrl(url) {
    if (url == null || url == "") {
        return "";
    }
    var urlArray = url.split('/');
    return urlArray[urlArray.length - 1];
}

function getMsg(msg) {
    var tmpType = typeof(msg);
    var tmpMsg = '';
    if (tmpType == 'object') {
        for (var p in msg) {
            if (typeof(p) != "function ()") {
                tmpMsg += p + ':' + msg[p] + ',';
            }
        }
    } else if (tmpType != "function ()") {
        tmpMsg = msg;
    }
    return tmpMsg;
}
//提交去除前后空格
function textTrim(id) {
    var obj = $(id + " input[type='text']");
    $(obj).each(function() {
        $(this).val($.trim($(this).val()));
    });
}
// 获取当前的时间，拼接成2015-11-09这样的格式，主要用于对图片进行时间分类
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate;
}
// 获取文件拓展名
function getExt(fileName) {
    if (isNullOrEmpty(fileName)) return '';
    return fileName.substring(fileName.lastIndexOf('.') + 1);
}

/*
 * // 8 character ID (base=2)
uuid(8, 2)  //  "01001010"
// 8 character ID (base=10)
uuid(8, 10) // "47473046"
// 8 character ID (base=16)
uuid(8, 16) // "098F4D35"
 */
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}
/*
 * 计算新尺寸
 * width:原始宽度,height:原始高度,maxWidth:最大新宽度,maxHeight:最大新高度
 */
function resizeImage(width, height, maxWidth, maxHeight) {
    var MAX_WIDTH = maxWidth;
    var MAX_HEIGHT = maxHeight;
    var ASPECT_RATIO = MAX_WIDTH / MAX_HEIGHT;

    var newWidth, newHeight;
    var originalWidth = width;
    var originalHeight = height;
    if (originalWidth > MAX_WIDTH || originalHeight > MAX_HEIGHT) {
        var factor;
        // determine the largest factor
        if (originalWidth / originalHeight > ASPECT_RATIO) {
            factor = originalWidth / MAX_WIDTH;
            newWidth = Math.floor(originalWidth / factor);
            newHeight = Math.floor(originalHeight / factor);
        } else {
            factor = originalHeight / MAX_HEIGHT;
            newWidth = Math.floor(originalWidth / factor);
            newHeight = Math.floor(originalHeight / factor);
        }
    } else {
        newWidth = width;
        newHeight = height;
    }
    return {
        'newWidth': newWidth,
        'newHeight': newHeight
    };
}
//合并Json数据
function mergeJson(des, src, override) {
    if (src instanceof Array) {
        for (var i = 0, len = src.length; i < len; i++)
            mergeJson(des, src[i], override);
    }
    for (var i in src) {
        if (override || !(i in des)) {
            des[i] = src[i];
        }
    }
    return des;
}

function isNullOrEmpty(val) {
    if (val == null || val == '' || val == "undefined") return true;
    return false;
}
/**
 * 删除左右两端的空格
 */
String.prototype.Trim = function(s) {
    s = (s ? s : "\\s"); //没有传入参数的，默认去空格
    var regex = new RegExp("^" + s + "*", "g"); //拼正则
    return this.replace(regex, "");
}
String.prototype.Cut = function(startIndex, length) {
    var str = this;
    if (startIndex >= 0) {
        if (length < 0) {
            length = length * -1;
            if (startIndex - length < 0) {
                length = startIndex;
                startIndex = 0;
            } else {
                startIndex = startIndex - length;
            }
        }


        if (startIndex > str.Length) {
            return "";
        }


    } else {
        if (length < 0) {
            return "";
        } else {
            if (length + startIndex > 0) {
                length = length + startIndex;
                startIndex = 0;
            } else {
                return "";
            }
        }
    }

    if (str.Length - startIndex < length) {
        length = str.Length - startIndex;
    }
    return str.substr(startIndex, length);
}



Number.prototype.DistanceFormat = function() {
        var distance = this;
        //alert(distance);
        if (distance >= 9223372036854776000) {
            return "";
        }
        //console.log("DistanceFormat：distance："+distance);
        if (distance < 1000) {
            return distance.toFixed(1) + "m";
        } else {
            return (Math.round(distance / 100) / 10).toFixed(1) + "km";
        }
    }
    //调用：
String.prototype.DateFormat = function(fmt) {
        if (this == null || this == "") {
            return "";
        }
        var date = new Date(this);
        return date.Format(fmt);
    }
    //var time1 = new Date().Format("yyyy-MM-dd");
    //var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
        //console.log("year:" + this.getFullYear());
        if (this.getFullYear() <= 1900) return "";
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    //unixTimestamp：时间戳 ，dateFmt：yyyy-MM-dd
function unixTimestampToDateFormat(unixTimestamp, fmt) {

    if (fmt == undefined || fmt == '') {
        fmt = 'yyyy-MM-dd';
    }
    try {
        var date = unixTimestampToDate(unixTimestamp);
        if (date) {
            return date;
        } else {
            return '';
        }
    } catch (e) {
        //debug(e.name + ":" + e.message);
        return '';
    }
}

//function strToDate(str) {
//          var tempStrs = str.split(" ");
//          var dateStrs = tempStrs[0].split("-");
//          var year = parseInt(dateStrs[0]);
//          var month = parseInt(dateStrs[1]);
//          var day = parseInt(dateStrs[2]);
//          var timeStrs = tempStrs[1].split(":");
//          var hour = parseInt(timeStrs[0]);
//          var minute = parseInt(timeStrs[1]);
//          //var second = parseInt(timeStrs[2], 10);
//          var date = new Date(year, month, day, hour, minute);
//          return date;
//      }

//unixTimestamp：时间戳 ，dateFmt：yyyy-MM-dd
function unixTimestampToDate(unixTimestamp) {
    // alert('unixTimestamp:'+unixTimestamp);
    if (unixTimestamp <= 0) return null;
    try {
        var timestamp = (unixTimestamp + 8 * 60 * 60) * 1000
        var date = new Date(timestamp);
        var isoDate = date.toISOString().replace(/T/g, " ").replace(/Z/g, "");

        var resultData = isoDate.toLocaleString();
        resultData = resultData.substring(0, resultData.lastIndexOf(':'));
        return resultData;
    } catch (e) {
        //debug(e.name + ":" + e.message);
        return null;
    }
}

function unixTimestampToDateFormat1(unixTimestamp, fmt) {
    if (fmt == undefined || fmt == '') {
        fmt = 'yyyy-MM-dd';
    }
    try {
        var date = unixTimestampToDate1(unixTimestamp);
        if (date) {
            return date.Format(fmt);
        } else {
            return '';
        }
    } catch (e) {
        //debug(e.name + ":" + e.message);
        return '';
    }
}

function unixTimestampToDate1(unixTimestamp) {
    if (unixTimestamp <= 0) return null;
    try {
        var timestamp = (unixTimestamp + 8 * 60 * 60) * 1000
        var date = new Date(timestamp);
        return date;
    } catch (e) {
        return null;
    }
}

function obdmap(lng, lat, elng, elat, adress, eadress) {
    //		alert("lng:"+lng+" lat:"+lat+" elng:"+elng+" elat:"+elat+" adress:"+adress+" eadress:"+eadress);
    var systemType = api.systemType;
    if (systemType == 'ios') {
        api.openApp({
            iosUrl: 'http://maps.apple.com/maps?saddr=' + lat + ',' + lng + '&daddr=' + elat + ',' + elng,
        });
    } else {
        var uri = 'androidamap://navi?';
        uri += 'sourceApplication=' + api.appName;
        uri += '&poiname=理发店';
        uri += '&lat=' + elat + "&lon=" + elng;
        uri += '&dev=0';
        uri += '&style=2';
        api.openApp({
            androidPkg: 'android.intent.action.VIEW',
            //							androidPkg:'android.intent.action.VIEW',
            appParam: {
                lat: elat,
                lon: elng,
                dev: '0',
                style: '2',
                sourceApplication: api.appName,
            },
            uri: uri,
        }, function(ret, err) {});
    }
}
Date.prototype.addDay = function(number) {
    var adjustDate = new Date(this.getTime() + 24 * 60 * 60 * 1000 * number)
    return adjustDate;
}
Date.prototype.addHour = function(number) {
    var adjustDate = new Date(this.getTime() + 60 * 60 * 1000 * number)
    return adjustDate;
}
Date.prototype.addMinute = function(number) {
    var adjustDate = new Date(this.getTime() + 60 * 1000 * number)
    return adjustDate;
}

function checkNetwork() {
    connectionType = $api.connectionType;
    switch (connectionType) {
        case "none":
        case "":
            networkAvailable = false;
            break;
        default:
            networkAvailable = true;
            break;
    }
    if (!networkAvailable) {
        var time = setTimeout(function() {
            networkAvailable = checkNetwork();
        }, 1000);
    } else {
        return networkAvailable;
    }
}

var deepCopy = function(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCoyp(source[key]) : source[key];
    }
    return result;
}

function checkUpdate() {
    $api.setStorage("isUpdateState", 1);
    var mam = api.require('mam');
    mam.checkUpdate(function(ret, err) {
        if (ret) {
            var result = ret.result;
            if (result.update == true & result.closed == false) {
                var str = '新版本型号:' + result.version + ';更新提示语:' + result.updateTip;
                api.confirm({
                    title: '有新的版本,是否下载并安装 ',
                    msg: str,
                    buttons: ['确定', '取消']
                }, function(ret, err) {
                    if (ret.buttonIndex == 1) {
                        if (api.systemType == "android") {
                            api.download({
                                url: result.source,
                                report: true
                            }, function(ret, err) {
                                if (ret && 0 == ret.state) { /* 下载进度 */
                                    api.toast({
                                        msg: "正在下载应用" + ret.percent + "%",
                                        duration: 2000
                                    });
                                }
                                if (ret && 1 == ret.state) { /* 下载完成 */
                                    var savePath = ret.savePath;
                                    api.installApp({
                                        appUri: savePath
                                    });
                                }
                            });
                        }
                        if (api.systemType == "ios") {
                            api.installApp({
                                appUri: result.source
                            });
                        }
                    }
                });
            } else {
                /*api.alert({
                    msg : "暂无更新"
                });*/
            }
        } else {
            api.alert({
                msg: err.msg
            });
        }
    });
}


function closeMap() {
    var map = api.require('aMap');
    map.close();
}

function openMapLoad(lng, lat) {
    var map = api.require('aMap');
    map.open({
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: api.winHeight - 100,
        },
        center: {
            lon: lng,
            lat: lat
        },
        zoomLevel: 18,
        showUserLocation: true,
        fixedOn: api.frameName,
        fixed: true
    }, function(ret) {
        if (ret.status) {
            //alert(JSON.stringify(ret));
        }
    });
}

function addAnnotations(lng, lat) {
    var map = api.require('aMap');
    map.addAnnotations({
        annotations: [{
            id: 1,
            lon: lng,
            lat: lat
        }],
        icon: 'widget://',
        draggable: true,
        timeInterval: 2.0
    }, function(ret) {});

}


function wxIsInstalled(callback) {
    var wxin = api.require('wx');
    //验证是否按装微信客户端
    wxin.isInstalled(function(ret, err) {
        if (callback) {
            callback(ret, err);
        }
    });
}

function IsCompleteNoviceTask() {
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
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                return json.obj;
            } else {
                tips(json.msg);
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
}

function IsNovice() {
    //判断路径
    var dir1 = "";
    var dir2 = "";
    var checkurl = location.href.substring(0, location.href.lastIndexOf('/'));
    if (checkurl.search("user") != -1) {
        dir1 = "../task/";
        dir2 = "";
    } else if (checkurl.search("other") != -1) {
        dir1 = "../task/";
        dir2 = "../user/";
    } else if (checkurl.search("task") != -1) {
        dir1 = "";
        dir2 = "../user/";
    } else {
        dir1 = "html/task/";
        dir2 = "html/user/";
    }
    var isbool = $api.getStorage('IsCompleteNoviceTaskFlag');
    if (isNullOrEmpty(isbool)) {
        isbool = IsCompleteNoviceTask();
    }
    if (isbool) {
        location.href = dir1 + 'platformlist.html';
    } else {
        isbool = IsCompleteNoviceTask();
        if (isbool) {
            location.href = dir1 + 'platformlist.html';
        } else {
            layer.open({
                content: '<p class="layer_tips">请先完成新手任务</p>',
                btn: ['确认', '取消'],
                yes: function(index) { //layer.msg('yes');    //点击确定回调
                    location.href = dir2 + 'member.html';
                }
            });
        }
    }
}

Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getDateText(strTime) {
    if (!strTime) {
        return '';
    }
    var myDate = new Date(strTime + '+0800');
    if (myDate == 'Invalid Date') {
        strTime = strTime.replace(/T/g, ' ');
        strTime = strTime.replace(/-/g, '/');
        strTime = strTime.replace(/\.\d+/, ' ');
        myDate = new Date(strTime + '+0800');
    }
    return myDate;
}

function exit_app(num) {
    if (num == 1) {
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            api.toast({
                msg: '再按一次返回键退出' + api.appName,
                duration: 2000,
                location: 'bottom'
            });
            api.addEventListener({
                name: 'keyback'
            }, function(ret, err) {
                api.closeWidget({
                    id: api.APPid, //你的APPid
                    retData: {
                        name: 'closeWidget'
                    },
                    animation: {
                        type: 'flip',
                        subType: 'from_bottom',
                        duration: 500
                    },
                    silent: true
                });
            });
            setTimeout(function() {
                exit_app();
            }, 3000);
        });
    } else if (num == 2) {
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            if (!ret.status) {
                api.closeWin();
            }
        });
    } else {
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err) {
            if (!ret.status) {
                //api.closeWin();
                history.go(-1);
            }
        });
    }
}

function appIsDown(dataAppVersion, downloadUrl) {
    var aver = api.appVersion;
    var sType = api.systemType;
    if (!isNullOrEmpty(dataAppVersion) && !isNullOrEmpty(downloadUrl) && sType == 'ios' && dataAppVersion != aver) {
        var dialogBox = api.require('dialogBox');
        dialogBox.taskPlan({
            rect: {
                w: 260
            },
            texts: {
                mainTitle: 'APP更新',
                subTitle: '',
                content: [{
                    text: 'APP有新版本，去更新下载安装App'
                }],
                btnTitle: '确定'
            },
            styles: {
                bg: '#fff',
                corner: 10,
                main: {
                    marginT: 10,
                    color: '#007FFF',
                    size: 18,
                    bold: true,
                },
                content: [{
                    bg: '#fff',
                    marginT: 15,
                    w: 240,
                    h: 30,
                    align: 'center',
                    color: '#333',
                    size: 14
                }],
                ok: {
                    marginR: 0,
                    marginT: 20,
                    marginB: 0,
                    marginL: 0,
                    align: 'center',
                    w: 260,
                    h: 40,
                    bg: '#007FFF',
                    color: '#fff',
                    size: 16
                }
            }
        }, function(ret) {
            if (ret.eventType == 'ok') {
                location.href = downloadUrl;
                dialogBox.close({
                    dialogName: 'taskPlan'
                });
            }
        });

        // api.confirm({
        //     msg: 'APP有新版本，去更新下载安装App',
        //     buttons: '确定'
        // }, function(ret, err) {
        //     if (ret.buttonIndex == 1)
        //         location.href = downloadUrl;
        // });
    }
}
