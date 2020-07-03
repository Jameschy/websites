var colorStr = "999999,d80000,fe0154,fe01b4,a801fe,5a01fe,0137fe,019cfe,00afce,00d1ac,00c46f,e972a7,006f17,6d8800,d0c400,eca700,fe5d01,9c2800,21523a,002c61,6a3906";
var colorArr = [];
colorArr = colorStr.split(',');
// console.log(colorArr);
$("#classifyBox a").each(function(i){
    $(this).css({"backgroundColor":'#'+colorArr[i],"color":"#fff"});
});


var colorData=$(".sf-class a").attr("data-msg");

switch (colorData) {
    case "策略":
        datacolor = "#999999";
        break;
    case "角色":
        datacolor = "#d80000";
        break;
    case "手游":
        datacolor = "#fe0154";
        break;
}
$(".sf-class a").css("color",datacolor)
console.log(datacolor);

