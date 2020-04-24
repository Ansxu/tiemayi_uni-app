<template>
    <div class="bg_f8f8f8">
		<headers>{{wallettext}}</headers>
        <div class="main">
            <ul class="commisionList withdrawRecordList" id="recordlist" style="margin-top:10px;" v-for="(item,index) in WithdrawList" :key="index">
				<li>
				    <div class="title">{{item.Remark}}</div>
				    <div class="flex">
				        <div class="flexItem flex1">
				            <p class="time">{{item.CreateTime}}</p>
				        </div>
				        <p class="price">{{item.Change}}</p>
				    </div>
				</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {post} from '@/utils';
export default {
    data(){
        return {
			PageNo:1,
			pageSize:20,
			wallettype:0,
			wallettext:'拥金提现记录',
			WithdrawList:[]
        }
    },
	onLoad(e){
		this.userId = uni.getStorageSync("userId");
		this.token = uni.getStorageSync("token");
		console.log(e)
		if(e.wallettype==1){
			this.wallettype=e.wallettype
			this.wallettext='拥金提现记录'
		}else if(e.wallettype==2){
			this.wallettype=e.wallettype
			this.wallettext='本金提现记录'
		}
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
	onReachBottom: function() {
		this.PageNo=this.PageNo+1
		console.log(this.PageNo)
		this.init() //获取佣金明细
		// console.log(this.RecordDetail)
	},
    methods:{
		init(){
			let that =this
			post('Withdraw/GetWithdrawLogPage',{
				UserId: this.userId,
				Token: this.token,
				Page: this.PageNo,
				PageSize: this.pageSize,
				WalletType: this.wallettype
			}).then(res => {
				const data = res.obj
				// this.WithdrawList=data.WithdrawList
				if(that.PageNo>1){
					if(data.WithdrawList.length==0){
						uni.showToast({
							title:'全部加载完成',
							icon:'none'
						})
						return
					}else{
					that.WithdrawList=that.WithdrawList.concat(data.WithdrawList)
					console.log(this.WithdrawList)
					}
				}else if(that.PageNo==1){
					that.WithdrawList=data.WithdrawList
					console.log(this.WithdrawList)
				}
			})
		}
    }
}
</script>

<style lang="scss" scoped>

</style>