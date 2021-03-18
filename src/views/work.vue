<template>
    <div class="m-dashboard-work m-dashboard-cms">
        <el-tabs v-model="searchType">
            <el-tab-pane label="全部作品" name="all"></el-tab-pane>
            <el-tab-pane
                :label="item"
                :name="key"
                v-for="(item, key) in types"
                :key="key"
            >
            </el-tab-pane>
        </el-tabs>
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入搜索内容"
            v-model="search"
        >
            <span slot="prepend">关键词</span>
            <el-button slot="append" icon="el-icon-search"></el-button>
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
                    <div class="u-desc">
                        <span class="u-desc-subitem"
                            ><i class="el-icon-folder"></i> 分类 :
                            {{ item.post_type | typeFormat }}</span
                        >
                        <time class="u-desc-subitem"
                            ><i class="el-icon-finished"></i> 发布 :
                            {{ item.post_date | dateFormat }}</time
                        >
                        <time class="u-desc-subitem"
                            ><i class="el-icon-refresh"></i> 更新 :
                            {{ item.post_modified | dateFormat }}</time
                        >
                    </div>

                    <el-button-group class="u-action">
                        <el-button
                            size="mini"
                            icon="el-icon-edit"
                            title="编辑"
                            @click="edit(item.post_type, item.ID)"
                        ></el-button>
                        <el-button
                            v-if="item.post_status == 'publish'"
                            size="mini"
                            icon="el-icon-lock"
                            title="设为私有"
                            @click="draft(item.ID, i)"
                        ></el-button>
                        <el-button
                            v-else
                            size="mini"
                            icon="el-icon-check"
                            title="设为公开"
                            @click="publish(item.ID, i)"
                        ></el-button>
                        <el-button
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
                :page-size="per"
                :hide-on-single-page="true"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getWorks, delPost, checkPost } from "../service/work";
import { editLink,getLink } from "@jx3box/jx3box-common/js/utils";
import {
    __v2,
    __Root,
    __Links,
    __postType,
} from "@jx3box/jx3box-common/data/jx3box.json";
import dateFormat from "../utils/dateFormat";
import dashboardLink from '@/utils/dashboardLink.js'
export default {
    name: "work",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            per: 10,
            search: "",
            searchType: "all",
            types: __postType,
        };
    },
    computed: {
        params: function() {
            return {
                per: this.per,
                title: this.search,
                type: this.searchType == "all" ? "" : this.searchType,
                page: this.page,
            };
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function(newval) {
                this.loadPosts();
            },
        },
    },
    methods: {
        loadPosts: function() {
            getWorks(this.params).then((res) => {
                this.data = res.data.data.list;
                this.total = res.data.data.total;
            });
        },
        edit: function(type, id) {
            location.href = './publish' + "#/" + type + "/" + id;
        },
        del: function(id) {
            this.$alert("确定要删除吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        delPost(id).then(() => {
                            this.$message({
                                type: "success",
                                message: `删除成功`,
                            });
                            location.reload();
                        });
                    }
                },
            });
        },
        draft: function(id, i) {
            checkPost(id, "draft").then((res) => {
                this.$message({
                    type: "success",
                    message: `操作成功`,
                });
                this.data[i].post_status = "draft";
            });
        },
        publish: function(id, i) {
            checkPost(id, "publish").then((res) => {
                this.$message({
                    type: "success",
                    message: `操作成功`,
                });
                this.data[i].post_status = "publish";
            });
        },
        postLink: function(type, id) {
            return getLink(type,id);
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        typeFormat: function(val) {
            return __postType[val];
        },
    },
    mounted: function() {
        let route_type = this.$route.params.type;
        if (route_type) {
            this.searchType = route_type;
        }
        this.loadPosts();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/work.less";
</style>
