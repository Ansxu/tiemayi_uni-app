<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="" class="btn_back"></a>
				<div class="title center" id="commisontitle">佣金提现</div>
				<a href="javascript:towithdrawRecord()" class="icon_r txt">查看明细</a>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox" style="padding:.1rem .12rem;">
				<p class="title" style="font-size: .15rem;">提现说明</p>
				<p>1、佣金<span id="min_commission">50</span>金币起提，平台<span class="withdrawalTime">48</span>小时内完成提现审核
					<br /> 2、本金可随时提现(<span id="min_principal">1</span>元起提)，平台<span class="withdrawalTime">48</span>小时内完成提现审核
					<br /> 3、申请提现后，相应金币进入冻结不可用状态
					<br /> 4、提现免手续费，有任何问题请联系平台客服
					<br /> 5、每日最多提现<span id="withdrawNum">1</span>次(佣金：1金=<span id="commissionRate">0.4</span>元)
					<br /> 6、晚上18:00到第二天早上8:00为打款时间，不支持提现
				</p>
			</div>
			<div class="dd_withdraw">
				<div class="withdraw__hd weui-cell">
					<div class="weui-cell__hd"><label for="">提现账户：</label></div>
					<div class="weui-cell__bd">
						<p class="txt">
							<span class="name">XXX</span>
							<span class="cardID">XXXX************XXXX</span>
						</p>
					</div>
				</div>
				<div class="withdraw__bd">
					<div class="dd_Btns flex btn_tabList">
						<div class="weui-btn" id="yongjintx">佣金提现</div>
						<div class="weui-btn" id="benjintx">本金提现</div>
					</div>
					<input type="hidden" id="cash10" readonly="true"/>
					<input type="hidden" id="cash11" readonly="true"/>
					<input type="hidden" id="cash20" readonly="true"/>
					<input type="hidden" id="cash21" readonly="true"/>
					<!--tab-->
					<div class="tabShowBox" style="margin-bottom: 0;">
						<div class="tabItem">
							<div class="regLogForm onlyIpt__form" style="padding-top:0;">
								<p class="priceMsg">
									<span id="cash">可提金币：0金</span>
									<span id="frozencash">冻结金币：0金</span>
								</p>
								<form action="">
									<div class="weui-cells">
										<div class="weui-cell">
											<div class="weui-cell__bd">
												<input type="text" placeholder="请输入提现金额" class="weui-input" id="cashinput" />
											</div>
										</div>
										<div class="weui-cell">
											<div class="weui-cell__bd">
												<input type="password" placeholder="请输入登录密码" class="weui-input" id="passkey" />
											</div>
										</div>
									</div>
								</form>
								<p class="priceMsg" style="margin:0;">
									<span id="tipsText">实际到账：0.00元&nbsp;(1金 = 0.4元)</span>
								</p>
					            <input type="hidden" id="amountProportionOfFees" readonly="true"/>
					           <input type="hidden" id="walletProportionOfFees" readonly="true"/>
					           <input type="hidden" id="commissionConversion" readonly="true"/>
								<a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin-top:.2rem;">提交</a>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
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