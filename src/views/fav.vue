<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-fav">
        <div class="m-dashboard-work-header">
            <h2 class="u-title"><i class="el-icon-star-off"></i> 我的收藏</h2>
            <el-select v-model="searchType" placeholder="类型过滤" class="u-filter" size="small">
                <el-option
                    label="全部"
                    value=""
                >
                </el-option>
                <el-option-group
                    v-for="group in options"
                    :key="group.label"
                    :label="group.label"
                >
                    <el-option
                        v-for="item in group.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-option-group>
            </el-select>
        </div>
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入搜索内容"
            v-model="search"
        >
            <template slot="prepend">关键词</template>
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="loadData"
            ></el-button>
        </el-input>

        <div class="m-dashboard-box">
            <ul class="m-dashboard-box-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="i">
                    <i class="u-icon">
                        <img
                            v-if="item.post_publish"
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
                        :href="getLink(item.post_type, item.post_id)"
                        >{{ item.post_title || "无标题" }}</a
                    >
                    <div class="u-desc">
                        <span v-text="getTypeLabel(item.post_type)"></span>
                        <span v-if="item.post_created">
                            | 发布于:
                            {{ (item.post_created * 1000) | dateFormat }}</span
                        >
                        <span v-if="item.post_updated">
                            | 最后更新:
                            {{ (item.post_updated * 1000) | dateFormat }}</span
                        >
                    </div>
                    <el-button-group class="u-action">
                        <el-button
                            size="mini"
                            icon="el-icon-delete"
                            title="取消收藏"
                            @click="del(item.post_type, item.post_id)"
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
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getMyFavs, delFav } from "../service/fav";
import { getLink, getTypeLabel } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";

export default {
    name: "fav",
    props: [],
    data: function() {
        return {
            data: [],
            total: 1,
            page: 1,
            search: "",
            searchType: "",
            options: [
                {
                    label: "文章作品",
                    options: [
                        {
                            value: "macro",
                            label: "宏库",
                        },
                        {
                            value: "jx3dat",
                            label: "插件",
                        },
                        {
                            value: "fb",
                            label: "副本",
                        },
                        {
                            value: "bps",
                            label: "职业",
                        },
                        {
                            value: "tool",
                            label: "工具",
                        },
                        {
                            value: "bbs",
                            label: "茶馆",
                        },
                    ],
                },
                {
                    label: "百科词条",
                    options: [
                        {
                            value: "achievement",
                            label: "成就",
                        },
                        {
                            value: "item",
                            label: "物品",
                        },
                        {
                            value: "quest",
                            label: "任务",
                        },
                        {
                            value: "knowledge",
                            label: "通识",
                        },
                    ],
                },
                {
                    label: "其它",
                    options: [
                        {
                            value: "item_plan",
                            label: "清单",
                        },
                        {
                            value: "collection",
                            label: "小册",
                        },
                        {
                            value: "question",
                            label: "题目",
                        },
                        {
                            value: "paper",
                            label: "试卷",
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        params: function() {
            return {
                keyword: this.search,
                page: this.page,
                type: this.searchType,
            };
        },
        subtype : function (){
            return this.$route.params.subtype || ''
        }
    },
    methods: {
        loadData() {
            getMyFavs(this.params).then((res) => {
                res = res.data;
                this.data = res.code === 200 ? res.data.data : [];
                this.total = res.code === 200 ? res.data.total : 0;
            });
        },
        searchPost() {
            this.page_change(1);
        },
        del: function(type, id) {
            this.$alert("确定要取消收藏吗？", "确认信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    delFav(type, id).then(() => {
                        this.$message({
                            type: "success",
                            message: `取消收藏成功`,
                        });
                        location.reload();
                    });
                },
            });
        },
        getLink,
        getTypeLabel,
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function() {
                this.loadData();
            },
        },
        search : function (){
            this.page = 1
        },
        searchType : function (){
            this.page = 1
        },
        subtype : function (val){
            this.searchType = val
        }
    },
    mounted: function() {
        if(this.subtype){
            this.searchType = this.subtype
        }else{
            this.loadData();
        }
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/fav.less";
</style>
