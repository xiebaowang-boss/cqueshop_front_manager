import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: () =>
        import ('../components/Login.vue')
},
    {
        path: '/home',
        name: 'Home',
        redirect: '/welcome',
        component: () =>
            import ('../views/Home'),
        children: [{
            path: '/welcome',
            component: () =>
                import ('../components/Welcome')
        },
            {
                path: '/userManager',
                component: () =>
                    import ('../components/users/Users')
            },
            {
                path: '/goodsManager',
                component: () =>
                    import ('../components/goods/goodsManager')
            },
            {
                path: '/categoryManager',
                component: () => import('../components/category/categoryManager')
            },
            {
                path: '/adminMenuManager',
                component: () => import('../components/adminMenu/MenuManager')
            }
        ],
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ('../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})


//路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router