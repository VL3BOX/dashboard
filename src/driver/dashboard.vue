<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="个人中心" slug="dashboard" root="/dashboard" :crumbEnable="true">
            <img slot="logo" svg-inline src="../assets/img/logo.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="true"  class="m-dashboard-container" :class="{'m-dashboard-person':isProfile}">
            <tabs v-show="isProfile"/>
            <router-view />
        </Main>
    </div>
</template>

<script>
import tabs from "@/components/tabs.vue";
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import checkLogin from '../utils/checkLogin'
const profileViews = ['profile','avatar','email','pwd','connect']
export default {
    name: "dashboard",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        isProfile : function (){
            return profileViews.includes(this.$route.name)
        }
    },
    methods: {},
    created: function () {
        checkLogin()
    },
    components: {
        Info,
        Nav,
        tabs
    },
};
</script>

<style lang="less">
    @import '../assets/css/dashboard.less';
</style>