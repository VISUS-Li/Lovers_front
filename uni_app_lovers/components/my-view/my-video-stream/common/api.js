//判断登陆设备
//#ifdef H5
var device_type = 'web'
//#endif

//#ifdef APP-PLUS
var device_type = 'mobile'
//#endif

//#ifdef MP
var device_type = 'wxapp'
//#endif

var app = getApp();

var host = "http://120.79.191.222";  //替换为自己的域名,小程序需要https

module.exports = {
	HOST: host,
	API_ROOT: host + '/',
	DeviceType: device_type,
	post(options) {
		this.request(options);
	},
	delete(options) {
		options.method = 'DELETE';
		this.request(options);
	},
	get(options) {
		options.method = 'GET';
		this.request(options);
	},
	put(options) {
		options.method = 'PUT';
		this.request(options);
	},
	request(options) {
		var apiRoot = this.API_ROOT;
		var token = '';
		try {
			token = uni.getStorageSync('token')
		} catch (e) {
			// Do something when catch error
		}
		// console.log(options.data);
		uni.request({
			url: apiRoot + options.url,
			data: options.data,
			header: {
				'Content-Type':'application/json;charset=UTF-8',
				'Content-Type':'application/x-www-form-urlencoded',
				'XX-Token': token,
				'XX-Device-Type': '222222',
			},
			method: options.method ? options.method : 'POST',
			success: res => {
				var data = res.data;
				// console.log("数:" + JSON.stringify(data));
				if (!data) {
					// uni.hideLoading();
					uni.showToast({title: '无任何数据',icon: 'none'});
					return
				}
				if (res.statusCode == 200) {
					if (data.code == 10001) {
						uni.showModal({
							title: '提示',
							content: '登录已过期，请重新登录',
							confirmColor: "#ffbb12",
							success: (res) => {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/index/login'
									});
								}
							}
						});
					} else {
						options.success(data);
					}
				} else {
					uni.showToast({title: '服务器未知错误',icon: 'none'});
					setTimeout(function() {
						uni.hideLoading();
					}, 1000);
				}
			},
			fail: function(res) {
				if (options.fail) {
					options.fail(res)
				}
			},
			complete: options.complete ? options.complete : null
		});
	},
	
	uploadFile(options) {//上传图片
		options.url = this.API_ROOT + options.url;
		let token = this.getToken();
		let that = this;
		let oldSuccess = options.success;
		options.success = function(res) {
			console.log(res.data);
			let data = JSON.parse(res.data);
			if (data.code == 0 && data.data && data.data.code && data.data.code == 10001) {
				that.login();
			} else {
				oldSuccess(data);
			}
		}
		options.header = {
			'XX-Token': token,
			'XX-Device-Type': device_type
		};
		uni.uploadFile(options);
	},
	
	getToken() {//更新token
		var token = '';
		try {
			token = uni.getStorageSync('token')
		} catch (e) {
		}
		return token;
	}
};
