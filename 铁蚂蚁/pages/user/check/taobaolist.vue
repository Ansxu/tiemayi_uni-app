<template>
    <div class="bg_f8f8f8">
        <headers>选择淘宝账号验证</headers>
        <div class="main">
            <!--  循环 -->
                <div class="item" >
                    <ul class="accountList accountList2">
                        <li>
                            <div class="weui-cells navList__weui-cells">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <img src="/static/image/icons/taobao.png" alt="" class="icon-navImg" />
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p class="title">{{list.PlatAccount}}</p>
                                    </div>
                                    <div class="weui-cell__ft">
                                        <span class="status" style="display:block;width:100%;text-align:right;">{{list.ReviewStatusText}}</span>
                                        <p style="font-size:0.12rem;">最后验证时间：{{list.time}}</p>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        收货地址
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p class="title">{{list.AddressInfo}}</p>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        联系电话
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p class="title">{{list.ConsigneeCall}}</p>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        联系人
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p class="title">{{list.ConsigneeName}}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div style="background-color:#5c91f0;color:#fff;font-size:18px;padding:10rpx;text-align: center;" v-if="list.IsTBFinalCheck!==1">
                    <p style="display:block;width:100%;color:#fff;" @click="submit">验证此号</p>
                </div>
            <div class="accountListBox" id="taobaolist">

            </div>
        </div>
    </div>
</template>

<script>
import {post,editTime,goUrl,toast} from '@/utils';
export default {
    data(){
        return {
			userId:'',
            token:'',
            list:{},
        }
    },
    onLoad(){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
        this.getData();
    },
    onShow(){

    },
    methods:{
        getData(){
            post('Member/LoadMemberAccountList',{
                UserId: this.userId,
                Token: this.token,
                PlatId: 1
            }).then(res=>{
                const data = res.obj.AccountList;
                data.map(item=>{
                    item.time = editTime(item.TBFinalCheckTime,'time');
                    if(item.IsTBFinalCheck==0){
                        this.list = item;
                    }
                })
                if(!this.list.Id){
                    this.list = data[0];
                }
            })
        },
        submit(){
            const list = this.list;
            if (list.ReviewStatus == 0) {
                toast("账号还未通过管理员审核，无法验号，等待平台管理员审核后再验号");
            }else if (list.ReviewStatus == 2) {
                toast("账号审核失败，无法验号，等待平台管理员审核后再验号");
            }else if (list.IsTBFinalCheck == 1) {
                toast("该账号已验号成功，请勿重复验证");
            }else{
                goUrl('user/check/yanzheng_tkl',{
                    Id:list.Id,
                    PlatAccount:list.PlatAccount,
                    ReviewStatus:list.ReviewStatus,
                    IsTBFinalCheck:list.IsTBFinalCheck
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>