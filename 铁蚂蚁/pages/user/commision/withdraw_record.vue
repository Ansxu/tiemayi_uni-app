<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:api.closeWin();" class="btn_back" id="backup"></a>
                <div class="title center" id="titletop">佣金提现记录</div>
            </div>
        </div>
        <!--  循环 -->
        <!-- <script id="recordListTemp" type="text/x-dot-template">
            {{~it:value:index}}
            <li>
                <div class="title">{{=value.Remark}}</div>
                <div class="flex">
                    <div class="flexItem flex1">
                        <p class="time">{{=getDateText(value.CreateTime).Format("yyyy-MM-dd hh:mm:ss")}}</p>
                    </div>
                    <p class="price">{{=value.Change}}</p>
                </div>
            </li>
            {{~}}
        </script> -->
        <div class="main">
            <ul class="commisionList withdrawRecordList" id="recordlist" style="margin-top:.1rem;">

            </ul>
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