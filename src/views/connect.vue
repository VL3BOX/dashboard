<template>
    <div class="m-dashboard m-dashboard-connect">
        <el-card class="box-card">
            <img
                class="u-github"
                svg-inline
                src="../assets/img/connect/github.svg"
            />
            <p class="u-status">{{ github_status ? github : "未绑定" }}</p>
            <el-button
                class="u-button"
                :type="!github_status ? 'primary' : 'danger'"
                @click="!github_status ? bind('github') : unbind('github')"
                >{{ !github_status ? "绑定" : "解除绑定" }}</el-button
            >
        </el-card>

        <el-card class="box-card">
            <img class="u-qq" svg-inline src="../assets/img/connect/qq.svg" />
            <p class="u-status">{{ qq_status ? qq : "未绑定" }}</p>
            <el-button
                class="u-button"
                :type="!qq_status ? 'primary' : 'danger'"
                @click="!qq_status ? bind('qq') : unbind('qq')"
                >{{ !qq_status ? "绑定" : "解除绑定" }}</el-button
            >
        </el-card>

        <el-card class="box-card">
            <img
                class="u-weibo"
                svg-inline
                src="../assets/img/connect/weibo.svg"
            />
            <p class="u-status">{{ weibo_status ? weibo : "未绑定" }}</p>
            <el-button
                class="u-button"
                :type="!weibo_status ? 'primary' : 'danger'"
                @click="!weibo_status ? bind('weibo') : unbind('weibo')"
                >{{ !weibo_status ? "绑定" : "解除绑定" }}</el-button
            >
        </el-card>
    </div>
</template>

<script>
import { JX3BOX, User, OAuth } from "@jx3box/jx3box-common";
import { unbindOAuth, checkOAuth } from "../service/profile";

export default {
    name: "connect",
    props: [],
    data: function() {
        return {
            uid: User.getInfo().uid,
            github: "",
            qq: "",
            weibo: "",
            uuid: User.getUUID() || "jx3box",
        };
    },
    computed: {
        github_status: function() {
            return !!this.github;
        },
        qq_status: function() {
            return !!this.qq;
        },
        weibo_status: function() {
            return !!this.weibo;
        },
        github_url: function() {
            return `${OAuth.github.authorize_uri}?client_id=${OAuth.github.client_id}&redirect_uri=${OAuth.github.callback}`;
        },
        qq_url: function() {
            return `${OAuth.qq.authorize_uri}?client_id=${OAuth.qq.client_id}&redirect_uri=${OAuth.qq.callback}&response_type=code&scope=get_user_info&state=${this.uuid}`;
        },
        weibo_url: function() {
            return `${OAuth.weibo.authorize_uri}?client_id=${OAuth.weibo.client_id}&response_type=code&redirect_uri=${OAuth.weibo.callback}`;
        },
    },
    methods: {
        bind: function(type) {
            location.href = this[type + "_url"];
        },
        unbind: function(type) {
            unbindOAuth({
                uid: this.uid,
                type: type,
            })
                .then((res) => {
                    this[type] = null;
                    this.$message({
                        message: "解绑成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    if (err.response.data.code) {
                        this.$alert(
                            `[${err.response.data.code}] ${err.response.data.msg}`,
                            "消息",
                            {
                                confirmButtonText: "确定",
                            }
                        );
                    } else {
                        this.$message.error("网络请求异常");
                    }
                });
        },
    },
    mounted: function() {
        this.uid = User.getInfo().uid;
        checkOAuth({
            uid: this.uid,
        })
            .then((res) => {
                this.github = res.data.data.github || "";
                this.qq = res.data.data.qq || "";
                this.weibo = res.data.data.weibo || "";
            })
            .catch((err) => {
                this.failCallback(err, this);
            });
    },
};
</script>

<style lang="less">
@import "../assets/css/dashboard/connect.less";
</style>
