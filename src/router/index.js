import Vue from "vue";
import VueRouter from "vue-router";

import index from "../views/index.vue";

import work from "../views/work.vue";
import wiki from "../views/wiki.vue";
import ideas from "../views/ideas.vue";

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
    { name: "index", path: "/", component: index },

    { name: "work", path: "/work/:type?", component: work },
    { name: "wiki", path: "/wiki", component: wiki },
    { name: "ideas", path: "/ideas", component: ideas },

    { name: "msg", path: "/msg", component: msg },
    { name: "feed", path: "/feed", component: feed },
    { name: "fav", path: "/fav", component: fav },
    { name: "setting", path: "/setting", component: setting },

    { name: "profile", path: "/profile", component: profile },
    { name: "avatar", path: "/avatar", component: avatar },
    { name: "pwd", path: "/pwd", component: pwd },
    { name: "email", path: "/email", component: email },
    { name: "connect", path: "/connect", component: connect },
];

const router = new VueRouter({
    routes,
});

export default router;
