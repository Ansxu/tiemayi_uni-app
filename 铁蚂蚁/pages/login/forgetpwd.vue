<template>
    <div class="bg_f8f8f8">
        <!--第一步-->
        <div class="defaultPage oneStep__defaultPage" v-if="page===1">
            <headers>忘记密码</headers>
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
                                        <input type="text" v-model.trim="phone" class="weui-input" placeholder="请输入注册手机号码" id="txtMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="/static/image/icons/d_pic.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="imgCode" class="weui-input" placeholder="请输入图像验证码" id="txtcode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="imgBox">
                                        <img  :src="host+'Member/GetImageCode?OnlyVal='+OnlyVal" id="ValidateImg" alt="验证码,看不清楚?请点击刷新验证码"/>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="/static/image/icons/d_code.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="code" class="weui-input" placeholder="请输入验证码" id="VerifyCode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft" @click="getCode">
                                    <div class="sendCode" :class="{'codeTimeend':timeEnd!==60}" id="send-code">{{timeEnd!==60?timeEnd+"秒后可获取":"获取验证码"}}</div>
                                </div>
                            </div>
                            <div class="weui-btn weui-btn-active btn-oneStep" @click="upPassword">下一步</div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <!--第二步-->
        <div class="defaultPage twoStep__defaultPage allScreenPage" v-if="page===2">
            <div class="h45">
                <div class="head">
                    <p href="javascript:;" class="btn_back"></p>
                    <div class="title center">忘记密码</div>
                </div>
            </div>
            <div class="main">
                <div class="regLogForm">
                    <form action="">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="/static/image/icons/d_pwd.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="password" class="weui-input" v-model.trim="pwd" placeholder="请输入6-16位密码" id="txtpassword" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="/static/image/icons/d_pwd.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="password" class="weui-input" v-model.trim="comfirmPwd" placeholder="请再次输入新密码" id="txtpassword2" />
                                    </div>
                                </div>
                            </div>
                            <div @click="submit" class="weui-btn weui-btn-active btn-twoStep">完成</div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import {CreatOnlyVal,host,goUrl,valPhone,toast,post} from '@/utils'
export default {
    data(){
        return {
            host,
            OnlyVal: "",//图形验证码图像
            phone:'15014010199',
            pwd:'123456',
            comfirmPwd:'123456',
            isCode:false,//是否已获取短信验证码
            code:'',
            imgCode:'',
            timeEnd:60,
            timeFn:null,//倒计时的方法
            page:1,
        }
    },
    onLoad(){
        this.OnlyVal = '';
        this.phone = '';
        this.pwd = '';
        this.comfirmPwd = '';
        this.isCode = false;
        this.code = '';
        this.imgCode = '';
        this.page = 1;
        this.timeEnd = 60;
        this.timeFn = null;
        this.upOnlyVal();
    },
    methods:{
        // 更新图形验证码
        upOnlyVal(){
            this.OnlyVal = CreatOnlyVal();
        },
        // 获取验证码
        getCode(){
            if(this.timeEnd!==60) return;
            this.isCode = true;
            if(!valPhone(this.phone)){
                return false;
            }
            if(!this.imgCode){
                toast('请输入图形验证码！');
                return false;
            }
            post('Member/GetSms',{
                Mobile: this.phone,
                VerifyType: 2,
                ImgCode: this.imgCode,
                OnlyVal: this.OnlyVal
            },{isLogin:true}).then(res=>{
                toast('已发送至该手机',true);
                this.timeFn = setInterval(()=>{
                    this.timeEnd-=1;
                    if(this.timeEnd<1){
                        this.timeEnd=60;
                        clearInterval(this.timeFn);
                    }
                },1000)
            })
        },
        // 下一步
        upPassword(){
            if(!valPhone(this.phone)){
                return false;
            }
            if(!this.imgCode){
                toast('请输入图形验证码！');
                return false;
            }
            if(!this.isCode){
                toast('请先获取短信验证码！');
                return false;
            }
            if(!this.code){
                toast('请输入短信验证码！');
                return false;
            }
            this.page = 2;
            return true;
        },
        async submit(){
            if(!this.check()) return;
            const res = await post('Member/SubmitResetLoginPwd',{
                Mobile: this.phone,
                VerifyType: 2,
                VerifyCode: this.code,
                NewLoginPwd: this.pwd
            },{isLogin:true})
            toast('修改成功！',true)
            this.back();
        },
        check(){
            if(!this.pwd){
                toast('请输入密码！');
                return false;
            }
            if(this.pwd.length<6||this.pwd.length>15){
                toast('请输入6到16位密码！');
                return false;
            }
            if(this.pwd!==this.comfirmPwd){
                toast('两次输入密码不一致！');
                return false;
            }
            return true;
        },
        back(){
            setTimeout(()=>{
            uni.navigateBack();
            },2000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('../../css/d_style.css');
</style>