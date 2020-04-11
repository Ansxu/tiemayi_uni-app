<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<!-- <a href="../../html/user/member.html" class="btn_back"></a> -->
				<div class="title center">我的订单</div>
			</div>
		</div>
		<div class="main">
			<div class="orderMenu__section">
				<div class="section__hd weui-cell">
					<div class="weui-cell__bd">
						<p class="title">垫付任务</p>
					</div>
				</div>
				<div class="section__bd">
					<ul class="dd_navList li25 block__navList" id="advanceOrderStatus">
						<li class="outside" @click="goOrderList(1,1)">
							<div class="icon-img">
								<img src="/static/image/nav/ordermenu_nav1_1.png" alt="">
								<span class="circleNum" v-if="data.AdvanceUndone">{{data.AdvanceUndone}}</span>
							</div>
							<p class="title">未完成</p>
						</li>
						<li class="outside" @click="goOrderList(1,2)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_2.png" alt="">
                  					<span class="circleNum" v-if="data.AdvanceCompleted">{{data.AdvanceCompleted}}</span>
								</div>
								<p class="title">已完成</p>
						</li>
						<li class="outside" @click="goOrderList(1,3)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_3.png" alt="">
                 					 <span class="circleNum" v-if="data.AdvanceRevoked">{{data.AdvanceRevoked}}</span>
								</div>
								<p class="title">已撤销</p>
						</li>
						<li class="outside" @click="goOrderList(1,4)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_4.png" alt="">
                					 <span class="circleNum" v-if="data.AdvanceAppeal">{{data.AdvanceAppeal}}</span>
								</div>
								<p class="title">申诉中</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="orderMenu__section">
				<div class="section__hd weui-cell">
					<div class="weui-cell__bd">
						<p class="title">浏览任务</p>
					</div>
				</div>
				<div class="section__bd">
					<ul class="dd_navList li25 block__navList" id="browseOrderStatus">
						<li class="outside" @click="goOrderList(2,1)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_1.png" alt="">
									<span class="circleNum" v-if="data.BrowseUndone">{{data.BrowseUndone}}</span>
								</div>
								<p class="title">未完成</p>
						</li>
						<li class="outside" @click="goOrderList(2,2)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_2.png" alt="">
                  					<span class="circleNum" v-if="data.BrowseCompleted">{{data.BrowseCompleted}}</span>
								</div>
								<p class="title">已完成</p>
						</li>
						<li class="outside" @click="goOrderList(2,3)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_3.png" alt="">
                  					<span class="circleNum" v-if="data.BrowseRevoked">{{data.BrowseRevoked}}</span>
								</div>
								<p class="title">已撤销</p>
						</li>
						<li class="outside" @click="goOrderList(2,4)">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_4.png" alt="">
                  					<span class="circleNum" v-if="data.BrowseAppeal">{{data.BrowseAppeal}}</span>
								</div>
								<p class="title">申诉中</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--底部-->
		<footers :showIndex="3" :showOrderReceiving="false"></footers>
	<!--底部 end-->
	</div>
</template>

<script>
import footers from '@/components/footer.vue'
import {post,toast,goUrl} from '@/utils';
export default {
    components:{footers},
    data(){
        return {
			userId:'',
			token:'',
			data:{}
        }
    },
    onLoad(){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.getMyOrderCount();
    },
    onShow(){
        if (this.userId !== uni.getStorageSync("userId") ||this.token !== uni.getStorageSync("token")) {
            this.userId = uni.getStorageSync("userId");
            this.token = uni.getStorageSync("token");
            this.getMyOrderCount();
        }
    },
    methods:{
		getMyOrderCount(){
			post('Task/GetMyOrderCount',{
                UserId: this.userId,
                Token: this.token,
			}).then(res=>{
				this.data = res.obj;
			})
		},
		// taskType//任务类型，1-垫付任务，0浏览任务
		//orderStatus--1未完成，2已完成，3已撤销，4申诉中
		goOrderList(taskType,orderStatus){
			goUrl('task/myorderlist',{
				taskType,
				orderStatus
			})
		}
    }
}
</script>

<style lang="scss" scoped>
.outside{
	padding:10px;
}
</style>