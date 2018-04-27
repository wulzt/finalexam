//轮播图

window.onload = function(){
    var list = document.getElementById("ul");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var index = 1;
    var timer;  
    var banner = document.getElementById("banner");
    //算移动距离
    function animate(offset){
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        if(newLeft<-3600){
            list.style.left = -1200 + "px";
        }
        if(newLeft>-1200){
            list.style.left = -3600 + "px";
        }
    }
    
    function buttonsShow(){
        //清除on
        for(var i = 0;i < buttons.length;i++){
            if(buttons[i].className == "on"){
                buttons[i].className = " ";
            }
        }
        buttons[index - 1].className = "on";
    }

    prev.onclick = function(){
        index -= 1;
        if(index < 1){
            index = 3;
        }
        buttonsShow();
        animate(1200);
    }
    next.onclick = function(){
        index += 1;
        if(index > 3){
            index = 1;
        }
        buttonsShow();
        animate(-1200);
    }
    //定时器 2.5s循环播放
    function play(){
        timer = setInterval(function(){
            next.onclick()
        },2500)
    }


    for(var i = 0;i<buttons.length;i++){
        buttons[i].onclick = function(){
            var clickIndex = parseInt(this.getAttribute("index"));
            var offset = 1200 * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    }

    function stop(){
        clearInterval(timer);
    }
    banner.onmouseover = stop;
    banner.onmouseout = play;

    play();

    //画圆弧
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");

    // cxt.strokeStyle='black';
    cxt.beginPath();
    cxt.arc(205,205,205,0.30*Math.PI,0.70*Math.PI,true);
    cxt.lineTo(113,332);
    cxt.arc(205,205,160,0.70*Math.PI,0.30*Math.PI);
    cxt.lineTo(297,332);
    cxt.closePath();
    cxt.fillStyle= "rgb(244,152,0)";
    cxt.fill();
    // cxt.stroke();

}
// //登录
function open(){
    document.getElementById("mask").style.display = "block";
    document.getElementById("login").style.display = "block";
}
function close(){
    document.getElementById("mask").style.display = "none";
    document.getElementById("login").style.display = "none";
}


function login(){
    var username = document.getElementById("username");
    if(username.value){
        alert(username.value);  
        var r = document.getElementById("headerone-right");
        var child = document.getElementById("signUp");
        var e = r.removeChild(child);
    }
}