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
									<img src="../../image/nav/ordermenu_nav1_1.png" alt="">
									<span class="circleNum">0</span>
								</div>
								<p class="title">未完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_2.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_3.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已撤销</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_4.png" alt="">
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
									<img src="../../image/nav/ordermenu_nav1_1.png" alt="">
									<span class="circleNum">0</span>
								</div>
								<p class="title">未完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_2.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已完成</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_3.png" alt="">
                  <span class="circleNum">0</span>
								</div>
								<p class="title">已撤销</p>
							</a>
						</li>
						<li>
							<a href="javascript:;" class="outside">
								<div class="icon-img">
									<img src="../../image/nav/ordermenu_nav1_4.png" alt="">
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
		<div class="null50">
			<footer>
				<ul class="navList li25 clear">
					<li class="ft1">
						<a href="../../index.html">首页</a>
					</li>
					<li class="ft2">
					  <a href="javascript:IsNovice();">全部任务</a>
					</li>
					<li class="ft4 active">
						<a href="../../html/task/receivedtask.html">已接任务</a>
					</li>
					<li class="ft5">
						<a href="../../html/user/member.html">个人中心</a>
					</li>
				</ul>
			</footer>
		</div>
	<!--底部 end-->
	</div>
</template>

<script>
import {} from '@/utils';
export default {
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