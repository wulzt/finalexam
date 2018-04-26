//轮播图

window.onload = function(){
    var list = document.getElementById("ul");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var index = 1;
    var timer;  
    var scroll = document.getElementById("scroll");
    //算移动距离
    function animate(offset){
        var newLeft = parseInt(list.style.left) + offset;
        list.style.left = newLeft + "px";
        if(newLeft<-3300){
            list.style.left = -1100 + "px";
        }
        if(newLeft>-1100){
            list.style.left = -3300 + "px";
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
        animate(1100);
    }
    next.onclick = function(){
        index += 1;
        if(index > 3){
            index = 1;
        }
        buttonsShow();
        animate(-1100);
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
            var offset = 1100 * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    }

    function stop(){
        clearInterval(timer);
    }
    scroll.onmouseover = stop;
    scroll.onmouseout = play;

    play();

    //画圆弧
    var c=document.getElementById("myCanvas");
    var cxt=c.getContext("2d");

    // cxt.strokeStyle='black';
    cxt.beginPath();
    cxt.arc(150,150,150,0.33*Math.PI,0.66*Math.PI,true);
    cxt.lineTo(90,260);
    cxt.arc(150,150,120,0.66*Math.PI,0.33*Math.PI);
    cxt.lineTo(215,260);
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