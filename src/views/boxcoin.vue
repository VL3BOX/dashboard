<template>
    <div class="m-credit m-boxcoin">
        <h2 class="u-title">
            <i class="el-icon-coin"></i> 我的盒币
        </h2>
        <div class="m-credit-total m-packet-total">
            余额 :
            <b :class="{ hasLeft: hasLeft }">{{ money }}</b>
            <el-button
                class="u-btn"
                type="primary"
                @click="togglePullBox"
                size="mini"
                :disabled="!money"
            >兑换</el-button>
        </div>
        <div class="m-credit-pull" v-if="showPullBox">
            <el-form label-position="left" label-width="80px">
                <el-form-item label="游戏大区">
                    <el-select v-model="pull.zone" placeholder="请选择所在大区">
                        <el-option
                            v-for="(label, key) in zones"
                            :key="key"
                            :label="label"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="游戏账号">
                    <el-input v-model="pull.account" placeholder="请务必填写正确的账号"></el-input>
                </el-form-item>
                <el-form-item label="兑换数目">
                    <el-radio-group v-model="pull.cash">
                        <el-radio label="1500" border>1500通宝</el-radio>
                        <el-radio label="3000" border>3000通宝</el-radio>
                        <el-radio label="5000" border>5000通宝</el-radio>
                        <el-radio label="10000" border>10000通宝</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱地址">
                    <el-input v-model="pull.email" placeholder="请务必填写正确的邮箱"></el-input>
                </el-form-item>
                <!-- TODO:1-3不能申请，1-3号处理上一个月的全部申请记录 -->
                <el-form-item label><div class="u-tip"><i class="el-icon-info"></i>1盒币可兑换1通宝，所有兑换申请将在每月1-3号统一处理。如发放为金山一卡通方式，则会发送邮件至邮箱。请在https://charge.xoyo.com/pay?item=jx3&way=kcard进行充值</div></el-form-item>
                <el-form-item label>
                    <el-button
                        type="primary"
                        @click="openConfirmBox"
                        :disabled="!money || lockStatus"
                    >提交申请</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="m-credit-table m-packet-table" v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="changeType" type="border-card">
                <el-tab-pane label="获取记录" name="in">
                    <div class="m-packet-table" v-if="my_packet_list && my_packet_list.length">
                        <table class="m-packet-in-list">
                            <tr>
                                <th>收入金额</th>
                                <th>红包类型</th>
                                <th>红包批次</th>
                                <th>红包描述</th>
                                <th>收入时间</th>
                            </tr>
                            <tr v-for="(item, i) in my_packet_list" :key="i">
                                <td>
                                    <b>{{ item.money | formatMoney }}</b>
                                </td>
                                <td>{{ item.category }}</td>
                                <td>{{ item.batch_no }}</td>
                                <td>{{ item.describe }}</td>
                                <td>{{ item.created_at | formatDate }}</td>
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
                    <div
                        class="m-packet-table"
                        v-if="my_packet_history && my_packet_history.length"
                    >
                        <table class="m-packet-in-list">
                            <tr>
                                <th>提现金额</th>
                                <th>支付类型</th>
                                <th>提现账号</th>
                                <th>状态</th>
                                <th>备注</th>
                                <th>申请时间</th>
                            </tr>
                            <tr v-for="(item, i) in my_packet_history" :key="i">
                                <td>
                                    <b>{{ item.money | formatMoney }}</b>
                                </td>
                                <td>{{ item.pay_type | formatPaytype }}</td>
                                <td>{{ item.accept_account | encryptAccount }}</td>
                                <td
                                    :class="{
                                        isFinished: item.status == 1,
                                        isProcessing: !item.status,
                                        isPending: item.status > 1,
                                    }"
                                >{{ item.status | formatHistoryStatus }}</td>
                                <td>
                                    {{
                                    item.status == 1
                                    ? item.transaction_id
                                    : item.why
                                    }}
                                </td>
                                <td>{{ item.created_at | formatDate }}</td>
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
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user.js";
import { showTime } from "@jx3box/jx3box-common/js/moment";
import {
    getMyPacket,
    getMyPacketList,
    getMyPacketHistory,
    getAllPacket,
    pullMyPacket,
    getAllHistory,
    checkPacket,
    pushPacket,
    recyclePacket,
} from "@/service/packet.js";
import paytypes from "@/assets/data/paytypes.json";
import paystatus from "@/assets/data/paystatus.json";
import optypes from "@/assets/data/optypes.json";
import _ from "lodash";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Packet",
    props: [],
    data: function () {
        return {
            // 提现表单
            money: 0,
            zones: [],
            pull: {
                zone:'',
                account: "",
                cash: "",
                email:'',
            },
            showPullBox: false,
            lockStatus: false,

            // 记录列表
            loading: false,
            activeName: "in",
            in_list: [],
            out_list: [],
            page: 1,
            per: 15,
            total: 1,
        };
    },
    computed: {
        hasLeft: function () {
            return this.money > 0;
        },
        params: function () {
            let params = {
                pageIndex: this.page,
                pageSize: this.per,
            };
            let options = ["user_id", "category", "batch_no", "status"];
            options.forEach((val) => {
                if (this.query[val] !== undefined && this.query[val] !== "") {
                    params[val] = this.query[val];
                }
            });
            return params;
        },
        pulldata: function () {
            return {
                username: this.pull.username,
                account: this.pull.account,
                pay_type: this.pull.pay_type,
            };
        },
        pushdata: function () {
            return {
                status: ~~this.push.status,
                why: this.push.why,
                transaction_id: this.push.transaction_id,
            };
        },
        giftdata: function () {
            let gift = _.cloneDeep(this.gift);
            gift.money = parseFloat(gift.money) * 100;
            return gift;
        },
    },
    methods: {
        togglePullBox: function () {
            this.showPullBox = !this.showPullBox;
        },
        loadData: function () {
            this.loading = true;
            const fns = {
                my_packet_list: getMyPacketList,
                my_packet_history: getMyPacketHistory,
                all_packet: getAllPacket,
                all_history: getAllHistory,
            };
            fns[this.activeName](this.params)
                .then((res) => {
                    this[this.activeName] = res.data.data.list || [];
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeType: function () {
            this.page = 1;
            this.$route.query.tab = this.activeName;
            this.loadData();
        },
        openConfirmBox: function () {
            this.$alert(
                `<div class="m-packet-msg">请确认收款账号和收款人 <br/> 收款账号<b>${this.pull.account}</b> <br/> 收款人<b>${this.pull.username}</b></div>`,
                "确认信息",
                {
                    confirmButtonText: "确定",
                    dangerouslyUseHTMLString: true,
                    callback: (action) => {
                        if (action == "confirm") {
                            this.lockStatus = true;
                            this.loading = true;
                            pullMyPacket(this.pulldata)
                                .then((res) => {
                                    this.$message({
                                        type: "success",
                                        message: `申请成功,请耐心等待审核结果`,
                                    });
                                    this.showPullBox = false;
                                    this.money = 0;
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
        check: function (item) {
            this.showPushBox = true;
            this.checkItem = item;
            this.checkId = item.id;
        },
        submit: function (val) {
            this.lockStatus = true;
            this.loading = true;
            checkPacket(this.checkId, this.pushdata, this.params)
                .then((res) => {
                    this.showPushBox = false;
                    this.$message({
                        type: "success",
                        message: `操作成功`,
                    });
                    this.checkItem.status = this.push.status;
                })
                .finally(() => {
                    this.lockStatus = false;
                    this.loading = false;
                });
        },
        toggleGiftBox: function () {
            this.showGiftBox = !this.showGiftBox;
        },
        present: function () {
            this.lockStatus = true;
            this.loading = true;
            pushPacket(this.giftdata)
                .then((res) => {
                    this.showGiftBox = false;
                    this.$message({
                        type: "success",
                        message: `发放成功`,
                    });
                })
                .finally(() => {
                    this.lockStatus = false;
                    this.loading = false;
                });
        },
        recycle: function (item) {
            recyclePacket({
                ids: item.id,
                reason: User.getInfo().uid, //由哪个管理操作
            }).then((res) => {
                this.$message({
                    message: `收回数量` + res.data.data.successCount,
                    type: "success",
                });
                item.status = -1;
            });
        },
    },
    filters: {
        formatDate: function (val) {
            return showTime(val);
        },
        formatStatus: function (val) {
            return val ? "已提现" : "未提现";
        },
        formatHistoryStatus: function (val) {
            return val ? paystatus[val] : "审核中";
        },
        formatPaytype: function (val) {
            return val ? paytypes[val] : val;
        },
        encryptAccount: function (val) {
            return val.slice(0, 3) + "******";
        },
        formatMoney: function (val) {
            return val ? (val / 100).toFixed(2) : 0;
        },
        formatPayStatus: function (val) {
            val += "";
            return val && paystatus[val];
        },
        authorLink,
    },
    created: function () {
        this.activeName = this.$route.query.tab || "my_packet_list";
        getMyPacket().then((res) => {
            this.money = res.data.data.red_packet;
        });

        this.loadData();
    },
    components: {},
    watch: {
        params: {
            deep: true,
            handler() {
                this.loadData();
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/packet.less";
</style>

<style scoped lang="less">
.u-tip{
    color:#fba524;
}
</style>
