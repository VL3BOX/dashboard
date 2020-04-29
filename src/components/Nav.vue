<template>
    <nav class="m-nav">
        <router-link class="m-nav-publish el-button el-button--primary" to="publish"><i class="el-icon-edit"></i><span>发布</span></router-link>
        <router-link class="m-nav-bucket el-button el-button--primary is-plain"  to="bucket"><img class="u-bucket" svg-inline src="../assets/img/bucket.svg" /> <span>仓库</span></router-link>

        <h5 class="u-title">写作台</h5>
        <div class="m-nav-group">
            <router-link to="work"><img svg-inline src="../assets/img/repo.svg" /><span>我的作品</span></router-link>
            <router-link to="msg"><img svg-inline src="../assets/img/msg.svg" /><span>我的消息</span></router-link>
            <router-link to="feed"><img svg-inline src="../assets/img/feed.svg" /><span>我的订阅</span></router-link>
            <router-link to="fav"><img class="u-fav" svg-inline src="../assets/img/fav.svg" /><span>我的收藏</span></router-link>
        </div>

        <h5 class="u-title">账号设置</h5>
        <div class="m-nav-group">
            <router-link to="profile"><img class="u-user" svg-inline src="../assets/img/user.svg" /><span>资料修改</span></router-link>
            <router-link to="pwd"><img class="u-pass" svg-inline src="../assets/img/pass.svg" /><span>修改密码</span></router-link>
            <router-link to="email"><img class="u-mail" svg-inline src="../assets/img/mail.svg" /><span>绑定邮箱</span></router-link>
            <router-link to="link"><img class="u-link" svg-inline src="../assets/img/link.svg" /><span>绑定账号</span></router-link>
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
.c-sidebar-left {
    padding: 0;
}
.m-nav-publish{
    margin:10px;
    .db;
    box-sizing: border-box;
}
.m-nav-bucket{
    .db;
    box-sizing: border-box;
    margin:10px;
    .u-bucket{
        fill:@color-link;
        .y(-3px);
    }

    background-color: #fff !important;
    border-color:@color-link !important;
    color:@color-link;
    &:hover,&:focus,&.router-link-active{
        color:#f39 !important;
        border-color:#f39 !important;
        .u-bucket{
            fill:#f39;
        }
    }
}
.m-nav {
    .u-title {
        padding: 10px;
        border-bottom: 1px solid #eee;
        margin:0;
    }
}
.m-nav-group {
    margin-top:5px;
    margin-bottom:10px;
    a {
        .db;
        // border-bottom: 1px solid #eee;
        .fz(14px, 32px);
        padding: 5px 25px;
        color: #555;
        svg{
            .y;
            .mr(5px);
            fill:#555;
            .size(16px);
        }

        .u-fav,.u-user,.u-pass{
            .size(14px);
            .y(-2px);
        }
        .u-blank{
            .mt(7px);
            .fr;
        }

        &:hover {
            // background-color: #fff;
            color:@color-link;
            svg{fill:@color-link;}
        }

        border-top:1px solid transparent;
        border-bottom:1px solid transparent;
        &.router-link-active {
            background-color: #fff;
            color:@color-link;
            svg{fill:@color-link;}
            .bold;
            border-top:1px solid #eee;
            border-bottom:1px solid #eee;
        }
    }
}

</style>
