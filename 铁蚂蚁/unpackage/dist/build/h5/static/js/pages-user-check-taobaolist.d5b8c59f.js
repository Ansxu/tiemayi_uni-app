(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-check-taobaolist"],{"19f6":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var e=i("79a9"),a={data:function(){return{userId:"",token:"",list:{}}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),this.getData()},onShow:function(){},methods:{getData:function(){var t=this;(0,e.post)("Member/LoadMemberAccountList",{UserId:this.userId,Token:this.token,PlatId:1}).then(function(s){var i=s.obj.AccountList;i.map(function(s){s.time=(0,e.editTime)(s.TBFinalCheckTime,"time"),0==s.IsTBFinalCheck&&(t.list=s)}),t.list.Id||(t.list=i[0])})},submit:function(){var t=this.list;0==t.ReviewStatus?(0,e.toast)("账号还未通过管理员审核，无法验号，等待平台管理员审核后再验号"):2==t.ReviewStatus?(0,e.toast)("账号审核失败，无法验号，等待平台管理员审核后再验号"):1==t.IsTBFinalCheck?(0,e.toast)("该账号已验号成功，请勿重复验证"):(0,e.goUrl)("user/check/yanzheng_tkl",{Id:t.Id,PlatAccount:t.PlatAccount,ReviewStatus:t.ReviewStatus,IsTBFinalCheck:t.IsTBFinalCheck})}}};s.default=a},"318e":function(t,s,i){"use strict";var e,a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"bg_f8f8f8"},[i("headers",[t._v("选择淘宝账号验证")]),i("div",{staticClass:"main"},[i("div",{staticClass:"item"},[i("ul",{staticClass:"accountList accountList2"},[i("li",[i("div",{staticClass:"weui-cells navList__weui-cells"},[i("div",{staticClass:"weui-cell"},[t._m(0),i("div",{staticClass:"weui-cell__bd"},[i("p",{staticClass:"title"},[t._v(t._s(t.list.PlatAccount))])]),i("div",{staticClass:"weui-cell__ft"},[i("span",{staticClass:"status",staticStyle:{display:"block",width:"100%","text-align":"right"}},[t._v(t._s(t.list.ReviewStatusText))]),i("p",{staticStyle:{"font-size":"12px"}},[t._v("最后验证时间："+t._s(t.list.time))])])]),i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__hd"},[t._v("收货地址")]),i("div",{staticClass:"weui-cell__bd"},[i("p",{staticClass:"title"},[t._v(t._s(t.list.AddressInfo))])])]),i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__hd"},[t._v("联系电话")]),i("div",{staticClass:"weui-cell__bd"},[i("p",{staticClass:"title"},[t._v(t._s(t.list.ConsigneeCall))])])]),i("div",{staticClass:"weui-cell"},[i("div",{staticClass:"weui-cell__hd"},[t._v("联系人")]),i("div",{staticClass:"weui-cell__bd"},[i("p",{staticClass:"title"},[t._v(t._s(t.list.ConsigneeName))])])])])])])]),1!==t.list.IsTBFinalCheck?i("div",{staticStyle:{"background-color":"#5c91f0",color:"#fff","font-size":"18px",padding:"10rpx","text-align":"center"}},[i("p",{staticStyle:{display:"block",width:"100%",color:"#fff"},on:{click:function(s){arguments[0]=s=t.$handleEvent(s),t.submit.apply(void 0,arguments)}}},[t._v("验证此号")])]):t._e(),i("div",{staticClass:"accountListBox",attrs:{id:"taobaolist"}})])],1)},c=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"weui-cell__hd"},[i("img",{staticClass:"icon-navImg",attrs:{src:"/static/image/icons/taobao.png",alt:""}})])}];i.d(s,"b",function(){return a}),i.d(s,"c",function(){return c}),i.d(s,"a",function(){return e})},a831:function(t,s,i){"use strict";i.r(s);var e=i("19f6"),a=i.n(e);for(var c in e)"default"!==c&&function(t){i.d(s,t,function(){return e[t]})}(c);s["default"]=a.a},b01b:function(t,s,i){"use strict";i.r(s);var e=i("318e"),a=i("a831");for(var c in a)"default"!==c&&function(t){i.d(s,t,function(){return a[t]})}(c);var l,n=i("f0c5"),u=Object(n["a"])(a["default"],e["b"],e["c"],!1,null,"dd3cdd0a",null,!1,e["a"],l);s["default"]=u.exports}}]);