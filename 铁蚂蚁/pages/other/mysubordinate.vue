<template>
	<div class="bg_gray">
		<div class="h45">
	        <div class="head bb_border">
	            <a href="javascript:api.closeWin();" class="btn_back"></a>
	            <div class="title center">我的推广</div>
	        </div>
	    </div>
	    <div class="main app_tg">
	        <div class="tab-hd tabList">
	            <ul class="li50 clear">
	                <li class="active">全部</li>
	                <li>已认证</li>
	            </ul>
	        </div>
	        <!-- <script id="subordinateListTemp" type="text/x-dot-template">
	            {{~it:value:index}}
	            <tr>
	                <td><p style="color:#0094ff;">{{=value.UserRName}}</p><p>{{=value.Mobile}}</p></td>
	                <td>{{=value.Income}} 金</td>
	                <td>{{=getDateText(value.CreateTime).Format("yyyy-MM-dd")}}</td>
	            </tr>
	            {{~}}
	        </script> -->
	        <div class="tab-bd">
	            <div class="table">
	                <table>
	                    <tr>
	                        <th>手机号</th>
	                        <th>推广收益(金)</th>
	                        <th>注册时间</th>
	                    </tr>
	                    <tbody id="subordinateList">
							<tr v-for="(item,index) in 5" :key="index">
								<td><p style="color:#0094ff;">张三</p><p>13545676545</p></td>
								<td>10 金</td>
								<td>2019-03-23</td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	            <!--暂无消息时显示-->
	            <div class="not_subordinate" style="display: none;">
	                <i class="icon icon_subordinate"></i>
	                <p>您还没有推荐下级哦！快去推荐好友一起接单完成任务</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
</script>

<style scoped>
	.app_tg .table tr{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
