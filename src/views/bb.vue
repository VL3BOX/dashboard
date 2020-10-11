<template>
    <div class="m-dashboard m-dashboard-work">
        <el-tabs v-model="searchType">
            <el-tab-pane label="全部" name=""></el-tab-pane>
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
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="loadPosts"
            ></el-button>
        </el-input>
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
                    <a class="u-title" target="_blank" :href="item | postLink"
                        >[{{ item.type | typeFormat }}]
                        {{ item.title || "无标题" }}</a
                    >
                    <div class="u-desc">
                        <span class="u-status u-desc-subitem">
                            <i class="el-icon-price-tag"></i> 状态 : 
                            <span
                                :class="{
                                    pending: item.status == 0,
                                    pass: item.status == 1,
                                    fail: item.status == 2,
                                }"
                                >{{ statusmap[item.status] }}</span
                            >
                        </span>
                        <time class="u-time u-desc-subitem"
                            >提交于 : {{ item.created_at }}</time
                        >
                    </div>
                    <!-- <el-button-group class="u-action">
                        <el-button v-if="item.status != 1"
                            size="mini"
                            icon="el-icon-edit"
                            title="编辑"
                            @click="edit(item.id)"
                        ></el-button>
                    </el-button-group> -->
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
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :current-page.sync="page"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { myWiki } from "../service/bb";
import dateFormat from "../utils/dateFormat";
import types from "@/assets/data/wiki.json";
const statusmap = {
    "0": "待审核",
    "1": "通过审核",
    "2": "未通过审核",
};
export default {
    name: "bb",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            per: 10,
            search: "",
            searchType: "",
            types,
            statusmap,
        };
    },
    computed: {
        params: function() {
            return {
                size: this.per,
                title: this.search,
                type: this.searchType,
                page: this.page,
            };
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function(val) {
                this.loadPosts();
            },
        },
    },
    methods: {
        loadPosts: function() {
            myWiki(this.params).then((res) => {
                this.data = res.data.data.data;
                this.total = res.data.data.total;
            });
        },
        edit: function(id) {
            location.href = "./publish/#/wiki/" + id;
        },
        postLink: function(id) {
            return;
        },
    },
    filters: {
        typeFormat: function(type) {
            return types[type] || "已合并分类";
        },
        postLink: function(item) {
            return item.wiki_id
                ? "/wiki/?pid=" + item.wiki_id
                : "/wiki/?hid=" + item.id;
        },
    },
    created: function() {
        this.loadPosts();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/work.less";
.m-dashboard-box-list .u-status {
    .pass {
        color: #49c10f;
    }
    .pending {
        color: #fba524;
    }
    .fail {
        color: #fc3c3c;
    }
}
</style>
