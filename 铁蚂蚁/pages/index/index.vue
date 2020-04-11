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
            <a href="javascript:IsNovice();" class="box">
              <i class="icon">
                <img src="/static/image/icons/nav1.png" />
              </i>
              <p>垫付任务</p>
            </a>
          </li>
          <li>
            <a href="javascript:IsNovice();" class="box">
              <i class="icon">
                <img src="/static/image/icons/nav2.png" />
              </i>
              <p>浏览任务</p>
            </a>
          </li>
          <li>
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
          </li>
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
        <div class="notice_wechat">
          客服QQ号:
          <span id="wechat_num"></span>&nbsp;添加&nbsp;
          <span>工作时间:9:00-22:00</span>
        </div>
        <input type="hidden" id="wechat_qrCode" />
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
        <div class="xinshouDiv3">
          <div @click="goUrl('other/faq')">
            <span class="xinshou_text">常见问题</span>
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
              <a class="task_qrcode" id="lottery" @click="goUrl('')">积分抽奖</a>
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
    };
  },
  onLoad() {
    this.userId = uni.getStorageSync("userId");
    this.token = uni.getStorageSync("token");
    this.getBanner();
    this.getTaskList(); // 获取工作列表
    this.getUnreadCount(); // 获取未读消息数量
    this.getMessageList(); //滚动公告
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
		console.log(123)
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
        id: TaskAcceptNo
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
    //判断是否有抽奖活动
    lotteryUrl() {
      post("PlayActivities/lotteryUrl").then(res => {
        const data = res.obj;
        if (res.errcode === 2) {
          // 待测试跳转地址
          location.href = json.url;
        } else {
          toast(data.msg);
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
    }
  }
};
</script>

<style lang="scss" scoped>
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
          span{
            color:#999;
            font-size:12px;
          }
        }
      }
    }
  }
}
</style>
