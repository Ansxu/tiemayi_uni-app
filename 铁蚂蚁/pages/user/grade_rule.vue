<template>
    <div class="bg_ffeec9">
        <div class="h45">
            <div class="head bb_border">
                <a href="member.html" class="btn_back"></a>
                <div class="title center">积分规则</div>
            </div>
        </div>
        <div class="main">
            <div class="swiperImgBox">
                <img src="static/image/banner/graderule_ban1.jpg" alt="" />
            </div>
            <div class="gradeRule">
                <div class="gradeRule_section">
                    <dov class="section__bd">
                        <div class="con">
                            <h2 class="title">用户等级</h2>
                            <p>积分成长体系是为了给处于不同成长阶段的用户提供更贴心，更强大的服务，以满足不同成长阶段用户的需求而出现积分和用户等级对应表如下</p>
                        </div>
                    </dov>
                </div>
                <!--  循环 -->
                <!-- <script id="gradeListTemp" type="text/x-dot-template">
                    {{~it:value:index}}
                    <li>
                        <span class="gradeNum">{{=value.GradeName}}</span>
                        <div class="txtBox">
                            <p class="number">{{=value.MinScore}}-{{=value.MaxScore}}分</p>
                        </div>
                    </li>
                    {{~}}
                </script> -->
                <div class="gradeRule_section">
                    <dov class="section__bd">
                        <ul class="dd_gradeList" id="gradeList">
                        </ul>
                    </dov>
                </div>
                <div class="gradeRule_section">
                    <dov class="section__bd">
                        <div class="con">
                            <p>每完成一单，可以积5分<br /> 不同等级每日限制接单量不等
                            </p>
                        </div>
                    </dov>
                </div>
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
    .swiperImgBox {
        border-top: .1rem solid #f8f8f8;
        border-bottom: .1rem solid #f8f8f8;
    }
</style>