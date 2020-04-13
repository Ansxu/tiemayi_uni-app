<template>
    <div class="bg_f8f8f8">
        <headers>绑定{{name}}账号</headers>
        <div class="main">
            <div class="accountListBox" id="albblist">
                <div v-for="(item,index) in list" :key="index">
                    <div class="item">
                        <ul class="accountList accountList2">
                            <li @click="pageJump(item.Id,item.ReviewStatus)">
                                <div class="weui-cells navList__weui-cells">
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd">
                                            <img :src="data.PlatLogo" alt="" class="icon-navImg" />
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p class="title">{{item.PlatAccount}}</p>
                                        </div>
                                        <div class="weui-cell__ft">
                                            <span class="status">{{item.ReviewStatusText}}</span>
                                        </div>
                                    </div>
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd">
                                            收货地址
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p class="title">{{item.AddressInfo}}</p>
                                        </div>
                                    </div>
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd">
                                            联系电话
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p class="title">{{item.ConsigneeCall}}</p>
                                        </div>
                                    </div>
                                    <div class="weui-cell">
                                        <div class="weui-cell__hd">
                                            联系人
                                        </div>
                                        <div class="weui-cell__bd">
                                            <p class="title">{{item.ConsigneeName}}</p>
                                        </div>
                                    </div>
                                    <!-- {{if(value.ReviewStatusText=='审核失败'){}}
                                                        <div class="weui-cell">
                                                            <div class="weui-cell__hd" style="color:ff3333">
                                                                审核失败原因：
                                                            </div>
                                                            <div class="weui-cell__bd">
                                                                <p class="title" style="color:ff3333">{{item.AuditFailedMsg}}</p>
                                                            </div>
                                                        </div>
                                                        {{}}} -->
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="mayOrderTaking">
                        <p>可接单数：今日{{item.TodayMaxOrders}}单/本周 {{item.WeekMaxOrders}}单/ 本月{{item.MonthMaxOrders}}单</p>
                    </div>
                </div>
            </div>
        </div>
        <!--底部-->
        <div class="dd_footer addAcount__footer" v-if="data.AccountCount<data.MaxBindAccount">
            <div class="inner">
                <div class="dd_Btns">
                    <div @click="goUrl('user/'+url)" class="weui-btn">
                        <span class="addAcountIcon">新增一个{{name}}账户</span>
                    </div>
                </div>
            </div>
        </div>
        <!--底部  end-->
    </div>
</template>

<script>
import {post,goUrl,toast} from '@/utils';
export default {
    data(){
        return {
            goUrl,
            userId:'',
            token:'',
            name:'',
            url:'',//绑定跳转的url
            typeId:0,//1--淘宝；3--京东；4--阿里巴巴；5--拼多多；6--美丽说；7--蘑菇街；
            list:[],
            data:{}
        }
    },
    onLoad(options){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
        this.name = options.name;
        this.typeId = options.typeId;
        this.url = options.url;
		console.log(options)
        this.getData();
    },
    onShow(){

    },
    methods:{
        getData(){
            post('Member/LoadMemberAccountList',{
                UserId: this.userId,
                Token: this.token,
                PlatId: this.typeId
            }).then(res=>{
                const data = res.obj;
                this.list = data.AccountList;
                this.data = data;
            })
        },
        pageJump(id, reviewStatus){
        if (reviewStatus == 1) {
            toast("账号已通过审核，无法修改，若要修改请联系平台管理员");
            return;
        }
            goUrl('user/'+this.url,{id})
        }
    }
}
</script>

<style lang="scss" scoped>
.dd_footer.addAcount__footer{
    height:0;
}
</style>