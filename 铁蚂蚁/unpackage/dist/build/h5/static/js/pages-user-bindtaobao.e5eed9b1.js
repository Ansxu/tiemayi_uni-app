(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-bindtaobao"],{"2fd6":function(t,e,a){"use strict";var i={wPicker:a("a6dd").default},s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bg_f8f8f8"},[a("headers",[t._v("绑定淘宝账号")]),a("div",{staticClass:"main"},[t._m(0),a("div",{staticClass:"bindSection"},[t._m(1),a("div",{staticClass:"bindForm regLogForm onlyIpt__form",staticStyle:{"padding-top":"0","padding-bottom":"0"}},[a("v-uni-form",{attrs:{action:""}},[a("div",{staticClass:"weui-cells"},[a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"taobaoName",placeholder:"请输入淘宝账号"},model:{value:t.data.PlatAccount,callback:function(e){t.$set(t.data,"PlatAccount","string"===typeof e?e.trim():e)},expression:"data.PlatAccount"}})],1)]),a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"shouhuoren",placeholder:"收货人姓名"},model:{value:t.data.ConsigneeName,callback:function(e){t.$set(t.data,"ConsigneeName","string"===typeof e?e.trim():e)},expression:"data.ConsigneeName"}})],1)]),a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"lianxidianhua",placeholder:"联系电话"},model:{value:t.data.ConsigneeCall,callback:function(e){t.$set(t.data,"ConsigneeCall","string"===typeof e?e.trim():e)},expression:"data.ConsigneeCall"}})],1)]),a("div",{staticClass:"weui-cell selectCity__weui-cell select__weui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showAreaSelect.apply(void 0,arguments)}}},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"area",disabled:!0,value:"",placeholder:"请选择城市"},model:{value:t.areaText,callback:function(e){t.areaText="string"===typeof e?e.trim():e},expression:"areaText"}}),a("span",{staticClass:"icon-arrow icon-arrowRight"})],1)]),a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"xiangxidizhi",placeholder:"请输入详细地址"},model:{value:t.data.Address,callback:function(e){t.$set(t.data,"Address","string"===typeof e?e.trim():e)},expression:"data.Address"}})],1)])])])],1)]),a("div",{staticClass:"bindSection"},[t._m(2),a("div",{staticClass:"bindForm regLogForm onlyIpt__form",staticStyle:{"padding-top":"0","padding-bottom":"0"}},[a("v-uni-form",{attrs:{action:""}},[a("div",{staticClass:"weui-cells selectCity__weui-cell select__weui-cell"},[a("div",{staticClass:"weui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPicker("Gender")}}},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"nianling",disabled:!0,placeholder:"请选择性别"},model:{value:t.data.Gender,callback:function(e){t.$set(t.data,"Gender","string"===typeof e?e.trim():e)},expression:"data.Gender"}}),a("span",{staticClass:"icon-arrow icon-arrowRight"})],1)]),a("div",{staticClass:"weui-cell"},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"number",id:"nianling",placeholder:"请输入你的年龄"},model:{value:t.data.Age,callback:function(e){t.$set(t.data,"Age","string"===typeof e?e.trim():e)},expression:"data.Age"}})],1)]),a("div",{staticClass:"weui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPicker("CreditRating")}}},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"nianling",disabled:!0,placeholder:"请选择信誉等级"},model:{value:t.CreditRating.default,callback:function(e){t.$set(t.CreditRating,"default","string"===typeof e?e.trim():e)},expression:"CreditRating.default"}}),a("span",{staticClass:"icon-arrow icon-arrowRight"})],1)]),a("div",{staticClass:"weui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showPicker("TaobaoValue")}}},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"nianling",disabled:!0,placeholder:"请选择淘气值"},model:{value:t.data.TaobaoValue,callback:function(e){t.$set(t.data,"TaobaoValue","string"===typeof e?e.trim():e)},expression:"data.TaobaoValue"}}),a("span",{staticClass:"icon-arrow icon-arrowRight"})],1)]),a("div",{staticClass:"weui-cell",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showShoppingCategoryWin=!0}}},[a("div",{staticClass:"weui-cell__bd"},[a("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"nianling",disabled:!0,placeholder:"请选择购物类目"},model:{value:t.data.ConsumerCategoryList,callback:function(e){t.$set(t.data,"ConsumerCategoryList","string"===typeof e?e.trim():e)},expression:"data.ConsumerCategoryList"}}),a("span",{staticClass:"icon-arrow icon-arrowRight"})],1)])])])],1)]),t._m(3),a("div",{staticClass:"weui-btn weui-btn-active btn-submit",staticStyle:{margin:"15px 12px 20px"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit.apply(void 0,arguments)}}},[t._v("提交审核")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showShoppingCategoryWin,expression:"showShoppingCategoryWin"}],staticClass:"shade"},[a("div",{staticClass:"shade__content"},[a("div",{staticClass:"shade-item selectBuyTypeShade centerShadeItem"},[t._m(4),a("div",{staticClass:"shade__bd"},[a("ul",{staticClass:"dd_BtnsList li33",attrs:{id:"shoppingcategory"}},t._l(t.ShoppingCategory,(function(e,i){return a("li",{key:i,on:{click:function(a){arguments[0]=a=t.$handleEvent(a),e.status=!e.status}}},[a("div",{staticClass:"outside"},[a("div",{staticClass:"weui-btn",class:{active:e.status}},[t._v(t._s(e.Name))])])])})),0)]),a("div",{staticClass:"shade__ft"},[a("div",{staticClass:"dd_Btns"},[a("div",{staticClass:"weui-btn weui-btn-mini btn-cancle",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showShoppingCategoryWin=!1}}},[t._v("取消")]),a("div",{staticClass:"weui-btn weui-btn-mini btn-sure weui-btn-active",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmShoppingCategory.apply(void 0,arguments)}}},[t._v("确定")])])])])])]),t.areaList.length>0?a("w-picker",{ref:"linkage",attrs:{mode:"linkage",level:3,defaultVal:t.defaultArea,linkList:t.areaList,themeColor:"#5c91f0"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onAreaConfirm.apply(void 0,arguments)}}}):t._e(),a("w-picker",{ref:"pickerList",attrs:{mode:"selector",level:1,defaultVal:t.defaultPicker,selectList:t.pickerList,themeColor:"#5c91f0"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.onConfirm.apply(void 0,arguments)}}})],1)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dd_msgBox bind__msgBox",staticStyle:{padding:"10px 12px"}},[a("p",{staticClass:"title",staticStyle:{"font-size":"15px",color:"#222"}},[t._v("注意事项")]),a("p",[t._v("账号审核时间"),a("span",{staticClass:"color_e40000"},[t._v("（周一至周五09:00-18:00）")]),t._v("，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看"),a("a",{staticClass:"color_e40000",attrs:{href:"taobao_bindexamplespic.html"}},[t._v("截图示例")]),t._v("！")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dd__hd"},[a("h2",{staticClass:"title"},[t._v("账号信息")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dd__hd"},[a("h2",{staticClass:"title"},[t._v("账号属性（与实名认证的身份证信息一致）")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dd__hd",staticStyle:{"padding-top":"0"}},[a("p",{staticClass:"titleMsg color_e40000"},[t._v("花呗：选填，开通花呗账号接单可获得更多佣金")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"shade__hd"},[a("h2",{staticClass:"shade__title"},[t._v("请选择经常购买的3-5个购物类目")])])}];a.d(e,"b",(function(){return s})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}))},"3dd5":function(t,e,a){"use strict";(function(t){var i=a("ee27");a("a15b"),a("d81d"),a("b64b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=a("79a9"),n=i(a("a334")),l=i(a("a6dd")),o={components:{wPicker:l.default},data:function(){return{userId:"",token:"",data:{AccountId:"",PlatAccount:"",ConsigneeName:"",ConsigneeCall:"",ProvinceCode:"",CityCode:"",DistrictCode:"",Address:"",Gender:"",Age:"",CreditRating:"",TaobaoValue:"",ConsumerCategoryList:"",ConsumerCategoryIdList:[]},areaText:"",areaList:[],defaultArea:["广东省","深圳市","龙华新区"],pickerList:[{label:"",value:""}],defaultPicker:"",Gender:{array:[{label:"男"},{label:"女"}],default:"男"},CreditRating:{array:[{label:"1心",val:1},{label:"2心",val:2},{label:"3心",val:3},{label:"4心",val:4},{label:"5心",val:5},{label:"1钻",val:6},{label:"2钻",val:7},{label:"3钻",val:8},{label:"4钻",val:9},{label:"5钻",val:10},{label:"皇冠及以上",val:11}],default:"1心"},TaobaoValue:{array:[{label:"1000以下"},{label:"1000-1500"},{label:"1500-2000"},{label:"2000以上"}],default:"1000以下"},nowSelectVal:"",ShoppingCategory:[],showShoppingCategoryWin:!1}},onLoad:function(t){this.data.AccountId=t.id,this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),this.getAreaList(),this.getData(),this.getShoppingCategory()},onShow:function(){},methods:{getAreaList:function(){var t=this;(0,n.default)().then((function(e){t.areaList=e}))},getData:function(){var t=this;this.data.AccountId&&(0,s.post)("Member/LoadMemberAccountInfo",{UserId:this.userId,Token:this.token,PlatId:1,AccountId:this.data.AccountId}).then((function(e){var a=e.obj;Object.keys(a).map((function(e){t.data[e]=a[e]}))}))},getShoppingCategory:function(){var t=this;(0,s.get)("Member/GetALLShoppingCategory").then((function(e){var a=e.obj;a.map((function(t){t.status=!1})),t.ShoppingCategory=a}))},showAreaSelect:function(){this.areaList.length<1?(0,s.toast)("获取地区失败，请重试！"):this.$refs["linkage"].show()},onAreaConfirm:function(t){this.defaultArea=t.checkArr;var e=this.data;e.ProvinceCode=t.checkValue[0],e.CityCode=t.checkValue[1],t.checkValue[2]&&(e.DistrictCode=t.checkValue[2]),this.areaText=t.checkArr.join(" ")},showPicker:function(t){this.nowSelectVal=t,this.pickerList=this[t].array,this.defaultPicker=this[t].default,this.$refs["pickerList"].show()},onConfirm:function(t){var e=t.checkArr.val||t.checkArr.label;this.data[this.nowSelectVal]=e,this[this.nowSelectVal].default=t.checkArr.label},confirmShoppingCategory:function(){var t=[],e=[];this.ShoppingCategory.map((function(a){a.status&&(t.push(a.Name),e.push(a.Id))})),t.length<5?(0,s.toast)("购物类目不能小于5个"):t.length>8?(0,s.toast)("购物类目不能大于8个"):(this.data.ConsumerCategoryIdList=e.join(","),this.data.ConsumerCategoryList=t.join(","),this.showShoppingCategoryWin=!1)},submit:function(){t("log",this.data.CreditRating," at pages/user/bindtaobao.vue:364");var e=this.check();if(e)(0,s.toast)(e);else{var a=this.data;(0,s.post)("Member/BindOnAccount",{UserId:this.userId,Token:this.token,PlatId:1,AccountId:a.AccountId,PlatAccount:a.PlatAccount,ConsigneeName:a.ConsigneeName,ConsigneeCall:a.ConsigneeCall,ProvinceCode:a.ProvinceCode,CityCode:a.CityCode,DistrictCode:a.DistrictCode,Address:a.Address,Gender:a.Gender,Age:a.Age,CreditRating:a.CreditRating,TaobaoValue:a.TaobaoValue,ConsumerCategoryList:a.ConsumerCategoryIdList}).then((function(t){(0,s.toast)(t.msg,!0),setTimeout((function(){uni.navigateBack()}),1500)}))}},check:function(){var t=this.data;return t.PlatAccount?t.ConsigneeName?t.ConsigneeCall?t.PlatAccount?t.Address?t.Gender?t.Age?t.CreditRating?t.TaobaoValue?!t.ConsumerCategoryList&&"请选择购物类目！":"请选择淘气值！":"请选择信誉等级！":"请输入你的年龄！":"请选择性别！":"请输入详细地址！":"请选择城市！":"请输入联系电话！":"请输入收货人姓名！":"请输入淘宝账号！"}}};e.default=o}).call(this,a("0de9")["log"])},"427c":function(t,e,a){"use strict";a.r(e);var i=a("2fd6"),s=a("6c7d");for(var n in s)"default"!==n&&function(t){a.d(e,t,(function(){return s[t]}))}(n);a("b841");var l,o=a("f0c5"),c=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,"55608db4",null,!1,i["a"],l);e["default"]=c.exports},"602f":function(t,e,a){var i=a("ae96");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("4f06").default;s("3722b837",i,!0,{sourceMap:!1,shadowMode:!1})},"6c7d":function(t,e,a){"use strict";a.r(e);var i=a("3dd5"),s=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=s.a},ae96:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.main[data-v-55608db4]{padding:10px}.shade[data-v-55608db4]{display:block}.shade .shade-item[data-v-55608db4]{display:block}.active[data-v-55608db4]{background:#5c91f0;color:#fff}',""]),t.exports=e},b841:function(t,e,a){"use strict";var i=a("602f"),s=a.n(i);s.a}}]);