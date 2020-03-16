<template>
    <div class="bg_f8f8f8">
        <div class="head memberHead noHeight__memberHead">
            <!-- <a href="../../index.html" class="btn_back">返回</a> -->
            <div class="title center">个人中心</div>
            <!-- <a href="#" class="btn_set">设置</a> -->
        </div>
        <div class="main">
            <div class="memberTop">
                <div class="myMessages">
                    <div class="touxiang" onclick="location='accountinfo.html'">
                        <img src="static/image/tx/tx_pic.jpg" id="Avatar" alt="" />
                    </div>
                    <a href="grade_rule.html" class="btn_vs">查看等级规则</a>
                    <div class="mySome">
                        <span class="mySomes" id="UserId">ID：XXXXX</span>
                        <span class="myUsername" id="UserName">用户名：XXXXX</span>
                        <span class="mySomes" id="UserGrade">等级：L0</span>
                        <!-- <p class="name" id="UserReferralCode">邀请码：xxx</p>
                        <p id="isvipTime" style="display:none;">VIP有效期：2018.01.01-2019.01.01</p>-->
                    </div>
                </div>
                <div class="myPrice">
                    <div class="myPrice_text">
                        <a href="../../html/user/commision/commision.html" class="outside">
                            <p>佣金收益(金)</p>
                            <p style="font-size:.16rem;" id="UserAmount">0</p>
                        </a>
                    </div>
                    <div class="myPrice_text">
                        <a href="../../html/user/commision/corpus.html" class="outside">
                            <p>本金总计(元)</p>
                            <p style="font-size:.16rem;" id="UserWallet">0</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="shuxian"></div>
            <div class="section memberIndex__section dingdan">
                <div class="section__hd weui-cell" onclick="location='../task/receivedtask.html'">
                    <div class="weui-cell__bd">
                        <p class="title">我的订单</p>
                    </div>
                    <div class="weui-cell__ft">
                        <a href="../task/receivedtask.html">
                            <span class="more">全部订单</span>
                            <span class="icon-arrow icon-arrowRight"></span>
                        </a>
                    </div>
                </div>
                <div class="section__bd">
                    <ul class="dd_navList li25 block__navList">
                        <li>
                            <a href="../task/receivedtask.html" class="outside">
                                <div class="icon-img">
                                    <img src="static/image/nav/memberindex_nav1_1.png" alt="">
                                    <span class="circleNum" id="OrderUndone">0</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">未完成</p>
                            </a>
                        </li>
                        <li>
                            <a href="../task/receivedtask.html" class="outside">
                                <div class="icon-img">
                                    <img src="static/image/nav/memberindex_nav1_2.png" alt="">
                                    <span class="circleNum" id="OrderCompleted">0</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">已完成</p>
                            </a>
                        </li>

                        <li>
                            <a href="../task/receivedtask.html" class="outside">
                                <div class="icon-img">
                                    <img src="static/image/nav/memberindex_nav1_3.png" alt="">
                                    <span class="circleNum" id="OrderRevoked">0</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">已撤销</p>
                            </a>
                        </li>
                        <li>
                            <a href="../task/receivedtask.html" class="outside">
                                <div class="icon-img">
                                    <img src="static/image/nav/memberindex_nav1_4.png" alt="">
                                    <span class="circleNum" id="OrderAppeal">0</span>
                                </div>
                                <p class="title" style="color:#7A7A7A">申诉中</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="messageMenu">
                <ul>
                    <li class="messageMenuLi">
                        <a href="bindinfo.html" class="outside">
                            <div>
                                <img src="static/image/nav/memberindex_nav2_1.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">绑定信息</span>
                        </a>
                    </li>

                    <!-- <li class="messageMenuLi">
                        <a href="../user/appeal/appeals_center.html" class="outside">
                            <div>
                                <img src="static/image/nav/memberindex_nav2_3.png" alt="" />
                            </div>
                            <span style="color:#7A7A7A">申诉中心</span>
                    </li> -->
                </ul>
            </div>
            <a href="javascript:;" class="weui-btn btn-loginOut">退出登录</a>
        </div>
        <!--底部-->
        <footers :showIndex="4" :showOrderReceiving="false"></footers>
        <!--底部 end-->
        <!--底部 end-->
        <!-- <script type="text/javascript">
            $(function() {
                $(window).scroll(function() {
                    if ($(this).scrollTop() > 0) {
                        $('.head').removeClass("noHeight__memberHead");
                        //console.log("aaa");
                    } else {
                        $('.head').addClass("noHeight__memberHead");
                    }
                });
            });
        </script> -->
    </div>
</template>
    
<script>
import footers from '@/components/footer.vue';
export default {
    components:{
        footers
    },
    data(){
        return {

        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{

    }
}
</script>

<style lang="scss" scoped>

</style>