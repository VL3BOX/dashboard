// 第三方UI组件
import Vue from "vue";
Vue.config.productionTip = false;
import ElementUI from "element-ui";
Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
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
