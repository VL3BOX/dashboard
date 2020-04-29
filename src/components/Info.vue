<template>
    <div class="m-info">
        <router-link class="u-channel" to="/">
            <img
                class="u-channel-logo"
                svg-inline
                src="../assets/img/dashboard.svg"
            />
            <span class="u-title">用户中心</span>
        </router-link>
        <div class="u-stat"></div>
        <div class="u-home">
            <a class="el-button el-button--primary is-plain" :href="home"
                ><img
                    class="u-home-icon"
                    svg-inline
                    src="../assets/img/home.svg"
                />个人主页</a
            >
        </div>
    </div>
</template>

<script>
const { JX3BOX, User } = require("@jx3box/jx3box-common");
export default {
    name: "Info",
    props: [],
    data: function() {
        return {
            uid: User.getInfo().uid,
        };
    },
    computed: {
        home: function() {
            return JX3BOX.__Links.author + this.uid;
        },
    },
    methods: {},
    mounted: function() {
    },
};
</script>

<style lang="less">
.c-breadcrumb {
    .u-channel-logo {
        .size(18px);
        .mt(5px);
        fill: @color;
    }
    .u-home {
        .fr;
        margin-right: 10px;
        a {
            .r(3px);
            padding: 5px 10px;
            .fz(14px);
            .db;

            &:hover {
                .u-home-icon {
                    fill: #fff;
                }
            }
        }
        .u-home-icon {
            .size(14px);
            .y(-2px);
            .mr(5px);
            fill: @primary;
        }
    }
}
@media screen and (max-width: @ipad) {
    .c-breadcrumb {
        .u-stat {
            white-space: nowrap;
            overflow: auto;
        }
    }
}
</style>
