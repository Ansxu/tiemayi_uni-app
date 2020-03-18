<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:history.go(-1);" class="btn_back"></a>
				<div class="title center">绑定京东账号</div>
			</div>
		</div>
		<div class="main">
			<!--  循环 -->
            <!-- <script id="gradeListTemp" type="text/x-dot-template">
				{{~it:value:index}}
				    <div class="item">
									<ul class="accountList accountList2">
										<li onclick="pageJump({{=value.Id}},{{=value.ReviewStatus}})">
											<div class="weui-cells navList__weui-cells">
												<div class="weui-cell">
													<div class="weui-cell__hd">
														<img src="/static/image/image/nav/bind_nav2_2.png" alt="" class="icon-navImg" />
													</div>
													<div class="weui-cell__bd">
														<p class="title">{{=value.PlatAccount}}</p>
													</div>
													<div class="weui-cell__ft">
														<span class="status">{{=value.ReviewStatusText}}</span>
													</div>
												</div>
												<div class="weui-cell">
													<div class="weui-cell__hd">
														收货地址
													</div>
													<div class="weui-cell__bd">
														<p class="title">{{=value.AddressInfo}}</p>
													</div>
												</div>
												<div class="weui-cell">
													<div class="weui-cell__hd">
														联系电话
													</div>
													<div class="weui-cell__bd">
														<p class="title">{{=value.ConsigneeCall}}</p>
													</div>
												</div>
												<div class="weui-cell">
													<div class="weui-cell__hd">
														联系人
													</div>
													<div class="weui-cell__bd">
														<p class="title">{{=value.ConsigneeName}}</p>
													</div>
												</div>
												{{if(value.ReviewStatusText=='审核失败'){}}
												<div class="weui-cell">
													<div class="weui-cell__hd" style="color:ff3333">
														审核失败原因：
													</div>
													<div class="weui-cell__bd">
														<p class="title" style="color:ff3333">{{=value.AuditFailedMsg}}</p>
													</div>
												</div>
												{{}}}
											</div>
										</li>

									</ul>
								</div>
								<div class="mayOrderTaking">
									<p>可接单数：今日{{=value.TodayMaxOrders}}单/本周 {{=value.WeekMaxOrders}}单/ 本月{{=value.MonthMaxOrders}}单</p>
                    </div>
                {{~}}
            </script> -->
			<div class="accountListBox" id="jdlist">

			</div>
		</div>
		<!--底部-->
		<div class="dd_footer addAcount__footer">
			<div class="inner">
				<div class="dd_Btns">
					<a href="javascript:openwin('bindjd','../bindjd.html');" class="weui-btn"><span class="addAcountIcon">新增一个京东账户</span></a>
				</div>
			</div>
		</div>
		<!--底部  end-->
	</div>
</template>

<script>
import {} from '@/utils';
export default {
    data(){
        return {

        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>