<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-fav">
        <div class="m-dashboard-work-header">
            <h2 class="u-title"><i class="el-icon-star-off"></i> {{ $t('收藏订阅') }}</h2>
            <el-select v-model="searchType" :placeholder="$t('类型过滤')" class="u-filter" size="small" @change="handleChange">
                <el-option :label="$t('全部')" value=""> </el-option>
                <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-option-group>
            </el-select>
        </div>
        <el-input
            class="m-dashboard-work-search"
            :placeholder="$t('请输入搜索内容')"
            v-model="search"
            @keyup.enter.native="handleChange"
        >
            <template slot="prepend">{{ $t('关键词') }}</template>
            <el-button slot="append" icon="el-icon-search" @click="handleChange"></el-button>
        </el-input>

        <div class="m-dashboard-box" v-loading="loading">
            <ul class="m-dashboard-box-list" v-if="data.length">
                <li v-for="(item, i) in data" :key="i">
                    <i class="u-icon">
                        <img svg-inline src="../assets/img/works/repo.svg" />
                    </i>
                    <a class="u-title" target="_blank" :href="getLink(item.post_type, item.post_id)">{{
                        item.post_title || $t('无标题')
                    }}</a>
                    <div class="u-desc">
                        <span class="u-category"
                            ><i class="el-icon-folder"></i> {{ getTypeLabel(item.post_type) }}
                        </span>
                        <span><i class="el-icon-date"></i> 于 {{ dateFormat(item.created) }} {{ $t('加入收藏') }} </span>
                    </div>
                    <el-button-group class="u-action">
                        <el-button size="mini" icon="el-icon-delete" :title="$t('取消收藏')" @click="del(item.id)"></el-button>
                    </el-button-group>
                </li>
            </ul>
            <el-alert v-else class="m-dashboard-box-null" :title="$t('没有找到相关条目')" type="info" center show-icon>
            </el-alert>
            <el-pagination
                v-if="showPagination"
                class="m-dashboard-box-pages"
                background
                :hide-on-single-page="true"
                :page-size="per"
                :current-page.sync="page"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @current-change="currentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getMyFavs, delFav } from "../service/fav";
import { getLink, getTypeLabel } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { __postType, __wikiType, __appType, __gameType } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "fav",
    props: [],
    data: function () {
        return {
            loading: false,
            data: [],
            total: 1,
            page: 1,
            per: 10,
            showPagination: true,
            search: "",
            searchType: "",
            options: [
                {
                    label: this.$t("文章作品"),
                    options: Object.entries(__postType).map((item) => {
                        return { value: item[0], label: item[1] };
                    }),
                },
                {
                    label: this.$t("百科词条"),
                    options: Object.entries(__wikiType).map((item) => {
                        return { value: item[0], label: item[1] };
                    }),
                },
                {
                    label: this.$t("游戏资料"),
                    options: Object.entries(__gameType).map((item) => {
                        return { value: item[0], label: item[1] };
                    }),
                },
                {
                    label: this.$t("其它应用"),
                    options: Object.entries(__appType).map((item) => {
                        return { value: item[0], label: item[1] };
                    }),
                },
            ],
        };
    },
    computed: {
        subtype: function () {
            return this.$route.params.subtype || "";
        },
    },
    methods: {
        loadData() {
            this.loading = true;
            this.showPagination = false;
            this.$router.push({
                name: "fav",
                query: {
                    page: this.page,
                },
            });
            const params = {
                pageIndex: this.page,
                pageSize: this.per,
            };
            if (this.search) params.post_title = this.search;
            if (this.searchType && this.searchType !== "all") params.post_type = this.searchType;
            getMyFavs(params)
                .then((res) => {
                    this.data = res.list || [];
                    this.total = res.page.total || 0;
                })
                .finally(() => {
                    this.loading = false;
                    this.showPagination = true;
                });
        },
        del: function (id) {
            this.$alert(this.$t("确定要取消收藏吗？"), this.$t("确认信息"), {
                confirmButtonText: this.$t("确定"),
                callback: (action) => {
                    delFav(id).then(() => {
                        this.$message({
                            type: "success",
                            message: this.$t("取消收藏成功"),
                        });
                        location.reload();
                    });
                },
            });
        },
        getLink,
        getTypeLabel(type) {
            type = type.replace(/dbm_/g, "");
            return getTypeLabel(type);
        },
        dateFormat: function (val) {
            val = val * 1000;
            return dateFormat(new Date(val));
        },
        handleChange() {
            this.page = 1;
            this.loadData();
        },
        currentChange: function (val) {
            this.page = val;
            this.loadData();
        },
    },
    watch: {
        searchType(val) {
            if (!val) val = "all";
            this.$router.push({ name: "fav", params: { subtype: val } });
        },
    },
    mounted: function () {
        this.page = Number(this.$route.query.page || 1);
        this.subtype && (this.searchType = this.subtype);
        this.loadData();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/fav.less";
</style>
