<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:api.closeWin();" class="btn_back"></a>
                <div class="title center">选择账号</div>
            </div>
        </div>
        <div class="main">
            <!--  循环 -->
            <!-- <script id="accountListTemp" type="text/x-dot-template">
                {{~it:value:index}}
                <div class="item">
                    <ul class="accountList accountList2">
                        <li onclick="pageJump({{=value.Id}},{{=value.PlatId}})">
                            <div class="weui-cells navList__weui-cells">
                                <div class="weui-cell">
                                    <div class="weui-cell__hd">
                                        <img src="{{=value.PlatLogo}}" alt="" class="icon-navImg" style="width:.45rem; height:.45rem" />
                                    </div>
                                    <div class="weui-cell__bd">
                                        <p class="title">{{=value.PlatAccount}}</p>
                                        <p class="title">今日已接垫付：{{=value.DayCountText}}&nbsp;浏览 {{=value.BrowseDayCount}}/∞ 单</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                {{~}}
            </script> -->
            <div class="accountListBox" id="accountlist">

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

</style>