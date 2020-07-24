$(function(){
	if($(".news_game .news_list").length>0){
		var width = $(".news_game .news_list li img").width();
		$(".news_game .news_list li img").css('height', width);
	}

	var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        $("#android_game").css('display','none');
        $("#android_apply").css('display','none');
    } else {
    	$("#ios_apply").css('display','none');
        $("#ios_game").css('display','none');
    }

    $("#linkbox_btn").click(function(){
        if($("#linkbox_btn").hasClass("on")){
            $("#linkbox_btn").removeClass("on");
            $("#linkbox").css('height','50px');
        }else{
            $("#linkbox_btn").addClass("on");
            $("#linkbox").css('height','auto');
        }
    })
})

