(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-bindinfo"],{1135:function(t,i,n){"use strict";n.r(i);var e=n("84a0"),s=n("d750");for(var a in s)"default"!==a&&function(t){n.d(i,t,function(){return s[t]})}(a);var c,l=n("f0c5"),r=Object(l["a"])(s["default"],e["b"],e["c"],!1,null,"e0976248",null,!1,e["a"],c);i["default"]=r.exports},"3fec":function(t,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=n("79a9"),s={data:function(){return{goUrl:e.goUrl,userId:"",token:"",info:{},bindList:[],bindAccount:[]}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token")},onShow:function(){this.getUserInfo()},methods:{getUserInfo:function(){var t=this;(0,e.post)("Member/GetBindPageData",{UserId:this.userId,Token:this.token}).then(function(i){var n=i.obj;t.info=n,t.bindList=n.MemberAccount,t.bindAccount=n.MemberAccountShow})},onBindAccount:function(t){var i={};-1!==t.PlatName.indexOf("淘宝")?i={name:"淘宝",typeId:1,url:"bindtaobao"}:-1!==t.PlatName.indexOf("京东")?(console.log(t,"item"),i={name:"京东",typeId:3,url:"bindjd"}):-1!==t.PlatName.indexOf("阿里巴巴")?i={name:"阿里巴巴",typeId:4,url:"bindalbb"}:-1!==t.PlatName.indexOf("拼多多")?i={name:"拼多多",typeId:5,url:"bindpdd"}:-1!==t.PlatName.indexOf("美丽说")?i={name:"美丽说",typeId:6,url:"bindmls"}:-1!==t.PlatName.indexOf("蘑菇街")&&(i={name:"蘑菇街",typeId:7,url:"bindmgj"}),(0,e.goUrl)("user/bindlist",i)},goBindBank:function(){(0,e.goUrl)("user/bindbank")}}};i.default=s},"84a0":function(t,i,n){"use strict";var e,s=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"bg_f8f8f8"},[n("headers",[t._v("绑定信息")]),n("div",{staticClass:"main"},[n("div",{staticClass:"navSection"},[t._m(0),n("div",{staticClass:"navSection__bd"},[n("div",{staticClass:"weui-cells navList__weui-cells navList2__weui-cells"},[n("div",{staticClass:"weui-cell",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUrl("user/bindidcard")}}},[t._m(1),n("div",{staticClass:"weui-cell__bd text_r"},[n("p",{staticClass:"txtMsg",attrs:{id:"IdentityCard"}},[t._v(t._s(t.info.IsAUTStr))])]),t._m(2)]),n("div",{staticClass:"weui-cell",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goBindBank.apply(void 0,arguments)}}},[t._m(3),n("div",{staticClass:"weui-cell__bd text_r"},[n("p",{staticClass:"txtMsg",attrs:{id:"BankCard"}},[t._v(t._s(t.info.BankStr))])]),t._m(4)])])])]),n("div",{staticClass:"navSection"},[t._m(5),n("div",{staticClass:"navSection__bd"},[n("div",{staticClass:"weui-cells navList__weui-cells navList2__weui-cells"},t._l(t.bindList,function(i,e){return n("div",{key:e,staticClass:"weui-cell",attrs:{id:"TbAccountShow"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.onBindAccount(i)}}},[n("div",{staticClass:"weui-cell__hd"},[n("img",{staticClass:"icon-navImg",attrs:{src:i.Logo,alt:""}}),n("span",{staticClass:"title"},[t._v(t._s(i.PlatName))])]),n("div",{staticClass:"weui-cell__bd text_r"},[n("p",{staticClass:"txtMsg",attrs:{id:"TbAccount"}},[t._v(t._s(i.IsBindText))])]),t._m(6,!0)])}),0)])])])],1)},a=[function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"dd__hd"},[n("p",{staticClass:"titleMsg color_e40000"},[t._v("账号信息(账户信息必填，银行卡信息与身份证一致)")])])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"weui-cell__hd"},[n("img",{staticClass:"icon-navImg",attrs:{src:"/static/image/nav/bind_nav1_1.png",alt:""}}),n("span",{staticClass:"title"},[t._v("绑定身份证")])])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"weui-cell__ft"},[n("span",{staticClass:"icon-arrow icon-arrowRight"})])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"weui-cell__hd"},[n("img",{staticClass:"icon-navImg",attrs:{src:"/static/image/nav/bind_nav1_2.png",alt:""}}),n("span",{staticClass:"title"},[t._v("绑定银行卡")])])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"weui-cell__ft"},[n("span",{staticClass:"icon-arrow icon-arrowRight"})])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"dd__hd"},[n("p",{staticClass:"titleMsg color_e40000"},[t._v("账号信息(任意绑定一个号并通过审核即可完成新手任务)")])])},function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"weui-cell__ft"},[n("span",{staticClass:"icon-arrow icon-arrowRight"})])}];n.d(i,"b",function(){return s}),n.d(i,"c",function(){return a}),n.d(i,"a",function(){return e})},d750:function(t,i,n){"use strict";n.r(i);var e=n("3fec"),s=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(i,t,function(){return e[t]})}(a);i["default"]=s.a}}]);