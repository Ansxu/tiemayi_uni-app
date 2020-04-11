<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a @click="back" class="btn_back"></a>
				<div class="title center">我的积分记录</div>
			</div>
		</div>
		<div class="main">
			<div class="conPageBox">
				<!--没有内容的时候-->
				<div class="conPage noConPage" style="display: none;">
					<div class="noCon">
						<div class="iconImg">
							<img src="/static/image/icons/nodataicon.png" alt="" />
						</div>
						<p class="msg">暂时没有相关数据</p>
					</div>
				</div>
				<!--没有内容的时候  end-->
				<!--有内容的时候-->
				<!-- <script id="recordListTemp" type="text/x-dot-template">
					{{~it:value:index}}
					<li>
						<p class="title">{{=value.Remark}}</p>
						<div class="flex">
							<div class="flexItem flex1">
								<p class="time">{{=getDateText(value.AddTime).Format("yyyy-MM-dd hh:mm:ss") }}</p>
							</div>
							<p class="price">{{=value.Change}} 积分</p>
						</div>
					</li>
					{{~}}
				</script> -->
				<div class="conPage hasConPage">
					<ul class="commisionList">
						<li v-for="(item,index) in RecordDetail" :key="index">
							<p class="title">{{item.Remark}}</p>
							<div class="flex">
							    <div class="flexItem flex1">
							        <p class="time">{{editTime(item.AddTime,'time')}}</p>
							    </div>
							    <p class="price">{{item.Change}} 积分</p>
							</div>
						</li>
					</ul>
				</div>
				<!--有内容的时候  end-->
			</div>
		</div>
	</div>
</template>

<script>
	import {post,editTime} from '@/utils';
	export default {
		data(){
			return{
				editTime,
				userId:"",
				token: "",
				pageNo:1,
				pageSize:10,
				RecordDetail:{}
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
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
		//上拉加载
		onReachBottom: function() {
			this.pageNo++
			this.init() //获取佣金明细
			// console.log(this.RecordDetail)
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			init(){
				let that=this
				post('Money/GetWalletLogList',{
					 UserId: this.userId,
					 Token: this.token,
					 Page: this.pageNo,
					 PageSize: this.pageSize,
					 WalletType: 2,
					 Type: 1,
					 IsNewMonth: 1
				}).then(res =>{
					const data = res.obj;
					this.Amount=data.Amount
					this.FrozenAmount=data.FrozenAmount
					// console.log(data.RecordDetail)
					if(that.pageNo>1){
						if(data.RecordDetail.length==0){
							// console.log(1231321)
							uni.showToast({
								title:'全部加载完成',
								icon:'none'
							})
							return
						}else{
						that.RecordDetail=that.RecordDetail.concat(data.RecordDetail)
						}
					}else if(that.pageNo==1){
						that.RecordDetail=data.RecordDetail
					}
					
				})
			}
		}
		
	}
</script>

<style lang="scss">
	@import '../../css/d_style.css'
</style>
