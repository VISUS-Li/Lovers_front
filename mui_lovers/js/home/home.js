
/*初始化页面*/
mui.init({
	
})

mui.plusReady(function () {
    setTimeout(function(){
		menu = mui.preload({
			url:"../../pages/home/UpperMenu.html",
			id:"../../pages/home/UpperMenu.html",
			styles: {
			    left: '30%',
			    width: '70%',
			    zindex: 999
			}
		});
	},300);
})

var mainMask = mui.createMask(_closeMenu);

/*显示上拉菜单*/
function openMenu(){
	menu.show('none',0,function(){
		menu.setStyle({
		    left: '30%',
		    transition: {
		        duration: 150
		    }
		});
	})
	
	mainMask.show();
}