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
    },
    {
      path: '/appManage',
      component: managevue
    },
    {
      path: '/list',
      component: listvue
    },
    {
      path: '/audit',
      component: auditvue
    }
  ]
})
