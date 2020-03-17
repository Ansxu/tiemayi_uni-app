<template>
	<div class="bg_img">
	    <div class="h45">
	        <div class="head bb_border">
	            <a href="../../index.html" class="btn_back"></a>
	            <div class="title center">邀请奖励排行榜</div>
	        </div>
	    </div>
	    <div class="main Ranking">
	        <div class="Rankbox">
	            <div class="Rankhd">
	                邀请奖励排行榜
	            </div>
	            <!-- <script id="inviterListTemp" type="text/x-dot-template">
	                {{~it:value:index}}
	                <tr class="bd">
	                    <td class="no no{{=index+1}}"><span>{{=index+1}}</span></td>
	                    <td>{{=value.MobileStr}}</td>
	                    <td>{{=value.InviteesNumber}}</td>
	                    <td>{{=value.RewardCommission}}金</td>
	                </tr>
	                {{~}}
	            </script> -->
	            <div class="table">
	                <table>
	                    <colgroup>
	                        <col style="width:15%">
	                        <col style="width:30%">
	                        <col style="width:25%">
	                        <col style="width:30%">
	                    </colgroup>
	                    <tr class="hd">
	                        <th>排名</th>
	                        <th>名称</th>
	                        <th>邀请人数</th>
	                        <th>奖励</th>
	                    </tr>
	                    <tbody id="inviterList">
							<tr class="bd" v-for="(item,index) in 8" :key="index">
							    <!-- <td class="no no{{index+1}}"><span>{{index+1}}</span></td> -->
								<td class="no" :class="`no{index+1}`"><span>{{index+1}}</span></td>
							    <td>13545676545</td>
							    <td>vvfk345</td>
							    <td>30金</td>
							</tr>
	                    </tbody>
	                </table>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
</script>

<style>
</style>
