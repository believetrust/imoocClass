/**
 * Created by shuqing on 2017/9/4.
 * 图片预加载
 */
//js没有局部作用域,但我们用闭包来模仿
(function ($) {
    //构造函数:图片数组和参数
    function PreLoad (imgs,options) {

        // 构造函数中接收传递而来的参数,将其保存为属性。
        //这样的赋值则考虑了 多个图片而来的数组,或者,字符串形式而来的一张图片--保存了图像。
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;

        //最终希望保存的变量是 传递来的变量 和 默认变量的融合。
        //$.extend 将后一个options覆盖前一个DEFAULTS生成一个新对象,然后将新对象返回给this.opts保存下来。
        this.opts = $.extend({},PreLoad.DEFAULTS,options);
        if(this.opts.order === 'ordered'){
            this._ordered();
        }else{
            // _ 下划线的原因,表明,该方法只在内部使用,不提供外部调用。
            this._unordered();
        }
    }

    //接收变量之前,可以使用默认的参数来代替
    PreLoad.DEFAULTS = {
        order:'unordered',//默认情况是无序加载
        each:null,//每一张图片加载完成后执行该方法(默认方法1)
        all:null,//所有图片加载完成后执行该方法(默认方法2)

    }

    PreLoad.prototype._ordered = function () {
        var opts = this.opts;
        var imgs = this.imgs;
        var len = imgs.length;
        var count = 0;

        load();

//    有序预加载:函数内部来判断
        function load() {

//        三步走:定义img对象;绑定事件--监听load 和 error 事件;将当前图片路径赋值给图片对象的src,开始预加载
            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
//            当每次图片加载完成或者出现错误时,执行该代码
                if (count>=len){
//                所有图片已经加载完毕
                    opts.all && opts.all();
                }else{
//                还有图片没有加载完成,需要再调用自己。
                    load();
                }
                count ++;
            });
//        console.log(imgs[count]);
            imgObj.src = imgs[count];
        }
    }

    // 面向对象方法写在原型上，使每次实例化的时候保持一份，PreLoad.prototype._unoredered  =
    PreLoad.prototype._unordered = function () {
    //    无序加载
    //    imgs就在this上,接收一下即可。
        var imgs = this.imgs;
        var opts = this.opts;
        var count = 0, length = imgs.length;
        $.each(imgs,function (i,src) {
            //判断数组内容是否有src为字符串
            if(typeof src != 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error',function () {

                //eact定义每一张图片加载后的操作,如果没有参数时,each为null,直接执行会报错,因此要判断
                opts.each && opts.each(count);

                if(count >= length-1){
                // 所有图片加载完成后,就执行该操作。
                    opts.all && opts.all ();
                }
                count++;
            });
            //图片对象的src属性
            imgObj.src = src;
        })
    };

//    写完了面向对象,如何将其变为插件呢?
//    前者需要选中元素;后者则是工具方法,因此,后者更好。
//     $.fn.extend -> $('#img').preload();
//     $.extend -> $.preload();
    $.extend({
        preload:function (imgs,opts) {
            new PreLoad(imgs,opts);
        }
    })

})(jQuery);