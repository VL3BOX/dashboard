<template>
    <nav class="m-nav">
        <a class="m-nav-publish el-button el-button--primary" href="/dashboard/publish">
            <i class="el-icon-edit-outline"></i><span>发布中心</span>
        </a>
        <!-- <a class="m-nav-bucket el-button el-button--primary is-plain"  href="./bucket"><img class="u-bucket" svg-inline src="../assets/img/nav/bucket.svg" /> <span>仓库</span></a> -->

        <h5 class="u-title">写作台</h5>
        <div class="m-nav-group">
            <a href="/dashboard/#/work" :class="isActive('work')">
                <i class="el-icon-collection"></i><span>我的作品</span>
            </a>
            <a href="/dashboard/#/wiki" :class="isActive('wiki')">
                <i class="el-icon-collection"></i><span>百科贡献</span>
            </a>
            <a href="/dashboard/#/bb" :class="isActive('bb')">
                <i class="el-icon-collection"></i><span>词条贡献</span>
            </a>
            <a href="/dashboard/#/other" :class="isActive('other')">
                <i class="el-icon-collection"></i><span>其它</span>
            </a>
        </div>

        <h5 class="u-title">仓库</h5>
        <div class="m-nav-group">
            <a href="/dashboard/#/msg" :class="isActive('msg')">
                <i class="el-icon-bell"></i><span>我的消息</span>
            </a>
            <a class="u-fav" href="/dashboard/#/fav" :class="isActive('fav')">
                <i class="el-icon-star-off"></i><span>我的收藏</span>
            </a>
            <a href="/dashboard/#/feed" class="disabled" :class="isActive('feed')">
                <i class="el-icon-view"></i><span>我的订阅</span>
            </a>
            <a href="/dashboard/#/collection" class="disabled" :class="isActive('collection')">
                <i class="el-icon-folder"></i><span>我的文集</span>
            </a>
        </div>

        <h5 class="u-title">账号中心</h5>
        <div class="m-nav-group">
            <a href="/dashboard/#/profile" :class="isActive('profile')">
                <i class="el-icon-user"></i><span>资料设置</span>
            </a>
            <a href="/dashboard/#/config" :class="isActive('config')">
                <i class="el-icon-setting"></i><span>通知设置</span>
            </a>
            <a :href="feedback" target="_blank">
                <i class="el-icon-phone-outline"></i><span>需要帮助</span>
                <!-- <img class="u-blank" svg-inline src="../assets/img/nav/blank.svg"/> -->
            </a>
        </div>
    </nav>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Nav",
    data: function() {
        return {
            feedback: JX3BOX.feedback,
        };
    },
    computed: {
    },
    methods: {
        isActive : function (val){
            return this.$route.name == val ? 'on' : ''
        }
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
@import "../assets/css/components/nav.less";
</style>
