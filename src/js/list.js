/**
 * Created by Administrator on 2017/11/23.
 */
window.onload=function(){
    leftMove();
    rightMove();
}

//定义左边滑动的部分的函数
function leftMove(){
    var moveUl=document.querySelector('.main_left ul');
    var ulHeight=moveUl.offsetHeight;
    var parentHeight=document.querySelector('.main_left').offsetHeight;
    var headerHeight=document.querySelector('.header').offsetHeight;
    //确定移动的最大最小宽度
    var minDistance=parentHeight-ulHeight-headerHeight;
    var maxDistance=0;
    var moveY=0;
    var startY=0;
    var distanceY=0;
    var delayDistance=100;
    moveUl.addEventListener('touchstart',function(event){
        startY=event.touches[0].clientY;
    })
    moveUl.addEventListener('touchmove',function(event){
        moveY=event.touches[0].clientY-startY;
        if((moveY+distanceY)>(maxDistance+delayDistance)){
            moveY=0;
            distanceY=maxDistance+delayDistance;
        }else if((moveY+distanceY)<(minDistance-delayDistance)){
            moveY=0;
            distanceY=minDistance-delayDistance;
        }
        moveUl.style.transition='';
        moveUl.style.transform='translateY('+(moveY+distanceY)+'px)';
    })
    moveUl.addEventListener('touchend',function(event){
        distanceY+=moveY;
        if(distanceY>maxDistance){
            distanceY=maxDistance
        }else if(distanceY<minDistance){
            distanceY=minDistance;
        }
        moveUl.style.transition='all .5s';
        moveUl.style.transform='translateY('+(distanceY)+'px)';
    })

//    手指点击事件
//    给ul注册事件，如果单独给li注册事件，需要给每个li单独注册事件，太麻烦了

    //    获取所有需要点击的li
    var liArr=document.querySelectorAll('.main_left li');
    //    获取li标签的高度
    var liHeight=document.querySelector('.main_left ul li').offsetHeight;
    var liIndex=0;
    var moveDistance=0;
    //    索引值的获取,可以通过为每一个li保存一个索引属性，<body data-index='1'>
    //    点击li的时候获取该属性值即可dom.dataSet['index'];
    //    为每一个li标签绑定dataset属性
    for(var i = 0;i<liArr.length;i++){
        liArr[i].dataset['index']=i;
    }
    fox_tap(moveUl,function(e){
        for(var i=0;i<liArr.length;i++){
            liArr[i].className='';
        }
        //e.target是当前点击的a标签，e.target.parentNode是点击的li标签
        e.target.parentNode.className='current';
    //    获取点击的li标签的索引值，然后让ul移动索引值*li的高度的距离

        liIndex=e.target.parentNode.dataset['index'];
        moveDistance=liIndex*liHeight*-1;
        if(moveDistance>maxDistance){
            moveDistance=maxDistance;
        }else if(moveDistance<minDistance){
            moveDistance=minDistance;
        }
        moveUl.style.transition='all .5s';
        moveUl.style.transform='translateY('+moveDistance+'px)';
    })
}

function rightMove(){

}