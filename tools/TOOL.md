# 工具集合，
Javascript函数、CSS动画、Meta处理

[JQ在线引用版本](http://www.jq22.com/jquery-info122 "JQ在线引用版本")

```
//返回星期
 function  returnWeekday(){
    let string = "今天是星期";
    let date = new Date().getDay();    
// 使用对象
    dateObj = {
        0:["天","休"],
        1:["一","工"],
        2:["二","工"],
        3:["三","工"],
        4:["四","工"],
        5:["五","工"],
        6:["六","休"],        
    }    
// 类型，这里也可以对应相关方法
    dayType = {
    "休":function(){
           console.log("为休息日");
        },
    "工":function(){
           console.log("为工作日");
        },   
    }        
    let returnData = {
        string:string + dateObj[date][0],
        method:dateType[dateObj][date][1]
    }    
      return returnData
 };
    console.log(returnWeekday().method.call(this));
```