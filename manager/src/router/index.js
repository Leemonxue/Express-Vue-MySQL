import Vue from 'vue'
import Router from 'vue-router'
import 'reset-css';
import Login from '@/pages/login'
import Layout from '@/pages/layout'

import Main1 from '@/homepages/main1'
import Main2 from '@/homepages/main2'
import Main3 from '@/homepages/main3'
import insertArticle from '@/homepages/insertArticle'

Vue.use(Router)

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'layout',
            meta: {
                requireAuth: true,
            },
            component: Layout,
            children: [
                {
                    path: 'main/handle',
                    name: 'handle',
                    component: Main1,
                    meta: {
                      requireAuth: true,
                    },
                },
                {
                    path: 'main/data',
                    name: 'data',
                    component: Main2,
                    meta: {
                      requireAuth: true,
                    },
                },
                {
                    path: 'main/document',
                    name: 'document',
                    component: Main3,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'main/insertArticle',
                    name: 'insertArticle',
                    component: insertArticle,
                    meta: {
                        requireAuth: true,
                    },
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('token')
    let username = window.localStorage.getItem('username')
    if (to.meta.requireAuth) { 
        if (token && username) { 
            next();
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath,
                    tag: 1,
                } 
            })
        }
    } else {
        next();
    }
})

export default router