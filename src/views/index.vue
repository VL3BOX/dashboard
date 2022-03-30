<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <Avatar class="u-avatar" :uid="uid" :url="info.user_avatar" :size="120" :frame="info.user_avatar_frame" />
            <div class="u-info">
                <h1 class="u-name">
                    <span class="u-name-txt">{{ info.display_name }}</span>
                    <el-tooltip class="item" effect="dark" content="修改昵称" placement="top">
                        <a class="u-edit-name" href="/vip/rename?from=dashboard_index">
                            <i class="el-icon-edit-outline"></i>
                        </a>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="购买/续费会员服务" placement="top">
                        <span class="u-vip">
                            <template v-if="isVIP || isPRO">
                                <a
                                    class="i-icon-vip"
                                    :class="{ on: isVIP || isPRO }"
                                    href="/vip/premium?from=dashboard_index"
                                    target="_blank"
                                    >{{ vipType }}</a
                                >
                                <span class="u-expire" v-if="expire_date">(有效期至:{{ expire_date }})</span>
                            </template>
                            <a class="u-upgrade" href="/vip/premium?from=dashboard_index" target="_blank" v-else
                                >升级账号类型</a
                            >
                        </span>
                    </el-tooltip>
                </h1>
                <div class="u-identity">
                    <span class="u-uid">
                        <em>UID</em>
                        <b>{{ uid }}</b>
                    </span>
                    <span class="u-superauth" v-if="isSuperAuthor" title="签约作者">
                        <img :src="super_author_icon" alt="superAuthor" />
                    </span>
                    <span class="u-level">
                        <el-tooltip :content="`当前经验 ${info.experience || 0}`">
                            <em>Level</em>
                        </el-tooltip>
                        <b>Lv.{{ level }}</b>
                    </span>
                    <span class="u-group">
                        <em>Verify</em>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="~~info.verify_email ? '✔️邮箱已验证' : '邮箱未验证'"
                            placement="top"
                        >
                            <a href="/dashboard/#/email"><i class="el-icon-message"></i></a>
                        </el-tooltip>
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="~~info.verify_phone ? '✔️手机已绑定' : '手机未绑定'"
                            placement="top"
                        >
                            <a href="/dashboard/#/phone"><i class="el-icon-mobile-phone"></i></a>
                        </el-tooltip>
                    </span>
                    <span class="u-group" v-if="group > 60">
                        <em>Group</em>
                        <b>{{ group | showGroupName }}</b>
                    </span>
                </div>
                <div class="u-medals" v-if="medals && medals.length">
                    <span class="u-medal" v-for="(item, i) in medals" :key="i">
                        <img :src="item.medal | showMedalIcon" :title="item | showMedalDesc" />
                    </span>
                </div>
            </div>
        </div>
        <div class="m-credit">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="u-dot">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="积分可用于兑换限量纪念品、激活码等，通过发布作品或参与站内活动获取"
                            placement="top"
                        >
                            <div class="u-credit-name"><i class="el-icon-sugar"></i> 积分</div>
                        </el-tooltip>
                        <div class="u-credit-value">
                            <b>{{ asset.points }}</b>
                        </div>
                        <div class="u-credit-op">
                            <router-link class="el-button el-button--primary el-button--mini" to="/points"
                                >兑换</router-link
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-coin">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="1盒币可用于兑换1通宝，通过评审团/用户打赏获取"
                            placement="top"
                        >
                            <div class="u-credit-name"><i class="el-icon-coin"></i> 盒币</div>
                        </el-tooltip>
                        <div class="u-credit-value">
                            <b>{{ asset.box_coin }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a class="el-button el-button--primary el-button--mini" href="/vip/boxcoin" target="_blank"
                                >充值</a
                            >
                            <router-link class="el-button el-button--primary el-button--mini" to="/boxcoin"
                                >兑换</router-link
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-packet">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="红包可直接提现至支付宝/微信钱包，通过特殊活动抽奖获取"
                            placement="top"
                        >
                            <div class="u-credit-name"><i class="el-icon-wallet"></i> 红包</div>
                        </el-tooltip>
                        <div class="u-credit-value">
                            <b>{{ asset.red_packet | formatCredit }}</b>
                        </div>
                        <div class="u-credit-op">
                            <router-link class="el-button el-button--primary el-button--mini" to="/packet"
                                >提现</router-link
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-gift">
                        <div class="u-credit-name"><i class="el-icon-present"></i> 订单</div>
                        <div class="u-credit-value">
                            <b>{{ asset.gift || 0 }}</b>
                        </div>
                        <div class="u-credit-op">
                            <router-link class="el-button el-button--primary el-button--mini" to="/order"
                                >查看</router-link
                            >
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="m-index-asset-logs">
            <h2 class="u-title">
                <i class="el-icon-bell"></i> 资产动态
                <div class="u-dates">
                    <i class="el-icon-date"></i>
                    <el-radio-group v-model="date">
                        <el-radio v-for="(item, i) in dates" :key="i" :label="item.value">{{ item.label }}</el-radio>
                    </el-radio-group>
                </div>
            </h2>
            <ul class="u-list" v-if="asset_logs && asset_logs.length">
                <li class="u-item" v-for="(item, i) in asset_logs" :key="i">
                    <i :class="item.type | showAssetIcon"></i>
                    <span class="u-type">{{ item.type | showAssetType }}</span>
                    <span class="u-div">／</span>

                    <!-- 盒币 -->
                    <span class="u-boxcoin" v-if="item.type == 'boxcoin'">
                        <span class="u-boxcoin-type">{{ item.data.action_type | showBoxcoinType }}</span>
                        <b :class="{ isNegative: item.data.count < 0 }">{{ item.data.count }}</b>
                        ,
                        <span class="u-boxcoin-remark">{{ item.data.remark || "-" }}</span>
                        <a class="u-link" :href="getPostLink(item)" v-if="item.data.post_type && item.data.post_id">
                            <i class="el-icon-link"></i> 查看详情
                        </a>
                    </span>

                    <!-- 订单 -->
                    <span class="u-order" v-if="item.type == 'order'">
                        产品：{{ item.data.product_id | showProduct }}， 金额：¥
                        <b>{{ item.data.total_fee | showPrice }}</b>
                        ， 状态：{{ item.data.pay_status | showPayStatus }}
                    </span>

                    <!-- 红包 -->
                    <span class="u-redpack" v-if="item.type == 'redpack'">
                        金额：¥
                        <b>{{ item.data.money | showPrice }}</b>
                        ， 补充信息：{{ item.data.describe || "-" }}
                    </span>
                </li>
            </ul>
            <div class="u-null" v-else><i class="el-icon-warning-outline"></i> 当前时间范围内无记录</div>
        </div>
    </div>
</template>

<script>
import { __userGroup, __imgPath, default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { getThumbnail, getLink } from "@jx3box/jx3box-common/js/utils";
import { getUserMedals, getUserInfo, getMyAssetLogs, getMyInfo } from "@/service/index.js";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import asset_types from "@/assets/data/asset_log_types.json";
import boxcoin_types from "@/assets/data/boxcoin_types.json";
import { products, pay_status, pay_types } from "@/assets/data/pay_order.json";
import dayjs from "dayjs";
import avatar from "./avatar.vue";
export default {
    components: { avatar },
    name: "index",
    props: [],
    data: function() {
        return {
            uid: User.getInfo().uid,
            group: User.getInfo().group,
            info: {
                uid: 8,
                name: "匿名",
                user_avatar: "https://img.jx3box.com/image/common/avatar.png",
                user_avatar_frame: "default",
                bio: "-",
                sign: 0,
            },
            asset: {
                expire_date: "2022-03-07T00:00:00+08:00",
                total_day: 395,
                was_vip: 0,

                pro_expire_date: "2022-03-07T00:00:00+08:00",
                pro_total_day: 366,
                was_pro: 0,

                box_coin: 0, //盒币
                red_packet: 0, //红包
                points: 0, //积分
                gift: 0, //礼品、商城订单
            },
            medals: [],
            asset_logs: [],
            asset_types,
            boxcoin_types,
            products,
            pay_status,
            pay_types,

            date: dayjs()
                .subtract(30, "days")
                .format("YYYYMMDD"),
        };
    },
    computed: {
        isVIP: function() {
            return User._isVIP(this.asset) || false;
        },
        isPRO: function() {
            return User._isPRO(this.asset) || false;
        },
        vipType: function() {
            return this.isPRO ? "PRO" : "PRE";
        },
        expire_date: function() {
            if (this.isPRO) {
                return showDate(this.asset.pro_expire_date);
            } else if (this.isVIP) {
                return showDate(this.asset.expire_date);
            } else {
                return "";
            }
        },
        super_author_icon: function() {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        dates: function() {
            return [
                {
                    label: "今天",
                    value: dayjs().format("YYYYMMDD"),
                },
                {
                    label: "7天",
                    value: dayjs()
                        .subtract(7, "days")
                        .format("YYYYMMDD"),
                },
                {
                    label: "30天",
                    value: dayjs()
                        .subtract(30, "days")
                        .format("YYYYMMDD"),
                },
            ];
        },
        isSuperAuthor: function() {
            return !!this.info?.sign;
        },
        level: function() {
            return User.getLevel(this.info?.experience || 0);
        },
    },
    methods: {
        loadUserInfo: function() {
            getMyInfo().then((res) => {
                if (res.data.data) {
                    this.info = res.data.data;
                }
            });
        },
        loadAsset: function() {
            User.getAsset().then((data) => {
                this.asset = data;
            });
        },
        loadMedals: function() {
            if (!this.uid) return;
            getUserMedals(this.uid).then((res) => {
                this.medals = res.data.data || [];
            });
        },
        loadFrames: function() {
            getFrames().then((res) => {
                if (res.data) {
                    this.frames = res.data || [];
                }
            });
        },
        loadAssetLogs: function() {
            getMyAssetLogs(this.date).then((res) => {
                this.asset_logs = res.data.data.list || [];
            });
        },
        init: function() {
            this.loadUserInfo();
            this.loadAsset();
            this.loadMedals();
            this.loadAssetLogs();
        },
        getPostLink: function(item) {
            return getLink(item.data.post_type, item.data.post_id);
        },
    },
    filters: {
        groupicon: function(groupid) {
            return __imgPath + "image/group/" + groupid + ".svg";
        },
        showGroupName: function(val) {
            return val ? __userGroup[val] : "游客";
        },
        formatCredit: function(val) {
            return val ? (val / 100).toFixed(2) : "0.00";
        },
        showMedalIcon: function(val) {
            return __imgPath + "image/medals/user/" + val + ".gif";
        },
        showMedalDesc: function(item) {
            return item.medal_desc || medal_map[item.medal] || "";
        },
        showAvatar: function(val) {
            return (val && getThumbnail(val, 120, true)) || getThumbnail(default_avatar, 120, true);
        },
        showAssetType: function(val) {
            return asset_types[val]["label"] || val;
        },
        showAssetIcon: function(val) {
            return asset_types[val]["icon"] || "el-icon-box";
        },
        showBoxcoinType: function(val) {
            return boxcoin_types[val] || val;
        },
        showProduct: function(val) {
            return products[val];
        },
        showPayStatus: function(val) {
            return pay_status[val];
        },
        showPayType: function(val) {
            return pay_types[val];
        },
        showPrice: function(val) {
            return val ? (val / 100).toFixed(2) : "0.00";
        },
    },
    mounted: function() {
        this.init();
    },
    watch: {
        date: function() {
            this.loadAssetLogs();
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
