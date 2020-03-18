<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="sign.html" class="btn_back"></a>
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
						<li v-for="(item,index) in 8" :key="index">
							<p class="title">gsgsgs</p>
							<div class="flex">
								<div class="flexItem flex1">
									<p class="time">2020-3-23</p>
								</div>
								<p class="price">123积分</p>
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
</script>

<style lang="scss">
	@import '../../css/d_style.css'
</style>
