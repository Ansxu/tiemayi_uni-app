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
            uni.navigateBack();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>