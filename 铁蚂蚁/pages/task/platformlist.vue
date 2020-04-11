<template>
    <div class="bg_fff">
		<div class="h45">
			<div class="head bb_border">
				<!-- <a href="../../html/user/member.html" class="btn_back"></a> -->
				<div class="title center">全部任务</div>
			</div>
		</div>
        <div class="main mt10">
            <div class="tabNav tabList">
            <ul class="clear">
                <li :class="{'active':tabIndex===1}" @click="onTab(1)">垫付任务</li>
                <li :class="{'active':tabIndex===2}" @click="onTab(2)">浏览任务</li>
            </ul>
            </div>
            <div class="navIcon bg_fff mb10">
            <ul class="li20 clear" id="platformList">
                <li v-for="(item,index) in data" :key="index" @click="goList(item)">
                    <div class="box">
                        <i class="icon"><img :src="item.Logo"/></i>
                        <p>{{item.PlatName}}</p>
                    </div>
                </li>
            </ul>
            </div>
        </div>
        <!--底部-->
		<footers :showIndex="1" :showOrderReceiving="false"></footers>
        <!--底部 end-->
    </div>
</template>

<script>
import footers from '@/components/footer.vue'
import {post,goUrl} from "@/utils";
export default {
    components:{footers},
    data() {
        return {
			userId:'',
			token:'',
            data:{},
            tabIndex:1,
        };
    },
    onLoad(options) {
        console.log(options)
		this.userId = uni.getStorageSync('userId');
        this.token = uni.getStorageSync('token');
        this.tabIndex= options.type*1||1;//1--垫付任务；2--浏览任务
		this.getData();
    },
    onShow() {

    },
    methods: {
        checkTask(){
            // post('task/GetTaskList',{
            //     UserId: this.userId,
            //     Token: this.token,
            // })
        },
		getData(){
			post('Task/GetTaskTypePlatform',{
                UserId: this.userId,
                Token: this.token,
                TaskType:this.tabIndex
			}).then(res=>{
				this.data = res.obj;
			})
        },
        onTab(index){
            this.tabIndex = index;
            this.getData();
        },
        goList(item){
            goUrl('task/selecttaskinfo',{
                platformId:item.Id,
                typeIndex:this.tabIndex
            })
        },

    }
};
</script>

<style lang="scss" scoped>
@import '../../css/task.css';
</style>