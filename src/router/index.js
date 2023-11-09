/*
 * @Author: iRuxu
 * @Date: 2022-06-09 13:55:38
 * @LastEditTime: 2022-07-05 16:42:43
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const index = () => import("../views/index.vue");

const msg = () => import("../views/msg.vue");
const letter = () => import("../views/letter.vue");
// const feed = () => import("../views/feed.vue");
const fav = () => import("../views/fav.vue");
const purchases = () => import("../views/purchases.vue");
const frame = () => import("../views/frame.vue");
const theme = () => import("../views/theme.vue");
const emotion = () => import("../views/emotion.vue");
const honor = () => import("../views/honor.vue");

const orders = () => import("../views/orders.vue");
const packet = () => import("../views/packet.vue");
const boxcoin = () => import("../views/boxcoin.vue");
const points = () => import("../views/points.vue");
const cny = () => import("../views/cny.vue");
const tasks = () => import("../views/tasks.vue");
const card = () => import("../views/card.vue");

const profile = () => import("../views/profile.vue");
const avatar = () => import("../views/avatar.vue");
const pwd = () => import("../views/pwd.vue");
const email = () => import("../views/email.vue");
const connect = () => import("../views/connect.vue");
const config = () => import("../views/config.vue");
const privacy = () => import("../views/privacy.vue");
const cooperation = () => import("../views/cooperation.vue");
const feedback = () => import("../views/feedback.vue");

const address = () => import("../views/address.vue");
const mall = () => import("../views/mall.vue");
const order_detail = () => import("../views/order_detail.vue");
const filter = () => import("../views/filter.vue");

const invitation_creators = () => import("../views/callback/invitation_creators.vue");
const invitation_kith = () => import("../views/callback/invitation_kith.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: index },

    { name: "msg", path: "/msg", component: msg },
    { name: "letter", path: "/letter", component: letter },
    // { name: "feed", path: "/feed", component: feed },
    { name: "fav", path: "/fav/:subtype?", component: fav },
    { name: "purchases", path: "/purchases", component: purchases },
    { name: "frame", path: "/frame", component: frame },
    { name: "theme", path: "/theme", component: theme },
    { name: "emotion", path: "/emotion", component: emotion },
    { name: "honor", path: "/honor", component: honor },

    { name: "mall", path: "/mall", component: mall },
    { name: "orders", path: "/orders", component: orders },
    { name: "packet", path: "/packet", component: packet },
    { name: "boxcoin", path: "/boxcoin", component: boxcoin },
    { name: "cny", path: "/cny", component: cny },
    { name: "points", path: "/points", component: points },
    { name: "tasks", path: "/tasks", component: tasks },
    { name: "card", path: "/card", component: card },

    { name: "profile", path: "/profile", component: profile },
    { name: "avatar", path: "/avatar", component: avatar },
    { name: "pwd", path: "/pwd", component: pwd },
    { name: "email", path: "/email", component: email },
    { name: "connect", path: "/connect", component: connect },
    { name: "config", path: "/config", component: config },
    { name: "cooperation", path: "/cooperation", component: cooperation },
    { name: "privacy", path: "/privacy", component: privacy },
    { name: "filter", path: "/filter", component: filter },

    { name: "address", path: "/address", component: address },
    { name: "order-detail", path: "/mall-detail/:id", component: order_detail },

    {
        name: "feedback",
        path: "/feedback",
        component: feedback,
        redirect: {
            name: "feedback_index",
        },
        children: [{
                name: "feedback_index",
                path: "/feedback",
                component: () => import("@/components/feedback/index.vue"),
            },
            {
                name: "feedback_erase",
                path: "/feedback/erase",
                component: () => import("@/components/feedback/erase.vue"),
            },
            {
                name: "feedback_single",
                path: "/feedback/:id",
                component: () => import("@/components/feedback/single.vue"),
            },
        ],
    },

    { name: "invitation_creators", path: "/callback/invitation/creators", component: invitation_creators },
    { name: "invitation_kith", path: "/callback/invitation/kith", component: invitation_kith },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/dashboard",
});

router.beforeEach((to, from, next) => {
    if (to.fullPath.includes("/#")) {
        next(to.fullPath.replace("/#", ""));
    }
    next();
});

export default router;
