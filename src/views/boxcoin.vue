<template>
	<div class="m-credit m-boxcoin">
		<h2 class="u-title"><i class="el-icon-coin"></i> 我的盒币</h2>
		<div class="m-credit-total m-packet-total">
			余额 :
			<b :class="{ hasLeft: hasLeft }">{{ money }}</b>
            <span class="u-types">
                <span class="u-type u-type-std">重制：<b>{{total_std}}</b></span>
                <span class="u-type u-type-origin">缘起：<b>{{total_origin}}</b></span>
            </span>
			<!-- <a class="el-button u-btn el-button--primary el-button--mini" href="/vip/boxcoin" target="_blank">充值</a> -->
			<el-button class="u-btn" type="primary" @click="togglePullBox" size="mini" :disabled="!money">兑换</el-button>
		</div>
		<div class="m-credit-pull" v-if="showPullBox">
			<el-alert class="m-boxcoin-ac" type="error" show-icon :closable="false" v-if="breadcrumb" size="mini">
				<slot name="title"><div v-html="breadcrumb"></div></slot>
			</el-alert>
			<el-alert class="m-boxcoin-tip" title="1盒币可兑换1通宝，不可折现" type="warning" show-icon> 所有兑换申请将在每月{{ start_date }}-{{ end_date }}号统一处理，每月{{ start_date }}-{{ end_date }}日将不能提交兑换申请，提交后1月内到账。默认通宝将通过直充进入游戏账号，如发放为金山一卡通方式，则会发送卡密邮件至绑定邮箱或通过站内卡密系统发放（请自行在 <a href="https://charge.xoyo.com/pay?item=jx3&way=kcard" target="_blank">一卡通充值页面</a>进行充值。） </el-alert>
			<el-form label-position="left" label-width="80px" class="m-boxcoin-form">
				<el-form-item label="游戏大区">
					<el-select v-model="pull.zone" placeholder="请选择所在大区">
						<el-option v-for="zone in zones" :key="zone" :label="zone" :value="zone"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="游戏账号">
					<el-input v-model="pull.account" placeholder="请务必填写正确的账号，通宝将直充入账号（不会计入充销）"></el-input>
				</el-form-item>
				<el-form-item label="兑换数目">
					<el-radio-group v-model="pull.cash">
						<!-- <el-radio :label="1500" border :disabled="!canSelect(1500)">1500通宝</el-radio> -->
						<el-radio :label="3000" border :disabled="!canSelect(3000)">3000通宝</el-radio>
						<el-radio :label="5000" border :disabled="!canSelect(5000)">5000通宝</el-radio>
						<el-radio :label="10000" border :disabled="!canSelect(10000)">10000通宝</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="邮箱地址">
					<el-input v-model="pull.email" placeholder="请务必填写正确的邮箱，如发放的是一卡通形式则会发送卡密邮件至此邮箱"></el-input>
				</el-form-item>
				<el-form-item label>
					<el-button type="primary" @click="openConfirmBox" :disabled="!ready || lockStatus">提交申请</el-button>
					<span class="u-tip" v-if="!isAllowDate"> <i class="el-icon-warning-outline"></i> 每月{{ start_date }}-{{ end_date }}日结算期间不能进行兑换申请 </span>
				</el-form-item>
			</el-form>
		</div>
		<div class="m-credit-table m-packet-table" v-loading="loading">
			<el-tabs v-model="tab" @tab-click="changeType" type="border-card">
				<el-tab-pane label="盒币记录" name="in">
					<div class="m-packet-table" v-if="list && list.length">
						<table class="m-boxcoin-in-list m-packet-in-list">
							<tr>
								<th>类型</th>
								<th>数量</th>
								<th>源于作品</th>
								<th>备注</th>
								<th>时间</th>
							</tr>
							<tr v-for="(item, i) in list" :key="i">
								<td>{{ formatType(item.action_type) }}</td>
								<td class="u-count" :class="{ isNegative: Number(item.count) < 0 }">
									<span>{{ Number(item.count) > 0 ? "+" : "" }}</span>
									<b>{{ item.count }}</b>
								</td>
								<td>
									<a :href="getPostLink(item)" target="_blank" v-if="getPostLink(item)"> <i class="el-icon-link"></i> 点击查看 </a>
									<span v-else>-</span>
								</td>
								<td>
									<span :title="item.remark">{{ formatRemark(item.remark) }}</span>
								</td>
								<td>{{ formatDate(item.created_at) }}</td>
							</tr>
						</table>
					</div>
					<el-alert v-else class="m-credit-null m-packet-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
					<el-pagination class="m-credit-pages m-packet-pages" background :page-size="per" :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
				</el-tab-pane>
				<el-tab-pane label="兑换记录" name="out">
					<div class="m-packet-table" v-if="list && list.length">
						<table class="m-boxcoin-out-list m-packet-in-list">
							<tr>
								<th>数量</th>
								<th>大区</th>
								<th>账号</th>
								<th>邮箱</th>
								<th>处理状态</th>
								<th>备注</th>
								<th>申请时间</th>
							</tr>
							<tr v-for="(item, i) in list" :key="i">
								<td>
									<b>{{ item.cash }}通宝</b>
								</td>
								<td>{{ item.zone }}</td>
								<td>{{ item.account }}</td>
								<td>{{ item.email }}</td>
								<td
									:class="{
										isFinished: item.status == 1,
										isProcessing: !item.status,
										isPending: item.status > 1,
									}"
								>
									{{ formatHistoryStatus(item.status) }}
								</td>
								<td>{{ item.remark }}</td>
								<td>{{ formatDate(item.created_at) }}</td>
							</tr>
						</table>
					</div>

					<el-alert v-else class="m-credit-null m-packet-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
					<el-pagination class="m-credit-pages m-packet-pages" background :page-size="per" :hide-on-single-page="true" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import types from "@/assets/data/boxcoin_types.json";
