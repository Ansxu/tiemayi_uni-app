<template>
	<div>
		<div class="h45">
		    <div class="head bb_border">
		            <a href="../../index.html" class="btn_back"></a>
		            <div class="title center">签到领积分</div>
		            <a href="pointrecord.html" class="icon_r txt blue">积分记录</a>
		        </div>
		    </div>
		    <div class="main">
		        <div class="Sign">
		            <div class="Sign-top">
		                <div class="dl">
		                    <p>我的积分</p>
		                    <span id="MyPoint">0</span>
		                </div>
		            </div>
		            <div class="Sign-c">
		                <div class="Signbtn">
		                    <div class="inner">
		                        <span class="txt">签到</span>
		                        <span class="num" id="ThisPoint">+1积分</span>
		                    </div>
		                </div>
		                <p class="tips" id="GotoDay">已经连续签到1天/累计获得1积分</p>
		            </div>
		            <div class="Sign-day">
		                <div class="jfitem">
		                    <div class="jf" id="forOneDay"><i class="icon">+1</i></div>
		                    <div class="jf" id="forTwoDay"><i class="icon">+2</i></div>
		                    <div class="jf" id="forThreeDay"><i class="icon">+3</i></div>
		                    <div class="jf" id="forFourDay"><i class="icon">+4</i></div>
		                    <div class="jf" id="forFiveDay"><i class="icon">+5</i></div>
		                    <div class="jf" id="forSixDay"><i class="icon">+6</i></div>
		                    <div class="jf" id="forSevenDay"><i class="icon">+7</i></div>
		                </div>
		                <!-- <div class="dayitem">
		                    <div class="day">07-22</div>
		                    <div class="day">07-23</div>
		                    <div class="day">07-24</div>
		                    <div class="day">07-25</div>
		                    <div class="day">07-26</div>
		                    <div class="day">07-27</div>
		                    <div class="day">07-28</div>
		                </div> -->
		            </div>
		            <!-- <p class="tips">提醒：签到获得的积分等级积分</p> -->
		    </div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.head .icon_r.txt{
		max-width:30%!important;
	}
</style>
