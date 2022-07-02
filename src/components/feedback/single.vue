<template>
    <div class="m-feed-single" v-if="data">
        <el-button icon="el-icon-arrow-left" size="small" @click="back">返回列表</el-button>
        <main class="m-single-content" v-loading="loading">
            <div class="m-single-item">
                <el-tag effect="dark" size="small" :color="statusColors[data.status]">{{ statuses[data.status] }}</el-tag>
                <div class="">
                    <span class="u-label">分类：</span>
                    <span class="u-value">{{ types[data.type] }}</span>
                </div>
                <div class="">
                    <span class="u-label">类型：</span>
                    <span class="u-value">{{ subtypes[data.subtype] }}</span>
                </div>
            </div>
            <div class="m-single-item">
                <div class="u-user">
                    <span class="u-label">提交人</span>
                    <a class="u-item-pic" :href="authorLink(data.user.id)" target="_blank">
                        <img
                            class="u-item-avatar"
                            :src="showAvatar(data.user.avatar)"
                        />
                    </a>
                    <a
                        class="u-item-name"
                        :href="authorLink(data.user.id)"
                        target="_blank"
                    >{{ data.user.display_name }}</a>
                </div>
                <div class="u-time">
                    <span class="u-label">时间：</span>
                    <span class="u-label">{{ formateTime(data.created_at) }}</span>
                </div>
            </div>
            <div class="m-single-item">
                <div class="u-user" v-if="data.assign_user">
                    <span class="u-label">分配至</span>
                    <a class="u-item-pic" :href="authorLink(data.assign_user.id)" target="_blank">
                        <img
                            class="u-item-avatar"
                            :src="showAvatar(data.assign_user.avatar)"
                        />
                    </a>
                    <a
                        class="u-item-name"
                        :href="authorLink(data.assign_user.id)"
                        target="_blank"
                    >{{ data.assign_user.display_name }}</a>
                </div>
                <div class="u-time">
                    <span class="u-label">仓库：</span>
                    <a class="u-label" :href="formateGithub(data.repository)">{{ data.repository }}</a>
                </div>
            </div>
            <div class="m-single-item">
                <span class="u-label">内容：</span>
                <span class="u-value">{{ data.content }}</span>
            </div>
            <div class="m-single-item" v-if="data.images && data.images.length">
                <span class="u-label">反馈截图：</span>
                <el-image
                    style="width: 100px; height: 100px"
                    :src="data.images[0]"
                    lazy
                    :preview-src-list="data.images">
                </el-image>
            </div>
        </main>
    </div>
</template>

<script>
import { getFeedback } from "@/service/feedback";
import { types, subtypes, statuses, statusColors } from "@/assets/data/feedback.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import dayjs from "dayjs";
export default {
    name: "FeedbackSingle",
    data() {
        return {
            data: '',

            loading: false,

            types,
            subtypes,
            statuses,
            statusColors
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
        }
    },
};
</script>

<style lang="less" scoped>
.m-feed-single {
    .m-single-content {
        margin-top: 10px;

        .m-single-item {
            display: flex;
            gap: 20px;
            .u-label {
                color: #999;
            }

            .u-user, .u-time {
                display: flex;
                align-items: center;
                .u-item-pic {
                    .dbi;
                    .x;
                    .pr;
                    .auto(x);
                    .size(68px);
                    transition: 0.2s ease-in-out;
                    &:hover{
                        filter: saturate(120%) brightness(110%);
                    }
                }
                .u-item-avatar {
                    .r(100%);
                }
            }

        }

    }
}
</style>
