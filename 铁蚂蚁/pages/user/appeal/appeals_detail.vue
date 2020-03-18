<template>
    <div>
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:api.closeWin();" class="btn_back"></a>
                <div class="title center">申诉详情</div>
            </div>
        </div>
        <div class="main">
            <div class="appealsDetail">
                <div class="stepInfo">
                    <ul>
                        <li class="no1 end">
                            <i class="icon num">1</i>
                            <dl>
                                <dd><label>申诉简介</label></dd>
                                <dd><label>关联订单号</label><span id="orderid">XXXXXXXXXXXX</span></dd>
                                <dd><label>商品图片</label></dd>
                                <dd>
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                                <img id="productimg" src="/static/image/image/of/order_pic1.jpg"/>
                                            </span>
                                    </div>
                                </dd>
                            </dl>
                        </li>
                        <li class="no2 active">
                            <i class="icon num">2</i>
                            <dl>
                                <dd><label>投诉内容</label></dd>
                                <dd>
                                    <div id="questionImg" class="imglist thumbnails">
                                        <span class="img" style="display:none;">
                                            <img src="" />
                                        </span>
                                        <span class="img" style="display:none;">
                                            <img src="" />
                                        </span>
                                        <span class="img" style="display:none;">
                                            <img src="" />
                                        </span>
                                    </div>
                                </dd>
                                <dd><label id="textcontent">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</label></dd>
                            </dl>
                        </li>
                        <li class="no3">
                            <i class="icon num">3</i>
                            <dl>
                                <dt><label>协商处理</label></dt>
                                <dd class="text_l">
                                    <div class="reply_box" style="display:none;">
                                        <div class="textarea_box" style="margin-right:.1rem;">
                                            <textarea placeholder="输入回复申诉信息" id="txtReply"></textarea>
                                        </div>
                                        <div class="piclist Uploadimg">
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" onclick="getpic(this,'replyImgF',10)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgF" readonly="true" />
                                                </div>
                                            </div>
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" onclick="getpic(this,'replyImgS',10)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgS" readonly="true" />
                                                </div>
                                            </div>
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" onclick="getpic(this,'replyImgT',10)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgT" readonly="true" />
                                                </div>
                                            </div>
                                        </div>
                                        <a class="btn" id="replyAppeal" style="margin-top:.1rem;">回复申诉</a>
                                    </div>
                                    <span class='reply_text'></span>
                                    <div id="replyImg" class="imglist thumbnails">
                                    </div>
                                    <!-- <a class="btn">回复申诉</a> -->
                                    <a style="display:none;" class="btn" id="guanfangjieru">官方介入</a>
                                    <!-- <a class="btn">完结申诉</a> -->
                                </dd>
                            </dl>
                        </li>
                        <li class="no4">
                            <i class="icon num">4</i>
                            <dl>
                                <dd>
                                    <span class='platformreply_text'></span>
                                    <label>已经完成</label>
                                </dd>
                            </dl>
                        </li>
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
    @import url('../../../css/task.css');
</style>