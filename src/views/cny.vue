<template>
    <div class="m-credit m-boxcoin m-cny">

        <h2 class="u-title"><i class="el-icon-wallet"></i> 我的金箔</h2>

        <div class="m-credit-total m-packet-total">
            余额 :
            <b :class="{ hasLeft: hasLeft }">{{ formatMoney(money) }}</b>
            <a class="el-button u-btn el-button--primary el-button--mini is-disabled" href="/vip/cny" target="_blank"
                >充值</a
            >
            <el-button class="u-btn" type="primary" @click="togglePullBox" size="mini" :disabled="!money"
                >提现</el-button
            >
        </div>

        <div class="m-credit-pull">
            <el-alert class="m-boxcoin-ac" type="error" show-icon :closable="false" v-if="breadcrumb" size="mini">
                <slot name="title"><div v-html="breadcrumb"></div></slot>
            </el-alert>
            <el-alert class="m-boxcoin-tip" title="提现说明" type="warning" show-icon>
                <slot name="description"
                    >每个月6~30日开放提现，1~5日关闭提现渠道进行汇总。（即1月6日的兑换，和1月30日的兑换，同样在2月1~5日进行汇总）<br />
                    提现将收取手续费 2%，最低收取 0.02 元。收取规则：不满1元部分按1元计算，计算手续费时向上取整。<br />
                    比如提现15.5，16.2 向取整，分别按16，17元收取 0.32元和0.34元。<br />
                    汇总后，通常7个工作日内转账至收款账号。</slot
                >
            </el-alert>
            <el-form label-position="left" label-width="80px" class="m-boxcoin-form">
                <el-form-item label="类型">
                    <el-select v-model="pull.pay_type" placeholder="请选择">
                        <el-option v-for="(label, key) in pay_types" :key="key" :label="label" :value="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="pull.account" placeholder="请务必填写正确的收款账号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="pull.username" placeholder="请务必填写正确的收款人"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input v-model.number="pull.money" placeholder="请务必填写正确的金额，例如20000即200元、1268即12.68元">
                        <template slot="append">分</template>
                        <template slot="prepend">{{formatMoney(pull.money)}}元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label>
                    <el-button type="primary" @click="openConfirmBox" :disabled="!ready || lockStatus"
                        >提交申请</el-button
                    >
                    <span class="u-tip" v-if="!isAllowDate">
                        <i class="el-icon-warning-outline"></i> 每月{{ start_date }}-{{
                            end_date
                        }}日结算期间不能进行提现申请
                    </span>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="m-credit-table m-packet-table" v-loading="loading">
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
                                    <a :href="getPostLink(item)" target="_blank" v-if="getPostLink(item)">
                                        <i class="el-icon-link"></i> 点击查看
                                    </a>
                                    <span v-else>-</span>
                                </td>
                                <td>
                                    <span :title="item.remark">{{ formatRemark(item.remark) }}</span>
                                </td>
                                <td>{{ formatDate(item.created_at) }}</td>
                            </tr>
                        </table>
                    </div>
                    <el-alert
                        v-else
                        class="m-credit-null m-packet-null"
                        title="没有找到相关条目"
                        type="info"
                        center
                        show-icon
                    ></el-alert>
                    <el-pagination
                        class="m-credit-pages m-packet-pages"
                        background
                        :page-size="per"
                        :hide-on-single-page="true"
                        :current-page.sync="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
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

                    <el-alert
                        v-else
                        class="m-credit-null m-packet-null"
                        title="没有找到相关条目"
                        type="info"
                        center
                        show-icon
                    ></el-alert>
                    <el-pagination
                        class="m-credit-pages m-packet-pages"
                        background
                        :page-size="per"
                        :hide-on-single-page="true"
                        :current-page.sync="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </div> -->
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import types from "@/assets/data/boxcoin_types.json";
import statusMap from "@/assets/data/boxcoin_status.json";
import paytypes from "@/assets/data/paytypes.json";
import paystatus from "@/assets/data/paystatus.json";
import _ from "lodash";
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc.js";
import { cashOut,getBalance } from "@/service/cny";
import { getBoxcoinConfig } from "@/service/boxcoin";
export default {
    name: "Cny",
    props: [],
    data: function () {
        return {

            // 💠 余额
            money: 0,

            // 🌸 提现
            pull: {
                username: "",
                account: "",
                pay_type: "alipay",
                money: "",
            },
            showPullBox: false,
            lockStatus: false,
            formStatus: false,
            breadcrumb: "",

            // Options
            types,
            dates: [],
            pay_types: paytypes,

            // 🌟 列表
            loading: false,
            tab: "in",
            list: [],
            page: 1,
            per: 10,
            total: 1,

        };
    },
    computed: {

        // 💠 余额
        hasLeft: function () {
            return this.money > 0;
        },

        // 🌸 提现
        // 日期
        start_date: function () {
            return this.dates[0];
        },
        end_date: function () {
            return this.dates[this.dates.length - 1];
        },
        isAllowDate: function () {
            let d = new Date().getDate();
            return !this.dates.includes(d);
        },
        // 限制
        canCash: function () {
            return this.hasLeft && this.isAllowDate;
        },
        ready: function () {
            return true
            return this.canCash && this.formStatus;
        },

        // 🌟 列表
        params: function () {
            let params = {
                pageIndex: this.page,
                pageSize: this.per,
            };
            return params;
        },

    },
    methods: {
        // 初始化
        init: function () {
            getBoxcoinConfig().then((res) => {
                this.dates = JSON.parse(res.data.data.val);
            });
            this.loadAsset();
            // this.loadData();
            this.loadAc();
        },

        // 💠 余额
        loadAsset: function () {
            getBalance().then((data) => {
                this.money = data;
            });
        },


        // 🌸 提现
        togglePullBox: function () {
            this.showPullBox = !this.showPullBox;
        },
        loadAc: function () {
            getBreadcrumb("dashboard-cny").then((data) => {
                this.breadcrumb = data;
            });
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
            this.$alert(
                `<div class="m-packet-msg">
                收款账号<b>${this.pull.account}</b><br/>
                收款人<b>${this.pull.username}</b><br/>
                金额<b>${this.pull.money}</b>
                </div>`,
                "确认信息",
                {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: (action) => {
                        if (action == "confirm") {
                            this.lockStatus = true;
                            this.loading = true;
                            cashOut(this.pull)
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
                }
            );
        },

        // 🌟 列 你表
        loadData: function () {
            this.loading = true;
            let fn = {
                in: getBoxcoinGotHistory,
                out: getBoxcoinCashHistory,
            };
            this.$router.push({
                query: {
                    tab: this.tab,
                    page: this.page,
                },
            });
            fn[this.tab](this.params)
                .then((res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeType: function () {
            this.page = 1;
            this.loadData();
        },
        getPostLink(item) {
            return getLink(item.post_type, item.article_id);
        },


        // filters
        formatMoney: function (val) {
            return val ? (val / 100).toFixed(2) : 0;
        },
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
            }
            return "-";
        },
        formatHistoryStatus: function (val) {
            return statusMap[val] || val;
        },
    },
    created: function () {
        this.tab = this.$route.query.tab || "in";
        this.page = Number(this.$route.query.page || 1);
        this.init();
    },
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
