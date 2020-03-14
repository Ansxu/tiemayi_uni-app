<template>
	<div class="index bg_gray">
		<div class="h45">
			<div class="head">
			<div class="title center">首页</div>
			<a href="./html/other/messagelist.html" class="icon_r icon_news">
				<span id="noticeCount"></span>
			</a>
			</div>
		</div>
		<div class="main" style="padding:10px;">
			<div class="swiper-container banner">
			<div class="swiper-wrapper"></div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
			<!-- <script id="indexBannerListTemp" type="text/x-dot-template">
		{{~it:value:index}}
		<div class="swiper-slide">
			<a href="{{=isNullOrEmpty(value.Url)?'javascript:;':value.Url}}">
				<div class="img" style="background-image: url({{=value.Pic}});"></div>
			</a>
		</div>
		{{~}}
			</script> -->
			</div>
			<div class="bg_fff mb10" id="notOperated">
			<div class="notOperatedTask">
				<ul class="clear notOperatedList"></ul>
			</div>
			</div>
			<div class="navIcon bg_fff mb10">
			<ul class="li25 clear">
				<li>
				<a href="javascript:IsNovice();" class="box">
					<i class="icon">
					<img src="static/image/icons/nav1.png" />
					</i>
					<p>垫付任务</p>
				</a>
				</li>
				<li>
				<a href="javascript:IsNovice();" class="box">
					<i class="icon">
					<img src="static/image/icons/nav2.png" />
					</i>
					<p>浏览任务</p>
				</a>
				</li>
				<li>
				<a href="html/user/vip/vip.html" class="box">
					<i class="icon">
					<img src="static/image/icons/nav6.png" />
					</i>
					<p>VIP</p>
				</a>
				</li>
				<li>
				<a
					class="box yhq"
					href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=759198439&card_type=group&source=qrcode"
				>
					<i class="icon">
					<img src="static/image/icons/nav5.png" />
					</i>
					<p>用户群</p>
				</a>
				</li>
			</ul>
			</div>
			<div class="Announcement bg_fff mb10">
			<div class="labelhd fl">
				<span>公告</span>
			</div>
			<div class="noticeList">
				<ul></ul>
			</div>
			<!--循环-->
			<!-- <script id="indexMessageListTemp" type="text/x-dot-template">
		{{~it:value:index}}
		<li>
			<a class="box" href="./html/other/noticelist.html">
				<p class="text">{{=value.Title}}</p>
				<span class="time">{{=value.PubTime.split('T')[0]}}</span>
			</a>
		</li>
		{{~}}
			</script> -->
			<div class="notice_wechat">
				客服QQ号:
				<span id="wechat_num"></span>&nbsp;添加&nbsp;
				<span>工作时间:9:00-22:00</span>
			</div>
			<input type="hidden" id="wechat_qrCode" />
			</div>
			<!--新手-->
			<div class="xinshou">
			<div class="xinshouDiv1">
				<span class="xinshou_text" onclick="ifTask()">新手教程</span>
			</div>
			<div class="xinshouDiv2">
				<a href="html/other/invite.html">
				<span class="xinshou_text">推广奖励</span>
				</a>
			</div>
			<div class="xinshouDiv3">
				<a href="./html/other/faq.html">
				<span class="xinshou_text">常见问题</span>
				</a>
			</div>
			</div>
			<!--每日任务-->
			<div class="Taskday bg_fff mb10">
			<div class="titleHd">
				<span>每日任务</span>
			</div>
			<div class="con">
				<ul class="li33 clear">
				<li>
					<a href="html/other/sign.html" class="task_qd">签到领积分</a>
				</li>
				<!-- <li><a href="#" class="task_cj">积分抽奖</a></li> -->
				<!--<li><a href="html/user/shareqrcode.html" class="task_qrcode">分享二维码</a></li>-->
				<li>
					<a class="task_qrcode" id="lottery" onclick="lotteryUrl()">积分抽奖</a>
				</li>
				<li>
					<a href="html/other/invite.html" class="task_yq">邀请好友</a>
				</li>
				</ul>
			</div>
			</div>
			<!--底部广告-->
			<div class="ft_gg mb10">
			<div class="img">
				<a href="html/other/inviterlist.html">
				<img src="static/image/banner/guanggao.jpg" />
				</a>
			</div>
			</div>
		</div>
		<!--底部-->
		<div class="null50">
			<footer>
			<ul class="navList clear">
				<li class="ft1 active">
				<a href="index.html">首页</a>
				</li>
				<li class="ft2">
				<a href="javascript:IsNovice();">全部任务</a>
				</li>
				<li class="ft3">
				<a href="html/task/dispatchtask.html" class="icon ftbtn">接单</a>
				</li>
				<li class="ft4">
				<a href="html/task/receivedtask.html">已接任务</a>
				</li>
				<li class="ft5">
				<a href="html/user/member.html">个人中心</a>
				</li>
			</ul>
			</footer>
		</div>
		<!--底部 end-->
	</div>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
