(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-other-sign"],{1559:function(t,n,i){"use strict";var s,a=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("div",{staticClass:"h45"},[i("div",{staticClass:"head bb_border"},[i("p",{staticClass:"btn_back",attrs:{href:"../../index.html"}}),i("div",{staticClass:"title center"},[t._v("签到领积分")]),i("p",{staticClass:"icon_r txt blue",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.goUrl("./pointrecord")}}},[t._v("积分记录")])])]),i("div",{staticClass:"main"},[i("div",{staticClass:"Sign"},[i("div",{staticClass:"Sign-top"},[i("div",{staticClass:"dl"},[i("p",[t._v("我的积分")]),i("span",{attrs:{id:"MyPoint"}},[t._v(t._s(t.obj.Score))])])]),i("div",{staticClass:"Sign-c"},[i("div",{class:["Signbtn",{active:3===t.data.errcode}],on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.goSign.apply(void 0,arguments)}}},[i("div",{staticClass:"inner"},[3===t.data.errcode?i("span",{staticClass:"txt "},[t._v("已签到")]):i("span",{staticClass:"txt "},[t._v("签到")]),i("span",{staticClass:"num",attrs:{id:"ThisPoint"}},[t._v("+1积分")])])]),i("p",{staticClass:"tips",attrs:{id:"GotoDay"}},[t._v("已经连续签到"+t._s(t.obj.GotoDay)+"天/累计获得"+t._s(t.obj.DayScore)+"积分")])]),i("div",{staticClass:"Sign-day"},[i("div",{staticClass:"jfitem"},t._l(7,(function(n,s){return i("div",{key:s,staticClass:"jf ",class:{cur:t.obj.GotoDay>s},attrs:{id:"forOneDay"}},[i("i",{staticClass:"icon"},[t._v("+"+t._s(s+1))])])})),0)])])])])},e=[];i.d(n,"b",(function(){return a})),i.d(n,"c",(function(){return e})),i.d(n,"a",(function(){return s}))},"4bc2":function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=i("79a9"),a={data:function(){return{userId:"",token:"",data:{},obj:{}}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),this.GetPointInfo()},onShow:function(){this.userId===uni.getStorageSync("userId")&&this.token===uni.getStorageSync("token")||(this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"))},methods:{GetPointInfo:function(){var t=this;(0,s.post)("integral/LoadSignInPage",{UserId:this.userId,Token:this.token}).then((function(n){t.getData(n)})).catch((function(n){t.getData(n)}))},getData:function(n){0!=n.errcode&&3!=n.errcode||(this.data=n,this.obj=n.obj),t("log",this.data,this.obj," at pages/other/sign.vue:104")},goSign:function(){var t=this;(0,s.post)("integral/SignInGetPoints",{UserId:this.userId,Token:this.token}).then((function(n){0==n.errcode?(uni.showToast({title:n.msg}),t.GetPointInfo()):3==n.errcode&&uni.showToast({title:n.msg,icon:"none"})}))},goUrl:function(t){uni.navigateTo({url:t})}}};n.default=a}).call(this,i("0de9")["log"])},"5e95":function(t,n,i){var s=i("24fb");n=s(!1),n.push([t.i,".head .icon_r.txt[data-v-655ff4b0]{max-width:30%!important}",""]),t.exports=n},"62b4":function(t,n,i){"use strict";i.r(n);var s=i("1559"),a=i("a82f");for(var e in a)"default"!==e&&function(t){i.d(n,t,(function(){return a[t]}))}(e);i("b18e");var o,c=i("f0c5"),r=Object(c["a"])(a["default"],s["b"],s["c"],!1,null,"655ff4b0",null,!1,s["a"],o);n["default"]=r.exports},a82f:function(t,n,i){"use strict";i.r(n);var s=i("4bc2"),a=i.n(s);for(var e in s)"default"!==e&&function(t){i.d(n,t,(function(){return s[t]}))}(e);n["default"]=a.a},b18e:function(t,n,i){"use strict";var s=i("e522"),a=i.n(s);a.a},e522:function(t,n,i){var s=i("5e95");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=i("4f06").default;a("e1fb7c6c",s,!0,{sourceMap:!1,shadowMode:!1})}}]);