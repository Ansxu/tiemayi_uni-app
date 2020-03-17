<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="member.html" class="btn_back"></a>
                <div class="title center">账号信息</div>
            </div>
        </div>
        <div class="main">
            <div class="accountNavList">
                <div class="weui-cells navList__weui-cells">
                    <a href="accountinfo_avatar.html" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="static/image/nav/account_nav1_1.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">头像</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </a>
                    <a href="accountinfo_modifymobile.html" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="static/image/nav/account_nav1_2.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">用户手机号</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </a>
                    <a href="accountinfo_resetpwd.html" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="static/image/nav/account_nav1_3.png" alt="" class="icon-navImg" />
                        </div>
                        <div class="weui-cell__bd">
                            <p class="title">用户密码</p>
                        </div>
                        <div class="weui-cell__ft">
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </a>
                    <!-- <a href="javascript:;" class="weui-cell">
                        <div class="weui-cell__hd">
                            <img src="static/image/nav/account_nav1_4.png" alt="" class="icon-navImg" />
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
                    </a> -->
                </div>
            </div>
        </div>
        <!-- <script type="text/javascript">
            userId = $api.getStorage('userId');
            userToKen = $api.getStorage('userToKen');
            apiready = function() {
                exit_app(0);
                if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
                    location.href = '../../../html/login/login.html';
                }
            }
        </script> -->
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