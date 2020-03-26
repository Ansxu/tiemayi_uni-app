<template>
	<div>
		<headers>接任务</headers>
	    <div class="rate">
	        <!--fixtop-->
	        <p id="useridd">ID:{{userId}}&nbsp;|&nbsp;完成率{{completionRate}}</p>
	        <p>设置好每个平台的模式，可以组合多个平台同时接单！</p>
	        <p>点击账号可以切换接单账号</p>
	        <div @click="ontips"><img src="/static/image/icons/mark@2x.png"></div>
	    </div>
	
	    <div class="taskTypeBox">
	        <div class="titleHd">
	            <span>选择任务类型</span>
	        </div>
	        <div class="Btns">
	            <p class="btn" :class="{'cur':TaskType===0}" @click="TaskType=0">全部</p>
	            <p class="btn" :class="{'cur':TaskType===1}" @click="TaskType=1">垫付任务</p>
	            <p class="btn" :class="{'cur':TaskType===2}" @click="TaskType=2">浏览任务</p>
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
							<img :src='item.Logo' class='task_icon pull-left'/>
							<div class='discribe pull-left'>
								<p class='task_name '>{{item.AccountName}}</p>
								<p class='task_rate'>今日已接垫付：{{item.DayCountText}}&nbsp;浏览{{item.BrowseDayCount}}/∞单</p>
							</div>
						</div>
						<p class='task_type' data-ifband='true'>{{item.PlatName}}任务</p>
						<img src='/static/image/icons/switch_on@2x.png' v-show="item.status" class='switch' @click="item.status=false" />
						<img src='/static/image/icons/switch_off@2x.png' v-show="!item.status" class='switch'  @click="item.status=true" />
				</li>
				<li class="clearfix"  v-else>
					<img :src="item.Logo" class="account_icon pull-left">
					<p class="account_name">添加{{item.PlatName}}账号</p>
				</li>
			</block>
	    </ul>
	    <div style="height:60px"></div>
	    <div class="text-center joint_task" >
	        <p class="text-center timer-c " v-show="tasking">{{taskTimeend}}</p>
			<!-- 取消接单 -->
	        <img class="js-jointTask circle"  v-if="tasking" @click="closeTask" src="/static/image/icons/jiedaning_noword@2x.png">
			<!-- 开始接单 -->
	        <img class="js-jointTask jiedan-no"  v-else @click="submit" src="/static/image/icons/jiedan@2x.png">
	        <span class="text-c" v-show="tasking" @click="closeTask">接单</span>
	    </div>
		<div class="mask" v-if="tasking"></div>
	    <div class="new_tasks modal-in" v-if="taskOrder.TaskAcceptNo">
	        <!-- <div class="icon text-center"> -->
			<div class="newTask-content">
				<div class="clearfix-top">
					<img src="/static/image/icons/lamp@2x.png" class="pull-left">
					<p class="pull-left">来任务啦~</p>
				</div>
				<ul class="task_describ">
					<li class="clearfix">
						<p class="title_name pull-left">任务类型：</p>
						<p class="main_container pull-right">{{taskOrder.PlatType}}</p>
					</li>
					<li class="clearfix">
						<p class="title_name pull-left">垫付金额：</p>
						<p class="main_container pull-right">{{(taskOrder.AdvancePaymentMoney<1)?'无需垫付':taskOrder.AdvancePaymentMoney+'元'}}</p>
					</li>
					<li class="clearfix">
						<p class="title_name pull-left">任务佣金：</p>
						<p class="main_container pull-right">{{taskOrder.TaskCommission}}金</p>
					</li>
					<li class="clearfix">
						<p class="title_name pull-left">任务限时：</p>
						<p class="main_container pull-right">{{taskOrder.OperationCountdown}}分钟</p>
					</li>
				</ul>
				<div class="task_ok" @click="taskOk">确认</div>
			</div>
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
			completionRate:'',//任务完成率
			isVerification:false,//是否有已绑定的账号
			selectAccountId:0,
			selectPlatformId:0,
			list:[],//平台全部任务列表
			TaskType:0,//任务类型，0全部，1垫付任务，2浏览任务
			MaxAdvancePayMoney:500,
			tasking:false,//是否开始接单
			taskTimeend:'00:00:00',//接单倒计时
			taskTimeFn:null,//接单倒计时
			taskTimeout:null,//接单请求倒计时，用于多次点击开始接单状态错乱，倒计时未停止问题
			//接到的单
			taskOrder:{
				TaskAcceptNo:'',
				PlatType:'',
				AdvancePaymentMoney:'',
				TaskCommission:'',
				OperationCountdown:'',
			}
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
				data.map((item,index)=>{
					const name = item.PlatName;
						index===0?(item.status = true):(item.status = false);//选中第一个接单平台
					if(item.IsBind > 0 && item.ReviewStatus === 1){
						this.isVerification = true;//是否已绑定账号
					}else{
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
				this.completionRate = res.obj;
			})
		},
		// 点击接单
		submit(){
			if(this.tasking) return;//如果已点击了接单
			this.tasking = true;
			let AccountIdList=[],PlatIdList=[];
			this.list.map(item=>{
				if(item.status){
					AccountIdList.push(item.AccountId);
					PlatIdList.push(item.PlatId);
				}
			})
			if(AccountIdList.length<1||PlatIdList.length<1){
				this.tasking = false;
				toast('请先选择接单账号！');
				return;
			}
			let h = 0;
            let m = 0;
            let s = 0;
            this.taskTimeFn = setInterval(()=> {
                if (s == 59) {
                    m++;
                    s = 0;
                } else
                    s++;
                if (m == 59) {
                    h++;
                    m = 0;
                }
				let str = (h > 9 ? h : "0" + h) + ":" + (m > 9 ? m : "0" + m) + ":" + (s > 9 ? s : "0" + s);
				this.taskTimeend = str;
            }, 1000);
			this.taskTimeout = setTimeout(()=>{
				this.sendTask(AccountIdList,PlatIdList)
			},7000);
		},
		// 接任务
		sendTask(AccountIdList,PlatIdList){
			post('Task/NewsSystemSendTask',{
				UserId: this.userId,
				Token: this.token,
				AccountIdList: AccountIdList.join(','),
				PlatIdList: PlatIdList.join(','),
				TaskType: this.TaskType,//任务类型，0全部，1垫付任务，2浏览任务
				MaxAdvancePayMoney: this.MaxAdvancePayMoney
			}).then(res=>{
				this.taskOrder = res.obj;
				this.closeTask();
			}).catch(err=>{
				this.closeTask();
				if(err.errcode===3){
					toast('你还有未操作的任务，请操作后再接其他任务！')
				}
			})
		},
		// 取消接任务
		closeTask(){
			clearInterval(this.taskTimeFn);
			clearTimeout(this.taskTimeout);
			this.tasking = false;
			this.taskTimeend='00:00:00';
		},
		// 确认任务
		taskOk(){
			this.taskOrder.TaskAcceptNo='';
			goUrl('task/selectoperation',{taskId:this.taskOrder.TaskAcceptNo})
		},
		ontips(){
			uni.showModal({
				title:'注意！',
				content:'后台根据用户资料，系统自动派单！垫付任务每个平台账号每天限制接4-6单，接满之后自动下线。如果开通VIP，自动切换下一个账号接单，每天0点后已下线的账号会自动上线。如果需要做浏览任务，比如：点击接单按钮，账号已下线，请移步到APP首页-全部任务-浏览任务-选择账号-立刻抢单！浏览任务接单数量不限制！'
			})
		}
	}

}
</script>

