<template>
	<div class="bg_gray">
		<div class="h45">
			<div class="head bb_border">
				<a href="../../index.html" class="btn_back"></a>
				<div class="title center">公告</div>
			</div>
		</div>
		<div class="main bg_fff">
			<div class="noticeList">
				<ul>
					<li v-for="(item,oll) in 7" :key="oll">
						<div id="noticeId" style="display:none">34mgjkk</div>
						<a href="./noticedetail.html" class="box">
							<div class="title">
								<p class="text">标题大概</p>
								<i class="icon icon_txt" v-if="item.isRead==0">NEW</i>
								<i class="icon icon_txt"></i>
							</div>
							<span class="time">2020-04</span>
						</a>
					</li>
				</ul>
			</div>
					<!--  循环 -->
			<!-- <script id="noticeListTemp" type="text/x-dot-template">
			  {{~it:value:index}}
			  <li>
				<div id="noticeId" style="display:none">{{=value.Id}}</div>
				<a href="./noticedetail.html" class="box">
					<div class="title">
						<p class="text">{{=value.Title}}</p>
						{{? value.IsRead === 0}}
						<i class="icon icon_txt">NEW</i>
						{{??}}
						<i class="icon icon_txt"></i>
						{{?}}
					</div>
					<span class="time">{{=value.PubTime.split('T')[0]}}</span>
				</a>
			  </li>
			  {{~}}
			</script> -->
		
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import '../../css/style_other.css';
	@import '../../css/api.css';
	.noticeList {
	    height: 100%!important;
	    overflow: auto!important;
	}

</style>
