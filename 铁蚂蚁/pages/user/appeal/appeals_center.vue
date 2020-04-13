<template>
    <div class="bg_gray">
        <!-- <div class="h45">
            <div class="head bb_border">
                <a href="../member.html" class="btn_back"></a>
                <div class="title center">申诉中心</div>
            </div>
        </div> -->
		<headers>申诉中心</headers>
        <div class="main mt10">
            <div class="appealsCenter">

                <div class="tabnav mb10">
                    <ul class="li50 clear" id="appeals_ul">
                        <li @click="gettab(0)" :class="show==true? 'active':''" >我收到的申诉</li>
                        <li @click="gettab(1)" :class="!show==true? 'active':''" >我发起的申诉</li>
                    </ul>
                </div>
                <!-- <script id="gradeListTemp" type="text/x-dot-template">
                    {{~it:value:index}}
                    <li onclick="appealInfo({{=value.Id}})">
                        <div class="box">
                            <div class="title">
                                <p class="text">【{{=value.QuestionTypeText}}】{{=value.Question}}</p><a href="javascript:;" class="link_btn">{{=value.StatusText}}</a>
                            </div>
                            <div class="info">
                                <span class="shopid">申诉ID：{{=value.Id}}</span>
                                <span class="time">{{=value.CreateTime}}</span>
                            </div>
                        </div>
                    </li>
                    {{~}}
                </script> -->
                <div class="tabcon bg_fff">
                    <ul class="appealslist" id="appealItems" v-for="(item,index) in data">
						<li @click="appealInfo(item.Id)">
						    <div class="box">
						        <div class="title">
						            <p class="text">【{{item.QuestionTypeText}}】{{item.Question}}</p>
									<a href="javascript:;" class="link_btn">{{item.StatusText}}</a>
									<a v-if="num==1&&item.Status==0" class="link_btn" style="padding: 0 8px;" @click.stop="cexiao(item.Id)">撤销</a>
						        </div>
						        <div class="info">
						            <span class="shopid">申诉ID：{{item.Id}}</span>
						            <span class="time">{{item.CreateTime}}</span>
						        </div>
						    </div>
						</li>
                    </ul>
                </div>
				<view class="mark" v-if="mark">
					<view class="tipBox">
						<view class="text">
							请输入撤销原因
						</view>
						<input type="text" @input="cexiaoTx" maxlength="-1">
						<view class="tipBtn">
							<view class="y"  @click="yes">确定</view>
							<view @click="choose">取消</view>
						</view>
					</view>
				</view>
            </div>
        </div>
    </div>
</template>

<script>
import {post} from '@/utils';
export default {
    data(){
        return {
			userId:'',
			token:'',
			pageNo:1,
			pageSize:10,
			data:'',
			show:true,
			num:0,
			mark:false,
			id:'',
			cexiaoVal:''
        }
    },
    onLoad(){
        this.userId=uni.getStorageSync('userId');
        this.token=uni.getStorageSync('token');
		this.init()
    },
    onShow(){
        this.userId=uni.getStorageSync('userId');
        this.token=uni.getStorageSync('token');
    },
	onReachBottom: function() {
		this.pageNo++
		this.init(this.num) 
	},
    methods:{
		init(num){
			let a =num
			let that=this
			post('Appeal/GetAppealListPage',{
				UserId: this.userId,
				Token: this.token,
				Page: this.pageNo, //当前页数
				PageSize: this.pageSize, //每页显示数量   是否必填：N
				Complainant: a, //申诉方 0-申诉我的 1-我发起的申诉   默认进来加载 【我收到的申诉】
			}).then(res => {
				let data=res.obj.AppealList
				// this.data=data
				// console.log(this.data)
				if(that.pageNo>1){
					if(data.length==0){
						// console.log(1231321)
						uni.showToast({
							title:'全部加载完成',
							icon:'none'
						})
						return
					}else{
					that.data=that.data.concat(data)
					}
				}else if(that.pageNo==1){
					that.data=data
				}
			})
		},
		appealInfo(id){
			console.log(id)
			uni.navigateTo({
				url:'./appeals_detail?AppealId='+id
			})
		},
		//tab切换
		gettab(index){
			console.log(index)
			this.num=index
			this.init(index)
			if(index==0){
				this.show=true
			}else{
				this.show=false
			}
		},
		cexiao(id){
			this.mark=true
			this.id=id
		},
		cexiaoTx(e){
			// console.log(e.detail.value)
			this.cexiaoVal=e.detail.value
		},
		yes(){
			let that=this
			if(this.cexiaoVal==""){
				uni.showToast({
					title:'请输入撤销原因',
					icon:'none'
				})
			}else{
			post('Appeal/RevokeAppeal',{
				 UserId: this.userId,
				 Token: this.token,
				 AppealId: this.id,
				 ReplyContent: this.cexiaoVal, //册小原因
			}).then(res =>{
					console.log(res)
					uni.showToast({
						title:res.msg,
						success() {
							that.mark=false
							that.init(this.num) 
						}
					})
					
			}).catch(err =>{
				console.log(err)
			})
			}
		},
		choose(){
			this.mark=false
		}
	}
}
</script>

<style lang="scss" scoped>
    @import url('../../../css/task_0920.css');
	.mark{
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.2);
		width: 100vw;
		height: 100vh;
		// position: relative;
		.tipBox{
			position: absolute;
			left: 10vw;
			top: 30vh;
			background-color: #fff;
			width: 80vw;
			height: 20vh;
			.text{
				font-size: 15px;
				text-align: center;
				margin-top: 3%;
			}
			input{
				text-align: center;
				width: 90%;
				border: solid #aaa 1px;
				margin: 3% 5% 10% 5%;
			}
			.tipBtn{
				background-color: #BBB;
				height: 45px;
				display: flex;
				view{
					border-top:1px solid #ACACB4;
					font-size: 15px;
					color: #007AFF;
					flex: 1;
					justify-content: center;
					align-items: center;
					text-align: center;
					line-height: 45px;
				}
				.y{
					border-right: 1px solid #aaa;
				}
			}
		}
	}
</style>