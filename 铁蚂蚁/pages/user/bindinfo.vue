<template>
    <div class="bg_f8f8f8">
        <headers>绑定信息</headers>
        <div class="main">
            <div class="navSection">
                <div class="dd__hd">
                    <p class="titleMsg color_e40000">账号信息(账户信息必填，银行卡信息与身份证一致)</p>
                </div>
                <div class="navSection__bd">
                    <div class="weui-cells navList__weui-cells navList2__weui-cells">
                        <div @click="goUrl('user/bindidcard')" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_1.png" alt="" class="icon-navImg"><span class="title">绑定身份证</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="IdentityCard">{{info.IsAUTStr}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <div @click="goBindBank" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_2.png" alt="" class="icon-navImg"><span class="title">绑定银行卡</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="BankCard">{{info.BankStr}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <!-- <div @click="goUrl('user/bindqq')" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav1_3.png" alt="" class="icon-navImg"><span class="title">QQ号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="QACQ">{{info.QQStr||'未绑定'}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="navSection">
                <div class="dd__hd">
                    <p class="titleMsg color_e40000">账号信息(任意绑定一个号并通过审核即可完成新手任务)</p>
                </div>
                <div class="navSection__bd">
                    <div class="weui-cells navList__weui-cells navList2__weui-cells">
                        <!-- <div href="javascript:bindAccountPage('./list/taobaolist.html','淘宝');" class="weui-cell" id="TbAccountShow" v-for="(item,index) in bindList"> -->
                        <div  class="weui-cell" id="TbAccountShow" 
                            v-for="(item,index) in bindList" :key="index"
                            @click="onBindAccount(item)"
                            v-show="item.PlatName.indexOf('淘宝')!==-1"
                            >
                            <div class="weui-cell__hd">
                                <img :src="item.Logo" alt="" class="icon-navImg"><span class="title">{{item.PlatName}}</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="TbAccount">{{item.IsBindText}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <!-- <div href="javascript:bindAccountPage('./list/jdlist.html','京东');" class="weui-cell" id="JdAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_2.png" alt="" class="icon-navImg"><span class="title">绑定京东账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg" id="JdAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <div href="javascript:bindAccountPage('./list/pddlist.html','拼多多');" class="weui-cell" id="PddAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_3.png" alt="" class="icon-navImg"><span class="title">绑定拼多多账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="PddAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <div href="javascript:bindAccountPage('./list/albblist.html','阿里巴巴');" class="weui-cell" id="AlbbAccountShow">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_6.png" alt="" class="icon-navImg"><span class="title">绑定阿里巴巴账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="AlbbAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div> -->
                        <!-- <div href="./list/mgjlist.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_4.png" alt="" class="icon-navImg"><span class="title">绑定蘑菇街账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="MgjAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div>
                        <div href="./list/mlslist.html" class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/nav/bind_nav2_5.png" alt="" class="icon-navImg"><span class="title">绑定美丽说账号</span>
                            </div>
                            <div class="weui-cell__bd text_r">
                                <p class="txtMsg color_5c91f0" id="MlsAccount">未绑定</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                        </div> -->
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
                <div href="bindidcard.html" class="bind_jump">点击跳转实名认证</div>
            </div>
        </div>-->

    </div>
</template>

<script>
import {post,toast,goUrl} from '@/utils';
export default {
    data(){
        return {
            goUrl,
            userId:'',
            token:'',
            info:{},
            bindList:[],
            bindAccount:[],
        }
    },
    onLoad(){
        this.userId = uni.getStorageSync('userId');
        this.token = uni.getStorageSync('token');
    },
    onShow(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            post('Member/GetBindPageData',{
                UserId: this.userId,
                Token: this.token
            }).then(res=>{
                const data = res.obj
                this.info = data;
                this.bindList = data.MemberAccount;
                this.bindAccount = data.MemberAccountShow;
            })
        },
        //绑定账号 
        // ReviewStatus:
        //-1 未绑定 // 0 待审核,// 1 审核通过,// 2  审核失败
        onBindAccount(item){
            if (this.info.IsAUT !== 1) {
                toast("需要绑定身份证，并认证后才可以绑定！")
                return;
            }
            //typeId = 1--淘宝；3--京东；4--阿里巴巴；5--拼多多；6--美丽说；7--蘑菇街；
            let params = {};
            // 淘宝
            if(item.PlatName.indexOf('淘宝')!==-1){
               params= {name:'淘宝',typeId:1,url:'bindtaobao'};
            }else
            // 京东
            if(item.PlatName.indexOf('京东')!==-1){
               params= {name:'京东',typeId:3,url:'bindjd'};
            }else
            // 阿里巴巴
            if(item.PlatName.indexOf('阿里巴巴')!==-1){
               params= {name:'阿里巴巴',typeId:4,url:'bindalbb'};
            }else
            // 拼多多
            if(item.PlatName.indexOf('拼多多')!==-1){
               params= {name:'拼多多',typeId:5,url:'bindpdd'};
            }else
            // 美丽说
            if(item.PlatName.indexOf('美丽说')!==-1){
               params= {name:'美丽说',typeId:6,url:'bindmls'};
            }else
            // 蘑菇街
            if(item.PlatName.indexOf('蘑菇街')!==-1){
               params= {name:'蘑菇街',typeId:7,url:'bindmgj'};
            }
            goUrl('user/bindlist',params);
        },
        // 绑定银行卡
        goBindBank(){
            // if(this.info.IsAUT !== 1){
            //     toast("需要先绑定身份证，认证通过后才能绑定！");
            //     return;
            // }
            goUrl('user/bindbank');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>