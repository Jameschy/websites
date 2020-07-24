/**
 * Banner图切换效果
 * slidetype  切换效果的类型，目前有 0-淡入 1-左切入 2下切入 3-类幻灯片
 * effecttype 效果显示(出来的效果),这里一般使用切换效果(effecttype)+文字效果
 */
function zbanner_init(){
	var obj=$('#banner_edit');
	var type=obj.data('type');  //Banner插件类型,类型种类看ly200类
	var mask_width=obj.data('width');  //建议图片尺寸宽度
	var mask_height=obj.data('height');  //建议图片尺寸高度
	var banner_tab=0;  // 当前菜单卡
	var banner_tab_last = 0; // 上一个菜单卡
	var banner_auto=0; // 自动运行
	var banner_size=obj.find('.banner_list').size();
	var banner_init = 0;  // 是否需要第一次就执行切换效果
	var slidetype = 0;  // 效果类型
	var is_txt_effect = 0;  // 是否又文字效果  0-没有 1-有
	var effecttype = obj.data('slidetype');  //滚动类型
	var image_ary = {}; // 需要加载的图片对象
	var mainpic_ary = [];  // 需要加载的主图数组
	var mainpic_ary_param = {}; // 需要加载的主图的参数对象
	// 组合初始化
	if (effecttype == 0) {
		slidetype = 0;
		is_txt_effect = 0;
	} else if (effecttype == 1) {
		slidetype = 1;
		is_txt_effect = 0;
	} else if (effecttype == 2) {
		slidetype = 2;
		is_txt_effect = 0;
	} else if (effecttype == 3) {
		banner_init = 1;
		slidetype = 3;
		is_txt_effect = 1;
		var txt_func = function(){
			setTimeout(function(){
				txt_effect(obj.find('.banner_title'), {'effect':'2', 'duration':'0.5', 'delay':'500', 'direction':'top', 'opacity':'1'});
				txt_effect(obj.find('.banner_brief'), {'effect':'2', 'duration':'0.5', 'delay':'500', 'direction':'bottom', 'opacity':'1'});
			}, 1000);
		}
	} else if (effecttype == 4){
		banner_init = 1;
		slidetype = 0;
		is_txt_effect = 1;
		var txt_func = function(){
			txt_effect(obj.find('.banner_title'), {'effect':'2', 'duration':'0.8', 'direction':'top', 'opacity':'1'});
			txt_effect(obj.find('.banner_brief'), {'effect':'2', 'duration':'0.8', 'direction':'top', 'opacity':'1'});
			txt_effect(obj.find('.banner_mainpic'), {'effect':'2', 'duration':'0.8', 'direction':'bottom', 'opacity':'1', 'distance':'30%'});
		}
	} else if (effecttype == 5) {
		banner_init = 1;
		slidetype = 3;
		is_txt_effect = 1;
		var txt_func = function(){
			setTimeout(function(){
				txt_effect(obj.find('.banner_title'), {'effect':'2', 'duration':'0.5', 'delay':'500', 'direction':'right', 'hidden':1});
				txt_effect(obj.find('.banner_brief'), {'effect':'2', 'duration':'0.5', 'delay':'600', 'direction':'right', 'hidden':1});
			}, 1000);
		}
	}
	var txt_effect = function(txt, ext){ // txt:执行对象 ext:json数组，包括最基本的effect，其他由其效果需求决定 例:{effect:2}  effect:1-淡入 2-划入
		// 初始化
		if (ext.effect == 1) {
			txt.css('opacity', '0');
		} else if (ext.effect == 2) {
			if (ext.hidden == 1) {
				txt.css('overflow', 'hidden');
			}
			if (!txt.find('.txt_effect2').size()) txt.wrapInner('<div class="txt_effect2"></div>');
			txt.find('.txt_effect2').removeClass('current');
			var txt_effect2_direction = {
				'left'  : {'axis':'X', 'rate':'-'},
				'top'   : {'axis':'Y', 'rate':'-'},
				'right' : {'axis':'X', 'rate':''},
				'bottom': {'axis':'Y', 'rate':''}
			};
			var distance = '100%';
			if (ext.distance) {
				distance = ext.distance;
			}
			var txt_effect2_css = {
				'transform'  : 'translate' + txt_effect2_direction[ext.direction].axis + '(' + txt_effect2_direction[ext.direction].rate + distance + ')'
			};
			if (ext.opacity == 1) {
				txt_effect2_css.opacity = 0;
			}
			txt.find('.txt_effect2').css(txt_effect2_css);
		}
		txt.show();
		// 效果
		if (ext.effect == 1) {
			txt.animate({'opacity':'1'}, ext.duration);
		} else if (ext.effect == 2) {
			setTimeout(function(){
				txt.find('.txt_effect2').addClass('current');
				var txt_effect2_current_css = {
					'transition' : 'all ' + ext.duration + 's ease',
					'transform' : 'translate' + txt_effect2_direction[ext.direction].axis + '(0)'
				};
				if (ext.opacity == 1) {
					txt_effect2_current_css.opacity = 1;
				}
				txt.find('.txt_effect2.current').css(txt_effect2_current_css);
			}, ext.delay);
		}
	}
	var init=function(){
		// 初始化设置不同类型
		obj.children('.banner_loading').show();
		if (slidetype == 3) {
			obj.addClass('banner_slidetype3');
			obj.find('.banner_list').hide().eq(banner_tab).show();
			if (!obj.find('.banner_slide_mask1').size()) obj.find('.banner_box').after('<div class="banner_slide_mask1"></div><div class="banner_slide_mask2"></div>');
		}else if(slidetype==2){
			obj.find('.banner_box').width(banner_size*100+'%').find('.banner_list').css('float', 'left');
		}else if(slidetype==1){
			obj.find('.banner_box').height(banner_size*100+'%').find('.banner_list').height((100/banner_size).toFixed(2)+'%');
		}else{
			obj.find('.banner_list').css({'position':'absolute', 'top':0, 'left':0}).hide().eq(banner_tab).show();
		}
		if(banner_size<=1) obj.find('.banner_tab, .banner_prev, .banner_next').hide();
		if(type==2){
			//obj.height(mask_height);
			obj.height('100%').parent().height('100%');
		}else if(type==1){
			obj.height(parseInt(mask_height*obj.width()/mask_width));
		}
		// 循环处理每张图片
		obj.find('.banner_list').each(function(index){
			var _this=$(this);
			// 处理动作
			var action = function(image){
				var height=image.height;  //图片高度
				_this.width(obj.width());  //前台图片框宽度
				var rate=obj.width()/mask_width;
				var param=_this.data('data');
				param=JSON.stringify(param);
				param=JSON.parse(param);
				if(rate<1 && type!=2){  //等比例缩放
					if(param['title']['font-size']) param['title']['font-size']=parseInt(param['title']['font-size'])*rate+'px';
					if(param['brief']['font-size']) param['brief']['font-size']=parseInt(param['brief']['font-size'])*rate+'px';
					if (param['mainpic'] != null) {  // mainpic新增(这里可能有个bug，当banner图片小于这张主图，就可能会会出现主图的宽度获取错误)
						var mainpicurl = _this.find('.banner_mainpic img').attr('src');
						if (mainpicurl) {
							if ($.inArray(mainpicurl, mainpic_ary) == -1) {  // 初次加载
								mainpic_ary.push(mainpicurl);
								var mainpic = new Image();
								mainpic.src = mainpicurl;
								mainpic_ary_param[mainpicurl] = {'width':mainpic.width};
							}
							param['mainpic']['width'] = mainpic_ary_param[mainpicurl].width * rate;
						}
					}
				}
				var left=param['banner']['left'];
				var top=param['banner']['top'];
				_this.find('.banner_position').css({'left':left, 'top':top});
				if(type==2){  //计算左定位偏移差
					_this.find('.banner_position').css({width:mask_width, height:image.height, 'left':'50%', 'margin-left':-mask_width/2});
				}else if(type==1){
					_this.find('.banner_position').css({'width':image.width>obj.width()?obj.width():image.width*rate, 'height':image.width>obj.width()?obj.width()*image.height/image.width:image.height*rate});
				}else{
					height=parseInt(obj.width()*image.height/image.width);
					if(image.width<obj.width()) height=image.height;  //图片小于容器宽度
					height=height+1;  //兼容像素小数点导致左右有白边
					obj.height(height).parent().parent().height(height);
					_this.find('.banner_position').css({width:obj.width(), height:height});
				}
				_this.find('.banner_title').css(param['title']);
				_this.find('.banner_brief').css(param['brief']);
				if (param['mainpic'] != null) {  // mainpic新增
					_this.find('.banner_mainpic').css(param['mainpic']);
				}
				if(banner_size - index == 1) obj.children('.banner_loading').fadeOut();
				if(_this.find('a').size()) _this.find('div').css('cursor', 'pointer'); //有链接,子元素增加a效果
				if (banner_init == 1) {
					obj.find('.banner_tab a').eq(0).trigger('mouseenter');
				}
			}
			if (image_ary[index]) {  // 非初次加载
				action(image_ary[index]);
			} else {  // 初次加载
				image_ary[index] = {};
				image_ary[index]['src'] = _this.find('img').attr('src');
				var image = new Image();
				image.src = image_ary[index]['src'];
				image.onload = function(){
					image_ary[index]['width'] = image.width;
					image_ary[index]['height'] = image.height;
					action(image_ary[index]);
				}
			}
		});
	}
	var auto_play=function(){
		if(banner_size<=1){  //只有一张图或者后台时,不执行切换
			clearInterval(banner_auto);
			return;
		}
		obj.find('.banner_next').trigger('click');
	}
	var check_is_animate = function(){  // 检测是否正在切换中
		var result = false;
		if (slidetype == 3) {
			if (obj.find('.banner_slide_mask1').is(':animated')) result = true;
		}
		return result;
	}
	var turn_banner=function(turn){
		if(slidetype == 3) {
			if (is_txt_effect == 1) {
				// 隐藏文字
				obj.find('.banner_title, .banner_brief').hide();
			}
			// 隐藏广告图
			obj.find('.banner_list').hide();
			// 2张图片设置好路径
			var nex_tab = banner_tab;
			var mask_img1 = obj.find('.banner_list').eq(banner_tab_last).find('img').attr('src');
			var mask_img2 = obj.find('.banner_list').eq(nex_tab).find('img').attr('src');
			obj.find('.banner_slide_mask1').html('<img src="' + mask_img1 + '" />');
			obj.find('.banner_slide_mask2').html('<img src="' + mask_img2 + '" />');
			// 需要显示的广告图延迟载入
			obj.find('.banner_list').eq(nex_tab).css({'left':'-10%', 'opacity':'0'}).show();
			setTimeout(function(){
				obj.find('.banner_list').eq(banner_tab).animate({'left':'0', 'opacity':'1'}, 1000);
			}, 1000);
			if (is_txt_effect == 1) {
				txt_func();
			}
			// 当前图片半透明划走
			obj.find('.banner_slide_mask1').show().animate({'left':'200%'}, 2000, 'swing', function(){
				$(this).hide().css('left', '0');
			});
			obj.find('.banner_slide_mask1 img').animate({'opacity':'0'}, 3000);
			// 下张图片划进
			obj.find('.banner_slide_mask2').show().animate({'left':'100%'}, 2000, 'swing', function(){
				$(this).hide().css('left', '-100%');
			});
		}else if(slidetype==2){
			obj.find('.banner_box').animate({'left':'-'+banner_tab*100+'%'});
		}else if(slidetype==1){
			obj.find('.banner_box').animate({'top':'-'+banner_tab*100+'%'});
		}else{
			if (is_txt_effect == 1) {
				txt_func();
			}
			obj.find('.banner_list').stop(true, true).eq(banner_tab).fadeIn().siblings().fadeOut();
		}
		obj.find('.banner_tab a').stop(true, true).eq(banner_tab).addClass('on').siblings().removeClass('on');
	}
	init();
	banner_auto=setInterval(auto_play, 6000);
	$(window).resize(function(){init();});
	obj.find('.banner_tab').off().on('mouseenter', 'a', function(){
		if (check_is_animate()) return;
		banner_tab_last = banner_tab;
		banner_tab=$(this).index();
		turn_banner();
	});
	obj.off('mouseenter').on('mouseenter', function(){
		clearInterval(banner_auto);
	});
	obj.off('mouseleave').on('mouseleave', function(){
		banner_auto=setInterval(auto_play, 6000);
	});
	obj.find('.banner_prev').off().on('click', function(){
		banner_tab = banner_tab > 0 ? --banner_tab : banner_size-1;
		turn_banner();
	});
	obj.find('.banner_next').off().on('click', function(){
		if (check_is_animate()) return;
		banner_tab_last = banner_tab;
		banner_tab = banner_tab < banner_size-1 ? ++banner_tab : 0;
		turn_banner();
	});
}