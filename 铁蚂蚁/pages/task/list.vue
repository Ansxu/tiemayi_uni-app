<template>
	<div class="bg_gray">
		<div class="h45">
			<div class="head bb_border">
				<p @click="back" class="btn_back"></p>
				<div class="title center">全部任务</div>
				<p  id="accountName" class="icon_r txt">{{data.PlatAccount}}</p>
			</div>
		</div>
		<div class="main" name="dropDownRefresh">
			<div class="df_taskList bg_fff">
				<ul id="taskList">
					<li v-for="(item,index) in list" :key="index">
						<div class="box">
							<div class="box-left">
								<div class="title"><span class="rb">{{item.CommissionAvailable}}</span><span class="txt">金{{item.TaskType == 1 ? "垫付任务" : "浏览任务"}}</span></div>
								<p class="text">ID:{{item.TaskListNo}}</p>
							</div>
							<div class="box-right">
								<p @click="ConfirmationTask(item.TaskListNo)" class="btn">立即抢单</p>
								<span>{{item.AdvancePaymentMoney}}元</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	<div class="taskinfo" v-if="newTask.TaskAcceptNo">
		<div class="content">
			<h3>来任务啦</h3>
			<ul>
				<li><p class="text">任务类型</p><span>{{newTask.PlatType}}</span></li>
				<li v-if="newTask.AdvancePaymentMoney > 0">
					<p class="text">垫付金额</p><span>{{newTask.AdvancePaymentMoney}}元</span>
				</li>
				<li><p class="text">任务佣金</p><span>{{newTask.TaskCommission}}金币</span></li>
				<li><p class="text">时间限制</p><span>{{newTask.OperationCountdown}}分钟</span></li>
			</ul>
			<div class="newTaskBtn" @click="newTaskOk(newTask.TaskAcceptNo)">确认</div>
		</div>
    </div>
		<notData :list="list" :showNotData="notData"></notData>
	</div>
</template>

<script>
import {post,get,toast,goUrl} from '@/utils';
import notData from '@/components/bottomNotData.vue';
export default {
	components:{notData},
    data(){
        return {
			userId:'',
			token:'',
			PlatformId: '',
			AccountId: '',
			TaskType: '',
			page:1,
			pageSize:12,
			notData:false,
			list:[],
			data:{},
			newTask:{},//新任务
        }
    },
    onLoad(options){
		this.PlatformId= options.PlatformId;
		this.AccountId=options.AccountId;
		this.TaskType=  options.TaskType;
    },
    onShow(){
		this.init();
    },
    methods:{
		init(){
			this.userId = uni.getStorageSync('userId');
			this.token = uni.getStorageSync('token');
			this.page=1;
			this.notData = false;
			this.newTask={
				TaskAcceptNo:''
			}
			this.getData();
		},
		getData(){
			post('Task/GetTaskList',{
                UserId: this.userId,
                Token: this.token,
                Page: this.page,
                PageSize: this.pageSize,
                PlatId: this.PlatformId,
                AccountId: this.AccountId,
                TaskType: this.TaskType
			}).then(res=>{
				const data = res.obj;
				if(this.page===1){
					this.list=[];
					this.data = data;
					this.notData = false;
				}
				if(data.TaskList.length<this.pageSize&&this.page!==1){
					this.notData = true;//没有数据了
				}
				this.list.push(...data.TaskList);
			})
		},
		ConfirmationTask(TaskListNo){
			get('Login/GetAppVersion',{temp:99}).then(Version=>{
				const VersionControl = Version.obj.AppVersion;
				post('Task/UserDetermineTask',{
					UserId: this.userId,
					Token: this.token,
					AccountId: this.AccountId,
					TaskListNo,
					VersionControl
				}).then(res=>{
					this.newTask = res.obj;
				})
			})
		},
		newTaskOk(TaskAcceptNo){
			goUrl('task/selectoperation',{
				TaskAcceptNo
			})
		},
		back(){
			uni.navigateBack()
		}

	},
	// 下拉刷新
	onPullDownRefresh(){
		this.init();
		uni.stopPullDownRefresh();//得到数据后停止下拉刷新
	},
	onReachBottom(){
		if(!this.notData){
			this.page+=1;
			this.getData();
		}
	}
}
</script>

<style lang="scss">
	@import '../../css/task.css';
	.taskinfo{
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		display:flex;
		align-items:center;
		justify-content:center;
		.content{
			width:90%;
			margin:0 auto;
			border-radius:5px;
			overflow:hidden;
			h3{
				background:#5c91f1;
				color:#fff;
				height:50px;
				line-height:50px;
				text-align:center;
				font-size:16px;
			}
			ul{
				background:#fff;
				padding:15px 10px;
				font-size:12px;
				li{
					display:flex;
					align-items:center;
					justify-content:space-between;
					border-bottom:1px #e8e8e8 solid;
					line-height:80px;
					&:last-child{
						border-bottom:none;
					}
					span{
						color:#ff682d;
					}
				}
			}
			.newTaskBtn{
				border-top:#ccc 1px solid;
				background:#f2f2f2;
				color:#5c91f1;
				line-height:45px;
				text-align:center;
				font-size:15px;
			}
		}
	}
</style>
