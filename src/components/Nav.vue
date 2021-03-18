<template>
    <nav class="m-nav">
        <a
            class="m-nav-publish el-button el-button--primary"
            :href="publish_url"
        >
            <i class="el-icon-edit-outline"></i><span>发布中心</span>
        </a>
        <!-- <a class="m-nav-bucket el-button el-button--primary is-plain"  href="./bucket"><img class="u-bucket" svg-inline src="../assets/img/nav/bucket.svg" /> <span>仓库</span></a> -->

        <h5 class="u-title">创作台</h5>
        <div class="m-nav-group">
            <a :href="catg_url('work')" :class="isActive('work')">
                <i class="el-icon-collection"></i><span>我的作品</span>
            </a>
            <a :href="catg_url('wiki')" :class="isActive('wiki')">
                <i class="el-icon-collection"></i><span>百科贡献</span>
            </a>
            <a :href="catg_url('other')" :class="isActive('other')">
                <i class="el-icon-collection"></i><span>其它创作</span>
            </a>
        </div>

        <h5 class="u-title">仓库</h5>
        <div class="m-nav-group">
            <a :href="catg_url('msg')" :class="isActive('msg')">
                <i class="el-icon-bell"></i><span>我的消息</span>
            </a>
            <a :href="catg_url('fav')" :class="isActive('fav')">
                <i class="el-icon-star-off"></i><span>我的收藏</span>
            </a>
            <!-- <a
                href="/dashboard/#/feed"
                class="disabled"
                :class="isActive('feed')"
            >
                <i class="el-icon-view"></i><span>我的订阅</span>
            </a> -->
        </div>

        <h5 class="u-title">账号中心</h5>
        <div class="m-nav-group">
            <a :href="catg_url('profile')" :class="isProfile">
                <i class="el-icon-user"></i><span>资料设置</span>
            </a>
            <!-- <a
                href="/dashboard/#/config"
                class="disabled"
                :class="isActive('config')"
            >
                <i class="el-icon-setting"></i><span>同步设置</span>
            </a> -->
            <a :href="feedback" target="_blank">
                <i class="el-icon-phone-outline"></i><span>需要帮助</span>
                <!-- <img class="u-blank" svg-inline src="../assets/img/nav/blank.svg"/> -->
            </a>
        </div>
    </nav>
</template>

<script>
import { feedback } from "@jx3box/jx3box-common/data/jx3box.json";
const profile_rooutes = ["profile", "avatar", "pwd", "connect", "email"];
import {dashboardLink} from '@/utils/dashboardLink.js'
export default {
    name: "Nav",
    data: function() {
        return {
            feedback,
        };
    },
    computed: {
        isProfile: function() {
            return profile_rooutes.includes(this.$route.name) ? 'on' : '';
        },
        publish_url : function (){
            return process.env == 'production' ? '/dashboard/publish' : '/publish'
        },
    },
    methods: {
        isActive: function(val) {
            return this.$route.name == val ? "on" : "";
        },
        catg_url : function (val){
            return process.env == 'production' ? `/dashboard/#/${val}` : `#/${val}`
        }
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/components/nav.less";
</style>
