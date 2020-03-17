<template>
    <div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:api.closeWin();" class="btn_back"></a>
				<div class="title center">绑定美丽说账号</div>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox bind__msgBox" style="padding:.1rem .12rem;">
				<p class="title" style="font-size: .15rem;color:#222;">注意事项</p>
				<p class="color_e40000">1、请输入美丽说用户名</p>
				<p>2、请确保收货地址和收货联系人真实具体，并保证和美丽说上下单的收货地址信息一致</p>
				<p>3、请确认多个美丽说号之间使用不同的收货信息（收货姓名，地址和电话不同）</p>
				<p>4、账号审核人工进行，正常一个工作日内完成，只有审核通过的买号才能接受任务</p>
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
									<input type="text" class="weui-input"  id="mlsName" placeholder="请输入美丽说账号" />
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
									<input type="text" class="weui-input" id="xiangxidizhi" placeholder="请输入详细地址" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>

			<!--上传图片-->
			<div class="bindSection">
				<div class="dd__hd">
					<span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
					<a href="mls_bindexamplespic.html" class="lookExamples color_e40000">查看截图示列</a>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic0',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic0" readonly="true"/>
							</div>
							<p class="title">我的页面</p>
						</div>
					</li>

				</ul>
			</div>
			<!--上传图片  end-->
			<div class="dd__hd" style="padding-top:0;">
				<p class="titleMsg color_e40000">未通过审核的账号信息，可以直接修改提交</p>
			</div>
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