//  √  提现页面数据绑定 page88 withdraw页面 ：/api/Withdraw/LoadingWithdrawPage   UserId  Token
userId = $api.getStorage('userId');
userToKen = $api.getStorage('userToKen');
var minWithdrawCommission = 0;
var minWithdrawPrincipal = 0;

apiready = function() {
    exit_app(2);
    //appealType = api.pageParam.appealType;
    //appealStatus = api.pageParam.appealStatus;
    if (isNullOrEmpty(userId) || userId <= 0 || isNullOrEmpty(userToKen)) {
        location.href = '../../../html/login/login.html';
    } else {
        getCashInfo();
    }

    $('.dd_Btns').on("click", "div", function() {
        $(this).addClass("weui-btn-active").siblings("div").removeClass("weui-btn-active");
        var thisId = $(this).attr("id");
        if (thisId == "yongjintx") {
            var amount = $("#cash10").val();
            var text1 = "可提金币：" + amount + "金";
            var fzamount = $("#cash11").val();
            var text2 = "冻结金币：" + fzamount + "金";
            $("#cash").html(text1);
            $("#frozencash").html(text2);
            $("#commisontitle").html("金币提现");
            $(".btn_back").attr("href", "commision.html");

        } else {
            var wallet = $("#cash20").val();
            var text1 = "可提本金：" + wallet + "元";
            var fzwallet = $("#cash21").val();
            var text2 = "冻结本金：" + fzwallet + "元";
            $("#cash").html(text1);
            $("#frozencash").html(text2);
            $("#commisontitle").html("本金提现");
            $(".btn_back").attr("href", "corpus.html");
        }
    });

    $("#cashinput").on("change", function() {
        //计算出实际到账的资金
        if ($("#yongjintx").hasClass("weui-btn-active")) {
            //var str="实际到账：0.00元&nbsp;(1金 = 0.4元)(手续费：1%)";
            //var cashAble= $("#cash10").val();//可提佣金
            var commissionConversion = $("#commissionConversion").val(); //佣金与本金比列
            //实际到账金额   提现佣金 * 佣金与本金比例 -（提现佣金 * 佣金与本金比例 * 手续费比例）
            var bili = $("#amountProportionOfFees").val(); //佣金提现手续费比例
            var inputvalue = parseFloat($("#cashinput").val());
            var servicemoney = 0;
            if (!isNaN(inputvalue)) {
                if (bili != 0) {
                    servicemoney = (inputvalue * commissionConversion * (bili / 100))
                    var total = inputvalue * commissionConversion - servicemoney;
                } else {
                    var total = inputvalue * commissionConversion;
                }
                var keti = parseFloat($("#cash10").val());
                if (inputvalue <= keti) {
                    var str1 = "实际到账：" + total + "元&nbsp;(1金 = " + commissionConversion + "元)(手续费：" + servicemoney + ")";
                    $("#tipsText").html(str1);
                } else if (inputvalue > keti) {
                    $("#tipsText").html("温馨提示：输入额度已经超过可提现额度");
                } else {

                }
                $("#tipsText").html(str1);
            } else {

            }
            // var total="";

        } else {
            //var commissionConversion =$("#commissionConversion").val();//佣金与本金比列
            //实际到账金额   提现佣金 * 佣金与本金比例 -（提现佣金 * 佣金与本金比例 * 手续费比例）
            var bili = $("#walletProportionOfFees").val(); //本金提现手续费比例
            var inputvalue = parseFloat($("#cashinput").val());
            var servicemoney = 0;
            if (!isNaN(inputvalue)) {
                if (bili != 0) {
                    servicemoney = (inputvalue * (bili / 100));
                    var total = inputvalue - servicemoney;
                } else {
                    var total = parseFloat(inputvalue);
                }
                var keti = parseFloat($("#cash20").val());
                //console.log(keti);
                if (inputvalue <= keti) {
                    var str1 = "实际到账：" + total + "元&nbsp;(手续费：" + servicemoney + ")";
                    $("#tipsText").html(str1);
                } else if (inputvalue > keti) {
                    $("#tipsText").html("温馨提示：输入额度已经超过可提现额度");
                } else {}
            } else {}
        }
    });

    //付款
    $('.btn-submit').click(function() {
        // var VipId=$(".active").attr("index");
        var input1 = $("#cashinput").val();
        var input2 = $("#passkey").val();

        if ($("#yongjintx").hasClass("weui-btn-active")) {
            var cash = $("#cashinput").val();
            var cntstr = "<p>金币提现：" + cash + "金</p>";
        } else {
            var cash = $("#cashinput").val();
            var cntstr = "<p>本金提现：" + cash + "元</p>";
        }

        if (!isNullOrEmpty(input1) && !isNullOrEmpty(input2)) {
            submitCash();
        } else {
            tips("表单不能为空");
        }
    });
}

