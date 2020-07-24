/*
Powered by ueeshop.com		http://www.ueeshop.com
广州联雅网络科技有限公司		020-83226791
*/

var global_obj={
	timer:'',
	check_form:function(notnull_obj, format_obj, type, is_new){
		var flag = false,
			is_new = (typeof(arguments[3]) == 'undefined') ? 0 : 1,
            errorObj = new Object;
		if (notnull_obj) {
			notnull_obj.each(function(){
				var $lang = $(this).parents('.tab_txt').attr('lang'); //后台语言版
                if (!errorObj[$lang]) {
                    errorObj[$lang] = 0;
                }
				if (!$(this).find('input').length && $.trim($(this).val()) == '') {
					if ($lang) {
                        //后台语言版
                        errorObj[$lang] += 1;
						$(this).parents('.rows').find('.tab_box_btn[data-lang='+$lang+']').addClass('empty');
						$('.r_con_wrap').animate({scrollTop:$(this).parents('.rows').position().top}, 0);
					}
					if ($(this).attr('parent_null')) {
                        //提示在父级
						$(this).parent().css('border', '1px solid red').addClass('null');
						$(this).parents('[parent_null]').css('border', '1px solid red').addClass('null');
					} else {
						$(this).css('border', '1px solid red').addClass('null');
					}
					flag == false && ($(this).focus());
					flag = true;
				} else {
					if (errorObj[$lang] == 0) {
                        $(this).parents('.rows').find('.tab_box_btn[data-lang='+$lang+']').removeClass('empty');
                    }
					if ($(this).attr('parent_null')) {
                        //提示在父级
						$(this).parents('[parent_null]').removeAttr('style').removeClass('null');
					} else {
						$(this).removeAttr('style').removeClass('null');
					}
				}
			});
			//后台语言版
			$('.rows').find('.tab_box_row .tips').hide();
			$('.rows').find('.tab_box_row .tab_box_btn').each(function(){
				if ($(this).hasClass('empty')) {
					$(this).parents('.tab_box_row').find('.tips').show();
				}
			});
			if (flag){ return flag; };
		}
		if(format_obj){
			var reg={
				'MobilePhone':/^1[34578]\d{9}$/,
				'Telephone':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Fax':/^(0\d{2,3})(-)?(\d{7,8})(-)?(\d{3,})?$/,
				'Email':/^\w+[a-zA-Z0-9-.+_]+@[a-zA-Z0-9-.+_]+\.\w*$/,
				'Length':/^.*/
			};
			var tips={
				'MobilePhone':lang_obj.format.mobilephone,
				'Telephone':lang_obj.format.telephone,
				'Fax':lang_obj.format.fax,
				'Email':lang_obj.format.email,
				'Length':lang_obj.format.length
			};
			if(type==1){
				format_obj.each(function(){
					var o=$(this);
					if($.trim(o.val())){
						if(reg[o.attr('format')].test($.trim(o.val()))===false){
							o.css('border', '1px solid red').addClass('null');
							o.focus();
							flag=true;
						}
					}
				});
			}else{
				format_obj.each(function(){
					var o=$(this);
					var s=o.attr('format').split('|');
					if(!$.trim(o.val())){
						flag=false;
					}else if((s[0]=='Length' && $.trim(o.val()).length!=parseInt(s[1])) || (s[0]!='Length' && reg[s[0]].test($.trim(o.val()))===false)){
						if(is_new==1){
							global_obj.new_win_alert(tips[s[0]].replace('%num%', s[1]));
						}else{
							global_obj.win_alert(tips[s[0]].replace('%num%', s[1]));
						}
						o.css('border', '1px solid red').addClass('null');
						o.focus();
						flag=true;
						return false;
					}
				});
			}
		}
		return flag;
	},

	win_alert:function(tips, callback, type, is_pop, status){
		var type=(typeof(arguments[2])=='undefined')?'alert':arguments[2],
			is_pop=(typeof(arguments[3])=='undefined')?0:1,
			status=(typeof(arguments[4])=='undefined')?'':arguments[4], //status => success(成功) fail(失败)
			not_remove_mask=$('.not_remove_mask:visible').length?1:0,	//不删除遮罩层
			html;
		$('#div_mask, .win_alert').remove();//优先清空多余的弹出框
		global_obj.div_mask();
		html='<div class="win_alert">';
			html+='<div class="win_close"><button class="close">x</button></div>';
			html+='<div class="win_tips '+status+'">'+tips+'</div>';
			html+='<div class="win_btns">';
				if(type=='confirm'){
					html+='<button class="btn btn_sure">'+lang_obj.global.confirm+'</button>';
					html+='<button class="btn btn_cancel">'+lang_obj.global.cancel+'</button>';
				}else{
					html+='<button class="btn btn_sure btn_once_sure">'+lang_obj.global.confirm+'</button>';
				}
			html+='</div>';
		html+='</div>';
		$('body').prepend(html);
		$('.win_alert').css({left:$(window).width()/2-$('.win_alert').outerWidth(true)/2,top:'30%'});
		if(type=='confirm'){
			$('.win_alert').delegate('.close, .btn_cancel', 'click', function(){
				$('.win_alert').remove();
				is_pop==0 && not_remove_mask==0 && global_obj.div_mask(1);
			}).delegate('.btn_sure', 'click', function(){
				$.isFunction(callback) && callback();
				$('.win_alert .close').click();
			});
			/*$(document).keyup(function(event){	//Esc、Space取消提示，空格、Enter确定提示
				if(event.keyCode==27 || event.keyCode==8){
					$('.win_alert .close').click();
				}else if(event.keyCode==32 || event.keyCode==13){
					$.isFunction(callback) && callback();
					$('.win_alert .close').click();
				}
			});*/
		}else{
			$('.win_alert').delegate('.close, .btn_sure', 'click', function(){
				$.isFunction(callback) && callback();
				$('.win_alert').remove();
				is_pop==0 && not_remove_mask==0 && global_obj.div_mask(1);
			});
			/*$(document).keyup(function(event){	//Esc、Enter、Space、空格取消提示
				if(event.keyCode==13 || event.keyCode==8 || event.keyCode==27 || event.keyCode==32) {
					$('.win_alert .close').click();
				}
			});*/
		}
		return false;
	},

	new_win_alert:function(tips, callback, type, is_pop, status, btn){ //status => await(叹号) fail(红叉)
		var type=(typeof(arguments[2])=='undefined')?'alert':arguments[2],
			is_pop=(typeof(arguments[3])=='undefined')?0:1,
			status=(typeof(arguments[4])=='undefined')?'await':arguments[4],
			btn=(typeof(arguments[5])=='undefined')?lang_obj.global.confirm:arguments[5],
			html;
		$('#div_mask, .new_win_alert').remove();//优先清空多余的弹出框
		global_obj.div_mask();
		html='<div class="new_win_alert themes_popups">';
			html+='<div class="win_close"><button class="close"></button></div>';
			html+='<div class="win_tips"><i class="icon_success_status '+status+'"></i>'+tips+'</div>';
			html+='<div class="win_btns">';
				if(type=='confirm') html+='<button class="btn btn_cancel">'+lang_obj.global.cancel+'</button>';
				html+='<button class="btn btn_sure">'+btn+'</button>';
			html+='<div class="clear"></div>';
			html+='</div>';
		html+='</div>';
		$('body').prepend(html);
		$('.new_win_alert').css({left:$(window).width()/2-$('.new_win_alert').outerWidth()/2, top:'30%'});
		if(type=='confirm'){
			$('.new_win_alert').delegate('.close, .btn_cancel', 'click', function(){
				$('.new_win_alert').remove();
				is_pop==0 && global_obj.div_mask(1);
			}).delegate('.btn_sure', 'click', function(){
				$.isFunction(callback) && callback();
				$('.new_win_alert .close').click();
			});
			/*$(document).keyup(function(event){	//Esc、Space取消提示，空格、Enter确定提示
				if(event.keyCode==27 || event.keyCode==8){
					$('.new_win_alert .close').click();
				}else if(event.keyCode==32 || event.keyCode==13){
					$.isFunction(callback) && callback();
					$('.new_win_alert .close').click();
				}
			});*/
		}else{
			$('.new_win_alert').delegate('.close, .btn_sure', 'click', function(){
				$.isFunction(callback) && callback();
				$('.new_win_alert').remove();
				is_pop==0 && global_obj.div_mask(1);
			});
			/*$(document).keyup(function(event){	//Esc、Enter、Space、空格取消提示
				if(event.keyCode==13 || event.keyCode==8 || event.keyCode==27 || event.keyCode==32) {
					$('.win_alert .close').click();
				}
			});*/
		}
		return false;
	},

	/*
	 *	@param:	tips			提示内容
	 *	@param:	status			类型，留空(打钩) await(叹号) fail(红叉) loading(加载中)
	 *	@param:	time			停留时间 (-1: 针对loading效果固定显示)
	 *	@param:	pos_top			与顶部的距离
	 *	@param:	no_remove_mask	是否优先清除多余的弹出框
	 */
	win_alert_auto_close:function(tips, status, time, pos_top, no_remove_mask){
		var status=(typeof(arguments[1])=='undefined')?'await':arguments[1],
			time=(typeof(arguments[2])=='undefined' || !arguments[2])?'2000':arguments[2],
			pos_top=(typeof(arguments[3])=='undefined' || !arguments[3])?'40%':arguments[3],
			no_remove_mask=(typeof(arguments[4])=='undefined')?1:arguments[4],
			html='';
		if(no_remove_mask) $('#div_mask, .new_win_alert').remove();//优先清空多余的弹出框
		if(status!='loading' || (status=='loading' && time==-1)){
			//除了loading Or 固定显示loading
			html+='<div class="new_win_alert win_alert_auto_close'+(status=='loading'?' win_alert_loading':'')+'">';
			html+=	'<div class="win_tips"><i class="icon_success_status '+status+'"></i>'+tips+'</div>';
			html+='</div>';
			$('body').prepend(html);
			$('.new_win_alert').css({left:$(window).width()/2-$('.new_win_alert').outerWidth(true)/2, top:pos_top});
		}
		clearTimeout(global_obj.timer);
		if(status!='loading' || (status=='loading' && time>=0)){
			//除了loading Or 计时自动关闭loading
			global_obj.timer=setTimeout(function(){
				$('.new_win_alert').remove();
			}, time);
		}
		return false;
	},

	div_mask:function(remove){
		var obj=(typeof(arguments[1])=='undefined')?'':arguments[1],
			$obj = $('body');
			if (typeof(obj) == 'object') $obj = obj;
		if(remove==1){
			$('#div_mask').remove();
		}else{
			if(!$('#div_mask').size()){
				$obj.prepend('<div id="div_mask"></div>');
				$('#div_mask').css({width:'100%', height:$(document).height(), overflow:'hidden', position:'fixed', top:0, left:0, background:'#000', opacity:0.6, 'z-index':10000});
			}
		}
	},

	data_posting:function(display, tips){
		if(display){
			$('body').prepend('<div id="data_posting"><img src="/static/ico/data_posting.gif" style="margin-top: 4px;display: inline-block;vertical-align: top;" width="16" height="16" align="absmiddle" />&nbsp;&nbsp;'+tips+'</div>');
			$('#data_posting').css({
				width:'188px',
				height:'24px',
				'line-height':'24px',
				padding:'0 8px',
				overflow:'hidden',
				border:'1px solid #bbb',
				background:'#ddd',
				position:'fixed',
				top:'40%',
				left:'0',
				right:'0',
				margin:'auto',
				'z-index':10001
			});
		}else{
			setTimeout('$("#data_posting").remove();', 500);
		}
	},

	urlencode:function(str) {
		str = (str + '').toString();
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	},

	json_encode_data:function(value){
		var result=new Object();
		if(typeof(value)=='string' && value){
			if(typeof(JSON)=='object'){
				result=JSON.parse(value);
			}else{
				var ary, arr, key;
				ary=value.substr(1,value.length-2).split(',"');//踢走{}
				for(var i=0; i<ary.length; i++){
					arr=ary[i].split(':');
					key=parseInt(isNaN(arr[0]) ? (i==0?arr[0].substr(1,arr[0].length-2):arr[0].substr(0,arr[0].length-1)): arr[0]);//确保键是数字
					if(arr[1].substr(0,1)=='['){//值为数组
						result[key]=arr[1].substr(1,arr[1].length-2).split(',');
					}else{
						result[key]=arr[1];
					}
				}
			}
		}else{
			result=value;
		}
		return result;
	},

	json_decode_data:function(value){
		var result;
		if(typeof(value)=='object'){
			if(typeof(JSON)=='object'){
				result=JSON.stringify(value);
			}else{
				result='';
				for(k in value){
					if(global_obj.is_array(value[k])){
						result+=('"'+k+'":['+value[k]+'],');
					}else{
						result+=('"'+k+'":"'+value[k]+'",');
					}
				}
				result='{'+result.substr(0,result.length-1)+'}';
			}
		}else{
			result=value;
		}
		return result;
	},

	in_array:function(needle, arr){
		for(var i=0; i<arr.length && arr[i]!=needle; i++);
		return !(i==arr.length);
	},

	is_array:function(data){
		if(Object.prototype.toString.call(data)=='[object Array]'){
			return true;
		}else{
			return false;
		}
	},

	base64_encode:function(str){
		var c1, c2, c3;
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var i = 0, len= str.length, string = '';
		while (i < len){
			c1 = str.charCodeAt(i++) & 0xff;
			if (i == len){
				string += base64EncodeChars.charAt(c1 >> 2);
				string += base64EncodeChars.charAt((c1 & 0x3) << 4);
				string += "==";
				break;
			}
			c2 = str.charCodeAt(i++);
			if (i == len){
				string += base64EncodeChars.charAt(c1 >> 2);
				string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
				string += base64EncodeChars.charAt((c2 & 0xF) << 2);
				string += "=";
				break;
			}
			c3 = str.charCodeAt(i++);
			string += base64EncodeChars.charAt(c1 >> 2);
			string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
			string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
			string += base64EncodeChars.charAt(c3 & 0x3F)
		}
		return string
	},

	htmlspecialchars:function(str){
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/"/g, '&quot;');
		str = str.replace(/'/g, '&#039;');
		return str;
	},

	htmlspecialchars_decode:function(str){
		str = str.replace(/&amp;/g, '&');
		str = str.replace(/&lt;/g, '<');
		str = str.replace(/&gt;/g, '>');
		str = str.replace(/&quot;/g, '"');
		str = str.replace(/&#039;/g, "'");
		return str;
    },

	setCookie:function(name, value, expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	},

	getCookie:function(name){
		if(document.cookie.length>0){
			start=document.cookie.indexOf(name+"=");
			if(start!=-1){
				start=start+(name.length+1);
				end=document.cookie.indexOf(";", start);
				if(end==-1) end=document.cookie.length;
				return unescape(document.cookie.substring(start, end));
			}
		}
		return "";
	},

	delCookie:function(name, expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()-1);
		var value=global_obj.getCookie(name)
		if(value){
			document.cookie=name+"="+escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		}
	},

	Waterfall:function(container, colWidth, colCount, cls){
		function Waterfall(param){
		    this.id = typeof param.container == 'string' ? document.getElementById(param.container) : param.container;
		    this.colWidth = param.colWidth;
		    this.colCount = param.colCount || 4;
		    this.cls = param.cls && param.cls != '' ? param.cls : 'wf-cld';
		    this.init();
		}
		//瀑布流
		Waterfall.prototype = {
		    getByClass:function(cls,p){
		        var arr = [],reg = new RegExp("(^|\\s+)" + cls + "(\\s+|$)","g");
		        var nodes = p.getElementsByTagName("*"),len = nodes.length;
		        for(var i = 0; i < len; i++){
		            if(reg.test(nodes[i].className)){
		                arr.push(nodes[i]);//
		                reg.lastIndex = 0;
		            }
		        }
		        return arr;
		    },
		    maxArr:function(arr){
		        var len = arr.length,temp = arr[0];
		        for(var ii= 1; ii < len; ii++){
		            if(temp < arr[ii]){
		                temp = arr[ii];
		            }
		        }
		        return temp;
		    },
		    getMar:function(node){
		        var dis = 0;
		        if(node.currentStyle){
		            dis = parseInt(node.currentStyle.marginBottom);
		        }else if(document.defaultView){
		            dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
		        }
		        return dis;
		    },
		    getMinCol:function(arr){
		        var ca = arr,cl = ca.length,temp = ca[0],minc = 0;
		        for(var ci = 0; ci < cl; ci++){
		            if(temp > ca[ci]){
		                temp = ca[ci];
		                minc = ci;
		            }
		        }
		        return minc;
		    },
		    init:function(){
		        var _this = this;
		        var col = [],//列高
		            iArr = [];//索引
		        var nodes = _this.getByClass(_this.cls,_this.id),len = nodes.length;
		        for(var i = 0; i < _this.colCount; i++){
		            col[i] = 0;
		        }
		        for(var i = 0; i < len; i++){
		            nodes[i].h = nodes[i].offsetHeight + _this.getMar(nodes[i]);
		            iArr[i] = i;
		        }

		        for(var i = 0; i < len; i++){
		            var ming = _this.getMinCol(col);
		            nodes[i].style.left = ming * _this.colWidth + "px";
		            nodes[i].style.top = col[ming] + "px";
		            col[ming] += nodes[i].h;
		        }

		        _this.id.style.height = _this.maxArr(col) + "px";
		    }
		};

		new Waterfall({
		    "container": container, //id
		    "colWidth": colWidth,
		    "colCount": colCount,//parseInt($('#themes_box').width()/220)
		    "cls": cls //class
		});

	},

	sort:function(a,b){ //属性键值排序 Ov: 是海外仓 要排到最后
		if(a.indexOf('Ov:')!=-1){
			a=99999999;
		}
		if(b.indexOf('Ov:')!=-1){
			b=99999999;
		}
		return a - b;
	},

	checkCharLength:function(box,content){ //字长判断
		var e=$(box);
		e.change(function(event){
			var curLength=e.val().length;
			var maxlength=e.attr('maxlength');
			if(curLength>maxlength){
				e.val($.trim(e.val()).substr(0,maxlength)).trigger('change');
				return;
			}
			$('#review_form .font_tips em').text(curLength);
			$(content).text(maxlength-curLength).parent().toggleClass('red', curLength>maxlength);
		}).keyup(function(){
			e.trigger('change');
		});
	},

	/**
	 *  获取当前地址url的get参数
	 *  @param value[string] 需要获取get的参数
	 *  @param selecter[string]  选择器，一般不需要，有些在iframe里面的，这里就写parent
	 */
	query_get:function(value, selecter)
	{
		if (selecter == 'parent') {
			var query = window.parent.location.search.substring(1);
		} else {
			var query = window.location.search.substring(1);
		}
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if(pair[0] == value) return pair[1];
		}
		return false;
	}

}

