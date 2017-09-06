// 侧边栏 + 右侧滑出 + 返回顶部 
// console.log("haha");
// 加上分号只是为了确保不会因为某个文件少了分号而无法运行
// 自动加载的函数，函数体里有我们的主要逻辑

;
$(function() {
	'use strict';

	var sidebar = $('#sidebar'),//选择侧栏
		mask = $('#mask'),//选择遮罩
		sidebar_trigger =$('#sidebar_trigger'),//选择侧栏触发器
		backToTop = $('.backToTop');//选择返回顶部按钮

		// 显示侧栏
		function showSideBar(){
			mask.fadeIn();//显示遮罩
			// sidebar.css('right',0);
			// sidebar.animate({'right':0});			
			sidebar.css('transform','translate(0,0)');//调整侧栏相关的CSS
		}

		// 隐藏侧栏
		function hideSideBar(){
			mask.fadeOut();//隐藏遮罩
			// sidebar.css('right',-sidebar.width());
			sidebar.css('transform','translate('+ sidebar.width()+'px'+',0)');//调整侧栏相关的CSS

		}

		function backButton(){
			// console.log("haha");
			$('html body').animate({scrollTop:0},800)
		}

		// 为什么要双击才会显示侧边栏以及mask呢？不明白。。。
		// 监听侧栏触发器的点击事件
		sidebar_trigger.on('click',showSideBar);

		// 监听mask
		mask.on('click',hideSideBar);

		//监听返回按钮
		backToTop.on('click',backButton);

		//监听window的scroll事件。
		$(window).on('scroll',function(){
			// 如果已滚动的部分高于窗口的高度，
			if ($(window).scrollTop()>$(window).height()) {
				// 显示返回按钮
				backToTop.fadeIn();
			}
			else
				// 隐藏返回按钮
				backToTop.fadeOut();
		})

		// 这样起初就没有返回顶部的button，不过不明白为什么。顺序颠倒的话，起初button还是会出现。
		// $(window).trigger('scroll');每次刷新自动检测滚动条  触发 滚动条判断条件
		// 浏览器一加载/刷新，就马上触发该事件，让它先加载一次。
		$(window).trigger('scroll');

})

// 自调用函数  与 下方的作用 相同，自动加载，浏览器加载到这一部分，里面的内容就开始加载啦。

// (function(){

// })()