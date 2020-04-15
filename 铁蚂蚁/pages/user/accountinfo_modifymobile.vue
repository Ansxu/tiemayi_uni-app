<template>
    <div class="bg_f8f8f8">
        <!--第一步-->
        <div class="defaultPage oneStep__defaultPage" v-if="page===1">
            <headers>手机号修改</headers>
            <div class="main">
                <div class="regLogForm resetTel__regLogForm">
                    <div class="dd_msgBox">
                        <p>原用户可接受短信的用户可自主验证修改手机，修改后原有邀请关系不受影响，原用户无法接受短信的用户，需联系在线客服验证后修改手机号</p>
                    </div>
                    <form action="">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    旧手机号
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="phone" class="weui-input" placeholder="请输入旧手机号码" id="txtMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    图片验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="imgCode" class="weui-input" placeholder="请输入图像验证码" id="txtcode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft" @click="upOnlyVal">
                                    <div class="imgBox">
                                        <img  :src="host+'Member/GetImageCode?OnlyVal='+OnlyVal" id="ValidateImg" alt="验证码,看不清楚?请点击刷新验证码"/>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    短信验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="code" class="weui-input" placeholder="请输入短信验证码" id="VerifyCode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft" @click="getCode(6,phone)">
                                    <div class="sendCode" :class="{'codeTimeend':timeEnd!==60}" id="send-code">{{timeEnd!==60?timeEnd+"秒后可获取":"获取验证码"}}</div>
                                </div>
                            </div>
                            <div @click="next" class="weui-btn weui-btn-active btn-oneStep">下一步</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--第二步-->
        <div class="defaultPage twoStep__defaultPage allScreenPage" v-else>
            <headers :onBack="true" @onBack="page=1">手机号修改</headers>
            <div class="main">
                <div class="regLogForm resetTel__regLogForm">
                    <div class="dd_msgBox">
                        <p>原用户可接受短信的用户可自主验证修改手机，修改后原有邀请关系不受影响，原用户无法接受短信的用户，需联系在线客服验证后修改手机号</p>
                    </div>
                    <form action="">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    新手机号
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="newPhone" class="weui-input" placeholder="请输入手机号码" id="txtNewMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    图片验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="imgCode" class="weui-input" placeholder="请输入图像验证码" id="txtcode2" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft" @click="upOnlyVal">
                                    <div class="imgBox">
                                        <img  :src="host+'Member/GetImageCode?OnlyVal='+OnlyVal" id="ValidateImg2" alt="验证码,看不清楚?请点击刷新验证码" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    短信验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" v-model.trim="newCode" class="weui-input" placeholder="请输入短信验证码" id="VerifyCode2" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft" @click="getCode(7,newPhone)">
                                    <div class="sendCode" :class="{'codeTimeend':timeEnd!==60}" id="send-code2">{{timeEnd!==60?timeEnd+"秒后可获取":"获取验证码"}}</div>
                                </div>
                            </div>
                            <div  class="weui-btn weui-btn-active btn-submit" @click="submit">提交</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {CreatOnlyVal,host,valPhone,toast,post} from '@/utils'
export default {
    data(){
        return {
            host,
            page:1,//1=第一步；2=第二步
            OnlyVal: "",//图形验证码图像
            phone:'',
            newPhone:'',
            isCode:false,//是否已获取短信验证码
            code:'',
            newCode:'',
            imgCode:'',
            timeEnd:60,
            timeFn:null,//倒计时的方法
        }
    },
    onLoad(){
        this.upOnlyVal();
    },
    onShow(){

    },
    methods:{
        // 更新图形验证码
        upOnlyVal(){
            this.OnlyVal = CreatOnlyVal();
            this.imgCode='';
        },
        // 获取验证码,6=旧手机号验证并获取验证码参数;7=修改手机号验证并获取验证码参数
        getCode(VerifyType,Mobile){
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
                Mobile,
                VerifyType,
                ImgCode: this.imgCode,
                OnlyVal: this.OnlyVal
            }).then(res=>{
                toast('已发送至该手机',true);
                this.upOnlyVal();
                this.timeFn = setInterval(()=>{
                    this.timeEnd-=1;
                    if(this.timeEnd<1){
                        this.timeEnd=60;
                        clearInterval(this.timeFn);
                    }
                },1000)
            }).catch(err=>{
                this.upOnlyVal();
            })
        },
        // 点击下一步
        next(){
            if(!this.check(this.phone,this.code)){return false;}
            this.upOnlyVal();//更新图形验证码
            this.timeEnd=60;
            clearInterval(this.timeFn);
            this.isCode=false;
            this.page=2;
        },
        // 提交
        async submit(){
            if(!this.check(this.newPhone,this.newCode)) return;
            const res = await post('Member/SubmitModifyByMobile',{
                Mobile: this.phone,
                VerifyCode: this.code,
                NewMobile: this.newPhone,
                NewVerifyCode: this.newCode,
                UserId: uni.getStorageSync('userId'),
                Token: uni.getStorageSync('token')
            },{isLogin:true})
            toast('注册成功！',true)
            this.back();
        },
        check(phone,code){
            if(!valPhone(phone)){
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
            if(!code){
                toast('请输入短信验证码！');
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
    .btn-submit {
        margin-top: .3rem;
        margin-bottom: .15rem;
    }
</style>