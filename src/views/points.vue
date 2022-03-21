<template>
	<div class="m-points" v-loading="loading">
		<h2><i class="el-icon-present"></i> 我的积分</h2>
		<div class="m-balance">
			<span class="u-label">余额 : </span>
			<b :class="money > 0 ? 'u-have' : ''" class="u-num">{{ money }}</b>
			<!-- <a class="el-button u-btn el-button--primary el-button--mini" href="/vip/points" target="_blank">充值</a> -->
			<el-button class="u-btn" type="primary" size="mini" :disabled="!money">兑换</el-button>
		</div>
		<el-tabs type="border-card">
			<el-tab-pane label="积分记录"> </el-tab-pane>
			<!-- <el-tab-pane label="兑换记录"></el-tab-pane> -->
		</el-tabs>
	</div>
</template>
<script>
import { getPointsHistory } from "@/service/points.js";

export default {
	name: "points",
	components: {},
	data: function () {
		return {
			loading: false,

			page: 1,
			per: 10,
		};
	},
	computed: {
		money() {
			return 0;
		},
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
		loadData() {
			getPointsHistory(this.params)
				.then((res) => {
					this.data = res.data;
					console.log(res);
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	created: function () {
		this.loadData();
	},
};
</script>
<style lang="less">
@import "~@/assets/css/packet.less";
@import "~@/assets/css/points.less";
</style>
