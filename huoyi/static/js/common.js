var colorStr = "999999,d80000,fe0154,fe01b4,a801fe,5a01fe,0137fe,019cfe,00afce,00d1ac,00c46f,e972a7,006f17,6d8800,d0c400,eca700,fe5d01,9c2800,21523a,002c61,6a3906";
var colorArr = [];
colorArr = colorStr.split(',');

$("#menu").click(function () {
    $("header").toggleClass("header-h");
    $(".menubtn").toggleClass("menucross");
    $(".flex-bar").toggleClass("flex-bar-h");
    $("body").toggleClass("bodyFixed");
    console.log("aaaa");
})

$(".inpage-kf").mouseover(function (){
    $(".kf-box").show();
}).mouseout(function (){
    $(".kf-box").hide();
});