//Object => string
$.toJSON = typeof JSON == "object" && JSON.stringify ? JSON.stringify: function(e) {
	if (e === null) return "null";
	var t, n, r, i, s = $.type(e);
	if (s === "undefined") return undefined;
	if (s === "number" || s === "boolean") return String(e);
	if (s === "string") return $.quoteString(e);
	if (typeof e.toJSON == "function") return $.toJSON(e.toJSON());
	if (s === "date") {
		var o = e.getUTCMonth() + 1,
		u = e.getUTCDate(),
		a = e.getUTCFullYear(),
		f = e.getUTCHours(),
		l = e.getUTCMinutes(),
		c = e.getUTCSeconds(),
		h = e.getUTCMilliseconds();
		o < 10 && (o = "0" + o);
		u < 10 && (u = "0" + u);
		f < 10 && (f = "0" + f);
		l < 10 && (l = "0" + l);
		c < 10 && (c = "0" + c);
		h < 100 && (h = "0" + h);
		h < 10 && (h = "0" + h);
		return '"' + a + "-" + o + "-" + u + "T" + f + ":" + l + ":" + c + "." + h + 'Z"'
	}
	t = [];
	if ($.isArray(e)) {
		for (n = 0; n < e.length; n++) t.push($.toJSON(e[n]) || "null");
		return "[" + t.join(",") + "]"
	}
	if (typeof e == "object") {
		for (n in e) if (hasOwn.call(e, n)) {
			s = typeof n;
			if (s === "number") r = '"' + n + '"';
			else {
				if (s !== "string") continue;
				r = $.quoteString(n)
			}
			s = typeof e[n];
			if (s !== "function" && s !== "undefined") {
				i = $.toJSON(e[n]);
				t.push(r + ":" + i)
			}
		}
		return "{" + t.join(",") + "}"
	}
};

