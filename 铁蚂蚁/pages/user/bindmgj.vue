<template>
    <div class="bg_f8f8f8">
		<div class="h45">
			<div class="head bb_border">
				<a href="javascript:api.closeWin();" class="btn_back"></a>
				<div class="title center">绑定蘑菇街账号</div>
			</div>
		</div>
		<div class="main">
			<div class="dd_msgBox bind__msgBox" style="padding:.1rem .12rem;">
				<p class="title" style="font-size: .15rem;color:#222;">注意事项</p>
				<p class="color_e40000">1、请输入蘑菇街用户名</p>
				<p>2、请确保收货地址和收货联系人真实具体，并保证和美丽说上下单的收货地址信息一致</p>
				<p>3、请确认多个美丽说号之间使用不同的收货信息（收货姓名，地址和电话不同）</p>
				<p>4、账号审核人工进行，正常一个工作日内完成，只有审核通过的买号才能接受任务</p>
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
									<input type="text" class="weui-input" id="mgjName" @input="jdName" placeholder="请输入蘑菇街账号" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="shouhuoren" @input="shouhuoren" placeholder="收货人姓名" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="lianxidianhua" @input="lianxidianhua" placeholder="收货人电话" />
								</div>
							</div>
							<div class="weui-cell selectCity__weui-cell select__weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input"  id="area"  :value="pickerText" placeholder="请选择城市" @click="openAddres"/>
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
								<!-- <input type="hidden" id="provinceCode" readonly="true"/>
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

			<!--上传图片-->
			<div class="bindSection">
				<div class="dd__hd">
					<span class="titleMsg">点击上传图片(再次点击可更换图片）</span>
					<view @click="goUrl('user/jd_bindexamplespic')" class="lookExamples color_e40000">查看截图示列</view>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg"  @click="getpic(0)"><image @longtap="bigImg(pic1)":src="pic1" class="uploadImg"/></image></div>
                               <input type="hidden" id="pic0" readonly="true"/>
							</div>
							<p class="title">我的页面</p>
						</div>
					</li>

				</ul>
			</div>
			<!--上传图片  end-->
			<div class="dd__hd" style="padding-top:0;">
				<p class="titleMsg color_e40000">未通过审核的账号信息，可以直接修改提交</p>
			</div>
			<view href="javascript:;" class="weui-btn weui-btn-active btn-submit" @click="submit" style="margin:.15rem .12rem .2rem;">提交审核</view>
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
			ProvinceCode:'',
			CityCode:'',
			DistrictCode:'',
			UserInfoImg:''
			
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
				console.log(that.ProvinceCode,that.CityCode,that.DistrictCode)
			})
		},
		//性别id
		sex(e){
			this.sexId=e
		},
		//上传图片
		getpic(e){
			// console.log(e)
			// let type = e
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
						that.UserInfoImg=imgUrl
						console.log(imgUrl)
					
					})
					.catch(error => {
						// console.error(error)
					})
					that.pic1=res.tempFilePaths[0]
					// console.log(that.UserInfoImg)
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
			}
			else if(this.pic1==''){
				uni.showToast({
					title:'必须上传我的页面',
					icon:'none'
				})
				return false;
			}
			post('Member/BindOnAccount',{
				UserId: this.userId,
				Token: this.token,
				PlatId: 7, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
				AccountId: this.accountId,
				PlatAccount: this.name, //平台账号√
				ConsigneeName: this.receiver, //收货人√
				ConsigneeCall: this.contactNum, //联系电话√
				ProvinceCode: this.ProvinceCode, //省份code √
				CityCode: this.CityCode, //市区code √
				DistrictCode: this.DistrictCode, //区县code √
				Address: this.address, //详细地址 √
				// TaobaoValue:taoqizhi,//淘气值 √
				// ConsumerCategoryList:'',//购物类目 √
				UserInfoImg: this.UserInfoImg, //蘑菇街账户截图图片base64  √
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