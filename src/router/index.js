import VueRouter from "vue-router";

import index from "../views/index.vue";

import publish from "../views/publish.vue";
import pt from "../publish/index.vue";
import fb from "../publish/fb.vue";
import cj from "../publish/cj.vue";
import house from "../publish/house.vue";

import bucket from "../views/bucket.vue";

import work from "../views/work.vue";
import msg from "../views/msg.vue";
import feed from "../views/feed.vue";
import fav from "../views/fav.vue";

import profile from "../views/profile.vue";
import avatar from "../views/avatar.vue";
import pwd from "../views/pwd.vue";
import email from "../views/email.vue";
import connect from "../views/connect.vue";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: index },

    {
        path: "/publish",
        component: publish,
        children: [
            {
                path: "index",
                component: pt,
            },
            {
                path: "fb",
                component: fb,
            },
            {
                path: "cj",
                component: cj,
            },
            {
                path: "house",
                component: house,
            },
        ],
    },
    { path: "/bucket", component: bucket },

    { path: "/work", component: work },
    { path: "/msg", component: msg },
    { path: "/feed", component: feed },
    { path: "/fav", component: fav },

    { path: "/profile", component: profile },
    { path: "/avatar", component: avatar },
    { path: "/pwd", component: pwd },
    { path: "/email", component: email },
    { path: "/connect", component: connect },
    
];

const router = new VueRouter({
    routes,
});

export default router;
