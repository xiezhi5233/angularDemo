/**
 * Created by win on 2017/6/1.
 */

    function banScroll(){
    var imgbox=document.querySelector(".banner_scroll ul");
    var $imgs=$(".banner_scroll ul");
    var aw=640;//单张宽度
    var speed=500;//动画时间
    var delay=2000;//自动切换时间
    var now=0;//图片索引
    var max=7;//最大索引
    var timer=setInterval(changeAuto,delay);//自动播放定时器
    //自动播放函数
    function changeAuto(){
        //判断动画是否执行中
        if(!$imgs.is(":animated")){
            //判断是不是最后一页
            if(now<max){
                now+=1;
                changeNext();//翻页
            }else{
                now=0;
                changeFirst();//切换
            }
            changeNum();//焦点变化
        }
    }
//克隆列表中的第一个图片,追加到列表最后
    $imgs.find("li:first").clone().appendTo($imgs);
//翻页
    function changeNext(){
        $imgs.animate({
            "left":-aw*now
        },speed)
    }
//第一页
    function changeFirst(){
        $imgs.animate({
            "left":-aw*(max+1)
        },speed,function(){
            $(this).css("left","0")
        })
    }
//最后一页
    function changeLast(){
        $imgs.css("left",-aw*(max+1));
        $imgs.animate({
            "left":-aw*(max)
        },speed)
    }
//焦点按钮元素集/并绑定事件
    var $lbNum=$(".banner_scroll ol li");
    $lbNum.click(function(){
        var x=now;
        now=$(this).index();
        if(x<now){
            $imgs.css({
                left:-aw*(now-1)
            });
            changeNext();
        }else if(x>now){
            $imgs.css({
                left:-aw*(now+1)
            });
            changeNext();//翻页
        }
        changeNum();//焦点变化
    });
//焦点样式变化
    function changeNum(){
        $lbNum.eq(now).addClass("current").siblings().removeClass("current")
    }

//触摸滑动事件
    var btn=document.querySelector(".banner_scroll");
    var xA= 0,
        xB= 0;
    btn.addEventListener("touchstart",function(e){
        xA= e.touches[0].clientX;
        clearInterval(btn.timer);
    },false);
    btn.addEventListener("touchmove",function(e){
        xB= e.touches[0].clientX;
    },false);
    btn.addEventListener("touchend",function() {
        if(xA-xB>100&&xB!=0){
            if(!$imgs.is(":animated")){
                if(!$imgs.is(":animated")){
                    if(now<max){
                        now+=1;
                        changeNext();//翻页
                    }else{
                        now=0;
                        changeFirst();//第一页
                    }
                    changeNum();//焦点变化
                }
            }
        }else if(xA-xB<-100&&xB!=0){
            if(!$imgs.is(":animated")){
                if(now>0){
                    now--;
                    changeNext();//翻页
                }else{
                    now=max;
                    changeLast();//最后一页
                }
                changeNum();//焦点变化
            }
        }
        xB=0;
    },false);

    }
