$(function() {
	$('.link .button').hover(function(){
		var title = $(this).attr('data');
		// 测试title是否取成功
		// document.title=title;
		$('.tip em').text(title);
		// position()方法寻找离他最近的定位属性，$(对象).outerWidth() //该对象的完整宽度，width+padding+margin+border
		// $().position().left/top/right/bottom//获取一个盒子，他是相对于 加了定位的那个父盒子之间的距离
		var pos = $(this).position().left+14;/*获取其相对于已定位父元素的距离*/
		// document.title=pos;
		// .tip 宽度没有明确设置，是自适应的。而$('.tip').width()方法只能获取到已设置的值。
		// 提示框的整体宽的获取用.outerWidth()方法。注意：width()获得的是定义的width值，
		var dis =( $('.tip').outerWidth()-$(this).outerWidth())/2;
		var l = pos-dis;
		// 切记，css设置单个属性时，是逗号隔开的，比如'opacity':1,；多个属性时是不同的。
		$('.tip').stop(true,true).css({'left':l+'px'}).animate({'top':145,'opacity':1},500);
	},function(){
		// if(!$('.tip').is(':animated')){
		// 	$('.tip').animate({'top':100,'opacity':0},500);
		// }
		// 使用判断还是会出现tip停住不消失的问题。在鼠标滑入时加一个.stop(false,true).animate(...),鼠标移出时加一个.stop().animate(...)。
		$('.tip').stop(true,true).animate({'top':130,'opacity':0},200);
	})
})

// 在PC端网页，需要考虑低版本浏览器的情况，所以建议使用js实现动画效果，如jquery的animate可以实现动画效果（提示框的渐变效果用.animate({})方法）
// 在移动端，则建议使用CSS3的transition也可以来实现动态效果，可开启移动端的硬件加速，以加强其机动性。
// 如果是需要添加动态内容，则建议使用js来实现（移动端建议用css3实现渐变效果；pc端为了浏览器兼容，有的动画渐变效果建议用.animate()方法。）
// stop() 方法停止当前正在运行的动画。 $(selector).stop(stopAll,goToEnd)  
// stopAll	可选。规定是否停止被选元素的所有加入队列的动画。 goToEnd	可选。规定是否允许完成当前的动画。该参数只能在设置了 stopAll 参数时使用。