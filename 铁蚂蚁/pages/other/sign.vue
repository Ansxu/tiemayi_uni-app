<template>
	<div>
		<div class="h45">
		    <div class="head bb_border">
		            <p href="../../index.html" class="btn_back"></p>
		            <div class="title center">签到领积分</div>
		            <p @click="goUrl('./pointrecord')" class="icon_r txt blue">积分记录</p>
		        </div>
		    </div>
		    <div class="main">
		        <div class="Sign">
		            <div class="Sign-top">
		                <div class="dl">
		                    <p>我的积分</p>
		                    <span id="MyPoint">{{obj.Score}}</span>
		                </div>
		            </div>
		            <div class="Sign-c">
		                <div :class="['Signbtn',{'active':data.errcode===3}]" @click="goSign">
		                    <div class="inner">
		                        <span class="txt " v-if="data.errcode===3" >已签到</span>
								<span class="txt " v-else >签到</span>
		                        <span class="num" id="ThisPoint">+1积分</span>
		                    </div>
		                </div>
		                <p class="tips" id="GotoDay">已经连续签到{{obj.GotoDay}}天/累计获得{{obj.DayScore}}积分</p>
		            </div>
		            <div class="Sign-day">
		                <div class="jfitem">
		                    <div class="jf " :class="{'cur':obj.GotoDay>index}" id="forOneDay" v-for="(item,index) in 7" :key="index">
								<i class="icon">+{{index+1}}</i>
							</div>
		                    <!-- <div class="jf cur" v-if="obj.DayScore==2" id="forTwoDay"><i class="icon">+2</i></div>
							<div class="jf " v-else id="forTwoDay"><i class="icon">+2</i></div>
		                    <div class="jf cur" v-if="obj.DayScore==3" id="forThreeDay"><i class="icon">+3</i></div>
							<div class="jf" v-else id="forThreeDay"><i class="icon">+3</i></div>
		                    <div class="jf cur" v-if="obj.DayScore==4" id="forFourDay"><i class="icon">+4</i></div>
							<div class="jf" v-else id="forFourDay"><i class="icon">+4</i></div>
		                    <div class="jf cur" v-if="obj.DayScore==5" id="forFiveDay"><i class="icon">+5</i></div>
							<div class="jf" v-else id="forFiveDay"><i class="icon">+5</i></div>
		                    <div class="jf cur" v-if="obj.DayScore==6" id="forSixDay"><i class="icon">+6</i></div>
							<div class="jf" v-else id="forSixDay"><i class="icon">+6</i></div>
		                    <div class="jf cur" v-if="obj.DayScore==7" id="forSevenDay"><i class="icon">+7</i></div>
							<div class="jf" v-else id="forSevenDay"><i class="icon">+7</i></div> -->
		                </div>
		                <!-- <div class="dayitem">
		                    <div class="day">07-22</div>
		                    <div class="day">07-23</div>
		                    <div class="day">07-24</div>
		                    <div class="day">07-25</div>
		                    <div class="day">07-26</div>
		                    <div class="day">07-27</div>
		                    <div class="day">07-28</div>
		                </div> -->
		            </div>
		            <!-- <p class="tips">提醒：签到获得的积分等级积分</p> -->
		    </div>
		</div>
	</div>
</template>

<script>
	import {post} from '@/utils';
	export default{
		data(){
			return {
				userId:"",
				token: "",
				data:{},
				obj:{}
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.GetPointInfo()
			// console.log(this.data)
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
			GetPointInfo(){
				post('integral/LoadSignInPage',{
					 UserId: this.userId,
					 Token: this.token
				}).then(res => {
					this.getData(res)
				}).catch(err=>{
					this.getData(err)
				})
			},
			getData(res){
				if(res.errcode==0||res.errcode==3){
					this.data=res
					this.obj=res.obj
				}
				console.log(this.data,this.obj)
			},
			goSign(){
				post('integral/SignInGetPoints',{
					UserId: this.userId,
					Token: this.token
				}).then(res => {
					// this.res=res
					if(res.errcode==0){
						uni.showToast({
							title:res.msg,
						})
						this.GetPointInfo();
					}else if(res.errcode==3){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			goUrl(e){
				uni.navigateTo({
					url:e
				})
			}
		}
	}
</script>

<style scoped>
	.head .icon_r.txt{
		max-width:30%!important;
	}
</style>
