/**
 * Created by Administrator on 2017/5/16.
 */
(function($){
    var num = 0, timer, isok = true, isright = true,piccounts=0;
    var $imgren,$containid;
    //轮播
    var defaults={
        containid:'',
        picurls: [],
        way:1,
        picheight:"",
        init:function(btn){
            $containid=$(defaults.containid);
            piccounts = this.picurls.length;
            console.log($containid);
            if(! this.containid){ alert("请设置一个容器并设置id");return;};
            $containid.css({margin:"0px auto",width:"100vw","height":defaults.picheight || "20vh","overflow":"hidden","position":"relative"});
            var str ="",lis='';
            lis+='<ul class="imgcount" style="overflow:hidden;position:absolute;width:40%;bottom:5%;right:30%">';
            str += '<div id="imgrun" style="z-index: 1;overflow: hidden; width: 600vw;    ">';
            for(var i=0,pics=this.picurls;i<piccounts;i++){
                str +='<a class="image" style="z-index:5;width:100vw;float:left;" href="#"><img src="'+pics[i]+'" style="width: 100%;display:block"></a>';
                if (i == 0) {
                    lis += '<li class="lis" style="background-color:#f1af00;float:left;width:10px;height:10px;border-radius:50%;margin-left:' + (100 - (piccounts - 1) * 5 - piccounts * 5) / 2 + '%" data-num="0"></li>';
                }else{
                    lis+='<li class="lis" style="float:left;width:10px;height:10px;border-radius:50%;margin-left:5%;background-color:#fff" data-num="'+i+'"></li>';
                }
            }
            str += lis+'</ul>';
            //str += '<span class="left moveclick" style="cursor:pointer;padding:1% 2%;z-index:10;position:absolute;left:6%;top:calc(50% - 25px);background-color:rgba(0,0,0,1);opacity: 0.4"><img src="image/left.png" style="heigt:50px;"/></span>';
            //str += '<span class="right moveclick" style="cursor:pointer;padding:1% 2%;z-index:10;position:absolute;right:6%;top:calc(50% - 25px);background-color:rgba(0,0,0,1);opacity: 0.4"><img src="image/left.png" style="heigt:50px;display:inline-block;transform:rotate(180deg) "/></span>';
            $containid.html(str);
            $imgren = $("#imgrun");
            console.log(btn+"succes");
            if (btn == 1) { leftlunbo() } else if (btn == 2) { insetlunbo(); } else if (btn == 3) { adancedlubo(); } else { alert("敬请期待！！！"); };
        }
    }
    //方法一
    function leftlunbo() {
        var acont;
        lunbo();
        function lunbo() {
            timer = setInterval(function () {
                acont = 0;
                num++;
                if (isok) { $imgren.append($imgren.find(".image:eq(0)").clone()); isok = false; console.log(253); };
                if (num >= piccounts) { acont = 0 } else { acont = num }
                $imgren.animate({ "margin-left": (-100 * num )+ "vw" }, 200, function () { if (num >= piccounts) { num = 0; $imgren.css({ "margin-left": "0px" }); } });
                $("ul.imgcount").find("li:eq(" + acont + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
                //console.log(piccounts+"//"+num)
            }, 3000);
        }
        $("ul.imgcount").on("click", "li", function () {
                     if (!isright) return;
                        isright = false;
                    var clicknum = Number($(this).attr("data-num"));
                    console.log(33,clicknum);
                    $imgren.animate({"margin-left": -100 * clicknum + "vw"}, 200);
                    num = clicknum;
                    isright = true;
                    $("ul.imgcount").find("li:eq(" + clicknum + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
                });
                 $("body").on("click", "span.left", function () {
                    if (!isright) return;
                    isright = false;
                    $(this).attr("opacity", "0.8");
                    if (num > piccounts || num < 1) {
                        num = piccounts
                    } else {
                        num--;
                    }
                    ;
                    $imgren.animate({"margin-left": -100 * num + "vw"}, 600);
                    $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
                    isright = true;
                 });
                $("body").on("mouseenter","span.left",function () {
                    $(this).css("opacity", "0.8");
                });
                $("body").on("mouseleave","span.left",function () {
                    $(this).css("opacity", "0.4");
                });

                $("body").on("click", "span.right", function () {
                    if (!isright) return;
                    isright = false;
                    if (num >= 5) {
                        num = 0
                    } else {
                        num++;
                    }
                    ;
                    $imgren.animate({"left": -100 * num + "vw"}, 200);
                    $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
                    isright = true;
                });
                $("body").on("mouseenter","span.right",function () {
                    $(this).css("opacity", "0.8");
                }).on("mouseleave","span.right",function () {
                    $(this).css("opacity", "0.4");
                });              
                $("div.container").on({ "mouseover": function () { clearInterval(timer); $("span.moveclick").show(10); }, "mouseleave": function () { times(); $("span.moveclick").hide(10) } });

         }
    function moves(){
        var startX,X;
        $containid.on("touchstart",function(){
            startX= e.originalEvent.changedTouches[0].pageX;
        });
        $containid.on("touchmove",function(){
            var moveX=e.originalEvent.changedTouches[0].pageX;
            X = moveX - startX;
        });
        $containid.on("touchend",function(){
            if(X < 0){
                if (num +1 >= piccounts) {
                    num = 0;
                } else {
                    num++;
                }


            }else{
                if (num > piccounts || num < 1) {
                    num = piccounts - 1;
                } else {
                    num--;
                }
            }
            $imgren.animate({"margin-left": (X <0 ?(-100):(100)) * num + "vw"}, 600);
            $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
        });
    }
    //方法二
    function insetlunbo() {
        licks();
        function licks() {
            timer = setInterval(function () {
                num++;
                if (num > 5) { num = 0 }
                //$imgren = $("#imgrun");
                $imgren.css({ "transition": "none" });
                 $imgren.children(".image:first").insertAfter($imgren.children(".image:last"));
                $imgren.animate({ "left": -450 + "px" }, 1000, function () {
                    $imgren.children(".image:first").insertAfter($imgren.children(".image:last"));
                    $imgren.css({ "left": "0" });
                });

                $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
            }, 2000);
        }
        $(".imgcount").on("click", "li", function () {
            if (!isright) return;
            isright = false;
            var curentnum = Number($(this).attr("data-num")); $(this).css("background-color", "#f1af00").siblings().css("background-color", "#fff");

            var lens = curentnum - num;
            if (!lens) isright = true;
            console.log(curentnum + "and" + lens);
            for (var i = 0; i < Math.abs(lens) ; i++) {
                if (lens < 0) {
                    $imgren.children(".image:last").insertBefore($imgren.children(".image:first"));
                    i == (Math.abs(lens) - 1) && ($imgren.css('left', '-450px'),
                    $imgren.animate({ "left": 0 + "px" }, 1000, function () {

                        $imgren.css({ "left": "0" });
                    })); isright = true;
                } else {
                    i == (Math.abs(lens) - 1) && ($imgren.css('left', '450px'),
                    $imgren.animate({ "left": 0 + "px" }, 1000, function () {
                        $imgren.children(".image:first").insertAfter($imgren.children(".image:last"));
                        $imgren.css({ "left": "0" });
                    })); isright = true;
                }
                num = curentnum;

            }
        });
        $("div.container").on({ "mouseover": function () { clearInterval(timer); }, "mouseleave": function () { licks(); } });
        $("span.left").click(function () {
            if (!isright) return;
            isright = false;
            $imgren.animate({ "left": -450 + "px" }, 1000, function () {
                $imgren.children(".image:first").insertAfter($imgren.children(".image:last"));
                $imgren.css({ "left": "0" }); isright = true;
            });
            num++;
            if (num > 5) num = 0;
            $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");

        });
        $("span.right").click(function () {
            if (!isright) return;
            isright = false;
            $imgren.css('left', '-450px').children(".image:last").insertBefore($imgren.children(".image:first"));
            $imgren.animate({ "left": 0 + "px" }, 1000, function () {

                $imgren.css({ "left": "0" });
                isright = true;
            });
            num--;
            if (num < 0) num = 5;
            $("ul.imgcount").find("li:eq(" + num + ")").css("background-color", "#f1af00").siblings().css("background-color", "#fff");
        });
    }
    //方法三
    function adancedlubo() {
        var attrarr = [{ width: "500px", opacity: "1", left: "150px", right: "auto", zIndex: "5", top: 0, height: "497px" },
            { width: "450px", opacity: ".5", right: "100px", left: "650px", zIndex: "4", top: "50px", height: "397px" },
            { width: "450px", opacity: ".33", right: "50px", left: "700px", zIndex: "3", top: "50px", height: "397px" },
            { width: "450px", opacity: ".2", right: "0px", left: "750px", zIndex: "2", top: "50px", height: "397px" },
            { width: "450px", opacity: ".33", left: "100px", right: "initial", zIndex: "3", top: "50px", height: "397px" },
            { width: "450px", opacity: ".5", left: "50px", right: "initial", zIndex: "4", top: "50px", height: "397px" }];
        var divs = $imgren.find(".image");
        repeats();
        $("span.left").click(function () {
            if (!isright) { return; }
            isright = false;
            attrarr.unshift(attrarr.pop());
            for (var i = 0; i < divs.length; i++) {

                $(divs[i]).animate({ width: attrarr[i].width, top: attrarr[i].top, opacity: attrarr[i].opacity, zIndex: attrarr[i].zIndex, height: attrarr[i].height, left: attrarr[i].left, right: attrarr[i].right }, 600);
            };
            isright = true;
        });
        
        $("span.right").click(function () {
            if (!isright) { return; }
            isright = false;
            attrarr.push(attrarr.shift(0));
            for (var i = 0; i < divs.length; i++) {

                $(divs[i]).animate({ width: attrarr[i].width, top: attrarr[i].top, opacity: attrarr[i].opacity, zIndex: attrarr[i].zIndex, height: attrarr[i].height, left: attrarr[i].left, right: attrarr[i].right }, 600);
            };
            isright = true;
        });
        $imgren.on({ "mouseover": function () { clearInterval(timer); }, "mouseleave": function () { repeats(); } });;
        function repeats() {
            timer = setInterval(function () {
                attrarr.unshift(attrarr.pop());
                //attrarr.push(attrarr.shift(0));
                //console.log(attrarr);
                for (var i = 0; i < divs.length; i++) {

                    $(divs[i]).animate({ width: attrarr[i].width, top: attrarr[i].top, opacity: attrarr[i].opacity, zIndex: attrarr[i].zIndex, height: attrarr[i].height, left: attrarr[i].left, right: attrarr[i].right }, 600);
                }

            }, 2000);
        };
       
    }
     //调用方法一
     $.extend({
         "lunbo": function ( options) {           
             var options = $.extend(defaults, options);
             var btn = options.way;
             defaults.init(btn);
             return this.each(function () {
                 (function () {
                     alert("轮播success");
                     if (btn == 1) { leftlunbo() } else if (btn == 2) { insetlunbo(); } else { alert("敬请期待！！！"); };
                 })(btn)

             });
         }
     });
    // 调用方法二
    //$.fn.extend({
    //    "lunbo": function (options,btn) {
    //    alert("轮播success");
    //    var opt = $.extend(defaults, options);
    //        console.log(defaults);
    //    return this.each(function () {          
    //        (function () {
    //            defaults.init(btn);
    //        })(btn)          
    //    });
    //}})
})($)