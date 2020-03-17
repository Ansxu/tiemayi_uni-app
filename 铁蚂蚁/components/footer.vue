<template>
    <div class="null50">
        <footer>
        <ul class="navList clear" :class="{'flex-center-between':!showOrderReceiving}">
            <li :class="[{'active':showIndex===index},'ft'+(index*1+1)] " v-for="(item,index) in tab" :key="index" 
                v-show="index!==2||(index===2&&showOrderReceiving)"
                >
            <p @click="switchTab(item.url)" :class="{'icon ftbtn':index===2}">{{item.name}}</p>
            </li>
        </ul>
        </footer>
    </div>
</template>
    
<script>
export default {
    props:{
        // 显示的index
        showIndex:{
            type: Number,
            default: 0
        },
        // 是否显示接单按钮
        showOrderReceiving:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return {
            tab:[
                {
                    name:'首页',
                    url:'index/index',
                },
                {
                    name:'全部任务',
                    url:'index/index',
                },
                {
                    name:'接单',
                    url:'index/index',
                },
                {
                    name:'已接任务',
                    url:'index/index',
                },
                {
                    name:'个人中心',
                    url:'user/menber',
                },
            ]
        }
    },
    onLoad(){

    },
    onShow(){

    },
    methods:{
        // 跳转tabbar
        switchTab(url){
            uni.navigateTo({
                url:'/pages/'+url
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>