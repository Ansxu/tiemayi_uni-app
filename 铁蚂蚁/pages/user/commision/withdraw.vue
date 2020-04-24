<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<p @click="backUrl" class="btn_back"></p>
				<div class="title center" id="commisontitle">佣金提现</div>
				<p @click="goUrl('./withdraw_record')" class="icon_r txt">查看明细</p>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox" style="padding:10px 12px;">
				<p class="title" style="font-size: 15px;">提现说明</p>
				<p>1、佣金未满<span id="min_commission">{{data.MinCommissionWithdraw}}</span>扣<span id="Amount_Fees">{{data.AmountProportionOfFees}}</span>元手续费，提现金额小于<span id="MinWithdrawCommission">{{data.MinWithdrawCommission}}</span>元无法提现，平台<span class="withdrawalTime">{{data.CashWithdrawalTime}}</span>小时内完成提现审核
				<!-- <p>1、佣金<span id="min_commission">{{data.MinCommissionWithdraw}}</span>金币起提，平台<span class="withdrawalTime">{{data.CashWithdrawalTime}}</span>小时内完成提现审核 -->
					<br /> 2、本金可随时提现(<span id="min_principal">{{data.MinPrincipalWithdrawal}}</span>元起提)，平台<span class="withdrawalTime">{{data.CashWithdrawalTime}}</span>小时内完成提现审核
					<br /> 3、申请提现后，相应金币进入冻结不可用状态
					<br /> 4、提现免手续费，有任何问题请联系平台客服
					<br /> 5、每日最多提现<span id="withdrawNum">{{data.DayWithdrawalMaxNum}}</span>次(佣金：1金=<span id="commissionRate">{{data.CommissionConversion}}</span>元)
					<br /> 6、晚上18:00到第二天早上8:00为打款时间，不支持提现
				</p>
			</div>
			<div class="dd_withdraw">
				<div class="withdraw__hd weui-cell">
					<div class="weui-cell__hd"><label for="">提现账户：</label></div>
					<div class="weui-cell__bd">
						<p class="txt">
							<span class="name">{{data.BankCardName}}</span>
							<span class="cardID">{{data.BankCardNo}}</span>
						</p>
					</div>
				</div>
				<div class="withdraw__bd">
					<div class="dd_Btns flex btn_tabList">
						<div class="weui-btn" :class="[btnType=='yongjintx'?'weui-btn-active':'']" @click='select' id="yongjintx" >佣金提现</div>
						<div class="weui-btn" :class="[btnType=='benjintx'?'weui-btn-active':'']" @click='select' id="benjintx">本金提现</div>
					</div>
					<!--tab-->
					<div class="tabShowBox" style="margin-bottom: 0;">
						<div class="tabItem">
							<div class="regLogForm onlyIpt__form" style="padding-top:0;">
								<p class="priceMsg">
									<span id="cash" v-if="btnType=='yongjintx'">可提金币：{{btnType=='yongjintx'?data.Amount:data.Wallet}}金</span>
									<span id="frozencash" v-if="btnType=='yongjintx'">冻结金币：{{btnType=='yongjintx'?data.FrozenAmount:data.FrozenWallet}}金</span>
								</p>
								<div class="weui-cells">
									<div class="weui-cell">
										<div class="weui-cell__bd">
											<input type="number" placeholder="请输入提现金额" class="weui-input" :value="value" :disabled="disabl"  @input="input"/>
										</div>
									</div>
									<div class="weui-cell">
										<div class="weui-cell__bd">
											<input type="password" placeholder="请输入登录密码" class="weui-input" id="passkey" :value="password" @input="passkey" />
										</div>
									</div>
								</div>
								<p class="priceMsg" style="margin:0;" v-if="btnType=='yongjintx'">
									<span id="tipsText" v-if="value>data.MinCommissionWithdraw">实际到账：{{total}}元&nbsp;(1金 = {{data.CommissionConversion}}元)</span>
									<span id="tipsText" v-else>实际到账：{{total}}元&nbsp;(1金 = {{data.CommissionConversion}}元)(手续费{{data.AmountProportionOfFees}}元)</span>
								</p>
								<p class="priceMsg" style="margin:0;" v-else-if="btnType=='benjintx'">
									<span id="tipsText" v-if="total>data.MinPrincipalWithdrawal">实际到账：{{total}}元&nbsp;(1金 = {{data.CommissionConversion}}元)</span>
									<span id="tipsText" v-else>实际到账：0元&nbsp;(1金 = {{data.CommissionConversion}}元)</span>
								</p>
					            <input type="hidden" id="amountProportionOfFees" readonly="true"/>
					           <input type="hidden" id="walletProportionOfFees" readonly="true"/>
					           <input type="hidden" id="commissionConversion" readonly="true"/>
								<p @click="sumbit" class="weui-btn weui-btn-active btn-submit" style="margin-top:20px;">提交</p>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {post} from '@/utils';
