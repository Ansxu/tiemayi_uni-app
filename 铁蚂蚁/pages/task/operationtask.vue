<template>
	<div class="bg_fff">
		<div class="h45">
		        <div class="head bb_border">
		            <a href="javascript:api.closeWin();" class="btn_back"></a>
		            <div class="title center">操作任务</div>
		            <a href="#" class="icon_r txt">佣金 <span style="color: #ee7818;" id="taskCommission">6.00金</span></a>
		        </div>
		    </div>
		    <div class="main mt10">
		        <div class="order-detail" id="taskInfo">
					<!--开始-->
					<div class="topInfo">
					    <div class="title"><span>店铺名称：店铺名称</span></div>
					    <div class="g-name">
							<span>目标商品</span>
							<span class="fr" v-if="TaskType==1">垫付总金额：<em class="c_Org">300元</em>
							</span>
						</div>
					    <div class="dl clear">
					        <div class="img fl"><img src="/static/logo.png"></div>
					        <div class="box_r">
					            <p class="text">产品名称</p>
					            <p class="text">单件商品单价：<span class="c_Org">300元</span></p>
					              <p class="text">单件商品展示单价：<span class="c_Org">300元</span></p>
					            <p class="text" v-if="TaskType==1">件数：30</p>
					            <p class="text">下单规格尺寸：白色</p>
					            <p class="text c_Org">收藏</p>
					            <p class="text c_Org" v-if="TaskType==2">普通浏览任务:收藏</p>
					        </div>
					        <div class="img fr presale-img" v-if="IsPresaleTask==1">
					          <img src="/static/image/nav/presaletask.png" />
					        </div>
					    </div>
					    <div class="g-name" v-if="TaskType==1"><span>附加商品1</span></div>
					    <div class="dl clear">
					        <div class="img fl"><img src="/static.logo.png"></div>
					        <div class="box_r">
					            <p class="text">产品名称</p>
					            <p class="text">单件商品单价：<span class="c_Org">300元</span></p>
					            <p class="text">单件商品展示单价：<span class="c_Org">300元</span></p>
					            <p class="text">件数：30</p>
					        </div>
					    </div>
					    
					    <div class="g-name"><span>附加商品2</span></div>
					    <div class="dl clear">
					        <div class="img fl"><img src="/static.logo.png"></div>
					        <div class="box_r">
					            <p class="text">产品呢明</p>
					            <p class="text">单件商品单价：<span class="c_Org">300元</span></p>
					            <p class="text">单件商品展示单价：<span class="c_Org">300元</span></p>
					            <p class="text">件数：20</p>
					        </div>
					    </div>
					   
					    <div class="g-name" style="font-size:0.16rem;font-weight:bold;">注：附加产品必须在店铺内找到，并一起下单</div>
					   
					    <div class="g-name c_Org" v-if="IsPresaleTask==1">
					        预售任务：2020-03-32 到 2020--4-54在hhaa平台去下单
					        <p style="font-size:0.16rem;font-weight:bold;color:red;">不到订单时间支付不能拍下付款，否则该笔订单无效</p>
					    </div>
					    
					</div>
					<!--审核信息-->
					<div class="checkInfo">
					    <p style="font-size:0.2rem; color:red;">说明：Remark</p>
					   
					    <div class="attachClaimImg">
					       
					        <p style="font-size:0.2rem; color:red;">备注图片：</p>
					        
					        <div class="img_div"><img src="/static/logo.png" /></div> 
					        <div class="img_div"><img src="/static/logo.png" /></div>
					        <div class="img_div"><img src="/static/logo.png" /></div>
					        <div style="clear:both;"></div>
					    </div>
					    <div class="itembox">
					        <div class="titleHd"><span>任务要求</span></div>
					        <ul class="ul-list">
					            <li>
					                <label>任务类型</label>
					                <div class="txt-r"><span class="blue"></span></div>
					            </li>
					           
					          <li>
					              <label>活动类型</label>
					              <div class="txt-r"><span class="blue">ChannelTypeName</span></div>
					          </li>
					            <li style="height:auto;">
					                <label>搜索关键词/淘口令</label>
					                <div class="txt-r">
					                    <span class="keytext" id="proKeyWord">KeyWord</span>
					                     <a class="link_btn" onclick="CopyContent()">复制淘口令</a></div> 
					            </li>
					           
					            <li>
					                <label>评价要求</label>
					                <div class="txt-r"><span>EvaluationTitle</span></div>
					            </li>
					            <li>
					                <label>购买数量</label>
					                <div class="txt-r"><span>目标商品ProductNum件</span></div>
					            </li>
					            <li>
					                <label>发货地</label>
					                <div class="txt-r"><span>ProductAddress</span></div>
					            </li>
					            
					            <li>
					                <label>排序方式</label>
					                <div class="txt-r"><span>SortBy</span></div>
					            </li>
					            <li>
					                <label>付款/收货数</label>
					                <div class="txt-r"><span>PayNumber人</span></div>
					            </li>
					        
					            <li>
					                <label>价格区间</label>
					                <div class="txt-r"><span>StartPrice元 ~ EndPrice元</span></div>
					            </li>
					            <li>
					                <label style="font-size:.16rem;font-weight:bold;color:red;">下单时请与商家聊天</label>
					            </li>
					        </ul>
					    </div>
					    <div class="itembox">
					        <div class="titleHd"><span>订单留言</span><span style="color:red; font-size:.13rem;">(任务如需订单留言的，
							下单时务必按要求操作)</span></div>
					        <div class="txtbox c_Org">ShopMessage</div>
					    </div>
					    <div class="itembox">
							
					    </div>
					    <div class="itembox">
					        <div class="titleHd"><span>任务步骤</span></div>
					        <div class="StepBox">
					            <div class="Step Step-1">
					                <div class="No"><span>第一步&nbsp;货比三家</span><a class="link_btn" onclick="showExamples(0)">点击查看示例</a></div>
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范 围，对搜索结果页面截一张图
					                    </p>
					                    <p>4、随机点开搜索列表中别家的任意2个商品，慢慢滑动浏览商品直 到底部（分别浏览一分钟以上）然后复制并上传分享链接
					                    </p>
					                    <div class="Step Step-5">
							
							
					                              <div class="from">
					                                  <p>货比三家链接1</p>
					                                  <div class="from-item mt10">
					                                      <input class="input" id="huobisanj1" style="width:300px" value="ShoparoundLink1"
														   type="text" placeholder="货比商品链接1" />
							
					                                  </div>
					                              </div>
							
					                                <div class="from">
					                                    <p>货比三家链接2</p>
					                                    <div class="from-item mt10">
					                                       <input class="input" id="huobisanj2" style="width:300px" value="ShoparoundLink2" 
														   type="text" placeholder="货比商品链接2" />
					                                    </div>
					                                </div>
							
							
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范 围，对搜索结果页面截一张图
					                    </p>
					                    <p>4、随机点开搜索列表中别家的任意商品，收藏别家的商品，然后上传截图
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'searchImgsc',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="searchImgsc" readonly="true" />
					                                </div>
					                                <p class="text">搜索结果</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'scotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="scotherA" readonly="true" />
					                                </div>
					                                <p class="text">收藏竞品1</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'scotherB',20)">
					                                    <img class="uploadImg" /></div>
					                                    <input type="hidden" id="scotherB" readonly="true" />
					                                </div>
					                                <p class="text">收藏竞品2</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求设置筛选价格区间、所在地、类目等搜索条件缩小查询范 围，对搜索结果页面截一张图
					                    </p>
					                    <p>4、随机点开搜索列表中别家的任意商品，加购别家的商品，然后上传截图
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'searchImgjg',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="searchImgjg" readonly="true" />
					                                </div>
					                                <p class="text">搜索结果</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'jgotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="jgotherA" readonly="true" />
					                                </div>
					                                <p class="text">加购竞品1</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'jgotherB',20)">
					                                    <img class="uploadImg" /></div>
					                                    <input type="hidden" id="jgotherB" readonly="true" />
					                                </div>
					                                <p class="text">加购竞品2</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatNam应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求找到本商品店铺并对其收藏，截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'scdpotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="scdpotherA" readonly="true" />
					                                </div>
					                                <p class="text">收藏店铺</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求找到本商品并对其收藏，截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                            <div class="img">
					                                <div class="upimg" onclick="getpic(this,'collectionProduct',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="collectionProduct" readonly="true" />
					                            </div>
					                                <p class="text">收藏商品</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求找到本商品并对其加入购物车，截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                            <div class="img">
					                                <div class="upimg" onclick="getpic(this,'cartImg',20)"><img class="uploadImg" /></div>
					                                <input type="hidden" id="cartImg" readonly="true" />
					                            </div>
					                                <p class="text">加入购物车</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求浏览本店其他商品 慢慢滑动浏览商品直到底部（浏览一分钟以上），截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'fbbotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="fbbotherA" readonly="true" />
					                                </div>
					                                <p class="text">浏览副宝贝</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、按要求给本商品点赞并截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'dzotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="dzotherA" readonly="true" />
					                                </div>
					                                <p class="text">点赞好评</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、找到“问大家”功能并浏览页面至底部（一分钟以上），截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'llwdjotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="llwdjotherA" readonly="true" />
					                                </div>
					                                <p class="text">浏览“问大家”</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>
					            <div class="Step Step-1">
							
					                <div class="txtbox">
					                    <p>1、请确认使用接单账号登录PlatName应用</p>
					                    <p>2、点击搜索框粘贴指定的关键词</p>
					                    <p>3、找到“问大家”功能并且提问，提问成功后截图上传
					                    </p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
							
					                            <li>
					                                <div class="img">
					                                <div class="upimg" onclick="getpic(this,'twwdjotherA',20)">
					                                <img class="uploadImg" /></div>
					                                <input type="hidden" id="twwdjotherA" readonly="true" />
					                                </div>
					                                <p class="text">提问“问大家”</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div
					            <div class="Step Step-2">
					                <div class="No"><span>核对店铺是否正确  </span><a class="link_btn" onclick="showExamples(4)">点击查看示例</a></div>
					                <div class="Examine">
					                    <div style="text-align:center;">店铺名：ShopName</div>
					                    <div class="inputbox_group">
											<input class="input" name="shopname"
											 type="text" placeholder="补全" maxlength="1" onblur="validationInput(this)" /> 
					                        <input class="input" name="shopname" type="text" value="" readonly />
					                    </div>
					                    <a class="btn_100" onclick="checkShop()">补全后点我核对</a>
					                </div>
					            </div>
					            
					            <div class="Step Step-3">
					                <div class="No"><span>浏览店铺</span>
									<a class="link_btn" onclick="showExamples(1)">点击查看示例</a></div>
					                <div class="txtbox">
					                  
					                      <p>1、根据商品主图、价格、名称等条件找到目标商品，进入商品店铺并截图一张附有店铺名的截图</p>
					                      <p>2、随机点开店铺里任意2个商品，分别慢慢滑动浏览商品详情值到底部（分别浏览一分钟以上）</p>
					                      <p>3、进入“我的”打开“我的足迹”并截图一张</p>
					                    
					                      <p>1、根据商品主图、价格、名称等条件找到目标商品，从头到尾慢慢浏览，停留至少3分钟，并在页面头部和底部分别截图</p>
					                      <p>2、点击“进入店铺”按钮随机点开店铺里任意2个商品，分别慢慢滑动浏览商品详情值到底部（分别浏览一分钟以上）
										  分别截图一张商品底部图片</p>
					                      <p>3、如有带附加商品，上一步中随机点的2个商品换成任务要求的附加商品，分别慢慢滑动浏览商品详情直到底部（分别浏览一分钟以 
										  上）分别截图一张商品底部图片，按照图片下面的文字来上传相应的图片</p>
					                    
					                    
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'targetTop',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="targetTop" readonly="true" />
					                                </div>
					                                <p class="text">'店铺名截图':'关键词搜索截图'</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'targetBottom',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="targetBottom" readonly="true" />
					                                </div>
					                               <p class="text">'店铺名截图':'关键词搜索截图'</p>
					                            </li>
					                             
					                            <li style='display:none;'>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'shopProA',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="shopProA" readonly="true" />
					                                </div>
					                                <p class="text">店内商品A</p>
					                            </li>
					                            <li  style='display:none;'>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'shopProB',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="shopProB" readonly="true" />
					                                </div>
					                                <p class="text">店内商品B</p>
					                            </li>
					                           
					                            
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'AdditionalProductA1',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="AdditionalProductA1" readonly="true" />
					                                </div>
					                                <p class="text">附加商品1顶部</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'AdditionalProductB1',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="AdditionalProductB1" readonly="true" />
					                                </div>
					                                <p class="text">附加商品1底部</p>
					                            </li>
					                            
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'AdditionalProductA2',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="AdditionalProductA2" readonly="true" />
					                                </div>
					                                <p class="text">附加商品2顶部</p>
					                            </li>
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'AdditionalProductB2',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="AdditionalProductB2" readonly="true" />
					                                </div>
					                                <p class="text">附加商品2底部</p>
					                            </li>
					                           
					                        </ul>
					                    </div>
					                   
					                    <p>收藏店铺</p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'collectionShop',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="collectionShop" readonly="true" />
					                                </div>
					                            </li>
					                        </ul>
					                    </div>
					                   
					                </div>
					            </div>
					            
					            <div class="Step Step-4">
					               
					                <div class="No"><span>"第三步":"第二步":"第一步",下单支付</span><a class="link_btn"
									 onclick="showExamples(2)">点击查看示例</a></div>
					                <div class="txtbox">
					                    <p>1、把商品加入购物车，确认件数，颜色尺码，如需留言按要求留言， 下单付款
					                    </p>
					                    <p>2、付款完成后，点击进入订单详情页面，截图一张</p>
					                    <div class="piclist Uploadimg">
					                        <ul class="clear">
					                            <li>
					                                <div class="img">
					                                    <div class="upimg" onclick="getpic(this,'orderDetailsImg',20)"><img class="uploadImg" /></div>
					                                    <input type="hidden" id="orderDetailsImg" readonly="true" />
					                                </div>
					                                <p class="text">'支付成功截图':'订单详情截图'</p>
					                            </li>
					                        </ul>
					                    </div>
					                </div>
					            </div>

					            <div class="Step Step-5">
					                <div class="No"><span>'拼多多'?"第四步":"第三步":"第二步":
									"第一步"}}&nbsp;平台下单信息</span><a class="link_btn"
					                        onclick="showExamples(3)">点击查看示例</a></div>
					                <div class="from">
					                    <p>订单金额：（订单付款金额）</p>
					                    <div class="from-item mt10"><input class="input" id="orderMoney" type="text" placeholder="请输入订单支付金额" /></div>
					                </div>
					                <div class="from">
					                    <p>订单编号：（订单详情中复制）</p>
					                    <div class="from-item mt10"><input class="input" id="orderNo" type="text" placeholder="请输入下单单号" /></div>
					                </div>
					                
					                <p style="color:red; font-size:.15rem; padding-top:5px;">注意：下面填写的收货地址一定要和平台下单的订单收货地址一致</p>
					                <div class="from">
					                    <p>订单收货联系人：</p>
					                    <div class="from-item mt10"><input class="input" id="consignee" value="" type="text"
										 placeholder="请输入联系人名字" /></div>
					                </div>
					                <div class="from">
					                    <p>订单收货联系电话：</p>
					                    <div class="from-item mt10"><input class="input" id="consigneeMobile" value=""
										 type="text" placeholder="请输入联系电话" /></div>
					                </div>
					                <div class="from">
					                    <p>订单收货地址：</p>
					                    <div class="from-item mt10">
					                        <input type="text" class="input" id="area" value="" placeholder="请选择城市"
											 onclick="picker3()" />
					                        <span class="icon-arrow icon-arrowRight"></span>
					                    </div>
					                    <input type="hidden" id="provinceCode" value="" readonly="true" />
					                    <input type="hidden" id="cityCode" value="" readonly="true" />
					                    <input type="hidden" id="districtCode" value="" readonly="true" />
					                </div>
					                <div class="from">
					                    <p>订单收货详细地址：</p>
					                    <div class="from-item mt10"><input class="input" id="xiangxidizhi" value=""
										 type="text" placeholder="请输入详细地址" /></div>
					                </div>
					               
					            </div>
					            
					        </div>
					    </div>
					</div>
							
					<div class="ftbtn mb10">
					    <a class="btn" id="submitBtn" onclick="submitTask()">提交审核</a>
					</div>
					<!--结束-->
		
		        </div>
		</div>
	</div>
</template>

<script>
</script>

<style>
	@import '../../css/task.css';
	.head .icon_r.txt{
		max-width:30%
	}
</style>
