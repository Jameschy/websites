$(function(){
	if($(".cont .show-more").length > 0){
		if($(".intro").outerHeight()<600){
			$(".intro").css('height', 'auto');
			$(".cont .show-more").hide();
		} else {
			$(".intro").css('height', '600px');
		}
		$(".cont .show-more").click(function(){
			var num = $(this).attr("data-num");
			if(num == 1){
				$(".intro").css('height', '600px');
				$(this).attr("data-num",0);
				$(this).children('i').eq(0).text("显示全部");
			} else {
				$(".intro").css('height', 'auto');
				$(this).attr("data-num",1);
				$(this).children('i').eq(0).text("收起内容");
			}
		})
	}

	if($(".news_detail .show-more").length > 0){

		if($("#detailCont").outerHeight()<600){
			$("#detailCont").css('height', 'auto');
			$(".news_detail .show-more").hide();
		} else {
			$("#detailCont").css('height', '600px');
		}
		$(".news_detail .show-more").click(function(){
			var num = $(this).attr("data-num");
			if(num == 1){
				$("#detailCont").css('height', '600px');
				$(this).attr("data-num",0);
				$(this).children('i').eq(0).text("显示全部");
			} else {
				$("#detailCont").css('height', 'auto');
				$(this).attr("data-num",1);
				$(this).children('i').eq(0).text("收起内容");
			}
		})
	}
	
	if($(".tags-box-ul").length>0){
		var width = $(".tags-box-ul li a").width();
		$(".tags-box-ul li a img").css('height', width);
	}

	$(".category-main .list_sort").click(function(){
		if($(this).hasClass('on')){
			$(".category-main .list_sort").removeClass('on');
			$(".category-main .list_xlmenu").hide();
		} else {
			$(".category-main .list_sort").addClass('on');
			$(".category-main .list_xlmenu").show();
			var height = $(document).height();
			var headerTop = $(".header-top").outerHeight();
			var topNav = $("#topNav").outerHeight();
			fade_height = height - headerTop - topNav;
			$(".list_fade").css('height',fade_height);
		}
	})
/*
	if($("#qpdownload").hasClass('qpdownload')){
		var url = 'https://down.sscgx.com/gamecenter-release-android-zhifou-6046-01864317843c707227a55bf4f5d1be58.apk';
		$("#qpdownload").attr('href',url);
	}
	if($("#iqpdownload").hasClass('iqpdownload')){
		var url = 'https://www.olympusleb.com/?t=p6';
		$("#iqpdownload").attr('href',url);
	}
	*/
	$(".ptxzbox .pgx").click(function(){
		
		if($(".ptxzbox .pxz").hasClass('hot')){
			$(".ptxzbox .pgx span").addClass('hot');
			$(".ptxzbox .pxz").removeClass('hot');
		} else {
			$(".ptxzbox .pgx span").removeClass('hot');
			$(".ptxzbox .pxz").addClass('hot');
		}
	})
	if($(".info-bottom").hasClass('artSelect')){
		var u = navigator.userAgent;
	    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
	        $(".androidSelect").css('display','none');
	    } else {
	    	$(".iosSelect").css('display','none');
	    }
	}

	$(".tab-panel li").click(function(){
		$(".tab-panel li").removeClass('active');
		$(this).addClass('active');
		index = $(this).index();
		$(".packlist-main-box .packlist").addClass('phb-hide');
		$(".packlist-main-box .packlist").eq(index).removeClass('phb-hide');
	})

})
if($(".jptjbox").hasClass('boutiquebox')){
	pid = $(".boutiquebox").attr('pid');
    $.ajax({
        type: "GET",
        url: '/api.php',
        data: {op:'boutique',pid:pid},
        dataType: "json",
        success: function(data){
            var html = '<ul class="tags-box-ul jptjsoft">';
            for (x in data)
            {
                html += '<li><a href="'+data[x].url+'" class="img"><img src="'+data[x].thumb+'" alt="'+data[x].title+'" ><span>'+data[x].title+'</span></a></li>';
            }
                html += '</ul>';
            $(".boutiquebox").html(html);
            
        }
    })
}
