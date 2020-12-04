<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-fav">
        <h2 class="u-title">我的收藏</h2>
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入搜索内容"
            v-model="search"
            @change="searchPost"
        >
            <template slot="prepend">关键词</template>
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
                        发布于: {{ item.post_created * 1000 | dateFormat }} |
                        最后更新: {{ item.post_updated * 1000 | dateFormat }}
                    </div>
                    <el-button-group class="u-action">
                        <el-button
                            size="mini"
                            icon="el-icon-delete"
                            title="删除"
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
                @current-change="page_change"
                :current-page="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getMyFavs, delFav } from "../service/fav";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";

export default {
    name: "fav",
    props: [],
    data: function() {
        return {
            type: "all",
            data: [],
            total: 1,
            page: 1,
            search: "",
        };
    },
    computed: {},
    methods: {
        page_change(i = 1) {
            getMyFavs({
                keyword: this.search,
                page: i,
            }).then((res) => {
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
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    mounted: function() {
        this.page_change();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/work.less";
</style>
