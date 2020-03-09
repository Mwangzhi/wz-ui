import Vue from 'vue'
import App from './App.vue'
import wzui from './package/index'
Vue.config.productionTip = false
Vue.use(wzui);
new Vue({
  render: h => h(App),
}).$mount('#app')
