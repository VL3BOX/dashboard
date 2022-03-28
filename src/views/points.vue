<template>
	<div class="m-points" v-loading="loading">
		<h2><i class="el-icon-present"></i> 我的积分</h2>
		<div class="m-balance">
			<span class="u-label">余额 : </span>
			<b :class="money > 0 ? 'u-have' : ''" class="u-num">{{ money }}</b>
			<!-- <a class="el-button u-btn el-button--primary el-button--mini" href="/vip/points" target="_blank">充值</a> -->
			<el-button class="u-btn" type="primary" size="mini" :disabled="!money">兑换</el-button>
		</div>
		<el-tabs class="m-tabs" type="border-card">
			<!-- 积分记录 -->
			<el-tab-pane label="积分记录">
				<el-table class="m-table" :data="list" show-header cell-class-name="u-table-cell" header-cell-class-name="u-header-cell">
					<el-table-column label="类型">
						<template slot-scope="scope">{{ formatType(scope.row.action_type) }}</template>
					</el-table-column>
					<el-table-column label="数量">
						<div class="u-count" :class="{ isNegative: Number(scope.row.count) < 0 }" slot-scope="scope">
							<span>{{ Number(scope.row.count) > 0 ? "+" : "" }}</span> <b>{{ scope.row.count }}</b>
						</div>
					</el-table-column>
					<el-table-column prop="count" label="源于作品">
						<a class="u-link" :href="getPostLink(scope.row)" target="_blank" v-if="getPostLink(scope.row)" slot-scope="scope"><i class="el-icon-link"></i> 点击查看 </a>
						<span v-else> - </span>
					</el-table-column>
					<el-table-column label="备注">
						<template slot-scope="scope">{{ formatRemark(scope.row.remark) }}</template>
					</el-table-column>
					<el-table-column label="时间">
						<template slot-scope="scope">
							<span>{{ showTime(scope.row.created_at) }}</span>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination class="m-packet-pages" background :page-size="per" :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
			</el-tab-pane>
			<!-- <el-tab-pane label="兑换记录"></el-tab-pane> -->
		</el-tabs>
	</div>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { getPointsHistory } from "@/service/points.js";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import types from "@/assets/data/points_types.json";
export default {
	name: "points",
	components: {},
	data: function () {
		return {
			money: 0,
			loading: false,
			list: [],

			page: 1,
			per: 10,
			total: 0,
			types,
		};
	},
	computed: {
		params: function () {
			let _params = {
				pageIndex: this.page,
				pageSize: this.per,
			};
			return _params;
		},
	},
	watch: {},
	methods: {
		loadAsset: function () {
			User.getAsset().then((data) => {
				this.money = data?.points || 0;
			});
		},
		loadData() {
			this.loading = true;
			getPointsHistory(this.params)
				.then((res) => {
					this.list = res.list;
					this.total = res.page.total;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		getPostLink(item) {
			return getLink(item.post_type, item.article_id);
		},
		formatType: function (val) {
			return (val && this.types[val]) || "未知";
		},
		formatRemark: function (str) {
			if (str) {
				if (str.length > 12) {
					return str.slice(12) + "...";
				} else {
					return str;
				}
			} else {
				return "-";
			}
		},
		showTime,
	},
	watch: {
		params: {
			immediate: true,
			deep: true,
			handler: function () {
				this.loadData();
			},
		},
	},
	created: function () {
		this.loadAsset();
	},
};
</script>
<style lang="less">
@import "~@/assets/css/packet.less";
@import "~@/assets/css/points.less";
</style>
