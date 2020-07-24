/*
Powered by ueeshop.com		http://www.ueeshop.com
广州联雅网络科技有限公司		020-83226791
*/

var review_obj={
	List:$('.reviews_list'),
	init:function(){
		review_obj.ajax_review_list({"page":0, "ProId":review_obj.List.attr("data-proid"), "Rating":review_obj.List.attr("data-rating"), "Action":review_obj.List.attr("data-action")}, 1);
		
		//评级筛选
		$('.review_histogram a').on('click', function(){
			review_obj.ajax_review_list({"page":review_obj.List.attr("data-page"), "ProId":review_obj.List.attr("data-proid"), "Rating":$(this).attr('data-rating'), "Action":review_obj.List.attr("data-action")}, 1);
		});
	},
	ajax_review_list:function(data, clear){
		clear && review_obj.List.html('');
		review_obj.List.loading();
		$(".loading_msg").css({"top":0, "position":"initial", "width":"auto", "height":300, "background-position":"center"});
		setTimeout(function(){
			var get_ext='';
			if($('#TId').length) get_ext='?TId='+$('#TId').val();
			$.ajax({
				url:"/ajax/review_list.html"+get_ext,
				async:false,
				type:'post',
				data:data,
				dataType:'html',
				success:function(result){
					if(result){
						review_obj.List.append(result).unloading();
						review_obj.List.attr('data-number', '0');
					}else{
						var html='<div class="content_blank">'+lang_obj.seckill.no_products+'</div>';
						review_obj.List.append(html).unloading();
						review_obj.List.attr('data-number', '1');
					}
					review_obj.review();
					review_obj.lightBox();
				}
			});
		}, 300);
	},
	review:function(){
		//评论翻页
		$('#turn_page a').on('click', function(){
			var page=$(this).attr('href').replace(/\/ajax\/(.*).html/g, '$1');
			review_obj.ajax_review_list({"page":page, "ProId":review_obj.List.attr("data-proid"), "Rating":review_obj.List.attr("data-rating"), "Action":review_obj.List.attr("data-action")}, 1);
			return false;
		});
		
		//点赞
		$('.likeWrapper a').bind('click', function(){
			var e=$(this);
			$.ajax({
				url:e.attr('href'),
				type:'get',
				dataType:'json',
				success:function(result){
					if(result.ret==1){
						e.find('span').text(result.msg);
					}else if(result.ret==0){
						window.top.location='/account/sign-up.html';
					}else if(result.ret==2){
						global_obj.win_alert_auto_close(lang_obj.global.unrepeat);
					}
				}
			});
			return false;
		});
		
		//评论回复显藏效果
		$('.reply_btn').bind('click',function(){
			$(this).parents('.reply').find('.write_reply').toggleClass("hide");
			$(this).parents('.reply').find('.w_review_replys').toggleClass("hide");
			return false;
		});
		$('.write_reply textarea').focus(function(){
			if($(this).val()==lang_obj.review.reply_here){
				$(this).val('');
			}
			$(this).next('.errors').text('');
		}).blur(function(){
			if($(this).val()==''){
				$(this).val(lang_obj.review.reply_here);
			}
		}).click(function(){
			if($(this).parent().next().text().length>0){
				$(this).parent().next().text('');
			}
		});
		
		//评论回复
		$('.write_reply .textbtn').bind('click',function(){
			var e=$(this),
				value=e.parents('form').find('textarea').val();
			e.prev('.error').text('');
			if(!value || value==lang_obj.review.reply_here || value.replace(/(\s|　)/g,'')==''){
				e.prev('.error').text(lang_obj.review.reply_tips_null);
				return false;
			}
			if(value.length>5000){
				e.prev('.error').text(lang_obj.review.reply_tips_max);
				return false;
			}
			e.attr('disabled', true);
			$.ajax({
				url:'/?do_action=user.submit_review',
				data:e.parents('form').find('input[type=hidden], textarea'),
				type:'post',
				dataType:'json',
				complete:function(xhr, status){
					e.attr('disabled',false);
				},
				success:function(result){ //评论成功
					if(result && result.msg.ok){
						e.parents('form').find('textarea').val(lang_obj.review.reply_here);
						if(result.msg.audit==1){ //通过审核
							e.prev('.error').text(lang_obj.review.reply_tips_successed);
							var $Html='';
							$Html+=	'<li class="replylist" style="opacity:0;">';
							$Html+=		'<div class="name">'+result.msg.name+'</div>';
							$Html+=		'<div class="content">'+result.msg.info+'</div>';
							$Html+=		'<div class="time">'+result.msg.time+'</div>';
							$Html+=	'</li>';
							e.parents('.new_review_list').find('.reply_box').prepend($Html);
							e.parents('.new_review_list').find('.reply_box .replylist:eq(0)').animate({'opacity':1}, 1000);
						}else{ //等待审核
							e.prev('.error').text(lang_obj.review.reply_tips_success);
						}
					}else{ //评论失败
						e.prev('.error').text(lang_obj.review.reply_tips_error);
					}
				}
			});
			return false
		});
		
		//字长判断
		$.fn.checkCharLength = function(content){
			var e = $(this);
			e.change(function(event){
				var curLength = e.val().length,
				    maxlength = e.attr('maxlength');
				if (curLength > maxlength) {
					e.val($.trim(e.val()).substr(0, maxlength)).trigger('change');
					return;
				}
				$(content).text(maxlength - curLength).parent().toggleClass('red', curLength > maxlength);
                $('.font_tips>em').text(curLength);
			}).keyup(function(){
				e.trigger('change');
			});
		}
		$('#review_content').checkCharLength('#review_content_char');
		
		//star
		$('#review_form .review_star span').hover(function(){
			var ind=parseInt($(this).index());
			$('#review_form .review_star span:gt('+ind+')').removeClass('star_1').addClass('star_0');
			$('#review_form .review_star span:lt('+(ind+1)+')').removeClass('star_0').addClass('star_1');
		},function(){
			var star=parseInt($('[name=Rating]').val());
			if(isNaN(star)) star=0;
			$('#review_form .review_star span').removeClass('star_1').addClass('star_0');
			$('#review_form .review_star span:lt('+star+')').removeClass('star_0').addClass('star_1');
		}).click(function(){
			var ind=parseInt($(this).index());
			$('[name=Rating]').val((ind+1));
		});
		 
		//评论提交
		$('#review_form').submit(function(){
			var flag=0,
				e=$(this),
				error={
					//rating_0:'Your price is required.',
					//rating_1:'Your ease of use is required.',
					//rating_2:'Your build quality is required.',
					//rating_3:'Your usefulness is required.',
					//rating_4:'Your overall rating is required.',
					rating:lang_obj.review.rating,
					review_title:lang_obj.review.review_title
				};
			
			$(".error_info", e).html("");
			if(global_obj.check_form($('*[notnull]', e, 0, 1))) flag=1;
			$('*[notnull], e').each(function(){
				var id=$(this).attr('id');
				if(!$.trim($(this).val()) && error[id]){
					$(this).next().html(error[id]);
					flag=1;
				}
				//if(id=="review_content" && $(this).val().length<30){
				//	$(this).next().html("Please write at least 30 characters.");
				//	flag=1;
				//}else
				if(id=="review_content" && $(this).val().length>5000){
					$(this).next().html(lang_obj.review.review_max);
					flag=1;
				}
			});
	
			if(flag) return false;
			
			// var iframe=window.frames["reviews_img"];
			// var doc=iframe.contentDocument ? iframe.contentDocument : iframe.document;
			// if(!$(doc).parent('div:hidden').length){//submit the images
			// 	doc.forms[0].submit();
			// 	return false;
			// }
			
			e.find("input:submit").attr('disabled', true);
		});
		
		//Facebook分享
		function t(e, t, n, r, i, s, o){
			n = n || 640;
			r = r || 400;
			i = (window.screen.width - n) / 2;
			s = (window.screen.height - r) / 2;
			o || (o = ",menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes");
			return window.open(e, t, "width="+n+", height="+r+", screenX="+i+", screenY="+s+", top="+s+", left="+i+o);
		}
		$.fn.facebookShareDialog=function(n){
			var $this = this,
				obj = {
					app_id: ueeshop_config.FbAppId,
					redirect_uri: ueeshop_config.domain+"/?m=user&do_action=facebook_callback",
					display: "popup",
					link: n.fblink.replace(/^http:\/\//, "http://"),
					picture: n.fbpicture.replace(/^https/, "http"),
					name: n.fbname,
					caption: "By " + n.fbuser,
					actions: $.toJSON({
						name: "Read All Reviews",
						link: n.fblink2.replace(/^http:\/\//, "http://")
					}),
					description: ''
				};
			
			//$('.review_item .content').html("http://www.facebook.com/dialog/feed?"+jQuery.param(obj));
			t("http://www.facebook.com/dialog/feed?"+jQuery.param(obj), "facebook", 400, 350);
			return false;
		}
		$('.fb_share').click(function(){
			return;
			//var $this = $(this),
			//	o = $this.data("share");
			//$this.facebookShareDialog(o);
			//return false;
		});
	},
	lightBox:function(){
		$('.pic_list>a').lightBox();
	}
};

(function($){
	review_obj.init();
})(jQuery);

/*
(function($){
	var $List=$('.reviews_list');
	
	if($List.length){
		ajax_review_list({"page":0, "ProId":$List.attr("data-proid"), "Action":$List.attr("data-action")}, 1);
		
		//评级筛选
		$('.prod_review_filter .filtering input:radio').on('click', function(){
			ajax_review_list({"page":$List.attr("data-page"), "ProId":$List.attr("data-proid"), "Action":$List.attr("data-action")}, 1);
		});
		
		//评论翻页
		$('#turn_page a').on('click', function(){
			var page=$(this).attr('href').replace(/\/review_p(.*)\/(.*).html/g, '$2');
			ajax_review_list({"page":page, "ProId":$List.attr("data-proid"), "Action":$List.attr("data-action")}, 1);
			return false;
		});
		
		function ajax_review_list(data, clear){
			clear && $List.html('');
			$List.loading();
			$(".loading_msg").css({"top":0, "position":"initial", "width":"auto", "height":'4rem', "background-position":"center"});
			setTimeout(function(){
				$.ajax({
					url:"/ajax/review_list.html",//"/?m=ajax&a=review_list",
					async:false,
					type:'post',
					data:data,
					dataType:'html',
					success:function(result){
						if(result){
							$List.append(result).unloading();
							$List.attr('data-number', '0');
						}else{
							var html='<div class="content_blank">'+lang_obj.seckill.no_products+'</div>';
							$List.append(html).unloading();
							$List.attr('data-number', '1');
						}
					}
				});
			}, 300);
		}
	}
	
	//点赞
	$('.likeWrapper a').bind('click', function(){
		var e=$(this);
		$.ajax({
			url:e.attr('href'),
			type:'get',
			dataType:'json',
			success:function(result){
				if(result.ret==1){
					e.find('span').text(result.msg);
				}else{
					window.top.location='/account/sign-up.html';
				}
			}
		});
		return false;
	});
	
	//评论回复显藏效果
	$('.reply_btn').bind('click',function(){
		$(this).parents('.reply').find('.write_reply').toggleClass("hide");
		$(this).parents('.reply').find('.w_review_replys').toggleClass("hide");
		return false;
	});
	$('.write_reply textarea').focus(function(){
		if($(this).val()=='Add your reply here...'){
			$(this).val('');
		}
		$(this).next('.errors').text('');
	}).blur(function(){
		if($(this).val()==''){
			$(this).val('Add your reply here...');
		}
	}).click(function(){
		if($(this).parent().next().text().length>0){
			$(this).parent().next().text('');
		}
	});
	
	//评论回复
	$('.write_reply .textbtn').bind('click',function(){
		var e=$(this),
			value=e.parents('form').find('textarea').val();
		e.prev('.error').text('');
		if(!value || value=='Add your reply here...' || value.replace(/(\s|　)/g,'')==''){
			e.prev('.error').text('Please input your reply.');
			return false;
		}
		if(value.length>5000){
			e.prev('.error').text('Is your Review Content correct? Our system requires a maximum of 5000 characters.');
			return false;
		}
		e.attr('disabled', true);
		$.ajax({
			url:'/?do_action=user.submit_review',
			data:e.parents('form').find('input[type=hidden], textarea'),
			type:'post',
			dataType:'json',
			complete:function(xhr, status){
				e.attr('disabled',false);
			},
			success:function(result){
				if(result && result.msg.ok){
					e.parents('form').find('textarea').val('Add your reply here...');
					e.prev('.error').text('Return the contents of submitted successfully, waiting for the audit.');
				}else{
					e.prev('.error').text('Please refresh this page and try again.');
				}
			}
		});
		return false
	});
	
	//字长判断
	$.fn.checkCharLength=function(content){
		var e=$(this);
		e.change(function(event){
			var curLength=e.val().length;
			var maxlength=e.attr('maxlength');
			if(curLength>maxlength){
				e.val($.trim(e.val()).substr(0,maxlength)).trigger('change');
				return;
			}
			$(content).text(maxlength-curLength).parent().toggleClass('red', curLength>maxlength);
		}).keyup(function(){
			e.trigger('change');
		});
	}
	
	$('#review_content').checkCharLength('#review_content_char');
	
	//star
	$('#review_form .star').mousemove(function(e){
		var star=Math.floor((e.clientX-$(this).offset().left)/20+1),
			cl=$(this).attr('class');
		$(this).attr('class', cl.replace(/star_h\d/,'star_h'+star));
	}).mouseout(function(e){
		var cl=$(this).attr('class');
		$(this).attr('class', cl.replace(/star_h\d/,'star_h0'));
	}).click(function(e){
		var star=Math.floor((e.clientX-$(this).offset().left)/20+1),
			cl=$(this).attr('class');
		$(this).next().val(star);
		$(this).attr('class', cl.replace(/star_b\d/,'star_b'+star));
	});
	
	//评论提交
	$('#review_form').submit(function(){
		var flag=0,
			e=$(this),
			error={
				rating_0:'Your price is required.',
				rating_1:'Your ease of use is required.',
				rating_2:'Your build quality is required.',
				rating_3:'Your usefulness is required.',
				rating_4:'Your overall rating is required.',
				rating:lang_obj.review.rating,
				review_title:'Your title is required.'
			};
		
		$(".error_info", e).html("");
		if(global_obj.check_form($('*[notnull]', e))) flag=1;
		$('*[notnull], e').each(function(){
			var id=$(this).attr('id');
			if(!$.trim($(this).val()) && error[id]){
				$(this).next().html(error[id]);
				flag=1;
			}
			//if(id=="review_content" && $(this).val().length<30){
			//	$(this).next().html("Please write at least 30 characters.");
			//	flag=1;
			//}else
			if(id=="review_content" && $(this).val().length>5000){
				$(this).next().html("Remaining characters:Please don\'t exceed 5,000 characters.");
				flag=1;
			}
		});

		if(flag) return false;
		
		var iframe=window.frames["reviews_img"];
		var doc=iframe.contentDocument ? iframe.contentDocument : iframe.document;
		if(!$(doc).parent('div:hidden').length){//submit the images
			doc.forms[0].submit();
			return false;
		}
		
		e.find("input:submit").attr('disabled', true);
	});
	
	//Facebook分享
	function t(e, t, n, r, i, s, o){
		n = n || 640;
		r = r || 400;
		i = (window.screen.width - n) / 2;
		s = (window.screen.height - r) / 2;
		o || (o = ",menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes");
		return window.open(e, t, "width="+n+", height="+r+", screenX="+i+", screenY="+s+", top="+s+", left="+i+o);
	}
	$.fn.facebookShareDialog=function(n){
		var $this = this,
			obj = {
				app_id: ueeshop_config.FbAppId,
				redirect_uri: ueeshop_config.domain+"/?m=user&do_action=facebook_callback",
				display: "popup",
				link: n.fblink.replace(/^http:\/\//, "http://"),
				picture: n.fbpicture.replace(/^https/, "http"),
				name: n.fbname,
				caption: "By " + n.fbuser,
				actions: $.toJSON({
					name: "Read All Reviews",
					link: n.fblink2.replace(/^http:\/\//, "http://")
				}),
				description: ''
			};
		
		//$('.review_item .content').html("http://www.facebook.com/dialog/feed?"+jQuery.param(obj));
		t("http://www.facebook.com/dialog/feed?"+jQuery.param(obj), "facebook", 400, 350);
		return false;
	}
	$('.fb_share').click(function(){
		return;
		//var $this = $(this),
		//	o = $this.data("share");
		//$this.facebookShareDialog(o);
		//return false;
	});
	
})(jQuery);
*/