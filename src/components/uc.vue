<template>
    <div class="m-dashboard-profile m-profile">
        <h2 class="u-title"><i :class="icon"></i> {{ title }}</h2>
        <tabs :tabs="tabList" />
        <slot></slot>
    </div>
</template>

<script>
import tabs from "@/components/tabs.vue";
import { profileTab } from "@/assets/data/tabs.json";
export default {
    name: "uc",
    props: {
        icon: {
            type: String,
            default: "el-icon-user",
        },
        title: {
            type: String,
            default: "我的资料",
        },
        tabList: {
            type: Array,
            default: function () {
                return profileTab;
            },
        }
    },
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
