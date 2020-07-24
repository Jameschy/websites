
$(function(){
    $(".header .menu").click(function(){
        $(".android_menu").toggle();
    })

    //菜单
    $(".menu-tit li").click(function(){
        window.event.stopPropagation();
        var index = $(this).index();
        $(".menu-tit li").removeClass("cur");
        $(this).addClass("cur");
        $(this).parent().parent('.menu-tit').siblings('.menu-list').removeClass('on');
        $(this).parent().parent('.menu-tit').siblings('.menu-list').eq(index).addClass('on'); 
    })

    $(".menu-cate").click(function(){
        $(".menu-cate").hide();
    })
})

$(function(){
    $(".header-top .menu").click(function(){
        if($(".head-nav").hasClass('slidIn')){
            $(".head-nav").removeClass("slidIn");
            $(".head-nav").addClass("slidOut");
            $(".mask").hide();
        } else {
            $(".head-nav").removeClass("slidOut");
            $(".head-nav").addClass("slidIn");
            var height = $(document).height();
            $(".mask").css('height',height);
            $(".mask").show();
        }
    })
})

$(document).ready(function() {
    0 < $(".backTop").length && ($(window).scroll(function() {
        200 <= $(window).scrollTop() ? $(".backTop").show() : $(".backTop").hide()
    }), $(".backTop").click(function() {
        $("html,body").scrollTop(0)
    }));
});

$(function(){
    if($(".app-content .morebtn").length > 0){
        if($(".intro").outerHeight(true)<400){
            $(".intro").css('height', 'auto');
            $(".app-content .morebtn").hide();
        } else {
            $(".intro").css('height', '600px');
        }
        $(".app-content .morebtn").click(function(){
            var num = $(this).attr("data-num");
            if(num == 1){
                $(".intro").css('height', '600px');
                $(this).attr("data-num",0);
                $(this).children('.shadow_i').css('display','block');
                $(this).children('i').eq(0).text("显示全部");
            } else {
                $(".intro").css('height', 'auto');
                $(this).attr("data-num",1);
                $(this).children('.shadow_i').css('display','none');
                $(this).children('i').eq(0).text("收起内容");
            }
        })
    }


    
    $(".ptxzbox .pgx").click(function(){
        
        if($(".ptxzbox .pxz").hasClass('hot')){
            $(".ptxzbox .pgx span").addClass('hot');
            $(".ptxzbox .pxz").removeClass('hot');
        } else {
            $(".ptxzbox .pgx span").removeClass('hot');
            $(".ptxzbox .pxz").addClass('hot');
        }
    })

    $(".phb-nav a").click(function(){
        $(".phb-nav a").removeClass('on');
        $(this).addClass('on');
        var index = $(".phb-nav a").index(this);
        $(".phb-list .app-list").addClass('hide');
        $(".phb-list .app-list").eq(index).removeClass('hide');
    })
    $("#link-btn").click(function(){
        if($("#link-btn").hasClass("on")){
            $("#link-btn").removeClass("on");
            $(".links-list").css('height','50px');
        }else{
            $("#link-btn").addClass("on");
            $(".links-list").css('height','auto');
        }
    })
})

$(document).ready(function(){
    var n=$(".app-classify li").length;
    var a=true;
    var y=null;
    $(".app-classify li span").click(function(){
        if(a){
            for(var i=7;i<n-1;i++){
                $(".app-classify li").eq(i).removeClass('hide');
            }
            $(".app-classify li span").text("收起部分");
            a=false;
        }else{
            for(var i=7;i<n-1;i++){
                $(".app-classify li").eq(i).addClass('hide');
            }
            $(".app-classify li span").text("展开更多");
            a=true;
        }

    });
})


$(function(){
    $(".intro img").click(function(){
        var n = $(".intro img").index(this);
        if($(".intro img").length > 0){
            var i = '';
            var e = '';
            $(".intro img").each(function() {
                var src = $(this).attr("src");
                i += '<li class="swiper-slide"><div class="swiper-zoom-container"><img src="' + src + '"></div></li>';
            });
            if ($(".imgmodal").length < 1) {
                var a = "";
                a += '<div class="imgmodal">',
                a += '    <div class="swiper-container">',
                a += '        <ul class="swiper-wrapper">' + i + "</ul>",
                a += '        <div class="swiper-pagination swiper-pagination-white"></div>',
                a += "    </div>",
                a += '    <span class="close">关闭</span>',
                a += "</div>",
                $("body").append(a);
            }
            new Swiper(".imgmodal .swiper-container", {
                initialSlide: n,
                zoom: !0,
                zoom: {
                    maxRatio: 2,
                    toggle: false
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction"
                }
            })   
        };

        $(".imgmodal,.imgmodal .close").click(function(){
            $(".imgmodal").remove();
        })
    });

});


$(function(){
    var nowUrl = window.location.href;
    var keyChart0= nowUrl.split("/")[3];
    var keyChart1= nowUrl.split("/")[4];
    var matches = nowUrl.match( /,[^/]*,([^\/]*)/ );
    console.log( matches ? matches[1] : 'no matches!');

if (keyChart1 !=""){
    $("#subNav li").removeClass("active");
    $("#subNav li[data-cls="+keyChart1+"/"+keyChart1+"]").addClass("active");
}

    console.log(keyChart);
});