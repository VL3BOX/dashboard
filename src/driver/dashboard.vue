<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb :name="$t('个人中心')" slug="dashboard" root="/dashboard" :crumbEnable="true">
            <img slot="logo" svg-inline src="../assets/img/logo.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true" class="m-dashboard-container">
            <router-view />
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import checkLogin from "../utils/checkLogin";
export default {
    name: "dashboard",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    created: function () {
        checkLogin();
    },
    components: {
        Info,
        Nav,
    },
};
</script>

<style lang="less">
@import "../assets/css/dashboard.less";
</style>
