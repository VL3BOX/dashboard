<template>
    <div class="m-feed-single" v-if="data">
        <main class="m-single-content" v-loading="loading">
            <div class="m-type">
                <span class="u-status" :style="{ backgroundColor: statusColors[data.status] }">{{
                    statusMap[data.status]
                }}</span>
                <div class="u-type">
                    <span class="u-value">{{ types[data.type] }}</span>
                    <span class="u-value">{{ subtypes[data.subtype] }}</span>
                </div>
            </div>
            <div class="m-block m-user">
                <div class="u-subblock">
                    <span class="u-label">提交人：</span>
                    <a class="u-item u-user" :href="authorLink(data.user.id)" target="_blank">
                        <img class="u-user-avatar" :src="showAvatar(data.user.avatar)" />
                        <span class="u-user-name">{{ data.user.display_name }}</span>
                    </a>
                </div>
                <span class="u-time u-subblock">提交时间：{{ formateTime(data.created_at) }}</span>
            </div>
            <div class="m-block m-dev">
                <div class="u-subblock">
                    <span class="u-label">分配至：</span>
                    <div class="u-list u-list-assign" v-if="data.assign_user && data.assign_user.length">
                        <a
                            class="u-item u-assign"
                            :href="authorLink(assign.id)"
                            target="_blank"
                            v-for="assign in data.assign_user"
                            :key="assign.id"
                        >
                            <img class="u-assign-avatar" :src="showAvatar(assign.avatar)" />
                            <span class="u-assign-name">{{ assign.display_name }}</span>
                        </a>
                    </div>
                    <div class="u-list u-list-assign" v-else>
                        <div class="u-null">-等待指派-</div>
                    </div>
                </div>
                <div class="u-subblock">
                    <span class="u-label">关联仓库：</span>
                    <div class="u-list u-list-repo">
                        <a class="u-repo u-item" :href="formateGithub(data.repository)" target="_blank">
                            <img class="u-repo-icon" src="../../assets/img/feedback/github.svg" alt="" />
                            <span class="u-repo-name">{{ data.repository }}</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="m-block m-refer" v-if="data.refer">
                <div class="u-subblock">
                    <span class="u-label">来源：</span>
                    <a class="u-item u-user" :href="data.refer" target="_blank">
                    {{data.refer}}
                    </a>
                </div>
            </div>
            <div class="m-content m-textarea">
                <el-divider content-position="left"><i class="el-icon-edit-outline"></i> 反馈内容</el-divider>
                <div class="u-detail">
                    {{ data.content }}
                </div>
            </div>
            <div class="m-attachment m-textarea">
                <el-divider content-position="left"><i class="el-icon-picture-outline-round"></i> 附件截图</el-divider>
                <div class="u-detail">
                    <div class="u-img" v-for="(img, index) in data.images" :key="index">
                        <el-image :src="img" lazy :preview-src-list="data.images"></el-image>
                    </div>
                </div>
            </div>
            <div class="m-reply">
                <el-divider content-position="left"><i class="el-icon-chat-line-square"></i> 回复处理</el-divider>
                <Comment :id="id" category="feedback" order="desc" />
            </div>
        </main>
    </div>
</template>

<script>
import { getFeedback } from "@/service/feedback";
import { types, subtypes, statusMap, statusColors } from "@/assets/data/feedback.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import dayjs from "dayjs";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
export default {
    name: "FeedbackSingle",
    components : {
        Comment
    },
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
            return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        },
        formateGithub(val) {
            return `https://github.com/JX3BOX/${val}`;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/feedback_single.less";
</style>
