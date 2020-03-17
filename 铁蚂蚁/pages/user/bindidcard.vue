<template>
<div class="bg_f8f8f8">
	<div class="h45">
		<div class="head bb_border">
			<a href="javascript:history.go(-1);" class="btn_back"></a>
			<div class="title center">身份证信息</div>
		</div>
	</div>
	<div class="main">
		<div class="dd__hd weui-cell">
			<div class="weui-cell__bd">
				<p class="titleMsg">根据国家网信办新规，平台进行实名安全工作，当您的账户出现风险时，在必要时系统会要求您进行更高级别的认证。
					<br />我们承诺保障您账户的资金安全，且不会泄露您的个人隐私，请您积极配合。
				</p>
			</div>
		</div>
		<div class="bindForm regLogForm onlyIpt__form" style="padding: 0 .1rem .1rem;">
			<form action="">
				<div class="weui-cells" style="margin-top:0;">
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<input type="text" class="weui-input" id="realName" placeholder="请输入您的真实姓名" />
						</div>
					</div>
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<input type="text" class="weui-input" id="idNum" placeholder="请输入您的身份证号码" />
						</div>
					</div>
				</div>
			</form>
		</div>
		<div class="bindSection">
			<div class="dd_uploadItem">
				<div class="dd__hd">
					<p class="title color_e40000">请根据示例截图上传身份证(照片必需清晰可见)</p>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="photograph(this,'pic0',10)" id="getpic0"><img src="" id="IdcardPositive" class="uploadImg" /></div>
								<input type="hidden" id="pic0" readonly="true" />
							</div>
							<p class="title">身份证正面照</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"><img src="static/image/examplespic/idcard/pic2.jpg"></div>
							</div>
						</div>
					</li>
				</ul>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="photograph(this,'pic1',10)" id="getpic1"><img src="" id="IdcardNegative" class="uploadImg" /></div>
								<input type="hidden" id="pic1" readonly="true" />
							</div>
							<p class="title">身份证反面照</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"><img src="static/image/examplespic/idcard/pic0.jpg"></div>
							</div>
						</div>
					</li>
				</ul>
				<ul class="dd_piclist li25" style="display:none;">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="photograph(this,'pic2',10)" id="getpic2"><img src="" id="IdcardInHand" class="uploadImg" /></div>
								<input type="hidden" id="pic2" readonly="true" />
							</div>
							<p class="title">手持身份证照</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"><img src="static/image/examplespic/idcard/pic1.jpg"></div>
							</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin:.2rem .12rem .2rem;">提交</a>
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