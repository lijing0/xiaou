import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ()=> import ('../components/pages/index'),
      children:[
        {
          path:'home',
          component: () => import ('../components/pages/home')
        },
        {
          path:'cart',
          component: () => import ('../components/pages/cart')
        },
        {
          path:'me',
          component: () => import ('../components/pages/me')
        },
        {
          path:'',
          redirect: 'home'
        },
        {
          path:'cate',
          component: () => import ('../components/pages/cate')
        },
        {
          path:'cate/:cateid',
          component: () => import ('../components/pages/goodsList')
        },
        {
          path:'detail/:goodid',
          component: () => import ('../components/pages/detail')
        },
        {
          path:'login',
          component: () => import ('../components/pages/login')
        }
      ]
    }
  ]
})
