<template>
    <div class="m-dashboard m-dashboard-connect">
        <el-alert
            class="u-tip"
            title="如需解绑则需要先绑定一个邮箱"
            type="info"
            show-icon
        >
        </el-alert>
        <div class="m-dashboard-connect-list">
            <el-card class="box-card" v-for="(item, type) in oauth" :key="type">
                <img :class="'u-' + type" svg-inline :src="type | icon" />
                <p class="u-status">
                    {{ checkStatus(type) ? data[type] : "未绑定" }}
                </p>
                <el-button
                    class="u-button"
                    :type="!checkStatus(type) ? 'primary' : 'danger'"
                    @click="!checkStatus(type) ? bind(type) : unbind(type)"
                    >{{ !checkStatus(type) ? "绑定" : "解除绑定" }}</el-button
                >
            </el-card>
        </div>
    </div>
</template>

<script>
import links from "@jx3box/jx3box-common/js/connect";
import oauth from "@jx3box/jx3box-common/js/oauth.json";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import { unbindOAuth, checkOAuth } from "../service/profile";

export default {
    name: "connect",
    props: [],
    data: function() {
        return {
            data: {
                github: "",
                github_id: "",
                qq: "",
                qq_id: "",
                weibo: "",
                weibo_id: "",
                wechat: "",
                wechat_id: "",
            },
            oauth,
        };
    },
    computed: {},
    methods: {
        checkStatus: function(type) {
            return !!this.data[type + '_id'];
        },
        bind: function(type) {
            location.href = links[type];
        },
        unbind: function(type) {
            unbindOAuth({
                uid: this.uid,
                type: type,
            }).then((res) => {
                if (!res.data.code) {
                    this.$message({
                        message: "解绑成功",
                        type: "success",
                    });
                    location.reload()
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: "error",
                    });
                }
            });
        },
    },
    filters: {
        icon: function(type) {
            return __imgPath + "image/connect/" + type + ".svg";
        },
    },
    mounted: function() {
        checkOAuth().then((res) => {
            this.data = res.data.data
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/dashboard/connect.less";
</style>
