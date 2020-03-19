<template>
    <div class="bg_f8f8f8">
        <headers>账号信息</headers>
        <div class="main">
            <div class="accountNavList">
                <div class="weui-cells navList__weui-cells">
                    <div @click="goUrl('user/accountinfo_avatar')" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="/static/image/nav/account_nav1_1.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">头像</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </div>
                    <div @click="goUrl('user/accountinfo_modifymobile')" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="/static/image/nav/account_nav1_2.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">用户手机号</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </div>
                    <div @click="goUrl('user/accountinfo_resetpwd')" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="/static/image/nav/account_nav1_3.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">用户密码</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </div>
                    <!-- <div @click="goUrl('user/javascript:;" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="/static/image/nav/account_nav1_4.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">声音</p>
                        </div>
                        <div class="weui-cell__ft">
                            <div class="switch_btn">
                                <input type="checkbox" class="switch" id="select_openVoice" checked="checked" />
                                <label for="select_openVoice"></label>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        <!-- <script type="text/javascript">
            userId = $api.getStorage('userId');
            userToKen = $api.getStorage('userToKen');
            apiready = function() {
                exit_app(0);
                if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
                    location.href = '../../../html/login/login')';
                }
            }
        </script> -->
    </div>
</template>

<script>
import {goUrl} from '@/utils';
export default {
    data(){
        return {
            goUrl
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