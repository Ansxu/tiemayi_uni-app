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
                                    <div class="reply_box" v-if="data.Status==0&&data.AppealType!=0&&!data.Reply" >
                                        <div class="textarea_box" style="margin-right:10px">
                                            <textarea @input="textarea" placeholder="输入回复申诉信息" id="txtReply"></textarea>
                                        </div>
                                        <div class="piclist Uploadimg">
                                            <div style="width: 100px; float: left; padding:10px 10px 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(1)">
														<img class="uploadImg" v-if="replyImgF" :src="replyImgF" />
													</div>
                                                </div>
                                            </div>
                                            <div style="width: 100px; float: left; padding:10px 10px 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(2)">
														<img class="uploadImg" v-if="replyImgS" :src="replyImgS" />
													</div>
                                                </div>
                                            </div>
                                            <div style="width: 100px; float: left; padding:10px 10px 0 0;">
                                                <div class="img">
                                                    <div class="upimg" @click="getpic(3)">
														<img class="uploadImg" v-if="replyImgT" :src="replyImgT" />
													</div>
                                                </div>
                                            </div>
                                        </div>
                                        <view class="btn" id="replyAppeal" v-if="!data.Reply" style="margin-top:10px;" @click="replyAppeal">回复申诉</view>
                                    </div>
                                    <span class='reply_text' v-if="data.AppealType==0 &&data.Reply">商家回复内容：{{data.Reply}}</span>
                                    <span class='reply_text' v-else-if="data.AppealType!=0 &&data.Reply">会员回复内容：{{data.Reply}}</span>
									<div id="replyImg" class="imglist thumbnails" v-if="data.ReplyImgF||data.ReplyImgS||data.ReplyImgT">
										<div class="img" v-if="data.ReplyImgF" @click="preImg(data.ReplyImgF)">
											<div class="upimg">
												<img class="uploadImg" :src="data.ReplyImgF" />
											</div>
										</div><div class="img" v-if="data.ReplyImgS" @click="preImg(data.ReplyImgS)">
											<div class="upimg">
												<img class="uploadImg" :src="data.ReplyImgS" />
											</div>
										</div><div class="img" v-if="data.ReplyImgT" @click="preImg(data.ReplyImgT)">
											<div class="upimg">
												<img class="uploadImg" :src="data.ReplyImgT" />
											</div>
										</div>
                                    </div>
                                    <!-- <a class="btn">回复申诉</a> -->
                                    <p  class="btn" v-if="data.Status==0&&data.AppealType==0" @click="guanfangjieru" id="guanfangjieru">官方介入</p>
                                    <!-- <a class="btn">完结申诉</a> -->
                                </dd>
                            </dl>
                        </li>
                        <li class="no4" :class="data.Status==1?'active':''">
                            <i class="icon num">4</i>
                            <dl>
                                <dd>
                                    <span class='platformreply_text'>平台回复内容：{{data.PlatformReply}}</span>
                                    <label v-if="data.PlatformReply">已经完成</label>
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
import {post,getImgPath} from '@/utils';
import {pathToBase64} from '@/utils/image-tools';
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
				const data = res.obj;
				this.data=res.obj;
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
							let pathArr=[];
							if(that.replyImgF){
								pathArr.push(pathToBase64(that.replyImgF))
							}if(that.replyImgS){
								pathArr.push(pathToBase64(that.replyImgS))
							}if(that.replyImgT){
								pathArr.push(pathToBase64(that.replyImgT))
							}
							if(pathArr.length>0){
								Promise.all(pathArr).then(imgPath=>{
									that.submit(imgPath);
								})
							}else{
								that.submit();
							}
						}else if(r.cancel){
							
						}
					}
				})
			}
		},
		submit(imgPath=[]){
			let that =this
			post('Appeal/ReplySellerAppeal',{
				UserId: that.userId,
				Token: that.token,
				AppealId: that.AppealId,
				ReplyContent: that.text,
				ReplyImgF: imgPath[0]||'',
				ReplyImgS: imgPath[1]||'',
				ReplyImgT: imgPath[2]||''
			}).then(res => {
				uni.showToast({
					title:res.msg
				})
				setTimeout(()=>{
					that.init();
				},1500)
			})
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
				}
			})
		},
		//拍照或从相册获取图片
		getpic(e){
			getImgPath().then(res=>{
				let url=res[0];
				if(e==1){
					this.replyImgF=url
				}
				if(e==2){
					this.replyImgS=url
				}
				if(e==3){
					this.replyImgT=url
				}
			})
		}
    }
}
</script>

<style lang="scss" scoped>
    @import url('../../../css/task.css');
	.upimg{
		img{
		width:100%;
		height:100%;
		}
	}
	.piclist{
		&>div{
			width:100px;
			height:100px;
			margin-bottom:10px;
		}
		.img{
			padding-bottom:0;
			height:100%;
		}
	}
</style>