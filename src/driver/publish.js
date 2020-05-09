Vue.config.productionTip = false;

// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

import JX3BOX_UI from "@jx3box/jx3box-common-ui";
Vue.use(JX3BOX_UI);

import failCallback from "../utils/failCallback";
Vue.prototype.failCallback = failCallback;

import { doPublish, doDraft, doLoad } from "../service/publish";
Vue.prototype.doPublish = doPublish;
Vue.prototype.doDraft = doDraft;
Vue.prototype.doLoad = doLoad;

import router from "../router/publish";
import store from "../store/publish";

import publish from "./publish.vue";

new Vue({
    router,
    store,
    render: (h) => h(publish),
}).$mount("#app");
