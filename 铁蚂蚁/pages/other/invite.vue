<template>
	<div>
		<headers>推广奖励</headers>
	    <div class="main" style="background: #fff;">
	        <div class="Promotion">
	            <ul class="ul-list">
	                <li>
	                    <label>我的邀请码</label>
	                    <div class="txt-r" ><span class="blue" id="MyInvitationCode">{{data.MyInvitationCode}}</span>
							<p class="link_btn copybtn" style="display:none;" id="copyinvitebtn" onclick="CopyInviteCode()">复制</p>
							</div>
	                </li>
	                <li>
	                    <label>已完成任务单数</label>
	                    <div class="txt-r"><span class="blue" id="CompletedTaskNum">{{data.CompletedTaskNum}}</span></div>
	                </li>
	                <li>
	                    <label>推广总数</label>
	                    <div class="txt-r"><span class="c_Org" id="PromotionSum">{{data.PromotionSum}}</span>个</div>
	                </li>
	                <!-- <li>
	                    <label>徒弟</label>
	                    <div class="txt-r text_l">邀请人可获得徒弟任务佣金的 <span class="c_Org" id="promotionIncomeFee">10%</span></div>
	                </li>
	                <li>
	                  <div class="txt-r text_l">二级徒弟完成任务邀请人可获得佣金 <span class="c_Org" id="promotionIncomeFeeTwo"></span></div>
	              </li>
	              <li>
	                <div class="txt-r text_l">三级徒弟完成任务邀请人可获得佣金 <span class="c_Org" id="promotionIncomeFeeThree"></span></div>
	             </li> -->
	                <li class="totalbox">
	                    <div class="box"  @click="goUrl('other/mysubordinate',{'clickval':0})">
	                        <span class="num" id="RegisteredNum">{{data.RegisteredNum}}人</span><br>
	                        <span class="txt">徒弟</span>
	                    </div>
	                    <div class="box" @click="goUrl('other/mysubordinate',{'clickval':1})">
	                        <span class="num" id="CertifiedNum">{{data.CertifiedNum}}人</span><br>
	                        <span class="txt">徒孙</span>
	                    </div>
	                </li>
	                <li>
	                    <label>累计奖励</label>
	                    <div class="txt-r"><span class="c_Org" id="RewardAmount">{{data.RewardAmount}}</span> 金</div>
	                </li>
	            </ul>
	        </div>
	        <input type="hidden" id="ShareUrl" />
	        <!--底部广告-->
	        <div class="Promotion-rule mb10">
	            <div class="rulehd"><span>活动规则</span></div>
	            <div class="rulelist">
	                <ul>
	                    <li>1、任务状态变成已完成才算完成一单</li>
	                    <li>2、被邀请人一定是通过邀请人的邀请链接注册会员，邀请人才可以得到相应奖励否则视为无效邀请，不计入邀请记录</li>
	                    <li>3、活动中若发现有买手通过进行作弊手段获得奖励的，将直接封禁其账号，取消一切奖励资格且违规获得的奖励将不予以体现</li>
	                </ul>
	            </div>
	        </div>
	    </div>
	    <div class="null50" >
	        <footer class="ftbtn bt_border">
	            <view class="btn" id="btnShare" @click="goShare" v-if="data.MyInvitationCode" >立即分享</view>
	        </footer>
	    </div>
	</div>
</template>

<script>
	// import NativeShare from '@/utils/NativeShare'
	import {post , goUrl,copy,hostPath,toast} from '@/utils'
	import h5Copy  from '@/utils/junyi-h5-copy';
	export default{
		data(){
			return {
					goUrl,
					userId:'',
					token:'',
					data:{},
					copyLink:hostPath+'#/?InvitationCode=',//分享链接
				}
			},
			onLoad(){
				this.userId = uni.getStorageSync("userId");
				this.token = uni.getStorageSync("token");
				// console.log(this.data)
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
				//分享
				goShare(){
					const res = h5Copy(this.copyLink);
					if(res){
						toast('邀请链接复制成功！去粘贴给好友吧。',true)
					}else{
						toast('复制失败，请重试！')
					}
					// var nativeShare = new NativeShare()
					// // console.log(NativeShare)
					// var shareData = {
					//             title: '11111',
					//             desc: '11111',
					//             // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
					//             link: 'http://localhost:8080/',
					//             icon: 'https://avatar.csdn.net/5/2/E/1_qq175023117.jpg?1539049275',
					//             // 不要过于依赖以下两个回调，很多浏览器是不支持的
					//             success: function() {
					//                 alert('分享成功')
					//             },
					//             fail: function() {
					//                 alert('分享失败')
					//             }
					//         }
					//         nativeShare.setShareData(shareData)
					 
					//         function call(command) {
					//             try {
					//                 nativeShare.call(command)
					//             } catch (err) {
					//                 // 如果不支持，你可以在这里做降级处理
					//                 alert(err.message)
					//             }
					//         }
					 
					//         function setTitle(title) {
					//             nativeShare.setShareData({
					//                 title: title,
					//             })
					//         }
				},
				back(){
					uni.navigateBack({
						delta:1
					})
				},
				init(){
					post('Member/GetMemberByInvite',{
						UserId:  this.userId,
						Token: this.token
					}).then(res => {
						console.log(res)
						this.data=res.obj;
						this.copyLink += res.obj.MyInvitationCode;
					})
				}
			}
	}
</script>

<style lang="scss" scoped>
	
	.link_btn {
	  display: inline-block;
	  height: 35px;
	  line-height: 35px;
	  color: #5c91f1;
	  border: 1px solid #ddd;
	  border-radius: 4px;
	  padding: 0 10px;
	  margin-top: 10px;
	}
	.copybtn {
		display: inline-block;
		color: #4581ec;
		margin-top: 5px;
		margin-left: 10px;
	}
</style>
