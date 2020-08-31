import Vue from 'vue'
import App from './App'

Vue.prototype.websiteUrl = 'http://60.205.211.241:2001'; 

// 引入全局uView
import uView from 'components/uview-ui'
Vue.use(uView);

Vue.prototype.UserInfo = {
		RealName:"",
		Phone:"",
		Sex:0,
		Birth:"",
		Sculpture:"",
		HomeTown:"",
		LoverId:"",
		LoverPhone:"",
		LoverNickName:"",
		LoveDuration:""
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
