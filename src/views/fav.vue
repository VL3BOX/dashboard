<template>
	<div class="m-dashboard m-dashboard-work m-dashboard-fav">
		<div class="m-dashboard-work-header">
			<h2 class="u-title"><i class="el-icon-star-off"></i> 我的收藏</h2>
			<el-select v-model="searchType" placeholder="类型过滤" class="u-filter" size="small">
				<el-option label="全部" value=""> </el-option>
				<el-option-group v-for="group in options" :key="group.label" :label="group.label">
					<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
				</el-option-group>
			</el-select>
		</div>
		<el-input class="m-dashboard-work-search" placeholder="请输入搜索内容" v-model="search" @keyup.enter.native="loadData">
			<template slot="prepend">关键词</template>
			<el-button slot="append" icon="el-icon-search" @click="loadData"></el-button>
		</el-input>

		<div class="m-dashboard-box">
			<ul class="m-dashboard-box-list" v-if="data.length">
				<li v-for="(item, i) in data" :key="i">
					<i class="u-icon">
						<img svg-inline src="../assets/img/works/repo.svg" />
					</i>
					<a class="u-title" target="_blank" :href="getLink(item.post_type, item.post_id)">{{ item.post_title || "无标题" }}</a>
					<div class="u-desc">
						<span v-text="getTypeLabel(item.post_type)"></span>
						<span v-if="item.created">
							| 发布于:
							{{ dateFormat(item.created) }}</span
						>
						<span v-if="item.updated">
							| 最后更新:
							{{ dateFormat(item.updated) }}</span
						>
					</div>
					<el-button-group class="u-action">
						<el-button size="mini" icon="el-icon-delete" title="取消收藏" @click="del(item.id)"></el-button>
					</el-button-group>
				</li>
			</ul>
			<el-alert v-else class="m-dashboard-box-null" title="没有找到相关条目" type="info" center show-icon> </el-alert>
			<el-pagination class="m-dashboard-box-pages" background :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total"> </el-pagination>
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
	data: function () {
		return {
            loading : false,
			data: [],
			total: 1,
			page: 1,
			per: 10,
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
					label: "其它应用",
					options: [
                        {
							value: "share",
							label: "捏脸",
						},
						{
							value: "pz",
							label: "配装",
						},
						{
							value: "joke",
							label: "骚话",
						},
						{
							value: "emotion",
							label: "表情",
						},
						{
							value: "collection",
							label: "小册",
						},
						{
							value: "item_plan",
							label: "清单",
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
		params: function () {
			let _params = {
				pageIndex: this.page,
				pageSize: this.per,
			};
			if (this.search) _params.keyword = this.search;
			return _params;
		},
		subtype: function () {
			return this.$route.params.subtype || "";
		},
	},
	methods: {
		loadData() {
            this.loading = true
			getMyFavs(this.params).then((res) => {
				if (res) {
					this.data = res.list;
					this.total = res.page.total;
				}
			}).finally(() => {
                this.loading = false
            })
		},
		searchPost() {
			this.page_change(1);
		},
		del: function (id) {
			this.$alert("确定要取消收藏吗？", "确认信息", {
				confirmButtonText: "确定",
				callback: (action) => {
					delFav(id).then(() => {
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
		dateFormat: function (val) {
			val = val * 1000;
			return dateFormat(new Date(val));
		},
	},
	watch: {
		params: {
			deep: true,
			handler: function () {
				this.loadData();
			},
		},
		search: function () {
			this.page = 1;
		},
		searchType: function () {
			this.page = 1;
		},
		subtype: function (val) {
			this.searchType = val;
		},
	},
	mounted: function () {
		if (this.subtype) {
			this.searchType = this.subtype;
		} else {
			this.loadData();
		}
	},
};
</script>

<style scoped lang="less">
@import "../assets/css/fav.less";
</style>
