<template>
    <div class="bg_f8f8f8">
        <!--第一步-->
        <div class="defaultPage oneStep__defaultPage">
            <div class="h45">
                <div class="head">
                    <a href="javascript:history.go(-1);" class="btn_back"></a>
                    <div class="title center">忘记密码</div>
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
                                        <input type="text" class="weui-input" placeholder="请输入注册手机号码" id="txtMobile" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="static/image/icons/d_pic.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入图像验证码" id="txtcode" />
                                    </div>
                                </div>
                                <div class="weui-cell__ft">
                                    <div class="imgBox">
                                        <img src="" id="ValidateImg" alt="验证码,看不清楚?请点击刷新验证码"/>
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="static/image/icons/d_code.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="text" class="weui-input" placeholder="请输入验证码" id="VerifyCode" />
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
                <div class="head">
                    <a href="javascript:;" class="btn_back"></a>
                    <div class="title center">忘记密码</div>
                </div>
            </div>
            <div class="main">
                <div class="regLogForm">
                    <form action="">
                        <div class="weui-cells">
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="static/image/icons/d_pwd.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="password" class="weui-input" placeholder="请输入6-16位密码" id="txtpassword" />
                                    </div>
                                </div>
                            </div>
                            <div class="weui-cell">
                                <div class="weui-cell__hd">
                                    <img src="static/image/icons/d_pwd.png" alt="" class="iconImg" />
                                </div>
                                <div class="weui-cell__bd">
                                    <div class="inputBox">
                                        <input type="password" class="weui-input" placeholder="请再次输入新密码" id="txtpassword2" />
                                    </div>
                                </div>
                            </div>
                            <a href="javascript:;" class="weui-btn weui-btn-active btn-twoStep">完成</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import url('../../css/d_style.css');
</style>