//string => Object
$.evalJSON = typeof JSON == "object" && JSON.parse ? JSON.parse: function(str) {
	return eval("(" + str + ")")
};

var //escape=/["\\\x00-\x1f\x7f-\x9f]/g,
	meta={
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	},
	hasOwn=Object.prototype.hasOwnProperty;

$.quoteString = function (str) {
	if (str.match(escape)) {
		return '"' + str.replace(escape, function (a) {
			var c = meta[a];
			if (typeof c === 'string') {
				return c;
			}
			c = a.charCodeAt();
			return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
		}) + '"';
	}
	return '"' + str + '"';
};

//解决浮点数精度丢失问题
$.fn.floatingNumber = function(type, arg1, arg2) {
	var result = '';
	if (type == 'addition') {
		//加法
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) { r1 = 0; }
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e){ r2 = 0; }
		m = Math.pow(10, Math.max(r1, r2));
		result = (Math.round(arg1 * m) + Math.round(arg2 * m)) / m;
	} else if (type == 'subtraction') {
		//减法
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length;
		} catch(e) { r1 = 0; }
		try {
			r2 = arg2.toString().split(".")[1].length;
		} catch(e) { r2 = 0; }
		m = Math.pow(10, Math.max(r1, r2)); //动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		result = parseFloat(((Math.round(arg1 * m) - Math.round(arg2 * m)) / m).toFixed(n));
	} else if (type == 'multiply') {
		//乘法
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch(e) {}
		try {
			m += s2.split(".")[1].length;
		} catch(e) {}
		result = Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	} else if (type == 'division') {
		//除法
		var t1 = 0, t2 = 0, r1, r2;
		try {
			t1 = arg1.toString().split(".")[1].length;
		} catch(e) {}
		try {
			t2 = arg2.toString().split(".")[1].length;
		} catch(e) {}
		with (Math) {
			r1 = Number(arg1.toString().replace(".", ""));
			r2 = Number(arg2.toString().replace(".", ""));
			result = (r1 / r2) * pow(10, t2 - t1);
		}
	}
	return result;
}
Number.prototype.add = function(arg) {
	return $('html').floatingNumber('addition', arg, this);
};
Number.prototype.sub = function(arg) {
	return $('html').floatingNumber('subtraction', this, arg);
};
Number.prototype.mul = function (arg) {
	return $('html').floatingNumber('multiply', arg, this);
};
Number.prototype.div = function (arg) {
	return $('html').floatingNumber('division', this, arg);
};

