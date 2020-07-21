/*统计代码*/
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?2d3f812a7c2e85afb2333356c141700d";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

/*自动推送*/
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();



/*
 * 返回顶部
 */
$(function () {
    var str = '<div class="bkt"></div>';
    $('.footer').append(str);
    var bkt = $('.bkt');
    isBk();
    $(window).scroll(function () {
        isBk();
    });
    function isBk() {
        if ($(window).scrollTop() > $(window).height() * .6) {
            bkt.show();
        } else {
            bkt.hide();
        }
    }

    bkt.click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
    });
});

/*
 * 首页推荐最新 专题
 */
$(function () {
    var tlt = $('#zxtj-tab li');
    tlt.hover(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.zxtjbox').find('.zxtj-list').eq($(this).index()).removeClass('hide').siblings('.zxtj-list').addClass('hide');
        $(this).parents('.index-zxtj').children('.phbbox').addClass('hide');
        $(this).parents('.index-zxtj').children('.phbbox').eq($(this).index()).removeClass('hide');
    });

    var tlt = $('#zxzt-tab li');
    tlt.hover(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.zxztbox').find('.zxzt-list').eq($(this).index()).removeClass('hide').siblings('.zxzt-list').addClass('hide');
    });
});

/*
 * 下载排行
 */

$(function () {
    $(".phb-list li").mouseover(function(){
        $(this).parent().find("li").removeClass("on");
        $(this).addClass("on");
    });
});

/*
 * friendLinks
 */

$(function () {
    $(".friendLinks ul li").mouseover(function(){
        $(this).parent().find("li").removeClass("on");
        $(this).addClass("on");
        $('.fb-1').eq($(this).index()).removeClass('hide').siblings('.fb-1').addClass('hide');
    });
});

/*
 * news
 */

$(function () {
    $(".newsLeft .tab-item").click(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(".newsRight").find('ul').eq($(this).index()).removeClass('hide').siblings('ul').addClass('hide');
    });
});

/*
 * 固定位置
 */
$(function () {
    if($('.softtj').length > 0){
        $('.softtj').scrollToFixed({
            marginTop: -20,
        })
    }
});
/*
 * 软件详情展开全文
 */
$(window).load(function() {

    var desc = $('.soft-content'),
        more = $('.cont-more'),
        maxH = 620,
        curH,
    curH = desc.outerHeight();
    if (curH == null) {
        curH = maxH + 1;
    }
    desc.css('height', maxH);
    more.click(function () {
        if ($(this).hasClass('on')) {
            desc.animate({
                'height': maxH
            }, 500);
            $(this).removeClass('on').find('span').text('查看全部');
        } else {
            desc.animate({
                'height': curH
            }, 500);
            $(this).addClass('on').find('span').text('收起部分');
        }
    });
});

/*
 * index_box1
 */
$(function () {
    var tlt = $('.index-box1 .index-tlt .index-list-1 h3');
    tlt.hover(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $(this).parents('.index-box1').find('.index-list-con>div').eq($(this).index()).addClass('show').siblings().removeClass('show');
    });
});

//自动手机端
function showMobile(url){
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent)||(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)){
                window.location.href=url
                }
            }catch(e){}
        }
    }
};

/*
 * 下载排行
 */
$(function () {
    var xzph = $('.xzph,.rmxz'),
        tlt = xzph.find('.tlt-lbl label'),
        list_con = xzph.find('ul');

    tlt.hover(function () {
        list_con.eq($(this).index()).addClass('show').siblings().removeClass('show');
        $(this).addClass('on').siblings().removeClass('on');
    });
    list_con.find('li').hover(function () {
        $(this).addClass('on').siblings().removeClass('on');
    });
});

/*
 * dnrj
 */
$(function () {
    var tlt = $('.index-dnrj .zxzt-tab li');
    tlt.hover(function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parents('.index-dnrj').find('.list-con>div').eq($(this).index()).addClass('show').siblings().removeClass('show');
    });
});