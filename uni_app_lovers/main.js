import Vue from 'vue'
import App from './App'

import * as Config from './common/config.js'
import * as Db from './common/db.js'
import * as Api from './common/api.js'
import * as Common from './common/common.js'
import * as Socket from './common/socket.js'
import * as Audio from './common/audio.js'
import * as mySocket from './common/mysocket.js'
Vue.prototype.$api = Api;
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$socket = Socket;
Vue.prototype.$audio = Audio;
Vue.prototype.$mysocket = mySocket;
Vue.prototype.$WebDomain = "http://localhost"
/*************/
////页面引入
/*************/
import home from './pages/home/home.vue'
Vue.component('home',home)

import rainbow from './pages/rainbow/rainbow.vue'
Vue.component('rainbow',rainbow)

import message from './pages/chat/message.vue'
Vue.component('message',message)



/************/
////组件引入
/************/
import cuCustom from './common/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

//	按钮
import myButton from './common/colorui/components/my-button.vue';
Vue.component('myButton', myButton)

//	输入框
import myInput from './common/colorui/components/my-input.vue'; 
Vue.component('myInput', myInput)

//	提示消息
import myMessage from './common/colorui/components/my-message.vue';
Vue.component('myMessage', myMessage)

//	顶部条
import myBar from './common/colorui/components/my-bar.vue';
Vue.component('myBar',myBar)

//	自定义预览界面 
import preview from './common/colorui/components/my-preview.vue';
Vue.component('preview',preview)

import loadModal from './common/moyiui/components/load-modal.vue';
Vue.component('loadModal',loadModal)

import bottomMenu from './common/moyiui/components/bottom-menu.vue';
Vue.component('bottomMenu',bottomMenu)

import moreModal from './common/moyiui/components/more-modal.vue';
Vue.component('moreModal',moreModal)

import previewModal from './common/moyiui/components/preview-modal.vue'; 
Vue.component('previewModal',previewModal)


Vue.prototype.websiteUrl = 'http://60.205.211.241:2001'; 

// 引入全局uView
import uView from 'components/uview-ui'
Vue.use(uView);


Vue.prototype.$config = Config;


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