function getCashInfo() {
    loading();
    var indexnum = api.pageParam.IndexId;
    // console.log("---1-----indexnum是：");
    // console.log(indexnum);
    if (indexnum == 1) {
        $("#commisontitle").html("佣金提现");
        $(".btn_back").attr("href", "commision.html");
    } else {
        $("#commisontitle").html("本金提现");
        $(".btn_back").attr("href", "corpus.html");
    }
    api.ajax({
        url: baseUrl + "/api/Withdraw/LoadingWithdrawPage", //提现页面数据绑定
        method: 'post',
        dataType: 'json',
        data: {
            values: {
                UserId: userId,
                Token: userToKen,
            }
        }
    }, function(ret, err) {
        if (!isNullOrEmpty(JSON.stringify(ret))) {
            var json = $.parseJSON(JSON.stringify(ret));
            if (json.errcode == 0) {
                var cardid = json.obj.BankCardNo; //银行卡号
                $(".cardID").html(cardid);
                var username = json.obj.BankCardName;
                $(".name").html(username);
                var indexnum = api.pageParam.IndexId;
                var cash10 = json.obj.Amount;
                var cash11 = json.obj.FrozenAmount;
                var cash20 = json.obj.Wallet;
                var cash21 = json.obj.FrozenWallet;
                $(".withdrawalTime").html(json.obj.CashWithdrawalTime)
                $("#withdrawNum").html(json.obj.DayWithdrawalMaxNum);
                //input存储值
                $("#cash10").attr("value", cash10);
                $("#cash11").attr("value", cash11);
                $("#cash20").attr("value", cash20);
                $("#cash21").attr("value", cash21);

                //提现手续费  比例
                //WalletProportionOfFees   本金提现手续费比例
                //AmountProportionOfFees  佣金提现手续费比例
                //CommissionConversion   佣金与本金的比例
                minWithdrawPrincipal = json.obj.MinPrincipalWithdrawal;
                minWithdrawCommission = json.obj.MinCommissionWithdraw;
                var walletproportionOfFees = json.obj.WalletProportionOfFees;
                var amountproportionOfFees = json.obj.AmountProportionOfFees;
                var commissionconversion = json.obj.CommissionConversion;

                $("#walletProportionOfFees").attr("value", walletproportionOfFees);
                $("#amountProportionOfFees").attr("value", amountproportionOfFees);
                $("#commissionConversion").attr("value", commissionconversion);
                $("#commissionRate").html(commissionconversion);
                $("#tipsText").html("实际到账：0.00元&nbsp;(1金=" + commissionconversion + "元)");
                $("#min_commission").html(json.obj.MinCommissionWithdraw);
                $("#min_principal").html(json.obj.MinPrincipalWithdrawal);
                if (indexnum == '1') {
                    var amount = json.obj.Amount;
                    var text1 = "可提金币：" + amount + "金";
                    var fzamount = json.obj.FrozenAmount;
                    var text2 = "冻结金币：" + fzamount + "金";
                    $("#cash").html(text1);
                    $("#frozencash").html(text2);
                    $("#yongjintx").addClass("weui-btn-active").siblings("div").removeClass("weui-btn-active");
                } else {
                    var wallet = json.obj.Wallet;
                    var text1 = "可提本金：" + wallet + "元";
                    var fzwallet = json.obj.FrozenWallet;
                    var text2 = "冻结本金：" + fzwallet + "元";
                    $("#cash").html(text1);
                    $("#frozencash").html(text2);
                    $("#benjintx").addClass("weui-btn-active").siblings("div").removeClass("weui-btn-active");
                }
            } else if (json.errcode == 2) {
                tips(json.msg);
                location.href = '../../../html/login/login.html';
            } else {
                if (api.pageParam.IndexId == '1') {
                    tips_url(json.msg, '../../../html/user/commision/commision.html');
                } else {
                    tips_url(json.msg, '../../../html/user/commision/corpus.html');
                }
            }
        } else {
            tips("服务器走神了，请重试");
        }
    });
    loading_close();
}

function submitCash() {
    if ($("#yongjintx").hasClass("weui-btn-active")) {
        var cash = parseFloat($("#cashinput").val()).toFixed(4);
        if (cash < minWithdrawCommission) {
            tips("佣金提现不能小于最小佣金提现额度");
            return false;
        }
        var passkey = $("#passkey").val();
        api.ajax({
            url: baseUrl + "/api/Withdraw/CommCommissionWithdrawal", //佣金提现
            method: 'post',
            data: {
                values: {
                    UserId: userId,
                    Token: userToKen,
                    WithdrawalAmount: cash,
                    LoginPassWord: passkey
                }
            }
        }, function(ret, err) {
            optionResult(ret, 'commision.html');
        });
    } else {
        var cash = parseFloat($("#cashinput").val()).toFixed(4);
        var passkey = $("#passkey").val();
        if (cash < minWithdrawPrincipal) {
            tips("本金提现不能小于最小本金提现额度");
            return false;
        }
        api.ajax({
            url: baseUrl + "/api/Withdraw/PrincipalWithdrawal", //本金提现
            method: 'post',
            data: {
                values: {
                    UserId: userId,
                    Token: userToKen,
                    WithdrawalAmount: cash,
                    LoginPassWord: passkey
                }
            }
        }, function(ret, err) {
            optionResult(ret, 'corpus.html');
        });
    }
}

function optionResult(ret, url) {
    if (!isNullOrEmpty(JSON.stringify(ret))) {
        var json = $.parseJSON(JSON.stringify(ret));
        if (json.errcode == 0) {
            tips_url(json.msg, url);
            //api.closeWin();
        } else {
            tips(json.msg);
        }
    } else {
        tips("服务器走神了，请重试");
    }
}

function towithdrawRecord() {
    if ($("#yongjintx").hasClass("weui-btn-active")) {
        var WalletType = 1;
    } else {
        var WalletType = 0;
    }
    api.openWin({
        name: 'withdrawrecord',
        url: '../../../html/user/commision/withdraw_record.html',
        slidBackEnabled: false,
        pageParam: {
            walletType: WalletType
        }
    });
}
