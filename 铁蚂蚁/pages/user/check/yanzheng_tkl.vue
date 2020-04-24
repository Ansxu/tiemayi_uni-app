<template>
<div style='background-color: #39005a;'>
    <headers>淘宝账号验证</headers>
    <div class="main">
        <div class="joinVIP" style="border-top:none;">
            <div class="joinVIP_section">
                <div class="joinVIP_section__hd">
                    <p class="title">验证流程</p>
                </div>
                <div class="joinVIP_section__bd">
                    <div class="con">
                        <h2 class="title">步骤：</h2>
                        <p class="taokoulingbox" v-if="type===1">
                            1、当页面出现授权链接后，点击复制授权链接。
                            <br /> 2、打开淘宝APP，复制链接到搜索栏，点击搜索跳转页面，然后点击确认登录
                            <br /> 3、确认进入地址之后，点击下面的 "已验证" 按钮，页面会提示是否验证成功，如果提示结果为验证失败，重复以上流程
                            <br /> 4在淘宝app验证后请等待30秒后再点击 "已验证" 按钮
                        </p>
                        <p class="erweimabox" v-else>
                            1、当页面出现验证二维码后，使用手机截图
                            <br /> 2、打开淘宝APP，点击淘宝首页左上角扫一扫，扫码进行验证
                            <br /> 3、确认进入地址之后，点击下面的 "已验证" 按钮，页面会提示是否验证成功，如果提示结果为验证失败，重复以上流程
                            <br /> 4在淘宝app验证后请等待30秒后再点击 "已验证" 按钮
                        </p>
                    </div>
                </div>
            </div>
            <div class="joinVIP_section">
                <div class="joinVIP_section__bd">
                    <div class="con">
                        <h2 class="title taokoulingbox" v-if="type===1">授权链接：<span id="taokoulingitem">{{value}}</span></h2>
                        <!-- <h2 class="tklimg"><img src="../../../images/banner/baner1.jpg" alt=""></h2> -->
                        <h2 class="erweimabox title" v-if="type===2">验证二维码：
                          <div class="yzCodeImg">
                            <img  id="codeImg" alt="" :src="value"/>
                          </div>
                        </h2>
                    </div>
                </div>
            </div>
            <div class="joinVIP_section">
                <div class="joinVIP_section__bd">
                    <div class="con">
                        <h2 class="title">验证结果：<span id="tklReault">{{statusTxt}}</span></h2>
                    </div>
                </div>
            </div>
            <div class="dd_Btns flex flexAlignCenter justifyCenter">
                <div class="weui-btn weui-btn-active taokoulingbox" id="btncopy" v-if="type===1" @click="copyORsave">复制链接</div>
                <div class="weui-btn weui-btn-active" id="btnSaveCodeImg"  v-if="type===2" @click="copyORsave">保存二维码</div>
                <div class="weui-btn weui-btn-active" @click="updateData()">已验证</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {post,goUrl,toast} from '@/utils';
import '@/utils/ican-H5Api';
export default {
    data(){
        return {
			userId:'',
            token:'',
            value:'',
            type:1,//1-链接，2-二维码
            AccountId:'',
            statusTxt:'未验证',//验证提示文本
        }
    },
    onLoad(options){
        this.AccountId = options.Id;
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
        this.getData();
    },
    onShow(){

    },
    methods:{
        getData(){
            post('Member/GetTaoCode',{
                UserId: this.userId,
                Token: this.token,
                PlatId: 1
            }).then(res=>{
                // 二维码
                if(res.msg=='201'){
                    this.type = 2;
                }
                // 链接
                else{
                    this.type = 1;
                }
                this.value = res.obj;
            })
        },
        
        //验证成功更新数据
        updateData() {
            post('Member/UpdateCheckData',{
                UserId: this.userId,
                Token: this.token,
                AccountId: this.AccountId
            }).then(res=>{
                this.statusTxt = '验证成功';
            }).catch(err=>{
                this.statusTxt = err.msg;
            })
        },
        copyORsave(){
            if(this.type===1){
                uni.setClipboardData({ 
                    data:this.value, 
                    success:function(data){
                        toast('复制成功',true)
                    },
                    fail:function(err){
                        toast('复制失败，请重试')
                    } 
                })
            }else{
                uni.saveImageToPhotosAlbum({ 
                    filePath: this.value, 
                    success: function () { 
                        toast('保存成功',true)
                    },
                    fail:function(err){
                        toast('保存失败，请重试')
                    } 
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
     .allScreenPage {
            display: none;
        }

        .adpt {
            width: 80px;
            background-size: 28px 30px;
            font-size: 17px;
            padding-left: 5px;
            color: #FFF;
            display: -webkit-box;
            -webkit-box-pack: center;
            -webkit-box-align: center;
        }

        .yzCodeImg {
            width: 100%;
        }

        .yzCodeImg img {
            width: 60%;
            margin: auto;
        }
        .tklimg{
          width: 100px;
          height: 100px;
          margin: 10px auto;
        }
        .tklimg img{
          width: 100%;
          height: 100%;
        }
</style>