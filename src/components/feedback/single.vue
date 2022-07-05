<template>
    <div class="m-feed-single" v-if="data">
        <main class="m-single-content" v-loading="loading">
            <div class="m-type">
                <span class="u-tag" :style="`border:1px solid ${statusColors[data.status]}`">{{ statusMap[data.status] }}</span>
                <div class="u-type">
                    <span class="u-label">BUG分类：</span>
                    <span class="u-value">{{ types[data.type] }}</span>
                    <span class="u-value">{{ subtypes[data.subtype] }}</span>
                </div>
            </div>
            <div class="m-user">
                <span class="u-label">提交者：</span>
                <a class="u-avatar" :href="authorLink(data.user.id)" target="_blank">
                    <img :src="showAvatar(data.user.avatar)" />
                </a>
                <a class="u-item-name" :href="authorLink(data.user.id)" target="_blank">{{ data.user.display_name }}</a>
                <span class="u-time">提交时间：{{ formateTime(data.created_at) }}</span>
            </div>
            <div class="m-dev">
                <span class="u-label">分配至</span>
                <div class="u-item">
                    <template v-if="data.assign_user">
                        <a class="u-avatar" :href="authorLink(data.assign_user.id)" target="_blank">
                            <img :src="showAvatar(data.assign_user.avatar)" />
                        </a>
                        <a class="u-item-name" :href="authorLink(data.assign_user.id)" target="_blank">{{ data.assign_user.display_name }}</a>
                    </template>

                </div>
                <div class="u-item">
                    <span class="u-label">仓库</span>
                    <img class="u-icon" src="../../assets/img/github.svg" alt="">
                    <a class="u-item-name" :href="formateGithub(data.repository)">{{ data.repository }}</a>
                </div>
            </div>
            <div class="m-textarea">
                <el-divider>反馈内容</el-divider>
                {{ data.content }}
            </div>
            <div class="m-textarea">
                <el-divider>反馈截图</el-divider>
                <el-image class="u-img" :src="data.images[0]" lazy :preview-src-list="data.images">
                </el-image>
            </div>
        </main>
    </div>
</template>

<script>
import { getFeedback } from "@/service/feedback";
import { types, subtypes, statusMap, statusColors } from "@/assets/data/feedback.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import moment from "moment";
export default {
    name: "FeedbackSingle",
    data() {
        return {
            data: "",

            loading: false,

            types,
            subtypes,
            statusMap,
            statusColors,
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                val && this.getData();
            },
        },
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                let res = await getFeedback(this.id);
                this.data = res.data.data;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }
        },
        back() {
            this.$router.go(-1);
        },
        authorLink,
        showAvatar,
        formateTime(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        },
        formateGithub(val) {
            return `https://github.com/JX3BOX/${val}`;
        },
    },
};
</script>
<style lang="less" >
    @import url("~@/assets/css/feedback_single.less");
</style>
