<template>
    <div class="bg_f8f8f8">
        <!--第一步-->
        <div class="defaultPage oneStep__defaultPage">
            <div class="h45">
                <div class="head bb_border">
                    <a href="accountinfo.html" class="btn_back"></a>
                    <div class="title center">手机号修改</div>
                </div>
            </div>
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
                                        <input type="text" class="weui-input" placeholder="请输入旧手机号码" id="txtMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    图片验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入图像验证码" id="txtcode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="imgBox">
                                        <img src="" id="ValidateImg" alt="验证码,看不清楚?请点击刷新验证码" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    短信验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入短信验证码" id="VerifyCode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="sendCode" id="send-code">获取验证码</div>
                                </div>
                            </div>
                            <a href="javascript:;" class="weui-btn weui-btn-active btn-oneStep">下一步</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!--第二步-->
        <div class="defaultPage twoStep__defaultPage allScreenPage" style="display: none;">
            <div class="h45">
                <div class="head bb_border">
                    <a href="javascript:;" class="btn_back"></a>
                    <div class="title center">手机号修改</div>
                </div>
            </div>
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
                                        <input type="text" class="weui-input" placeholder="请输入手机号码" id="txtNewMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    图片验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入图像验证码" id="txtcode2" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="imgBox">
                                        <img src="" id="ValidateImg2" alt="验证码,看不清楚?请点击刷新验证码" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    短信验证
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入短信验证码" id="VerifyCode2" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="sendCode" id="send-code2">获取验证码</div>
                                </div>
                            </div>
                            <a href="javascript:;" class="weui-btn weui-btn-active btn-submit">提交</a>
                        </div>
                    </form>
                </div>
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
</style>