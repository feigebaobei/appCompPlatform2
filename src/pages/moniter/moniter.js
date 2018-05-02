// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moniter from './moniter.vue'
import router from '../../router/routerAppDetail.js'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#moniter',
  render: h => h(moniter)
})
