(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-bindalbb"],{"17f2":function(t,i,e){"use strict";var n={"simple-address":e("f239").default},s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"bg_f8f8f8"},[t._m(0),e("div",{staticClass:"main"},[e("div",{staticClass:"dd_msgBox bind__msgBox",staticStyle:{padding:".1rem .12rem"}},[e("p",{staticClass:"title",staticStyle:{"font-size":".15rem",color:"#222"}},[t._v("注意事项")]),e("p",[t._v("账号审核时间"),e("span",{staticClass:"color_e40000"},[t._v("（周一至周五09:00-18:00）")]),t._v("，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看"),e("v-uni-view",{staticClass:"color_e40000",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUrl("user/jd_bindexamplespic")}}},[t._v("截图示例")]),t._v("！")],1)]),e("div",{staticClass:"bindSection"},[t._m(1),e("div",{staticClass:"bindForm regLogForm onlyIpt__form",staticStyle:{"padding-top":"0","padding-bottom":"0"}},[e("v-uni-form",{attrs:{action:""}},[e("div",{staticClass:"weui-cells"},[e("div",{staticClass:"weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"accountName",placeholder:"请输入账号"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.jdName.apply(void 0,arguments)}}})],1)]),e("div",{staticClass:"weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"shouhuoren",placeholder:"收货人姓名"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.shouhuoren.apply(void 0,arguments)}}})],1)]),e("div",{staticClass:"weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"lianxidianhua",placeholder:"联系电话"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.lianxidianhua.apply(void 0,arguments)}}})],1)]),e("div",{staticClass:"weui-cell selectCity__weui-cell select__weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"area",value:t.pickerText,placeholder:"请选择城市"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.openAddres.apply(void 0,arguments)}}}),e("span",{staticClass:"icon-arrow icon-arrowRight"})],1)]),e("simple-address",{ref:"simpleAddress",attrs:{pickerValueDefault:t.cityPickerValueDefault},on:{onConfirm:function(i){arguments[0]=i=t.$handleEvent(i),t.onConfirm.apply(void 0,arguments)}}}),e("div",{staticClass:"weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"xiangxidizhi",placeholder:"请输入详细地址"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.xiangxidizhi.apply(void 0,arguments)}}})],1)])],1)])],1)]),e("div",{staticClass:"bindSection"},[t._m(2),e("div",{staticClass:"bindForm regLogForm onlyIpt__form",staticStyle:{"padding-top":"0","padding-bottom":"0"}},[e("v-uni-form",{attrs:{action:""}},[e("div",{staticClass:"weui-cells"},[e("div",{staticClass:"weui-cell selectSex__weui-cell select__weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("select",{staticClass:"weui-input",attrs:{name:"",id:"sexId"}},[e("option",{attrs:{value:"0"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.sex(0)}}},[t._v("请选择性别")]),e("option",{attrs:{value:"1"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.sex(1)}}},[t._v("男")]),e("option",{attrs:{value:"2"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.sex(2)}}},[t._v("女")])])])]),e("div",{staticClass:"weui-cell"},[e("div",{staticClass:"weui-cell__bd"},[e("v-uni-input",{staticClass:"weui-input",attrs:{type:"text",id:"nianling",placeholder:"请输入你的年龄"},on:{input:function(i){arguments[0]=i=t.$handleEvent(i),t.nianling.apply(void 0,arguments)}}})],1)])])])],1)]),e("div",{staticClass:"bindSection"},[e("div",{staticClass:"dd__hd"},[e("span",{staticClass:"titleMsg"},[t._v("点击上传图片(上传后，长按看大图，点击可更换图片）")]),e("v-uni-view",{staticClass:"lookExamples color_e40000",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goUrl("user/jd_bindexamplespic")}}},[t._v("查看截图示列")])],1),e("ul",{staticClass:"dd_piclist li25"},[e("li",[e("div",{staticClass:"outside"},[e("div",{staticClass:"img"},[e("div",{staticClass:"upimg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getpic(0)}}},[e("v-uni-image",{staticClass:"uploadImg",attrs:{src:t.pic1},on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.bigImg(t.pic1)}}})],1),e("v-uni-input",{attrs:{type:"hidden",id:"pic0",readonly:"true"}})],1),e("p",{staticClass:"title"},[t._v("账号用户名")])])]),e("li",[e("div",{staticClass:"outside"},[e("div",{staticClass:"img"},[e("div",{staticClass:"upimg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getpic(1)}}},[e("v-uni-image",{staticClass:"uploadImg",attrs:{src:t.pic2},on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.bigImg(t.pic2)}}})],1),e("v-uni-input",{attrs:{type:"hidden",id:"pic1",readonly:"true"}})],1),e("p",{staticClass:"title"},[t._v("账号等级")])])]),e("li",[e("div",{staticClass:"outside"},[e("div",{staticClass:"img"},[e("div",{staticClass:"upimg",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getpic(2)}}},[e("v-uni-image",{staticClass:"uploadImg",attrs:{src:t.pic3},on:{longpress:function(i){arguments[0]=i=t.$handleEvent(i),t.bigImg(t.pic3)}}})],1),e("v-uni-input",{attrs:{type:"hidden",id:"pic2",readonly:"true"}})],1),e("p",{staticClass:"title"},[t._v("采购名片")])])])])]),e("v-uni-view",{staticClass:"weui-btn weui-btn-active btn-submit",staticStyle:{margin:".15rem .12rem .2rem"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.submit.apply(void 0,arguments)}}},[t._v("提交审核")])],1)])},a=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"h45"},[e("div",{staticClass:"head bb_border"},[e("a",{staticClass:"btn_back",attrs:{href:"javascript:api.closeWin();"}}),e("div",{staticClass:"title center"},[t._v("绑定阿里巴巴账号")])])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"dd__hd"},[e("h2",{staticClass:"title"},[t._v("账号信息")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"dd__hd"},[e("h2",{staticClass:"title"},[t._v("账号属性（与实名认证的身份证信息一致）")])])}];e.d(i,"b",function(){return s}),e.d(i,"c",function(){return a}),e.d(i,"a",function(){return n})},"1db2":function(t,i,e){"use strict";e.r(i);var n=e("3034"),s=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,function(){return n[t]})}(a);i["default"]=s.a},3034:function(t,i,e){"use strict";var n=e("288e");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,e("a481");var s=e("99ab"),a=e("79a9"),c=n(e("f239")),o={data:function(){return{goUrl:a.goUrl,cityPickerValueDefault:[0,0,0],accountId:0,name:"",receiver:"",contactNum:"",age:"",jdvalue:"",address:"",pickerText:"",sexId:0,pic1:"",pic2:"",pic3:"",pic4:"",ProvinceCode:"",CityCode:"",DistrictCode:"",UserCenterImg:"",AccountLevelImg:"",VerifiedImg:""}},components:{simpleAddress:c.default},onLoad:function(t){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),console.log(t),this.accountId=t.id?0:t.id,this.accountId&&(this.accountId=t.id,this.init(this.accountId))},onShow:function(){},methods:{init:function(t){(0,a.post)("Member/LoadMemberAccountInfo",{UserId:this.userId,Token:this.token,PlatId:3,AccountId:t}).then(function(t){console.log(t)})},jdName:function(t){this.name=t.detail.value},shouhuoren:function(t){this.receiver=t.detail.value},lianxidianhua:function(t){this.contactNum=t.detail.value},xiangxidizhi:function(t){this.address=t.detail.value},nianling:function(t){this.age=t.detail.value},xydj:function(t){this.jdvalue=t.detail.value},openAddres:function(){this.cityPickerValueDefault=[0,0,0],this.$refs.simpleAddress.open()},onConfirm:function(t){var i=this;this.pickerText=t.label;var e=this.pickerText.replace("-"," ");e=e.replace("-"," "),console.log(this.pickerText),(0,a.post)("Area/AreaByCode",{AreaText:e}).then(function(t){console.log(t),i.ProvinceCode=t.obj.provinceCode,i.CityCode=t.obj.cityCode,i.DistrictCode=t.obj.districtCode})},sex:function(t){this.sexId=t},getpic:function(t){console.log(t);var i=t,e="",n=this;uni.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){(0,s.pathToBase64)(t.tempFilePaths[0]).then(function(s){e=s,console.log(s),0==i?(n.pic1=t.tempFilePaths[0],n.UserCenterImg=e):1==i?(n.pic2=t.tempFilePaths[0],n.AccountLevelImg=e):2==i&&(n.pic3=t.tempFilePaths[0],n.VerifiedImg=e)}).catch(function(t){})}})},bigImg:function(t){var i=[];return i.push(t),console.log(i),!1},submit:function(){var t=/^[0-9]\d*$/;return""==this.name?(uni.showToast({title:"必须填写平台的账号",icon:"none"}),!1):""==this.receiver?(uni.showToast({title:"必须填写收货人",icon:"none"}),!1):""==this.contactNum?(uni.showToast({title:"必须填写联系电话",icon:"none"}),!1):""==this.pickerText?(uni.showToast({title:"必须选择省市区",icon:"none"}),!1):""==this.address?(uni.showToast({title:"必须填写收货详细地址",icon:"none"}),!1):""==this.sex?(uni.showToast({title:"必须选择性别",icon:"none"}),!1):""==this.age?(uni.showToast({title:"必须填写年龄",icon:"none"}),!1):t.test(this.age)?""==this.pic1?(uni.showToast({title:"必须上传阿里巴巴账户图片",icon:"none"}),!1):""==this.pic2?(uni.showToast({title:"必须上传账户等级图片",icon:"none"}),!1):""==this.pic3?(uni.showToast({title:"必须上传采购名片图片",icon:"none"}),!1):void(0,a.post)("Member/BindOnAccount",{UserId:this.userId,Token:this.token,PlatId:4,PlatAccount:this.name,ConsigneeName:this.receiver,ConsigneeCall:this.contactNum,ProvinceCode:this.ProvinceCode,CityCode:this.CityCode,DistrictCode:this.DistrictCode,Address:this.address,Gender:this.sex,Age:this.age,UserCenterImg:this.UserCenterImg,AccountLevelImg:this.AccountLevelImg,VerifiedImg:this.VerifiedImg}).then(function(t){0==t.errcode&&uni.showToast({title:t.msg,icon:"none",success:function(){setTimeout(function(){uni.redirectTo({url:"./bindlist"})},1500)}})}):(uni.showToast({title:"请输入正确的年龄数值",icon:"none"}),!1)}}};i.default=o},"3f6a":function(t,i,e){"use strict";e.r(i);var n=e("17f2"),s=e("1db2");for(var a in s)"default"!==a&&function(t){e.d(i,t,function(){return s[t]})}(a);e("65a2");var c,o=e("f0c5"),l=Object(o["a"])(s["default"],n["b"],n["c"],!1,null,"72f12664",null,!1,n["a"],c);i["default"]=l.exports},5738:function(t,i,e){var n=e("b2b1");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var s=e("4f06").default;s("64e66650",n,!0,{sourceMap:!1,shadowMode:!1})},"65a2":function(t,i,e){"use strict";var n=e("5738"),s=e.n(n);s.a},b2b1:function(t,i,e){i=t.exports=e("2350")(!1),i.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.uploadImg[data-v-72f12664]{width:100%;height:100%}.color_e40000[data-v-72f12664]{display:inline-block}',""])}}]);