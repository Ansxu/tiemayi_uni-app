<template>
    <div>
        <!-- <header class="blue2 mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon icon-fenxiang mui-pull-left"></a>
            <h1 class="mui-title">点击选择模版</h1>
        </header> -->
        <div class="h45">
            <div class="head bb_border">
                <a href="member.html" class="btn_back"></a>
                <div class="title center">点击选择模版</div>
            </div>
        </div>

        <div style="padding:10px; padding-bottom:50px;">
            <div class="mbimg">
                <img data-num='100' src="static/image/of/moban0.jpg" class="mbimg_hover" style="float:left; border:1px dashed #666;" />
            </div>
            <div class="mbimg">
                <img data-num='1' src="static/image/of/moban1.jpg" style="float:right;" />
            </div>
            <div class="mbimg">
                <img data-num='2' src="static/image/of/moban2.jpg" style="float:left;" />
            </div>
            <div class="mbimg">
                <img data-num='3' src="static/image/of/moban3.jpg" style="float:right;" />
            </div>
            <div class="mbimg">
                <img data-num='4' src="static/image/of/moban4.jpg" style="float:left;" />
            </div>
            <div style="clear:both;"></div>
        </div>

        <div class="footer text-center" style="background-color: #00ABEF;height:50px;font-size: 20px;padding-top:15px;">
            <a id="gotoqr" href="javascript:;" style="color:white;">
                        生成专属二维码推广模版
                </a>
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
    @import url('../../css/mui.css');
    @import url('../../css/shareqrcode.css')
</style>