import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

import Login from './components/auth/Login'
import Dashboard from './components/pages/Dashboard'

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            reauireAuth: true
        }
    }
]

const router =  new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    
    let token = localStorage.getItem('token')
    
    if(token){
        store.dispatch('setLoginStatus', true)
    }
    
    if(token && to.path == '/login'){
        // console.log('get token')
            next({
                path: '/dashboard',
                params: { nextUrl: to.fullPath }
            })
    }else if(to.path == '/dashboard' && !token){
        next({
            path: '/login',
            params: { nextUrl: to.fullPath }
        })
    }
    else{
        // console.log('no token')
        next()
    }
    next() 


//     if(to.matched.some(record => record.meta.requiresAuth)) {
//         if (localStorage.getItem('jwt') == null) {
//             next({
//                 path: '/login',
//                 params: { nextUrl: to.fullPath }
//             })
//         } else {
//             let user = JSON.parse(localStorage.getItem('user'))
//             if(to.matched.some(record => record.meta.is_admin)) {
//                 if(user.is_admin == 1){
//                     next()
//                 }
//                 else{
//                     next({ name: 'userboard'})
//                 }
//             }else {
//                 next()
//             }
//         }
//     } else if(to.matched.some(record => record.meta.guest)) {
//         if(localStorage.getItem('jwt') == null){
//             next()
//         }
//         else{
//             next({ name: 'userboard'})
//         }
//     }else {
//         next()
//     }
})

export default router