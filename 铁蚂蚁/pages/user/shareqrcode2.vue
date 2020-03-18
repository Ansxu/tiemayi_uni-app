<template>
    <div>
        <div class="h45">
            <div class="head bb_border">
                <a href="shareqrcode.html" class="btn_back"></a>
                <div class="title center">推广模版</div>
            </div>
        </div>
        <!-- <div class="hahahaha" style="position: absolute;width:100%;">
            <img src="/static/image/of/moban4.jpg" style="width:100%;" />
            <div class="qrcode qrcode4">
                <img src="http://mlb.wtvxin.com/ajax/tools/qrcode_ajax.ashx?chl=http://mlb.wtvxin.com/invite/register.html?rCode=123" />
            </div>
        </div> -->
        <div class="hahahaha" style="position: absolute;width:100%;">
            <div class="qrcode">

            </div>
        </div>
        <div class="footer text-center" style="background-color:rgba(233,233,233,0.85);height:50px;font-size: 20px;padding-top:15px;z-index:1000;">
            <a class="createqr" href="javascript:;" style="color:#333;">
                        保存图片到本地相册
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
    @import url('../../css/shareqrcode.css');
</style>