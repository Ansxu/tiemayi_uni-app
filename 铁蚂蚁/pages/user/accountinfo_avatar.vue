<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="accountinfo.html" class="btn_back"></a>
                <div class="title center">头像</div>
            </div>
        </div>
        <div class="main">
            <div class="bindSection">
                <div class="dd__hd">
                    <span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
                </div>
                <ul class="dd_piclist li25">
                    <li>
                        <div class="outside">
                            <div class="img">
                                <div class="upimg"><img src="/static/image/tx/tx_pic.jpg" id="useravatarImg" class="uploadImg" /></div>
                                <!-- <input class="upbtn" type="file">-->
                                <input id="uploaderInput0" data-type="uploader" data-for-inputname="pic0" type="file" accept="image/*" class="upbtn" onclick="getimage(this)" />
                                <input type="hidden" data-name="pic0" name="pic0" id="purl0" data-forval="ͼƬ0" data-forid='unneedpic' class="on" placeholder="图片0" data-for="uploaderInput" />
                            </div>
                            <p class="title">我的头像</p>
                        </div>
                    </li>
                </ul>
            </div>
            <input type="hidden" id="useravatarurl" />
            <!--上传图片  end-->
            <a href="javascript:;" class="weui-btn weui-btn-active btn-submit" style="margin:.15rem .12rem .2rem;">确定</a>
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