//价格显示插件
$.fn.priceShow=function(){
	var $price=0;
	$(this).find('.price_data[data]').each(function(){
		$price=parseFloat($(this).attr('data')).mul(parseFloat(ueeshop_config.currency_rate));
		$(this).text($('html').iconvPriceFormat($price, 2, '', 1));
	});
}

//货币格式显示
$.fn.iconvPriceFormat = function(price) {
	var method		= (typeof(arguments[1]) == 'undefined') ? 0 : arguments[1],
		currency	= (typeof(arguments[2]) == 'undefined') ? '' : arguments[2],
		is_currency	= (typeof(arguments[3]) == 'undefined') ? 0 : arguments[3],
		symbol		= ueeshop_config.currency_symbols,
		price		= parseFloat(price),
		result		= 0;
	currency == '' && (currency = ueeshop_config.currency);
	if (method == 0) {
		//符号+价格
		result = (Math.ceil(price.mul(10000).div(100)).div(100)).toFixed(2);
		is_currency == 1 && currency && (result = $('html').currencyFormat(result, currency));
		result = symbol + result;
	} else if (method == 1) {
		//符号
		result = symbol;
	} else {
		//价格
		result = (Math.ceil(price.mul(10000).div(100)).div(100)).toFixed(2);
		is_currency == 1 && currency && (result = $('html').currencyFormat(result, currency));
	}
	return result;
}

