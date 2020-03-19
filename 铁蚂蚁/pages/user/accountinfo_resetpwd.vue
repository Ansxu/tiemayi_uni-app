<template>
    <div class="bg_f8f8f8">
        <headers>修改登录密码</headers>
        <div class="main">
            <div class="regLogForm">
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <div class="inputBox">
                                <input type="password" v-model.trim="pwd" class="weui-input" placeholder="请输入旧密码" id="txtpassword" />
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <div class="inputBox">
                                <input type="password" v-model.trim="newPwd" class="weui-input" placeholder="请输入新密码" id="txtnewpassword" />
                            </div>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <div class="inputBox">
                                <input type="password" v-model.trim="confirmNewePwd" class="weui-input" placeholder="请确认新密码" id="txtnewpassword2" />
                            </div>
                        </div>
                    </div>
                    <div class="weui-btn weui-btn-active btn-submit" @click="submit">确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {toast,post} from '@/utils';
export default {
    data(){
        return {
            pwd:'',
            newPwd:'',
            confirmNewePwd:''
        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{
        submit(){
            if(!this.pwd){
                toast('请输入原始密码！');
                return false;
            }
            if(!this.newPwd){
                toast('请输入新密码！');
                return false;
            }
            if(this.newPwd.length<6||this.newPwd.length>15){
                toast('请输入6到16位新密码！');
                return false;
            }
            if(this.newPwd!==this.confirmNewePwd){
                toast('两次密码输入不一致！');
                return false;
            }
            post('Member/SubmitModifyByPassword',{
                UserId: uni.getStorageSync('userId'),
                Token: uni.getStorageSync('token'),
                OldLoginPwd: this.pwd,
                NewLoginPwd: this.newPwd
            }).then(res=>{
                toast('修改密码成功！',true);
                setTimeout(()=>{
                    uni.navigateBack();
                },1500)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn-submit {
        margin-top: .3rem;
        margin-bottom: .15rem;
    }

    .regLogForm .weui-input {
        padding-left: .12rem;
    }
</style>