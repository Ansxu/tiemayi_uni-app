<template>
	<div class="bg_f8f8f8">
		<headers>{{taskType==1?'垫付任务':'浏览任务'}}</headers>
	    <div class="main">
	        <div class="tabListBox orderList__tabListBox">
	            <ul class="dd_tabList li20" id="orderStatus">
	                <li :class="{'active':orderStatus==item.id}" 
						v-for="(item,index) in label" :key="index"
						@click="onLabel(item)">
						<span>{{item.name}}</span>
	                </li>
	            </ul>
	        </div>
	        <div class="tabShowBox">
	            <div class="tabItem">
	                <ul class="dd_column level__dd_column dd_orderList">

						<li v-for="(item,index) in list" :key="index" 
							@click="goUrl('task/selectoperation',{TaskAcceptNo:item.TaskAcceptNo})">
							<!-- <div href="javascript:orderInfo();" class="outside"> -->
							<div  class="outside">
								<div class="pictrueAll">
									<div class="pictrue porelative">
										 <img :src="item.ProductImg" alt="" />
										<img src="/static/image/icons/maskBg.png" alt="" />
									</div>
								</div>
								<div class="txtBox">
									<p class="title text"><img class="plat_logo" :src="item.PlatFormLogo" />{{item.TaskAcceptNo}}</p>
									<div class="flex">
										<div class="flexItem flex1">
											<p class="priceArea"><span>佣金:{{item.GetCommission}}</span></p>
										</div>
										<div class="flexItem">
											<p class="order-status c_Org">{{item.AcceptTaskStatusText}}</p>
										</div>
									</div>
									<div class="flex">
										<div class="flexItem flex1">
											<p class="name">{{item.AccountName}}</p>
										</div>
										<div class="flexItem">
											<p class="time">{{item.AcceptTaskTime}}</p>
										</div>
									</div>
								</div>
							</div>
						</li>
						<li v-if="notData&&page!==1" style="color:#999;line-height:3;text-align:center;">已经到底了</li>

	                </ul>
	            </div>
	        </div>
	        <div class="conPage noConPage" v-if="list.length<1" style="display: block; padding-top:100px;">
	            <div class="noCon">
	                <div class="iconImg">
	                    <img src="/static/image/icons/nodataicon.png" alt="">
	                </div>
	                <p class="msg">暂时没有相关数据</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	import {post,toast,goUrl} from '@/utils';
	export default {
		data(){
			return {
				goUrl,
				taskType:1,//1-垫付任务，0浏览任务
				orderStatus:1,//1未完成，2已完成，3已撤销，4申诉中
				label:[
					{name:'未完成',
						id:1
					},
					{name:'已完成',
						id:2
					},
					{name:'已撤销',
						id:3
					},
					{name:'申诉中',
						id:4
					},
				],
				page:1,
				pageSize:10,
				list:[],
				notData:false,
			}
		},
		onLoad(options){
			this.taskType = options.taskType;
			this.orderStatus = options.orderStatus;
			this.init();
		},
		methods:{
			init(){
				this.notData = false;
				this.page = 1;
				this.userId = uni.getStorageSync('userId');
				this.token = uni.getStorageSync('token');
				this.getList();
			},
			getList(){
				if(this.page==1){
					this.list=[];
				}
				post('Task/GetMemberTaskList',{
					UserId: this.userId,
					Token: this.token,
					MemberAcceptTaskStatus: this.orderStatus,
					TaskType: this.taskType,
					Page: this.page,
					PageSize: this.pageSize
				}).then(res=>{
					const data = res.obj;
					const list = data.AcceptTaskList;
					if(list.length<this.pageSize){
						this.notData = true;
					}
					this.list.push(...list);
				})
			},
			onLabel(item){
				this.orderStatus = item.id;
				this.page=1;
				this.getList();

				
			},
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.init();
			uni.stopPullDownRefresh();//得到数据后停止下拉刷新
		},
		onReachBottom(){
			if(!this.notData){
				this.page+=1;
				this.getList();
			}
		}
	}
</script>

<style lang="scss">
	@import '../../css/d_style.css'
</style>