export default {
    data(){
        return {
			userId:'',
			token:'',
			btnType:'yongjintx',
			data:{},
			value:'',
			password:'',
			total:0,
			disabl:false
        }
    },
  onLoad(){
	this.value ='';
	this.password ='';
	this.disabl= false;
  	this.userId = uni.getStorageSync("userId");
  	this.token = uni.getStorageSync("token");
	this.init()
  },
  onShow(){
  	if (
  	  this.userId !== uni.getStorageSync("userId") ||
  	  this.token !== uni.getStorageSync("token")
  	) {
  	  this.userId = uni.getStorageSync("userId");
  	  this.token = uni.getStorageSync("token");
  	}
  },
    methods:{
		backUrl(){
			uni.navigateBack({
				delta:1
			})
		},
		goUrl(e){
			let wallettype=1
			if(this.btnType=="yongjintx"){
				wallettype=1
			}else if(this.btnType=="benjintx"){
				wallettype=2
			}
			console.log(e+'?'+wallettype)
			uni.navigateTo({
				url:e+'?wallettype='+wallettype
			})
			
		},
		select(e){
			// console.log(e.currentTarget.id)
			let id = e.currentTarget.id
			this.btnType=id
			this.value=''
			this.disabl=false
			this.total=0
		},
		init(){
			post('Withdraw/LoadingWithdrawPage',{
				UserId: this.userId,
				Token: this.token,
			}).then(res => {
				const data=res.obj
				console.log(data)
				this.data=data
			}).catch(()=>{
				setTimeout(()=>{
					this.backUrl();
				},1500)
			})
		},
		// 获取提现金额
		input(e){
			console.log(e)
			if(this.btnType==''){
				uni.showToast({ 
					title:'请选择提现款项！',
					icon:'none',
					success() {
						this.disabl=true
					}
				})
				
				// return
			}else if(this.btnType=='yongjintx'){
				if(e.detail.value>this.data.Amount){
					uni.showToast({
						title:'超出可提现金额',
						icon:'none'
					})
					this.value=''
					this.total=0
				}else{
					this.value=this.value=parseFloat(e.detail.value)
					if(this.value >= this.data.MinCommissionWithdraw){
						this.total=this.value* (this.data.CommissionConversion)
					}else if(this.value< this.data.MinCommissionWithdraw &&this.value!=0){
						this.total=this.value* (this.data.CommissionConversion) - this.data.AmountProportionOfFees
					}else if(!this.value) {
						this.value=''
						this.total=0
					}
				} 
			}else if(this.btnType=='benjintx'){
				if(e.detail.value>this.data.Wallet){
					uni.showToast({
						title:'超出可提现金额',
						icon:'none'
					})
					this.value=''
					this.total=0
				}else if(this.data.MinPrincipalWithdrawal<parseFloat(e.detail.value*this.data.CommissionConversion)<this.data.Amount){
					// this.value=e.detail.value
					// this.total=this.value* (this.data.CommissionConversion/100)
						this.value=parseFloat(e.detail.value)
						this.total=parseFloat(this.value*this.data.CommissionConversion)
				}else if(this.data.MinPrincipalWithdrawal>parseFloat(e.detail.value*this.data.CommissionConversion)){
					uni.showToast({
						title:'提现金额过低',
						icon:'none'
					})
					this.value=''
					this.total=0
				}
			}
		},
		//获取登录密码
		passkey(e){
			this.password=e.detail.value
			
		},
		sumbit(){
			const that = this;
			const data = this.data;
			if(this.value==''){
				uni.showToast({
					title:'请输入提现金额',
					icon:'none'
				})
				return;
			}
			if(this.value !='' && this.password==''){
				uni.showToast({
					title:'请输入登录密码',
					icon:'none'
				})
				return;
			}
			if(that.btnType=='yongjintx'){ 
				if(this.value<data.MinWithdrawCommission){
					uni.showToast({
						title:'提现佣金不能少于'+data.MinWithdrawCommission,
						icon:'none'
					})
					return;
				}
				if(this.value < this.data.MinCommissionWithdraw){
					// this.value=this.value.toFixed(4)
					uni.showModal({
						title:'佣金提现小于最小佣金提现额度需扣除手续费',
						success(r) {
							if(r.confirm){
								that.success();
							}
						}
					})
				}else{
					// this.value=this.value.toFixed(4)
					uni.showModal({
						title:'是否提现拥金',
						success(r) {
							if(r.confirm){
								that.success();
							}
						}
					})
					
				}
			}else if(that.btnType=='benjintx'){
				if(this.value<data.MinPrincipalWithdrawal){
					uni.showToast({
						title:'提现本金不能少于'+data.MinPrincipalWithdrawal,
						icon:'none'
					})
					return;
				}
				uni.showModal({
					title:'是否提现本金',
					success(r) {
						if(r.confirm){
							post('Withdraw/PrincipalWithdrawal',{
								UserId: that.userId,
								Token: that.token,
								WithdrawalAmount: that.value,
								LoginPassWord: that.password
							}).then(res =>{
								that.value=''
								that.total=0
								that.password='';
								that.init();
								uni.showToast({
									title:'提现成功！'
								})
							})
						}
					}
				})
			}
		},
		success(){
			post('Withdraw/CommCommissionWithdrawal',{
					UserId: this.userId,
					Token: this.token,
					WithdrawalAmount: this.value,
					LoginPassWord: this.password
			}).then(res =>{
				this.value=''
				this.total=0
				this.password='';
				this.init();
				uni.showToast({
					title:'提现成功！'
				})
			})
		}
    }
}
</script>

<style lang="scss" scoped>

</style>