Vue.config.productionTip = false;

// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import JX3BOX_UI from "@jx3box/jx3box-common-ui";
Vue.use(JX3BOX_UI);

const axios = require("axios");
Vue.prototype.$http = axios;

const { doPublish, doDraft } = require("../service/publish");
Vue.prototype.doPublish = doPublish;
Vue.prototype.doDraft = doDraft;

import router from "../router/publish";
import store from "../store/publish";

import publish from "./publish.vue";

new Vue({
    router,
    store,
    render: (h) => h(publish),
}).$mount("#app");
