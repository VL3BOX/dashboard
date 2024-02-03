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
                <el-button size="mini" @click="showVisible" v-if="isTeammate">{{ $t('处理') }}</el-button>
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
                        <a class="u-item u-assign" :href="authorLink(1)" target="_blank">
                            <img
                                class="u-assign-avatar"
                                :src="showAvatar('https://oss.jx3box.com/upload/avatar/2021/3/18/6568744.png')"
                            />
                            <span class="u-assign-name">JX3BOX</span>
                        </a>
                    </div>
                </div>
                <div class="u-subblock">
                    <span class="u-label">关联仓库：</span>
                    <div class="u-list u-list-repo">
                        <a
                            class="u-repo u-item"
                            :href="formateGithub(data.repository)"
                            v-if="data.repository"
                            target="_blank"
                        >
                            <img class="u-repo-icon" src="../../assets/img/feedback/github.svg" alt="" />
                            <span class="u-repo-name">{{ data.repository }}</span>
                        </a>
                        <div class="u-null" v-else>-</div>
                    </div>
                </div>
            </div>
            <div class="m-block m-refer" v-if="data.refer">
                <div class="u-subblock">
                    <span class="u-label">来源：</span>
                    <a class="u-item u-user" :href="data.refer" target="_blank">
                        {{ data.refer }}
                    </a>
                </div>
            </div>
            <div class="m-content m-textarea">
                <el-divider content-position="left"><i class="el-icon-edit-outline"></i> 反馈内容</el-divider>
                <div class="u-detail">
                    <span v-html="sanitizedHTML(data.content)"></span>
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
            <div class="m-reply" v-if="done">
                <el-divider content-position="left"><i class="el-icon-chat-line-square"></i> 回复处理</el-divider>
                <Comment :id="id" category="feedback" order="desc" />
            </div>
        </main>

        <el-dialog :visible.sync="visible" :title="$t('处理')" width="750px">
            <el-form :model="formData" :rules="rules" label-position="top">
                <el-form-item :label="$t('关联处理人')">
                    <el-select
                        :placeholder="$t('请选择关联处理人')"
                        filterable
                        v-model="formData.assign"
                        multiple
                        style="width: 100%"
                    >
                        <el-option
                            v-for="item in teammates"
                            :key="item.id"
                            :label="item.teammate_info.display_name"
                            :value="item.user_id"
                        >
                            <div class="m-teammate">
                                <div class="m-user">
                                    <img class="u-avatar" :src="showAvatar(item.teammate_info.user_avatar)" />
                                    <span class="u-name">{{ item.teammate_info.display_name }}</span>
                                    <span class="u-user-id">(ID: {{ item.user_id }})</span>
                                </div>
                                <div class="m-duty">
                                    <span class="u-duty" v-if="item.duty">{{ formateDuty(item.duty) }} | </span>
                                    <span class="u-remark">{{ item.remark }}</span>
                                </div>
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('仓库')">
                    <el-input :placeholder="$t('请输入仓库')" v-model="formData.repository"></el-input>
                </el-form-item>
                <el-form-item :label="$t('状态')">
                    <el-radio-group v-model="formData.status">
                        <el-radio-button :label="0">{{ $t('待处理') }}</el-radio-button>
                        <el-radio-button :label="1">{{ $t('已指派') }}</el-radio-button>
                        <el-radio-button :label="2">{{ $t('已处理') }}</el-radio-button>
                        <el-radio-button :label="3">{{ $t('已结束') }}</el-radio-button>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="visible = false">{{ $t('取 消') }}</el-button>
                <el-button size="small" type="primary" @click="confirm">{{ $t('确 定') }}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DOMPurify from "dompurify";
import { getFeedback, updateFeedback } from "@/service/feedback";
import { getTeammates } from "@/service/index";
import { types, subtypes, statusMap, statusColors } from "@/assets/data/feedback.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import moment from "moment";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
export default {
    name: "FeedbackSingle",
    components: {
        Comment,
    },
    data() {
        return {
            data: "",

            loading: false,

            types,
            subtypes,
            statusMap,
            statusColors,

            done: false,
            visible: false,

            formData: {
                assign: [],
                repository: "",
                status: 0,
            },
            rules: {},
            teammates: [],
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        isTeammate() {
            return this.$store.state.isTeammate;
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
    mounted() {
        this.loadTeammates();
    },
    methods: {
        async getData() {
            try {
                this.loading = true;
                let res = await getFeedback(this.id);
                this.data = res.data.data;
                this.data.content = this.data.content.replace(/\n/g, "<br>");
                this.formData.repository = this.data?.repository || "";
                this.formData.assign = this.data?.assign?.filter((item) => item) || [];
                this.formData.status = this.data?.status || 0;
                this.done = true;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }
        },
        async loadTeammates() {
            try {
                let res = await getTeammates();
                this.teammates = res.data.data.filter(
                    (item) => item.group && ["mp", "developer", "designer"].includes(item.group)
                );
            } catch (e) {
                console.log(e);
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
        formateDuty(val) {
            return (
                (val &&
                    val.reduce((prev, curr) => {
                        return prev + " | " + curr;
                    })) ||
                ""
            );
        },

        confirm() {
            updateFeedback(this.id, {
                assign: this.formData.assign.map((item) => item),
                repository: this.formData.repository,
                status: this.formData.status,
            })
                .then((res) => {
                    this.$message.success("处理成功");
                    this.visible = false;
                    this.getData();
                })
                .catch((e) => {
                    this.$message.error(e.message);
                });
        },
        showVisible() {
            this.formData.repository = this.data.repository;
            this.formData.assign = this.data?.assign?.filter((item) => item) || [];
            this.visible = true;
        },
        sanitizedHTML(html) {
            return DOMPurify.sanitize(html);
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/feedback_single.less";
</style>
