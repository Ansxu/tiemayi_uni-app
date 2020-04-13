<template>
    <div>
        <!-- <div class="h45">
            <div class="head bb_border">
                <view @click="back" class="btn_back"></view>
                <div class="title center">申诉详情</div>
            </div>
        </div> -->
		
		<headers>申诉详情</headers>
        <div class="main">
            <div class="appealsDetail">
                <div class="stepInfo">
                    <ul>
                        <li class="no1 end">
                            <i class="icon num">1</i>
                            <dl>
                                <dd><label>申诉简介</label></dd>
                                <dd><label>关联订单号</label><span id="orderid">{{data.OrderNo}}</span></dd>
                                <dd><label>商品图片</label></dd>
                                <dd>
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                                <img id="productimg" @click="preImg(data.ProductImg)" :src="data.ProductImg"/>
                                            </span>
                                    </div>
                                </dd>
                            </dl>
                        </li>
                        <li class="no2 active" >
                            <i class="icon num">2</i>
                            <dl>
                                <dd><label>投诉内容</label></dd>
                                <dd>
                                    <div id="questionImg" class="imglist thumbnails">
                                        <span class="img"  v-if="data.QuestionImgF">
                                            <img @click="preImg(data.QuestionImgF)" :src="data.QuestionImgF" />
                                        </span>
                                        <span class="img"  v-if="data.QuestionImgS">
                                            <img @click="preImg(data.QuestionImgS)" :src="data.QuestionImgS" />
                                        </span>
                                        <span class="img"  v-if="data.QuestionImgT">
                                            <img @click="preImg(data.QuestionImgT)" :src="data.QuestionImgT" />
                                        </span>
                                    </div>
                                </dd>
                                <dd><label id="textcontent">{{data.Question}}</label></dd>
                            </dl>
                        </li>
                        <li class="no3" :class="data.Status!=0|| data.Reply!=''?'active':''">
                            <i class="icon num">3</i>
                            <dl>
                                <dt><label>协商处理</label></dt>
                                <dd class="text_l">
                                    <div class="reply_box" v-if="data.Status==0&&data.AppealType!=0" >
                                        <div class="textarea_box" style="margin-right:.1rem;">
                                            <textarea @input="textarea" placeholder="输入回复申诉信息" id="txtReply"></textarea>
                                        </div>
                                        <div class="piclist Uploadimg">
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(1)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgF" readonly="true" />
                                                </div>
                                            </div>
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(2)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgS" readonly="true" />
                                                </div>
                                            </div>
                                            <div style="width: 25%; float: left; padding:0.1rem 0.1rem 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(3)"><img class="uploadImg" /></div>
                                                    <input type="hidden" id="replyImgT" readonly="true" />
                                                </div>
                                            </div>
                                        </div>
                                        <view class="btn" id="replyAppeal" style="margin-top:.1rem;" @click="replyAppeal">回复申诉</view>
                                    </div>
                                    <span class='reply_text' v-if="data.AppealType==0 &&data.Reply!=''">商家回复内容：{{data.Reply}}</span>
                                    <span class='reply_text' v-else-if="data.AppealType!=0 &&data.Reply!=''">会员回复内容：{{data.Reply}}</span>
									<div id="replyImg" class="imglist thumbnails">
                                    </div>
                                    <!-- <a class="btn">回复申诉</a> -->
                                    <a  class="btn" v-if="data.Status==0&&data.AppealType==0" @click="guanfangjieru" id="guanfangjieru">官方介入</a>
                                    <!-- <a class="btn">完结申诉</a> -->
                                </dd>
                            </dl>
                        </li>
                        <li class="no4" :class="data.Status!=0?'active':''">
                            <i class="icon num">4</i>
                            <dl>
                                <dd>
                                    <span class='platformreply_text'>平台回复内容：{{data.PlatformReply}}</span>
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
import {post} from '@/utils';
export default {
    data(){
        return {
			userId:"",
			token: "",
			AppealId:'',
			data:{},
			text:'',
			replyImgF:'',
			replyImgS:'',
			replyImgT:'',
        }
    },
    onLoad(e){
    	this.userId = uni.getStorageSync("userId");
    	this.token = uni.getStorageSync("token");
		this.AppealId=e.AppealId
		this.init()
    },
    onShow(){
    	  if (
    		  this.userId !== uni.getStorageSync("userId") ||
    		  this.token !== uni.getStorageSync("token")
    		) {
    		  this.userId = uni.getStorageSync("userId");
    		  this.token = uni.getStorageSync("token");
    		}
    },
    methods:{
		back(){
			uni.navigateBack({
				delta:1
			})
		},
		init(){
			post('Appeal/GetAppealInfo',{
				UserId: this.userId,
				Token: this.token,
				AppealId: this.AppealId
			}).then(res =>{
				console.log(res)
				this.data=res.obj
			}).catch(err =>{
				if(err.errcode==2){
					uni.redirectTo({
						url:'../../login/login'
					})
				}
			})
		},
		//官方介入
		guanfangjieru(){
			const that = this;
			uni.showModal({
				title:'温馨提醒',
				content:"您真的要发起官方介入吗？",
				success(r) {
					if(r.confirm){
						that.faqijieru()
					}
				}
			})
		},
		faqijieru(){
			post('Appeal/InitiatePlatformInvolvement',{
				UserId: this.userId,
				Token: this.token,
				AppealId: this.AppealId
			}).then(res => {
				uni.showToast({
					title:res.msg,
					icon:'none',
					success() {
						uni.showToast({
							title:res.msg
						})
						setTimeout(()=>{
							uni.navigateBack();
						},1500)
					}
				})
			})
		},
		replyAppeal(){
			let that =this
			if(this.text==''){
				uni.showToast({
					title:'申诉回复不能为空',
					icon:'none',
				})
			}else{
				uni.showModal({
					title:'温馨提醒',
					content:'只能回复一次申诉信息，确认回复该内容？',
					success(r) {
						if(r.confirm){
							post('Appeal/ReplySellerAppeal',{
								 UserId: that.userId,
								 Token: that.token,
								 AppealId: that.AppealId,
								 ReplyContent: that.text,
								 ReplyImgF: that.replyImgF,
								 ReplyImgS: that.replyImgS,
								 ReplyImgT: that.replyImgT
							}).then(res => {
								uni.showToast({
									title:res.msg
								})
							})
						}else if(r.cancel){
							
						}
					}
				})
			}
		},
		//回复文本
		textarea(e){
			this.text=e.detail.value
		},
		//查看图片
		preImg(src){
			uni.previewImage({
				count:1,
				urls:[src],
				sizeType: ['original', 'compressed'],
				longPressActions:true,
				success(res) {
					console.log('成功')
				}
			})
		},
		//拍照或从相册获取图片
		getpic(e){
			let url=''
			uni.chooseImage({
			    count: 1, //默认9
			    success: function (res) {
			        console.log(JSON.stringify(res.tempFilePaths));
					url=JSON.stringify(res.tempFilePaths)
			    }
			});
			if(e==1){
				this.replyImgF=url
			}
			if(e==2){
				this.replyImgS=url
			}
			if(e==3){
				this.replyImgT=url
			}
		}
    }
}
</script>

<style lang="scss" scoped>
    @import url('../../../css/task.css');
</style>