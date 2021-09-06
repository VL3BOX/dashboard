<template>
    <nav class="m-nav">
        <a class="m-nav-publish el-button el-button--primary" href="/publish" target="_blank">
            <i class="el-icon-edit-outline"></i>
            <span>创作中心</span>
        </a>

        <h5 class="u-title">我的仓库</h5>
        <div class="m-nav-group">
            <router-link to="msg">
                <i class="el-icon-bell"></i>
                <span>我的消息</span>
            </router-link>
            <router-link to="fav">
                <i class="el-icon-star-off"></i>
                <span>我的收藏</span>
            </router-link>
            <!-- <a
                href="/dashboard/#/feed"
                class="disabled"
                :class="isActive('feed')"
            >
                <i class="el-icon-view"></i><span>我的订阅</span>
            </a>-->
        </div>

        <h5 class="u-title">权益中心</h5>
        <div class="m-nav-group">
            <router-link to="order">
                <i class="el-icon-shopping-bag-1"></i>
                <span>我的订单</span>
            </router-link>
            <router-link to="boxcoin">
                <i class="el-icon-coin"></i>
                <span>我的盒币</span>
            </router-link>
            <router-link to="packet">
                <i class="el-icon-wallet"></i>
                <span>我的红包</span>
            </router-link>
        </div>

        <h5 class="u-title">账号中心</h5>
        <div class="m-nav-group">
            <router-link to="/profile" :class="isProfile">
                <i class="el-icon-user"></i>
                <span>资料设置</span>
            </router-link>
            <router-link to="whitelist">
                <i class="el-icon-ship"></i>
                <span>亲友设置</span>
            </router-link>
            <!-- <router-link to="config">
                <i class="el-icon-setting"></i>
                <span>同步设置</span>
            </router-link> -->
            <router-link to="cooperation">
                <i class="el-icon-reading"></i>
                <span>签约作者</span>
            </router-link>
            <a :href="feedback" target="_blank">
                <i class="el-icon-phone-outline"></i>
                <span>需要帮助</span>
                <!-- <img class="u-blank" svg-inline src="../assets/img/nav/blank.svg"/> -->
            </a>
        </div>
    </nav>
</template>

<script>
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
const profile_routes = ["profile", "avatar", "pwd", "connect", "email"];
import dashboardLink from "@/utils/dashboardLink.js";
import vipLink from "@/utils/dashboardLink.js";
export default {
    name: "Nav",
    data: function () {
        return {
            feedback,
        };
    },
    computed: {
        isProfile: function () {
            return profile_routes.includes(this.$route.name) ? "on" : "";
        },
        // publish_url: function () {
        //     return dashboardLink(`publish`);
        // },
    },
    methods: {
        // isActive: function (val) {
        //     return this.$route.name == val ? "on" : "";
        // },
        catg_url: function (val) {
            return dashboardLink(`#/${val}`);
        },
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/components/nav.less";
</style>
