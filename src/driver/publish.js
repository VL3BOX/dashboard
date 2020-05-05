Vue.config.productionTip = false;

// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import JX3BOX_UI from "@jx3box/jx3box-common-ui";
Vue.use(JX3BOX_UI);

const axios = require('axios');
const _axios = axios.create({
    withCredentials: true,
})
Vue.prototype.$http = axios;
Vue.prototype.$https = _axios;

import router from "../router/publish";
import store from "../store/publish";

import publish from "./publish.vue";

new Vue({
    router,
    store,
    render: (h) => h(publish),
}).$mount("#app");
