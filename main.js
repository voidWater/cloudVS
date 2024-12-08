import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import store from './store'
import fileupload from './common/fileUpload.js'
Vue.prototype.$store = store
Vue.prototype.$fileupload = fileupload
import $vscommon from './common/vscommon.js'
Vue.prototype.$vscommon = $vscommon


const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'


export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif