<template>
	<div class="bg_fff">
		<headers>申诉任务</headers>
		<div class="main">
			<div class="from pd12" style="display:none">
				<div class="from-item mb10 arrow_r" id="select_type">
					<label class="text">申诉类型</label>
					<span style="color:#666;float:right;" class="questiontype_text"></span>
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
				<div class="IconsCK mr15 fl mt30">
				<input type="checkbox" checked="checked" id='checked1'/><span></span>
				</div>
				<div class="ml20">没收到本金</div>
			</div>
			<div class="flexbox">
				<span>实际付款：</span><input type="text" id="money1" value="" class="input1" placeholder="请输入实际付款金额">
			</div>
			<div class="titbox">
				<div class="IconsCK fl mt30">
				<input type="checkbox"  id='checked2'/><span></span>
				</div>
				<div class="ml20">本金有差价（请添加差值）</div>
			</div>
			<div class="flexbox">
				<span>实际付款：</span><input type="text" id="money2" value="" class="input2" placeholder="请输入实际付款">
			</div>
			<div class="flexbox">
				<span>收到本金</span><input type="text" id="money3" value="" class="input2" placeholder="请输入收到本金">
			</div>
			<a class="btn_100 mt15" onclick="submitAppeal()">提交</a>
			</div>
		</div>
	</div>
</template>
<script>
import {post,toast,goUrl} from '@/utils';
import h5Copy  from '@/utils/junyi-h5-copy';
export default {
  data() {
    return {
        userId:'',
		token:'',
		TaskAcceptNo:'',
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.TaskAcceptNo = options.TaskAcceptNo||'TB20040911452552195668';
    this.getData();
  },
  onShow() {},
  methods: {
	  getData(){
		  post('Task/GetMyOrderCount',{
				UserId: this.userId,
				Token: this.token
		  }).then(res=>{

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
      height: .48rem;
      padding-left: .26rem;
    }
    .flexbox span{
      width: 1rem;
    }
    .ml20{
      margin-left: .24rem;
    }
    .titbox{
      margin: .3rem 0 .1rem;
    }
</style>
