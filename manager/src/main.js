// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import commonFunc from './assets/js/commonFunc.js'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.commonFunc = commonFunc
Vue.prototype.axios = axios

axios.interceptors.request.use(
    config => {
        let token = window.localStorage.getItem('token')
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.common['Authorization'] = 'Bearer ' + token
            // config.headers.post['content-Type'] = 'application/json'
            // config.headers.post['content-Type'] = 'application/x-www-form-urlencoded'
        }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const errRes = error.response;
        if (errRes.status === 401) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('username');
            vueInstance.$message.error('please login first')
            vueInstance.$router.push('/login')
        }
        return Promise.reject(error.message); // 返回接口返回的错误信息
  });

let vueInstance = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})