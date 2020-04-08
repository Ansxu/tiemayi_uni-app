<template>
	<div class="bg_fff">
		<div class="h45">
			<div class="head bb_border">
				<p @click="back" class="btn_back"></p>
				<div class="title center">操作任务</div>
				<p href="#" class="icon_r txt">佣金 <span style="color: #ee7818;" id="taskCommission">0.00金</span></p>
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
						<div class="img fl porelative"><img :src="data.ProductImg"><img class="maskimg maskpic" src="/static/image/icons/maskBg.png" /></div>
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
						<div class="img fr presale-img" style="display:none" v-if="data.IsPresaleTask==1">
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
						<div class="g-name" style="font-size:0.16rem;font-weight:bold;">注：附加产品必须在店铺内找到，并一起下单</div>
					</block>
					<div class="g-name c_Org" v-if="data.IsPresaleTask==1">
						隔日单任务：{{data.PaymentStartTime}} 到 {{data.PaymentEndTime}}在{{data.PlatName}}平台去下单
						<p style="font-size:0.16rem;font-weight:bold;color:red;">不到订单支付时间不能拍下付款，否则该笔订单任务撤销（处罚10金一单）</p>
					</div>
				</div>
				<!--审核信息-->
				<div class="checkInfo">
					<p style="font-size:0.2rem; color:red;" v-if="data.Remark">说明：{{data.Remark}}</p>
					<div class="attachClaimImg">
						<p style="font-size:0.2rem; color:red;" v-if="data.AttachClaimImg||data.AttachClaimImg1||data.AttachClaimImg2">备注图片：</p>
						<div class="img_div" v-if="data.AttachClaimImg"><img :src="data.attachClaimImg" /></div> 
						<div class="img_div" v-if="data.AttachClaimImg1"><img :src="data.AttachClaimImg1" /></div> 
						<div class="img_div" v-if="data.AttachClaimImg2"><img :src="data.AttachClaimImg2" /></div> 
						<div style="clear:both;"></div>
					</div>
					<div class="itembox">
						<div class="titleHd"><span>任务要求</span></div>
						<ul class="ul-list">
							<li>
								<label>任务类型</label>
								<div class="txt-r"><span class="blue">{{(data.PlatType+data.AttachClaimImg1)||data.AttachClaimImg2?"(多商品任务)":""}}</span></div>
							</li>
							<li style="height:auto;">
								<label>{{data.IsNewPasswordTask==1?"搜索淘口令":"搜索关键词"}}</label>
								<div class="txt-r">
									<span class="keytext" id="proKeyWord">{{data.IsNewPasswordTask==1?data.OriginalPassword:data.KeyWord}}</span>
									<!-- onclick="CopyContent()" -->
									<a class="link_btn" >{{data.IsNewPasswordTask==1?"复制淘口令":"复制关键词"}}</a></div>
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
							<li>
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
						<div class="titleHd"><span>订单留言</span><span style="color:red; font-size:.13rem;">（任务如需订单留言的，下单时务必按要求操作）</span></div>
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
									<li v-if="data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9">
										<div class="img">
											 <!-- onclick="getpic(this,'ScreenshotMerchantProductSearch',20)" -->
											<div class="upimg"><img class="uploadImg" /></div>
											<input type="hidden" id="ScreenshotMerchantProductSearch" readonly="true" />
										</div>
										<p class="text">下单搜索列表</p>
									</li>
									<li v-if="data.CollectionCompetitiveProducts1==1&&data.AcceptTaskStatus!=9">
										<div class="img">
											<!-- onclick="getpic(this,'CollectionCompetitiveProducts1',20)" -->
											<div class="upimg" ><img class="uploadImg" /></div>
											<input type="hidden" id="CollectionCompetitiveProducts1" readonly="true" />
										</div>
										<p class="text">收藏竞品店铺</p>
									</li>
									<li v-if="data.CollectionCompetitiveProducts2==1&&data.AcceptTaskStatus!=9">
										<div class="img">
											 <!-- onclick="getpic(this,'CollectionCompetitiveProducts2',20)" -->
											<div class="upimg"><img class="uploadImg" /></div>
											<input type="hidden" id="CollectionCompetitiveProducts2" readonly="true" />
										</div>
										<p class="text">收藏竞品商品</p>
									</li>
									<li v-if="data.CollectionCompetitiveProducts3==1&&data.AcceptTaskStatus!=9">
										<div class="img">
											 <!-- onclick="getpic(this,'CollectionCompetitiveProducts3',20)" -->
											<div class="upimg"><img class="uploadImg" /></div>
											<input type="hidden" id="CollectionCompetitiveProducts3" readonly="true" />
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
									<a class="link_btn">点击查看示例</a>
									<!-- <a class="link_btn" onclick="showExamples(4)">点击查看示例</a> -->
								</div>
								<div class="Examine">
									<div style="text-align:center;">店铺名认证：{{data.ShopName}}</div>
									<div class="inputbox_group">
										<block v-for="(item,index) in data.ShopName" :key="index">
											<input v-if="item=='*'" class="input" name="shopname" type="text" placeholder="补全" maxlength="1" onblur="validationInput(this)" /> 
											<input v-else class="input" name="shopname" type="text" :value="item" readonly /> 
										</block>
									</div>
									 <!-- onclick="checkShop()" -->
									<a class="btn_100">补全后点我核对</a>
								</div>
							</div>
							<div class="Step Step-2" v-if="data.SetCommodityKeywords">
								<div class="No"><span>核对关键词是否正确  </span>
									<a class="link_btn">点击查看示例</a>
									<!-- <a class="link_btn" onclick="showExamples(5)">点击查看示例</a> -->
								</div>
								<div class="Examine">
									<div style="text-align:center;">关键词认证：{{data.SetCommodityKeywords}}</div>
									<div class="inputbox_group">
										<block v-for="(item,index) in data.SetCommodityKeywords" :key="index">
											<input v-if="item=='*'" class="input" name="Keywords" type="text" placeholder="补全" maxlength="1" onblur="validationInput(this)" />
											<input v-else class="input" name="Keywords" type="text" :value="item" readonly />
										</block>
									</div>
									<a class="btn_100" >补全后点我核对</a>
									<!-- <a class="btn_100" onclick="checkKeywords()">补全后点我核对</a> -->
								</div>
							</div>
						</block>

						<div class="Step Step-1" v-if="data.IsPresaleTask==1&&data.AcceptTaskStatus!=9">
							<div class="txtbox">
								<div class="piclist Uploadimg">
									<ul class="clear">
									<li v-if="(data.ShootTheNextDay==0||data.ShootTheNextDay==2)&&data.IsPresaleTask==1">
										<div class="img">
											<!-- <div class="upimg" onclick="getpic(this,'AddAShoppingCart',20)"> -->
											<div class="upimg">
												<img class="uploadImg" />
											</div>
											<input type="hidden" id="AddAShoppingCart" readonly="true" />
										</div>
										<p class="text">加购物车</p>
									</li>
									<li v-if="(data.ShootTheNextDay==1||data.ShootTheNextDay==2)&&data.IsPresaleTask==1">
										<div class="img">
											<!-- <div class="upimg" onclick="getpic(this,'CollectionOfGoods',20)"> -->
											<div class="upimg">
												<img class="uploadImg" />
											</div>
											<input type="hidden" id="CollectionOfGoods" readonly="true" />
										</div>
										<p class="text">收藏商品</p>
									</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="Step Step-1" v-if="data.IsComparisonShop==1&& data.TaskType==1&& data.AcceptTaskStatus!=9">
							<div class="No"><span>第一步&nbsp;货比三家</span>
								<!-- <a class="link_btn" onclick="showExamples(0)">点击查看示例</a> -->
								<a class="link_btn">点击查看示例</a>
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
											<input class="input" id="huobisanj1" style="width:300px" :value="data.ShoparoundLink1" type="text" placeholder="货比商品链接1" />
										</div>
									</div>
									<div class="from">
										<p>货比三家链接2</p>
										<div class="from-item mt10">
											<input class="input" id="huobisanj2" style="width:300px" :value="data.ShoparoundLink2" type="text" placeholder="货比商品链接2" />
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
												<div class="img">
												<!-- <div class="upimg" onclick="getpic(this,'jgotherA',20)"> -->
												<div class="upimg">
													<img class="uploadImg" />
												</div>
												<input type="hidden" id="jgotherA" readonly="true" />
												</div>
												<p class="text">加购竞品1</p>
											</li>
											<li v-if="data.JiaGoujp2==1">
												<div class="img">
													<div class="upimg">
													<!-- <div class="upimg" onclick="getpic(this,'jgotherB',20)"> -->
													<img class="uploadImg" /></div>
													<input type="hidden" id="jgotherB" readonly="true" />
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
												<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'scdpotherA',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="scdpotherA" readonly="true" />
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
											<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'collectionProduct',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="collectionProduct" readonly="true" />
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
											<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'cartImg',20)"> -->
													<img class="uploadImg" /></div>
												<input type="hidden" id="cartImg" readonly="true" />
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
												<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'fbbotherA',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="fbbotherA" readonly="true" />
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
												<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'dzotherA',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="dzotherA" readonly="true" />
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
												<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'llwdjotherA',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="llwdjotherA" readonly="true" />
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
												<div class="img">
												<div class="upimg">
												<!-- <div class="upimg" onclick="getpic(this,'twwdjotherA',20)"> -->
												<img class="uploadImg" /></div>
												<input type="hidden" id="twwdjotherA" readonly="true" />
												</div>
												<p class="text">提问“问大家”</p>
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div class="Step Step-3" v-if="(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)&&data.AcceptTaskStatus!=9">
								<div class="No"><span>{{data.IsSearchList==1||data.IsComparisonShop==1?"第二步":"第一步"}}&nbsp;浏览店铺</span>
									<!-- <a class="link_btn" onclick="showExamples(1)">点击查看示例</a> -->
									<a class="link_btn">点击查看示例</a>
								</div>
								<div class="txtbox">
									<p>1、根据商品主图、价格、名称等条件找到目标商品，从头到尾慢慢 浏览，停留至少5分钟 ，并上传宝贝链接核对
									</p>
									<block v-if="data.AcceptTaskStatus!=9">
										<div class="No"><span>核对主宝贝是否正确  </span>
											<!-- <a class="link_btn" onclick="showExamples(6)">点击查看示例</a> -->
											<a class="link_btn">点击查看示例</a>
										</div>
										<div class="Examine">
											<div class="piclist Uploadimg">
												<div class="from">
													<p>验证主宝贝链接</p>
													<div class="from-item mt10">
														<input class="input" name="goodslink" id="goodslink"  style="width:98%" :value="data.ShoparoundLink1" type="text" placeholder="商品链接" />
													</div>
												</div>
												<div class="from" v-if="data.ProductName2">
													<p>验证附加商品1链接</p>
													<div class="from-item mt10">
													<input class="input" name="goodslink" id="goodslink1" style="width:300px" :value="data.ShoparoundLink2" type="text" placeholder="附加商品链接1" />
													</div>
												</div>
												<div class="from" v-if="data.ProductName2">
													<p>验证附加商品2链接</p>
													<div class="from-item mt10">
													<input class="input" name="goodslink" id="goodslink2" style="width:100%" :value="data.ShoparoundLink2" type="text" placeholder="附加商品链接2" />
													</div>
												</div>
												<a class="btn_100">点我核对</a>
												<!-- <a class="btn_100" onclick="checkgoods()">点我核对</a> -->
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
												<input class="input" id="ShopProAlink" style="width:300px" :value="data.ShoparoundLink1" type="text" placeholder="店内宝贝链接1" />
											</div>
										</div>
										<div class="from">
											<p>店内宝贝链接2</p>
											<div class="from-item mt10">
												<input class="input" id="ShopProBlink" style="width:300px" :value="data.ShoparoundLink2" type="text" placeholder="店内宝贝链接2" />
											</div>
										</div>
									</div>
									<div class="piclist Uploadimg" v-if="data.IsBrowseStore==1&&data.TaskType!=2">
										<ul class="clear">
											<block v-if="(data.IsNewPasswordTask==0)&&(data.IsCompetingGoodsTask==0)&&(data.IsPresaleTask==0)&&(data.IsGoodTask==0)">
												<li>
													<div class="img">
														<div class="upimg">
														<!-- <div class="upimg" onclick="getpic(this,'targetTop',20)"> -->
															<img class="uploadImg" /></div>
														<input type="hidden" id="targetTop" readonly="true" />
													</div>
													<p class="text">目标商品顶部</p>
												</li>
												<li>
													<div class="img">
														<div class="upimg">
														<!-- <div class="upimg" onclick="getpic(this,'targetBottom',20)"> -->
															<img class="uploadImg" /></div>
														<input type="hidden" id="targetBottom" readonly="true" />
													</div>
													<p class="text">目标商品底部</p>
												</li>
												<li>
													<div class="img">
														<div class="upimg">
														<!-- <div class="upimg" onclick="getpic(this,'shopProA',20)"> -->
															<img class="uploadImg" /></div>
														<input type="hidden" id="shopProA" readonly="true" />
													</div>
													<p class="text">店内商品A</p>
												</li>
												<li>
													<div class="img">
														<div class="upimg">
														<!-- <div class="upimg" onclick="getpic(this,'shopProB',20)"> -->
															<img class="uploadImg" /></div>
														<input type="hidden" id="shopProB" readonly="true" />
													</div>
													<p class="text">店内商品B</p>
												</li>
											</block>
											<block v-if="data.TaskType==1&&(data.ProductName1||data.ProductName2)">
												<block v-if="data.ProductName1">
													<li>
														<div class="img">
															<div class="upimg">
															<!-- <div class="upimg" onclick="getpic(this,'AdditionalProductA1',20)"> -->
																<img class="uploadImg" /></div>
															<input type="hidden" id="AdditionalProductA1" readonly="true" />
														</div>
														<p class="text">附加商品1顶部</p>
													</li>
													<li>
														<div class="img">
															<div class="upimg">
															<!-- <div class="upimg" onclick="getpic(this,'AdditionalProductB1',20)"> -->
																<img class="uploadImg" /></div>
															<input type="hidden" id="AdditionalProductB1" readonly="true" />
														</div>
														<p class="text">附加商品1底部</p>
													</li>
												</block>
												<block v-if="data.ProductName2">
													<li>
														<div class="img">
															<div class="upimg">
															<!-- <div class="upimg" onclick="getpic(this,'AdditionalProductA2',20)"> -->
																<img class="uploadImg" /></div>
															<input type="hidden" id="AdditionalProductA2" readonly="true" />
														</div>
														<p class="text">附加商品2顶部</p>
													</li>
													<li>
														<div class="img">
															<div class="upimg">
															<!-- <div class="upimg" onclick="getpic(this,'AdditionalProductB2',20)"> -->
																<img class="uploadImg" /></div>
															<input type="hidden" id="AdditionalProductB2" readonly="true" />
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
													<div class="img">
														<div class="upimg">
														<!-- <div class="upimg" onclick="getpic(this,'collectionShop',20)"> -->
															<img class="uploadImg" /></div>
														<input type="hidden" id="collectionShop" readonly="true" />
													</div>
												</li>
											</ul>
										</div>
									</block>

								</div>
							</div>
							<block v-if="data.TaskType==1">
								<div class="Step Step-4" v-if="(data.ChatPlaceAnOrder>0&&(data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9)))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))">
									 <!-- onclick="showExamples(2)" -->
									<div class="No"><span>{{(data.IsSearchList==1||data.IsComparisonShop==1)?(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)?"第三步":"第二步":"第一步"}}&nbsp;下单核对</span><a style="display:none" class="link_btn">点击查看示例</a></div>
									<div class="txtbox">
										<p>1、把商品加入购物车，确认件数，颜色尺码，如需留言按要求留言，拍下订单
										</p>
										<p class="red">2、拍下订单后先不要付款，复制订单进行验证后，再付款</p>
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10"><input class="input orderNo" type="text" placeholder="请输入下单单号" /></div>
										</div>
										<div class="ftbtn mb10 mt10">
											<a class="btn" id="heduiBtn" >点我核对</a>
											<!-- <a class="btn" id="heduiBtn" onclick="verifyTask({{data.IsAmoy}},{{data.isYanOrder}})">点我核对</a> -->
										</div>
									</div>
								</div>
								<div class="Step Step-5" v-if="(data.IsPresaleTask==0||(data.IsPresaleTask==1&&data.AcceptTaskStatus==9))&&(data.IsCompetingGoodsTask==0||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus==9))">
									<div class="No">
										<span>
										{{(data.IsSearchList==1||data.IsComparisonShop==1)?(data.IsBrowseStore==1||data.IsCollectionShop==1||data.IsCollectionProduct==1||data.IsAddCart==1)?data.ChatPlaceAnOrder>0?"第四步":"第三步":"第二步":"第一步"}}&nbsp;平台下单信息
										</span>
										<a style="display:none" class="link_btn">点击查看示例</a>
										<!-- <a style="display:none" class="link_btn"onclick="showExamples(3)">点击查看示例</a> -->
											</div>
									<block v-if="data.isYanOrder">
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10"><input class="input orderNo" type="text" placeholder="请输入下单单号"  readonly/></div>
										</div>
										<div class="from">
											<p>订单金额：（订单付款金额）</p>
											<div class="from-item mt10"><input class="input" id="orderMoney" type="text" placeholder="请输入订单支付金额" readonly/></div>
										</div>
									</block>
									<block v-else>
										<div class="from">
											<p>订单编号：（订单详情中复制）</p>
											<div class="from-item mt10"><input class="input orderNo" type="text" placeholder="请输入下单单号"/></div>
										</div>
										<div class="from">
											<p>订单金额：（订单付款金额）</p>
											<div class="from-item mt10"><input class="input" id="orderMoney" type="text" placeholder="请输入订单支付金额"/></div>
										</div>
									</block>
									<block v-if="data.TaskExpressId>0">
										<!-- onclick="lookmore()" -->
										<p style="color:red; font-size:.15rem; padding-top:5px;">注意：下面填写的收货地址一定要和平台下单的订单收货地址一致<img class="fr"  style="width:.26rem;height:.26rem;" src="/static/image/icons/more.png" /></p>
										<div id="userinfo" style="display:none">
										<div class="from">
											<p>订单收货联系人：</p>
											<div class="from-item mt10"><input class="input" id="consignee" :value="data.ConsigneeName" type="text" placeholder="请输入联系人名字" /></div>
										</div>
										<div class="from">
											<p>订单收货联系电话：</p>
											<div class="from-item mt10"><input class="input" id="consigneeMobile" :value="data.ConsigneeMobile" type="text" placeholder="请输入联系电话" /></div>
										</div>
										<div class="from">
											<p>订单收货地址：</p>
											<div class="from-item mt10">
												<!-- onclick="picker3()" -->
												<input type="text" class="input" id="area" :value="data.AccountAreaText" placeholder="请选择城市"  />
												<span class="icon-arrow icon-arrowRight"></span>
											</div>
											<input type="hidden" id="provinceCode" :value="data.AccountProvinceCode" readonly="true" />
											<input type="hidden" id="cityCode" :value="data.AccountCityCode" readonly="true" />
											<input type="hidden" id="districtCode" :value="data.AccountDistrictCode" readonly="true" />
										</div>
										<div class="from">
											<p>订单收货详细地址：</p>
											<div class="from-item mt10"><input class="input" id="xiangxidizhi" :value="data.AccountAddress" type="text" placeholder="请输入详细地址" /></div>
										</div>
										</div>
									</block>
								</div>
							</block>
						</div>
					</div>
				</div>
				<p style="font-size:0.16rem;font-weight:bold;color:red;" v-if="((data.IsPresaleTask==1&&data.AcceptTaskStatus!=9))||(data.IsCompetingGoodsTask==1&&data.AcceptTaskStatus!=9)">不到订单支付时间不能拍下付款，否则该笔订单任务撤销（处罚10金一单）</p>
				<div class="ftbtn mb10 mt10">
					<!-- onclick="submitTask()" -->
					<a class="btn" id="submitBtn" >提交审核</a>
				</div>
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
        data:{},
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.TaskAcceptNo = options.TaskAcceptNo;
    this.getData();
  },
  onShow() {},
  methods: {
		getData(){
			post('Task/LoadOperationalTask',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo
			}).then(res=>{
				this.data = res.obj;
			})
		},
		back(){
			uni.navigateBack();
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
	height: .4rem;
	line-height: .4rem;
	}
</style>
