<template>
	<div>
	    <div class="jiedan-over">
	        <div class="alertMask-main stopTdisplay">
	            <!--<p class="alertMask-main-text stopgetTask">停止接单</p>-->
	            <p class="alertMask-main-text stopgetTask">你还有未操作的任务，请操作后再接其他任务</p>
	        </div>
	    </div>
	    <!-- <header class="header mui-bar mui-bar-nav">
	        <a class="mui-action-back mui-icon icon-fenxiang mui-pull-left"></a>
	        <h1 class="mui-title">接任务</h1>
	    </header> -->
	    <div class="h45">
	        <div class="head bb_border">
	            <a href="../../index.html" class="btn_back"></a>
	            <div class="title center">接任务</div>
	        </div>
	    </div>
	
	    <div class="rate">
	        <!--fixtop-->
	        <p id="useridd">ID:&nbsp;|&nbsp;完成率100%</p>
	        <p>设置好每个平台的模式，可以组合多个平台同时接单！</p>
	        <p>点击账号可以切换接单账号</p>
	        <a href="javascript:description();;"><img src="/static/image/icons/mark@2x.png"></a>
	    </div>
	
	    <div class="taskTypeBox">
	        <div class="titleHd">
	            <span>选择任务类型</span>
	        </div>
	        <div class="Btns">
	            <a class="btn cur" href="javascript:;">全部</a>
	            <a class="btn" href="javascript:;">垫付任务</a>
	            <a class="btn" href="javascript:;">浏览任务</a>
	        </div>
	    </div>
	    <div class="taskTypeBox" id="selectMaxMoney">
	        <div class="titleHd">
	            <span>选择垫付金额</span>
	        </div>
	        <input type="text" id="maxMoney" name="maxMoney" value="" />
	    </div>
	    <ul class="account_list js-accountList">
	        <!-- <div class='receiving'><div class='clearfix content'><img src='' class='task_icon pull-left' />
	      <div class='discribe pull-left'><p class='task_name '>ces</p>
	        <p class='task_rate'>今日已接垫付：&nbsp;浏览/∞单</p></div></div>
	      <p class='task_type' data-ifband='true'>任务</p>
	      <img src='/static/image/icons/switch_on@2x.png' class='switch' data-accountId='0' data-platId='0' onclick='switchOnOrOff(this)' />
	      </div> -->
	    </ul>
	    <div style="height:60px"></div>
	    <div class="text-center joint_task">
	        <p class="text-center timer-c"></p>
	        <img class="js-jointTask" src="/static/image/icons/jiedan@2x.png">
	        <span style="position: absolute;top:52%;left: 50%;transform:translate(-50%,-30%);color: #fff;font-size: 13px"></span>
	    </div>
	
	    <div class="new_task modal-in">
	        <!-- <div class="icon text-center"> -->
	        <div class="icon clearfix">
	            <img src="/static/image/icons/lamp@2x.png" class="pull-left">
	            <p class="pull-left">来任务啦~</p>
	        </div>
	        <ul class="task_describ">
	            <li class="clearfix">
	                <p class="title_name pull-left">任务类型：</p>
	                <p class="main_container pull-right">手机淘宝垫付任务</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">垫付金额：</p>
	                <p class="main_container pull-right">535元</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">任务佣金：</p>
	                <p class="main_container pull-right">6.6金</p>
	            </li>
	            <li class="clearfix">
	                <p class="title_name pull-left">任务限时：</p>
	                <p class="main_container pull-right">90分钟</p>
	            </li>
	        </ul>
	        <div class="task_ok">确认</div>
	    </div>
	    <div class="alertMask js-alertMask">
	        <div class="alertMask-bj">
	        </div>
	        <div class="alertMask-main">
	            <p class="alertMask-main-text js-alertMask-text">加载中...</p>
	        </div>
	
	    </div>
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
	// @import '../../css/mui.css';
	@import '../../css/ion_rangeslider.css';
	@import '../../css/ion_rangeslider_skinhtml5.css';
	@import '../../css/taskreceiving.css';
	
	@-webkit-keyframes circle {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}

	.header {
		background-color: #f7f7f7;
	}

	@media only screen and (device-width:375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
		.header {
			height: 88px;
			padding-top: env(safe-area-inset-top);
			padding-top: constant(safe-area-inset-top);
		}
		.header a {
			position: relative;
			top: 44px;
		}
	}
</style>