import zones from "@jx3box/jx3box-data/data/server/server_zones.json";
import statusMap from "@/assets/data/boxcoin_status.json";
import { getBoxcoinCashHistory, getBoxcoinGotHistory, cashBoxcoin, getBoxcoinConfig,getBoxcoinOverview } from "@/service/boxcoin.js";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc.js";
export default {
	name: "Boxcoin",
	props: [],
	data: function () {
		return {
			// 提现表单
			money: 0,
			min: 3000,
			pull: {
				zone: "",
				account: "",
				cash: "",
				email: "",
			},
			showPullBox: false,
			lockStatus: false,
			formStatus: false,

			// 记录列表
			loading: false,
			tab: "in",
			list: [],
			page: 1,
			per: 10,
			total: 1,

			// Options
			types,
			zones,
			dates: [],

			// 杂项
			breadcrumb: "",

            // 概览
            overview : {
                all : 0,
                std : 0,
                origin : 0,
            }

		};
	},
	computed: {
		params: function () {
			let params = {
				pageIndex: this.page,
				pageSize: this.per,
			};
			return params;
		},
		hasLeft: function () {
			return this.money > 0;
		},
		isAllowDate: function () {
			let d = new Date().getDate();
			return !this.dates.includes(d);
		},
		canCash: function () {
			return this.hasLeft && this.isAllowDate && this.money >= this.min;
		},
		ready: function () {
			return this.canCash && this.formStatus;
		},
		start_date: function () {
			return this.dates[0];
		},
		end_date: function () {
			return this.dates[this.dates.length - 1];
		},
        total_std : function (){
            return this.toPositiveNumber(this.overview.std)
        },
        total_origin : function (){
            return this.toPositiveNumber(this.overview.origin) + this.toPositiveNumber(this.overview.all)
        }
	},
	methods: {
		// 初始化
		init: function () {
			getBoxcoinConfig().then((res) => {
				this.dates = JSON.parse(res.data.data.val);
			});
			this.loadAsset();
			this.loadData();
			this.loadAc();
            this.loadOverview()
		},

		// 加载列表数据
		loadData: function () {
			this.loading = true;
			let fn = {
				in: getBoxcoinGotHistory,
				out: getBoxcoinCashHistory,
			};
			fn[this.tab](this.params)
				.then((res) => {
					this.list = res.data.data.list;
					this.total = res.data.data.page.total;
				})
				.finally(() => {
					this.loading = false;
				});
		},
        loadOverview : function (){
            getBoxcoinOverview().then((res) => {
                this.overview = res.data.data
            })
        },
		changeType: function () {
			this.page = 1;
			this.loadData();
		},
		getPostLink(item) {
			return getLink(item.post_type, item.article_id);
		},

		// 提现操作
		loadAsset: function () {
			User.getAsset().then((data) => {
				this.money = data?.box_coin || 0;
			});
		},
		togglePullBox: function () {
			this.showPullBox = !this.showPullBox;
		},
		canSelect: function (val) {
			return ~~this.money >= ~~val;
		},
		checkForm: function () {
			for (let key in this.pull) {
				if (!this.pull[key]) {
					this.formStatus = false;
					return;
				}
			}
			this.formStatus = true;
		},
		openConfirmBox: function () {
			this.$alert(`<div class="m-boxcoin-msg">大区：<b>${this.pull.zone}</b> <br/> 账号：<b>${this.pull.account}</b> <br/> 邮箱：<b>${this.pull.email}</b> <br/> 兑换：<b>${this.pull.cash}通宝</b></div>`, "确认信息", {
				confirmButtonText: "确定",
				dangerouslyUseHTMLString: true,
				callback: (action) => {
					if (action == "confirm") {
						this.lockStatus = true;
						this.loading = true;
						cashBoxcoin(this.pull)
							.then((res) => {
								this.$message({
									type: "success",
									message: `申请成功,请耐心等待结算`,
								});
								this.showPullBox = false;
								this.money = this.money - this.pull.cash;
							})
							.then(() => {
								// 重载数据
								this.loadData();
							})
							.finally(() => {
								this.lockStatus = false;
								this.loading = false;
							});
					}
				},
			});
		},

		// 杂项
		loadAc: function () {
			getBreadcrumb("dashboard-boxcoin").then((data) => {
				this.breadcrumb = data;
			});
		},
		// filters
		formatDate: function (val) {
			return showTime(val);
		},
		formatType: function (val) {
			return (val && types[val]) || "未知";
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
		formatHistoryStatus: function (val) {
			return statusMap[val] || val;
		},
        toPositiveNumber : function (val){
            return val > 0 ? val : 0
        }
	},

	created: function () {
		this.tab = this.$route.query.tab || "in";
		this.init();
	},
	components: {},
	watch: {
		params: {
			deep: true,
			handler() {
				this.loadData();
			},
		},
		pull: {
			deep: true,
			handler: function () {
				this.checkForm();
			},
		},
	},
};
</script>

<style lang="less">
@import "../assets/css/packet.less";
@import "../assets/css/boxcoin.less";
</style>
