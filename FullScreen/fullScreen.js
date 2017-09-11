(function($){
		$.fn.PageSwitch = function(options){
			// PageSwitch函数的主体内容,定义对象，定义与对象名相同的方法。
			var PageSwitch = (function(){
				function PageSwitch(element,options){
					// 利用jQuery的extend方法来合并参数：将用户自定义的插件参数与插件的默认参数加以合并
					// 第一个参数 true 表示会用到深拷贝。
					this.settings = $.extend(true,$.fn.PageSwitch.default,options||{});
					this.element = element;
				}
			})();
			// PageSwitch的单例模式
			return this.each(function(){
				var me = $(this),
					instance = me.data("PageSwitch");
				if(!instance){
					instance = new PageSwitch (me,options);
					me.data("PageSwitch",instance);
				}
			})

		}

		// 插件默认的配置参数
		$.fn.PageSwitch.default = {
			selectors:{
				sections:'.sections',
				section:'.section',
				page:'.pages',
				active:'.active'
			},
			index:0,//对应页面的索引值，默认是0.
			easing:'ease',
			duration:500,//滑动动画所需要的时间
			loop:false,//页面是否可以循环播放
			pagination:true,//是否进行分页处理，默认为true
			keyboard:true,//是否触发键盘事件
			direction:'vertical',//滑动方向，默认是竖屏
			callback:'',//实现滑屏动画之后所调用回调函数
		}
})(jQuery);


/**
	jquery插件 闭包作用
	自执行的匿名函数。
	(function(){
	do something;
	})(jQuery);
	1、避免全局依赖
	2、避免第三方破坏
	3、兼容jQuery操作符"$"和"jQuery"
*/

/**
	1、类级别组件开发，静态方式
	 --即给jquery命名空间下添加新的全局函数，也称静态方法
	jQuery.myPlugin = function(){
		//do something;
	};
	例如：$.Ajax()、$.extend();

	2、对象级别组件开发方法
	---即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称为动态方法。
	$.fn.myPlugin = function(){
		//do something
	};
	这里的 $.fn === $.prototype
	例如:addClass()/attr()等，需要创建实例来调用

	JQuery最大的优势是 链式调用。如 $('div').next().addClass()...
	$.fn.myPlugin = function(){
		return this.each(function(){
			...
		})
	};
	return this 返回当前对象，来维护插件的链式调用。
	each 循环实现每个元素的访问。

	动态的开发方式就需要创建实例。

	单例模式：如果实例存在则不再重新创建实例，如果不存在就创建实例；利用 data() 来存放插件对象的实例。

	首先 链接式操作就是执行了一个方法，可以再执行另一个方法，直接写在方法的后面。
	this.each遍历的是一个数组，因为你不能保证返回的只有一个jq对象
	（这里纠正一下，这里的函数作为对象的方法时返回this是指向的该对象，也就是说不是你说的返回对象的每个属性，
	这里关于this的使用建议你看一下慕课上有一位老师讲的js深入浅出，）
	你若保证你的插件每次都只会用一个JQ对象,那么你可以直接return this.
	另外me.data("pageSwitch")是在这个对象上绑定数据，个人认为这里就是给目标对象绑定这个插件的功能。
	你可以查一下w3c中jq方法的数据绑定data();

*/