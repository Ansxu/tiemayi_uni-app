<template>
	<div>
		<headers>{{name}}</headers>
	    <div class="main">
	        <div class="searchbox">
	            <div class="Search">
	                <input type="text" v-model="searchWord" class="input" placeholder="简单输入问题，如“找回密码”" />
	                <div type="button" class="searchbtn" @click="search"></div> 
	            </div>
	        </div>
	        <div class="Faq-detail">
	            <ul class="downlist" v-for="(item,index) in list" :key="index">
					<li @click="item.status=!item.status">
						<div class="title arrow_r">
							<p>{{item.Jianjie}}</p>
						</div>
						<div class="dropdown-box" v-show="item.status">
							<div class="desc" v-html="item.ContentText"></div>
						</div>
					</li>
	            </ul>
	        </div>
	    </div>
	</div>
</template>

<script>
	import {post} from '@/utils';
	export default {
		data(){
			return {
				id:'',
				name:'常见问题',
				list:[],
				page:1,
				pageSize:20,
				searchWord:'',//搜索关键词
				notData:false,
			}
		},
		onLoad(options){
			console.log(options)
			this.id = options.id;
			this.name = options.name;
			this.getList();
		},
		methods:{
			search(){
				this.notData=false;
				this.page=1;
				this.list=[];
				this.getList();
			},
			getList(){
				post('Help/GetHelpList',{
					HelpClassId: this.id,
					Page: this.page,
					PageSize: this.pageSize,
					SarchKeyword: this.searchWord
				}).then(res=>{
					const data = res.obj;
					data.HelpClassList.map(item=>{
						item.status = false;
					})
					this.list.push(...data.HelpClassList);
					if(data.HelpClassList<this.pageSize){
						this.notData=true;
					}
				})
			}
		},
		// 上拉加载
		onReachBottom(){
			if(!this.notData){
				this.page+=1;
				this.getList();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/api.css';
	.searchbox{
		padding:0 10px;
	}
	.Search{
		border: 1px solid #e8e8e8;
		input{
			font-size:12px;
		}
	}
	.downlist{
		border-bottom: 1px solid #e8e8e8;
		font-size:14px;
	}
	.dropdown-box{
		display:block;
	}
</style>
