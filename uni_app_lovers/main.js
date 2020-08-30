import Vue from 'vue'
import App from './App'

import aLoadMore from "components/a_LoadMore/a_loadMore.vue";
Vue.component("aLoadMore", aLoadMore);

Vue.prototype.websiteUrl = 'http://60.205.211.241:2001'; 

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
