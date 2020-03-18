import Vue from 'vue';
import App from './App';
import headers from '@/components/header.vue';

Vue.config.productionTip = false;
Vue.component('headers',headers);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
