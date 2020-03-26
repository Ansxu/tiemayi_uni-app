<template>
    <div class="bg_f8f8f8">
        <div class="head memberHead noHeight__memberHead">
            <!-- <div href="../../index.html" class="btn_back">返回</div> -->
            <div class="title center">个人中心</div>
            <!-- <div href="#" class="btn_set">设置</div> -->
        </div>
        <div class="main">
            <div class="memberTop">
                <div class="myMessages">
                    <div class="touxiang" @click="goUrl('user/accountinfo')">
                        <img :src="userInfo.Avatar||'static/image/tx/tx_pic.png'" id="Avatar" alt="" />
                    </div>
                    <div @click="goUrl('user/grade_rule')" class="btn_vs">查看等级规则</div>
                    <div class="mySome">
                        <span class="mySomes" id="UserId">ID：{{userInfo.MemberID||'XXXXX'}}</span>
                        <span class="myUsername" id="UserName">用户名：{{userInfo.NickName||'未登录'}}</span>
                        <span class="mySomes" id="UserGrade">等级：{{userInfo.Level||'L0'}}</span>
                        <!-- <p class="name" id="UserReferralCode">邀请码：xxx</p>
                        <p id="isvipTime" style="display:none;">VIP有效期：2018.01.01-2019.01.01</p>-->
                    </div>
                </div>
                <div class="myPrice">
                    <div class="myPrice_text">
                        <div @click="goUrl('user/commision/commision')" class="outside">
                            <p>佣金收益(金)</p>
                            <p style="font-size:16px;" id="UserAmount">{{userInfo.Amount||0}}</p>
                        </div>
                    </div>
                    <div class="myPrice_text">
                        <div @click="goUrl('user/commision/corpus')" class="outside">
                            <p>本金总计(元)</p>
                            <p style="font-size:16px;" id="UserWallet">{{userInfo.Wallet||0}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="shuxian"></div>
            <div class="section memberIndex__section dingdan">
                <div class="section__hd weui-cell" @click="goUrl('task/receivedtask')">
                    <div class="weui-cell__bd">
                        <p class="title">我的订单</p>
                    </div>
                    <div class="weui-cell__ft">
                        <div @click="goUrl('task/receivedtask')">
                            <span class="more">全部订单</span>
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </div>
                </div>
                <div class="section__bd">
                    <ul class="dd_navList li25 block__navList">
                        <li>
                            <div @click="goUrl('task/receivedtask')" class="outside">
                                <div class="icon-img">
                                    <img src="/static/image/nav/memberindex_nav1_1.png" alt="">
                                    <span class="circleNum" id="OrderUndone">{{userInfo.OrderUndone||0}}</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">未完成</p>
                            </div>
                        </li>
                        <li>
                            <div @click="goUrl('task/receivedtask')" class="outside">
                                <div class="icon-img">
                                    <img src="/static/image/nav/memberindex_nav1_2.png" alt="">
                                    <span class="circleNum" id="OrderCompleted">{{userInfo.OrderCompleted||0}}</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">已完成</p>
                            </div>
                        </li>

                        <li>
                            <div @click="goUrl('task/receivedtask')" class="outside">
                                <div class="icon-img">
                                    <img src="/static/image/nav/memberindex_nav1_3.png" alt="">
                                    <span class="circleNum" id="OrderRevoked">{{userInfo.OrderRevoked||0}}</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">已撤销</p>
                            </div>
                        </li>
                        <li>
                            <div @click="goUrl('task/receivedtask')" class="outside">
                                <div class="icon-img">
                                    <img src="/static/image/nav/memberindex_nav1_4.png" alt="">
                                    <span class="circleNum" id="OrderAppeal">{{userInfo.OrderAppeal||0}}</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">申诉中</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="messageMenu">
                <ul>
                    <li class="messageMenuLi">
                        <div @click="goUrl('user/bindinfo')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_1.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">绑定信息</span>
                        </div>
                    </li>
                    <li class="messageMenuLi">
                        <div @click="goUrl('user/appeal/appeals_center')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_3.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">申诉中心</span>
                        </div>
                    </li>
                    <li class="messageMenuLi">
                        <div @click="goUrl('other/faq')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_4.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">新手教程</span>
                        </div>
                    </li>
                    <li class="messageMenuLi" id="shareqrcode" v-if="userInfo.IsInviteRole">
                        <div @click="goUrl('user/shareqrcode')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_7.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">分享二维码</span>
                        </div>
                    </li>
                    <li class="messageMenuLi">
                        <div @click="goUrl('user/taskcompletionrate')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_8.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">账号完成率</span>
                        </div>
                    </li>
                    <li class="messageMenuLi">
                        <div @click="goUrl('user/check/taobaolist')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_9.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">淘宝验号</span>
                        </div>
                    </li>
                    <li class="messageMenuLi">
                        <div @click="goUrl('user/version')" class="outside">
                            <div>
                                <img src="/static/image/nav/memberindex_nav2_5.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">版本信息</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div  class="weui-btn btn-loginOut" @click="signOut">退出登录</div>
        </div>
        <!--底部-->
        <footers :showIndex="4"></footers>
        <!--底部 end-->
    </div>
</template>
    
<script>
import footers from '@/components/footer.vue';
import {goUrl,post,get,LoginPath} from '@/utils';
export default {
    components:{
        footers
    },
    data(){
        return {
            goUrl,
            userId:'',
            token:'',
            userInfo:{},
        }
    },
    onLoad(){
        this.userId=uni.getStorageSync('userId');
        this.token=uni.getStorageSync('token');
        this.getMemberInfo();
    },
    onShow(){
        this.userId=uni.getStorageSync('userId');
        this.token=uni.getStorageSync('token');
        if(!this.userInfo){
            this.getMemberInfo();
        }
    },
    methods:{
        //获取用户信息
        async getMemberInfo() {
            const res = await get('Login/GetMemberInfo',{
                UserId: this.userId,
                Token: this.token
            })
            const data = res.obj;
            this.userInfo = data;
            uni.setStorageSync('userInfo',data);
            // uni.setStorage('isAdvanceRange', isAdvanceRange);

        },
        // 退出登录
        async signOut(){
            uni.showModal({
                title:'退出登录',
                content:'确定退出此账号？',
                success(res){
                if(res.confirm){
                    uni.setStorageSync('userId','');
                    uni.setStorageSync('token','');
                    uni.setStorageSync('userInfo',{});
                    uni.reLaunch({
                        url: LoginPath
                    })
                }
            }
      })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import url('../../css/d_style.css');
    .section__hd{
        padding-left:30px;
        padding-right:20px;
    }
</style>