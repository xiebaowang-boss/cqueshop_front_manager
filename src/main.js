import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import VueAxios from "vue-axios";
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'nprogress/nprogress.css'
import {formatDate} from "@/utils/formatDate";
import global from "@/utils/Global";

axios.defaults.baseURL = 'http://localhost:8888/shop'

Vue.prototype.$GLOBAL = global
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor)
Vue.filter("formatDate",formatDate)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')