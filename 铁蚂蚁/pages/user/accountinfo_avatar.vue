<template>
    <div class="bg_f8f8f8">
        <headers>头像</headers>
        <div class="main">
            <div class="bindSection">
                <div class="dd__hd">
                    <span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
                </div>
                <ul class="dd_piclist li25">
                    <li>
                        <div class="outside" @click="upAvatar">
                            <div class="img">
                                <div class="upimg">
                                    <img :src="userInfo.Avatar||'/static/image/tx/tx_pic.png'" id="useravatarImg" class="uploadImg" />
                                </div>
                                <!-- <input class="upbtn" type="file">-->
                                <!-- <input id="uploaderInput0" data-type="uploader" data-for-inputname="pic0" type="file" accept="image/*" class="upbtn" onclick="getimage(this)" />
                                <input type="hidden" data-name="pic0" name="pic0" id="purl0" data-forval="ͼƬ0" data-forid='unneedpic' class="on" placeholder="图片0" data-for="uploaderInput" /> -->
                            </div>
                            <p class="title">我的头像</p>
                        </div>
                    </li>
                </ul>
            </div>
            <input type="hidden" id="useravatarurl" />
            <!--上传图片  end-->
            <div href="javascript:;" class="weui-btn weui-btn-active btn-submit" @click="submit" style="margin:15px 12px 20px;">确定</div>
        </div>
    </div>
</template>

<script>
import {post,getImgPath} from '@/utils';
import {pathToBase64} from '@/utils/image-tools';
export default {
    data(){
        return {
            userId:'',
            token:'',
            userInfo:'',
        }
    },
    onLoad(){
        this.userInfo=uni.getStorageSync('userInfo');
        console.log(this.userInfo)
    },
    onShow(){

    },
    methods:{
        upAvatar(){
            getImgPath(1,[],['compressed']).then(path=>{
                console.log(path,'path')
                this.userInfo.Avatar = path[0]; 
            })
        },
        async base64Img(arr){
            return new Promise(async (resolve,reject)=>{
                let base27Arr = []
                for(let i = 0;i < arr.length;i++){
                let res = '';
                if(/https?:\/\/(?:[^/]+\.)?([^./]+\.\w*.(?:cn|com|top|com\.tw))(?:$|\/)/.test(arr[i])){
                    res=arr[i]
                }else{
                    res = await pathToBase64(arr[i]);
                }
                base27Arr.push(res)
                }
                resolve(base27Arr)
            })
        },
        submit(){
            this.base64Img([this.userInfo.Avatar]).then(imgbase64path=>{
                post('Member/EditHeadImage',{
                    UserId: uni.getStorageSync('userId'),
                    Token: uni.getStorageSync('token'),
                    Avatar:imgbase64path[0]
                }).then(res=>{
                    uni.showToast({
                        title:'头像上传成功！'
                    })
                    this.userInfo.Avatar = res.obj;
                    uni.setStorageSync('userInfo',this.userInfo);
                    setTimeout(()=>{
                        uni.navigateBack();
                    },1500)
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .dd_piclist li img{
        height:100%;
    }
</style>