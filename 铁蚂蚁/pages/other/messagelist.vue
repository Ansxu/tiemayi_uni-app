<template>
	<div>
		<headers>系统消息</headers>
		<div class="main mt10">
			<div class="tabNav tabList">
				<ul class="clear">
					<li :class="{'active':tab==0}" @click="getData(0)">系统消息</li>
					<li :class="{'active':tab==1}" @click="getData(1)">用户消息</li>
				</ul>
			</div>
			<div class="messageList">
				<ul>
					<li class="box" v-for="(item,index) in list" :key="index">
						<div class="time"><span>{{editTime(item.PubTime,'time')}}</span></div>
						<div class="messagecon">
							<div class="title text">
												<span>
													<i class="icon" v-if="item.IsRead === 0"></i>
													<i class="" v-else></i>
													{{item.Title}}
												</span>
											</div>
							<div class="desc">
							{{item.Memo}}
							</div>
						</div>
						<div class="box_ft"><p class="link_btn arrow_r" @click="goUrl('other/messagedetail',{id:item.Id})">查看详情</p></div>
						<div class="messageId" style="display:none">{{item.Id}}</div>
					</li>
				</ul>
			</div>
			<div style="color:#999;line-height:3;text-align:center;">已经到底了哦~</div>
				<!--暂无消息时显示-->
			<div class="empty" v-if="list.length<1">
				<i class="icon icon_message"></i>
				<p>暂时没有消息哦！</p>
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
		page:1,
		pageSize:10,
		tab:0,//0-系统消息；1-用户消息
		list:[],
		notData:false,
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.getData();
  },
  onShow() {},
  methods: {
	  getData(tab){
		  if(tab!==undefined&&tab!=this.tab){
			  this.tab = tab;
			  this.notData = false;
			  this.page=1;
			  this.list=[];
		  }
		  post('Notice/GetNoticeByMember',{
				UserId: this.userId,
				Token: this.token,
                Page: this.page,
                PageSize: this.pageSize,
                SendType: 1,
                UserType: tab||this.tab
		  }).then(res=>{
			  const list = res.obj;
			  if(list.NoticeList.length<this.pageSize){
				  this.notData = true;
			  }
			  this.list.push(...list.NoticeList);
		  })
	  }
  },
	onReachBottom(){
		if(!this.notData){
			this.page+=1;
			this.getData();
		}
	}
}
</script>

<style lang="scss" scoped>
	@import '../../css/style_other.css';
	@import '../../css/task.css'
</style>
