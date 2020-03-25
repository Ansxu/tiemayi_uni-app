<template>
	<div>
	    <div class="jiedan-over">
	        <div class="alertMask-main stopTdisplay">
	            <!--<p class="alertMask-main-text stopgetTask">停止接单</p>-->
	            <p class="alertMask-main-text stopgetTask">你还有未操作的任务，请操作后再接其他任务</p>
	        </div>
	    </div>
		<headers>接任务</headers>
	    <div class="rate">
	        <!--fixtop-->
	        <p id="useridd">ID:&nbsp;|&nbsp;完成率100%</p>
	        <p>设置好每个平台的模式，可以组合多个平台同时接单！</p>
	        <p>点击账号可以切换接单账号</p>
	        <a href="javascript:description();;"><img src="/static/image/icons/mark@2x.png"></a>
	    </div>
	
	    <div class="taskTypeBox">
	        <div class="titleHd">
	            <span>选择任务类型</span>
	        </div>
	        <div class="Btns">
	            <a class="btn cur" href="javascript:;">全部</a>
	            <a class="btn" href="javascript:;">垫付任务</a>
	            <a class="btn" href="javascript:;">浏览任务</a>
	        </div>
	    </div>
	    <!-- <div class="taskTypeBox" id="selectMaxMoney">
	        <div class="titleHd">
	            <span>选择垫付金额</span>
	        </div>
	        <input type="text" id="maxMoney" name="maxMoney" value="" />
	    </div> -->
	    <ul class="account_list js-accountList">
			<block v-for="(item,index) in list" :key="index">
				<li class='receiving' v-if="item.IsBind > 0 && item.ReviewStatus == 1">
						<div class='clearfix content'>
							<img :src='item.Logo' class='task_icon pull-left' />
							<div class='discribe pull-left'>
								<p class='task_name '>{{item.AccountName}}</p>
								<p class='task_rate'>今日已接垫付：{{item.DayCountText}}&nbsp;浏览{{item.BrowseDayCount}}/∞单</p>
							</div>
						</div>
						<p class='task_type' data-ifband='true'>{{item.PlatName}}任务</p>
						<img src='/static/image/icons/switch_on@2x.png' class='switch' data-accountId='0' data-platId='0' onclick='switchOnOrOff(this)' />
				</li>
				<li class="clearfix"  v-else>
					<img :src="item.Logo" class="account_icon pull-left">
					<p class="account_name">添加{{item.PlatName}}账号</p>
				</li>
			</block>
	    </ul>
	    <div style="height:60px"></div>
	    <div class="text-center joint_task">
	        <p class="text-center timer-c"></p>
	        <img class="js-jointTask" src="/static/image/icons/jiedan@2x.png">
	        <span style="position: absolute;top:52%;left: 50%;transform:translate(-50%,-30%);color: #fff;font-size: 13px"></span>
	    </div>
	
	    <div class="new_task modal-in">
	        <!-- <div class="icon text-center"> -->
	        <div class="icon clearfix">
	            <img src="/static/image/icons/lamp@2x.png" class="pull-left">
	            <p class="pull-left">来任务啦~</p>
	        </div>
	        <ul class="task_describ">
	            <li class="clearfix">
	                <p class="title_name pull-left">任务类型：</p>
	                <p class="main_container pull-right">手机淘宝垫付任务</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">垫付金额：</p>
	                <p class="main_container pull-right">535元</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">任务佣金：</p>
	                <p class="main_container pull-right">6.6金</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">任务限时：</p>
	                <p class="main_container pull-right">90分钟</p>
	            </li>
	        </ul>
	        <div class="task_ok">确认</div>
	    </div>
	    <div class="alertMask js-alertMask dis">
	        <div class="alertMask-bj">
	        </div>
	        <div class="alertMask-main">
	            <p class="alertMask-main-text js-alertMask-text">加载中...</p>
	        </div>
	
	    </div>
	</div>
</template>

<script>
import {get,post,toast} from '@/utils';
export default {
    data(){
        return {
			userId:'',
			token:'',
			isVerification:false,//是否有已绑定的账号
			selectAccountId:0,
			selectPlatformId:0,
			list:[],//平台全部任务列表
		}
	},
    onLoad(options){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
        this.selectAccountId = options.selectAccountId||0;
        this.selectPlatformId = options.selectPlatformId||0;
		this.getAllPlatFormAccount();
		this.getCompletionRate();
    },
    onShow(){

    },
    methods:{
		// 查询账号是否满足接单条件
		// 获取平台全部任务
		getAllPlatFormAccount(){
			post('Member/GetSysSendTaskAccount',{
                UserId: this.userId,
                Token: this.token,
                SelectAccountId: this.selectAccountId,
                SelectPlatFormId: this.selectPlatformId
			}).then(res=>{
				const data = res.obj;
				data.map(item=>{
					const name = item.PlatName;
					if(item.IsBind > 0 && item.ReviewStatus === 1){
						this.isVerification = true;//是否已绑定账号
						item.status = true;//是否已绑定账号
					}else{
						item.status = false;//是否已绑定账号
						item.PlatName = '绑定' + name + '账号';
					}
				})
				this.list= data;
				//  如果没有一个绑定过的账号
				if(!this.isVerification){
					uni.showModal({
						title:'没有绑定账号或账号未审核！',
						success(e){
							uni.navigateBack();
						}
					})
				}
			})
		},
		getCompletionRate(){
			post('Member/GetCompletionRate',{
                UserId: this.userId,
                Token: this.token
			}).then(res=>{
				// this.list= res.obj;
			})
		}
	}

}
</script>

<style scoped lang="scss">
	@import '../../css/ion_rangeslider.css';
	@import '../../css/ion_rangeslider_skinhtml5.css';
	@import '../../css/taskreceiving.css';
	
	@-webkit-keyframes circle {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	.header {
		background-color: #f7f7f7;
	}

	@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
		.header {
			height: 88px;
			padding-top: env(safe-area-inset-top);
			padding-top: constant(safe-area-inset-top);
		}
		.header a {
			position: relative;
			top: 44px;
		}
	}
</style>
