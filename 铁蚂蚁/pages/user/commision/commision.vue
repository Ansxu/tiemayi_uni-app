<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <p @click="backUrl" class="btn_back"></p>
                <div class="title center">佣金收益</div>
                <!-- 提现这里动态传参 -->
                <p @click="goUrl('./withdraw')" class="icon_r txt">提现</p>
            </div>
        </div>
		<!-- <headers>申诉详情</headers> -->
        <div class="main">
            <div class="commisionTop">
                <p class="title">累计佣金（金）</p>
                <p class="price"><span class="num" id="commisionvalue">{{Amount}}</span>金</p>
            </div>
            <!-- <div class="weui-cell selectDateCommision__weui-cell">
                    <div class="weui-cell__bd">
                        <p class="title">本月</p>
                    </div>
                    <div class="weui-cell__ft">
                        <a href="javascript:;" class="btn-detail">明细</a>
                    </div>
                </div> -->
            <div class="conPageBox">
                <!--没有内容的时候-->
                <div class="conPage noConPage" v-if="RecordDetail.length<1">
                    <div class="noCon">
                        <div class="iconImg">
                            <img src="/static/image/icons/nodataicon.png" alt="" />
                        </div>
                        <p class="msg">暂时没有相关数据</p>
                    </div>
                </div>
                <!--没有内容的时候  end-->
                <!--有内容的时候-->
                <!--  循环 -->
                <!-- <script id="recordListTemp" type="text/x-dot-template">
                    {{~it:value:index}}
                    <li>
                        <div class="title">{{=value.Remark}}</div>
                        <div class="flex">
                            <div class="flexItem flex1">
                                <p class="time">{{=getDateText(value.AddTime).Format("yyyy-MM-dd hh:mm:ss") }}</p>
                            </div>
                            <p class="price">{{=value.Change}} 金</p>
                        </div>
                    </li>
                    {{~}}
                </script> -->
                <div class="conPage hasConPage">
                    <ul class="commisionList" v-for="(item,index) in RecordDetail" :key="index">
						<li>
							<div class="title">{{item.Remark}}</div>
							<div class="flex">
							    <div class="flexItem flex1">
							        <p class="time">{{editTime(item.AddTime,'time')}}</p>
							    </div>
							    <p class="price">{{item.Change}} 金</p>
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
        return {
			editTime,
			userId:"",
			token: "",
			pageSize:10,
			pageNo:1,
			RecordDetail:[],
			FrozenAmount:0,
			Amount:0
        }
    },
    onLoad(){
		this.userId = uni.getStorageSync("userId");
		this.token = uni.getStorageSync("token");
		this.getWalletLogList() //获取佣金明细
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
		this.getWalletLogList() //获取佣金明细
		// console.log(this.RecordDetail)
	},
    methods:{
		getWalletLogList(){
			let that=this
			post('Money/GetWalletLogList',{
				UserId: this.userId,
				Token: this.token,
				Page: this.pageNo,
				PageSize: this.pageSize,
				WalletType: 1,
				Type: 0,
				IsNewMonth: 1
			}).then(res => {
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
				
				console.log(that.RecordDetail)
			})
		},
		goUrl(e){
			uni.navigateTo({
				url:e
			})
		},
		backUrl(){
			uni.navigateBack({
				delta:1
			})
		}
    }
}
</script>

<style lang="scss" scoped>

</style>