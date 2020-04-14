<template>
    <div class="bg_f8f8f8">
            <div class="h45">
                <div class="head bb_border">
                    <a href="javascript:api.closeWin();" class="btn_back"></a>
                    <div class="title center">绑定阿里巴巴账号</div>
                </div>
            </div>
            <div class="main">
                <div class="dd_msgBox bind__msgBox" style="padding:.1rem .12rem;">
                    <p class="title" style="font-size: .15rem;color:#222;">注意事项</p>
                    <p>账号审核时间<span class="color_e40000">（周一至周五09:00-18:00）</span>，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看
                        <view class="color_e40000" @click="goUrl('user/jd_bindexamplespic')">截图示例</view>！</p>
                </div>
                <div class="bindSection">
                    <div class="dd__hd">
                        <h2 class="title">账号信息</h2>
                    </div>
                    <div class="bindForm regLogForm onlyIpt__form" style="padding-top:0;padding-bottom: 0;">
                        <form action="">
                            <div class="weui-cells">
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input" id="accountName" @input="jdName" placeholder="请输入账号" />
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input" id="shouhuoren" @input="shouhuoren" placeholder="收货人姓名" />
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input" id="lianxidianhua" @input="lianxidianhua" placeholder="联系电话" />
                                    </div>
                                </div>
                                <div class="weui-cell selectCity__weui-cell select__weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input"  id="area" @click="openAddres" :value="pickerText" placeholder="请选择城市" />
                                        <span class="icon-arrow icon-arrowRight"></span>
                                    </div>
<!--                                    <input type="hidden" id="provinceCode" readonly="true"/>
                                    <input type="hidden" id="cityCode" readonly="true"/>
                                    <input type="hidden" id="districtCode" readonly="true"/> -->
                                </div>
								<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" ></simple-address>
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input" id="xiangxidizhi" @input="xiangxidizhi" placeholder="请输入详细地址" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="bindSection">
                    <div class="dd__hd">
                        <h2 class="title">账号属性（与实名认证的身份证信息一致）</h2>
                    </div>
                    <div class="bindForm regLogForm onlyIpt__form" style="padding-top:0;padding-bottom: 0;">
                        <form action="">
                            <div class="weui-cells">
                                <div class="weui-cell selectSex__weui-cell select__weui-cell">
                                    <div class="weui-cell__bd">
                                        <select name="" id="sexId" class="weui-input">
                                            <option @click="sex(0)" value="0">请选择性别</option>
                                            <option @click="sex(1)" value="1">男</option>
                                            <option @click="sex(2)" value="2">女</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="weui-cell">
                                    <div class="weui-cell__bd">
                                        <input type="text" class="weui-input" id="nianling" @input="nianling" placeholder="请输入你的年龄" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!--上传图片-->
                <div class="bindSection">
                    <div class="dd__hd">
                        <span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
                        <view @click="goUrl('user/jd_bindexamplespic')" class="lookExamples color_e40000">查看截图示列</view>
                    </div>
                    <ul class="dd_piclist li25">
                        <li>
                            <div class="outside">
                                <div class="img">
                                        <div class="upimg" @click="getpic(0)"><image @longtap="bigImg(pic1)" :src="pic1" class="uploadImg"/></image></div>
                                        <input type="hidden" id="pic0" readonly="true"/>
                                </div>
                                <p class="title">账号用户名</p>
                            </div>
                        </li>
                        <li>
                            <div class="outside">
                                <div class="img">
                                        <div class="upimg" @click="getpic(1)"><image @longtap="bigImg(pic2)" :src="pic2" class="uploadImg"/></image></div>
                                        <input type="hidden" id="pic1" readonly="true"/>
                                </div>
                                <p class="title">账号等级</p>
                            </div>
                        </li>
                        <li>
                            <div class="outside">
                                <div class="img">
                                        <div class="upimg" @click="getpic(2)"><image @longtap="bigImg(pic3)" :src="pic3" class="uploadImg"/></image></div>
                                        <input type="hidden" id="pic2" readonly="true"/>
                                </div>
                                <p class="title">采购名片</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--上传图片  end-->
                <view class="weui-btn weui-btn-active btn-submit" @click="submit" style="margin:.15rem .12rem .2rem;">提交审核</view>
            </div>
    </div>
</template>