//货币格式显示
$.fn.currencyFormat=function(price, currency){
	var result=0;
	price=parseFloat(price);
	switch(currency){
		case 'USD':
		case 'GBP':
		case 'CAD':
		case 'AUD':
		case 'CHF':
		case 'HKD':
		case 'ILS':
		case 'MXN':
		case 'CNY':
		case 'SAR':
		case 'SGD':
		case 'NZD':
		case 'AED':
			result=price.formatMoney(2, '.', ','); break;
		case 'RUB':
			result=price.formatMoney(2, ',', ' '); break;
		case 'EUR':
		case 'BRL':
		case 'ARS':
			result=price.formatMoney(2, ',', '.'); break;
		case 'CLP':
		case 'NOK':
		case 'DKK':
		case 'COP':
			result=price.formatMoney(0, '', '.'); break;
		case 'JPY':
		case 'SEK':
		case 'KRW':
		case 'INR':
		case 'TWD':
			result=price.formatMoney(0, '', ','); break;
		default:
			result=price.formatMoney(2, '.', ','); break;
	}
	return result;
}

/**
 * 可视化滚动插件
 *
 * @param: data[object]	speed:滑动速度,默认300 count:产品可视数量,默认4 isTouch:开启触摸事件,默认0 number:插件序号,默认0 callback:插件回调函数，负责插件加载完毕后执行
 *
 * 按钮参考: <a href="javascript:;" rel="nofollow" data-btn-srcoll="插件序号" data-srcoll-direction="方向prev或者next"></a>
 * 绑定参考: $('#xxx').visualSrcoll({'speed':'500', 'isTouch':1});
*/
$.fn.visualSrcoll = function(data) {
    data = $.extend({
        obj: $(this),
        init: function() {
            this.self       = data.obj.html();
            this.html       = '';
            this.number     = data.number;
            this.index      = 0;
            this.speed      = data.speed || 300;
            this.count      = 4;
            this.isTouch    = data.isTouch || 0;
            this.element    = data.obj[0];
			this.callback	= data.callback || '';
			if (!this.element) {
				return false;
			}
            if (this.element.addEventListener) {
                if (this.isTouch == 1) {
                    this.element.addEventListener('touchstart', this, false);
                    this.element.addEventListener('touchmove', this, false);
                    this.element.addEventListener('touchend', this, false);
                }
                window.addEventListener('resize', this, false);
            }
            if (typeof(data.number) == 'undefined' && $('.box_visual_srcoll').size() > 0) {
                this.number = $('.box_visual_srcoll').size();
            }
			if (typeof(data.number) == 'undefined' && $('.box_visual_srcoll').size() == 0) {
				this.number = 0;
			}
            this.html += '<div class="srcoll_list">';
            this.html +=    '<a href="javascript:;" rel="nofollow" class="srcoll_btn srcoll_btn_prev" data-btn-srcoll="' + this.number + '" data-srcoll-direction="prev"></a>';
            this.html +=    '<a href="javascript:;" rel="nofollow" class="srcoll_btn srcoll_btn_next" data-btn-srcoll="' + this.number + '" data-srcoll-direction="next"></a>';
            this.html +=    '<div class="srcoll_suit" style="width:100%; overflow:hidden;">';
            this.html +=        '<div class="srcoll_suit_box">' + this.self + '</div>';
            this.html +=    '</div>';
            this.html += '</div">';
            data.obj.addClass('box_visual_srcoll').attr('data-box-srcoll', this.number).html(this.html);
            this.setup();
            this.bind();
			if ($.isFunction(this.callback)) {
				this.callback();
			}
        },
        setup: function() {
            this.suit           = data.obj.find('.srcoll_list .srcoll_suit');
            this.box            = data.obj.find('.srcoll_list .srcoll_suit_box');
            this.box.element    = this.box[0];
            this.children       = this.box.children();
            this.length         = this.children.size();
            //this.width          = this.children.eq(0).outerWidth(true);
			if (this.children.eq(0)[0].currentStyle) {
				//IE、Opera
				this.cElement = this.children.eq(0)[0].currentStyle;
			} else {
				//FF、Chrome、Safari
				this.cElement = getComputedStyle(this.children.eq(0)[0], false);
			}
			this.width = parseFloat(this.cElement.width) + parseFloat(this.cElement.marginRight) + parseFloat(this.cElement.marginLeft); //精准到小数点
            if (this.length < 2) {
                return false;
            }
            this.box.element.style.width = parseFloat(this.length * this.width + 1).toFixed(2) + 'px'; //1px为额外的偏移量
            this.slide(this.index, 0);
			for (i = 1; i <= this.length; ++i) {
				//兼容可视化
				if ((i * this.width) >= this.suit.width()) {
					this.count = i;
					if (((i - .5) * this.width) >= this.suit.width()) {
						//尚未超过半个
						this.count = i - 1;
					}
					break;
				}
			}
        },
        bind: function() {
            $('*[data-btn-srcoll="' + this.number + '"]').on('click', function() {
                $(this).data('srcoll-direction') == 'prev' ? data.prev() : data.next();
            });
        },
        prev: function() {
            if (this.index) {
                this.slide(this.index - 1, this.speed);
            }
        },
        next: function() {
            if (this.index < this.length - this.count) {
                this.slide(this.index + 1, this.speed);
            }
        },
        slide: function(index, speed) {
        	var moveWith = index * this.width;
        	var Offset = moveWith + this.suit.width() - this.length * this.width;
        	if(Offset > 0) {
        		moveWith = moveWith - Offset;
        	}
            style = this.box.element.style;
            style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + 'ms';
            style.MozTransform = style.webkitTransform = 'translate3d(' + -(moveWith) + 'px, 0, 0)';
            style.msTransform = style.OTransform = 'translateX(' + -(moveWith) + 'px)';
            this.index = index;
        },
        handleEvent: function(e) {
            var that = this;
            if (!e.touches) {
                e.touches = new Array(e);
                e.scale = false;
            }
            switch (e.type) {
                case 'touchstart': this.touchStart(e); break;
                case 'touchmove': this.touchMove(e); break;
                case 'touchend': this.touchEnd(e); break;
                case 'resize': this.setup(); break;
            }
        },
        touchStart: function(e) {
            this.tConfig = {
                pageX: e.touches[0].pageX,
                pageY: e.touches[0].pageY,
				moveX: this.box.element.style.msTransform ? parseFloat(this.box.element.style.msTransform.replace('translateX(', '')) : 0
            };
            this.movingX = 0;
			this.surplus = parseFloat(this.box.width() - this.suit.width()) * -1;
			this.tMoveX = 0;
        },
        touchMove: function(e) {
            if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
			this.movingX = e.touches[0].pageX - this.tConfig.pageX;
			if (this.count == 1) {
				this.movingX = this.movingX / (((this.index == 0 && this.movingX > 0) || (this.index == this.length - this.count && this.movingX < 0)) ? (Math.abs(this.movingX) / this.width + 1) : 1); //左右尽头的缓冲效果
				style = this.box.element.style;
				style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = '0ms';
				style.MozTransform = style.webkitTransform = 'translate3d(' + (this.movingX - this.index * this.width) + 'px, 0, 0)';
				style.msTransform = style.OTransform = 'translateX(' + (this.movingX - this.index * this.width) + 'px)';
			} else {
				this.tMoveX = parseFloat(this.tConfig.moveX + this.movingX);
				if (this.tMoveX > 0 || (this.tMoveX < 0 && this.tMoveX < this.surplus)) {
					 //左右尽头的缓冲效果
					this.tMoveX = this.tConfig.moveX + (this.movingX / (Math.abs(this.tMoveX) / this.width + 1));
				}
				style = this.box.element.style;
				style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = '0ms';
				style.MozTransform = style.webkitTransform = 'translate3d(' + this.tMoveX + 'px, 0, 0)';
				style.msTransform = style.OTransform = 'translateX(' + this.tMoveX + 'px)';
			}
        },
        touchEnd: function(e) {
        	if (this.movingX == 0) return false;  // 原地点击，退出
			if (this.count == 1) {
				var isSlideHalf = 1; //Math.abs(this.movingX) > this.width / 2,
					isBoundary = (this.index == 0 && this.movingX > 0) || (this.index == this.length - this.count && this.movingX < 0); //左右两边尽头
				this.slide(this.index + (isSlideHalf && !isBoundary ? (this.movingX < 0 ? 1 : -1) : 0), this.speed); //拖右负数，拖左正数
			} else {
				this.tMoveX = this.tConfig.moveX + this.movingX;
				if (this.tMoveX > 0) {
					//左尽头
					this.slide(0, 0);
				} else if (this.tMoveX < 0 && this.tMoveX < this.surplus) {
					//右尽头
					this.slide(this.length - 1, 0);
				}
			}
        }
    }, data);
	data.init();
}

