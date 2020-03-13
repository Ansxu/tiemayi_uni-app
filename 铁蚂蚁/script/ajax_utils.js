function postJsonData(url, requestData, callback) {
    /*
    data={'url':url,'formData':formData,'fileData':fileData}
    data={'url':url,'requestData':requestData}
     */
    var data = {
        'url': url,
        'requestData': requestData
    };
    if (accessToken == null || accessToken == '') {
        getAccessToken(data, callback);
    } else {
        postDataByBearerAuth(data, callback);
    }
}

function postFileData(url, formData, fileData, callback) {
    /*
    data={'url':url,'formData':formData,'fileData':fileData}
    data={'url':url,'requestData':requestData}
     */
    var data = {
        'url': url,
        'formData': formData,
        'fileData': fileData
    };
    if (accessToken == null || accessToken == '') {
        //alert("为空");
        getAccessToken(data, callback);
    } else {
        //alert("执行");
        postDataByBearerAuth(data, callback);
    }
}

function postDataByBearerAuth(data, callback) {
    var requestUrl = baseUrl + data.url;
    //  api.showProgress({});
    if (data.fileData) {
        //alert("111");
        //alert("postDataByBearerAuth:"+data.formData);
        //alert("postDataByBearerAuth:"+data.fileData);
        api.ajax({
            url: requestUrl,
            tag: 'postDataByBearerAuth', //描述：（可选项）请求标识，可以传递此字段给cancelAjax方法来取消请求
            method: 'post',
            headers: {
                "Authorization": "Bearer " + accessToken //Claims-based（基于声明）的认证
            }, //（可选项）请求头
            data: {
                values: data.formData,
                files: data.fileData
            }
        }, function(ret, err) {
            handlerResponseCallBack(data, ret, err, callback)
        });
    } else {
        //alert("222");
        api.ajax({
            url: requestUrl,
            tag: 'postDataByBearerAuth', //描述：（可选项）请求标识，可以传递此字段给cancelAjax方法来取消请求
            method: 'post', //（可选项）异步请求方法类型
            cache: false, //描述：（可选项）是否缓存，若缓存，下次没网络时请求则会使用缓存
            timeout: 30, //（可选项）超时时间，单位秒
            dataType: 'json', //（可选项）返回数据类型
            charset: 'utf-8', //描述：（可选项）当响应头里面没有返回字符集编码时，使用此编码来解析数据
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken //Claims-based（基于声明）的认证
            }, //（可选项）请求头
            report: false, //（可选项）是否实时返回上传文件进度
            returnAll: false, //（可选项）是否需要返回所有response信息，为true时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
            data: {
                body: JSON.stringify(data.requestData)
            }
        }, function(ret, err) {
            handlerResponseCallBack(data, ret, err, callback)
        });
    }

}


/*

data={'url':url,'formData':formData,'fileData':fileData}
data={'url':url,'requestData':requestData}
 */
function handlerResponseCallBack(data, ret, err, callback) {
    // api.hideProgress();
    //debug("handlerResponseCallBack,baseUrl:"+baseUrl+",data:"+JSON.stringify(data),ret,err);
    //alert("handlerResponseCallBack,baseUrl:"+baseUrl+",data:"+JSON.stringify(data),ret,err);
    if (err != null && err != "") {
        //alert("handlerResponseCallBack:不为空");
        //alert("ret:"+JSON.stringify(ret));
        // alert("err:"+JSON.stringify(err));
        if (err.statusCode == 400) {
            if (err.body.code != undefined) {
                //accessToken过期要重新获取accessToken
                if (err.body.code == codeEnum.UNAUTHORIZED) {
                    removeTokenValue(0);
                    getAccessToken(data, callback);
                }
                //用户未登录要重新登录
                else if (err.body.code == codeEnum.NO_LOGIN) {
                    handlerLogout();
                    //callback(ret,err,1);
                } else {
                    callback(ret, err);
                }
            } else {
                callback(ret, err);
            }
        } else {
            callback(ret, err);
        }

    } else {
        // alert("handlerResponseCallBack:为空");
        //accessToken过期要重新获取accessToken
        if (ret.code == codeEnum.UNAUTHORIZED) {
            //$api.getStorage('name'); // => //获取localStorage数据，必须与$api.setStorage()配套使用
            //$api.setStorage('name','Tom');//设置localStorage数据
            //$api.rmStorage('name')//清除localStorage中与键名对应的值
            removeTokenValue(0);
            getAccessTokenFor(data, callback);
            return;
        }
        //用户未登录要重新登录
        else if (ret.code == codeEnum.NO_LOGIN) {
            removeTokenValue(1);
            handlerLogout();
            callback(ret, err, 1);
        } else {
            callback(ret, err);
        }
    }
}


