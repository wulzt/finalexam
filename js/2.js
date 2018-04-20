// function getId(id){
//     e = document.getElementById("id")
//     return (e);
// }
window.onload = function(){
    // var list = getId(ul);
    // var prev = getId(prev);
    // var next = getId(next);

    var list = document.getElementById("ul");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
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
    //prev next buttons
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var index = 1;

    function buttonsShow(){
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
    var timer;
    function play(){
        timer = setInterval(function(){
            next.onclick()
        },2500)
    }
    play();

    for(var i = 0;i<buttons.length;i++){
        buttons[i].onclick = function(){
            var clickIndex = parseInt(this.getAttribute("index"));
            var offset = 1100 * (index - clickIndex);
            animate(offset);
            index = clickIndex;
            buttonsShow();
        }
    }

    var scroll = document.getElementById("scroll");
    function stop(){
        clearInterval(timer);
    }
    scroll.onmouseover = stop;
    scroll.onmouseout = play;

}