<template>
	<div style="padding:20upx;">
		<headers>公告详情</headers>
		<div class="main pd12">
			<div class="notice-hd">
				<div class="box">
					<div class="title"><p class="text">{{data.Title}}</p><i class="icon icon_txt">公告</i></div>
					<div class="desc"><span>旺店宝</span> <span class="time">{{editTime(data.PubTime,'time')}}</span></div>
				</div>
			</div>
			<div class="noticecon" v-html="data.Memo">
			</div>
		</div>
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

<style lang="scss">
	@import '../../css/style_other.css';
	@import '../../css/api.css'
</style>
