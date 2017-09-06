/**
 * Created by shuqing on 2017/9/4.
 */
var imgs = [
    'imgs/诗篇23-1.jpg',
    'imgs/诗篇23-2.jpeg',
    'imgs/诗篇23-3.jpg',
    'imgs/诗篇23-4.jpg',
    'imgs/诗篇23-5.jpg',
    'imgs/诗篇23-6.jpg',
    'imgs/诗篇23-7.jpg',
];

var index = 0,
    length = imgs.length,
    count = 0,
    $progress = $('.progress');

$.each(imgs,function (i,src) {
    var imgObj = new Image();
    $(imgObj).on('load error',function () {
        $progress.html(Math.round((count+1)/length)*100+'%');
        if(count >= length-1){
            $('.loading').hide();
            document.title = '1/' +length;
        }
        count++;
    });
    //图片对象的src属性
    imgObj.src = src;
    console.log('*******',src)
})

$(function(){
    $('.btn').on('click',function () {

        if('prev' === $(this).data('control')  ){
            //    上一张
            index = Math.max(0,--index);
        } else{
            //    下一张
            index = Math.min(length-1,++index);
        }
        document.title = (index+1)+'/'+length;

        $('#img').attr('src',imgs[index]) ;
    });
});


