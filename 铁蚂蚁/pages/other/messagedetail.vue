<template>
	<div>
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:history.go(-1);" class="btn_back"></a>
				<div class="title center">系统消息</div>
			</div>
		</div>

		<div class="main" id="messageDetailTempMain">
			<div class="messagedetail">
					<div class="title mb10">这是个标题</div>
					<div class="con">
						这个我也不知道是个什么东东
					</div>
			</div>
		</div>
		<!--dot.js赋值-->
		<!-- <script id="messageDetailTemp" type="text/x-dot-template">
				<div class="messagedetail">
						<div class="title mb10">{{=it.Title}}</div>
						<div class="con">
							{{=it.Memo}}
						</div>
				</div>
		</script> -->
	</div>
</template>

<script>
</script>

<style scoped>
	.main{
		padding:20upx;
	}
</style>
