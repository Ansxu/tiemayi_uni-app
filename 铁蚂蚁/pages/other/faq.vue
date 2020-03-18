<template>
	<div>
		<div class="h45">
			<div class="head bb_border">
				<a href="../../index.html" class="btn_back"></a>
				<div class="title center">常见问题</div>
			</div>
		</div>
		<div class="main">
			<div class="Faq">
				<div class="Faq-type">
					<!--  循环 -->
					<!-- <script id="FAQListTemp" type="text/x-dot-template"> -->
					<!-- 	{{~it:value:index}}
						<li>
							<a class="box" href="./faqdetail.html">
								<i class="icon"><img src={{=value.Logo}}></i>
								<p>{{=value.ClassName}}</p>
								<div style="display:none">{{=value.Id}}</div>
							</a>
						</li>
						{{~}}
					</script> -->
					<ul class="li50 clear">
						<li v-for="(item,index) in 4" :key="index">
							<a class="box" href="./faqdetail.html">
								<i class="icon"><img src="/static/logo.png"></i>
								<p>哈哈哈哈</p>
								<div style="display:none">343434343</div>
							</a>
						</li>
					</ul>
			</div>
	
			<div class="online">
				<div class="title">在线客服<span>(09:00~22:00)</span></div>
				<div class="desc">
					所有常见问题都有相应的解决方案，请参考常见问题自主解决，如 果常见问题无法解决您的问题在咨询客服，由于客服咨询量较大， 请尽可能的描述清楚您的问题，以便快速解决
					</div>
				</div>
	
				<div class="ftbtn mb10">
					<!-- <a class="btn qqbtn">QQ咨询</a> -->
					<a class="btn qqbtn" href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=759198439&card_type=group&source=qrcode">QQ咨询</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import '../../css/api.css'
</style>
