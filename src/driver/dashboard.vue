<template>
    <div id="app">
        <Header />
        <Breadcrumb>
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main>
            <router-view />
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
const { User } = require("@jx3box/jx3box-common");
export default {
    name: "dashboard",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function () {
        if(location.hostname != 'localhost'){
            if(!User.isLogin()){
                User.destroy()
                User.toLogin()
            }
        }
    },
    components: {
        Info,
        Nav,
    },
};
</script>

<style lang="less">

</style>