/**
 * 可视化选项卡插件
 *
 * @param: data[object]	button:事件触发按钮(选择器) box:事件触发盒子(选择器) current:选中相关的样式类名,默认current
 *
 * 绑定参考: $('#xxx').visualTab({'button':'.category a', 'box':'.box', 'current':'cur FontBgColor', 'box_current':'cur FontBgColor'});
 */
$.fn.visualTab = function(data) {
    data = $.extend({
        obj: $(this),
        init: function() {
            this.button		= data.button;
            this.box		= data.box;
			this.current	= data.current || 'current';
			this.box_current= data.box_current || 'current';
			this.selector	= data.obj.find(this.button + ':visible').selector;
			this.selectorBox= data.obj.find(this.box).selector;
            this.bind();
        },
		bind: function() {
            data.obj.find(this.button + ':visible').on('click', function() {
				index = $(this).index(this.selector);
                data.display(index);
            });
        },
		display: function(index) {
			data.obj.find(this.button).eq(index).addClass(this.current).siblings(this.selector).removeClass(this.current);
			data.obj.find(this.box).eq(index).show().addClass(this.box_current).siblings(this.selectorBox).hide().removeClass(this.box_current);
        },
    }, data);
	data.init();
}

//具有全局标志g的正则表达式的定义方法
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
}