function getAccessToken(data, callback) {

    if (accessToken == '') {
        var token = getTokenValue(function() {});
        if (token && token.access_token) {
            accessToken = token.access_token;
        } else {
            var url = "Api/OAuth/Token";
            var requestData = {
                "client_id": clientId,
                "client_secret": clientSecret,
                "grant_type": "client_credentials"
            };
            getAccessTokenByForm(url, requestData, function(ret, err) {
                getTokenCallback(0, ret, err, data, callback);
            });
        }
    }
    if (callback != undefined) {
        //alert("第一次："+accessToken);
        postDataByBearerAuth(data, callback);
    }
}

function getAccessTokenByPassword(userName, password, callback) {
    var url = "Api/OAuth/Token";
    var requestData = {
        "client_id": clientId,
        "client_secret": clientSecret,
        "grant_type": "password",
        "username": userName,
        "password": password,
        "loginType": "password"
    };
    var data = {
        'url': callback.url,
        'requestData': callback.requestData
    }
    getAccessTokenByForm(url, requestData, function(ret, err) {
        getTokenCallback(1, ret, err, data, callback.callback);
    });
}

function getAccessTokenByWeixin(userName, password, callback) {
    var url = "Api/OAuth/Token";
    var requestData = {
        "client_id": clientId,
        "client_secret": clientSecret,
        "grant_type": "password",
        "username": userName,
        "password": password,
        "loginType": "weixin"
    };
    var data = {
        'url': callback.url,
        'requestData': callback.requestData
    }
    getAccessTokenByForm(url, requestData, function(ret, err) {
        getTokenCallback(1, ret, err, data, callback.callback);
    });
}
//type(0:getToken,1:getTokenByPassword,2:getRegisterSMSAuthCode)
function getTokenCallback(type, ret, err, data, callback) {
    /*
  * {
	    statusCode: 400,        //网络请求状态码，数字类型
	    code:0,                    //错误码（详见异步请求错误码常量），数字类型
	    msg:''                    //错误描述，字符串类型
	    body:                    //当请求失败如需要权限时，此时服务器返回的数据会通过该参数返回；当要求返回的数据格式为json，而返回的数据不是json格式时，数据通过该参数返回
   }
  */

    //debug("getTokenCallback,type:"+type,ret,err);
    if (err != null && err != "") {
        /*
    * {
          "statusCode": 400,
          "msg":{
	          "error": "invalid_clientId",
	          "error_description": "无效clientId"
          },
          "body":{
	          "error": "invalid_clientId",
	          "error_description": "无效clientId"
          }
      }
    */
        var msg = '';
        if (err.statusCode == 400 || err.statusCode == 0) {
            if (err.body.error_description != undefined) {
                msg = err.body.error_description;
            } else if (err.body.msg != undefined) {
                msg = err.body.msg;
            } else if (err.msg != undefined) {
                msg = err.msg;
            }
        } else {
            msg = "很抱歉！服务器繁忙，请稍后再试";
        }
        err.msg = msg;
        if (callback != undefined) {
            callback(ret, err);
        }
    } else {

        if (ret.code == codeEnum.SUCCESS) {
            /*
           * {
				"access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlxdWVfbmFtZSI6IlUxNTgxMzgyMDYxNyIsIm5hbWVpZCI6IjQ2OGY4OWRhZjgwNDQ1YmM4YjQ5YTVlMjVhZmQ4YTBmIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiIxNTgxMzgyMDYxNyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiJ7XCJhcHBJZFwiOlwiQTY5MDMzMjY1NTMxMTFcIixcImRldmljZUlkXCI6XCI4NjU4OTkwMjY4MTI0ODZcIixcInZlcnNpb25cIjpcIjEuMi4wXCIsXCJzeXN0ZW1UeXBlXCI6XCJhbmRyb2lkXCIsXCJzeXN0ZW1WZXJzaW9uXCI6XCI0LjQuMlwiLFwiY29ubmVjdGlvblR5cGVcIjpcIndpZmlcIn0iLCJwcmltYXJ5c2lkIjoiMSIsImlzcyI6Imh0dHA6Ly93d3cud3RhbmUuY29tIiwiYXVkIjoiQkY3ODE3RkQyRTg2NTFCNkZDNEMxMDJGNjA3RUExQ0QiLCJleHAiOjE0NjE1NzQ2MzksIm5iZiI6MTQ2MDk2OTgzOX0.YBSeqlpPeGjzoTUmCq_Bw3VSeA7NBZYRBCOU0gxe56Q",
				"token_type": "bearer",
				"expires_in": 604799,
				"refresh_token": "9fad2f241d21496f9d5e4383446bbaae",
				"code": 1,
				"msg": "有效的clientId"
			 }
           */
            setTokenValue(type, ret);
            if (callback != undefined) {
                //alert('第二次');
                postDataByBearerAuth(data, callback);
            }

        } else {
            //alert(ret.code+":"+ret.msg);
            err.msg = "很抱歉！服务器繁忙，请稍后再试";
            //alert(err.msg);
            if (callback != undefined) {
                callback(ret, err);
            }

        }
    }

}


//获取AccessToken
function getAccessTokenByForm(url, requestData, callback) {
    var requestUrl = baseUrl + url;
    var commData = {
        "appId": api.appId,
        "deviceId": api.deviceId,
        "version": api.version,
        "systemType": api.systemType,
        "systemVersion": api.systemVersion,
        "connectionType": api.connectionType
    };
    var values = mergeJson({}, [commData, requestData]);
    //console.log(logTag+JSON.stringify(values));
    api.ajax({
        url: requestUrl,
        tag: 'getAccessTokenByForm', //描述：（可选项）请求标识，可以传递此字段给cancelAjax方法来取消请求
        method: 'post', //（可选项）异步请求方法类型
        cache: false, //描述：（可选项）是否缓存，若缓存，下次没网络时请求则会使用缓存
        timeout: 30, //（可选项）超时时间，单位秒
        data: {
            values: values
        }
    }, callback);
}
//type(0:getToken,1:getTokenByPassword,2:getRegisterSMSAuthCode)
function setTokenValue(type, token) {
    //$api.getStorage('name'); // => //获取localStorage数据，必须与$api.setStorage()配套使用
    //$api.setStorage('name','Tom');//设置localStorage数据
    //$api.rmStorage('name')//清除localStorage中与键名对应的值
    // setPrefs 设置偏好数据  api.setPrefs({key: 'k', value: '1'}) ;
    /*
		  获取偏好设置值 getPrefs({params}, callback(ret, err))
		 api.getPrefs(
		    {key: 'k'}, function(ret, err){
					    if( ret ){
					         alert( JSON.stringify( ret ) );
					    }else{
					         alert( JSON.stringify( err ) );
					    }
					});

		 removePrefs删除偏好设置值removePrefs({params})
   	 */
    //accessToken=token.access_token;
    //api.setPrefs({key: tokenKey, value: token});
    if (type == undefined) {
        type = 0;
    }
    if (type == 1) {
        accessToken = token.access_token;
        $api.setStorage(userTokenKey, token);
    } else {
        accessToken = token.access_token;
        $api.setStorage(tokenKey, token);
    }

    //var token=$api.getStorage(tokenKey);
    //debug('getTokenCallback,token:'+JSON.stringify(token));

}
