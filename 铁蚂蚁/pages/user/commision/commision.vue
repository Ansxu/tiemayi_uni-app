<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="../../user/member.html" class="btn_back"></a>
                <div class="title center">佣金收益</div>
                <!-- 提现这里动态传参 -->
                <a href="javascript:toWithdraw('1')" class="icon_r txt">提现</a>
            </div>
        </div>
        <div class="main">
            <div class="commisionTop">
                <p class="title">累计佣金（金）</p>
                <p class="price"><span class="num" id="commisionvalue">0.00</span>金</p>
            </div>
            <!-- <div class="weui-cell selectDateCommision__weui-cell">
                    <div class="weui-cell__bd">
                        <p class="title">本月</p>
                    </div>
                    <div class="weui-cell__ft">
                        <a href="javascript:;" class="btn-detail">明细</a>
                    </div>
                </div> -->
            <div class="conPageBox">
                <!--没有内容的时候-->
                <div class="conPage noConPage" style="display: none;">
                    <div class="noCon">
                        <div class="iconImg">
                            <img src="/static/image/image/icons/nodataicon.png" alt="" />
                        </div>
                        <p class="msg">暂时没有相关数据</p>
                    </div>
                </div>
                <!--没有内容的时候  end-->
                <!--有内容的时候-->
                <!--  循环 -->
                <!-- <script id="recordListTemp" type="text/x-dot-template">
                    {{~it:value:index}}
                    <li>
                        <div class="title">{{=value.Remark}}</div>
                        <div class="flex">
                            <div class="flexItem flex1">
                                <p class="time">{{=getDateText(value.AddTime).Format("yyyy-MM-dd hh:mm:ss") }}</p>
                            </div>
                            <p class="price">{{=value.Change}} 金</p>
                        </div>
                    </li>
                    {{~}}
                </script> -->
                <div class="conPage hasConPage">
                    <ul class="commisionList">

                    </ul>
                </div>
                <!--有内容的时候  end-->
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