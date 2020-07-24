/*
Powered by ueeshop.com		http://www.ueeshop.com
广州联雅网络科技有限公司		020-83226791
*/
$(function(){
	$('#b_header .rightbar .menu').on('touchend',function(){
		$(this).parent().toggleClass('current');
	});
	if($('#blog_list').size()){
		//列表加载
		var page=1;
		var loading=0;
		var load_list=function(){
			if(!loading){
				loading=1;
				$.get('?', 'do_action=action.blog_list_loading&date='+date+'&Keyword='+Keyword+'&CateId='+CateId+'&Tags='+Tags+'&page='+page, function(data){
					if(data.ret=1){
						var html='';
						for(var key in data.msg[0]){
							html+='<div class="container">';
								html+='<div class="item">';
									html+='<div class="para">By '+data.msg[0][key].Author+' | <span>'+data.msg[0][key].Day+'</span> '+data.msg[0][key].YearMonth+' | <span>'+data.msg[0][key].Comments+'</span> Comments</div>';
									html+='<h2><a href="'+data.msg[0][key].Url+'" target="_blank">'+data.msg[0][key].Title+'</a></h2>';
									html+='<div class="bg"></div>';
									html+='<div class="con">'+data.msg[0][key].BriefDescription+'</div>';
									if(data.msg[0][key].PicPath){
										html+='<div class="img"><img src="'+data.msg[0][key].PicPath+'" /></div>';
									}
									html+='<div class="line"></div>';
									html+='<a href="'+data.msg[0][key].Url+'" target="_blank" class="read">READ MORE</a>';
								html+='</div>';
							html+='</div>';
							html+='<div class="spacing"></div>';
						}
						if(!data.msg[0].length && page==1){	//没有内容
							html+='<div class="container">';
								html+='<div class="item">';
									html+='<div class="con">No Data!</div>';
								html+='</div>';
							html+='</div>';
						}
						$('#blog_list').append(html);
						if(data.msg[2]==data.msg[3] || (!data.msg[0].length && page==1)) $('.blog_list_more').remove();
						page++;
					}
					loading=0;
				}, 'json');
				
			}
		}
		load_list();
		$('.blog_list_more').click(function(){load_list();});
	}
	//评论加载
	if($('.review_content').size()){
		var review_page=1;
		var review_loading=0;
		var load_review=function(){
			if(!review_loading){
				review_loading=1;
				$.post('?', 'do_action=action.blog_review_loading&AId='+$('input[name=AId]').val()+'&page='+review_page, function(data){
					if(data.ret==1){
						var html='';
						for(var key in data.msg[0]){
							html+='<div class="name">'+data.msg[0][key].Name+'</div>';
							html+='<div class="box">';
								html+='<div class="txt">'+data.msg[0][key].Content+'</div>';
								if(data.msg[0][key]['Reply']){
									html+='<div class="blank6"></div>';
									html+='<div class="txt"><span>Re：</span>'+data.msg[0][key]['Reply']+'</div>';	
								}
								html+='<div class="date">'+data.msg[0][key].AccTime+'</div>';
							html+='</div>';
						}
						$('.review_content').append(html);
						if(data.msg[2]==data.msg[3]) $('.review .more').remove();
						review_page++;
					}
					review_loading=0;
				}, 'json');
			}	
		}
		load_review();
		$('.review .more').click(function(){load_review();});
	}
	$('.form form').submit(function(){return false;});
	$('.form input:submit').click(function(){
		if(global_obj.check_form($('*[notnull]'), $('*[format]'))){return false;};
		$('.form input:submit').attr('disabled', true);
        if(!$('.form .ver_code').hasClass('completed')){
            global_obj.new_win_alert(lang_obj.verification.ver_error);
            return false;
        }
		$.post('?', $('.form form').serializeArray(), function(data){
			if (data.ret!=1){
				$('.form input:submit').removeAttr('disabled');
				global_obj.new_win_alert(data.msg);
			}else{
				global_obj.new_win_alert(data.msg, function(){
					window.location=window.location.href;
				}, '', undefined, '');
			}
		}, 'json');
	});
	$('.share_toolbox .share_s_btn').on('click', function(){//分享
		var $obj=$('.share_toolbox');
		if(!$(this).hasClass('share_s_more')){
			$(this).shareThis($(this).attr('data'), $obj.attr('data-title'), $obj.attr('data-url'));
		}
	});
})

