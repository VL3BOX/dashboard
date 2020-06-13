import Vue from "vue";
import VueRouter from "vue-router";

import index from "../publish/index.vue";

import jx3dat from "../publish/jx3dat.vue";
import fb from "../publish/fb.vue";
import cj from "../publish/cj.vue";
import house from "../publish/house.vue";
import macro from "../publish/macro.vue";
import bps from "../publish/bps.vue";

Vue.use(VueRouter);

const routes = [

    // 发布索引
    { path: "/", component: index },

    // 成就发布
    {
        path: "/cj/:achievement_id(\\d+)?",
        component: cj,
    },

    // 副本发布
    {
        path: "/fb/:id?",
        component: fb,
    },

    // 插件数据发布
    {
        path: "/jx3dat/:id?",
        component: jx3dat,
    },

    // 家园发布
    {
        path: "/house/:id?",
        component: house,
    },

    // 宏发布
    {
        path: "/macro/:id?",
        component: macro,
    },

    // 职业发布
    {
        path: "/bps/:id?",
        component: bps,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
