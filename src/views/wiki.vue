<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-wiki">
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入内容"
            v-model="achievement_post.keyword"
            @change="search_post"
        >
            <template slot="prepend">百科贡献</template>
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
                    <i class="u-icon">
                        <img svg-inline src="../assets/img/works/repo.svg" />
                    </i>
                    <a
                        class="u-title"
                        target="_blank"
                        :href="link('achievement', post)"
                    >
                        {{ post.title || "无标题" }}
                    </a>
                    <span v-if="post.checked == 0" class="u-mark pending"
                        >⌛ 等待审核</span
                    >
                    <span v-if="post.checked == 1" class="u-mark"
                        >✔ 审核通过</span
                    >
                    <span v-if="post.checked == 2" class="u-mark reject"
                        >❌ 审核驳回</span
                    >
                    <time class="u-desc">
                        <span
                            v-if="post.checked == 2 && post.check_remark"
                            class="u-check_remark"
                            v-html="
                                `驳回理由：${post.check_remark}&nbsp;&nbsp;|&nbsp;&nbsp;`
                            "
                        ></span>
                        发布于:
                        {{ new Date(post.created * 1000) | dateFormat }} |
                        最后更新:
                        {{ new Date(post.updated * 1000) | dateFormat }}
                    </time>

                    <el-button-group class="u-action">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            :disabled="post.checked != 0"
                            title="编辑"
                            @click="edit('achievement', post)"
                        ></el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-delete"
                            title="删除"
                            @click="del(post)"
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
                :current-page="page"
                :page-size="length"
                @current-change="changePage"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { get_posts, remove_post } from "../service/cj";
import dateFormat from "../utils/dateFormat";

export default {
    name: "wiki",
    props: [],
    data: function() {
        return {
            achievement_post: {
                data: null,
                total: 0,
                keyword: null,
            },
            page: 1,
            length: 10,
        };
    },
    computed: {},
    methods: {
        changePage(i = 1) {
            this.page = i;
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
            this.changePage(1);
        },
        edit(type, post) {
            switch (type) {
                case "achievement":
                    this.$message("即将开放");
                    break;
            }
        },
        del: function(post) {
            this.$alert("确定要删除吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    remove_post(post.id).then(
                        (data) => {
                            data = data.data;
                            if (data.code === 200) {
                                this.$notify({
                                    title: "删除成功",
                                    type: "success",
                                });
                                this.changePage(this.page);
                            } else {
                                this.$notify({
                                    title: "删除失败",
                                    type: "error",
                                });
                            }
                        },
                        () => {
                            this.$notify({ title: "删除失败", type: "error" });
                        }
                    );
                },
            });
        },
        link: function(type, post) {
            switch (type) {
                case "achievement":
                    return post.link;
            }
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    mounted: function() {
        this.changePage();
    },
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

    .u-check_remark {
        color: #f0787a;
    }
}
</style>
