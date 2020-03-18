<template>
    <div class="bg_fff">
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:api.closeWin();" class="btn_back"></a>
                <div class="title center">接单操作选择</div>
            </div>
        </div>
        <div class="main mt10">
            <div class="Browsetask">
                <div class="itembox">
                    <div class="titleHd">
                        <span><span id="txtPlatName">淘宝</span>接单账号选择(必填)</span>
                    </div>
                    <div class="lines">
                        <div class="select" id="selectbtn"><span class="text name">选择接单账号</span></div>
                        <ul id="accountList" style="display: none;">
                        </ul>
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
                <div class="itembox" id="selectMaxMoney">
                    <div class="titleHd">
                        <span>选择垫付金额</span>
                    </div>
                    <input type="text" id="maxMoney" name="maxMoney" value="" />
                </div>
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
                <a class="btn" onclick="submitOk()">确认</a>
            </footer>
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
    @import '../../css/task.css';
</style>