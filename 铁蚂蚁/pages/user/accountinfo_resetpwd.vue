<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="accountinfo.html" class="btn_back"></a>
                <div class="title center">修改登录密码</div>
            </div>
        </div>
        <div class="main">
            <div class="regLogForm">
                <form action="">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" class="weui-input" placeholder="请输入旧密码" id="txtpassword" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" class="weui-input" placeholder="请输入新密码" id="txtnewpassword" />
                                </div>
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <div class="inputBox">
                                    <input type="password" class="weui-input" placeholder="请确认新密码" id="txtnewpassword2" />
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="weui-btn weui-btn-active btn-submit">确定</a>
                    </div>
                </form>
            </div>
        </div>
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
    .btn-submit {
        margin-top: .3rem;
        margin-bottom: .15rem;
    }

    .regLogForm .weui-input {
        padding-left: .12rem;
    }
</style>