<template>
    <nav class="m-nav">
        <router-link class="m-nav-publish el-button el-button--primary" to="/"><i class="el-icon-edit"></i><span>发布</span></router-link>
        <!-- <a class="m-nav-bucket el-button el-button--primary is-plain"  href="../bucket"><img class="u-bucket" svg-inline src="../assets/img/bucket.svg" /> <span>仓库</span></a> -->

        <!-- <h5 class="u-title">写作台</h5>
        <div class="m-nav-group">
            <a href="../#/work"><img svg-inline src="../assets/img/repo.svg" /><span>我的作品</span></a>
            <a href="../#/msg"><img svg-inline src="../assets/img/msg.svg" /><span>我的消息</span></a>
            <a href="../#/feed"><img svg-inline src="../assets/img/feed.svg" /><span>我的订阅</span></a>
            <a href="../#/fav"><img class="u-fav" svg-inline src="../assets/img/fav.svg" /><span>我的收藏</span></a>
            <a href="../#/setting"><img class="u-setting" svg-inline src="../assets/img/setting.svg" /><span>隐私通知</span></a>
        </div> -->

        <h5 class="u-title">账号设置</h5>
        <div class="m-nav-group">
            <a href="../#/profile"><img class="u-user" svg-inline src="../assets/img/user.svg" /><span>资料修改</span></a>
            <a href="../#/avatar"><img class="u-avatar" svg-inline src="../assets/img/avatar.svg" /><span>修改头像</span></a>
            <a href="../#/pwd"><img class="u-pass" svg-inline src="../assets/img/pass.svg" /><span>修改密码</span></a>
            <a href="../#/email"><img class="u-mail" svg-inline src="../assets/img/mail.svg" /><span>绑定邮箱</span></a>
            <a href="../#/connect"><img class="u-link" svg-inline src="../assets/img/link.svg" /><span>绑定账号</span></a>
            <a :href="feedback" target="_blank"><img class="u-help" svg-inline src="../assets/img/help.svg" /><span>需要帮助</span><img class="u-blank" svg-inline src="../assets/img/blank.svg" /></a>
        </div>

    </nav>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Nav_link",
    data: function() {
        return {
            feedback : JX3BOX.feedback
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
    @import '../assets/css/components/nav.less';
</style>