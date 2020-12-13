<template>
    <div class="m-dashboard m-dashboard-work">
        <el-tabs v-model="searchType">
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
        <div class="m-dashboard-box" v-loading="loading">
            <template v-if="data && data.length">
                <item_plan
                    class="m-dashboard-box-list"
                    :data="data"
                    v-if="searchType === 'item_plan'"
                    @refresh="loadPosts(searchType)"
                />
                <question
                    class="m-dashboard-box-list"
                    :data="data"
                    v-if="searchType === 'question'"
                />
                <paper
                    class="m-dashboard-box-list"
                    :data="data"
                    v-if="searchType === 'paper'"
                />
            </template>
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
import { getQuestions,getPapers } from "../service/exam";
import { get_my_item_plans } from "../service/item_plan";
import question from "@/components/other/question.vue";
import paper from "@/components/other/paper.vue";
import item_plan from "@/components/other/item_plan.vue";

const fn = {
    question: getQuestions,
    item_plan: get_my_item_plans,
    paper : getPapers
};
export default {
    name: "ideas",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            per: 10,
            search: "",
            searchType: "item_plan",
            types: {
                item_plan: "我的清单",
                question: "我的题目",
                paper: "我的试卷",
            },
            loading : false
        };
    },
    computed: {
        params: function() {
            if (this.searchType == "question" || this.searchType == "paper") {
                return {
                    pageIndex: this.page,
                    title: this.search,
                    pageSize: this.per,
                };
            } else if (this.searchType == "item_plan") {
                return {
                    page: this.page,
                    keyword: this.search,
                    limit: this.per,
                };
            }
            return "";
        },
    },
    watch: {
        searchType : function (){
            this.page = 1  
        },
        params: {
            deep: true,
            handler: function(val) {
                this.loadPosts(this.searchType);
            },
        },
    },
    methods: {
        loadPosts: function(searchType) {
            this.loading = true
            fn[searchType](this.params).then((res) => {
                if (searchType == "item_plan") {
                    res = res.data;
                    if (res.code === 200) {
                        this.data = res.data.data;
                        this.total = res.data.total;
                    }
                } else {
                    this.data = res.data.data;
                    this.total = res.data.page.total;
                }
            }).finally(() => {
                this.loading = false
            })
        },
    },
    created: function() {
        this.loadPosts(this.searchType);
    },
    components: {
        question,
        item_plan,
        paper
    },
};
</script>

<style lang="less">
.m-dashboard-work-search {
    .mb(10px);
}

.m-dashboard-box-pages {
    .mt(10px);
}
</style>
