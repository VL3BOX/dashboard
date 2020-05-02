import VueRouter from "vue-router";

import index from "../views/index.vue";

import work from "../views/work.vue";
import msg from "../views/msg.vue";
import feed from "../views/feed.vue";
import fav from "../views/fav.vue";
import setting from "../views/setting.vue";

import profile from "../views/profile.vue";
import avatar from "../views/avatar.vue";
import pwd from "../views/pwd.vue";
import email from "../views/email.vue";
import connect from "../views/connect.vue";


Vue.use(VueRouter);

const routes = [
    { path: "/", component: index },

    { path: "/work", component: work },
    { path: "/msg", component: msg },
    { path: "/feed", component: feed },
    { path: "/fav", component: fav },
    { path: "/setting", component: setting },

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