<style scoped lang="scss">
	@import '../../css/ion_rangeslider.css';
	@import '../../css/ion_rangeslider_skinhtml5.css';
	@import '../../css/taskreceiving.css';
	
	@keyframes circle{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
	@-webkit-keyframes circle{
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
	.circle{
		animation:circle 1s infinite linear;
		-webkit-animation:circle 1s infinite linear;
	}
	.joint_task{
		flex-flow:column nowrap;
		z-index:100;
		p{
			color:#fff;
		}
		.timer-c{
			height:30px;
		}
		.text-c{
			width:100%;
			height:60px;
			line-height:60px;
			text-align:center;
			top:30px;
			left:0;
			position: absolute;
			color: #fff;
			font-size: 13px;
		}
		.jiedan-no{
			width:56px;
			height:56px;
		}
	}
	.mask{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.6);
		z-index:99;
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
	.new_tasks{
		position:fixed;
		top:0;
		left:0;
	}
	.new_tasks{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,.6);
		z-index:101;
		.newTask-content{
			background:#fff;
			width:80%;
			margin:80px auto;
			border-radius:8px;
			padding:20px 10px;
			.clearfix-top{
				display:flex;
				align-items:center;
				justify-content:center;
				img{
					width:60px;
					height:60px;
					margin-right:10px;
				}
			}
		}
	}
</style>
