import bucket from "../views/bucket.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/bucket", component: bucket },
]

const router = new VueRouter({
    routes,
});

export default router;
