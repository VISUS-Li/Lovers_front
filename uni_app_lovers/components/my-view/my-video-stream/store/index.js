import Vue from 'vue'
import Vuex from 'vuex'
//好看商城用到的缓存
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		forcedLogin: false, //登陆页引用了这个变量,是否强制登陆
		hasLogin: false, //用户登陆状态
		userInfo: {},
		//首屏广告上次显示时间
		splashAdvertPreTime: 0,
		cenming: 1,
		wanjia: "普通会员"
	},
	
	mutations: {
		//登录
		login(state,provider) {
			// console.log("用户是：" + provider.user);
			state.cenming = provider.user || '新用户';
			state.hasLogin = true; //用户登陆状态
			state.userInfo = provider;
			uni.setStorage({    //缓存用户登录信息
			    key: 'userInfo',
			    data: provider  
			}) 
		},
		//退出
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			state.cenming = 1;
			uni.removeStorage({  //删除缓存
        key: 'userInfo'  
      })
		}
	},
	
	actions: {
	
	}
	
})

export default store
