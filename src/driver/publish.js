Vue.config.productionTip = false;

// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import JX3BOX_UI from "@jx3box/jx3box-common/vue";
Vue.use(JX3BOX_UI);

const axios = require('axios');
const $axios = axios.create({
    withCredentials: true,
})
Vue.prototype.$axios = $axios;
Vue.prototype.$http = axios;

import router from "../router/publish";
import store from "../store/publish";

import publish from "./publish.vue";

new Vue({
    router,
    store,
    render: (h) => h(publish),
}).$mount("#app");
