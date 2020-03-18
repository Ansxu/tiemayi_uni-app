<template>
    <div class="bg_fff">
        <div class="h45">
            <div class="head bb_border">
            <a href="../../index.html" class="btn_back"></a>
            <div class="title center">全部任务</div>
            </div>
        </div>
        <div class="main mt10">
            <div class="tabNav tabList">
            <ul class="clear">
                <li class="active">垫付任务</li>
                <li>浏览任务</li>
            </ul>
            </div>
            <!-- <script id="platformListTemp" type="text/x-dot-template">
            {{~it:value:index}}
            <li>
            <a href="javascript:SelectPlatform({{=value.Id}});" class="box">
                <i class="icon"><img src="{{=value.Logo}}"/></i>
                <p>{{=value.PlatName}}</p>
            </a>
        </li>
            {{~}}
            </script> -->
            <div class="navIcon bg_fff mb10">
            <ul class="li20 clear" id="platformList"></ul>
            </div>
        </div>

        <!--底部-->
        <div class="null50">
            <footer>
            <ul class="navList li25 clear">
                <li class="ft1">
                <a href="../../index.html">首页</a>
                </li>
                <li class="ft2 active">
                <a href="javascript:IsNovice();">全部任务</a>
                </li>
                <li class="ft4">
                <a href="../../html/task/receivedtask.html">已接任务</a>
                </li>
                <li class="ft5">
                <a href="../../html/user/member.html">个人中心</a>
                </li>
            </ul>
            </footer>
        </div>
        <!--底部 end-->
    </div>
</template>

<script>
import {} from "@/utils";
export default {
  data() {
    return {};
  },
  onLoad() {},
  onShow() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import '../../css/task.css';
</style>