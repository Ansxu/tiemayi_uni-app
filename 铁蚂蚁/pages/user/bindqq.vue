<template>
    <div class="bg_f8f8f8">
		<headers>QQ号</headers>
		<div class="main">
			<div class="dd__hd weui-cell">
				<div class="weui-cell__hd"><img src="/static/image/icons/d_msg1.png" alt="" class="msgIcon" /></div>
				<div class="weui-cell__bd">
					<p class="titleMsg">为了方便与你的联系，请务必填写真实的QQ号码</p>
				</div>
			</div>
			<div class="bindForm regLogForm onlyIpt__form" style="padding-top:.1rem;">
					<div class="weui-cells">
						<div class="weui-cell">
							<div class="weui-cell__bd">
								<input type="number" class="weui-input" :disabled="data.IsBindQQ===1" v-model.trim="data.QQ" id="qqNum" placeholder="请输入QQ号码" />
							</div>
						</div>
					</div>
			</div>
				<div @click="submit" v-if="data.IsBindQQ!==1" class="weui-btn weui-btn-active btn-submit" style="margin:.2rem .12rem .2rem;">提交</div>
		</div>
	</div>
</template>

<script>
import {post,toast} from '@/utils';
export default {
    data(){
        return {
			userId:'',
			token:'',
			data:{
				QQ:'',
				IsBindQQ:1
			},
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
			post('Member/GetUserQQInfo',{
                UserId: this.userId,
                Token: this.token
			}).then(res=>{
				this.data= res.obj;
			})
		},
		submit(){
			const data = this.data;
			if(!data.QQ){
				toast('请输入QQ号');
				return;
			}
			if(data.QQ<5||data.QQ>12){
				toast('请输入正确的QQ号');
				return;
			}
			post('Member/BindUserQQ',{
                UserId: this.userId,
                Token: this.token,
				UserQQ: data.QQ
			}).then(res=>{
				toast('提交成功',true);
				uni.navigateBack();
			})

		}
    }
}
</script>


<style lang="scss" scoped>

</style>