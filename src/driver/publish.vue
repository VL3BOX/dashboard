<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="个人中心" slug="dashboard" root="/dashboard">
            <img slot="logo" svg-inline src="../assets/img/logo.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav_link />
        </LeftSidebar>
        <Main :withoutRight="true" class="m-dashboard-publish">
            <router-view />
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav_link from "@/components/Nav_link.vue";
import checkLogin from '../utils/checkLogin'
export default {
    name: "dashboard",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    created: function () {
        checkLogin()
    },
    components: {
        Info,
        Nav_link,
    },
};
</script>

<style lang="less">
    @import '../assets/css/publish.less';
</style>