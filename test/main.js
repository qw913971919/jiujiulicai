import Vue from 'vue'
import App from './App'
import store from './store'
import io from './component/socket/weapp.socket.io.js'
Vue.prototype.$store = store
Vue.prototype.socket = io('http://139.155.25.239:3000')
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
