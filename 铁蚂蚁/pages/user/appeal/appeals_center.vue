<template>
    <div class="bg_gray">
        <div class="h45">
            <div class="head bb_border">
                <a href="../member.html" class="btn_back"></a>
                <div class="title center">申诉中心</div>
            </div>
        </div>
        <div class="main mt10">
            <div class="appealsCenter">

                <div class="tabnav mb10">
                    <ul class="li50 clear" id="appeals_ul">
                        <li class="active" index="0">我收到的申诉</li>
                        <li index="1">我发起的申诉</li>
                    </ul>
                </div>
                <!-- <script id="gradeListTemp" type="text/x-dot-template">
                    {{~it:value:index}}
                    <li onclick="appealInfo({{=value.Id}})">
                        <div class="box">
                            <div class="title">
                                <p class="text">【{{=value.QuestionTypeText}}】{{=value.Question}}</p><a href="javascript:;" class="link_btn">{{=value.StatusText}}</a>
                            </div>
                            <div class="info">
                                <span class="shopid">申诉ID：{{=value.Id}}</span>
                                <span class="time">{{=value.CreateTime}}</span>
                            </div>
                        </div>
                    </li>
                    {{~}}
                </script> -->
                <div class="tabcon bg_fff">
                    <ul class="appealslist" id="appealItems">

                    </ul>
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
    @import url('../../../css/task_0920.css');
</style>