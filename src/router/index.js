import Vue from "vue";
import VueRouter from "vue-router";

const index = () => import("../views/index.vue");

const work = () => import("../views/work.vue");
const wiki = () => import("../views/wiki.vue");
const exam = () => import("../views/exam.vue");
const bb = () => import("../views/bb.vue");

const msg = () => import("../views/msg.vue");
const feed = () => import("../views/feed.vue");
const fav = () => import("../views/fav.vue");

const profile = () => import("../views/profile.vue");
const avatar = () => import("../views/avatar.vue");
const pwd = () => import("../views/pwd.vue");
const email = () => import("../views/email.vue");
const connect = () => import("../views/connect.vue");
const config = () => import("../views/config.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: index },

    { name: "work", path: "/work/:type?", component: work },
    { name: "wiki", path: "/wiki", component: wiki },
    { name: "exam", path: "/exam", component: exam },
    { name: "bb", path: "/bb", component: bb },

    { name: "msg", path: "/msg", component: msg },
    { name: "feed", path: "/feed", component: feed },
    { name: "fav", path: "/fav", component: fav },

    { name: "profile", path: "/profile", component: profile },
    { name: "avatar", path: "/avatar", component: avatar },
    { name: "pwd", path: "/pwd", component: pwd },
    { name: "email", path: "/email", component: email },
    { name: "connect", path: "/connect", component: connect },
    { name: "config", path: "/config", component: config },
];

const router = new VueRouter({
    routes,
});

export default router;
