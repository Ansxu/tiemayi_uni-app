<template>
<div class="bg_f8f8f8">
	<headers>身份证认证</headers>
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
							<input type="text" class="weui-input" 
								:disabled="data.IsAUT===1" v-model.trim="data.Idcard"  id="realName" placeholder="请输入您的真实姓名" />
						</div>
					</div>
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<input type="text" class="weui-input" 
								:disabled="data.IsAUT===1" v-model.trim="data.UserRName" id="idNum" placeholder="请输入您的身份证号码" />
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
						<div class="outside" @click="upImg(1)">
							<div class="img">
								<!-- <div class="upimg" onclick="photograph(this,'pic0',10)" id="getpic0"><img src="" id="IdcardPositive" class="uploadImg" /></div> -->
								<img class="upimg" :src="data.IdcardPositive" alt="" v-if="data.IdcardPositive">
								<img class="upimg" src="/static/image/tx/tx_pic.png" alt="" v-else>
								<!-- <input type="hidden" id="pic0" readonly="true" /> -->
							</div>
							<p class="title">身份证正面照</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"><img src="/static/image/examplespic/idcard/pic2.jpg"></div>
							</div>
						</div>
					</li>
				</ul>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside" @click="upImg(2)">
							<div class="img">
								<!-- <div class="upimg" onclick="photograph(this,'pic1',10)" id="getpic1"><img src="" id="IdcardNegative" class="uploadImg" /></div> -->
								<img class="upimg" :src="data.IdcardNegative" alt="" v-if="data.IdcardNegative">
								<img class="upimg" src="/static/image/tx/tx_pic.png" alt="" v-else>
								<!-- <input type="hidden" id="pic1" readonly="true" /> -->
							</div>
							<p class="title">身份证反面照</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"><img src="/static/image/examplespic/idcard/pic0.jpg"></div>
							</div>
						</div>
					</li>
				</ul>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside" @click="upImg(3)">
							<div class="img">
								<!-- <div class="upimg" onclick="photograph(this,'pic2',10)" id="getpic2"><img src="" id="IdcardInHand" class="uploadImg" /></div>
								<input type="hidden" id="pic2" readonly="true" /> -->
								<img class="upimg" :src="data.IdcardInHand" alt="" v-if="data.IdcardInHand">
								<img class="upimg" src="/static/image/tx/tx_pic.png" alt="" v-else>
							</div>
							<p class="title">手持身份证照</p>
						</div>
					</li>
					<li>
						<div class="outside" >
							<div class="img">
								<div class="upimg"><img src="/static/image/examplespic/idcard/pic1.jpg"></div>
							</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
		<div class="weui-btn weui-btn-active btn-submit" @click="submit" v-if="data.IsAUT!==1" style="margin:.2rem .12rem .2rem;">提交</div>
	</div>
</div>
</template>

<script>
import {post,getImgPath,toast} from '@/utils';
import {pathToBase64} from '@/utils/image-tools'
export default {
    data(){
        return {
			userId:'',
			token:'',
			// IsAUT--1:已认证
			data:{
				Idcard:'',
				UserRName:'',
				IdcardNegative:'',
				IdcardPositive:'',
				IdcardInHand:'',
				IsAUT:0,
			},
			// isSubmit:true,//是否可以重新提交
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
				const data = res.obj;
				this.data = data;
				
			})
		},
		// 上传照片,1-正面，2反面,3-手持照片
		upImg(type){
			if(this.data.IsAUT==1)return;
			getImgPath().then(res=>{
				if(type===1){
					this.data.IdcardPositive = res;
				}else if(type===2){
					this.data.IdcardNegative = res;
				}else if(type===3){
					this.data.IdcardInHand = res;
				}
			})
		},
		// 提交
		submit(){
			if(!this.check()) return;
			let Positive ='';
			let Negative ='';
			// pathToBase64(this.data.IdcardPositive).then(a=>{
			// })
			Promise.all([pathToBase64(this.data.IdcardPositive),pathToBase64(this.data.IdcardNegative),pathToBase64(this.data.IdcardInHand)])
			.then(arr=>{
				post('Member/BindUserIdCard',{
					UserId: this.userId,
					Token: this.token,
					UserRName: this.data.UserRName,
					Idcard: this.data.Idcard,
					IdCardImgOne: arr[0],
					IdCardImgTwo: arr[1],
					IdCardImgThree: arr[2]
				}).then(res=>{
					toast(res.msg,true); 
					setTimeout(()=>{
						uni.navigateBack();
					},1500)
				})
			})
		},
		// 校验
		check(){
			const data = this.data;
			if(!data.Idcard){
				toast('请输入身份证！');
				return false;
			}
			if(!data.UserRName){
				toast('请输入姓名！');
				return false;
			}
			if(!data.IdcardPositive){
				toast('请上传身份证正面！');
				return false;
			}
			if(!data.IdcardNegative){
				toast('请上传身份证反面！');
				return false;
			}
			if(!data.IdcardInHand){
				toast('请上传手持身份证！');
				return false;
			}
			return true;
		}
    }
}
</script>

<style lang="scss" scoped>
	.outside{
		width:100px;
	}
	.main{
		padding:0 10px;
		img{
			border-radius: 3px;
			width:100px;
			height:100px;
		}
	}
	.li25 li {
    	width: 30%;
	}
	
</style>