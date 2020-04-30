import VueRouter from "vue-router";

import index from "../views/index.vue";
import work from "../views/work.vue";
import publish from "../views/publish.vue";
import email from "../views/email.vue";
import fav from "../views/fav.vue";
import feed from "../views/feed.vue";
import connect from "../views/connect.vue";
import msg from "../views/msg.vue";
import profile from "../views/profile.vue";
import pwd from "../views/pwd.vue";
import bucket from "../views/bucket.vue";
import avatar from "../views/avatar.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: index },
    { path: '/publish', component: publish },
    { path: '/work', component: work },
    { path: '/email', component: email },
    { path: '/fav', component: fav },
    { path: '/feed', component: feed },
    { path: '/connect', component: connect },
    { path: '/msg', component: msg },
    { path: '/profile', component: profile },
    { path: '/pwd', component: pwd },
    { path: '/bucket', component: bucket },
    { path: '/avatar', component: avatar },
]

const router = new VueRouter({
    routes
});

export default router;
