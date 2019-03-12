(function(){
    //獲取物件屬性值
    function getStyle(obj, name) {
        return getComputedStyle(obj, null)[name]
    };

    //執行動畫
    var timer;//預先定義定時器
    function move(obj, speed, target, attr, callback) {
        clearInterval(obj.timer);
        var current = parseInt(getStyle(obj, attr));
        if (current > target) {
            speed = -speed;
        };
        obj.timer = setInterval(function () {
            var oldValue = parseInt(getStyle(obj, attr));
            var newValue = oldValue + speed;
            // speed 正 右移>  負 左移<
            if ((speed > 0 && newValue >= target) || (speed < 0 && newValue < target)) {
                newValue = target;
            }
            obj.style[attr] = newValue + 'px';
            if (newValue == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 30);
    }
    //向全局暴露接口
    window.getStyle = getStyle;
    window.move = move;
})()