(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-commision-commision"],{"084e":function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bg_f8f8f8"},[i("div",{staticClass:"h45"},[i("div",{staticClass:"head bb_border"},[i("p",{staticClass:"btn_back",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.backUrl.apply(void 0,arguments)}}}),i("div",{staticClass:"title center"},[t._v("佣金收益")]),i("p",{staticClass:"icon_r txt",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goUrl("./withdraw")}}},[t._v("提现")])])]),i("div",{staticClass:"main"},[i("div",{staticClass:"commisionTop"},[i("p",{staticClass:"title"},[t._v("累计佣金（金）")]),i("p",{staticClass:"price"},[i("span",{staticClass:"num",attrs:{id:"commisionvalue"}},[t._v(t._s(t.Amount))]),t._v("金")])]),i("div",{staticClass:"conPageBox"},[t.RecordDetail.length<1?i("div",{staticClass:"conPage noConPage"},[t._m(0)]):t._e(),i("div",{staticClass:"conPage hasConPage"},t._l(t.RecordDetail,function(e,n){return i("ul",{key:n,staticClass:"commisionList"},[i("li",[i("div",{staticClass:"title"},[t._v(t._s(e.Remark))]),i("div",{staticClass:"flex"},[i("div",{staticClass:"flexItem flex1"},[i("p",{staticClass:"time"},[t._v(t._s(t.editTime(e.AddTime,"time")))])]),i("p",{staticClass:"price"},[t._v(t._s(e.Change)+" 金")])])])])}),0)])])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"noCon"},[i("div",{staticClass:"iconImg"},[i("img",{attrs:{src:"/static/image/icons/nodataicon.png",alt:""}})]),i("p",{staticClass:"msg"},[t._v("暂时没有相关数据")])])}];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n})},4457:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i("79a9"),a={data:function(){return{editTime:n.editTime,userId:"",token:"",pageSize:10,pageNo:1,RecordDetail:[],FrozenAmount:0,Amount:0}},onLoad:function(){this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"),this.getWalletLogList()},onShow:function(){this.userId===uni.getStorageSync("userId")&&this.token===uni.getStorageSync("token")||(this.userId=uni.getStorageSync("userId"),this.token=uni.getStorageSync("token"))},onReachBottom:function(){this.pageNo++,this.getWalletLogList()},methods:{getWalletLogList:function(){var t=this,e=this;(0,n.post)("Money/GetWalletLogList",{UserId:this.userId,Token:this.token,Page:this.pageNo,PageSize:this.pageSize,WalletType:1,Type:0,IsNewMonth:1}).then(function(i){var n=i.obj;if(t.Amount=n.Amount,t.FrozenAmount=n.FrozenAmount,e.pageNo>1){if(0==n.RecordDetail.length)return void uni.showToast({title:"全部加载完成",icon:"none"});e.RecordDetail=e.RecordDetail.concat(n.RecordDetail)}else 1==e.pageNo&&(e.RecordDetail=n.RecordDetail);console.log(e.RecordDetail)})},goUrl:function(t){uni.navigateTo({url:t})},backUrl:function(){uni.navigateBack({delta:1})}}};e.default=a},"4cc6":function(t,e,i){"use strict";i.r(e);var n=i("084e"),a=i("55ef");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);var o,c=i("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"110897a6",null,!1,n["a"],o);e["default"]=r.exports},"55ef":function(t,e,i){"use strict";i.r(e);var n=i("4457"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a}}]);