<template>
	<div>
		<headers>常见问题</headers>
		<div class="main">
			<div class="Faq">
				<div class="Faq-type">
					<ul class="li50 clear">
						<li v-for="(item,index) in list" :key="index">
							<div class="box" @click="goUrl('other/faqdetail',{id:item.Id,name:item.ClassName})">
								<i class="icon"><img :src="item.Logo"></i>
								<p>{{item.ClassName}}</p>
								<div style="display:none">{{item.Id}}</div>
							</div>
						</li>
					</ul>
			</div>
	
			<div class="online">
				<div class="title">在线客服<span>(09:00~22:00)</span></div>
				<div class="desc">
					所有常见问题都有相应的解决方案，请参考常见问题自主解决，如 果常见问题无法解决您的问题在咨询客服，由于客服咨询量较大， 请尽可能的描述清楚您的问题，以便快速解决
					</div>
				</div>
	
				<div class="ftbtn mb10">
					<a class="btn qqbtn" :href="qqurl">QQ咨询</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {get,goUrl} from '@/utils'
	export default {
		data(){
			return {
				goUrl,
				list:[],
				qqurl:'',
			}
		},
		onLoad(){
			this.getGradeList();
		},
		methods:{
			getGradeList(){
				get('Help/GetAllHelpClass',{},{isLogin:true}).then(res=>{
					this.list = res.obj.HelpClassList;
            		this.qqurl = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + res.obj.ConsultationQQ + "&card_type=group&source=qrcode";
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/api.css';
	.clear .box{
		p{
			line-height:1.9;
		}
	}
	.ftbtn{
		padding:0 10px;
	}
</style>
