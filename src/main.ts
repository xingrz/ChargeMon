import Vue from 'vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import Viser from 'viser-vue';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Viser);

new Vue({
  render: h => h(App),
}).$mount('#app');
