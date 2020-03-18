<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">

                <a href="member.html" class="btn_back"></a>
                <div class="title center">绑定信息</div>
            </div>
        </div>
        <div class="main">
            <div class="navSection">
                <div class="dd__hd">
                    <p class="titleMsg color_e40000">账号信息(账户信息必填，银行卡信息与身份证一致)</p>
                </div>
                <div class="navSection__bd">
                    <div class="weui-cells navList__weui-cells navList2__weui-cells">
                        <a href="bindidcard.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_1.png" alt="" class="icon-navImg"><span class="title">绑定身份证</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="IdentityCard">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="bindbank.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_2.png" alt="" class="icon-navImg"><span class="title">绑定银行卡</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="BankCard">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="bindqq.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_3.png" alt="" class="icon-navImg"><span class="title">QQ号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="QACQ">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="navSection">
                <div class="dd__hd">
                    <p class="titleMsg color_e40000">账号信息(任意绑定一个号并通过审核即可完成新手任务)</p>
                </div>
                <div class="navSection__bd">
                    <div class="weui-cells navList__weui-cells navList2__weui-cells">
                        <a href="javascript:bindAccountPage('./list/taobaolist.html','淘宝');" class="weui-cell" id="TbAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_1.png" alt="" class="icon-navImg"><span class="title">绑定淘宝账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="TbAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="javascript:bindAccountPage('./list/jdlist.html','京东');" class="weui-cell" id="JdAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_2.png" alt="" class="icon-navImg"><span class="title">绑定京东账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="JdAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="javascript:bindAccountPage('./list/pddlist.html','拼多多');" class="weui-cell" id="PddAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_3.png" alt="" class="icon-navImg"><span class="title">绑定拼多多账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="PddAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="javascript:bindAccountPage('./list/albblist.html','阿里巴巴');" class="weui-cell" id="AlbbAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_6.png" alt="" class="icon-navImg"><span class="title">绑定阿里巴巴账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="AlbbAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <!-- <a href="./list/mgjlist.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_4.png" alt="" class="icon-navImg"><span class="title">绑定蘑菇街账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="MgjAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a>
                        <a href="./list/mlslist.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_5.png" alt="" class="icon-navImg"><span class="title">绑定美丽说账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="MlsAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="popup-mask-box">
            <div class="pop_up_box modal-in">
                <div class="popup_text_div">
                    <h1>温馨提示</h1>
                    <p class="pull-left">根据国家网信办新规，平台进行实名安全工作。我们承诺保障您账户的资金安全，且不会泄露您的个人信息，请您积极配合。</p>
                </div>
                <a href="bindidcard.html" class="bind_jump">点击跳转实名认证</a>
            </div>
        </div>-->

    </div>
</template>

<script>
import {} from '@/utils';
export default {
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