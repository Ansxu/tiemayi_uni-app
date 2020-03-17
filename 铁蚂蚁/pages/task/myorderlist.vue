<template>
	<div class="bg_f8f8f8">
		<div class="h45">
	        <div class="head bb_border">
	            <a href="javascript:api.closeWin();" class="btn_back"></a>
	            <div class="title center heardTitle">垫付任务</div>
	        </div>
	    </div>
	    <div class="main">
	        <div class="tabListBox orderList__tabListBox">
	            <ul class="dd_tabList li20" id="orderStatus">
	                <li class="active">
	                    <a href="javascript:;">
	                        <span>未完成</span>
	                    </a>
	                </li>
	                <li>
	                    <a href="javascript:;">
	                        <span>已完成</span>
	                    </a>
	                </li>
	                <li>
	                    <a href="javascript:;">
	                        <span>已撤销</span>
	                    </a>
	                </li>
	                <li>
	                    <a href="javascript:;">
	                        <span>申诉中</span>
	                    </a>
	                </li>
	            </ul>
	        </div>
	        <div class="conPage noConPage" style="display: block; padding-top:100px;">
	            <div class="noCon">
	                <div class="iconImg">
	                    <img src="static/image/icons/nodataicon.png" alt="">
	                </div>
	                <p class="msg">暂时没有相关数据</p>
	            </div>
	        </div>
	        <div class="tabShowBox">
	            <div class="tabItem">
	                <ul class="dd_column level__dd_column dd_orderList">
	
	                </ul>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../css/d_style.css'
</style>
