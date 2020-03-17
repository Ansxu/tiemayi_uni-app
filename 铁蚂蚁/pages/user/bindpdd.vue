<template>
    <div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:api.closeWin();" class="btn_back"></a>
				<div class="title center">绑定拼多多账号</div>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox bind__msgBox" style="padding:.1rem .12rem;">
				<p class="title" style="font-size: .15rem;color:#222;">注意事项</p>
				<p>账号审核时间<span class="color_e40000">（周一至周五09:00-18:00）</span>，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看
					<a class="color_e40000" href="pdd_bindexamplespic.html">截图示例</a>！</p>
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
									<input type="text" class="weui-input" id="pddName" placeholder="请输入拼多多用户名" />
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
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="orderNumber" placeholder="请输入订单编号" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--上传图片-->
			<div class="bindSection">
				<div class="dd__hd">
					<span class="titleMsg">点击上传图片(上传后，再次点击可更换图片）</span>
					<a href="pdd_bindexamplespic.html" class="lookExamples color_e40000">查看截图示列</a>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic0',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic0" readonly="true"/>
							</div>
							<p class="title">账户截图</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic1',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic1" readonly="true"/>
							</div>
							<p class="title">订单验证截图</p>
						</div>
					</li>
				</ul>
			</div>
			<!--上传图片  end-->
			<a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin:.15rem .12rem .2rem;">提交审核</a>
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