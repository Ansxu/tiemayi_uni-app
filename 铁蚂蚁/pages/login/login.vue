<template>
    <div class="bg_f8f8f8">
        <headers>欢迎来到铁蚂蚁</headers>
        <div class="main">
            <div class="regLogForm">
                <form action="">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_tel.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="number" class="weui-input" v-model.trim="phone" placeholder="请输入手机号码" id="accountName" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_pwd.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" class="weui-input" v-model.trim="pwd" placeholder="请输入密码" id="password" />
                                </div>
                            </div>
                            <!-- <div class="weui-cell__ft">
                                <span class="hidePwd shiftPwd"></span>
                            </div> -->
                        </div>
                        <div class="flex agreement__register">
                            <div class="IconsCK" @click="recording = !recording">
                                <input name="isremember"  type="checkbox" value="记住账号" />
                                <span :class="{'inputGou':recording}"></span>
                            </div>
                            <div class="flexItem">记住账号</div>
                        </div>
                        <div  class="weui-btn weui-btn-active btn-login" @click="login">登录</div>
                        <div class="hasAccountMag">
                            <div style="color:#222;" @click="goUrl('login/forgetpwd')">忘记密码</div>还没有账号？
                            <div class="a" @click="goUrl('login/register')" >立即注册</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {goUrl,valPhone,toast,post,get,ClientId,ClientSecret} from '@/utils'
export default {
    data(){
        return {
            goUrl,
            phone:'',
            pwd:'',
            recording:true,//是否记录账号
        }
    },
    onLoad(){
        this.phone = uni.getStorageSync('userPhone')||'15014010199';
        this.pwd = uni.getStorageSync('userPassword')||'123456';
        console.log('Advertisement/GetHomeBanners')
        // get('Advertisement/GetHomeBanners',{},true)
        post('News/NoticeList',{
            type: 0,
            Page: 1,
            PageSize: 10},true)
    },
    methods:{
        login(){
            if(!this.check()) return;
            post('Login/LoginByMobile',{
                Mobile: this.phone,
                PassWord: this.pwd,
                // client_id: ClientId,
                // client_secret: ClientSecret
            },true).then(res=>{
                const data = res.obj;
                if(this.recording){
                    uni.setStorageSync('userPhone',this.phone);
                    uni.setStorageSync('userPassword',this.pwd);
                }else{
                    uni.setStorageSync('userPhone','');
                    uni.setStorageSync('userPassword','');
                }
                uni.setStorageSync('userId',data.UserId);
                uni.setStorageSync('token',data.Token);
                uni.setStorageSync('userInfo',data);
                toast('登录成功',true)
                setTimeout(()=>{
                    uni.reLaunch({
                        url: '/pages/user/menber'
                    })
                },2000)
            })
        },
        check(){
            if(!valPhone(this.phone)){
                return false;
            }
            if(!this.pwd){
                toast('请输入密码！');
                return false;		
            }
            return true;
        },
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

