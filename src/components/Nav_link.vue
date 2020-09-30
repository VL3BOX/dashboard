<template>
    <nav class="m-nav">
        <router-link class="m-nav-publish el-button el-button--primary" to="/"
            ><i class="el-icon-edit-outline"></i
            ><span>发布中心</span></router-link
        >
        <!-- <a class="m-nav-bucket el-button el-button--primary is-plain"  href="../bucket"><img class="u-bucket" svg-inline src="../assets/img/nav/bucket.svg" /> <span>仓库</span></a> -->

        <h5 class="u-title">写作台</h5>
        <div class="m-nav-group">
            <a href="../#/work"
                ><img svg-inline src="../assets/img/nav/repo.svg" /><span
                    >我的作品</span
                ></a
            >
            <a href="../#/wiki"
                ><img svg-inline src="../assets/img/nav/repo.svg" /><span
                    >百科贡献</span
                ></a
            >
            <a href="../#/bb"
                ><img svg-inline src="../assets/img/nav/repo.svg" /><span
                    >词条贡献</span
                ></a
            >
            <a href="../#/exam"
                ><img svg-inline src="../assets/img/nav/repo.svg" /><span
                    >题库贡献</span
                ></a
            >
        </div>

        <h5 class="u-title">仓库</h5>
        <div class="m-nav-group">
            <a href="../#/msg"
                ><img svg-inline src="../assets/img/nav/msg.svg" /><span
                    >我的消息</span
                ></a
            >
            <!-- <a href="../#/feed"><img svg-inline src="../assets/img/nav/feed.svg" /><span>我的订阅</span></a> -->
            <a href="../#/fav"
                ><img
                    class="u-fav"
                    svg-inline
                    src="../assets/img/nav/fav.svg"
                /><span>我的收藏</span></a
            >
        </div>

        <h5 class="u-title">账号设置</h5>
        <div class="m-nav-group">
            <a href="../#/profile"
                ><img
                    class="u-user"
                    svg-inline
                    src="../assets/img/nav/user.svg"
                /><span>资料设置</span></a
            >
            <a href="../#/config"
                ><i class="u-icon el-icon-s-tools"></i><span>通知设置</span></a
            >
            <a :href="feedback" target="_blank"
                ><img
                    class="u-help"
                    svg-inline
                    src="../assets/img/nav/help.svg"/><span>需要帮助</span
                ><img
                    class="u-blank"
                    svg-inline
                    src="../assets/img/nav/blank.svg"
            /></a>
        </div>
    </nav>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Nav_link",
    data: function() {
        return {
            feedback: JX3BOX.feedback,
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/components/nav.less";
</style>
