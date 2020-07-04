<template>
	<div class="bg_fff">
		<div class="h45">
			<div class="head bb_border">
				<p @click="back" class="btn_back"></p>
				<div class="title center">操作任务</div>
				<p href="#" class="icon_r txt">佣金 <span style="color: #ee7818;" id="taskCommission">{{data.Commission}}金</span></p>
			</div>
		</div>
		<div class="main mt10">
			<div class="order-detail" id="taskInfo">
				<div class="topInfo">
					<div class="title"><span>店铺名称：{{data.ShopName}}</span></div>
					<div class="g-name">
						<span>目标商品</span>
						<span class="fr" v-if="data.TaskType==1">垫付总金额：<em class="c_Org">{{data.Amount}}元</em></span>
					</div>
					<div class="dl clear">
						<div class="img fl porelative"><img :src="data.ProductImg">
						<img class="maskimg maskpic" src="/static/image/icons/maskBg.png" /></div>
						<div class="box_r">
							<p class="text">{{data.ProductName}}</p>
							<p class="text">单件商品单价：<span class="c_Org">{{data.ProductPrice}}元</span></p>
							<p class="text">单件商品展示单价：<span class="c_Org">{{data.ProductPublicPrice}}元</span></p>
							<block v-if="data.TaskType==1">
								<p class="text" v-if="data.TaskType==1">件数：{{data.ProductNum}}</p>
								<p class="text" v-if="data.ProductSpec">下单规格尺寸：{{data.ProductSpec}}</p>
								<p class="text c_Org">{{data.EvaluationTitle+(data.IsCollectionShop==1||data.IsCollectionProduct==1?"+收藏":"")+(data.IsAddCart==1?"+加购物车":"")}}</p>
							</block>
							<p class="text c_Org" v-if="data.TaskType==2">普通浏览任务{{(data.IsCollectionShop==1||data.IsCollectionProduct==1?"+收藏":"")+(data.IsAddCart==1?"+加购物车":"")}}</p>
						</div>
						<div class="img fr presale-img" style="display:none"  v-if="data.IsPresaleTask==1">
						<img src="/static/image/nav/presaletask.png" />
						</div>
					</div>
					<block v-if="(data.TaskType==1&&(data.ProductName1||data.ProductName2))">
						<block v-if="data.ProductName1">
						<div class="g-name"><span>附加商品1</span></div>
						<div class="dl clear">
							<div class="img fl"><img :src="data.ProductImg1"></div>
							<div class="box_r">
								<p class="text">{{data.ProductName1}}</p>
								<p class="text">单件商品单价：<span class="c_Org">{{data.ProductPrice1}}元</span></p>
								<p class="text">单件商品展示单价：<span class="c_Org">{{data.ProductPublicPrice1}}元</span></p>
								<p class="text">件数：{{data.ProductNum1}}</p>
							</div>
						</div>
						</block>
						<block v-if="data.ProductName2">
							<div class="g-name"><span>附加商品2</span></div>
							<div class="dl clear">
								<div class="img fl"><img :src="data.ProductImg2"></div>
								<div class="box_r">
									<p class="text">{{data.ProductName2}}</p>
									<p class="text">单件商品单价：<span class="c_Org">{{data.ProductPrice2}}元</span></p>
									<p class="text">单件商品展示单价：<span class="c_Org">{{data.ProductPublicPrice2}}元</span></p>
									<p class="text">件数：{{data.ProductNum2}}</p>
								</div>
							</div>
						</block>
						<div class="g-name" style="font-size:16px;font-weight:bold;">注：附加产品必须在店铺内找到，并一起下单</div>
					</block>
					<div class="g-name c_Org" v-if="data.IsPresaleTask==1||data.IsAdvanceTask==1">
						{{data.IsPresaleTask==1?"隔日单任务":"预售任务"}}：{{data.PaymentStartTime}} 到 {{data.PaymentEndTime}}在{{data.PlatName}}平台去下单
						<p style="font-size:15px;font-weight:bold;color:red;">不到订单支付时间不能拍下付款，否则该笔订单任务撤销（处罚10金一单）</p>
					</div>
				</div>
				<!--审核信息-->
				<div class="checkInfo">
					<p style="font-size:20px; color:red;" v-if="data.Remark">说明：{{data.Remark}}</p>
					<div class="attachClaimImg">
						<p style="font-size:20px; color:red;" v-if="data.AttachClaimImg||data.AttachClaimImg1||data.AttachClaimImg2">备注图片：</p>
						<!-- 查看备注图片 -->
						<div class="img_div" v-if="data.AttachClaimImg" @click="previewImage([data.AttachClaimImg])">
							<img :src="data.AttachClaimImg" />
						</div> 
						<div class="img_div" v-if="data.AttachClaimImg1" @click="previewImage([data.AttachClaimImg1])">
							<img :src="data.AttachClaimImg1" />
						</div> 
						<div class="img_div" v-if="data.AttachClaimImg2" @click="previewImage([data.AttachClaimImg2])">
							<img :src="data.AttachClaimImg2" />
						</div> 
						<div style="clear:both;"></div>
					</div>
					<div class="itembox">
						<div class="titleHd"><span>任务要求</span></div>
						<ul class="ul-list">
							<li>
								<label>任务类型</label>
								<div class="txt-r">
									<!-- <span class="blue">{{(data.PlatType+data.AttachClaimImg1)||data.AttachClaimImg2?"(多商品任务)":""}}</span> -->
									<span class="blue">{{data.PlatType}}</span>
								</div>
							</li>
							<li style="height:auto;">
								<label>{{data.IsNewPasswordTask==1?"搜索淘口令":"搜索关键词"}}</label>
								<div class="txt-r">
									<span class="keytext" id="proKeyWord">{{data.IsNewPasswordTask==1?data.OriginalPassword:data.KeyWord}}</span>
									<!-- onclick="CopyContent()" -->
									<p class="link_btn" @click="copyWord()">{{data.IsNewPasswordTask==1?"复制淘口令":"复制关键词"}}</p></div>
							</li>
							<block v-if="data.TaskType==1">
							<li>
								<label>评价要求</label>
								<div class="txt-r"><span>{{data.EvaluationTitle}}</span></div>
							</li>
							<li>
								<label>购买数量</label>
								<div class="txt-r"><span>目标商品{{data.ProductNum}}件</span></div>
							</li>
							<li v-if="data.ProductAddress">
								<label>发货地</label>
								<div class="txt-r"><span>{{data.ProductAddress}}</span></div>
							</li>
							</block>
							<li>
								<label>排序方式</label>
								<div class="txt-r"><span>{{data.SortBy}}</span></div>
							</li>
							<li>
								<label>付款/收货数</label>
								<div class="txt-r"><span>{{data.PayNumber}}人</span></div>
							</li>
							<li v-if="data.EndPrice>0">
								<label>价格区间</label>
								<div class="txt-r"><span>{{data.StartPrice}}元 ~ {{data.EndPrice}}元</span></div>
							</li>
						</ul>
					</div>
					<div class="itembox">
						<div class="titleHd"><span>订单留言</span><span style="color:red; font-size:12px;">（任务如需订单留言的，下单时务必按要求操作）</span></div>
						<div class="txtbox c_Org">{{data.ShopMessage}}</div>
						<div class="txtbox c_Org" v-if="data.TaskIsAddCar==1">需要把主商品加入购物车</div>
						<div class="txtbox c_Org" v-if="data.TaskIsChat==1">需要会员与客服聊天</div>
						<div class="txtbox c_Org" v-if="data.TaskIsCollection==1">需要收藏主商品</div>
						<div class="txtbox c_Org" v-if="data.TaskIsFollowShop==1">需要关注店铺</div>
					</div>
					<div class="itembox">

					</div>
					<div class="itembox">
						<div class="titleHd"><span>任务步骤</span></div>
						<div class="StepBox">

							<div class="Step Step-1">
								<div class="txtbox">
									<div class="piclist Uploadimg">
										<ul class="clear">
										<li v-if="data.CollectionCompetitiveProducts1==1&&data.AcceptTaskStatus!=9">
											<div class="img" @click="upImg('CollectionCompetitiveProducts1')">
												<div class="upimg">
													<img class="uploadImg" :src="screenshot.CollectionCompetitiveProducts1"/>
												</div>
											</div>
											<p class="text">收藏竞品店铺</p>
										</li>
										<li v-if="data.CollectionCompetitiveProducts2==1&&data.AcceptTaskStatus!=9">
											<div class="img" @click="upImg('CollectionCompetitiveProducts2')">
												<div class="upimg">
													<img class="uploadImg" :src="screenshot.CollectionCompetitiveProducts2"/>
												</div>
											</div>
											<p class="text">收藏竞品商品</p>
										</li>
										<li v-if="data.CollectionCompetitiveProducts3==1&&data.AcceptTaskStatus!=9">
											<div class="img" @click="upImg('CollectionCompetitiveProducts3')">
												<div class="upimg">
													<img class="uploadImg" :src="screenshot.CollectionCompetitiveProducts3"/>
												</div>
											</div>
											<p class="text">加竞品购物车</p>
										</li>
										</ul>
									</div>
								</div>
							</div>

							<block v-if="data.AcceptTaskStatus!=9">
								<div class="Step Step-2">
									<div class="No"><span>核对店铺是否正确 </span>
										<p class="link_btn" @click="showExamples(4)">点击查看示例</p>
									</div>
									<div class="Examine">
										<div style="text-align:center;">店铺名认证：{{data.ShopName}}</div>
										<div class="inputbox_group flex-center">
											<block v-for="(item,index) in data.ShopName" :key="index">
												<input v-if="item=='*'" v-model="ShopNameArr[index]"  class="input" name="shopname" type="text" placeholder="补全" maxlength="1" /> 
												<input v-else class="input" name="shopname" type="text" :value="item" readonly /> 
											</block>
										</div>
										<p class="btn_100" @click="checkShopName">补全后点我核对</p>
									</div>
								</div>
								<div class="Step Step-2" v-if="data.SetCommodityKeywords">
									<div class="No"><span>核对关键词是否正确  </span>
										<p class="link_btn" @click="showExamples(5)">点击查看示例</p>
									</div>
									<div class="Examine">
										<div style="text-align:center;">关键词认证：{{data.SetCommodityKeywords}}</div>
										<div class="inputbox_group flex-center">
											<block v-for="(item,index) in data.SetCommodityKeywords" :key="index">
												<input v-if="item=='*'" v-model="SetCommodityKeywordsArr[index]"  class="input"  type="text" placeholder="补全" maxlength="1" />
												<input v-else class="input" name="Keywords" type="text" :value="item" readonly />
											</block>
										</div>
										<p class="btn_100" @click="checkKeywords">补全后点我核对</p>
									</div>
								</div>
							</block>

							<div class="Step Step-1" v-if="data.IsPresaleTask==1&&data.AcceptTaskStatus!=9">
								<div class="txtbox">
									<div class="piclist Uploadimg">
										<ul class="clear">
										<li v-if="(data.ShootTheNextDay==0||data.ShootTheNextDay==2)&&data.IsPresaleTask==1">
											<div class="img" @click="upImg('AddAShoppingCart')">
												<div class="upimg">
													<img class="uploadImg" :src="screenshot.AddAShoppingCart"/>
												</div>
											</div>
											<p class="text">加购物车</p>
										</li>
										<li v-if="(data.ShootTheNextDay==1||data.ShootTheNextDay==2)&&data.IsPresaleTask==1">
											<div class="img" @click="upImg('CollectionOfGoods')">
												<div class="upimg">
													<img class="uploadImg" :src="screenshot.CollectionOfGoods"/>
												</div>
											</div>
											<p class="text">收藏商品</p>
										</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.IsComparisonShop==1&& data.TaskType==1&& data.AcceptTaskStatus!=9">
								<div class="No"><span>第一步&nbsp;货比三家</span>
									<p class="link_btn" @click="showExamples(0)">点击查看示例</p>
								</div>
								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范围
									</p>
									<p>4、随机点开搜索列表中别家的任意2个商品，慢慢滑动浏览商品直 到底部（分别浏览一分钟以上）然后上传链接
									</p>
									<div class="piclist Uploadimg">
										<div class="from">
											<p>货比三家链接1</p>
											<div class="from-item mt10">
												<input class="input" id="huobisanj1" style="width:300px" v-model="data.ShoparoundLink1" type="text" placeholder="货比商品链接1" />
											</div>
										</div>
										<div class="from">
											<p>货比三家链接2</p>
											<div class="from-item mt10">
												<input class="input" id="huobisanj2" style="width:300px" v-model="data.ShoparoundLink2" type="text" placeholder="货比商品链接2" />
											</div>
										</div>
										<div class="from" v-if="data.IsAppointCompet==1">
											<p>货比三家链接3</p>
											<div class="from-item mt10">
												<input class="input" id="IsAppointCompet1" style="width:300px" v-model="data.IsAppointCompetlink1" type="text" placeholder="货比商品链接2" />
											</div>
										</div>
										<div class="from" v-if="data.IsAppointCompet==1">
											<p>货比三家链接4</p>
											<div class="from-item mt10">
												<input class="input" id="IsAppointCompet2" style="width:300px" v-model="data.IsAppointCompetlink2" type="text" placeholder="货比商品链接2" />
											</div>
										</div>
										<div class="from" v-if="data.IsAppointCompet==1">
											<p>货比三家链接5</p>
											<div class="from-item mt10">
												<input class="input" id="IsAppointCompet3" style="width:300px" v-model="data.IsAppointCompetlink3" type="text" placeholder="货比商品链接2" />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="(data.ShouCanjp1==1||data.ShouCanjp2==1)&&data.TaskType==1 && data.IsAddedservices==1">
								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范 围，对搜索结果页面截一张图
									</p>
									<p>4、随机点开搜索列表中别家的任意商品，收藏别家的商品，然后上传截图
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">
											<li v-if="data.ShouCanjp1==1">
												<div class="img">
												<!-- <div class="upimg" onclick="getpic(this,'scotherA',20)"> -->
												<div class="upimg" >
													<img class="uploadImg" />
												</div>
												<input type="hidden" id="scotherA" readonly="true" />
												</div>
												<p class="text">收藏竞品1</p>
											</li>
											<li v-if="data.ShouCanjp2==1">
												<div class="img">
													<!-- <div class="upimg" onclick="getpic(this,'scotherB',20)"> -->
													<div class="upimg">
														<img class="uploadImg" />
													</div>
													<input type="hidden" id="scotherB" readonly="true" />
												</div>
												<p class="text">收藏竞品2</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="(data.JiaGoujp1==1||data.JiaGoujp2==1)&&data.TaskType==1 && data.IsAddedservices==1">
								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范 围，对搜索结果页面截一张图
									</p>
									<p>4、随机点开搜索列表中别家的任意商品，加购别家的商品，然后上传截图
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">
											<li v-if="data.JiaGoujp1==1">
												<div class="img" @click="upImg('jgotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.jgotherA"/>
													</div>
												</div>
												<p class="text">加购竞品1</p>
											</li>
											<li v-if="data.JiaGoujp2==1">
												<div class="img" @click="upImg('jgotherB')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.jgotherB"/>
													</div>
												</div>
												<p class="text">加购竞品2</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.ShouCandp==1  && data.IsAddedservices==1">
								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求找到本商品店铺并对其收藏，截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('scdpotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.scdpotherA"/>
													</div>
												</div>
												<p class="text">收藏店铺</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.ShouCansp==1  && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求找到本商品并对其收藏，截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('collectionProduct')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.collectionProduct"/>
													</div>
												</div>
												<p class="text">收藏商品</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.Jiarugouwu==1  && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求找到本商品并对其加入购物车，截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('cartImg')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.cartImg"/>
													</div>
												</div>
												<p class="text">加入购物车</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.LiuLanfbb==1 && data.TaskType==2 && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求浏览本店其他商品 慢慢滑动浏览商品直到底部（浏览一分钟以上），截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('fbbotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.fbbotherA"/>
													</div>
												</div>
												<p class="text">浏览副宝贝</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.DianZanhp==1 && data.TaskType==2 && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、按要求给本商品点赞并截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('dzotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.dzotherA"/>
													</div>
												</div>
												<p class="text">点赞好评</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.LiuLanwdj==1 && data.TaskType==2 && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、找到“问大家”功能并浏览页面至底部（一分钟以上），截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('llwdjotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.llwdjotherA"/>
													</div>
												</div>
												<p class="text">浏览“问大家”</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-1" v-if="data.TiWendj==1 && data.TaskType==2 && data.IsAddedservices==1">

								<div class="txtbox">
									<p>1、请确认使用接单账号登录{{data.PlatName}}应用</p>
									<p>2、点击搜索框粘贴指定的关键词</p>
									<p>3、找到“问大家”功能并且提问，提问成功后截图上传
									</p>
									<div class="piclist Uploadimg">
										<ul class="clear">

											<li>
												<div class="img" @click="upImg('twwdjotherA')">
													<div class="upimg">
														<img class="uploadImg" :src="screenshot.twwdjotherA"/>
													</div>
												</div>
												<p class="text">提问“问大家”</p>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<!-- 浏览店铺 -->
							<div class="Step Step-3" v-if="(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)&&data.AcceptTaskStatus!=9">
								<div class="No"><span>{{data.IsSearchList==1||data.IsComparisonShop==1?"第二步":"第一步"}}&nbsp;浏览店铺</span>
									<p class="link_btn" @click="showExamples(1)">点击查看示例</p>
								</div>
								<div class="txtbox">
									<p>1、根据商品主图、价格、名称等条件找到目标商品，从头到尾慢慢 浏览，停留至少5分钟 ，并上传宝贝链接核对
									</p>
									<block v-if="data.AcceptTaskStatus!=9">
										<div class="No"><span>核对主宝贝是否正确  </span>
											<p class="link_btn" @click="showExamples(6)">点击查看示例</p>
										</div>
										<div class="Examine">
											<div class="piclist Uploadimg">
												<div class="from">
													<p>验证主宝贝链接</p>
													<div class="from-item mt10">
														<input class="input" name="goodslink" id="goodslink"  style="width:98%" v-model="ShoparoundLinkMain[0]" type="text" placeholder="商品链接" />
													</div>
												</div>
												<div class="from" v-if="data.ProductName2">
													<p>验证附加商品1链接</p>
													<div class="from-item mt10">
													<input class="input" name="goodslink" id="goodslink1" style="width:300px" v-model="data.ShoparoundLink2" type="text" placeholder="附加商品链接1" />
													</div>
												</div>
												<div class="from" v-if="data.ProductName2">
													<p>验证附加商品2链接</p>
													<div class="from-item mt10">
													<input class="input" name="goodslink" id="goodslink2" style="width:100%" v-model="data.ShoparoundLink2" type="text" placeholder="附加商品链接2" />
													</div>
												</div>
												<p class="btn_100 cfff" @click="checkGoodLink">点我核对</p>
											</div>
										</div>
									</block>
									<p>2、点击“进入店铺”按钮随机点开店铺里任意2个商品，分别慢慢 滑动浏览商品详情直到底部（分别浏览一分钟以上）分别提交店铺其他宝贝的链接
									</p>
									<p>3、如有带附加商品，上一步中随机点的2个商品换成任务要求的附 加商品，分别慢慢滑动浏览商品详情直到底部（分别浏览一分钟以 上）分别提交2个商品的链接
									</p>
									<div class="piclist Uploadimg">
										<div class="from">
											<p>店内宝贝链接1</p>
											<div class="from-item mt10">
												<input class="input" id="ShopProAlink" style="width:300px" v-model="data.ShopProAlink" type="text" placeholder="店内宝贝链接1" />
											</div>
										</div>
										<div class="from">
											<p>店内宝贝链接2</p>
											<div class="from-item mt10">
												<input class="input" id="ShopProBlink" style="width:300px" v-model="data.ShopProBlink" type="text" placeholder="店内宝贝链接2" />
											</div>
										</div>
									</div>
									<!-- 店内商品 -->
									<div class="piclist Uploadimg" v-if="data.IsBrowseStore==1&&data.TaskType!=2">
										<ul class="clear">
											<block v-if="(data.IsNewPasswordTask==0)&&(data.IsCompetingGoodsTask==0)&&(data.IsPresaleTask==0)&&(data.IsGoodTask==0)&&(data.IsAdvanceTask==0)">
												<li>
													<div class="img" @click="upImg('targetTop')">
														<div class="upimg">
															<img class="uploadImg" :src="screenshot.targetTop"/>
														</div>
													</div>
													<p class="text">目标商品顶部</p>
												</li>
												<li>
													<div class="img" @click="upImg('targetBottom')">
														<div class="upimg">
															<img class="uploadImg" :src="screenshot.targetBottom"/>
														</div>
													</div>
													<p class="text">目标商品底部</p>
												</li>
												<li>
													<div class="img" @click="upImg('shopProA')">
														<div class="upimg">
															<img class="uploadImg" :src="screenshot.shopProA"/>
														</div>
													</div>
													<p class="text">店内商品A</p>
												</li>
												<li>
													<div class="img" @click="upImg('shopProB')">
														<div class="upimg">
															<img class="uploadImg" :src="screenshot.shopProB"/>
														</div>
													</div>
													<p class="text">店内商品B</p>
												</li>
											</block>
											<!-- 附加商品 -->
											<block v-if="data.TaskType==1&&(data.ProductName1||data.ProductName2)">
												<block v-if="data.ProductName1">
													<li>
														<div class="img" @click="upImg('AdditionalProductA1')">
															<div class="upimg">
																<img class="uploadImg" :src="screenshot.AdditionalProductA1"/>
															</div>
														</div>
														<p class="text">附加商品1顶部</p>
													</li>
													<li>
														<div class="img" @click="upImg('AdditionalProductB1')">
															<div class="upimg">
																<img class="uploadImg" :src="screenshot.AdditionalProductB1"/>
															</div>
														</div>
														<p class="text">附加商品1底部</p>
													</li>
												</block>
												<block v-if="data.ProductName2">
													<li>
														<div class="img" @click="upImg('AdditionalProductA2')">
															<div class="upimg">
																<img class="uploadImg" :src="screenshot.AdditionalProductA2"/>
															</div>
														</div>
														<p class="text">附加商品2顶部</p>
													</li>
													<li>
														<div class="img" @click="upImg('AdditionalProductB2')">
															<div class="upimg">
																<img class="uploadImg" :src="screenshot.AdditionalProductB2"/>
															</div>
														</div>
														<p class="text">附加商品2底部</p>
													</li>
												</block>
											</block>
										</ul>
									</div>
									<block v-if="data.Llshoucandp==1">
										<p>收藏店铺</p>
										<div class="piclist Uploadimg">
											<ul class="clear">
												<li>
													<div class="img" @click="upImg('collectionShop')">
														<div class="upimg">
															<img class="uploadImg" :src="screenshot.collectionShop"/>
														</div>
													</div>
												</li>
											</ul>
										</div>
									</block>

								</div>
							</div>
							<block v-if="data.TaskType==1">
								<div class="Step Step-4" v-if="(data.ChatPlaceAnOrder>0&&(data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9))&&(data.IsAdvanceTask==0||(data.IsAdvanceTask==1&&data.AcceptTaskStatus==9)))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))">
									<div class="No"><span>{{(data.IsSearchList==1||data.IsComparisonShop==1)?(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)?"第三步":"第二步":"第一步"}}&nbsp;下单核对</span>
										<p style="display:none" class="link_btn" @click="showExamples(2)">点击查看示例</p>
									</div>
									<div class="txtbox">
										<p>1、把商品加入购物车，确认件数，颜色尺码，如需留言按要求留言，拍下订单
										</p>
										<p class="red">2、拍下订单后先不要付款，复制订单进行验证后，再付款</p>
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10">
												<input class="input orderNo" v-model="playOrderNo" type="text" placeholder="请输入下单单号" />
											</div>
										</div>
										<div class="ftbtn mb10 mt10">
											<p class="btn cfff" id="heduiBtn" @click="checkPlayOrderNo">点我核对</p>
										</div>
									</div>
								</div>
								<div class="Step Step-5" v-if="(data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9))&&(data.IsAdvanceTask==0||(data.IsAdvanceTask==1&&data.AcceptTaskStatus==9))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))">
									<div class="No">
										<span>
										{{(data.IsSearchList==1||data.IsComparisonShop==1)?(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)?data.ChatPlaceAnOrder>0?"第四步":"第三步":"第二步":"第一步"}}&nbsp;平台下单信息
										</span>
										<p style="display:none" class="link_btn" @click="showExamples(3)">点击查看示例</p>
											</div>
									<block v-if="data.isYanOrder">
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10"><input class="input orderNo" v-model="comfirmOrderNo" type="text" placeholder="请输入下单单号"  readonly/></div>
										</div>
										<div class="from">
											<p>订单金额：（订单付款金额）</p>
											<div class="from-item mt10"><input class="input" id="orderMoney" v-model="orderPrice" type="text" placeholder="请输入订单支付金额" readonly/></div>
										</div>
									</block>
									<block v-else>
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10"><input class="input orderNo"  v-model="comfirmOrderNo" type="text" placeholder="请输入下单单号"/></div>
										</div>
										<div class="from">
											<p>订单金额：（订单付款金额）</p>
											<div class="from-item mt10"><input class="input" id="orderMoney" v-model="orderPrice" type="text" placeholder="请输入订单支付金额"/></div>
										</div>
									</block>
									<block v-if="data.TaskExpressId>0">
										<!-- onclick="lookmore()" -->
										<p style="color:red; font-size:15px; padding-top:5px;">注意：下面填写的收货地址一定要和平台下单的订单收货地址一致<img class="fr"  style="width:26px;height:26px;" src="/static/image/icons/more.png" /></p>
										<div id="userinfo" style="display:none">
										<div class="from">
											<p>订单收货联系人：</p>
											<div class="from-item mt10"><input class="input" id="consignee" v-model="data.ConsigneeName" type="text" placeholder="请输入联系人名字" /></div>
										</div>
										<div class="from">
											<p>订单收货联系电话：</p>
											<div class="from-item mt10"><input class="input" id="consigneeMobile" v-model="data.ConsigneeMobile" type="text" placeholder="请输入联系电话" /></div>
										</div>
										<div class="from">
											<p>订单收货地址：</p>
											<div class="from-item mt10" @click="showAreaSelect">
												<!-- onclick="picker3()" -->
												<input type="text" class="input" id="area" v-model="data.AccountAreaText" placeholder="请选择城市" disabled />
												<span class="icon-arrow icon-arrowRight"></span>
											</div>
											<!-- <input type="hidden" id="provinceCode" :value="data.AccountProvinceCode" readonly="true" />
											<input type="hidden" id="cityCode" :value="data.AccountCityCode" readonly="true" />
											<input type="hidden" id="districtCode" :value="data.AccountDistrictCode" readonly="true" /> -->
										</div>
										<div class="from">
											<p>订单收货详细地址：</p>
											<div class="from-item mt10"><input class="input" id="xiangxidizhi" v-model="data.AccountAddress" type="text" placeholder="请输入详细地址" /></div>
										</div>
										</div>
									</block>
								</div>
							</block>
						</div>
					</div>
				</div>
				<p style="font-size:15px;font-weight:bold;color:red;" v-if="((data.IsPresaleTask==1&&data.AcceptTaskStatus!=9))||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus!=9)">不到订单支付时间不能拍下付款，否则该笔订单任务撤销（处罚10金一单）</p>
				<div class="ftbtn mb10 mt10">
					<p class="btn" id="submitBtn" @click="submitTask">提交审核</p>
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
        <!-- <w-picker 
			mode="selector"
			:level="1"
			@confirm="onConfirm"
			ref="pickerList"
            :defaultVal="defaultPicker"
            :selectList="pickerList"
            themeColor="#5c91f0"
            >
        </w-picker> -->
	</div>

</template>

<script>
import {post,toast,goUrl,getImgPath,previewImage} from '@/utils';
import h5Copy  from '@/utils/junyi-h5-copy';
import GetAreaList from '@/utils/areaList';
import wPicker from "@/components/w-picker/w-picker.vue";
import {pathToBase64} from '@/utils/image-tools';
export default {
  data() {
    return {
		previewImage,
        userId:'',
        token:'',
        TaskAcceptNo:'',
		data:{},
		isPresaleTask:0,//是否1-预售任务
		playOrderNo:'',//下单的订单编号
		comfirmOrderNo:'',//完成的单号
		orderPrice:'',//订单价格
		checkShopNameStatus:false,//是否已核对店铺名称
		ShopNameArr:[],//补全店铺名称
		checkKeywordStatus:false,//是否已核对补全关键词
		SetCommodityKeywordsArr:[],//补全关键词
		checkProLinkMainStatus:false,//是否已核对宝贝链接
		ShoparoundLinkMain:[],//验证主宝贝链接
		checkOrderNoStatus:false,//是否已核对订单号
		// 截图
		screenshot:{
			CollectionCompetitiveProducts1:'',//藏竞品店铺截图
			CollectionCompetitiveProducts2:'',//收藏竞品商品截图
			CollectionCompetitiveProducts3:'',//加竞品购物车截图
			AddAShoppingCart:'',//加购物车截图
			CollectionOfGoods:'',//收藏商品截图
			collectionShop:'',//收藏店铺截图
			//额外操作截图
			scotherA:'',//收藏竞品1截图
			scotherB:'',//收藏竞品2截图
			jgotherA:'',//加购竞品1截图
			jgotherB:'',//加购竞品2截图

			scdpotherA:'',//收藏店铺截图
			collectionProduct:'',//收藏商品截图
			cartImg:'',//加入购物车截图
			fbbotherA:'',//浏览副宝贝截图
			dzotherA:'',//点赞好评截图
			llwdjotherA:'',//浏览问大家截图
			twwdjotherA:'',//提问问大家截图
			// 店内商品
			targetTop:'',//目标商品顶部截图
			targetBottom:'',//目标商品底部截图
			shopProA:'',//店内商品A截图
			shopProB:'',//店内商品B截图
			// 附加商品
			AdditionalProductA1:'',//附加商品1顶部截图
			AdditionalProductB1:'',//附加商品1底部截图
			AdditionalProductA2:'',//附加商品2顶部截图
			AdditionalProductB2:'',//附加商品2底部截图
		},
		areaText:'',//地区显示的值
		areaList:[],//地区列表
		defaultArea:['广东省','深圳市','龙华新区'],//默认地址
		OperationCountdown:null,//操作倒计时
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.TaskAcceptNo = options.TaskAcceptNo;
    this.init();
    this.getData();
	this.getAreaList();//获取地址列表
  },
  onShow() {},
  methods: {
	  init(){
		this.playOrderNo='',//下单的订单编号
		this.comfirmOrderNo='',//完成的单号
		this.orderPrice='',//订单价格
		this.checkShopNameStatus=false,//是否已核对店铺名称
		this.ShopNameArr=[],//补全店铺名称
		this.checkKeywordStatus=false,//是否已核对补全关键词
		this.SetCommodityKeywordsArr=[],//补全关键词
		this.checkProLinkMainStatus=false,//是否已核对宝贝链接
		this.ShoparoundLinkMain=[],//验证主宝贝链接
		this.checkOrderNoStatus=false,//是否已核对订单号
		// 截图
		this.screenshot={
			CollectionCompetitiveProducts1:'',//藏竞品店铺截图
			CollectionCompetitiveProducts2:'',//收藏竞品商品截图
			CollectionCompetitiveProducts3:'',//加竞品购物车截图
			AddAShoppingCart:'',//加购物车截图
			CollectionOfGoods:'',//收藏商品截图
			collectionShop:'',//收藏店铺截图
			//额外操作截图
			scotherA:'',//收藏竞品1截图
			scotherB:'',//收藏竞品2截图
			jgotherA:'',//加购竞品1截图
			jgotherB:'',//加购竞品2截图

			scdpotherA:'',//收藏店铺截图
			collectionProduct:'',//收藏商品截图
			cartImg:'',//加入购物车截图
			fbbotherA:'',//浏览副宝贝截图
			dzotherA:'',//点赞好评截图
			llwdjotherA:'',//浏览问大家截图
			twwdjotherA:'',//提问问大家截图
			// 店内商品
			targetTop:'',//目标商品顶部截图
			targetBottom:'',//目标商品底部截图
			shopProA:'',//店内商品A截图
			shopProB:'',//店内商品B截图
			// 附加商品
			AdditionalProductA1:'',//附加商品1顶部截图
			AdditionalProductB1:'',//附加商品1底部截图
			AdditionalProductA2:'',//附加商品2顶部截图
			AdditionalProductB2:'',//附加商品2底部截图
		},
		this.OperationCountdown = false;
	  },
		getData(){
			post('Task/LoadOperationalTask',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo
			}).then(res=>{
				const data = res.obj;
				if(data.IsAmoy==0&&data.isYanOrder==0){
					this.checkOrderNoStatus=true;
				}
				this.isPresaleTask = data.IsPresaleTask;
				if(data.IsPresaleTask==1){
					uni.showModal({
						title:'注意！',
						content:`预售任务，付款时间：${data.PaymentStartTime}-${data.PaymentEndTime}。请完全按照商家要求操作，确认每一步都间隔足够时间，不按照要求做的，平台有权封停账号`,
						showCancel:false,
						confirmText:'我知道了'
					})
				}else{
					uni.showModal({
						title:'注意！',
						content:`请完全按照商家要求操作，确认每一步都间隔足够时间，不按照要求做的，平台有权封停账`,
						showCancel:false,
						confirmText:'我知道了'
					})
				}
				// 操作倒计时
				if (data.AcceptTaskStatus == 0) {
                    this.timerStart(data.OperationCountdown);
                }
				this.data = data;

			})
		},
		// 核对店铺名称
		checkShopName(){
			const arrVal = this.ShopNameArr;
			let strArr = this.data.ShopName.split('');
			strArr.map((item,i)=>{
				if(item=='*'&&arrVal[i]){
					strArr[i] = arrVal[i];
				}
			})
			post('Task/VerifyShopName',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                ShopName: strArr.join('')
			}).then(res=>{
				toast(res.msg);
				this.checkShopNameStatus = true;
			})
		},
		// 核对关键词
		checkKeywords(){
			const arrVal = this.SetCommodityKeywordsArr;
			let strArr = this.data.SetCommodityKeywords.split('');
			strArr.map((item,i)=>{
				if(item=='*'&&arrVal[i]){
					strArr[i] = arrVal[i];
				}
			})
			post('Task/VerifyShopSetKeyWords',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                SetCommodityKeywords: strArr.join('')
			}).then(res=>{
				toast(res.msg);
				this.checkKeywordStatus = true;
			})
		},
		// 核对商品链接
		checkGoodLink(){
			if(!this.ShoparoundLinkMain[0]){
				toast('请输入商品链接！');
				return;
			}
			const data= this.data;
			post('Task/VerifyProductId',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                ProductUrl: this.ShoparoundLinkMain[0],
                ProductUrl1: data.ShoparoundLink2,
                ProductUrl2: data.ShoparoundLink2
			}).then(res=>{
				toast(res.msg);
				this.checkProLinkMainStatus = true;
			})
		},
		// 核对订单编号
		checkPlayOrderNo(){
			const data = this.data;
			if(data.IsAmoy==0&&data.isYanOrder==0){
				toast('商家没有开通自动核对功能，请忽略')
				return false
			}else {
				if(!this.playOrderNo){
				toast('订单编号不能为空')
				return false
				}
				if(data.IsAmoy==1){
				this.IsAmoyOrder()
				}
				if(data.isYanOrder==1){
				this.IsTaoOrder()
				}
			}
		},
		IsAmoyOrder(){
			const data = this.dta;
			post('Task/IsAmoyOrderFun',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                PlatOrderNo: this.playOrderNo,
			}).then(res=>{
			 	this.comfirmOrderNo = this.playOrderNo;
				this.checkOrderNoStatus=true;
              if(data.isYanOrder==0){
                toast(res.msg);
              }
			})
		},
		IsTaoOrder(){
			const data = this.dta;
			post('Task/IsAmoyOrderFun',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                PlatOrderNo: this.playOrderNo,
			}).then(res=>{
			 	this.comfirmOrderNo = this.playOrderNo;
				this.checkOrderNoStatus=true;
			 	this.orderPrice = res.obj;
				toast(res.msg);
			})
		},
		// 提交
		async submitTask(){
			let huobisanjiaJson={};
			let imageJson = {};
			const data = this.data;
			const screenshot = this.screenshot;
			
			if(data.CollectionCompetitiveProducts1==1&&data.AcceptTaskStatus!=9){
				if(!screenshot.CollectionCompetitiveProducts1){
					toast("收藏竞品店铺截图不能为空");
					return false;
				}
				imageJson["CollectionCompetitiveProducts1"] = screenshot.CollectionCompetitiveProducts1;
			}
			
			if(data.CollectionCompetitiveProducts2==1&&data.AcceptTaskStatus!=9){
				if(!screenshot.CollectionCompetitiveProducts2){
					toast("收藏竞品商品截图不能为空");
					return false;
				}
				imageJson["CollectionCompetitiveProducts2"] = screenshot.CollectionCompetitiveProducts2;
			}
			if(data.CollectionCompetitiveProducts3==1&&data.AcceptTaskStatus!=9){
				if(!screenshot.CollectionCompetitiveProducts3){
					toast("加竞品购物车截图不能为空");
					return false;
				}
				imageJson["CollectionCompetitiveProducts3"] = screenshot.CollectionCompetitiveProducts3;
			}
			// 加购物车截图--收藏商品截图
			if(data.IsPresaleTask==1&&data.AcceptTaskStatus!=9){
				if((data.ShootTheNextDay==0||data.ShootTheNextDay==2)){
					if(!screenshot.AddAShoppingCart){
						toast("加购物车截图不能为空");
						return false;
					}
					imageJson["AddAShoppingCart"] = screenshot.AddAShoppingCart;
				}
				if((data.ShootTheNextDay==1||data.ShootTheNextDay==2)){
					if(!screenshot.CollectionOfGoods){
						toast("收藏商品截图不能为空");
						return false;
					}
					imageJson["CollectionOfGoods"] = screenshot.CollectionOfGoods;
				}
				
			}
			// 货比三家
			if(data.IsComparisonShop==1&& data.TaskType==1&& data.AcceptTaskStatus!=9){
				
				if(!data.ShoparoundLink1){
					toast("货比三家链接不能为空");
					return false;
				}
				if(data.ShoparoundLink1.indexOf("http")){
					toast("请输入正确的货比三家链接地址");
					return false;
				}
				huobisanjiaJson["ShopAroundlink1"] = data.ShoparoundLink1; 
				
				if(!data.ShoparoundLink2){
					toast("货比三家链接不能为空");
					return false;
				}
				if(data.ShoparoundLink2.indexOf("http")){
					toast("请输入正确的货比三家链接地址");
					return false;
				}
				huobisanjiaJson["ShopAroundlink2"] = data.ShoparoundLink2; 
			}
			
			//额外货比连接
			if(data.IsAppointCompet==1){
				if(!data.IsAppointCompetlink1){
					toast("货比三家链接不能为空");
					return false;
				}
				if(data.IsAppointCompetlink1.indexOf("http")){
					toast("请输入正确的货比三家链接地址");
					return false;
				}
				huobisanjiaJson["IsAppointCompetlink1"] = data.IsAppointCompetlink1; 
				
				if(!data.IsAppointCompetlink2){
					toast("货比三家链接不能为空");
					return false;
				}
				if(data.IsAppointCompetlink2.indexOf("http")){
					toast("请输入正确的货比三家链接地址");
					return false;
				}
				huobisanjiaJson["IsAppointCompetlink2"] = data.IsAppointCompetlink2; 
				
				if(!data.IsAppointCompetlink3){
					toast("货比三家链接不能为空");
					return false;
				}
				if(data.IsAppointCompetlink3.indexOf("http")){
					toast("请输入正确的货比三家链接地址");
					return false;
				}
				huobisanjiaJson["IsAppointCompetlink3"] = data.IsAppointCompetlink3; 
			}
			//额外操作截图
			if((data.ShouCanjp1==1||data.ShouCanjp2==1)&&data.TaskType==1 && data.IsAddedservices==1){
				if(data.ShouCanjp1==1){
					if(!screenshot.scotherA){
						toast("收藏竞品1截图不能为空");
						return false;
					}
					imageJson["ShouCanjpimg1"] = screenshot.scotherA;
				}
				if(data.ShouCanjp2==1){
					if(!screenshot.scotherB){
						toast("收藏竞品2截图不能为空");
						return false;
					}
					imageJson["ShouCanjpimg2"] = screenshot.scotherB;
				}
			}
			if((data.JiaGoujp1==1||data.JiaGoujp2==1)&&data.TaskType==1 && data.IsAddedservices==1){
				if(data.JiaGoujp1==1){
					if(!screenshot.jgotherA){
						toast("加购竞品1截图不能为空");
						return false;
					}
					imageJson["JiaGoujpimg1"] = screenshot.jgotherA;
				}
				if(data.JiaGoujp2==1){
					if(!screenshot.jgotherB){
						toast("加购竞品2截图不能为空");
						return false;
					}
					imageJson["JiaGoujpimg2"] = screenshot.jgotherB;
				}
			}
			// 收藏店铺
			if(data.ShouCandp==1  && data.IsAddedservices==1){
				if(!screenshot.scdpotherA){
					toast("收藏店铺截图不能为空");
					return false;
				}
				imageJson["ShouCandpimg"] = screenshot.scdpotherA;
			}
			// 加入购物车截图
			if(data.Jiarugouwu==1  && data.IsAddedservices==1){
				if(!screenshot.cartImg){
					toast("加入购物车截图不能为空");
					return false;
				}
				imageJson["ShoppingCartImg"] = screenshot.cartImg;
			}
			// 浏览副宝贝截图
			if(data.LiuLanfbb==1 && data.TaskType==2 && data.IsAddedservices==1){
				if(!screenshot.fbbotherA){
					toast("浏览副宝贝截图不能为空");
					return false;
				}
				imageJson["LiuLanfbbimg"] = screenshot.fbbotherA;
			}
			// 点赞好评截图
			if(data.DianZanhp==1 && data.TaskType==2 && data.IsAddedservices==1){
				if(!screenshot.dzotherA){
					toast("点赞好评截图不能为空");
					return false;
				}
				imageJson["DianZanhpimg"] = screenshot.dzotherA;
			}
			// 浏览问大家截图
			if(data.LiuLanwdj==1 && data.TaskType==2 && data.IsAddedservices==1){
				if(!screenshot.llwdjotherA){
					toast("浏览问大家截图不能为空");
					return false;
				}
				imageJson["LiuLanwdjimg"] = screenshot.llwdjotherA;
			}
			// 提问问大家截图
			if(data.TiWendj==1 && data.TaskType==2 && data.IsAddedservices==1){
				if(!screenshot.twwdjotherA){
					toast("提问问大家截图不能为空");
					return false;
				}
				imageJson["twwdjotherA"] = screenshot.twwdjotherA;
			}
			// 浏览店铺
			if((data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)&&data.AcceptTaskStatus!=9){
				
				if(!data.ShopProAlink){
					toast("店内宝贝链接不能为空");
					return false;
				}
				if(data.ShopProAlink.indexOf("http")){
					toast("请输入正确的链接地址");
					return false;
				}
				huobisanjiaJson["ShopProAlink"] = data.ShopProAlink; 

				if(!data.ShopProBlink){
					toast("店内宝贝链接不能为空");
					return false;
				}
				if(data.ShopProBlink.indexOf("http")){
					toast("请输入正确的链接地址");
					return false;
				}
				huobisanjiaJson["ShopProBlink"] = data.ShopProBlink; 

				// if ($("#otherA")[0]) {
				// 	if (isNullOrEmpty($("#otherA").val())) {
				// 		toast("其他商家A截图不能为空");
				// 		return false;
				// 	}
				// 	imageJson["OtherShopProBottomImgA"] = $("#otherA").val();
				// }
				// if ($("#otherB")[0]) {
				// 	if (isNullOrEmpty($("#otherB").val())) {
				// 		toast("其他商家B截图不能为空");
				// 		return false;
				// 	}
				// 	imageJson["OtherShopProBottomImgB"] = $("#otherB").val();
				// }
				if(data.IsBrowseStore==1&&data.TaskType!=2){
					// 店内商品
					if((data.IsNewPasswordTask==0)&&(data.IsCompetingGoodsTask==0)&&(data.IsPresaleTask==0)&&(data.IsGoodTask==0)&&(data.IsAdvanceTask==0)){
						
						if(!screenshot.targetTop){
							toast("目标商品顶部截图不能为空");
							return false;
						}
						imageJson["TargetProductTopImg"] = screenshot.targetTop;

						if(!screenshot.targetBottom){
							toast("目标商品底部截图不能为空");
							return false;
						}
						imageJson["TargetProductBottomImg"] = screenshot.targetBottom;

						if(!screenshot.shopProA){
							toast("店内商品A截图不能为空");
							return false;
						}
						imageJson["ShopProductBottomImgA"] = screenshot.shopProA;

						if(!screenshot.shopProB){
							toast("店内商品B截图不能为空");
							return false;
						}
						imageJson["ShopProductBottomImgB"] = screenshot.shopProB;
					}
					// 附加商品
					if(data.TaskType==1&&(data.ProductName1||data.ProductName2)){
						if(data.ProductName1){
							if(!screenshot.AdditionalProductA1){
								toast("附加商品1顶部截图不能为空");
								return false;
							}
							imageJson["AdditionalProductA1"] = screenshot.AdditionalProductA1;
							
							if(!screenshot.AdditionalProductB1){
								toast("附加商品1底部截图不能为空");
								return false;
							}
							imageJson["AdditionalProductB1"] = screenshot.AdditionalProductB1;
						}
						if(data.ProductName2){
							if(!screenshot.AdditionalProductA2){
								toast("附加商品2顶部截图不能为空");
								return false;
							}
							imageJson["AdditionalProductA2"] = screenshot.AdditionalProductA2;
							
							if(!screenshot.AdditionalProductB2){
								toast("附加商品2底部截图不能为空");
								return false;
							}
							imageJson["AdditionalProductB2"] = screenshot.AdditionalProductB2;
						}
					}
				}
				if(data.Llshoucandp==1){
					if(!screenshot.collectionShop){
						toast("收藏店铺截图不能为空");
						return false;
					}
					imageJson["ShopCollectionImg"] = screenshot.collectionShop;
				}
				
			}
			//浏览店铺end
			// if(data.TaskType==1){
			// 	// 下单核对
			// 	if((data.ChatPlaceAnOrder>0&&(data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9)))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))){

			// 	}
			// }
			// 下单核对end
			// 收藏商品截图
			if(data.ShouCansp==1  && data.IsAddedservices==1){
				if(!screenshot.collectionProduct){
					toast("收藏商品截图不能为空");
					return false;
				}
				imageJson["ProductCollectionImg"] = screenshot.collectionProduct;
			}
			// if ($("#merchantChatImg")[0]) {
			// 	if (isNullOrEmpty($("#merchantChatImg").val())) {
			// 		toast("商家聊天截图不能为空");
			// 		return false;
			// 	}
			// 	imageJson["MerchantChatImg"] = $("#merchantChatImg").val();
			// }
			// if ($("#orderDetailsImg")[0]) {
			// 	if (isNullOrEmpty($("#orderDetailsImg").val())) {
			// 		toast("订单详情截图不能为空");
			// 		return false;
			// 	}
			// 	imageJson["OrderDetailsImg"] = $("#orderDetailsImg").val();
			// }


			
			if (!this.checkProLinkMainStatus && data.AcceptTaskStatus != 9) {
				toast("请核对商品链接");
				return false;
			}
			if (!this.checkShopNameStatus && data.AcceptTaskStatus != 9) {
				toast("请核对店铺名称");
				return false;
			}
			if (!this.checkKeywordStatus && data.AcceptTaskStatus != 9 && data.SetCommodityKeywords) {
				toast("请核对关键词");
				return false;
			}
			// if (!isCheckProduct) {
			//     toast("请核对商品链接地址");
			//     return false;
			// }
			if(!this.checkOrderNoStatus&&data.IsPresaleTask==1&&data.AcceptTaskStatus == 9){
				toast("订单未通过验证无法提交审核");
				return false
			}
			if (data.TaskType > 0 && (data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9))&&(data.IsAdvanceTask==0||(data.IsAdvanceTask==1&&data.AcceptTaskStatus==9))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))) {
				if (data.TaskType == 1 ) {
					if (!this.orderPrice) {
						toast("任务为垫付任务，请输入平台下单的订单金额");
						return false;
					}
					var reg = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,4})?$/;
					if (!reg.test(this.orderPrice) || this.orderPrice > 1000000000000) {
						toast("请输入正确的订单金额");
						return false;
					}
					if (!this.comfirmOrderNo) {
						toast("任务为垫付任务，请输入平台下单的订单号");
						return false;
					}
					if (data.TaskExpressId > 0) {
						if (!data.ConsigneeName) {
							toast("请填写平台下单的收货人名字");
							return false;
						}
						if (!data.ConsigneeMobile) {
							toast("请填写正确的收货人联系电话");
							return false;
						}
						if (!data.AccountProvinceCode || !data.AccountCityCode || !data.AccountDistrictCode) {
							toast("请选择平台下单的收货地址省市区");
							return false;
						}
						if (!data.AccountAddress) {
							toast("请输入平台下单的收货详细地址");
							return false;
						}
					}
				}
			}
			const imageBase64 = await this.base64Img();
			post('Task/SubmitTask',{
				UserId: this.userId,
				Token: this.token,
				TaskAcceptNo: this.TaskAcceptNo,
				// ImgJson: imageBase64,
				ImgJson: JSON.stringify(imageBase64),
				PlatOrderNo: this.comfirmOrderNo,
				PlatOrderMoney: this.orderPrice,
				ConsigneeName: data.ConsigneeName,
				ConsigneeMobile: data.ConsigneeMobile,
				ProvinceCode: data.AccountProvinceCode,
				CityCode: data.AccountCityCode,
				DistrictCode: data.AccountDistrictCode,
				AddressInfo: data.AccountAddress,
				ShopAroundjson:JSON.stringify(huobisanjiaJson)
			}).then(res=>{
				toast(res.msg);
				setTimeout(()=>{
					uni.reLaunch({url:'/pages/task/receivedtask'});
					// uni.navigateBack();
				},1500);
			})
		},
        // 获取地区列表
        getAreaList(){
            GetAreaList().then(res=>{
                this.areaList = res;
            });
        },
        // 显示城市选择
        showAreaSelect(){
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
			data.AccountProvinceCode = e.checkValue[0];
			data.AccountCityCode = e.checkValue[1];
			e.checkValue[2]&&(data.AccountDistrictCode = e.checkValue[2]);
            this.areaText = e.checkArr.join(' ');
		},
	  	// 上传图片
        upImg(obj){
			const that = this;
            getImgPath(1,[],['compressed']).then(path=>{
                that.screenshot[obj] = path[0]; 
            })
		},
		// 转base64图片
        async base64Img(){
            return new Promise(async (resolve,reject)=>{
				let base64Obj = {};
				const screenshot =  this.screenshot;
				let key = Object.keys(this.screenshot);
                for(let i = 0;i < key.length;i++){
					let res = '';
					const val = screenshot[key[i]];
					if(val){
						res = await pathToBase64(val);
					}
					if(res){
						base64Obj[key[i]]=res;
					}
				}
                resolve(base64Obj)
            })
		},
		// 操作剩余时间倒计时
		timerStart(countdown) {
			if(this.OperationCountdown) return;
			var i = parseInt(countdown);
			var alls = 60 * i;
			var h = parseInt(i / 60);
			var m = i - (h * 60);
			if (m == 0) {
				--h;
				m = 59;
			} else
				--m
			var s = 59;
			const that = this;
			this.OperationCountdown = setInterval(function() {
				if (alls <= 0) {
					clearInterval(that.OperationCountdown);
					toast("任务超时未处理，系统已取消");
					uni.navigateBack();
				} else {
					--s;
					--alls;
					if (m == 0 && h > 0 && alls > 0) {
						--h;
						m = 59
					}
					if (s == 0) {
						--m;
						s = 59;
					}

				}
			}, 1000);
		},
		// 查看示例
		showExamples(index){
			let img ='';
			switch(index){
				case 0:
					img = '/static/image/examplespic/firststep.jpg';
					break;
				case 1:
					img = '/static/image/examplespic/secondsteps.jpg';
					break;
				case 2:
					img = '/static/image/examplespic/thirdsteps.jpg';
					break;
				case 3:
					img = '/static/image/examplespic/fourthsteps.jpg';
					break;
				case 4:
					img = '/static/image/examplespic/exampleshop.jpg';
					break;
				case 5:
					img = 'http://www.mu352.com/images/shili.jpg';
					break;
				case 6:
					img = '/static/image/examplespic/hedui.jpg';
					break;

			}
			previewImage([img]);
		},
		back(){
			uni.navigateBack();
		},
		// 复制关键词或者淘口令
		copyWord(){
			const text = this.data.IsNewPasswordTask==1?this.data.OriginalPassword:this.data.KeyWord;
			this.copy(text);
		},
        copy(text){
            const res = h5Copy(text);
            if(res){
                toast('复制成功',true)
            }else{
                toast('复制失败，请重试！')
            }
        }
  }
}
</script>

<style>
	@import '../../css/task.css';
	.head .icon_r.txt{
		max-width:30%
	}
	.boxinput{
	border: 1px #000 solid!important;
	border-radius: 2px;
	height: 40px;
	line-height: 40px;
	}
	.titleHd{
		margin:0;
		margin-bottom:10px;
	}
	.cfff{
		color:#fff!important;
	}
	.flex-center{
		display:flex;
		align-items:center;
		flex-flow:row wrap;
	}
</style>
