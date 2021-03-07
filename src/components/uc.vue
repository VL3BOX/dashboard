<template>
    <div class="m-dashboard-profile m-profile">
        <h2 class="u-title"><i class="el-icon-user"></i> 我的资料</h2>
        <tabs />
        <slot></slot>
    </div>
</template>

<script>
import tabs from "@/components/tabs.vue";
export default {
    name: "uc",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        tabs
    },
};
</script>

<style lang="less">
@import "../assets/css/profile/uc.less";
</style>
