<template>
	<div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:api.closeWin();" class="btn_back"></a>
				<div class="title center">绑定淘宝账号</div>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox bind__msgBox" style="padding:.1rem .12rem;">
				<p class="title" style="font-size: .15rem;color:#222;">注意事项</p>
				<p>账号审核时间<span class="color_e40000">（周一至周五09:00-18:00）</span>，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看
					<a class="color_e40000" href="taobao_bindexamplespic.html">截图示例</a>！</p>
			</div>
			<div class="bindSection">
				<div class="dd__hd">
					<h2 class="title">账号信息</h2>
				</div>
				<div class="bindForm regLogForm onlyIpt__form" style="padding-top:0;padding-bottom: 0;">
					<form action="">
						<div class="weui-cells">
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="taobaoName" placeholder="请输入淘宝账号" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="shouhuoren" placeholder="收货人姓名" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="lianxidianhua" placeholder="联系电话" />
								</div>
							</div>
							<div class="weui-cell selectCity__weui-cell select__weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input"  id="area"  value="" placeholder="请选择城市" onclick="picker3()"/>
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
								<input type="hidden" id="provinceCode" readonly="true"/>
								<input type="hidden" id="cityCode" readonly="true"/>
								<input type="hidden" id="districtCode" readonly="true"/>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="xiangxidizhi"  placeholder="请输入详细地址" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="bindSection">
				<div class="dd__hd">
					<h2 class="title">账号属性（与实名认证的身份证信息一致）</h2>
				</div>
				<div class="bindForm regLogForm onlyIpt__form" style="padding-top:0;padding-bottom: 0;">
					<form action="">
						<div class="weui-cells">
							<div class="weui-cell selectSex__weui-cell select__weui-cell">
								<div class="weui-cell__bd">
									<select name="" id="sexId" class="weui-input">
										<option value="0">请选择性别</option>
										<option value="1">男</option>
										<option value="2">女</option>

									</select>
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="nianling" placeholder="请输入你的年龄" />
								</div>
							</div>
							<div class="weui-cell selectGrade__weui-cell select__weui-cell">
								<div class="weui-cell__bd">
									<select name="" id="xydj" class="weui-input">
										<option value="0">请选择信誉等级</option>
										<option value="1">1心</option>
										<option value="2">2心</option>
										<option value="3">3心</option>
										<option value="4">4心</option>
										<option value="5">5心</option>
										<option value="6">1钻</option>
										<option value="7">2钻</option>
										<option value="8">3钻</option>
										<option value="9">4钻</option>
										<option value="10">5钻</option>
										<option value="11">皇冠及以上</option>
									</select>
								</div>
							</div>
							<div class="weui-cell selectGrade__weui-cell select__weui-cell">
								<div class="weui-cell__bd">
									<select name="" id="taoqizhi" class="weui-input">
										<option value="0">请选择淘气值</option>
										<option value="1">1000以下</option>
										<option value="2">1000-1500</option>
										<option value="3">1500-2000</option>
										<option value="4">2000以上</option>
									</select>
									<!--<input type="text" class="weui-input" unselectable="on" onfocus="this.blur()" readonly="readonly" placeholder="请选择淘气值" />-->
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
							<div class="weui-cell selectGrade__weui-cell select__weui-cell" id="showSelectBuyTypeShade">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" unselectable="on" id="shopingId" onfocus="this.blur()" readonly="readonly" placeholder="请选择购物类目" />
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
								<input type="hidden" id="shoppingCategoryIdArray" readonly="true"/>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--上传图片-->
			<div class="bindSection">
				<div class="dd__hd">
					<span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
					<a href="taobao_bindexamplespic.html" class="lookExamples color_e40000">查看截图示列</a>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic0',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic0" readonly="true"/>
							</div>
							<p class="title">信誉等级</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic1',10)"><img src="" class="uploadImg"/></div>
                                <input type="hidden" id="pic1" readonly="true"/>
							</div>
							<p class="title">淘气值</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic2',10)"><img src="" class="uploadImg"/></div>
                                <input type="hidden" id="pic2" readonly="true"/>
							</div>
							<p class="title">实名认证</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic3',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic3" readonly="true"/>
							</div>
							<p class="title">花呗</p>
						</div>
					</li>
				</ul>
			</div>
			<!--上传图片  end-->
			<div class="dd__hd" style="padding-top:0;">
				<p class="titleMsg color_e40000">花呗：选填，开通花呗账号接单可获得更多佣金</p>
			</div>
			<a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin:.15rem .12rem .2rem;">提交审核</a>
		</div>

		<!--请选择购物类目的弹窗-->
		<div class="shade">
			<div class="shade__content">
				<div class="shade-item selectBuyTypeShade centerShadeItem">
					<div class="shade__hd">
						<h2 class="shade__title">请选择经常购买的3-5个购物类目</h2>
					</div>
					<!--  循环 -->
                  <!-- <script id="shopingCategoryListTemp" type="text/x-dot-template">
					{{~it:value:index}}
		                  	<li>
							<div class="outside">
                            <div class="weui-btn" index={{=value.Id}}>{{=value.Name}}</div>
                             </div>
							</li>
							 {{~}}
                    </script> -->
					<div class="shade__bd">
						<ul class="dd_BtnsList li33" id="shoppingcategory">

						</ul>
					</div>
					<div class="shade__ft">
						<div class="dd_Btns">
							<div class="weui-btn weui-btn-mini btn-cancle">取消</div>
							<div class="weui-btn weui-btn-mini btn-sure weui-btn-active">确定</div>
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