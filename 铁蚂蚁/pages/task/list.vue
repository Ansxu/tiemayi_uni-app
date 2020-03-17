<template>
	<div class="bg_gray">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:api.closeWin();" class="btn_back"></a>
				<div class="title center">全部任务</div>
				<a href="javascript:;" id="accountName" class="icon_r txt"></a>
			</div>
		</div>
		<div class="main" name="dropDownRefresh">
			<div class="df_taskList bg_fff">
				<ul id="taskList">
	
				</ul>
			</div>
		</div>
		<!--底部接单按钮-->
		<!-- <div class="ft_Orderbtn" onclick="systemSendTask()">接单</div> -->
		<!--底部-->
		<!-- <div class="null50">
			<footer>
				<ul class="navList li25 clear">
					<li class="ft1">
						<a href="../../index.html">首页</a>
					</li>
					<li class="ft2 active">
						<a href="javascript:IsNovice();">全部任务</a>
					</li>
					<li class="ft4">
						<a href="../../html/task/receivedtask.html">已接任务</a>
					</li>
					<li class="ft5">
						<a href="../../html/user/member.html">个人中心</a>
					</li>
				</ul>
			</footer>
		</div> -->
		<!--底部 end-->
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../css/task.css'
</style>
