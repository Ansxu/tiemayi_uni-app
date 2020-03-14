<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head">
                <a href="javascript:history.go(-1);" class="btn_back"></a>
                <div class="title center">欢迎来到铁蚂蚁</div>
            </div>
        </div>
        <div class="main">
            <div class="regLogForm">
                <form action="">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="static/image/icons/d_tel.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="text" class="weui-input" placeholder="请输入手机号码" id="accountName" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="static/image/icons/d_pwd.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" class="weui-input" placeholder="请输入密码" id="password" />
                                </div>
                            </div>
                            <!-- <div class="weui-cell__ft">
                                <span class="hidePwd shiftPwd"></span>
                            </div> -->
                        </div>
                        <div class="flex agreement__register">
                            <div class="IconsCK">
                                <input name="isremember" type="checkbox" value="记住账号" />
                                <span></span>
                            </div>
                            <div class="flexItem">记住账号</div>
                        </div>
                        <a href="javascript:;" class="weui-btn weui-btn-active btn-login" @click="login();">登录</a>
                        <div class="hasAccountMag">
                            <div style="color:#222;" @click="goUrl('/pages/login/forgetpwd')">忘记密码</div>还没有账号？
                            <div class="a" @click="goUrl('/pages/login/register')" >立即注册</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {goUrl} from '@/utils'
export default {
    data(){
        return {
            goUrl
        }
    }
}
</script>
<style lang="scss" scoped>
@import url('../../css/d_style.css');  
    .hasAccountMag{
        display:flex;
        align-items:center;
        justify-content:center;
        div{
            margin:0 10px;
        }
        .a{
            color: #eb0101;
        }
    }
</style>

