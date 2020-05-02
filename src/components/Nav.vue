<template>
    <nav class="m-nav">
        <a class="m-nav-publish el-button el-button--primary" href="./publish"><i class="el-icon-edit"></i><span>发布</span></a>
        <a class="m-nav-bucket el-button el-button--primary is-plain"  href="./bucket"><img class="u-bucket" svg-inline src="../assets/img/bucket.svg" /> <span>仓库</span></a>

        <h5 class="u-title">写作台</h5>
        <div class="m-nav-group">
            <router-link to="/work"><img svg-inline src="../assets/img/repo.svg" /><span>我的作品</span></router-link>
            <router-link to="/msg"><img svg-inline src="../assets/img/msg.svg" /><span>我的消息</span></router-link>
            <router-link to="/feed"><img svg-inline src="../assets/img/feed.svg" /><span>我的订阅</span></router-link>
            <router-link to="/fav"><img class="u-fav" svg-inline src="../assets/img/fav.svg" /><span>我的收藏</span></router-link>
            <router-link to="/setting"><img class="u-setting" svg-inline src="../assets/img/setting.svg" /><span>隐私通知</span></router-link>
        </div>

        <h5 class="u-title">账号设置</h5>
        <div class="m-nav-group">
            <router-link to="/profile"><img class="u-user" svg-inline src="../assets/img/user.svg" /><span>资料修改</span></router-link>
            <router-link to="/avatar"><img class="u-avatar" svg-inline src="../assets/img/avatar.svg" /><span>修改头像</span></router-link>
            <router-link to="/pwd"><img class="u-pass" svg-inline src="../assets/img/pass.svg" /><span>修改密码</span></router-link>
            <router-link to="/email"><img class="u-mail" svg-inline src="../assets/img/mail.svg" /><span>绑定邮箱</span></router-link>
            <router-link to="/connect"><img class="u-link" svg-inline src="../assets/img/link.svg" /><span>绑定账号</span></router-link>
            <a :href="feedback" target="_blank"><img class="u-help" svg-inline src="../assets/img/help.svg" /><span>需要帮助</span><img class="u-blank" svg-inline src="../assets/img/blank.svg" /></a>
        </div>

    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: function() {
        return {
            feedback : this.JX3BOX.feedback
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