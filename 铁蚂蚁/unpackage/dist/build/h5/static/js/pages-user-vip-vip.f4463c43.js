(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-vip-vip"],{"2b33":function(t,n,i){n=t.exports=i("2350")(!1),n.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.allScreenPage[data-v-281b7a22]{display:block}.joinVIP[data-v-281b7a22]{padding:39px 12px}',""])},"55cb":function(t,n,i){"use strict";var e=i("8bc5"),s=i.n(e);s.a},"6f83":function(t,n,i){"use strict";var e,s=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("headers",[t._v("加入VIP")]),t.mark?t._e():i("div",{staticClass:"main"},[t._m(0)]),t.mark?t._e():i("div",{staticClass:"dd_footer VIP__dd_footer"},[i("div",{staticClass:"inner"},[i("div",{staticClass:"dd_Btns flex flexAlignCenter justifyCenter"},[i("div",{staticClass:"weui-btn weui-btn-active",attrs:{id:"btn-joinVIP"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.joinVip.apply(void 0,arguments)}}},[t._v("同意加入")])])])]),t.mark?i("div",{staticClass:"joinVIP",staticStyle:{"border-top":"none"}},[i("div",{staticClass:"selectSetMeal"},[t._m(1),i("div",{staticClass:"selectSetMeal__bd"},t._l(t.data,function(n,e){return i("ul",{key:e,staticClass:"setMealList dd_BtnsList li50",attrs:{id:"vipselect"}},[i("li",{class:t.i==e?"active":"",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.setMealList(n.VipPrice,n.VipName,n.Id,e)}}},[i("div",{staticClass:"outside"},[i("div",{staticClass:"weui-btn"},[t._v(t._s(n.VipName))])])])])}),0),i("div",{staticClass:"selectSetMeal__ft"},[i("div",{staticClass:"weui-btn weui-btn-active btn-pay",attrs:{id:"btn-pay"},on:{click:function(n){n.stopPropagation(),arguments[0]=n=t.$handleEvent(n),t.btnPay.apply(void 0,arguments)}}},[t._v(t._s(t.str))])])])]):t._e()],1)},a=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"joinVIP",staticStyle:{"border-top":"none"}},[i("div",{staticClass:"joinVIP_section"},[i("div",{staticClass:"joinVIP_section__hd"},[i("p",{staticClass:"title"},[t._v("加入铁蚂蚁VIP"),i("br"),t._v("享受账号垫付任务")])]),i("div",{staticClass:"joinVIP_section__bd"},[i("div",{staticClass:"con"},[i("h2",{staticClass:"title"},[t._v("入会须知：")]),i("p",[t._v("1、铁蚂蚁等级满LV1"),i("br"),t._v("2、VIP可以每个平台多绑定一个账号，每天可以做更多的任务"),i("br"),t._v("3、高度的责任心，避免串号"),i("br"),t._v("4、在账号信息中会员，每个平台最多可绑定2个账号"),i("br"),t._v("5、到期之后请续费，否则会员资格自动取消"),i("br"),t._v("6、会员中途不得以任何理由要求退回管理费")])])])]),i("div",{staticClass:"joinVIP_section"},[i("div",{staticClass:"joinVIP_section__bd"},[i("div",{staticClass:"con"},[i("h2",{staticClass:"title"},[t._v("收费方式：")]),i("p",{attrs:{id:"vipitem"}}),i("p",[t._v("费用一次性从佣金账户扣除，余额不够请先做任务赚金请认真阅读以上要点")])])])])])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"selectSetMeal__hd"},[i("h2",{staticClass:"title"},[t._v("选择VIP套餐")])])}];i.d(n,"b",function(){return s}),i.d(n,"c",function(){return a}),i.d(n,"a",function(){return e})},"8bc5":function(t,n,i){var e=i("2b33");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var s=i("4f06").default;s("e6e6ff00",e,!0,{sourceMap:!1,shadowMode:!1})},adfd:function(t,n,i){"use strict";i.r(n);var e=i("dbfe"),s=i.n(e);for(var a in e)"default"!==a&&function(t){i.d(n,t,function(){return e[t]})}(a);n["default"]=s.a},dbfe:function(t,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i("79a9"),s={data:function(){return{userId:"",token:"",data:{},mark:!1,str:"选择VIP套餐",price:"",name:"",id:"",i:null}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),this.init()},onShow:function(){this.userId===uni.getStorageSync("userId")&&this.token===uni.getStorageSync("token")||(this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"))},methods:{init:function(){var t=this;(0,e.get)("Money/GetVIPList").then(function(n){console.log(n),t.data=n.obj})},joinVip:function(){console.log(123),this.mark=!0},setMealList:function(t,n,i,e){this.price=t,this.name=n,this.id=i,this.i=e,this.str="立即支付"+this.price+"金"},btnPay:function(){var t=this;uni.showModal({title:"温馨提示",content:"您购买旺店宝"+this.name+"套餐,需支付"+this.price+"金币",success:function(n){n.confirm?(console.log("用户点击确定"),(0,e.post)("Money/UserBuyVIP",{UserId:t.userId,Token:t.token,SetMealId:t.id}).then(function(t){console.log(t),1==t.errcode&&uni.showToast({title:t.msg,success:function(){uni.redirectTo({url:"../menber"})}})})):n.cancel&&console.log("用户点击取消")}})}}};n.default=s},e8cd:function(t,n,i){"use strict";i.r(n);var e=i("6f83"),s=i("adfd");for(var a in s)"default"!==a&&function(t){i.d(n,t,function(){return s[t]})}(a);i("55cb");var c,o=i("f0c5"),r=Object(o["a"])(s["default"],e["b"],e["c"],!1,null,"281b7a22",null,!1,e["a"],c);n["default"]=r.exports}}]);