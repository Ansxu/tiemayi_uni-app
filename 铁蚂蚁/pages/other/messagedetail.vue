<template>
	<div>
		<headers>系统消息</headers>
		<div class="main" id="messageDetailTempMain">
			<div class="messagedetail">
					<div class="title mb10">{{data.Title}}</div>
					<div class="con" v-html="data.Memo">
					</div>
			</div>
		</div>
		<!--dot.js赋值-->
		<!-- <script id="messageDetailTemp" type="text/x-dot-template">
				<div class="messagedetail">
						<div class="title mb10">{{=it.Title}}</div>
						<div class="con">
							{{=it.Memo}}
						</div>
				</div>
		</script> -->
	</div>
</template>

<script>
import {post,toast,goUrl,editTime} from '@/utils';
import h5Copy  from '@/utils/junyi-h5-copy';
export default {
  data() {
    return {
		goUrl,
		editTime,
        userId:'',
		token:'',
		data:[],
		id:'',
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
	this.token = uni.getStorageSync('token');
	this.id = options.id;
    this.getData();
  },
  onShow() {},
  methods: {
	  getData(){
		  post('Notice/ReadNoticeInfo',{
				UserId: this.userId,
				Token: this.token,
                NoticeId: this.id
		  }).then(res=>{
			  this.data = res.obj;
		  })
	  }
  },
}
</script>

<style scoped lang="scss">
	.main{
		padding:20upx;
	}
	.title{
		color:#333;
		font-size:16px;
		border-bottom:1px #f2f2f2 solid;
		line-height:1.5;
		padding-bottom:10px;
		text-align:center;
	}
	.con{
		color:#555;
		font-size:14px;
	}
</style>
