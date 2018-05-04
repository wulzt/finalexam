//封装获取元素的方法
function getId(id){
    return typeof(id) === "string"?document.getElementById(id):id;  
}

window.onload = function(){
    //ajax请求
    $.ajax({
        url        : "http://vtmer.cn/class",    //请求的url地址
        dataType   : "json",   //返回格式为json
        async      : true, //请求是否异步，默认为异步，这也是ajax重要特性
        data       : {},    //参数值
        type       : "GET",   //请求方式
        success: function(req) {
            //请求成功时处理
            console.log(req);
            randomData(req);
        }
    });

    //轮播图
    var list = getId("ul");
    var prev = getId("prev");
    var next = getId("next");
    var buttons = getId("buttons").getElementsByTagName("span");
    var index = 1;
    var timer;  
    var banner = getId("banner");
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
        (function(i){
            buttons[i].onclick = function(){
                var clickIndex = parseInt(this.getAttribute("index"));
                var offset = 1200 * (index - clickIndex);
                animate(offset);
                index = clickIndex;
                buttonsShow();
            }
        })(i)
    }

    function stop(){
        clearInterval(timer);
    }
    banner.onmouseover = stop;
    banner.onmouseout = play;

    play();

    //画圆弧
    var c=getId("myCanvas");
    var cxt=c.getContext("2d");

    cxt.beginPath();
    cxt.arc(205,205,205,0.30*Math.PI,0.70*Math.PI,true);
    cxt.lineTo(113,332);
    cxt.arc(205,205,160,0.70*Math.PI,0.30*Math.PI);
    cxt.lineTo(297,332);
    cxt.closePath();
    cxt.fillStyle= "rgb(244,152,0)";
    cxt.fill();


    //menu选择
    var menuList = document.getElementsByClassName("menuChoose");
    var haveChooseList = document.getElementsByClassName("gou");
    var showRedList = document.getElementsByClassName("showRed");
    for(var i=0;i<menuList.length;i++){
        (function(i){
            menuList[i].onclick = function(){
                if(haveChooseList[i].style.opacity == 0){
                    haveChooseList[i].style.opacity = "1";
                    showRedList[i].style.color = "red";
                }else{
                    haveChooseList[i].style.opacity = "0";
                    showRedList[i].style.color = "black";
                }
            }
        })(i)
    }

    //输出选中的套餐
    function put(){
        console.clear();
        for(var i=0;i<showRedList.length;i++){
            if(getComputedStyle(haveChooseList[i]).opacity == 1){
                console.log(showRedList[i].getElementsByTagName("td")[0].innerText);
            }
        }
    }
    getId("button_1").onclick = put;
}


//登录
//弹出登录框
function loginOpen(){
    getId("mask").style.display = "block";
    getId("login").style.display = "block";
}
//关闭登录框
function loginClose(){
    getId("mask").style.display = "none";
    getId("login").style.display = "none";
    return false;
}
//登录
function login(){
    //先关了登录框
    loginClose();
    var username = getId("username");
    if(username.value){
        //移除“注册”“登录”
        getId("headerone-right").removeChild(getId("logIn"));
        getId("headerone-right").removeChild(getId("signUp"));
        //create“×××你好”的div
        var myDiv = document.createElement("div");
        myDiv.id = "niHao";
        var textNode = document.createTextNode(username.value+",你好");
        myDiv.appendChild(textNode);
        //放进去
        getId("headerone-right").appendChild(myDiv);
    }
    return false;
}

//企业案例

function openOneCase(){
    getId("caseMask").style.display = "block";
    getId("oneCase").style.display = "block";
    getId("caseMask").style.animation = "myMove_1 2s";
    getId("oneCase").style.animation = "myMove_2 2s";
}
function closeOneCase(){
    getId("caseMask").style.display = "none";
    getId("oneCase").style.display = "none";
}

function randomData(req){
    var myList = document.getElementsByClassName("companyCase");

    for(var i=0; i<myList.length;i++){
        myList[i].style.backgroundImage = "url(\"" + req.item[i].img + ";";
    }

    for(var i = 0;i<myList.length;i++){
        (function(i){
            myList[i].onclick = function(){
                openOneCase();
                getId("companyName").innerHTML = req.item[i].name;
                getId("oneCaseTitle").innerHTML = req.item[i].title;
                getId("caseImg").style.backgroundImage = "url(\"" + req.item[i].img + ";";
                getId("caseBlaBla").innerHTML = req.item[i].intro;
                getId("getMore").setAttribute("href",req.item[i].url);
            }
        })(i)
    }    
}
