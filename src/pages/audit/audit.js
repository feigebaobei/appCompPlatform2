// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import audit from './audit.vue'
import router from '../../router/routerAppDetail.js'

import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#audit',
  render: h => h(audit)
})
