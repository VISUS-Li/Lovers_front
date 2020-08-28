import Vue from 'vue'
import App from './App'

Vue.prototype.websiteUrl = 'http://60.205.211.241:2001'; 

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
