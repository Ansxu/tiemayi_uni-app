<template>
    <div class="bg_f8f8f8">
        <div class="h45">
            <div class="head bb_border">
                <a href="javascript:history.go(-1);" class="btn_back"></a>
                <div class="title center">绑定银行账号</div>
            </div>
        </div>
        <div class="main">
            <div class="dd__hd weui-cell">
                <div class="weui-cell__hd"><img src="/static/image/icons/d_msg1.png" alt="" class="msgIcon"></div>
                <div class="weui-cell__bd">
                    <p class="titleMsg">姓名必须和身份证中的一样，务必保证银行卡信息正确，否则无法退款</p>
                    <p style="color:red;display:none;" id="isbandtext">修改银行卡资料请联系我们微信客服：</p>
                </div>
            </div>
            <div class="bindForm regLogForm onlyIpt__form" style="padding-top:.1rem;">
                <div class="weui-cells">
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input type="text" v-model.trim="data.BankCardName" :disabled="data.IsBindBank===1" class="weui-input" id="BankCardName" placeholder="请输入持卡人姓名">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input type="text" class="weui-input"  v-model.trim="data.BankCardNo" id="BankCardNo" placeholder="请输入卡号">
                        </div>
                    </div>
                    <!-- <div class="weui-cell selectCity__weui-cell select__weui-cell" @click="showArea">
                        <div class="weui-cell__bd">
                            <input type="text" class="weui-input" v-model="data.BankRegionText" disabled  id="area"  value="" placeholder="请选择开户银行所在地区" />
                            <span class="icon-arrow icon-arrowRight"></span>
                        </div>
                    </div>

                    <div class="weui-cell">
                        <div class="weui-cell__bd">
                            <input type="text" class="weui-input" v-model.trim="data.BankAddress" :disabled="data.IsBindBank===1" id="BankAddress" placeholder="请输入开户行详细地址">
                        </div>
                    </div> -->
                    <div class="weui-cell" id="showSelectBankNamePage" @click="onShowBankList">
                        <div class="weui-cell__bd">
                            <input type="text" class="weui-input" v-model.trim="data.BankName" disabled id="BankName" placeholder="请选择开户银行">
                        </div>
                    </div>
                </div>
                <div @click="submit" v-if="data.IsBindBank!==1" class="weui-btn weui-btn-active btn-submit" style="margin-top:.2rem;">提交</div>
            </div>
        </div>
        <!--弹窗-->
        <!--选择银行弹窗-->
        <div class="defaultPage allScreenPage selectBankNamePage" v-show="showBankList">
            <div class="h45">
                <div class="head bb_border">
                    <div class="btn_back" @click="showBankList=false"></div>
                    <div class="title center">选择银行名称</div>
                </div>
            </div>
            <div class="main">
                <div class="bankListBox">
                    <div class="dd__hd">
                        <p class="title">推荐银行</p>
                    </div>
                    <div class="weui-cells bankList__weui-cells" id="banklist">
                        <div class="weui-cell" v-for="(item,index) in bankList" :key="index" @click="confirmBank(item)">
                            <div class="weui-cell__hd">
                                <img :src="item.BankLogo" alt="" class="icon-navImg" />
                            </div>
                            <div class="weui-cell__bd">
                                <p class="name">{{item.BankName}}</p>
                            </div>
                            <div class="weui-cell__ft">
                                <span class="icon-gou"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 地区联动 -->
        <w-picker 
			mode="linkage"
			:level="3"
			@confirm="onConfirm"
			ref="linkage"
            :defaultVal="defaultArea"
            :linkList="areaList"
            themeColor="#5c91f0"
            v-if="areaList.length>0"
            >
        </w-picker>
    </div>
</template>

<script>
import {post,get,toast} from '@/utils';
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
                IsBindBank:1,
                BankCardName:'', //绑定的银行卡用户名
                BankCardNo:'', //银行卡卡号
                BankName:'', //银行卡对应的银行名称
                BankProvince:'', //银行所属省市
                BankCity:'', //银行所属城市
                BankArea:'', //银行所属地区
                BankAddress:'', //详细地址
                BankRegionText:'', //银行所属省市城市地区文本
            },
            BankName:'',//银行名称
            areaList:[],//动态地区列表
            defaultArea:['广东省','深圳市','龙华新区'],//默认地址
            bankList:[],//银行卡列表
            showBankList:false,
        }
    },
    onLoad(){
		this.userId = uni.getStorageSync('userId');
		this.token = uni.getStorageSync('token');
		this.getData();
		this.getBankList();
		this.getAreaList();
    },
    onShow(){

    },
    methods:{
		getData(){
			post('Member/GetUserBankInfo',{
                UserId: this.userId,
                Token: this.token
			}).then(res=>{
                const data = res.obj;
                if(data.BankRegionText){
                    this.defaultArea = data.BankRegionText.split(' ');
                }
                this.data = data;
			})
        },
        getBankList(){
            get('Help/GetAllBank').then(res=>{
                this.bankList = res.obj.BankList;
            })
        },
        // 获取地区列表
        getAreaList(){
            GetAreaList().then(res=>{
                this.areaList = res;
            });
        },
        // 显示城市选择
        showArea(){
            // if(this.data.IsBindBank===1){
            //     return;
            // } 
            if(this.areaList.length<1){
                toast('获取地区失败，请重试！')
                return;
            } 
            this.$refs['linkage'].show()
        },
        // 确认地区选择
        onConfirm(e){
            this.defaultArea = e.checkArr;
            this.data.BankRegionText = e.checkArr.join(' ');
        },
        // 显示银行列表
        onShowBankList(){
            if(this.data.IsBindBank===1) return;
            this.showBankList= true;
        },
        // 确认选择银行
        confirmBank(item){
            this.data.BankName = item.BankName;
            this.showBankList= false;
        },
        // 提交、
        submit(){
            const tips = this.check();
            if(tips){toast(tips); return;}
            const data = this.data;
            let provinceCode='';
            let cityCode='';
            let districtCode='';
            this.areaList.map(province=>{
                if(province.label===this.defaultArea[0]){
                    provinceCode= province.value;
                    province.children.map(city=>{
                        if(city.label===this.defaultArea[1]){
                            cityCode = city.value;
                            city.children.map(district=>{
                                if(this.defaultArea[2]&&district.label===this.defaultArea[2]){
                                    districtCode = district.value;
                                }
                            })
                        }
                    })
                }
            })
			post('Member/BindUserBank',{
                UserId: this.userId,
                Token: this.token,
                ProvinceCode: provinceCode,// 省
                CityCode: cityCode,// 市
                DistrictCode: districtCode,// 区
                BankCardName: data.BankCardName, //持卡人姓名
                BankAddress: data.BankAddress, //开卡行银行地址 ; 深圳龙华建设银行支行
                BankCardNo: data.BankCardNo, //银行卡号
                BankName: data.BankName, //银行名称； 建设银行，农业银行 ....
			}).then(res=>{
                toast('提交成功，待管理员审核！')
                setTimeout(()=>{
                    uni.navigateBack();
                },1500)
			})
        },
        check(){
            const data = this.data;
            if(!data.BankCardName)return '请输入持卡人姓名！';
            if(!data.BankCardNo)return '请输入银行卡号！';
            if(data.BankCardNo.length<6)return '请输入正确的银行卡号！';
            if(!data.BankName)return '请选择银行名称！';
            // if(!data.BankAddress)return '请输入银行详细地址！';
            // if(this.defaultArea.length<1)return '请选择地区！';
            return false;
        }
    }
}
</script>


<style lang="scss" scoped>
</style>