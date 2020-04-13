<template>
	<div class="bg_img">
		<headers>邀请奖励排行榜</headers>
	    <div class="main Ranking">
	        <div class="Rankbox">
	            <div class="Rankhd">
	                邀请奖励排行榜
	            </div>
	            <!-- <script id="inviterListTemp" type="text/x-dot-template">
	                {{~it:value:index}}
	                <tr class="bd">
	                    <td class="no no{{=index+1}}"><span>{{=index+1}}</span></td>
	                    <td>{{=value.MobileStr}}</td>
	                    <td>{{=value.InviteesNumber}}</td>
	                    <td>{{=value.RewardCommission}}金</td>
	                </tr>
	                {{~}}
	            </script> -->
	            <div class="table">
	                <table>
	                    <colgroup>
	                        <col style="width:15%">
	                        <col style="width:30%">
	                        <col style="width:25%">
	                        <col style="width:30%">
	                    </colgroup>
	                    <tr class="hd">
	                        <th>排名</th>
	                        <th>名称</th>
	                        <th>邀请人数</th>
	                        <th>奖励</th>
	                    </tr>
	                    <tbody id="inviterList">
							<tr class="bd" v-for="(item,index) in data" :key="index">
							    <!-- <td class="no no{{index+1}}"><span>{{index+1}}</span></td> -->
								<td :class="'no'+'no'+index+1"><span>{{index+1}}</span></td>
								<td>{{item.MobileStr}}</td>
								<td>{{item.InviteesNumber}}</td>
								<td>{{item.RewardCommission}}金</td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	import {get} from '@/utils'
	export default {
		data(){
			return{
				userId:'',
				token:'',
				data:{}
			}
		},
		onLoad(){
			this.userId = uni.getStorageSync("userId");
			this.token = uni.getStorageSync("token");
			this.init()
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
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			init(){
				get('Member/GetInviterList').then(res => {
					console.log(res)
					this.data=res.obj
				})
			}
		}
	}
</script>

<style>
</style>
