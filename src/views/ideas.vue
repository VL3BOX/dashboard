<template>
    <div class="m-dashboard m-dashboard-work">
        <!-- <el-input
            class="m-dashboard-work-search"
            placeholder="请输入内容"
            v-model="search"
            @change="searchPost"
        >
            <el-select
                class="u-select"
                v-model="searchType"
                slot="prepend"
                placeholder="请选择"
                @change="searchPost"
            >
                <el-option
                    :label="item"
                    :value="key"
                    v-for="(item, key) in types"
                    :key="key"
                ></el-option>
            </el-select>
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchPost"
            ></el-button>
        </el-input> -->

        <div class="m-dashboard-box">
            <ul class="m-dashboard-box-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="i">
                    <i class="u-icon">
                        <img
                            v-if="item.status > 0"
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
                        :href="postLink(item.id)"
                        >[{{item.type | typeFormat}}] {{ item.title || "无标题" }}</a
                    >
                    <time class="u-time"
                        >提交于: {{ item.createTime | dateFormat }}</time
                    >
                    <el-button-group class="u-action">
                        <el-button
                            v-if="item.status < 1"
                            type="primary"
                            size="mini"
                            icon="el-icon-edit"
                            title="编辑"
                            @click="edit(searchType, item.id)"
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
                @current-change="changePage"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getQuestions } from "../service/exam";
import dateFormat from "../utils/dateFormat";
import {types} from '../assets/data/exam.json'
export default {
    name: "ideas",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            per : 15,
            search: "",
            searchType: "question",
            types: {
                question : '题目',
                paper : '试卷'
            },
        };
    },
    computed: {},
    methods: {
        loadPosts : function (i=1){
            getQuestions({
                pageIndex : i,
                // title: this.search,
                // type: this.searchType,
                // per : this.per
            },this).then((res) => {
                this.data = res.data.data;
                this.total = res.data.page.total;
            });
        },
        changePage: function(i = 1) {
            this.loadPosts(i)
        },
        searchPost: function() {
            this.loadPosts()
        },
        edit: function(type, id) {
            location.href = './publish/#/exam/' + type + "/" + id;
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
        postLink: function(id) {
            return '/exam/#/question/'+ id;
        },
        paperLink : function (id){
            return '/exam/#/paper/' + id
        }
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val*1000));
        },
        typeFormat : function (type){
            return types[type]
        }
    },
    mounted: function() {
        this.loadPosts()
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/work.less";
</style>
