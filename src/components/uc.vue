<template>
    <div class="m-dashboard-profile m-profile">
        <h2 class="u-title"><i :class="icon"></i> {{ title }}</h2>
        <tabs :tabs="tabList" />
        <slot></slot>
    </div>
</template>

<script>
import tabs from "@/components/tabs.vue";
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
                return [
                    { name: "profile", icon: "el-icon-user", label: "基本资料" },
                    { name: "avatar", icon: "el-icon-camera", label: "修改头像" },
                    { name: "pwd", icon: "el-icon-lock", label: "修改密码" },
                    { name: "email", icon: "el-icon-message", label: "邮箱设置" },
                    { name: "connect", icon: "el-icon-connection", label: "绑定账号" },
                ];
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
