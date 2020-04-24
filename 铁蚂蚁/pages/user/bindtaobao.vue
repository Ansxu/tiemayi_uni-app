<template>
	<div class="bg_f8f8f8">
		<headers>绑定淘宝账号</headers>
		<div class="main">
			<div class="dd_msgBox bind__msgBox" style="padding:10px 12px;">
				<p class="title" style="font-size: 15px;color:#222;">注意事项</p>
				<p>账号审核时间<span class="color_e40000">（周一至周五09:00-18:00）</span>，账号提交后一工作日内完成 审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待， 新手务必查看
					<a class="color_e40000" href="taobao_bindexamplespic.html">截图示例</a>！</p>
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
									<input type="text" class="weui-input" id="taobaoName" v-model.trim="data.PlatAccount" placeholder="请输入淘宝账号" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="shouhuoren" v-model.trim="data.ConsigneeName" placeholder="收货人姓名" />
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="lianxidianhua" v-model.trim="data.ConsigneeCall" placeholder="联系电话" />
								</div>
							</div>
							<div class="weui-cell selectCity__weui-cell select__weui-cell" @click="showAreaSelect">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input"  id="area" disabled value="" v-model.trim="areaText" placeholder="请选择城市"/>
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="xiangxidizhi" v-model.trim="data.Address"  placeholder="请输入详细地址" />
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
						<div class="weui-cells selectCity__weui-cell select__weui-cell">
							<div class="weui-cell" @click="showPicker('Gender')">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="nianling" disabled v-model.trim="data.Gender" placeholder="请选择性别" />
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<input type="number" class="weui-input" id="nianling" v-model.trim="data.Age" placeholder="请输入你的年龄" />
								</div>
							</div>
							
							<div class="weui-cell" @click="showPicker('CreditRating')">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="nianling" disabled v-model.trim="data.CreditRating" placeholder="请选择信誉等级" />
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
							<div class="weui-cell" @click="showPicker('TaobaoValue')">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="nianling" disabled v-model.trim="data.TaobaoValue" placeholder="请选择淘气值" />
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
							<div class="weui-cell" @click="showShoppingCategoryWin=true">
								<div class="weui-cell__bd">
									<input type="text" class="weui-input" id="nianling" disabled v-model.trim="data.ConsumerCategoryList" placeholder="请选择购物类目" />
									<span class="icon-arrow icon-arrowRight"></span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<!--上传图片-->
			<!-- <div class="bindSection">
				<div class="dd__hd">
					<span class="titleMsg">点击上传图片(上传后，长按看大图，点击可更换图片）</span>
					<a href="taobao_bindexamplespic.html" class="lookExamples color_e40000">查看截图示列</a>
				</div>
				<ul class="dd_piclist li25">
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic0',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic0" readonly="true"/>
							</div>
							<p class="title">信誉等级</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic1',10)"><img src="" class="uploadImg"/></div>
                                <input type="hidden" id="pic1" readonly="true"/>
							</div>
							<p class="title">淘气值</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic2',10)"><img src="" class="uploadImg"/></div>
                                <input type="hidden" id="pic2" readonly="true"/>
							</div>
							<p class="title">实名认证</p>
						</div>
					</li>
					<li>
						<div class="outside">
							<div class="img">
								<div class="upimg" onclick="getpic(this,'pic3',10)"><img src="" class="uploadImg"/></div>
                               <input type="hidden" id="pic3" readonly="true"/>
							</div>
							<p class="title">花呗</p>
						</div>
					</li>
				</ul>
			</div> -->
			<!--上传图片  end-->
			<div class="dd__hd" style="padding-top:0;">
				<p class="titleMsg color_e40000">花呗：选填，开通花呗账号接单可获得更多佣金</p>
			</div>
			<div @click="submit" class="weui-btn weui-btn-active btn-submit" style="margin:15px 12px 20px;">提交审核</div>
		</div>

		<!--请选择购物类目的弹窗-->
		<div class="shade" v-show="showShoppingCategoryWin">
			<div class="shade__content">
				<div class="shade-item selectBuyTypeShade centerShadeItem">
					<div class="shade__hd">
						<h2 class="shade__title">请选择经常购买的3-5个购物类目</h2>
					</div>
					<div class="shade__bd">
						<ul class="dd_BtnsList li33" id="shoppingcategory">
		                  	<li v-for="(item,index) in ShoppingCategory" :key="index" @click="item.status = !item.status">
								<div class="outside">
									<div class="weui-btn" :class="{'active':item.status}">{{item.Name}}</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="shade__ft">
						<div class="dd_Btns">
							<div class="weui-btn weui-btn-mini btn-cancle" @click="showShoppingCategoryWin=false">取消</div>
							<div class="weui-btn weui-btn-mini btn-sure weui-btn-active" @click="confirmShoppingCategory">确定</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <!-- 地区联动 -->
        <w-picker 
			mode="linkage"
			:level="3"
			@confirm="onAreaConfirm"
			ref="linkage"
            :defaultVal="defaultArea"
            :linkList="areaList"
            themeColor="#5c91f0"
            v-if="areaList.length>0"
            >
        </w-picker>
        <!-- 单项联动选择 -->
        <w-picker 
			mode="selector"
			:level="1"
			@confirm="onConfirm"
			ref="pickerList"
            :defaultVal="defaultPicker"
            :selectList="pickerList"
            themeColor="#5c91f0"
            >
        </w-picker>
	</div>
</template>

<script>
import {get,post,toast} from '@/utils';
import GetAreaList from '@/utils/areaList';
import wPicker from "@/components/w-picker/w-picker.vue";
export default {
    components:{
        wPicker
    },
    data(){
        return {
			userId:'',
			token:'',
			data:{
				AccountId: '',
				PlatAccount: '', //平台账号√
				ConsigneeName: '', //收货人√
				ConsigneeCall: '', //联系电话√
				ProvinceCode: '', //省份code √
				CityCode: '', //市区code √
				DistrictCode: '', //区县code √
				Address: '', //详细地址 √
				Gender: '', //男女性别 √
				Age: '', //年龄 √
				CreditRating: '', //信用等级 √ 可为空
				TaobaoValue: '', //淘气值 √
				ConsumerCategoryList: '', //购物类目 √ //购物类目Id集合字符串(例：”1,2,3”)，最多选择3个
				ConsumerCategoryIdList:[],//购物类目的id
				// CreditRatingImg: '', //信誉等级图片base64  √
				// TaobaoValueImg: '', //淘气值图片base64 √
				// VerifiedImg: '', //实名认证图片base64 √
				// BorrowingImg: '' //花呗图片base64 √
			},
			areaText:'',//地区显示的值
			areaList:[],//地区列表
			defaultArea:['广东省','深圳市','龙华新区'],//默认地址
			
			pickerList:[{label:'',value:''}],//选项列表
			defaultPicker:'',//默认选项
			// 性别
			Gender:{
				array:[{label:'男'},{label:'女'}],
				default:'男',
			},
			// 信誉
			CreditRating:{
				array:[
					{label:'1心'},
					{label:'2心'},
					{label:'3心'},
					{label:'4心'},
					{label:'5心'},
					{label:'1钻'},
					{label:'2钻'},
					{label:'3钻'},
					{label:'4钻'},
					{label:'5钻'},
					{label:'皇冠及以上'}
				],
				default:'1心',
			},
			//淘气值 √
			TaobaoValue:{
				array:[
					{label:'1000以下'},
					{label:'1000-1500'},
					{label:'1500-2000'},
					{label:'2000以上'}
				],
				default:'1000以下',
			},
			nowSelectVal:'',//现在正在选择的值

			ShoppingCategory:[],//购物类目
			showShoppingCategoryWin:false,//购物类目
        }
    },
    onLoad(options){
		this.data.AccountId = options.id;
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.getAreaList();//获取地址列表
		this.getData();//获取已存在数据
		this.getShoppingCategory();//获取购物类目
    },
    onShow(){

    },
    methods:{
        // 获取地区列表
        getAreaList(){
            GetAreaList().then(res=>{
                this.areaList = res;
            });
        },
		// 如果已绑定查询绑定信息
		getData(){
			if(!this.data.AccountId) return;
			post('Member/LoadMemberAccountInfo',{
                UserId: this.userId,
                Token: this.token,
                PlatId: 1, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                AccountId: this.data.AccountId
			}).then(res=>{
				const data = res.obj;
				Object.keys(data).map(item=>{
					this.data[item] = data[item];
				})
			})
		},
		//获取购物类目
		getShoppingCategory(){
			get('Member/GetALLShoppingCategory').then(res=>{
				const data = res.obj;
				data.map(item=>{
					item.status = false;
				})
				this.ShoppingCategory=data;
			})
		},
        // 显示城市选择
        showAreaSelect(){
            // if(this.data.IsAUT===1){
            //     return;
            // } 
            if(this.areaList.length<1){
                toast('获取地区失败，请重试！')
                return;
            } 
            this.$refs['linkage'].show()
        },
        // 确认地区选择
        onAreaConfirm(e){
			this.defaultArea = e.checkArr;
			const data = this.data;
			data.ProvinceCode = e.checkValue[0];
			data.CityCode = e.checkValue[1];
			e.checkValue[2]&&(data.DistrictCode = e.checkValue[2]);
            this.areaText = e.checkArr.join(' ');
		},
		// 显示联动选择
		showPicker(str){
			this.nowSelectVal = str;
			this.pickerList = this[str].array;
			this.defaultPicker = this[str].default;
            this.$refs['pickerList'].show()
		},
        // 单项联动选择
        onConfirm(e){
            this.data[this.nowSelectVal] = e.result;
            this[this.nowSelectVal].default = e.result;
		},
		// 完成购物类目选择
		confirmShoppingCategory(){
			let arr =[];
			let arrId =[];
			this.ShoppingCategory.map(item=>{
				if(item.status){
					arr.push(item.Name);
					arrId.push(item.Id);
				}
			})
			if(arr.length<5){
				toast('购物类目不能小于5个');return;
			}
			if(arr.length>8){
				toast('购物类目不能大于8个');return;
			}
			this.data.ConsumerCategoryIdList = arrId.join(',');
			this.data.ConsumerCategoryList = arr.join(',');
			this.showShoppingCategoryWin = false;
		},
		submit(){
			const tips = this.check();
			if(tips){
				toast(tips);return;
			}
			const data = this.data;
			post('Member/BindOnAccount',{
                    UserId: this.userId,
                    Token: this.token,
                    PlatId: 1, //平台ID  1淘宝 2天猫 3京东 5拼多多 7蘑菇街 6 美丽说
                    AccountId: data.AccountId,
                    PlatAccount: data.PlatAccount, //平台账号√
                    ConsigneeName: data.ConsigneeName, //收货人√
                    ConsigneeCall: data.ConsigneeCall, //联系电话√
                    ProvinceCode: data.ProvinceCode, //省份code √
                    CityCode: data.CityCode, //市区code √
                    DistrictCode: data.DistrictCode, //区县code √
                    Address: data.Address, //详细地址 √
                    Gender: data.Gender, //男女性别 √
                    Age: data.Age, //年龄 √
                    CreditRating: data.CreditRating, //信用等级 √ 可为空
                    TaobaoValue: data.TaobaoValue, //淘气值 √
                    ConsumerCategoryList: data.ConsumerCategoryIdList, //购物类目 √ //购物类目Id集合字符串(例：”1,2,3”)，最多选择3个
                    // CreditRatingImg: xinyudengjiImg, //信誉等级图片base64  √
                    // TaobaoValueImg: taoqizhiImg, //淘气值图片base64 √
                    // VerifiedImg: shimingrenzhengImg, //实名认证图片base64 √
                    // BorrowingImg: huabeiIMg //花呗图片base64 √
			}).then(res=>{
				toast(res.msg,true);
				setTimeout(()=>{
					uni.navigateBack();
				},1500)
			})

		},
		check(){
			const data = this.data;
			if(!data.PlatAccount) return '请输入淘宝账号！';
			if(!data.ConsigneeName) return '请输入收货人姓名！';
			if(!data.ConsigneeCall) return '请输入联系电话！';
			if(!data.PlatAccount) return '请选择城市！';
			if(!data.Address) return '请输入详细地址！';
			if(!data.Gender) return '请选择性别！';
			if(!data.Age) return '请输入你的年龄！';
			if(!data.CreditRating) return '请选择信誉等级！';
			if(!data.TaobaoValue) return '请选择淘气值！';
			if(!data.ConsumerCategoryList) return '请选择购物类目！';
			return false;
		}
    }
}
</script>

<style lang="scss" scoped>
	.main{
		padding:10px;
	}
	.shade {
		display:block;
		.shade-item{
			display:block;
		}
	}
	.active{
		background: #5c91f0;
		color:#fff;
	}
</style>