<script>
import { pathToBase64, base64ToPath } from '@/utils/image-tools.js'
import {post,goUrl} from '@/utils';
import simpleAddress from '@/components/simple-address/simple-address.nvue'
export default {
    data(){
        return {
			goUrl,
			cityPickerValueDefault: [0, 0, 0],
			accountId:0,
			name:'',
			receiver:'',
			contactNum:'',
			age:'',
			jdvalue:'',
			address:'',
			pickerText:'',
			sexId:0,
			pic1:'',
			pic2:'',
			pic3:'',
			pic4:'',
			ProvinceCode:'',
			CityCode:'',
			DistrictCode:'',
			
			UserCenterImg:'',
			AccountLevelImg:'',
			VerifiedImg: '',
			
        }
    },
	components:{
		simpleAddress
	},
    onLoad(e){
        this.userId = uni.getStorageSync('userId');
        this.token = uni.getStorageSync('token');
		console.log(e)
		this.accountId=e.id?0:e.id
		if(this.accountId){
			this.accountId=e.id
			this.init(this.accountId);
		}

    },
    onShow(){

    },
    methods:{
		init(id){
			post('Member/LoadMemberAccountInfo',{
				UserId: this.userId,
				Token: this.token,
				PlatId: 3, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
				AccountId: id
			}).then(res => {
				console.log(res)
			})
		},
		// 京东用户名
		jdName(e){
			this.name=e.detail.value
		},
		// 收货人
		shouhuoren(e){
			this.receiver=e.detail.value
		},
		// 联系电话
		lianxidianhua(e){
			this.contactNum=e.detail.value
		},
		//详细地址
		xiangxidizhi(e){
			this.address=e.detail.value
		},
		//年龄
		nianling(e){
			this.age=e.detail.value
		},
		//京东值
		xydj(e){
			this.jdvalue=e.detail.value
		},
		//打开地址选择器
		openAddres() {
			this.cityPickerValueDefault = [0,0,0]
			this.$refs.simpleAddress.open();
		},
		//地址选择器确定
		onConfirm(e) {
			let that=this
			this.pickerText = e.label;
			let str= this.pickerText.replace('-',' ')
			str= str.replace('-',' ')
			console.log(this.pickerText)
			post('Area/AreaByCode',{
				AreaText:str
			}).then(res=>{
				console.log(res)
				that.ProvinceCode=res.obj.provinceCode
				that.CityCode=res.obj.cityCode
				that.DistrictCode=res.obj.districtCode
			})
		},
		//性别id
		sex(e){
			this.sexId=e
		},
		//上传图片
		getpic(e){
			console.log(e)
			let type = e
			let imgUrl=''
			let that =this
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album','camera'], //从相册选择
				success: function (res) {
				    // console.log(JSON.stringify(res.tempFilePaths));
					
					
					//转换为base64
					pathToBase64(res.tempFilePaths[0])
					.then(base64 => {
						imgUrl=base64
						console.log(base64)
						if(type==0){
							that.pic1=res.tempFilePaths[0]
							that.UserCenterImg=imgUrl
							// console.log(that.pic1)
						}else if(type==1){
							that.pic2=res.tempFilePaths[0]
							that.AccountLevelImg=imgUrl
						}else if(type==2){
							that.pic3=res.tempFilePaths[0]
							that.VerifiedImg=imgUrl
						}
						// console.log(imgUrl)
					})
					.catch(error => {
						// console.error(error)
					})
					
					// console.log(imgUrl)
				}
			})
			
			
		},
		//长按查看图片
		bigImg(e){
			let urls=[]
			urls.push(e)
			console.log(urls)
			return false
			uni.previewImage({
			    urls: res.tempFilePaths,
			    longPressActions: {
			        itemList: ['发送给朋友', '保存图片', '收藏'],
			        success: function(data) {
			            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
			        },
			        fail: function(err) {
			            console.log(err.errMsg);
			        }
			    }
			});
		},
		//提交审核
		submit(){
			 var reg = /^[0-9]\d*$/;
			if(this.name==''){
				uni.showToast({
					title:'必须填写平台的账号',
					icon:'none'
				})
				return false;
			}else if(this.receiver==''){
				uni.showToast({
					title:'必须填写收货人',
					icon:'none'
				})
				return false;
			}else if(this.contactNum==''){
				uni.showToast({
					title:'必须填写联系电话',
					icon:'none'
				})
				return false;
			}else if(this.pickerText==''){
				uni.showToast({
					title:'必须选择省市区',
					icon:'none'
				})
				return false;
			}else if(this.address==''){
				uni.showToast({
					title:'必须填写收货详细地址',
					icon:'none'
				})
				return false;
			}else if(this.sex==''){
				uni.showToast({
					title:'必须选择性别',
					icon:'none'
				})
				return false;
			}else if(this.age==''){
				uni.showToast({
					title:'必须填写年龄',
					icon:'none'
				})
				return false;
			}else if(!reg.test(this.age)){
				uni.showToast({
					title:'请输入正确的年龄数值',
					icon:'none'
				})
				return false;
			}else if(this.pic1==''){
				uni.showToast({
					title:'必须上传阿里巴巴账户图片',
					icon:'none'
				})
				return false;
			}else if(this.pic2==''){
				uni.showToast({
					title:'必须上传账户等级图片',
					icon:'none'
				})
				return false;
			}else if(this.pic3==''){
				uni.showToast({
					title:'必须上传采购名片图片',
					icon:'none'
				})
				return false;
			}
			post('Member/BindOnAccount',{
				UserId: this.userId,
				Token: this.token,
				PlatId: 4, //平台ID  1淘宝 2天猫 4阿里巴巴 3京东 5拼多多 7蘑菇街 6 美丽说
				// AccountId: this.accountId,
				PlatAccount: this.name, //平台账号√
				ConsigneeName: this.receiver, //收货人√
				ConsigneeCall: this.contactNum, //联系电话√
				ProvinceCode: this.ProvinceCode, //省份code √
				CityCode: this.CityCode, //市区code √
				DistrictCode: this.DistrictCode, //区县code √
				Address: this.address, //详细地址 √
				Gender: this.sex, //男女性别 √
				Age: this.age, //年龄 √

				// TaobaoValue:taoqizhi,//淘气值 √
				// ConsumerCategoryList:'',//购物类目 √
				UserCenterImg: this.UserCenterImg, //账号用户图片base64  √
				AccountLevelImg: this.AccountLevelImg, //账户等级图片base64 √
				VerifiedImg: this.VerifiedImg, //采购名片图片图片base64 √
			}).then(res =>{
				if(res.errcode==0){
					uni.showToast({
						title:res.msg,
						icon:'none',
						success() {
							setTimeout(function(){
								uni.redirectTo({
									url:'./bindlist'
								})
							},1500)
						}
					})
				}
			})
			
		}
	}
}
</script>

<style lang="scss" scoped>
.uploadImg{
		width: 100%;
		height: 100%;
	}
	.color_e40000{display: inline-block;}
</style>