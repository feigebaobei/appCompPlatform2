import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import managevue from '../components/managevue.vue'
import listvue from '../components/listvue.vue'
import auditvue from '../components/auditvue.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'silent',
      component: managevue
      // component: resolve => require(['../components/managevue.vue'], resolve)
    },
    {
      path: '/appManage',
      component: managevue
      // component: resolve => require(['../components/managevue.vue'], resolve)
    },
    {
      path: '/list',
      component: listvue
      // component: resolve => require(['../components/listvue.vue'], resolve)
    },
    {
      path: '/audit',
      component: auditvue
      // component: resolve => require(['../components/auditvue.vue'], resolve)
    }
  ]
})