// 可视化立即购买插件模块
$.fn.VisualBuyNow = function (options) {
	$.fn.VisualBuyNow.defaults = {
		'item'		:	'.visual_buynow_item',  // 属性item
		'button'	:	'.visual_buynow_btn',  // buynow按钮
		'current'	:	'current'  // 着色标记
	};
	let _this = this;
	let opts = $.extend({},$.fn.VisualBuyNow.defaults,options);
	let tips = function(tips){
		if ($(window).width() < 768) {  // 移动端
			$('html').tips_box(tips, 'error', '', 1);
		} else {
			global_obj.new_win_alert(tips);
		}
	};
	// 选择属性
	_this.find(opts.item).on('click', function () {
		$(this).addClass(opts.current).find('input[type=hidden]').prop('disabled', false);
		$(this).siblings().removeClass(opts.current).find('input[type=hidden]').prop('disabled', true);
	});
	// 点击buynow按钮
	_this.find(opts.button).on('click', function () {
		if (!_this.find(opts.item + '.current').size()) {  // 没有选择属性
			tips(lang_obj.cart.batch_buy_option);
			return false;
		}
		let $Formdata = new FormData(_this[0]);
		$Formdata.append('IsBuyNow', 1);
		$Formdata.append('back', 1);
		_this.find(opts.button).attr('disabled', true);
		$.ajax({
			type: 'POST',
			url: '/?do_action=cart.additem',
			data: $Formdata,
			dataType: 'json',
			async: false,
			cache: false,
			contentType: false,
			processData: false,
			success: function(data) {
				if (data.ret == 1) {
					parseInt(ueeshop_config.FbPixelOpen)==1 && $('html').fbq_addtocart(data.msg.item_price);
					//BuyNow统计
					analytics_click_statistics(1);//暂时统计为添加购物车事件
					$.post('/?do_action=cart.check_low_consumption&t='+Math.random(), {'CId':data.msg.CId, 'ProId':data.msg.ProId}, function(json){ //最低消费金额判断
						if(json.ret==1){
							window.location.href=data.msg.location;
						}else{
							//不符合
							var tips=(lang_obj.cart.consumption).replace('%low_price%', ueeshop_config.currency_symbols+$('html').currencyFormat(json.msg.low_price, ueeshop_config.currency)).replace('%difference%', ueeshop_config.currency_symbols+$('html').currencyFormat(json.msg.difference, ueeshop_config.currency));
							//global_obj.new_win_alert(tips, function(){ _this.find(opts.button).attr('disabled', false); }, '', undefined, 'await');
							tips(tips);
						}
					}, 'json');
				} else {
					_this.find(opts.button).attr('disabled', false);
					tips(data.msg);
				}
			}
		});
		return false;
	});
}

