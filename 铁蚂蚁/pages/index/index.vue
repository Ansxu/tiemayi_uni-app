<template>
  <div class="index bg_gray">
    <div class="h45">
      <div class="head">
        <div class="title center">首页</div>
        <div @click="goUrl('other/messagelist')" class="icon_r icon_news">
          <span id="noticeCount" v-if="unreadCount">{{unreadCount}}</span>
        </div>
      </div>
    </div>
    <div class="main" style="padding:10px;">
      <!-- getBanner -->
      <swiper class="swiper-container banner" indicator-dots indicator-active-color="#fff">
        <swiper-item class="swiper-slide" v-for="(item,index) in banner" :key="index">
          <img class="img" :src="item.Pic" />
        </swiper-item>
      </swiper>
      <!-- task -->
      <div class="bg_fff mb10" id="notOperated">
        <div class="notOperatedTask">
          <ul class="clear notOperatedList">
            <li v-for="(item,index) in taskList" :key="index">
              <div @click="taskDetail(item.TaskAcceptNo)" class="outside">
                <div class="pictrue_div">
                  <div class="pictrue">
                    <img :src="item.ProductImg" alt />
                  </div>
                </div>
                <div class="info_box">
                  <div class="info_left">
                    <p>
                      {{item.TaskText}}
                      <span>&nbsp;{{item.GetCommission}}金</span>
                    </p>
                    <p>{{item.AcceptTaskStatusText}}</p>
                  </div>
                  <div class="info_right">查&nbsp;看</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="navIcon bg_fff mb10">
        <ul class="li25 clear">
          <li>
            <div @click="goUrl('task/platformlist',{type:1})" class="box">
              <i class="icon">
                <img src="/static/image/icons/nav1.png" />
              </i>
              <p>垫付任务</p>
            </div>
          </li>
          <li>
            <div @click="goUrl('task/platformlist',{type:2})" class="box">
              <i class="icon">
                <img src="/static/image/icons/nav2.png" />
              </i>
              <p>浏览任务</p>
            </div>
          </li>
          <!-- <li>
            <div @click="goUrl('user/vip/vip')" class="box">
              <i class="icon">
                <img src="/static/image/icons/nav6.png" />
              </i>
              <p>VIP</p>
            </div>
          </li>
          <li>
            <a
              class="box yhq"
              href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=759198439&card_type=group&source=qrcode"
            >
              <i class="icon">
                <img src="/static/image/icons/nav5.png" />
              </i>
              <p>用户群</p>
            </a>
          </li> -->
        </ul>
      </div>
      <div class="Announcement bg_fff mb10">
        <div class="AnnouncementTop">
          <div class="labelhd fl">
            <span>公告</span>
          </div>
          <div class="noticeList">
            <ul :style="'margin-top:'+messageTop+'px'">
              <li v-for="(item,index) in messageList" :key="index">
                <div class="box" @click="goUrl('other/noticelist')">
                  <p class="text">{{item.Title}}</p>
                  <span class="time">{{item.PubTime}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- <div class="notice_wechat">
          客服QQ号:
          <span id="wechat_num"></span>&nbsp;添加&nbsp;
          <span>工作时间:9:00-22:00</span>
        </div>
        <input type="hidden" id="wechat_qrCode" /> -->
      </div>
      <!--新手-->
      <div class="xinshou">
        <div class="xinshouDiv1">
          <span class="xinshou_text" @click="goUrl('other/faq')">新手教程</span>
        </div>
        <div class="xinshouDiv2">
          <div @click="goUrl('other/invite')">
            <span class="xinshou_text">推广奖励</span>
          </div>
        </div>
<!--        <div class="xinshouDiv3">
          <div @click="goUrl('other/faq')">
            <span class="xinshou_text">常见问题</span>
          </div>
        </div> -->
		<div class="xinshouDiv3">
		  <div @click="goUrl('other/shopComing')">
		    <span class="xinshou_text">商家邀请</span>
		  </div>
		</div>
      </div>
      <!--每日任务-->
      <div class="Taskday bg_fff mb10">
        <div class="titleHd">
          <span>每日任务</span>
        </div>
        <div class="con">
          <ul class="li33 clear">
            <li>
              <div @click="goUrl('other/sign')" class="task_qd">签到领积分</div>
            </li>
            <!-- <li><a href="#" class="task_cj">积分抽奖</a></li> -->
            <!--<li><a href="html/user/shareqrcode.html" class="task_qrcode">分享二维码</a></li>-->
            <li>
              <div class="task_qrcode" id="lottery" @click="lotteryUrl">积分抽奖</div>
            </li>
            <li>
              <div @click="goUrl('other/invite')" class="task_yq">邀请好友</div>
            </li>
          </ul>
        </div>
      </div>
      <!--底部广告-->
      <div class="ft_gg mb10">
        <div class="img">
          <div @click="goUrl('other/invitelist')">
            <img src="/static/image/banner/guanggao.jpg" />
          </div>
        </div>
      </div>
	  <!-- 公共弹框 -->
	  <div class="msgallbox" v-if="showmsg">
		<div class="msgbox">
		  <div class="msgtitle">{{msgtitle}}</div>
		  <div class="contentbox">
			<div class="msgcontent">
			  {{msgcontent}}
			</div>
		  </div>
		  <div class="msgbtn" @click="isread()">确定</div>
		</div>
	  </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import footers from "@/components/footer.vue";
import { get, post, goUrl, toast, editTime } from "@/utils";
export default {
  components: {
    footers
  },
  data() {
    return {
      goUrl,
      userId: "",
      token: "",
      unreadCount: 0, //未读消息数量
      banner: [],
      taskList: [],
      messageList: [], //滚动公告
      messageTop:0,
      messageInterval:null,//定时器
	  showmsg:false,
	  list:[],
	  Noticelength:"",
	  Noticeindex:0,
	  msgtitle:"通知",
	  msgcontent:""
    };
  },
  onLoad() {
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    this.getBanner();
    this.getTaskList(); // 获取工作列表
  },
  onShow() {
    if (
      this.userId !== uni.getStorageSync("userId") ||
      this.token !== uni.getStorageSync("token")
    ) {
      this.userId = uni.getStorageSync("userId");
      this.token = uni.getStorageSync("token");
    }
  },
  methods: {
    getBanner() {
      get("Advertisement/GetHomeBanners",{},{isLogin:true}).then(res => {
        this.banner = res.obj;
      });
    },
    // 获取工作列表
    getTaskList() {
      post("Task/GetMemberTaskList", {
        UserId: this.userId,
        Token: this.token,
        MemberAcceptTaskStatus: 5,
        Page: 1
      }).then(res => {
        this.getUnreadCount(); // 获取未读消息数量
        this.getMessageList(); //滚动公告
		this.gettNoticeList();//弹框公共
        this.taskList = res.obj.AcceptTaskList;
      });
    },
    //滚动公告
    getMessageList() {
      post("Notice/GetNoticeByMember", {
        UserId: this.userId,
        Token: this.token,
        Page: 1,
        PageSize: 3,
        SendType: 0
      }).then(res => {
        const data = res.obj;
        data.NoticeList.map(item => {
          item.PubTime = editTime(item.PubTime);
        });
        this.messageList = data.NoticeList;
        if(data.NoticeList.length>1){
          clearInterval(this.messageInterval);
          this.messageInterval = setInterval(()=>{
            this.messageTime();
          },3000)
        }
      });
    },
    // 公告定时器,每个item高为40
    messageTime(){
      setTimeout(()=>{
        if(this.messageTop>-40){
          this.messageTop-=1;
          this.messageTime();
        }else{
          this.messageTop=0;
          this.messageList.push(this.messageList.splice(0,1)[0]);
        }
      },10)
    },
    // 跳转到详情
    taskDetail(TaskAcceptNo) {
      goUrl("task/selectoperation", {
        TaskAcceptNo: TaskAcceptNo
      });
    },
    //点击新手任务
    ifTask() {
      post("Member/GetBindPageData", {
        UserId: this.userId,
        Token: this.token
      }).then(res => {
        const data = res.obj;
        if (data.IsAUT === 1 && data.BankStr != "" && data.QQStr != "") {
          data.MemberAccount.map(item => {
            if (item.IsBindText === "已绑定") {
              toast("已完成新手任务", true);
            }
          });
        } else {
          goUrl("user/bindinfo");
        }
      });
    },
    // 获取未读消息数量
    getUnreadCount() {
      post("Notice/GetNoticeUnreadCount", {
        UserId: this.userId,
        Token: this.token,
        SendType: 1
      }).then(res => {
        this.unreadCount = res.obj;
      });
    },
    // 判断是否有几分抽奖
    lotteryUrl(){
      post("PlayActivities/lotteryUrl").then(res => {
      }).catch(err=>{
        if(err.errcode==2){
            //跳转页面
            location.href = err.url;
        }
      });
    },
	//弹框公告
	gettNoticeList() {
	  post("Notice/GetNoticeByMember", {
	    UserId: this.userId,
	    Token: this.token,
	    Page: 1,
	    PageSize: 3,
	    SendType: 0,
		IsRead:0,//0-未读 1-已读
	  }).then(res => {
		this.list=res.obj.NoticeList;
		this.Noticelength=res.obj.NoticeList.length;
		this.Noticeindex=0
		if(this.Noticelength>0){
			this.showNotice(this.list[0].Id)
		}
	  });
	},
	showNotice(id) {
	  post("Notice/ReadNoticeInfo", {
	    UserId: this.userId,
	    Token: this.token,
	    NoticeId:id
	  }).then(res => {
		const info=res.obj
		this.showmsg=true
		this.msgtitle=info.Title
		this.msgcontent=info.Memo
	  });
	},
	isread() {
		this.Noticeindex++
		this.showmsg=false
		if(this.Noticeindex<this.Noticelength){
			this.showNotice(this.list[Noticeindex].Id)
		}
	},
  }
};
</script>

<style lang="scss" scoped>
.head .icon_r {
     width: 45px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.outside{
  display:flex;
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.Taskday .con li div {
  display: block;
  line-height: 40px;
  padding-left: 36px;
  margin-right: 0;
}
.notice_wechat{
  padding:0 10px;
}
.AnnouncementTop{
  display:flex;
  align-items:center;
  .noticeList{
    position:relative;
    flex:0 0 auto;
    width:80%;
    height:40px;
    overflow:hidden;
    ul{
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:40px;
      margin-left:7px;
      li{
        height:40px;
        .box{
          height:40px;
          line-height:40px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          p{
            width:75%;
          }
          span{
            color:#999;
            font-size:12px;
          }
        }
      }
    }
  }
}


/*公共弹框*/
.msgallbox{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999
}
.msgbox{
  width: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  background: #fff;
  border-radius: 16upx;
  overflow: hidden;
}
.msgtitle{
  font-size: 32upx;
  color: #000;
  line-height: 1.4;
  text-align: center;
  display: -webkit-box!important;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.contentbox{
  width: 100%;
  max-height: 600upx;
  overflow-y:scroll;;
}
.msgbox .msgcontent{
  width: 100%;
  line-height: 1.4;
  box-sizing: border-box;
  padding: 20upx;
  min-height: 160upx;
}
.msgbox .msgbtn{
  width: 100%;
  height: 80upx;
  line-height: 80upx;
  text-align: center;
  background: #FF662A;
  color: #fff;
}
</style>
