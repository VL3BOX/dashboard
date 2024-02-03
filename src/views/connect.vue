<template>
    <uc class="m-dashboard-connect">
        <div class="m-profile-connect">
            <el-alert
                class="u-tip"
                :title="$t('如需解绑则需要先绑定一个邮箱')"
                type="warning"
                show-icon
            >
            </el-alert>
            <div class="m-dashboard-connect-list">
                <el-card
                    class="box-card"
                    v-for="(item, type) in oauth"
                    :key="type"
                >
                    <img :class="'u-' + type" svg-inline :src="type | icon" />
                    <p class="u-status">
                        {{ checkStatus(type) ? getNickname(type) : $t('未绑定') }}
                    </p>
                    <el-button
                        class="u-button"
                        :type="!checkStatus(type) ? 'primary' : 'danger'"
                        @click="!checkStatus(type) ? bind(type) : unbind(type)"
                        >{{
                            !checkStatus(type) ? $t('绑定') : $t('解除绑定')
                        }}</el-button
                    >
                </el-card>
            </div>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import links from "@jx3box/jx3box-common/js/connect";
import oauth from "@jx3box/jx3box-common/data/oauth.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { unbindOAuth, checkOAuth } from "../service/profile";
const client = location.host.includes("origin") ? "origin" : "std";
export default {
    name: "connect",
    props: [],
    data: function() {
        return {
            data: {
                github_name: "",
                github_id: "",

                weibo_name: "",
                weibo_id: "",

                qq_name: "",
                qq_unionid: "",

                wechat_name: "",
                wechat_unionid: "",
            },
            oauth,
        };
    },
    computed: {},
    methods: {
        checkStatus: function(type) {
            if(type == 'qq' || type == 'wechat'){
                return !!this.data[type + "_unionid"];
            }
            return !!this.data[type + "_id"];
        },
        getNickname : function (type){
            return this.data[type + '_name'] || '未知'
        },
        bind: function(type) {
            location.href = links[type].replace('state=login',`state=bind_${client}`)
        },
        unbind: function(type) {
            unbindOAuth(type).then((res) => {
                this.$message({
                    message: "解绑成功",
                    type: "success",
                });
                location.reload();
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
            this.data = res.data.data;
        });
    },
    components: {
        uc,
    },
};
</script>

<style lang="less">
@import "../assets/css/profile/connect.less";
</style>
