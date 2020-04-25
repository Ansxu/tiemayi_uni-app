<template>
	<div class="bg_gray">
		<headers>我的推广</headers>
	    <div class="main app_tg">
	        <div class="tab-hd tabList">
	            <ul class="li50 clear">
	                <li :class="selectval==0? 'active':''" @click.stop="seltab(0)">徒弟</li>
	                <li :class="selectval==1? 'active':''" @click.stop="seltab(1)">徒孙</li>
	            </ul>
	        </div>
	        <!-- <script id="subordinateListTemp" type="text/x-dot-template">
	            {{~it:value:index}}
	            <tr>
	                <td><p style="color:#0094ff;">{{=value.UserRName}}</p><p>{{=value.Mobile}}</p></td>
	                <td>{{=value.Income}} 金</td>
	                <td>{{=getDateText(value.CreateTime).Format("yyyy-MM-dd")}}</td>
	            </tr>
	            {{~}}
	        </script> -->
	        <div class="tab-bd">
	            <div class="table">
	                <table>
	                    <tr>
	                        <th>手机号</th>
	                        <th>推广收益(金)</th>
	                        <th>注册时间</th>
	                    </tr>
	                    <tbody id="subordinateList">
							<tr v-for="(item,index) in data.SubordinateList" :key="index">
								<td><p style="color:#0094ff;">{{item.UserRName}}</p><p>{{item.Mobile}}</p></td>
								<td>{{item.Income}} 金</td>
								<td>{{editTime(item.CreateTime,'time')}}</td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	            <!--暂无消息时显示-->
	            <div class="not_subordinate" style="display: none;">
	                <i class="icon icon_subordinate"></i>
	                <p>您还没有推荐下级哦！快去推荐好友一起接单完成任务</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	import {post,editTime} from '@/utils'
	export default {
		data(){
			return {
				editTime,
				userId:'',
				token:'',
				pageNo:1,
				selectval:0,
				stop:true,
				data:{},
				sel:true
			}
		},
			onLoad(e){
				this.userId = uni.getStorageSync("userId");
				this.token = uni.getStorageSync("token");
				// console.log(this.data)
				this.selectval=e.clickval
				console.log(e)
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
				this.pageNo++
				this.init() //
				// console.log(this.RecordDetail)
			},
			methods:{
				seltab(e){
					this.pageNo=1
					console.log(e)
					if(e==0){
						this.selectval=e
						this.init()
					}else if(e==1){
						this.selectval=e
						this.init()
					}
				},
				init(){
					let that=this
					post('Member/GetMemberSubordinate',{
						UserId:  this.userId,
						Token: this.token,
						Page: this.pageNo,
						PageSize: 15,
						IsDisciple: this.selectval*1,
					}).then(res => {
						// console.log(res)
						this.data=res.obj
						if(that.pageNo>1){
							if(res.obj.SubordinateList.length==0){
								// console.log(1231321)
								uni.showToast({
									title:'全部加载完成',
									icon:'none'
								})
								return
							}else{
							that.data.SubordinateList=that.data.SubordinateList.concat(res.obj.SubordinateList)
							}
						}else if(that.pageNo==1){
							that.data.SubordinateList=res.obj.SubordinateList
						}
					})
				}
			}
	}
</script>

<style scoped>
	.app_tg .table tr{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
