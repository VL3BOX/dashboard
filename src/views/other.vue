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
        <div class="m-dashboard-box">
            <question
                class="m-dashboard-box-list"
                :data="data"
                v-if="data.length"
            />
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
import { getQuestions } from "../service/exam";
import question from "@/components/other/question.vue";
const fn = {
    question : getQuestions
}
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
            searchType: "question",
            types: {
                question: "题目",
                // TODO:
                // paper: "试卷",
                // item_schema: "配装方案",
            },
        };
    },
    computed: {
        params : function (){
            if(this.searchType == 'question'){
                return {
                    pageIndex: this.page,
                    title: this.search,
                    pageSize: this.per,
                }
            }
            return ''
        }
    },
    watch : {
        params : {
            deep : true,
            handler : function (val){
                this.loadPosts()
            }
        }
    },
    methods: {
        loadPosts: function() {
            fn[this.searchType](this.params).then((res) => {
                this.data = res.data.data;
                this.total = res.data.page.total;
            });
        },
    },
    created: function() {
        this.loadPosts();
    },
    components: {
        question,
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
