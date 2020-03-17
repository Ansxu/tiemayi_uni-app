<template>
	<div>
	<div class="h45">
	        <div class="head bb_border">
	            <a href="../../index.html" class="btn_back"></a>
	            <div class="title center">推广奖励</div>
	        </div>
	    </div>
	    <div class="main" style="background: #fff;">
	        <div class="Promotion">
	            <ul class="ul-list">
	                <li>
	                    <label>我的邀请码</label>
	                    <div class="txt-r"><span class="blue" id="MyInvitationCode">0</span>	<a class="link_btn copybtn" style="display:none;" id="copyinvitebtn" onclick="CopyInviteCode()">复制</a></div>
	                </li>
	                <li>
	                    <label>已完成任务单数</label>
	                    <div class="txt-r"><span class="blue" id="CompletedTaskNum">1</span></div>
	                </li>
	                <li>
	                    <label>推广总数</label>
	                    <div class="txt-r"><span class="c_Org" id="PromotionSum">1</span>个</div>
	                </li>
	                <!-- <li>
	                    <label>徒弟</label>
	                    <div class="txt-r text_l">邀请人可获得徒弟任务佣金的 <span class="c_Org" id="promotionIncomeFee">10%</span></div>
	                </li>
	                <li>
	                  <div class="txt-r text_l">二级徒弟完成任务邀请人可获得佣金 <span class="c_Org" id="promotionIncomeFeeTwo"></span></div>
	              </li>
	              <li>
	                <div class="txt-r text_l">三级徒弟完成任务邀请人可获得佣金 <span class="c_Org" id="promotionIncomeFeeThree"></span></div>
	             </li> -->
	                <li class="totalbox">
	                    <div class="box">
	                        <span class="num" id="RegisteredNum">0人</span><br>
	                        <span class="txt">已注册</span>
	                    </div>
	                    <div class="box">
	                        <span class="num" id="CertifiedNum">0人</span><br>
	                        <span class="txt">已认证</span>
	                    </div>
	                </li>
	                <li>
	                    <label>累计奖励</label>
	                    <div class="txt-r"><span class="c_Org" id="RewardAmount">0.00</span> 金</div>
	                </li>
	            </ul>
	        </div>
	        <input type="hidden" id="ShareUrl" />
	        <!--底部广告-->
	        <div class="Promotion-rule mb10">
	            <div class="rulehd"><span>活动规则</span></div>
	            <div class="rulelist">
	                <ul>
	                    <li>1、任务状态变成已完成才算完成一单</li>
	                    <li>2、被邀请人一定是通过邀请人的邀请链接注册会员，邀请人才可以得到相应奖励否则视为无效邀请，不计入邀请记录</li>
	                    <li>3、活动中若发现有买手通过进行作弊手段获得奖励的，将直接封禁其账号，取消一切奖励资格且违规获得的奖励将不予以体现</li>
	                </ul>
	            </div>
	        </div>
	    </div>
	    <div class="null50">
	        <footer class="ftbtn bt_border">
	            <a class="btn" id="btnShare">立即分享</a>
	        </footer>
	    </div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	
	.link_btn {
	  display: inline-block;
	  height: .35rem;
	  line-height: .35rem;
	  color: #5c91f1;
	  border: 1px solid #ddd;
	  border-radius: 4px;
	  padding: 0 10px;
	  margin-top: 10px;
	}
	.copybtn {
		display: inline-block;
		color: #4581ec;
		margin-top: 5px;
		margin-left: 10px;
	}
</style>
