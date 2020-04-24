<template>
    <div class="bg_ffeec9">
        <headers>积分规则</headers>
        <div class="main">
            <div class="swiperImgBox">
                <img src="/static/image/banner/graderule_ban1.jpg" alt="" />
            </div>
            <div class="gradeRule">
                <div class="gradeRule_section">
                    <div class="section__bd">
                        <div class="con">
                            <h2 class="title">用户等级</h2>
                            <p>积分成长体系是为了给处于不同成长阶段的用户提供更贴心，更强大的服务，以满足不同成长阶段用户的需求而出现积分和用户等级对应表如下</p>
                        </div>
                    </div>
                </div>
                <div class="gradeRule_section">
                    <div class="section__bd">
                        <ul class="dd_gradeList" id="gradeList" v-for="(item,index) in gradeArr" :key="index">
                            <li>
                                <span class="gradeNum">{{item.GradeName}}</span>
                                <div class="txtBox">
                                    <p class="number">{{item.MinScore}}-{{item.MaxScore}}分</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="gradeRule_section">
                    <div class="section__bd">
                        <div class="con">
                            <p>每完成一单，可以积5分<br /> 不同等级每日限制接单量不等
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {get} from '@/utils';
export default {
    data(){
        return {
            gradeArr:[],
        }
    },
    onLoad(){
        this.GetGradeList();
    },
    onShow(){

    },
    methods:{
        // 获取登记信息
        GetGradeList(){
            get('Member/GetMemberGrade',{},{isLogin:true}).then(res=>{
                this.gradeArr = res.obj;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .swiperImgBox {
        border-top: 10px solid #f8f8f8;
        border-bottom: 10px solid #f8f8f8;
    }
</style>