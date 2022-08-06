/*
 * @Author: iRuxu
 * @Date: 2022-06-08 23:24:29
 * @LastEditTime: 2022-06-11 22:15:55
 * @Description:
 */
// 第三方UI组件
import Vue from "vue";
Vue.config.productionTip = false;

import Clipboard from 'vue-clipboard2'
Vue.use(Clipboard)

import ElementUI from "element-ui";
Vue.use(ElementUI);


// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

import router from "../router";
import store from "../store";

import dashboard from "./dashboard.vue";

new Vue({
    router,
    store,
    render: (h) => h(dashboard),
}).$mount("#app");
