<template>
    <div class="bg_fff">
        <headers>接单操作选择</headers>
        <div class="main mt10">
            <div class="Browsetask">
                <div class="itembox">
                    <div class="titleHd">
                        <span><span id="txtPlatName">淘宝</span>接单账号选择(必填)</span>
                    </div>
                    <div class="lines">
                        <div class="select" id="selectbtn" v-for="(item,index) in data" :key="index">
                            <span class="text name">{{item.PlatAccount}}</span>
                        </div>
                        <!-- <ul id="accountList" style="display: none;">
                        </ul> -->
                    </div>
                </div>
                <div class="itembox">
                    <div class="titleHd">
                        <span>选择操作设备</span>
                    </div>
                    <div class="Btns text_l">
                        <!-- <a class="btn" href="javascript:;">全部</a> -->
                        <a class="btn cur" href="javascript:;">手机</a>
                        <!-- <a class="btn" href="javascript:;">电脑</a> -->
                    </div>
                </div>
                <!-- <div class="itembox" id="selectMaxMoney">
                    <div class="titleHd">
                        <span>选择垫付金额</span>
                    </div>
                    <input type="text" id="maxMoney" name="maxMoney" value="" />
                </div> -->
                <div class="itembox">
                    <div class="titleHd">
                        <span>选择返款方式</span>
                    </div>
                    <div class="Btns text_l">
                        <!-- <a class="btn" href="javascript:;">全部</a> -->
                        <a class="btn cur" href="javascript:;">平台返款</a>
                        <!-- <a class="btn" href="javascript:;">商家返款</a> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="null50">
            <footer class="ftbtn">
                <div class="btn" @click="submit">确认</div>
            </footer>
        </div>
    </div>
</template>

<script>
import {post,toast,goUrl} from '@/utils';
export default {
    data(){
        return {
			userId:'',
            token:'',
            platformId:'',
            typeIndex:'',
			data:[]
        }
    },
    onLoad(options){
        this.platformId = options.platformId;
        this.typeIndex = options.typeIndex;
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.getData();
    },
    onShow(){

    },
    methods:{
		getData(){
			post('Task/GetMemberCanReceiveAccount',{
                UserId: this.userId,
                Token: this.token,
                PlatId:this.platformId,
                TaskType:  this.typeIndex
			}).then(res=>{
                this.data = res.obj;
                if(res.obj.length<1){
                    toast('没有可以进行接单的账号了哦~')
                    setTimeout(()=>{
                        uni.navigateBack();
                    },1500)
                }
			}).catch(err=>{
                setTimeout(()=>{
                    uni.navigateBack();
                },1500)
            })
		},
		submit(){
            if(!this.data[0]) {
                toast('没有可以进行接单的账号了哦~')
                setTimeout(()=>{
                    uni.navigateBack();
                },1500)
                return;
            }
			goUrl('task/list',{
                PlatformId: this.platformId,
                AccountId:this.data[0].Id,
                TaskType:  this.typeIndex
			})
		},
    }
}
</script>

<style lang="scss" scoped>
    @import '../../css/task.css';
</style>