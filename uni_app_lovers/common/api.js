import {
	apiUrl,
} from './config.js';
import * as db from './db.js' //引入common

/**
 * post请求
 */
const post = (router, data, success = () => {}, complete = () => {}) => {
	let userToken = '';
	let auth = db.get("userInfo");
	if (auth) {
		if (auth.expiretime > (new Date()) / 1000) {
			userToken = auth.token;
		}
	}
	uni.request({
		url: apiUrl + router,
		data: data,
		header: {
			'Accept': 'application/json',
			//'Content-Type': 'application/json',
			'Content-Type':'multipart/form-data',
			'token': userToken,
		},
		method:"POST",
		success: (response) => {
			const result = response.data
			switch (result.code) {
				case 0:
				case 1:
					success(result);
					break;
				case 401:
					db.del("userInfo");
					//console.log('pluse login',getCurrentPages()[getCurrentPages().length - 1].route);
					//
					if (getCurrentPages()[getCurrentPages().length - 1].route != 'pages/startup/index') {
						uni.reLaunch({
							url: '/pages/user/login'
						})
					}
					break;
				default:
					uni.showToast({
						title: result.msg,
						icon: 'none',
						duration: 2000,
					});
					break;
			}
		},
		complete: () => {
			complete();
		}
	});
}


/******
封装的通用Get请求
******/
const get = (method, data, success = () => {}, complete = () => {}, _timeout) => {
	let userToken = '';
	let auth = db.get("userInfo");
	if (auth) {
		if (auth.expiretime > (new Date()) / 1000) {
			userToken = auth.token;
		}
	}
	uni.request({
		url: apiUrl + method,
		data: data,
		header: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Token': userToken,
		},
		method: 'GET',
		timeout: _timeout,
		success: (response) => {
			const result = response.data
			switch (result.code) {
				case 1000:
				case 200:
					success(result);
					break;
				case 1016: //token过期，需重新登录
					db.del("userInfo");
					//console.log('pluse login',getCurrentPages()[getCurrentPages().length - 1].route);
					//
					if (getCurrentPages()[getCurrentPages().length - 1].route != 'pages/user/index') {
						uni.reLaunch({
							url: '/pages/user/login'
						})
					}
					break;
				default:
					if (result.msg.length > 0) {
						uni.showToast({
							title: result.msg,
							icon: 'none',
							duration: 2000,
						});
						console.log("GET,FAIL:" + result.msg);
					}
					break;
			}
		},
		complete: () => {
			complete();
		}
	});
}
/**
 * 
 */
export const uploadFile = (filePath, success = () => {}, fail = () => {}, type = 'image') => {

	let formData = {
		file: filePath
	}
	let auth = db.get("userInfo");
	let userToken = '';
	if (auth) {
		userToken = auth.token;
	}
	uni.uploadFile({
		url: apiUrl + 'Common/upload',
		filePath: filePath,
		fileType: type,
		name: 'file',
		header: {
			'token': userToken
		},
		formData: formData,
		success: (uploadFileRes) => {
			success(JSON.parse(uploadFileRes.data))
		},
		fail: (error) => {
			fail(error)
		},
	});
}

// 初始化
export const init = (data, success, complete) => post('app/init', data, success, complete);

// 登陆
export const login = (data, success, complete) => post('user/login', data, success, complete);

// 手机登陆
export const mobileLogin = (data, success, complete) => post('user/mobileLogin', data, success, complete)

// 刷新用户
export const refreshUser = (data, success, complete) => post('user/refreshUser', data, success, complete);

// 发送登陆验证码
export const sendLoginCaptcha = (data, success, complete) => post('sms/sendLoginCaptcha', data, success, complete);

// 发送绑定验证码
export const sendBindMobileCaptcha = (data, success, complete) => post('sms/sendBindMobile', data, success, complete);

// 关系列表
export const friendsList = (data, success, complete) => post('social/friendsList', data, success, complete);

// 关系用户信息
export const getUserInfo = (data, success, complete) => post('social/getUserInfo', data, success, complete);

// 宇宙列表
export const getCosmosList = (data, success, complete) => post('cosmos/getList', data, success, complete);

// 获取宇宙
export const getCosmos = (data, success, complete) => post('cosmos/getCosmos', data, success, complete);

// 宇宙列表
export const getCosmosUserList = (data, success, complete) => post('cosmos/getUserList', data, success, complete);

// 宇宙回响
export const getReviewList = (data, success, complete) => post('cosmos/getReview', data, success, complete);

// 宇宙回响
export const addReview = (data, success, complete) => post('cosmos/review', data, success, complete);

// 宇宙标记
export const cosmosLike = (data, success, complete) => post('cosmos/like', data, success, complete);

// 宇宙推送
export const cosmosPush = (data, success, complete) => post('cosmos/push', data, success, complete);

// 编辑资料
export const editProfile = (data, success, complete) => post('user/editProfile', data, success, complete);

// 修改密码
export const changePassword = (data, success, complete) => post('user/changePassword', data, success, complete);

// 修改手机
export const changeMobile = (data, success, complete) => post('user/changeMobile', data, success, complete);

// 获取CMS详情
export const cmsGetDetails = (data, success, complete) => post('cms/getDetails', data, success, complete);

// 反馈推送
export const feedbackPush = (data, success, complete) => post('feedback/push', data, success, complete);

// 微信登陆
export const wechatLogin = (data, success, complete) => post('user/wechatLogin', data, success, complete);


// 退出登陆
export const logout = () => post('user/logout');


/***************/
//上面的是moyi的api，后面的是自己的api
/***************/
//export const getNoteList = (data, success, complete) => post('');
export const getHomeMainCard = (data, success, complete, timeout) => get('/api/home/GetMainCard', data, success,
	complete, timeout);
export const getHomeAdCard = (data, success, complete, timeout) => get('/api/home/GetAdCard', data, success, complete,
	timeout);
	
export const pwdRegister = (data, success, complete, timeout) => post('/api/user/register', data, success, complete,
	timeout);