$.fn.GetTruePixel = function (options) {
	$.fn.GetTruePixel.defaults = {
		'type'		:	'width',  // width-宽度 height-高度
		'padding'	:	true,  // 是否需要padding
		'border'	:	true,  // 是否需要border
		'margin'	:	false  // 是否需要margin
	};
	let _this = this;
	let opts = $.extend({},$.fn.GetTruePixel.defaults,options);
	let result;
	// getBoundingClientRect获取到的是包含border,padding,margin的
	if (opts.type == 'width') {
		result = _this[0].getBoundingClientRect().width;
	} else if (opts.type == 'height') {
		result = _this[0].getBoundingClientRect().height;
	}
	let type_obj = {
		'width'		:	{
			'margin'	:	{'left':'margin-left', 'right':'margin-right'},
			'padding'	:	{'left':'padding-left', 'right':'padding-right'},
			'border'	:	{'left':'border-left-width', 'right':'border-right-width'}
		},
		'height'	:	{
			'margin'	:	{'left':'margin-top', 'right':'margin-bottom'},
			'padding'	:	{'left':'padding-top', 'right':'padding-bottom'},
			'border'	:	{'left':'border-top-width', 'right':'border-bottom-width'}
		}
	};
	if (opts.border == false) {
		result = result - parseFloat(_this.css(type_obj[opts.type].border.left)) - parseFloat(_this.css(type_obj[opts.type].border.right));
	}
	if (opts.padding == false) {
		result = result - parseFloat(_this.css(type_obj[opts.type].padding.left)) - parseFloat(_this.css(type_obj[opts.type].padding.right));
	}
	if (opts.margin == true) {
		result = result + parseFloat(_this.css(type_obj[opts.type].margin.left)) + parseFloat(_this.css(type_obj[opts.type].margin.right));
	}
	return result;
}