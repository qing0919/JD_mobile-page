/**
 * Created by Administrator on 2017/11/19.
 */
//加载完毕事件，在该事件中写的js代码去获取DOM元素就一定不会出现找不到的情况
window.onload=function(){
//    顶部通栏滚动的效果
    headerScroll();
//    倒计时的效果
    cutDownTime();
//    轮播图的效果
    banner();
}

//通栏方法
function headerScroll(){
    //获取元素距离顶部的高度
    //document.querySelector('.jd_nav').offsetTop;
//    获取元素自身的高度
//    document.querySelector('.jd_nav').offsetHeight();
//    现在我们要获取的是顶部距离.jd_nav底部的高度
    var navDom=document.querySelector('.jd_nav');
    var getHeight=navDom.offsetHeight+navDom.offsetTop;
//    获取顶部的通栏
    var headerDom=document.querySelector('.jd_header');
    headerDom.style.backgroundColor='rgba(201,21,35,0)';
    //当鼠标滚动时触发该事件
    window.onscroll=function(){
        //如果window.document.body.scrollTop一直都是零，需要改成document.documentElement.scrollTop
        //    获取当前鼠标滚动的距离
        var curHeight=window.document.documentElement.scrollTop;
        var percentHeight=curHeight/getHeight;
        if(percentHeight>1){
            percentHeight=1;
        }
        //css中background-color的横线去掉，将后面的首字母改成大写
        headerDom.style.backgroundColor='rgba(201,21,35,'+percentHeight+')';
    }
}
//倒计时方法
function cutDownTime(){
    //定义倒计时的总时间
    var totalHour=3;
//    将总时间转化为秒
    var totalSec=totalHour*60*60;
//    获取想要修改的所有的li标签
    var liArr=document.querySelectorAll('.jd_main .content_top li');
    //打开定时器，里面的函数每秒执行一次

    //有了定时器Id以后，就能够干掉该id对应的定时器
    var timeId=setInterval(function(){
        if(totalSec<=0){
            clearInterval(timeId);
            console.log("活动结束咯");
            return;
        }
    //    总的时间递减
        totalSec--;
    //    计算当前的秒对应多少小时，多少分钟，多少秒
        var hour=Math.floor(totalSec/3600);
        var minutes=Math.floor(totalSec%3600/60);
        var sec=totalSec%60;
    //    修改DOM元素的显示
    //    小时
    //    小时的十位
        liArr[0].innerHTML=Math.floor(hour/10);
    //        小时的各位
        liArr[1].innerHTML=hour%10;
    //    分钟
        liArr[3].innerHTML=Math.floor(minutes/10);
        liArr[4].innerHTML=minutes%10;
    //    秒
        liArr[6].innerHTML=Math.floor(sec/10);
        liArr[7].innerHTML=sec%10;
    },1000)
}
//轮播图方法
function banner(){
    var width=document.querySelector('.jd_banner').offsetWidth;
    var ulImages=document.querySelector('.banner_images');
    var indexLiArr=document.querySelectorAll('.banner_index li');
    var index=1;
    var timeId=setInterval(function(){
        index++;
        ulImages.style.transition='all .3s';
        ulImages.style.transform='translateX('+index*width*-1+'px)';

    },2000)

    //添加过渡结束事件
    ulImages.addEventListener('webkitTransitionEnd',function(){
        if(index>8){
            index=1;


        }else if(index<1){
            index=8;
        }
        //滑到最后一张以后瞬间跳到第一张，肉眼看不出来
        ulImages.style.transition='';
        ulImages.style.transform='translateX('+index*width*-1+'px)';
        for(var i=0;i<indexLiArr.length;i++){
            indexLiArr[i].className='';
        }
        indexLiArr[index-1].className='current';

    })

    //手指滑动轮播图
    var startX=0;
    var moveX=0;
    var distanceX=0;
    ulImages.addEventListener('touchstart',function(event){
        clearInterval(timeId);
        ulImages.style.transition='';
        startX=event.touches[0].clientX;
    })
    ulImages.addEventListener('touchmove',function(event){
        moveX=event.touches[0].clientX-startX;
        ulImages.style.transform='translateX('+(moveX+index*width*-1)+'px)';
    })
    ulImages.addEventListener('touchend',function(event){
        ulImages.style.transition='all 0.3s';
        //distanceX+=moveX;

        var maxDistance=width/3;
        //滑动的距离超过一半的屏幕宽度
        if(Math.abs(moveX)>maxDistance){
            //判断左滑还是右滑
            if(moveX<0){
                index++;
            }else{
                index--;
            }
            ulImages.style.transform='translateX('+(index*width*-1)+'px)';
        }else{
            ulImages.style.transform='translateX('+(index*width*-1)+'px)';
        }
        //手指触摸结束以后开启定时器
         timeId=setInterval(function(){
            index++;
            ulImages.style.transition='all .3s';
            ulImages.style.transform='translateX('+index*width*-1+'px)';

        },2000)
    })
}

