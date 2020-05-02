import VueRouter from "vue-router";

import index from "../publish/index.vue";

import fb from "../publish/fb.vue";
import cj from "../publish/cj.vue";
import house from "../publish/house.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: index },

    {
        path: "/fb",
        component: fb,
    },
    {
        path: "/cj",
        component: cj,
    },
    {
        path: "/house",
        component: house,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
