<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:history.go(-1);" class="btn_back"></a>
                <div class="title center">绑定银行账号</div>
            </div>
        </div>
        <div class="main">
            <div class="dd__hd weui-cell">
                <div class="weui-cell__hd"><img src="/static/image/icons/d_msg1.png" alt="" class="msgIcon"></div>
                <div class="weui-cell__bd">
                    <p class="titleMsg">姓名必须和身份证中的一样，务必保证银行卡信息正确，否则无法退款</p>
                    <p style="color:red;display:none;" id="isbandtext">修改银行卡资料请联系我们微信客服：</p>
                </div>
            </div>
            <div class="bindForm regLogForm onlyIpt__form" style="padding-top:.1rem;">
                <form action="">
                    <div class="weui-cells">
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input type="text" class="weui-input" id="BankCardName" placeholder="请输入持卡人姓名">
                            </div>
                        </div>
                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input type="text" class="weui-input" id="BankCardNo" placeholder="请输入卡号">
                            </div>
                        </div>
                        <div class="weui-cell selectCity__weui-cell select__weui-cell">
                            <div class="weui-cell__bd">
                                <input type="text" class="weui-input"  id="area"  value="" placeholder="请选择城市" onclick="picker3()"/>
                                <span class="icon-arrow icon-arrowRight"></span>
                            </div>
                            <input type="hidden" id="provinceCode" readonly="true"/>
                            <input type="hidden" id="cityCode" readonly="true"/>
                            <input type="hidden" id="districtCode" readonly="true"/>
                        </div>

                        <div class="weui-cell">
                            <div class="weui-cell__bd">
                                <input type="text" class="weui-input" id="BankAddress" placeholder="请输入开户行详细地址">
                            </div>
                        </div>
                        <div class="weui-cell" id="showSelectBankNamePage">
                            <div class="weui-cell__bd">
                                <input type="text" class="weui-input" id="BankName" placeholder="请选择开户银行" unselectable="on" onfocus="this.blur()" readonly="readonly">
                            </div>
                        </div>
                    </div>
                    <a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin-top:.2rem;">提交</a>
                </form>
            </div>
        </div>
        <!--弹窗-->
        <!--选择银行弹窗-->
        <div class="defaultPage allScreenPage selectBankNamePage">
            <div class="h45">
                <div class="head bb_border">
                    <a href="javascript:;" class="btn_back"></a>
                    <div class="title center">选择银行名称</div>
                </div>
            </div>
            <div class="main">
                <div class="bankListBox">
                    <div class="dd__hd">
                        <p class="title">推荐银行</p>
                    </div>
                    <div class="weui-cells bankList__weui-cells" id="banklist">

                    </div>
                    <!-- <script id="bankListTemp" type="text/x-dot-template">
                        {{~it:value:index}}
                        <div class="weui-cell">
                            <div class="weui-cell__hd">
                                <img src="{{=value.BankLogo}}" alt="" class="icon-navImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <p class="name">{{=value.BankName}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-gou"></span>
                            </div>
                        </div>
                        {{~}}
                    </script> -->
                </div>
            </div>
        </div>
        <!-- <script type="text/javascript">
            $(function() {
                $('#showSelectBankNamePage').click(function() {
                    $('.selectBankNamePage').show();
                });

                $('.allScreenPage .head .btn_back').click(function() {
                    $(this).parents(".allScreenPage").hide();
                });

                $('.bankList__weui-cells').on("click", ".weui-cell", function() {
                    $(this).addClass("active").siblings(".weui-cell").removeClass("active");
                    $('#showSelectBankNamePage .weui-input').val($(this).find(".name").text());
                    $('.selectBankNamePage').hide();
                });
            });
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
    .allScreenPage {
        display: none;
    }
</style>