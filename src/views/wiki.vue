<template>
    <el-tabs v-model="active_name">
        <el-tab-pane label="百科攻略" name="wiki_post" class="m-dashboard m-dashboard-work m-dashboard-wiki">
            <el-input
                class="m-dashboard-work-search u-source-search"
                placeholder="请输入内容"
                v-model="achievement_post.keyword"
                @change="search_post"
            >
                <template slot="prepend">百科攻略</template>
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="search_post"
                ></el-button>
            </el-input>

            <div class="m-dashboard-box">
                <ul
                    class="m-dashboard-box-list"
                    v-if="achievement_post.data && achievement_post.data.length"
                >
                    <li v-for="(post, key) in achievement_post.data" :key="key">
                        <span class="u-tab" v-text="tab_name(post.type)"></span>
                        <a class="u-title" target="_blank" :href="post.link">{{ post.title || "无标题" }}</a>
                        <span v-if="post.checked == 0" class="u-mark pending">⌛ 等待审核</span>
                        <span v-if="post.checked == 1" class="u-mark">✔ 审核通过</span>
                        <span v-if="post.checked == 2" class="u-mark reject">❌ 审核驳回</span>
                        <div class="u-desc">
                            <span
                                v-if="post.checked == 2 && post.check_remark"
                                class="u-check_remark"
                                v-html="`驳回理由：${post.check_remark}`"
                            ></span>
                            <time class="u-desc-subitem"><i class="el-icon-finished"></i> 发布 : {{ new Date(post.created * 1000) | dateFormat }}</time>
                            <time class="u-desc-subitem"><i class="el-icon-refresh"></i> 更新 : {{ new Date(post.updated * 1000) | dateFormat }}</time>
                        </div>

                        <el-button-group class="u-action">
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-edit"
                                :disabled="post.checked != 0"
                                title="编辑"
                                @click="post_edit('achievement', post)"
                            ></el-button>
                            <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-delete"
                                title="删除"
                                @click="post_del(post)"
                            ></el-button>
                        </el-button-group>
                    </li>
                </ul>
                <el-alert
                    v-else
                    class="m-dashboard-box-null"
                    title="没有找到相关条目"
                    type="info"
                    center
                    show-icon
                >
                </el-alert>
                <el-pagination
                    class="m-dashboard-box-pages"
                    background
                    :total="achievement_post.total"
                    hide-on-single-page
                    layout="total, prev, pager, next, jumper"
                    :current-page="post_page"
                    :page-size="length"
                    @current-change="post_page_change"
                >
                </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="百科评论" name="wiki_comment" class="m-dashboard m-dashboard-work m-dashboard-wiki">
            <el-input
                    class="m-dashboard-work-search u-source-search"
                    placeholder="请输入内容"
                    v-model="achievement_comment.keyword"
                    @change="search_comment"
            >
                <template slot="prepend">百科评论</template>
                <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="search_comment"
                ></el-button>
            </el-input>

            <div class="m-dashboard-box">
                <ul
                        class="m-dashboard-box-list"
                        v-if="achievement_comment.data && achievement_comment.data.length"
                >
                    <li v-for="(comment, key) in achievement_comment.data" :key="key">
                        <span class="u-tab" v-text="tab_name(comment.type)"></span>
                        <a class="u-title" target="_blank" :href="comment.link">{{ comment.title || "无标题" }}</a>
                        <span v-if="comment.checked == 0" class="u-mark pending">⌛ 等待审核</span>
                        <span v-if="comment.checked == 1" class="u-mark">✔ 审核通过</span>
                        <span v-if="comment.checked == 2" class="u-mark reject">❌ 审核驳回</span>
                        <div class="u-desc">
                            <span class="u-content"><i class='el-icon-s-comment'></i> {{ comment.content }}</span>
                            <time class="u-desc-subitem"><i class="el-icon-finished"></i> 发布 : {{ new Date(comment.created * 1000) | dateFormat }}</time>
                            <time class="u-desc-subitem"><i class="el-icon-refresh"></i> 更新 : {{ new Date(comment.updated * 1000) | dateFormat }}</time>
                        </div>

                        <el-button-group class="u-action">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    icon="el-icon-delete"
                                    title="删除"
                                    @click="comment_del(comment)"
                            ></el-button>
                        </el-button-group>
                    </li>
                </ul>
                <el-alert
                        v-else
                        class="m-dashboard-box-null"
                        title="没有找到相关条目"
                        type="info"
                        center
                        show-icon
                >
                </el-alert>
                <el-pagination
                        class="m-dashboard-box-pages"
                        background
                        :total="achievement_comment.total"
                        hide-on-single-page
                        layout="total, prev, pager, next, jumper"
                        :current-page="comment_page"
                        :page-size="length"
                        @current-change="comment_page_change"
                >
                </el-pagination>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import { JX3BOX } from "@jx3box/jx3box-common";
