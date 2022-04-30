import { createRouter, createWebHistory } from 'vue-router'
import Hero from '../pages/layouts/default-partials/Hero.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
    {
        path: '/',
        component: Hero,
        name: 'home',
        meta: {
            layout: 'DefaultLayout',
        },
    },

    {
        path: '/:catchAll(.*)',
        component: NotFound,
        name: 'not found',
    },
]

const router = new createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/', '/home', '/login']
    const authRequired = !publicPages.includes(to.path)
    const userIn = localStorage.getItem('userToken')
    const clientIn = localStorage.getItem('clientToken')
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired) {
        if (to.matched.some((record) => record.meta.authOnly)) {
            if (!userIn) {
                next('/admin-login')
            } else {
                next()
            }
        } else if (to.matched.some((record) => record.meta.clientOnly)) {
            if (!clientIn) {
                next('/login')
            } else {
                next()
            }
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
