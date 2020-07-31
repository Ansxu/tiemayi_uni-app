<template>
  <div class="bg_fff">
    <headers>选择任务操作</headers>
    <div class="main">
      <div class="order-detail" id="taskInfo"></div>
            <div class="shopId">
                <span class="id">商家ID:{{data.SellerID}}</span>
            </div>
            <div class="topInfo">
                <div class="g-name">
                    <span>目标商品</span>
                    <span class="fr">任务状态：<em class="c_Org">{{data.AcceptTaskStatusText}}</em></span></div>
                <div class="dl clear">
                    <div class="img fl">
                        <img :src="data.ProductImg">
                        <img class="maskimg" src="/static/image/icons/maskBg.png" />
                    </div>
                    <div class="box_r">
                        <p class="text">{{data.ProductName}}</p>
                        <p class="text">商品价格 <span class="c_Org">{{data.ProductPrice}}元</span></p>
                        <p class="text" v-if="data.TaskType==1">件数 <span class="c_Org">{{data.ProductNum}}</span></p>
                        <p class="text" v-if="data.AcceptTaskStatus==0"><span id="count_down" class="c_Org">{{timeEnd}}</span>
                        </p>
                    </div>
                    <div class="img fr presale-img" v-if="data.IsAdvanceTask==1">
                        <img src="/static/image/nav/presaletask.png" />
                    </div>
                </div>
				<div class="g-name c_Org"  v-if="data.IsPresaleTask==1||data.IsCompetingGoodsTask==1||data.IsAdvanceTask==1">
					<block v-if="IsTrialStatus==1">
						商家审号任务：{{data.TrialNumberTime}} 分钟内审号完成,请稍等片刻
						<p style="font-size:0.16rem;font-weight:bold;color:red;">商家审号通过才能操作，否则该笔订单无效</p>
					</block>
						<!-- {{data.IsPresaleTask==1?"隔日单任务：":"竞品黑科技任务："}}{{data.PaymentStartTime}} 到 {{data.PaymentEndTime}}在{{data.PlatName}}平台去下单
						<p style="font-size:16px;font-weight:bold;color:red;">不到订单支付时间不能拍下付款，否则该笔订单任务撤销（处罚10金一单）</p> -->
                        {{data.IsPresaleTask==1?"隔日单任务：":(data.IsCompetingGoodsTask==1?"竞品黑科技任务：":"预售单任务：")}}{{data.PaymentStartTime}} 到 {{data.PaymentEndTime}}在{{data.PlatName}}平台去下单
				</div>
				<div class="g-name c_Org"  v-if="data.IsTrialStatus==1">
						商家审号任务：{{data.TrialNumberTime}} 分钟内审号完成,请稍等片刻
						<p style="font-size:0.16rem;font-weight:bold;color:red;">商家审号通过才能操作，否则该笔订单无效</p>
				</div>
                <!-- <div class="g-name c_Org" v-if="data.IsPresaleTask==1">
                        预售任务：{{data.PaymentStartTime}} 到 {{data.PaymentEndTime}}在{{data.PlatName}}平台去下单
                        <p style="font-size:16px;font-weight:bold;color:red;">不到订单时间支付不能拍下付款，否则该笔订单无效</p>
                </div>
                <div class="g-name c_Org" v-if="data.IsTrialStatus==1">
                        商家审号任务：{{data.TrialNumberTime}} 分钟内审号完成,请稍等片刻
                        <p style="font-size:16px;font-weight:bold;color:red;">	商家审号通过才能操作，否则该笔订单无效</p>
                </div> -->
            </div>
            <div class="StatusInfo">
                <div class="Btns mb10">
                    <p :class="['btn',{'cur':data.IsTrialStatus!==1&&(data.AcceptTaskStatus<1||(data.AcceptTaskStatus==9&&data.PayCountdown>0)||(data.AcceptTaskStatus==9&&data.CompetingGoodsCountdown>0))}]" @click="operationTask">
                        <!-- href="{{=(data.AcceptTaskStatus<=1||(data.AcceptTaskStatus==9&&data.PayCountdown>0))&&(data.IsTrialStatus==0||data.IsTrialStatus==2)?" javascript:operationTask(); ":"javascript:; "}}"> -->
                        {{data.AcceptTaskStatus==1?"重新提交":data.AcceptTaskStatus==9&&data.PayCountdown>0?"下单提交":"操作任务"}}
                    </p>
                    <p :class="['btn',{'cur':(data.AcceptTaskStatus==4||data.AcceptTaskStatus==2)&&data.IsAppeal==0}]" @click="showAppeal">
                    <!-- href="{{=(data.AcceptTaskStatus==4||data.AcceptTaskStatus==2)&&data.IsAppeal==0?" javascript:showAppeal(); ":"javascript:; "}}"> -->
                    申诉任务</p>
                    <p :class="['btn',{'cur':data.AcceptTaskStatus==0||data.AcceptTaskStatus==9}]" 
                        @click="onShowCancelTask">
                        <!-- href="{{data.AcceptTaskStatus==0||data.AcceptTaskStatus==9?" javascript:cancelTheTask(); ":"javascript:; "}}"> -->
                    取消任务</p> 
                    <p style="color:red; font-size:18px;" class="text_l" v-if="data.AcceptTaskStatus==4">拒绝返款原因：{{data.SellerDenialReason}}</p>
                </div>
                <div class="stepInfo">
                    <ul>
                        <li class="no1 end">
                            <i class="icon num">1</i>
                            <dl>
                                <dt><label>接受任务</label><span>{{data.CreateTime}}</span></dt>
                                <dd v-if="data.AcceptTaskStatus==2&&data.PlatOrderNo">
                                    <label>提交订单号</label><span id="txt_platOrderNo">{{data.PlatOrderNo}}</span>
                                    <p class="link_btn copybtn" @click="copy(data.PlatOrderNo)">复制</p>
                                </dd>
                                <dd>
                                    <label>任务编号</label><span id="txt_taskNo">{{data.TaskNo}}</span>
                                    <p class="link_btn copybtn"  @click="copy(data.TaskNo)">复制</p>
                                </dd>
                                <dd>
                                    <label>接单号</label><span id="txt_taskAcceptNo">{{data.TaskAcceptNo}}</span>
                                    <p class="link_btn copybtn" @click="copy(data.TaskAcceptNo)">复制</p>
                                </dd>
                                <dd><label>接单账号</label><span>{{data.AccountName}}</span></dd>
                                <dd v-if="data.TaskType==1"><label>垫付金额</label><span>{{data.Amount}}元</span></dd>
                            </dl>
                        </li>
                        <li :class="['no2',{'active':(data.AcceptTaskStatus>0&&data.AcceptTaskStatus!=5&&data.AcceptTaskStatus!=6)}]">
                            <i class="icon num">2</i>
                            <dl>
                                <dt><label>任务信息</label></dt> 
                                <!-- 红鸟隐藏 -->
                                <!-- <dd v-if="data.ChannelType!=0"><label>任务指导图</label></dd>
                                <dd v-if="data.ChannelType!=0">
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                            <img :src="data.StepImg" v-if="data.StepImg">
                                        </span>
                                        <span class="img">
                                            <img :src="data.StepImg1" v-if="data.StepImg1">
                                        </span>
                                        <span class="img">
                                            <img  :src="data.StepImg2" v-if="data.StepImg2">
                                        </span>
                                        <span class="img">
                                            <img  :src="data.StepImg3" v-if="data.StepImg3">
                                        </span>
                                        <span class="img">
                                            <img  :src="data.StepImg4" v-if="data.StepImg4">
                                        </span>
                                    </div>
                                </dd> -->
                                <block v-if="data.IsSearchList==1&&data.ImgJson&&data.ImgJson.SearchPageImg">
                                    <dd><label>搜索列表</label></dd>
                                    <dd>
                                        <div class="imglist thumbnails">
                                            <span class="img">}
                                                <img :src="data.ImgJson.SearchPageImg" @click="previewImage([data.ImgJson.SearchPageImg])">
                                            </span>
                                        </div>
                                    </dd>
                                </block>
								
								<block v-if="data.ImgJson&&data.ImgJson.CollectionCompetitiveProducts1&&data.IsCompetingGoodsTask==1">
								<dd><label>收藏竞品店铺</label></dd>
								<dd>
											<div class="imglist thumbnails">
												<span class="img">
													<img :src="data.ImgJson.CollectionCompetitiveProducts1" @click="previewImage([data.ImgJson.CollectionCompetitiveProducts1])">
												</span>
											</div>
								</dd>
								</block>
                                <block v-if="data.ImgJson&&data.ImgJson.CollectionCompetitiveProducts2&&data.IsCompetingGoodsTask==1">
								<dd><label>收藏竞品商品</label></dd>
								<dd>
											<div class="imglist thumbnails">
												<span class="img">
													<img :src="data.ImgJson.CollectionCompetitiveProducts2" @click="previewImage([data.ImgJson.CollectionCompetitiveProducts2])">
												</span>
											</div>
								</dd>
                                </block>
                                <block v-if="data.ImgJson&&data.ImgJson.CollectionCompetitiveProducts3&&data.IsCompetingGoodsTask==1">
								<dd><label>加竞品购物车</label></dd>
								<dd>
											<div class="imglist thumbnails">
												<span class="img">
													<img :src="data.ImgJson.CollectionCompetitiveProducts3" @click="previewImage([data.ImgJson.CollectionCompetitiveProducts3])">
												</span>
											</div>
								</dd>
								</block>
								

                                

                                <block v-if="data.HuoBisj==1 &&data.ImgJson&& data.IsAddedservices==1 &&data.TaskType==1">
                                    <dd><label>货比三家主图</label></dd>
                                    <dd>
                                                <div class="imglist thumbnails">
                                                    <span class="img">
                                                        <img :src="data.ImgJson.ShopAroundlink1" v-if="data.ImgJson.ShopAroundlink1" @click="previewImage([data.ImgJson.ShopAroundlink1])">
                                                    </span>
                                                </div>
                                                <div class="imglist thumbnails">
                                                    <span class="img">
                                                        <img :src="data.ImgJson.ShopAroundlink2" v-if="data.ImgJson.ShopAroundlink2" @click="previewImage([data.ImgJson.ShopAroundlink2])">
                                                    </span>
                                                </div>
                                    </dd>
								</block>
                                <block v-if="data.IsPresaleTask==1&&data.ImgJson">
                                    <dd><label>隔天收藏加购图</label></dd>
                                    <dd>
                                                <div class="imglist thumbnails">
                                                    <span class="img">
                                                        <img :src="data.ImgJson.AddAShoppingCart" v-if="data.ImgJson.AddAShoppingCart" @click="previewImage([data.ImgJson.AddAShoppingCart])">
                                                    </span>
                                                    <span class="img">
                                                        <img :src="data.ImgJson.CollectionOfGoods" v-if="data.ImgJson.CollectionOfGoods" @click="previewImage([data.ImgJson.CollectionOfGoods])">
                                                    </span>
                                                </div>
                                    </dd>
								</block>
                                <!-- <block v-if="data.TaskType!=2&&data.IsBrowseStore==1&&data.IsPresaleTask==0&&data.IsGoodTask==0&&(data.IsCompetingGoodsTask==0)&&data.IsNewPasswordTask==0"> -->
                                <block v-if="data.IsBrowseStore==1&&data.IsPresaleTask==0&&data.IsGoodTask==0&&(data.IsCompetingGoodsTask==0)&&data.IsNewPasswordTask==0">
                                    <dd ><label>浏览店铺</label></dd>
                                    <dd>
                                        <div class="imglist thumbnails">
                                            <span class="img">
                                                <img :src="data.ImgJson.TargetProductTopImg"  @click="previewImage([data.ImgJson.TargetProductTopImg])" v-if="data.ImgJson.TargetProductTopImg">
                                            </span>
                                            <span class="img">
                                                <img  :src="data.ImgJson.TargetProductBottomImg"  @click="previewImage([data.ImgJson.TargetProductBottomImg])" v-if="data.ImgJson.TargetProductBottomImg">
                                            </span>
                                            <span class="img">
                                                <img :src="data.ImgJson.ShopProductBottomImgA"  @click="previewImage([data.ImgJson.ShopProductBottomImgA])" v-if="data.ImgJson.ShopProductBottomImgA">
                                            </span>
                                            <span class="img">
                                                <img :src="data.ImgJson.ShopProductBottomImgB"  @click="previewImage([data.ImgJson.ShopProductBottomImgB])" v-if="data.ImgJson.ShopProductBottomImgB">
                                            </span>
                                            <block v-if="data.ProductName1">
                                                <span class="img">
                                                    <img :src="data.ImgJson.AdditionalProductA1"   @click="previewImage([data.ImgJson.AdditionalProductA1])" v-if="data.TaskType==1&&(data.ProductName1||data.ProductName2)&&data.ImgJson.AdditionalProductA1">
                                                </span>
                                                <span class="img">
                                                    <img :src="data.ImgJson.AdditionalProductB1"  @click="previewImage([data.ImgJson.AdditionalProductB1])" v-if="data.TaskType==1&&(data.ProductName1||data.ProductName2)&&data.ImgJson.AdditionalProductB1">
                                                </span>
                                            </block>
                                            <block v-if="data.ProductName2">
                                                <span class="img">
                                                        <img :src="data.ImgJson.AdditionalProductA2"  @click="previewImage([data.ImgJson.AdditionalProductA2])" v-if="data.ProductName2&&data.ImgJson.AdditionalProductA2">
                                                </span>
                                                <span class="img">
                                                    <img :src="data.ImgJson.AdditionalProductB2"  @click="previewImage([data.ImgJson.AdditionalProductB2])" v-if="data.ProductName2&&data.ImgJson.AdditionalProductB2">
                                                </span>
                                            </block>
                                        </div>
                                    </dd>
                                </block>
                                <dd v-if="data.ShouCandp==1"><label>收藏店铺</label></dd>
                                <dd v-if="data.ShouCandp==1">
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                            <img :src="data.ImgJson.collectionShop" v-if="data.ImgJson.ShouCandpimg" @click="previewImage([data.ImgJson.ShouCandpimg])">
                                        </span>
                                    </div>
                                </dd>
                                <dd v-if="data.Llshoucandp==1"><label>收藏店铺</label></dd>
                                <dd v-if="data.Llshoucandp==1">
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                            <img :src="data.ImgJson.collectionShop" v-if="data.ImgJson.collectionShop" @click="previewImage([data.ImgJson.collectionShop])">
                                        </span>
                                    </div>
                                </dd>
                                <dd v-if="data.ShouCansp==1"><label>收藏商品</label></dd>
                                <dd v-if="data.ShouCansp==1">
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                            <img :src="data.ImgJson.collectionProduct" v-if="data.ImgJson.collectionProduct" @click="previewImage([data.ImgJson.collectionProduct])">
                                        </span>
                                    </div>
                                </dd>
                                <dd v-if="data.Jiarugouwu==1"><label>加入购物车</label></dd>
                                <dd v-if="data.Jiarugouwu==1">
                                    <div class="imglist">
                                        <span class="img">
                                            <img :src="data.ImgJson.cartImg" v-if="data.ImgJson.cartImg" @click="previewImage([data.ImgJson.cartImg])">
                                        </span>
                                    </div>
                                </dd>
                                <block v-if="data.ChatPlaceAnOrder>0&&data.ImgJson.OrderDetailsImg">
								<dd><label>下单支付</label></dd>
								<dd>
									<div class="imglist thumbnails">
										<span class="img">
											<img :src="data.ImgJson.OrderDetailsImg" @click="previewImage([data.ImgJson.OrderDetailsImg])">
										</span>
									</div>
								</dd>
								</block>

								<div class="from" style="margin-bottom:10px;" v-if="data.ShoparoundLink1">
                                    <p class="text">货比三家链接1：{{data.ShoparoundLink1}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.ShoparoundLink2">
                                    <p class="text">货比三家链接2：{{data.ShoparoundLink2}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.IsAppointCompetlink1&&data.IsCompetingGoodsTask==1">
								    <p class="text">货比三家链接3：{{data.IsAppointCompetlink1}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.IsAppointCompetlink2&&data.IsCompetingGoodsTask==1">
								    <p class="text">货比三家链接4：{{data.IsAppointCompetlink2}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.IsAppointCompetlink3&&data.IsCompetingGoodsTask==1">
								    <p class="text">货比三家链接5：{{data.IsAppointCompetlink3}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.ShopProAlink">
                                    <p class="text">副宝贝链接1：{{data.ShopProAlink}}</p>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.ShopProBlink">
                                    <p class="text">副宝贝链接2：{{data.ShopProBlink}}</p>
								</div>
								<div class="from No" style="margin-bottom:10px;" v-if="data.PlatOrderNo">
                                    <div>订单编号：{{data.PlatOrderNo}}
                                        <p class="link_btn copybtn" style="display:inline-block" @click="copy(data.PlatOrderNo)">复制</p>
                                    </div>
								</div>
								<div class="from" style="margin-bottom:10px;" v-if="data.PayMoney">
                                    <p>实付金额：{{data.PayMoney}}元</p>
								</div>
								<!-- <dd class="text_r"><p class="link_btn blue">点击可查看图片</p></dd> -->
                            </dl>
                        </li>
                        <block v-if="data.TaskType==1">
                        <li  class="no3" :class="{'active':data.AcceptTaskStatus>1&&data.AcceptTaskStatus!=4&&data.AcceptTaskStatus!=5&&data.AcceptTaskStatus!=6}">
                            <i class="icon num">3</i>
                            <dl>
                                <dt><label>商家确认订单</label></dt>
                                <dd><label>任务类型</label><span>{{data.PlatType}}</span></dd>
                                <dd><label>返款方式</label><span>{{data.FanType}}</span></dd>
                                <dd><label>转账人</label><span>{{data.TransferUserName}}</span></dd>
                                <dd><label>返款金额</label><span class="c_Org">{{data.Amount}}元</span></dd>
                                <dd class="text_r"><span>平台规定商家24小时内返款</span>
                                    <p class="btn" @click="urgeRebate" v-if="data.AcceptTaskStatus==1&&data.IsReminders==0&&data.IsAppeal!=1">催返款</p>
                                </dd>
                            </dl>
                        </li>
                        <li :class="['no4',{'active':(data.AcceptTaskStatus==7||data.AcceptTaskStatus==8)}]">
                            <i class="icon num">4</i>
                            <dl>
                                <dt><label>收货好评</label>
                                    <span class="text_r c_Org" style="float:right;" id="evaluation_Countdown" 
                                        v-if="data.AcceptTaskStatus==2 && data.EvaluationCountdown < data.ReceivingTime">
                                        {{AcceptTaskTimeEnd}}
                                    </span>
                                </dt>
                                <dd><label>第一步：去{{data.PlatName}}评价并截图</label> 
                                    <div class="evaluate_box" v-if="data.EvaluationClaim">
                                        <p class="evaluateTit">文字要求<span class="c_Org">（评价必须粘贴以下文字）</span></p>
                                        <textarea type="text" class="keybox" id="praiseText" readonly :value="data.EvaluationClaim" disabled></textarea>
                                        <p class="link_btn" @click="copy(data.EvaluationClaim)">复制评价文字</p>
                                    </div>
                                    <div class="evaluate_box" style="margin-top:50px;" v-if="data.EvaluationImg||data.EvaluationImg1||data.EvaluationImg2||data.EvaluationImg3||data.EvaluationImg4">
                                        <p class="evaluateTit">图片要求<span class="c_Org">（在评价里必须上传以下图片）</span></p>
                                        <div class="imglist thumbnails evaluationImglst">
                                            <span class="img">
                                                <img :src="data.EvaluationImg" v-if="data.EvaluationImg" @click="previewImage([data.EvaluationImg])">
                                            </span> 
                                            <span class="img">
                                                    <img :src="data.EvaluationImg1" v-if="data.EvaluationImg1"  @click="previewImage([data.EvaluationImg1])">
                                            </span> 
                                            <span class="img">
                                                    <img :src="data.EvaluationImg2" v-if="data.EvaluationImg2"  @click="previewImage([data.EvaluationImg2])">
                                            </span> 
                                            <span class="img">
                                                    <img :src="data.EvaluationImg3" v-if="data.EvaluationImg3"  @click="previewImage([data.EvaluationImg3])">
                                            </span> 
                                            <span class="img">
                                                    <img :src="data.EvaluationImg4" v-if="data.EvaluationImg4"  @click="previewImage([data.EvaluationImg4])">
                                            </span>
                                        </div>
                                        <!-- <p class="link_btn" @click="saveImg">点击下载图片</p> -->
                                    </div>
                                </dd>
                                <block v-if="data.EvaluationVideo">
                                    <dd><label style="width:100%">第二步：上传视频好评</label></dd>
                                    <dd>
                                    </dd>
                                    <dd class="text_r" v-if="data.EvaluationVideo">
                                        <div class="evaluate_box">
                                            <a class="link_btn" :href="data.EvaluationVideo">点击预览视频</a>
                                        </div>
                                    </dd>
								</block>
                                <dd><label>第二步：上传物流签收与评价截图</label></dd>
                                <dd>
                                    <div class="imglist thumbnails">
                                        <span class="img">
                                            <img :src="data.OkImgJson.LogisticsReceiptImg" v-if="data.OkImgJson.LogisticsReceiptImg" @click="previewImage([data.OkImgJson.LogisticsReceiptImg])">
                                        </span>
                                        <span class="img">
                                            <img :src="data.OkImgJson.EvaluationImg" v-if="data.OkImgJson.EvaluationImg" @click="previewImage([data.OkImgJson.EvaluationImg])">
                                        </span>
                                    </div>
                                </dd>
                                <!-- <dd class="text_r"><p class="link_btn blue">点击可查看图片</p></dd> -->
                                <dd class="text_r"><span>{{data.EvaluationTitle}}</span>
                                    <p class="btn" @click="opentips" 
                                    v-if="data.AcceptTaskStatus==2">去收货</p>
                                    <!-- 收货弹窗 -->
                                    <div class="EvaluationMask" v-if="showEvaluationMask">
                                        <div class="content">
                                            <h3 class="layer_tips">请上传物流截图和评价截图</h3>
                                            <div class="piclist Uploadimg">
                                                <ul class="clear">
                                                    <li>
                                                        <div class="img" @click="upImg('LogisticsReceiptImg')">
                                                            <div class="upimg">
                                                                <img class="uploadImg" :src="LogisticsReceiptImg" v-if="LogisticsReceiptImg"/>
                                                            </div>
                                                        </div>
                                                        <p class="text">请上传物流截图</p>
                                                    </li>
                                                    <li>
                                                        <div class="img" @click="upImg('EvaluationImg')">
                                                            <div class="upimg">
                                                                <img class="uploadImg" :src="EvaluationImg"  v-if="EvaluationImg"/>
                                                            </div>
                                                        </div>
                                                        <p class="text">请上传评价截图</p>
                                                    </li>
                                                </ul>
                                                <div class="maskBtn">
                                                    <p @click="EvaluationOK">确定</p>
                                                    <p @click="showEvaluationMask = false">取消</p>
                                                </div>
                                        </div>
                                        </div>
                                    </div>

                                </dd>

                            </dl>
                        </li>
                        <li :class="['no5',{'active':data.AcceptTaskStatus==8}]">
                            <i class="icon num">5</i>
                            <dl>
                                <dt><label>任务完成</label></dt>
                                <dd><label>获得佣金</label><span class="c_Org">{{data.Commission}} 金</span></dd>
                            </dl>
                        </li>
                        </block>
                        <block v-else>
                            <li :class="['no3',{'active':data.AcceptTaskStatus==8}]">
                                <i class="icon num">3</i>
                                <dl>
                                    <dt><label>任务完成</label></dt>
                                    <dd><label>获得佣金</label><span class="c_Org">{{data.Commission}} 金</span></dd>
                                </dl>
                            </li>
                        </block>
                    </ul>
                </div>
            </div>
    </div>
    <!-- 取消任务 -->
    <div class="cancelTast" v-if="showCancelTask">
        <div class="content">
            <div class="top">
                <p class="layer_tips">撤销次数超过10次后，再次撤销任务每次扣取0.1金币，确定取消任务？</p>
                <div class="open-typebox">
                    <ul>
                        <li :class="{'active':cancelTastIndex==index}" @click="cancelTastIndex=index"
                            v-for="(item,index) in cancelTastList" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="btns">
                <div class="confirm" @click="cancelTask_confirm">确认</div>
                <div class="cancel" @click="showCancelTask = false">取消</div>
            </div>
        </div>
    </div>
	<!-- 审号中 -->
	<div class="msgallbox" v-if="showmsgallbox">
		<div class="msgbox">
			<div class="msgtitle">通知</div>
			<div class="contentbox">
				<div class="msgcontent" id="newsContent">{{newsContent}}</div>
				<div class="msgcontent" style="color:red;font-weight:bold;margin-bottom:20upx" id="newsTime" v-if="shownewsTime">{{newsTime}}</div>
			</div>
			<div class="msgbtn" @click="isOk()">确定</div>
		</div>
	</div>
	<!-- 收货提示 -->
	<div class="msgallbox" v-if="showtipsbox">
		<div class="msgbox">
			<div class="msgtitle" style="color:red;font-weight:bold;font-size:36upx">收货提示</div>
			<div class="contentbox">
				<div class="msgcontent" id="tipscontent">
					任务为<label style="color:red;font-weight:bold;font-size:36upx">{{tipstext1}}</label>任务，
					{{tipstext2}}
				</div>
			</div>
			<div class="msgbtn" @click="closetips()">确定</div>
		</div>
	</div>
  </div>
</template>

<script>
import {post,toast,goUrl,previewImage,saveFile,getImgPath} from '@/utils';
import {pathToBase64} from '@/utils/image-tools'
import h5Copy  from '@/utils/junyi-h5-copy';
export default {
  data() {
    return {
        previewImage,
        userId:'',
        token:'',
        TaskAcceptNo:'',
        data:{
            ImgJson:{}
        },
        cancelTastList:['找不到商品','不想做这个任务','达不到商家的要求','其他'],
        cancelTastIndex:0,//取消任务的原因下标
        showCancelTask:false,
        timeEnd:'',//操作任务倒计时
        timeFn:null,
        AcceptTaskTimeEnd:'',//接受任务倒计时
        AcceptTaskTimeFn:null,//
        showEvaluationMask:false,//是否显示上传物流和评价截图
        LogisticsReceiptImg:'',//物流截图
        EvaluationImg:'',//评价截图
		showmsgallbox:false,//显示审号提醒
		showtipsbox:false,//显示收货提示
		tipstext1:'普通好评',//收货提示内容
		tipstext2:'核对快递签收后，点下五星好评，填写15字以上文字评语。',//收货提示内容
		newsContent:"商家审核旺旺中请稍等...",//审号提示
		newsTime:"00:00:00",//审号倒计时
		shownewsTime:true,
		timerTrialStatus:null,//审号计时器
		timerTrialStatus2:null,//审号计时器2
		IsTrialStatus:0,
    };
  },
  onLoad(options) {
    this.userId = uni.getStorageSync('userId');
    this.token = uni.getStorageSync('token');
    this.TaskAcceptNo = options.TaskAcceptNo;
    this.init();
    this.getData();

  },
  onShow() {
      
  },
  methods: {
        init(){
            this.showEvaluationMask =false;
            this.LogisticsReceiptImg ='';
            this.EvaluationImg ='';
            this.AcceptTaskTimeEnd='';
            this.AcceptTaskTimeFn =false;
            this.timeEnd='';
            this.timeFn =false;
            this.showCancelTask=false;
			this.showmsgallbox=false;
			this.IsTrialStatus=0;
        },
		getData(){
			post('Task/LoadOperationalTask',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo
			}).then(res=>{
                let data =res.obj;
                if (data.AcceptTaskStatus == 0) {
					clearInterval(this.timeFn)
                    this.timerStart(data.OperationCountdown);
                }
                if (data.AcceptTaskStatus == 2 && data.EvaluationCountdown < data.ReceivingTime) {
					clearInterval(this.AcceptTaskTimeFn)
                    this.EvaluationTimerStart(data.EvaluationCountdown,data.ReceivingTime);
                }
				if (data.IsTrialStatus == 1||data.IsTrialStatus == 2||data.IsTrialStatus == 3) {//1:申号中,2:审号成功，3:失败
					this.IsTrialStatus=data.IsTrialStatus
					clearInterval(this.timerTrialStatus);
					clearInterval(this.timerTrialStatus2);
					if(data.IsTrialStatus == 1){
						this.showmsgallbox=true
						this.shownewsTime=true
						this.timerTrial2();//掉自身接口更新状态
						this.timerTrial(data.TrialNumberTimeCountdown);
					}else if (data.IsTrialStatus == 2) {
					  this.newsContent="商家已同意操作请开始操作任务"
					  this.shownewsTime=false
					}else if (data.IsTrialStatus == 3) {
					  this.newsContent="商家已取消操作请重新领取其他任务"
					  this.shownewsTime=false
					}
				}
                if(data.ImgJson){
                    data.ImgJson = JSON.parse(data.ImgJson);
                }else{
                     data.ImgJson ={}
                }
                if(data.OkImgJson){
                    data.OkImgJson = JSON.parse(data.OkImgJson);
                }else{
                     data.OkImgJson ={}
                }
                this.data = data;
			})
        },
        // 操作任务
        operationTask(){
            if((this.data.AcceptTaskStatus<1||(this.data.AcceptTaskStatus==9&&this.data.PayCountdown>0)||(this.data.AcceptTaskStatus==9&&this.data.CompetingGoodsCountdown>0))&&this.data.IsTrialStatus!=1){
                goUrl('task/operationtask',{
                    TaskAcceptNo:this.TaskAcceptNo
                })
            }
        },
        // 申述任务
        showAppeal(){
            if((this.data.AcceptTaskStatus==4||this.data.AcceptTaskStatus==2)&&this.data.IsAppeal==0){
                goUrl('task/initiateappeal',{
                    TaskAcceptNo:this.TaskAcceptNo
                })
            }
        },
        // 显示取消任务
        onShowCancelTask(){
            if(this.data.AcceptTaskStatus==0||this.data.AcceptTaskStatus==9){
               this.showCancelTask = true 
            }
        },
        // 确认取消任务
        cancelTask_confirm(){
            post('Task/CancelTask',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo:this.TaskAcceptNo,
                TaskCancelReasons: this.cancelTastList[this.cancelTastIndex]
            }).then(res=>{
                goUrl('task/receivedtask')
            })
        },
        copy(text){
            const res = h5Copy(text);
            if(res){
                toast('复制成功',true)
            }else{
                toast('复制失败，请重试！')
            }
        },
        saveImg(){
            const data =this.data;
            saveFile(data.EvaluationImg);
            saveFile(data.EvaluationImg1);
            saveFile(data.EvaluationImg2);
            saveFile(data.EvaluationImg3);
            saveFile(data.EvaluationImg4);
        },
        timerStart(countdown) {
            const that = this;
            let i = parseInt(countdown);
            let alls = 60 * i;
            let h = parseInt(i / 60);
            let m = i - (h * 60);
            if (m == 0) {
                --h;
                m = 59;
            } else
                --m
            let s = 59;
            that.timeFn = setInterval(function() {
                if (alls <= 0) {
                    clearInterval(that.timeFn);
                    that.timeEnd="提交倒计时 00:00:00"
                    toast("任务超时未处理，系统已取消");
                    setTimeout(()=>{
                        uni.navigateBack();
                    },1500)
                } else {
                    let str = "";
                    str = (h > 0 ? h >= 10 ? h : "0" + h : "00") + ":" + (m > 0 ? m >= 10 ? m : "0" + m : "00") + ":" + (s > 0 ? s >= 10 ? s : "0" + s : "00");
                    that.timeEnd = "提交倒计时 " + str;
                    --s;
                    --alls;
                    if (m == 0 && h > 0 && alls > 0) {
                        --h;
                        m = 59
                    }
                    if (s == 0) {
                        --m;
                        s = 60;
                    }

                }
            }, 1000);
        },
        // 收货倒计时
        EvaluationTimerStart(countdown,ReceivingTime) {
            const that = this;
            var hour = (ReceivingTime - countdown).toFixed(2);
            var h = parseInt(hour.split(".")[0]);
            var m = parseInt((hour-h)*60);
            var alls = 60 * 60 * h + m * 60;
            var s = 59;
            this.AcceptTaskTimeFn = setInterval(function() {
                if (alls <= 0) {
                    clearInterval(that.AcceptTaskTimeFn);
                    that.AcceptTaskTimeEnd = "评价倒计时 00:00:00";
                } else {
                    var str = "";
                    str = (h > 0 ? h >= 10 ? h : "0" + h : "00") + ":" + (m > 0 ? m >= 10 ? m : "0" + m : "00") + ":" + (s > 0 ? s >= 10 ? s : "0" + s : "00");
                    that.AcceptTaskTimeEnd = "评价倒计时 " + str
                    --s;
                    --alls;
                    if (m == 0 && h > 0 && alls > 0) {
                        --h;
                        m = 59
                    }
                    if (s == 0) {
                        --m;
                        s = 60;
                    }
                }
            }, 1000);
        },
		//审号倒计时
		timerTrial(countdown) {
			const that = this;
		    let alls = countdown*1;
		    this.timerTrialStatus = setInterval(function() {
		        if (alls <= 0) {
		            clearInterval(that.timerTrialStatus);
		        } else {
					  var str = "";
					  var d = Math.floor(alls/ 60 / 60 / 24); //天
					  var h = Math.floor((alls/ 60 / 60) % 24); //时
					  var m = Math.floor((alls/ 60) % 60); //分
					  var s = Math.floor((alls) % 60); //秒
					  if (parseInt(d) < 1) {
					  d = "";
					  } else {
					  d = d + "天";
					  }
					  if (parseInt(h) < 10) {
					  h = "0" + h;
					  }
					  if (parseInt(m) < 10) {
					  m = "0" + m;
					  }
					  if (parseInt(s) < 10) {
					  s = "0" + s;
					  }
					  str = d + h + ":" + m + ":" + s;
					  that.newsTime=str
					}
					alls--
		    }, 1000);
		},
		timerTrial2() {
			const that=this
		    this.timerTrialStatus2 = setInterval(function() {
		      that.getData()
		    }, 10000);
		},
		isOk() {
		  this.showmsgallbox=false
		  clearInterval(this.timerTrialStatus);
		  clearInterval(this.timerTrialStatus2);
		  if(this.IsTrialStatus==1||this.IsTrialStatus==3){
			  uni.navigateBack({})
		  }
		},
		opentips(){
			this.showtipsbox=true
			if(this.data.EvaluationVideo){
				this.tipstext1="指定视频好评"
				this.tipstext2='点下五星好评，按商家提供的视频和文字发布视频和评语。'
			  }else if (this.data.EvaluationImg) {
				  this.tipstext1="指定图片好评"
				this.tipstext2='点下五星好评，按商家提供的图片和文字填写图片和评语。'
			  }else if (this.data.EvaluationClaim) {
				  this.tipstext1="指定文字好评"
				this.tipstext2='点下五星好评，按商家指定的文字填写文字评语。'
			  }else {
				  this.tipstext1="普通好评"
				this.tipstext2='核对快递签收后，点下五星好评，填写15字以上文字评语。'
			  }
		},
		closetips(){
			this.showtipsbox=false;
			this.confirmTask(this.data.EvaluationCountdown,this.data.ReceivingTime)
		},
        // 收货
        confirmTask(evaluationCountdown,ReceivingTime) {
            if (evaluationCountdown < ReceivingTime) {
                toast(`发货不到${ReceivingTime}小时，不能确认收货`);
                return false;
            }
            this.showEvaluationMask = true;
        },
        // 催返款
        urgeRebate(){
            post('Task/RemindingRefunds',{
                UserId: this.userId,
                Token: this.token,
                TaskAcceptNo: this.TaskAcceptNo
            }).then(res=>{
                toast(res.msg,true);
                setTimeout(()=>{
                    this.init();
                    this.getData();
                },1500)
            })
        },
        // 确认上传截图
        EvaluationOK(){
            if (!this.LogisticsReceiptImg) {
                toast("请上传物流截图");
                return false;
            }
            if (!this.EvaluationImg) {
                toast("请上传评价截图");
                return false;
            }
            Promise.all([pathToBase64(this.LogisticsReceiptImg),pathToBase64(this.EvaluationImg)]).then(img=>{
                let imgjson = {
                    LogisticsReceiptImg:img[0],
                    EvaluationImg:img[1]
                };
                post('Task/CompleteTask',{
                    UserId: this.userId,
                    Token: this.token,
                    TaskAcceptNo: this.TaskAcceptNo,
                    OkImgJson: JSON.stringify(imgjson),
                }).then(res=>{
                    toast(res.msg);
                    setTimeout(()=>{
                        this.init();
                        this.getData();
                    },1500)
                })
            })
        },
	  	// 上传图片
        upImg(obj){
            const that = this;
            getImgPath(1,[],['compressed']).then(path=>{
                that[obj] = path[0];
            })
		},

  }
};
</script>

<style lang="scss" scoped>
@import '../../css/fsgallery.css';
@import '../../css/task.css';
.main{
    padding:10px;
    .shopId{
        .id{
            color:#666;
            line-height:2;
        }
    }
    .topInfo{
        .g-name{
            line-height:2;
        }
        .clear{
            .img{
                margin-right:10px;
                position:relative;
                img{
                    width:80px;
                    height:80px;
                }
                .maskimg{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                }
            }
        }
    }
}
.stepInfo ul li dl dd, .stepInfo ul li dl dt{
    font-size:13px;
}
.cancelTast{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:rgba(0,0,0,.6);
    .content{
        background:#fff;
        width:90%;
        border-radius:5px;
        overflow:hidden;
        .top{
            padding:10px;
            p{
                line-height:1.5;
                text-align:center;
            }
            .ul{
                color:#5c91f1;
                li{
                    border-bottom:1px #f2f2f2 solid;
                    line-height:2;
                }
            }
        }
        .btns{
            display:flex;
            align-items:center;
            border-top:#e8e8e8 solid 1px;
            text-align:center;
            div{
                width:50%;
                line-height:3;
                background:#f2f2f2;

            }
            .confirm{
                border-right:1px #e8e8e8 solid;
                color:#5c91f1;
            }
        }
    }
}
.img{
    img{
        height:100%;
    }
}
.EvaluationMask{
    background:rgba(0,0,0,.6);
    position:fixed;
    top:0;
    left:0;
    z-index:99;
    width:100%;
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    .content{
        background:#fff;
        border-radius:7px;
        width:90%;
        h3{
            text-align:center;
            line-height:1.5;
            padding-top:20px;
        }
        ul{
            padding:10px;   
            margin-left:0!important;
            li{
                border-left:none!important;
                width:100px;
                margin:20px 25px!important;
            }
        }
    }
    .maskBtn{
        display:flex;
        align-items:center;
        border-top:1px #e8e8e8 solid;
        p{
            width:50%;
            text-align:center;
            line-height:3;
            &:first-child{
                color:royalblue;
                border-right:1px #e8e8e8 solid;
            }
        }
    }
}
.evaluate_box .link_btn{
    float:none;
    display:inline-block;
}
.presale-img{
    position: absolute!important;
    right: 0;
    top: 120px;
}





.msgallbox{
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999
}
.msgbox{
	width: 80%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	-webkit-transform: translate(-50%,-50%);
	background: #fff;
	border-radius: 16upx;
	overflow: hidden;
}
.msgtitle{
	font-size: 32upx;
	font-weight: bold;
	color: #000;
	line-height: 1.4;
	margin-top: 40upx;
	text-align: center;
	display: -webkit-box!important;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.contentbox{
	width: 100%;
	max-height: 600upx;
	overflow-y:scroll;;
}
.msgbox .msgcontent{
	width: 100%;
	line-height: 1.4;
	box-sizing: border-box;
	padding: 20upx;
	/*min-height: .8rem;*/
	text-align: center;
}
.msgbox .msgbtn{
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	background: #FF662A;
	color: #fff;
}
</style>