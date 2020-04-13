<template>
    <div class="bg_f8f8f8">
        <headers>注册</headers>
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
                                    <input type="number" v-model.trim="phone" class="weui-input" placeholder="请输入手机号码，用于登录和找回密码" id="txtMobile" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_pic.png" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="text" v-model.trim="imgCode" class="weui-input" placeholder="请输入图像验证码" id="txtcode" />
                                </div>
                            </div>
                            <div class="weui-cell__ft">
                                <div class="imgBox" @click="upOnlyVal">
                                    <img :src="host+'Member/GetImageCode?OnlyVal='+OnlyVal" id="ValidateImg" alt="验证码,看不清楚?请点击刷新验证码" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_xinxi.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="text" v-model.trim="code" class="weui-input" placeholder="请输入短信验证码" id="VerifyCode" />
                                </div>
                            </div>
                            <div class="weui-cell__ft" @click="getCode">
                                <div class="sendCode" :class="{'codeTimeend':timeEnd!==60}" id="send-code">{{timeEnd!==60?timeEnd+"秒后可获取":"获取验证码"}}</div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_pwd.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" v-model.trim="pwd" class="weui-input" placeholder="请输入6到16位密码" id="txtPassword" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_pwd.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" v-model.trim="comfirmPwd" class="weui-input" placeholder="再次输入密码" id="txtPassword2" />
                                </div>
                            </div>
                        </div>
                        <!-- <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_email.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="text" class="weui-input" placeholder="请输入邮箱（选填）" id="txtEmail" />
                                </div>
                            </div>
                        </div> -->
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_email.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="number" v-model.trim="qq" class="weui-input" placeholder="请输入QQ（必填）" id="txtQQ" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="/static/image/icons/d_yaoqing.png" alt="" class="iconImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="text" class="weui-input" v-model.trim="inviteCode" placeholder="请输入邀请码（必填）" id="txtInviteCode" />
                                </div>
                            </div>
                        </div>
                        <div class="flex agreement__register">
                            <div class="IconsCK" @click="read= !read">
                                <input type="checkbox" id="isagree" />
                                <span :class="{'inputGou':read}"></span>
                            </div>
                            <div class="flexItem">我已阅读并同意<span id="showAgreementShade">《旺店宝用户协议》</span></div>
                        </div>
                        <div class="weui-btn weui-btn-active btn-register" id="btnReg" @click="submit">立即注册</div>
                        <div class="hasAccountMag" @click="back">已有账号？立即登录</div>
                    </div>
                </form>
            </div>
        </div>
        <div class="shade">
            <div class="shade__content">
                <div class="shade-item agreement__shadeItem">
                    <div class="shade__hd">
                        <h2 class="shade__title">铁蚂蚁用户注册协议</h2>
                        <span class="btn-close"></span>
                    </div>
                    <div class="shade__bd">
                        <div class="agreementCon">
                            <p>欢迎您加入铁蚂蚁会员！</p>
                            <p>在注册之前，请您详细阅读以下有关铁蚂蚁的使用条件与规则，并确认同意在您使用任何铁蚂蚁提供的信息、服务与活动时，皆能遵守。<br /> § 铁蚂蚁 使用 手机号码 做为使用者验证、服务启用、密码查询与变更之依据。因此在您申请加入 铁蚂蚁 时，请务必确认 您所填写的手机号码是正确的。<br /> § 铁蚂蚁 使用个人信息如习惯语言、国别、生日、联系资料等作为系统设定、提供服务、系统查询等依据，因此在您申请加入 铁蚂蚁 时，请务必详实填写个人信息。<br
                                /> § 您有妥善保管注册信息的责任与义务，我们建议您不要将自己的账号、服务经由转借、出售或任何方式提供他人使用。您对因您个人保管不当所造成的任何损失，应负全部责任。 <br /> § 您使用铁蚂蚁提供的信息、服务、活动时，皆应遵守著作权、专利权、商标权、肖像权等相关法律规范，任何侵犯铁蚂蚁与他人权利的行为，您应负全部责任。<br /> § 不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：<br
                                /> （一）煽动抗拒、破坏宪法和法律、行政法规实施的；
                                <br /> （二）煽动颠覆国家政权，推翻社会主义制度的；
                                <br /> （三）煽动分裂国家、破坏国家统一的；
                                <br /> （四）煽动民族仇恨、民族歧视，破坏民族团结的；
                                <br /> （五）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；
                                <br /> （六）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
                                <br /> （七）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
                                <br /> （八）损害国家机关信誉的；
                                <br /> （九）其他违反宪法和法律行政法规的；
                                <br /> （十）进行商业广告行为的。
                            </p>
                        </div>
                    </div>
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
            OnlyVal: "",//图形验证码图像
            phone:'',
            pwd:'',
            comfirmPwd:'',
            isCode:false,//是否已获取短信验证码
            code:'',
            imgCode:'',
            qq:'',
            inviteCode:'',//邀请码
            read:false,//是否已阅读用户协议
            timeEnd:60,
            timeFn:null,//倒计时的方法
        }
    },
    onLoad(){
        this.OnlyVal= "",//图形验证码图像
        this.phone='',
        this.pwd='',
        this.comfirmPwd='',
        this.isCode=false,//是否已获取短信验证码
        this.code='',
        this.imgCode='',
        this.qq='',
        this.inviteCode='',//邀请码
        this.read=false,//是否已阅读用户协议
        this.timeEnd=60,
        this.timeFn=null;//倒计时的方法
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
                VerifyType: 0,
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
        async submit(){
            if(!this.check()) return;
            const res = await post('Login/MobileRegister',{
                Mobile: this.phone,
                VerifyCode: this.code,
                Password: this.pwd,
                InviteCode: this.inviteCode,
                QQ:this.qq
            },{isLogin:true})
            toast('注册成功！',true)
            this.back();
        },
        check(){
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
            if(!this.qq){
                toast('请输入QQ！');
                return false;
            }
            if(!this.inviteCode){
                toast('请输入邀请码！');
                return false;
            }
            if(!this.read){
                toast('请阅读用户协议！');
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