//分享插件
$.fn.shareThis=function(type, title, url){
	var image=back_url=encode_url="";
	if(url==undefined){
		url=window.location.href;
	}
	if(url.indexOf("#")>0){
		url=url.substring(0, url.indexOf("#"));
	}
	if(type=="pinterest" && $(".container .con img:eq(0)").length){
		image=$(".container .con img:eq(0)").attr("src");
		if(image.indexOf('ueeshop.ly200-cdn.com')!=-1){
			image=$(".container .con img:eq(0)").attr("src");
		}else{
			image=window.location.protocol+'//'+window.location.host+$(".container .con img:eq(0)").attr("src");
		}
	}
	if(image!="" && image!=undefined){
		image=encodeURIComponent(image);
	}
	e_url=encodeURIComponent(url);
	title=encodeURIComponent(title);
	switch(type){
		case "delicious":
			back_url = "https://delicious.com/post?title=" + title + "&url=" + e_url;
			break;
		case "digg":
			back_url = "http://digg.com/submit?phase=2&url=" + e_url + "&title=" + title + "&bodytext=&topic=tech_deals";
			break;
		case "reddit":
			back_url = "http://reddit.com/submit?url=" + e_url + "&title=" + title;
			break;
		case "furl":
			back_url = "http://www.furl.net/savedialog.jsp?t=" + title + "&u=" + e_url;
			break;
		case "rawsugar":
			back_url = "http://www.rawsugar.com/home/extensiontagit/?turl=" + e_url + "&tttl=" + title;
			break;
		case "stumbleupon":
			back_url = "http://www.stumbleupon.com/submit?url=" + e_url + "&title=" + title;
			break;
		case "blogmarks":
			break;
		case "facebook":
			back_url = "http://www.facebook.com/share.php?src=bm&v=4&u=" + e_url + "&t=" + title;
			break;
		case "technorati":
			back_url = "http://technorati.com/faves?sub=favthis&add=" + e_url;
			break;
		case "spurl":
			back_url = "http://www.spurl.net/spurl.php?v=3&title=" + title + "&url=" + e_url;
			break;
		case "simpy":
			back_url = "http://www.simpy.com/simpy/LinkAdd.do?title=" + title + "&href=" + e_url;
			break;
		case "ask":
			break;
		case "google":
			back_url = "http://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + e_url + "&title=" + title;
			break;
		case "netscape":
			back_url = "http://www.netscape.com/submit/?U=" + e_url + "&T=" + title + "&C=";
			break;
		case "slashdot":
			back_url = "http://slashdot.org/bookmark.pl?url=" + url + "&title=" + title;
			break;
		case "backflip":
			back_url = "http://www.backflip.com/add_page_pop.ihtml?title=" + title + "&url=" + e_url;
			break;
		case "bluedot":
			back_url = "http://bluedot.us/Authoring.aspx?u=" + e_url + "&t=" + title;
			break;
		case "kaboodle":
			back_url = "http://www.kaboodle.com/za/selectpage?p_pop=false&pa=url&u=" + e_url;
			break;
		case "squidoo":
			back_url = "http://www.squidoo.com/lensmaster/bookmark?" + e_url;
			break;
		case "twitter":
			back_url = "https://twitter.com/intent/tweet?status=" + title + ":+" + e_url;
			break;
		case "pinterest":
			back_url = "http://pinterest.com/pin/create/button/?url=" + e_url + "&media=" + image + "&description=" + title;
			break;
		case "vk":
			back_url = "http://vk.com/share.php?url=" + url;
			break;
		case "bluedot":
			back_url = "http://blinkbits.com/bookmarklets/save.php?v=1&source_url=" + e_url + "&title=" + title;
			break;
		case "blinkList":
			back_url = "http://blinkbits.com/bookmarklets/save.php?v=1&source_url=" + e_url + "&title=" + title;
			break;
		case "linkedin":
			back_url = "http://www.linkedin.com/cws/share?url=" + e_url + "&title=" + title;
			break;
		case "googleplus":
			back_url = "https://plus.google.com/share?url=" + e_url;
			break;
	}
	window.open(back_url, "bookmarkWindow");
}