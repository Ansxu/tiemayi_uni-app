<template>
	<div>
		<headers>{{name}}</headers>
	    <div class="main">
	        <div class="searchbox">
	            <div class="Search">
	                <input type="text" class="input" placeholder="简单输入问题，如“找回密码”" />
	                <input type="button" class="searchbtn" onclick="search()" />
	            </div>
	        </div>
	        <div class="Faq-detail">
	            <!--  循环 -->
	        <!--    <script id="FAQUserTemp" type="text/x-dot-template">
	                {{~it:value:index}}
	                <li onclick="showContent(this)">
	                    <div class="title arrow_r">
	                        <p>{{=value.Jianjie}}</p>
	                    </div>
	                    <div class="dropdown-box">
	                        <div class="desc">
	                            {{=value.ContentText}}
	                        </div>
	                    </div>
	                </li>
	                {{~}}
	            </script> -->
	            <ul class="downlist" v-for="(item,index) in 6" :key="index">
					<li onclick="showContent(this)">
						<div class="title arrow_r">
							<p>这个是好问题哈 哈哈哈哈哈哈</p>
						</div>
						<div class="dropdown-box">
							<div class="desc">
								内容是不可能高速你的哈哈哈哈哈 哈哈和 和哈哈和和和哈哈和哈哈和fsdfsfsdgsgsgsgdsgds
							</div>
						</div>
					</li>
	            </ul>
	        </div>
	    </div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				id:'',
				name:'常见问题',
			}
		},
		onLoad(options){
			console.log(options)
			this.id = options.id;
			this.name = options.name;
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/api.css';
</style>
