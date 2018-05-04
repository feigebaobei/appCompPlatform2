// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import audit from './audit.vue'
import router from '../../router/routerAppDetail.js'

import iView from 'iview'
import axios from 'axios'
import qs from 'qs'
import statusManitor from '../../vuex/statusManitor.js'
import 'iview/dist/styles/iview.css'

Vue.prototype.$axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false

Vue.use(router)
Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#audit',
  store: statusManitor,
  render: h => h(audit)
})
