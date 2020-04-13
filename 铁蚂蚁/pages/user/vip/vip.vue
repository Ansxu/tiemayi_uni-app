<template>
    <div>
        <!-- <div class="h45">
            <div class="head bb_border">
                <a href="../member.html" class="btn_back"></a>
                <div class="title center">加入VIP</div>
            </div>
        </div> -->
		<headers>加入VIP</headers>
        <div class="main" v-if="!mark">
            <div class="joinVIP" style="border-top:none;">
                <div class="joinVIP_section">
                    <div class="joinVIP_section__hd">
                        <p class="title">加入铁蚂蚁VIP<br />享受账号垫付任务</p>
                    </div>
                    <div class="joinVIP_section__bd">
                        <div class="con">
                            <h2 class="title">入会须知：</h2>
                            <p>1、铁蚂蚁等级满LV1
                                <br /> 2、VIP可以每个平台多绑定一个账号，每天可以做更多的任务
                                <br /> 3、高度的责任心，避免串号
                                <br /> 4、在账号信息中会员，每个平台最多可绑定2个账号
                                <br /> 5、到期之后请续费，否则会员资格自动取消
                                <br /> 6、会员中途不得以任何理由要求退回管理费
                            </p>
                        </div>
                    </div>
                </div>
                <div class="joinVIP_section">
                    <div class="joinVIP_section__bd">
                        <!-- <script id="gradeListTemp2" type="text/x-dot-template">
                            {{~it:value:index}} {{=value.Remark}}
                            <br /> {{~}}
                        </script> -->
                        <div class="con">
                            <h2 class="title">收费方式：</h2>
                            <p id="vipitem"></p>
                            <p>费用一次性从佣金账户扣除，余额不够请先做任务赚金请认真阅读以上要点</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--底部-->
        <div class="dd_footer VIP__dd_footer" v-if="!mark">
            <div class="inner">
                <div class="dd_Btns flex flexAlignCenter justifyCenter">
                    <div class="weui-btn weui-btn-active" id="btn-joinVIP" @tap="joinVip" >同意加入</div>
                </div>
            </div>
        </div>
        <!--选择套餐弹窗-->
      <div class="joinVIP" style="border-top:none;" v-if="mark">
          <div class="selectSetMeal">
              <div class="selectSetMeal__hd">
                  <h2 class="title">选择VIP套餐</h2>
              </div>
              <!--  循环 -->
              <!-- <script id="gradeListTemp" type="text/x-dot-template">
                  {{~it:value:index}}
                  <li value={{=value.VipPrice}} name={{=value.VipName}} index={{=value.Id}}>
                      <div class="outside">
                          <div class="weui-btn">{{=value.VipName}}</div>
                      </div>
                  </li>
                  {{~}}
              </script> -->
              <div class="selectSetMeal__bd">
                  <ul class="setMealList dd_BtnsList li50" id="vipselect" v-for="(item,index) in data" :key="index">
      				<li @click="setMealList(item.VipPrice,item.VipName,item.Id,index)" :class="i==index? 'active':''">
      					<div class="outside">
      						<div class="weui-btn">{{item.VipName}}</div>
      					</div>
      				</li>
                  </ul>
              </div>
              <div class="selectSetMeal__ft">
                  <div class="weui-btn weui-btn-active btn-pay" id="btn-pay" @click.stop="btnPay">{{str}}</div>
              </div>
          </div>
      </div>
       
		<!--选择套餐弹窗 end-->

        <!-- <script type="text/javascript">
                $(function() {
                    joinVIPHeight();

                    function joinVIPHeight() {
                        var screenHeight = $(window).innerHeight();
                        var objOffsetTop = $('.joinVIP').offset().top;
                        $('.joinVIP').css({
                            "minHeight": screenHeight - objOffsetTop + 'px'
                        })
                    }

                    //加入
                    $('#btn-joinVIP').click(function() {
                        $('html,body').css({
                            "overflow": "hidden"
                        });
                        $('.selectSetMealPage').show();
                    });
                    //关闭选择套餐
                    $('.allScreenPage .btn_back').click(function(){
                        $(this).parents(".allScreenPage").hide();
                        $('html,body').css({
                            "overflow": "inherit"
                        });
                    });
                    //选择套餐
                    $('.setMealList').on("click", "li", function() {
                        $(this).addClass("active").siblings("li").removeClass("active");
                        var price= $(this).val();
                        var str="立即支付"+price+"金";
                        $('#btn-pay').html(str);

                    });
                    //付款
                    $('#btn-pay').click(function() {
                        layer.open({
                            title: [
                                '温馨提醒',
                                'background-color: #5c91f0; color:#fff;'
                            ],
                            content: '<p>您购买铁蚂蚁3个月套餐，<br/>需支付80金币</p>',
                            btn: ['取消', '确定'],
                            yes: function(index) {
                                //确定执行的事件
                            },
                            no:function(index){
                                //取消执行的事件
                            }
                        });
                    });

                });
            </script> -->
    </div>
</template>

<script>
import {get , post} from '@/utils';
export default {
    data(){
        return {
			userId:'',
			token:'',
			data:{},
			mark:false,
			str:'选择VIP套餐',
			price:'',
			name:'',
			id:'',
			i:null
        }
    },
   onLoad(){
   	this.userId = uni.getStorageSync("userId");
   	this.token = uni.getStorageSync("token");
   	// console.log(this.data)
   	this.init()
   },
   onShow(){
   	  if (
   		  this.userId !== uni.getStorageSync("userId") ||
   		  this.token !== uni.getStorageSync("token")
   		) {
   		  this.userId = uni.getStorageSync("userId");
   		  this.token = uni.getStorageSync("token");
   		}
   },
    methods:{
		init(){
			get('Money/GetVIPList').then(res => {
				console.log(res)
				this.data=res.obj
			})
		},
		// 打开弹窗
		joinVip(){
			console.log(123)
			this.mark=true
		},
		setMealList(price,name,id,i){
			this.price=price
			this.name=name
			this.id=id
			this.i=i
			this.str="立即支付" +this.price + "金"
		},
		btnPay(){
			let that =this
			uni.showModal({
				
				title:'温馨提示',
				content:'您购买旺店宝' + this.name + '套餐,需支付' + this.price + '金币',
				 success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							post('Money/UserBuyVIP',{
								 UserId: that.userId,
								 Token: that.token,
								 SetMealId: that.id
							}).then(res =>{
								console.log(res)
								if(res.errcode==1){
									uni.showToast({
										title:res.msg,
										success() {
											uni.redirectTo({
												url:'../menber'
											})
										}
									})
								}
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
			})
		}
    }
}
</script>

<style lang="scss" scoped>
    .allScreenPage {
        display: block;
    }
	.joinVIP{
		padding: 39px 12px;
	}
</style>