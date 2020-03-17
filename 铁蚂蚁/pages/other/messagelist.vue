<template>
	<div>
		<div class="h45">
			<div class="head bb_border">
				<a href="../../index.html" class="btn_back"></a>
				<div class="title center">系统消息</div>
			</div>
		</div>
		<div class="main mt10">
			<div class="tabNav tabList">
				<ul class="clear">
					<li class="active" onclick="GetMessageList(0,this)">系统消息</li>
					<li onclick="GetMessageList(1,this)">用户消息</li>
				</ul>
			</div>
	     <!--  循环 -->
	      <!-- <script id="messageListTemp" type="text/x-dot-template">
	          {{~it:value:index}}
				<li class="box">
	              <div class="time"><span>{{=getDateText(value.PubTime).Format("yyyy-MM-dd hh:mm")}}</span></div>
	              <div class="messagecon">
	                <div class="title text">
										<span>
										{{? value.IsRead === 0}}
											<i class="icon"></i>
										{{??}}
											<i class=""></i>
										{{?}}
										{{=value.Title}}
										</span>
									</div>
	                <div class="desc">
	                  {{=value.Memo}}
	                </div>
	              </div>
	              <div class="box_ft"><a class="link_btn arrow_r" >查看详情</a></div>
				 <div class="messageId" style="display:none">{{=value.Id}}</div>
	           </li>
	          {{~}}
	      </script> -->
			<div class="messageList">
				<ul>
					<li class="box" v-for="(item,index) in 8" :key="index">
					   <div class="time"><span>2020-03-22</span></div>
					   <div class="messagecon">
					     <div class="title text">
							<span>
								<i class="icon" v-if="item.isRed"></i>
								<i class=""></i>
							这个是标题
							</span>
						</div>
					     <div class="desc">
					       这是内容哈哈哈 哈哈哈哈哈哈哈哈哈哈哈哈哈
					     </div>
					   </div>
					   <div class="box_ft"><a class="link_btn arrow_r" >查看详情</a></div>
					   <div class="messageId" style="display:none">233</div>
					</li>
				</ul>
			</div>
				<!--暂无消息时显示-->
			<div class="empty" style="display: none;">
				<i class="icon icon_message"></i>
				<p>暂时没有消息哦！</p>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	@import '../../css/style_other.css';
	@import '../../css/task.css'
</style>
