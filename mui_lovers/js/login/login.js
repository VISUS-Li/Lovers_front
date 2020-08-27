(function($, doc) {

	$.plusReady(function() {
		var homePage = plus.webview.getWebviewById("../../pages/Home/home.html")
		var home_loaded_flag = false;
		if (!homePage) {
			homePage = $.preload({
				"id": '../../pages/Home/home.html',
				"url": '../../pages/Home/home.html'
			});
		} else {
			home_loaded_flag = true;
		}

		homePage.addEventListener("loaded", function() {
			home_loaded_flag = true;
		});

	})
	
	
	//监听事件
	var btnLogin = doc.getElementById('btnLogin');
	var accountBox = doc.getElementById('account');
	var pwdBox = doc.getElementById('password');
	btnLogin.addEventListener('tap', function(event) {
		var account = accountBox.value;
		var password = pwdBox.value;
		if (account.length <= 0 || password.length <= 0) {
			$.toast("请输入用户名或密码");
			return;
		}
		
		var reqUrl = "http://60.205.211.241:20050/api/client/user/login";
		$.ajax({
			url: reqUrl,
			data: {
				UserName: account,
				PassWord: password
			},
			dataType: 'json',
			type: 'post',
			timeout: '3000',
			headers: {
				'Content-Type': 'application/json'
			},
			beforeSend: function() {
				//$.showWaiting()("正在请求数据..."); //开启加载提示
			},
			complete: function() {
				//$.hideLoading(); //关于加载提示
			},
			success: function(data) {
				//处理成功逻辑
				$.openWindow({
					url: 'defaule.html',
					id: 'defaule.html',
					extras: {
						Ticket: data.Ticket //页面传递参数
					},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在登录...' //等待对话框上显示的提示内容
					}
				});
			},
			error: function(xhr, type, errorThrown) {
				//plus.nativeUI.closeWaiting();
				var _error = "";
				switch (type) {
					case "timeout":
						_error = "服务器响应超时";
						break;
					default:
						_error = "异常信息:" + xhr.responseText;
						break;
				}
				mui.toast(_error);
			}
		})
	})
}(mui, document))
