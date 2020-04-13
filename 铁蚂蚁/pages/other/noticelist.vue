<template>
	<div class="bg_gray">
		<headers>公告</headers>
		<div class="main bg_fff">
			<div class="noticeList">
				<ul>
					<li v-for="(item,oll) in list" :key="oll">
						<div @click="goUrl('other/noticedetail',{id:item.Id})" class="box">
							<div class="title">
								<p class="text">{{item.Title}}</p>
								<i class="icon icon_txt" v-if="item.IsRead === 0">NEW</i>
								<i class="icon icon_txt" v-else></i>
							</div>
							<span class="time">{{item.PubTime.split('T')[0]}}</span>
						</div>
					</li>
				</ul>
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
		list:[],
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.getData();
  },
  onShow() {},
  methods: {
	  getData(){
		  post('Notice/GetNoticeByMember',{
				UserId: this.userId,
				Token: this.token,
				Page: 1,
				PageSize: 10,
                SendType: 0
		  }).then(res=>{
			  const list = res.obj;
			  this.list=list.NoticeList;
		  })
	  }
  }
}
</script>


<style lang="scss" scoped>
	@import '../../css/style_other.css';
	@import '../../css/api.css';
	.noticeList {
	    height: 100%!important;
	    overflow: auto!important;
	}

</style>
