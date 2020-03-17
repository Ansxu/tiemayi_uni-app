<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head">
                <a href="javascript:history.go(-1);" class="btn_back"></a>
                <div class="title center">授权</div>
            </div>
        </div>
        <div class="main">
            <div class="weui-cell__hd" style="text-align:center; padding-top:20px;">
                <p>Android手机 设置中→权限管理</p>
                <p>苹果手机 设置→铁蚂蚁→通讯录 开启</p>
                <p>重新授权APP获取手机通讯录信息后，重新打开APP或点击下面按钮进行授权验证。</p>
            </div>

            <div class="regLogForm">
                <a href="javascript:;" class="weui-btn weui-btn-active btn-login" onclick="Getcontacts()">使用APP必须授权获取手机通讯录信息</a>
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