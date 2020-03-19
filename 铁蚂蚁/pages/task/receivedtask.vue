<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="../../html/user/member.html" class="btn_back"></a>
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
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_1.png" alt="">
									<span class="circleNum">0</span>
								</div>
								<p class="title">未完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_2.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_3.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已撤销</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_4.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">申诉中</p>
							</a>
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
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_1.png" alt="">
									<span class="circleNum">0</span>
								</div>
								<p class="title">未完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_2.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_3.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已撤销</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="/static/image/nav/ordermenu_nav1_4.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">申诉中</p>
							</a>
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
import {} from '@/utils';
export default {
    components:{footers},
    data(){
        return {

        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>