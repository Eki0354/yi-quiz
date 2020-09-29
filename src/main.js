import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import sizeMixin from './mixins/size'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  mixin: [sizeMixin],
  render: h => h(App)
}).$mount('#app')
