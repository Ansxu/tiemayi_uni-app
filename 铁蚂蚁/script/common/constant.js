// var baseUrl = 'http://xmyapi.wtvxin.com';
// var website = 'http://xmy.wtvxin.com';
var baseUrl = 'https://api.damingduo.cn';//正式
var website = 'http://www.3318pk.com';
var accessToken = '';
var apikey = 'TxRe@5_6A7a#e_8Fr5c1_36El@1a1_u7tFtr@Rg';
var appId = 'A6010957284142';
var appName = 'tmy';
var clientId = '32422354D41A4E7814D0ACDF510D2167';
var clientSecret = '79C8F22AB0DD19B4A74F254A75887DAA';
var logTag = "[tmy]:";
var tokenKey = 'token',
    userTokenKey = 'user:token';
var userId = 1,
    userToKen = '0EC2C2AE48A96AE013A1D008E8D23D25',
    avatars = 'image/icons/avatars.png',
    userData = null;
var nickName = 'tmy';
var userKey = 'tmy:User',
    gpsKey = 'tmy:GPS';

var pageSize = 12;
var longitude = 0,
    latitude = 0,
    gpsData = null,
    cityName = '',
    cityCode = '',
    cityKey = 'cityKey',
    cityData = null,
    address = '',
    gpsCity = "gpsCity";
//var worksCategoryTreeData=[{"id":18,"name":"发型","idPath":"18","namePath":"发型","parentId":0,"sub":[{"id":3,"name":"原创分享","idPath":"18,3","namePath":"发型,原创分享","parentId":18,"sub":[{"id":5,"name":"女士","idPath":"18,3,5","namePath":"发型,原创分享,女士","parentId":3,"sub":null},{"id":6,"name":"男士","idPath":"18,3,6","namePath":"发型,原创分享,男士","parentId":3,"sub":null}]},{"id":1,"name":"发型风格","idPath":"18,1","namePath":"发型,发型风格","parentId":18,"sub":[{"id":9,"name":"女士","idPath":"18,1,9","namePath":"发型,发型风格,女士","parentId":1,"sub":null},{"id":10,"name":"男士","idPath":"18,1,10","namePath":"发型,发型风格,男士","parentId":1,"sub":null}]},{"id":2,"name":"舞台造型","idPath":"18,2","namePath":"发型,舞台造型","parentId":18,"sub":[{"id":11,"name":"女士","idPath":"18,2,11","namePath":"发型,当今流行,女士","parentId":2,"sub":null},{"id":12,"name":"男士","idPath":"18,2,12","namePath":"发型,当今流行,男士","parentId":2,"sub":null}]},{"id":4,"name":"新娘发型","idPath":"18,4","namePath":"发型,新娘发型","parentId":18,"sub":[{"id":13,"name":"女士","idPath":"18,4,13","namePath":"发型,明星发型,女士","parentId":4,"sub":null},{"id":14,"name":"男士","idPath":"18,4,14","namePath":"发型,明星发型,男士","parentId":4,"sub":null}]}]},{"id":19,"name":"造型","idPath":"19","namePath":"造型","parentId":0,"sub":[{"id":20,"name":"日常造型","idPath":"19,20","namePath":"造型,日常造型","parentId":19,"sub":[{"id":15,"name":"女士","idPath":"19,20,15","namePath":"造型,日常造型,女士","parentId":20,"sub":null},{"id":16,"name":"男士","idPath":"19,20,16","namePath":"造型,日常造型,男士","parentId":20,"sub":null}]},{"id":21,"name":"晚宴造型","idPath":"19,21","namePath":"造型,晚宴造型","parentId":19,"sub":[{"id":7,"name":"女士","idPath":"19,21,7","namePath":"造型,晚宴造型,女士","parentId":21,"sub":null},{"id":17,"name":"男士","idPath":"19,21,17","namePath":"造型,晚宴造型,男士","parentId":21,"sub":null}]},{"id":22,"name":"当今流行","idPath":"19,22","namePath":"造型,当今流行","parentId":19,"sub":[{"id":24,"name":"男士","idPath":"19,22,24","namePath":"造型,当今流行,男士","parentId":22,"sub":null},{"id":8,"name":"女士","idPath":"19,22,8","namePath":"造型,当今流行,女士","parentId":22,"sub":null}]},{"id":23,"name":"明星发型","idPath":"19,23","namePath":"造型,明星发型","parentId":19,"sub":[{"id":25,"name":"女士","idPath":"19,23,25","namePath":"造型,明星发型,女士","parentId":23,"sub":null},{"id":26,"name":"男士","idPath":"19,23,26","namePath":"造型,明星发型,男士","parentId":23,"sub":null}]}]}];
/*unknown            //未知
ethernet        //以太网
wifi            //wifi
2g                //2G网络
3g                //3G网络
4g                //4G网络
none            //无网络
*/
var connectionType;
var networkAvailable = false;
if (typeof codeEnum == "undefined") {　　
    var codeEnum = {
        UNAUTHORIZED: 9000,
        NO_LOGIN: 9001,
        ERROR: 0,
        SUCCESS: 1,
    }
}

if (typeof msgEnum == "undefined") {　　
    var msgEnum = {
        NETWORK_UNAVAILABLE: "世界上最遥远的距离就是没网。请检查设置"
    }
}
