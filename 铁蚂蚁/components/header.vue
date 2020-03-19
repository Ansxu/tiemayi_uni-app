<template>
    <div class="h45">
        <div class="head">
            <div @click="goBack" class="btn_back"></div>
            <div class="title center"><slot></slot></div>
        </div>
    </div>
</template>

<script>
import {} from '@/utils';
export default {
    props:{
        // 是否自定义后退方法
        onBack:{
            type: Boolean,
            default:false
        }
    },
    data(){
        return {

        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{
        goBack(){
            if(this.onBack){
                this.$emit('onBack')
            }else{
                uni.navigateBack();
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>