<template>
    <div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:history.go(-1);" class="btn_back"></a>
				<div class="title center">QQ号</div>
			</div>
		</div>
		<div class="main">
			<div class="dd__hd weui-cell">
				<div class="weui-cell__hd"><img src="/static/image/icons/d_msg1.png" alt="" class="msgIcon" /></div>
				<div class="weui-cell__bd">
					<p class="titleMsg">为了方便与你的联系，请务必填写真实的QQ号码</p>
				</div>
			</div>
			<div class="bindForm regLogForm onlyIpt__form" style="padding-top:.1rem;">
				<form action="">
					<div class="weui-cells">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<input type="text" class="weui-input" id="qqNum" placeholder="请输入QQ号码" />
							</div>
						</div>
					</div>

				</form>
			</div>
				<a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin:.2rem .12rem .2rem;">提交</a>
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
			data:{},
        }
    },
    onLoad(){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.getData();
    },
    onShow(){

    },
    methods:{
		getData(){
			post('Member/GetUserBindIdCardInfo',{
                UserId: this.userId,
                Token: this.token
			}).then(res=>{
				this.data = res.obj;
			})
		}
    }
}
</script>


<style lang="scss" scoped>

</style>