import { get_posts, remove_post, get_comments, remove_comment } from "../service/wiki";
import dateFormat from "../utils/dateFormat";

export default {
    name: "wiki",
    props: [],
    data: function() {
        return {
            active_name: this.$route.query.type ? this.$route.query.type : 'wiki_post',
            achievement_post: {
                data: null,
                total: 0,
                keyword: null,
            },
            achievement_comment: {
                data: null,
                total: 0,
                keyword: null,
            },
            post_page: 1,
            comment_page: 1,
            length: 10,
        };
    },
    computed: {},
    methods: {
        post_page_change(i = 1) {
            this.post_page = i;
            get_posts(this.achievement_post.keyword, i, this.length).then(
                (data) => {
                    data = data.data;
                    this.achievement_post.data =
                        data.code === 200 ? data.data.data : false;
                    this.achievement_post.total =
                        data.code === 200 ? data.data.total : 0;
                },
                () => {
                    this.achievement_post.data = false;
                }
            );
        },
        search_post() {
            this.post_page_change(1);
        },
        comment_page_change(i = 1) {
            this.comment_page = i;
            get_comments(this.achievement_comment.keyword, i, this.length).then(
                (data) => {
                    data = data.data;
                    this.achievement_comment.data =
                        data.code === 200 ? data.data.data : false;
                    this.achievement_comment.total =
                        data.code === 200 ? data.data.total : 0;
                },
                () => {
                    this.achievement_comment.data = false;
                }
            );
        },
        search_comment() {
            this.comment_page_change(1);
        },
        post_edit(type, post) {
            switch (type) {
                case "achievement":
                    this.$message("即将开放");
                    break;
            }
        },
        post_del(post) {
            this.$alert("确定要删除吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    remove_post(post.id).then(
                        (data) => {
                            data = data.data;
                            if (data.code === 200) {
                                this.$notify({title: "删除成功", type: "success"});
                                this.post_page_change(this.post_page);
                            } else {
                                this.$notify({title: "删除失败", type: "error"});
                            }
                        },
                        () => {
                            this.$notify({ title: "删除失败", type: "error" });
                        }
                    );
                },
            });
        },
        comment_del(comment){
            this.$alert("确定要删除吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    remove_comment(comment.id).then(
                        (data) => {
                            data = data.data;
                            if (data.code === 200) {
                                this.$notify({title: "删除成功", type: "success"});
                                this.comment_page_change(this.post_page);
                            } else {
                                this.$notify({title: "删除失败", type: "error"});
                            }
                        },
                        () => {
                            this.$notify({ title: "删除失败", type: "error" });
                        }
                    );
                },
            });
        },
        tab_name(type){
            switch (type) {
                case 'achievement':
                    return '成就';
                case 'item':
                    return '物品';
            }
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    watch: {
        $route:{
            immediate: true,
            handler() {
                if (this.$route.query.type && this.$route.query.keyword){
                    switch (this.$route.query.type) {
                        case 'wiki_post':
                            this.achievement_post.keyword = this.$route.query.keyword;
                            break;
                        case 'wiki_comment':
                            this.achievement_comment.keyword = this.$route.query.keyword;
                            break;
                    }

                    // 置空输入框ID
                    this.$nextTick(() => {
                        let input_doms = document.querySelectorAll('.u-source-search input');
                        for(let i = 0; i < input_doms.length; i++) input_doms[i].value = '';
                    });
                } else {
                    this.achievement_post.keyword = '';
                    this.achievement_comment.keyword = '';
                }

                // 列表获取
                this.post_page_change();
                this.comment_page_change();
            }
        }
    }
};
</script>

<style scoped lang="less">
@import "../assets/css/work.less";

.m-dashboard-wiki {
    .u-mark {
        .ml(5px);
        padding: 1px 5px 2px 5px;
        border-radius: 2px;
        font-style: normal;
        font-size: 12px;
        color: #ffffff;
        background-color: #6f42c1;

        &.pending {
            background-color: #3a97eb;
        }

        &.reject {
            background-color: #f0787a;
        }
    }

    .u-tab {
        float: left;
        width: 1em;
        margin-top: 4px;
        margin-right: 5px;
        padding: 4px 5px;
        font-size: 12px;
        background-color: #333333;
        color: #FFFFFF;
        border-radius: 3px;
    }

    .u-desc {
        margin-top: 2px;
    }

    .u-check_remark {
        color: #f0787a;
    }

    .u-content {
        color: #666666;
        margin: 10px 0 0;

        &:after{
            content:'|';
            display:inline-block;
            margin-left:8px;
            margin-right:8px;
        }
    }

    .u-check_remark, .u-content{
        &:after{
            content:'|';
            display:inline-block;
            margin-left:8px;
            margin-right:8px;
        }
    }
}
</style>
