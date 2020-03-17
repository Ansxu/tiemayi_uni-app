<template>
	<div>
		<div class="h45">
			<div class="head bb_border">
				<a href="../../index.html" class="btn_back"></a>
				<div class="title center">积分抽奖</div>
			</div>
		</div>
		<div class="cj_content" style="padding-bottom: .3rem;">
				<!--转盘-->
				<div class="zhuanpanContent" style="padding-top:.6rem;padding-bottom: .4rem;">
					<h2 style="display: none;">您已拥有<span class="playnum"></span>次抽奖机会，点击立刻抽奖！~</h2>
					<div class="zhuanpan__hd" style="margin-bottom: .25rem;">
						<img src="static/image/lottery/cj_title.png" alt="" />
					</div>
					<div class="zhuanpan__bd">
						<div class="zhuanpan">
							<div class="zhuanpanBox"><img src="static/image/lottery/cj_zhuanpan.png" alt="" class="img_zhuanpan" id="rotate" /></div>
							<img src="static/image/lottery/cj_starbtn.png" alt="" class="btn_star" id="btn_star" />
						</div>
					</div>
				</div>
				<!--转盘   end-->
				<!--我的中奖纪录-->
				<div class="zj_record" style="padding-bottom: .1rem;">
					<div class="img_titleBox">
						<img src="static/image/lottery/bg_title1.png" alt="" />
					</div>
					<div class="section_content">
						<ul class="wenList" id="MylotteryInformation">
							<li>
								<span class="center">暂无任何中奖记录</span>
							</li>
						</ul>
					</div>
				</div>
				<!--我的中奖纪录  end-->
				<!--奖品详情-->
				<div class="jp_details">
					<div class="img_titleBox">
						<img src="static/image/lottery/bg_title2.png" alt="" />
					</div>
					<div class="section_content">
						<ul class="wenList" id="prizelist">
							<li>暂无任何奖品</li>
						</ul>
					</div>
				</div>
				<!--奖品详情  end-->
				<p id="rule" class="tips center" style="color:#ffe9bb;font-size: .13rem;line-height: 1.6;margin:0 .22rem;">游戏规则：本次抽奖一次需消费200积分，一天可抽奖一次 谢谢参与
				</p>
			</div>
			<input id="ActivitiesId" type="hidden" />
	</div>
</template>

<script>
</script>

<style lang="scss" scped>
	@import '../../css/choujiang.css'
</style>
