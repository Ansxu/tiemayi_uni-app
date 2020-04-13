<template>
	<div class="bg_fff">
		<headers>申诉任务</headers>
		<div class="main">
			<div class="from pd12" style="display:none">
				<div class="from-item mb10 arrow_r" id="select_type">
					<label class="text">申诉类型</label>
					<span style="color:#666;float:right;" class="questiontype_text"></span>
					<!-- <span class="closebtn">×</span>
					<div class="open-typebox">
						<ul v-for="(item,index) in typeText" :key="index">
							<li>{{item.TypeText}}</li>
						</ul>
					</div> -->
				</div>
				<div class="from-item mb20">
					<div class="textarea_box">
						<textarea placeholder="请简要填写申诉说明" id="txtQuestion"></textarea>
					</div>
				</div>
				<div class="piclist Uploadimg mb10">
					<ul class="clear">
						<li>
							<div class="img">
							<div class="upimg" onclick="getpic(this,'questionImgF',10)"><img class="uploadImg" /></div>
							<input type="hidden" id="questionImgF" readonly="true" />
							</div>
						</li>
						<li>
							<div class="img">
							<div class="upimg" onclick="getpic(this,'questionImgS',10)"><img class="uploadImg" /></div>
							<input type="hidden" id="questionImgS" readonly="true" />
							</div>
						</li>
						<li>
							<div class="img">
							<div class="upimg" onclick="getpic(this,'questionImgT',10)"><img class="uploadImg" /></div>
							<input type="hidden" id="questionImgT" readonly="true" />
							</div>
						</li>
					</ul>
				</div>
				<a class="btn_100" onclick="submitAppeal()">提交</a>
			</div>
			<div class="from pd12">
			<div class="">请在下方选择选项并描述你的问题</div>
			<div class="titbox">
				<!-- <div class="IconsCK mr15 fl mt30">
				<input type="checkbox" checked="checked" id='checked1'/><span></span>
				</div> -->
				<checkbox-group @change="check1">
				    <label>
				        <checkbox value="1" :checked="checked1"/>没收到本金
				    </label>
				</checkbox-group>
				<!-- <div class="ml20">没收到本金</div> -->
			</div>
			<div class="flexbox">
				<span>实际付款：</span><input type="text" id="money1" @input="moneyVal1" :value="money1" class="input1" placeholder="请输入实际付款金额">
			</div>
			<div class="titbox">
				<!-- <div class="IconsCK fl mt30">
				<input type="checkbox"  id='checked2'/><span></span>
				</div>
				<div class="ml20">本金有差价（请添加差值）</div> -->
				<checkbox-group @change="check2">
				    <label>
				        <checkbox value="2" :checked="checked2" />本金有差价（请添加差值）
				    </label>
				</checkbox-group>
			</div>
			<div class="flexbox">
				<span>实际付款：</span><input type="text" id="money2" @input="moneyVal2" :value="money2" class="input2" placeholder="请输入实际付款">
			</div>
			<div class="flexbox">
				<span>收到本金</span><input type="text" id="money3" @input="moneyVal3" :value="money3" class="input2" placeholder="请输入收到本金">
			</div>
			<view class="btn_100 mt15" @click="submitAppeal">提交</view>
			</div>
		</div>
	</div>
</template>
<script>
import {post,toast,goUrl,get} from '@/utils';
export default {
  data() {
    return {
        userId:'',
		token:'',
		TaskAcceptNo:'',
		typeText:{},
		money1:'',
		money2:'',
		money3:'',
		txtQuestion:'',
		type:null,
		checked1:false,
		checked2:false
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.TaskAcceptNo = options.TaskAcceptNo||'TB20041114524512842038';
    this.getData();
  },
  onShow() {},
  methods: {
	  getData(){
		  get('Task/GetApplyStatementType').then(res=>{
				console.log(res)
				this.typeText=res.obj
		  })
	  },
	  //type=1 ,实际付款金额
	  moneyVal1(e){
		  this.money1=e.detail .value
	  },
	  //type=2,实际付款金额
	  moneyVal2(e){
		  this.money2=e.detail .value
	  },
	  //收到本金
	  moneyVal3(e){
		  this.money3=e.detail .value
	  },
	  check1(e){
		  console.log(e)
		  this.type=e.detail.value[0]
		  this.checked1=true
		  this.checked2=false
		  this.money2=''
		  this.money3=''
	  },
	  check2(e){
		  console.log(e)
		  this.money1=''
		  this.type=e.detail.value[0]
		  this.checked2=true
		  this.checked1=false
	  },
	  submitAppeal(){
		  if(this.type==1){
			  if(this.money1==''){
				  uni.showToast({
				  	title:'请输入实际付款金额',
					icon:'none'
				  })
			  }else{
				 this.txtQuestion="没收到本金,实际付款"+this. money1
			  }
		  }else{
			  if(this.money2==''){
				  uni.showToast({
				  	title:'请输入实际付款金额',
				  	icon:'none'
				  })
				  return false
			  }
			  if(this.money3==''){
				  uni.showToast({
				  	title:'请输入收到本金',
				  	icon:'none'
				  })
				  return false
			  }
			  this.txtQuestion="本金有差价,实际付款"+this.money2+",收到本金"+this.money3
		  }
		  post('Task/InitiateAppeal',{
			     UserId: this.userId,
			     Token: this.token,
			     TaskAcceptNo: this.TaskAcceptNo,
			     AppealMsg: this.txtQuestion,
			     AppealTypeId: 1,
		  }).then(res => {
			  uni.showToast({
			  	title:res.msg,
				icon:'none',
				success() {
					setTimeout(function(){
						uni.redirectTo({
							url:'./myorderlist?taskType='+res.obj+'&taskStatus='+ 4
						})
					},1500)
				}
			  })
		  })
	  }
  }
}
</script>

<style lang="scss">
	@import '../../css/task.css';
	 .flexbox{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 48upx;
      padding-left: 26upx;
    }
    .flexbox span{
      width: 200upx;
    }
    .ml20{
      margin-left: 24upx;
    }
    .titbox{
      margin: 30upx 0 10upx;
    }
	uni-checkbox:not([disabled]) .uni-checkbox-input:hover{
		border: none;
	}
</style>
