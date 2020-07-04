<template>
	<view>
			<headers>商家邀请</headers>
		    <div class="main">
		        <p style="text-align:center;color:#333;padding-top:100upx;font-size:36upx;font-weight:bold;">邀请商家请联系招商对接</p>
		        <div class="img-box">
		          <img :src="data.ZhaoShangCustomerQRcode" alt="" class="wxcode">
		        </div>
		        <!-- <p style="text-align:center;color:#666">微信号:dh136064747438</p> -->
		        <div class="Promotion-rule mb10">
		            <div class="rulehd"><span>活动规则</span></div>
		            <div class="rulelist">
		                <ul>
		                    <li>1、 邀请商家注册请添加招商对接人微信</li>
		                    <li>2、任务状态变成已完成才算完成一单</li>
		                    <li>3、例如您邀请的商家每天放任务100单每单10金佣金来计算，您最少返点每天50金，每月可获得最少1500金收入。</li>
		                </ul>
		            </div>
		        </div>
		    </div>
	</view>
</template>

<script>
	import { get, post, goUrl, toast, editTime } from "@/utils";
	export default {
		data() {
			return {
				data:{}
			}
		},
		onLoad() {
			this.getSysConfig()
		},
		methods: {
			getSysConfig() {
			  get("SysConfig/GetSysConfig",{}).then(res => {
			    this.data = res.obj;
			  });
			},
		}
	}
</script>

<style>
@import '@/css/global.css';
@import '@/css/style.css';
.img-box{
	width: 300upx;
	height: 300upx;
	margin: 100upx auto 60upx;
	border: 1px solid #ededed;
	box-sizing: border-box;
	padding: 10upx;
	border-radius: 20upx;
	box-shadow: 0 0 5px 5px #ededed;
  }
  .img-box img{
	width: 280upx;
	height: 280upx
  }
</style>
