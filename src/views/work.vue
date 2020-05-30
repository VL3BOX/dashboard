<template>
    <div class="m-dashboard m-dashboard-work">
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入内容"
            v-model="search"
            @change="searchPost"
        >
            <template slot="prepend">我的作品</template>
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchPost"
            ></el-button>
        </el-input>

        <div class="m-dashboard-box">
            <ul class="m-dashboard-box-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="i">
                    <i class="u-icon">
                        <img
                            v-if="item.post_status == 'publish'"
                            svg-inline
                            src="../assets/img/works/repo.svg"
                        />
                        <img
                            v-else
                            svg-inline
                            src="../assets/img/works/draft.svg"
                        />
                    </i>
                    <a
                        class="u-title"
                        target="_blank"
                        :href="postLink(item.post_type, item.ID)"
                        >{{ item.post_title || "无标题" }}</a
                    >
                    <time class="u-time"
                        >发布于: {{ item.post_date | dateFormat }} | 最后更新:
                        {{ item.post_modified | dateFormat }}</time
                    >
                    <el-button-group class="u-action">
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            title="编辑"
                            @click="edit(item.post_type, item.ID)"
                        ></el-button>
                        <el-button
                            v-if="item.post_status == 'publish'"
                            type="primary"
                            size="mini"
                            icon="el-icon-lock"
                            title="设为草稿"
                            @click="draft(item.ID, i)"
                        ></el-button>
                        <el-button
                            v-else
                            type="primary"
                            size="mini"
                            icon="el-icon-check"
                            title="设为公开"
                            @click="publish(item.ID, i)"
                        ></el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            icon="el-icon-delete"
                            title="删除"
                            @click="del(item.ID)"
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
                :hide-on-single-page="true"
                @current-change="changePage"
                :current-page="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getWorks, delPost, hidePost, publishPost } from "../service/work";
import { editLink } from "@jx3box/jx3box-common/js/utils";
import { __v2, __Root, __Links } from "@jx3box/jx3box-common/js/jx3box";
import dateFormat from "../utils/dateFormat";

export default {
    name: "work",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            search: "",
        };
    },
    computed: {},
    methods: {
        changePage: function(i = 1) {
            getWorks({
                page: i,
            }).then((res) => {
                this.data = res.data.data.list;
                this.total = res.data.data.total;
            });
        },
        searchPost: function() {
            getWorks({
                title: this.search,
            }).then((res) => {
                this.data = res.data.data.list;
                this.total = res.data.data.total;
            });
        },
        edit: function(type, id) {
            // TODO:临时区分新旧版
            const newlist = ["fb","jx3dat","house"];
            let editLink = "";
            if (newlist.includes(type)) {
                editLink = __Links.dashboard.publish + "#/" + type + "/" + id;
            } else {
                editLink = __Root + "/edit/?pid=" + id;
            }
            location.href = editLink;
            // location.href = editLink(type, id);
        },
        del: function(id) {
            this.$alert("确定要删除吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    delPost(id)
                        .then(() => {
                            this.$message({
                                type: "success",
                                message: `删除成功`,
                            });
                            location.reload();
                        })
                        .catch((err) => {
                            this.failCallback(err, this);
                        });
                },
            });
        },
        draft: function(id, i) {
            hidePost(id)
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: `操作成功`,
                    });
                    this.data[i].post_status = "draft";
                })
                .catch((err) => {
                    this.failCallback(err, this);
                });
        },
        publish: function(id, i) {
            publishPost(id)
                .then((res) => {
                    this.$message({
                        type: "success",
                        message: `操作成功`,
                    });
                    this.data[i].post_status = "publish";
                })
                .catch((err) => {
                    this.failCallback(err, this);
                });
        },
        postLink: function(type, id) {
            return __Root + type + "/" + id;
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
</style>
