/**
 * Created by Administrator on 2017/11/26.
 */
//封装tap事件主要是计算触摸开始和触摸结束的时间差，如果时间差比较小就是点击事件，
//如果有移动就失败，如果时间差太大就属于长按
//参数一为DOM元素，参数二为回调函数
function fox_tap(Element,callBack) {
    var startTime = 0;
//定义最大的时间差
    var maxTime = 250;
//定义一个变量，看手指是否进行了移动
    var isMove = false;
    Element.addEventListener('touchstart', function (event) {
        startTime = Date.now();
        isMove = false;
    })
    Element.addEventListener('touchmove', function (event) {
        isMove = true;
        return;
    })
    Element.addEventListener('touchend', function (event) {
        if (isMove == true) {
            return;
        }
        if ((Date.now() - startTime) > maxTime) {
            return;
        }
        callBack(event);
    })
}


