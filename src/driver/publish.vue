<template>
    <div id="app">
        <Header />
        <Breadcrumb>
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav_link />
        </LeftSidebar>
        <Main class="m-dashboard-publish">
            <router-view />
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav_link from "@/components/Nav_link.vue";
const { User } = require("@jx3box/jx3box-common");
export default {
    name: "publish",
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
        Nav_link
    },
};
</script>

