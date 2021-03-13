<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <i class="u-avatar">
                <img
                    class="u-avatar-pic"
                    :src="info.avatar | showAvatar"
                    :class="{ isCircle }"
                />
                <i class="u-avatar-frame" v-if="frameName">
                    <img :src="frameUrl" />
                </i>
            </i>
            <div class="u-info">
                <h1 class="u-name">
                    <span class="u-name-txt">{{ info.name }}</span>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="修改昵称"
                        placement="top"
                    >
                        <a
                            class="u-edit-name"
                            href="/vip/rename?from=dashboard_index"
                        >
                            <i class="el-icon-edit-outline"></i>
                        </a>
                    </el-tooltip>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="购买/续费会员服务"
                        placement="top"
                    >
                        <span class="u-vip">
                            <a
                                class="i-icon-vip"
                                :class="{ on: isVIP || isPRO }"
                                href="/vip/premium?from=dashboard_index"
                                target="_blank"
                                v-if="isVIP || isPRO"
                                >{{ vipType }}</a
                            >
                            <span class="u-expire" v-if="expire_date"
                                >(有效期至:{{ expire_date }})</span
                            >
                            <a
                                class="u-upgrade"
                                href="/vip/premium?from=dashboard_index"
                                target="_blank"
                                >升级账号类型</a
                            >
                        </span>
                    </el-tooltip>
                </h1>
                <div class="u-identity">
                    <span class="u-uid">
                        <em>UID</em>
                        <b>{{ info.uid }}</b>
                    </span>
                    <span class="u-group">
                        <em>Group</em>
                        <b>{{ info.group | showGroupName }}</b>
                    </span>
                    <!-- TODO: 等级 -->
                    <!-- <span class="u-level">
                        <em>Level</em><b>{{ level }}</b>
                    </span>-->
                </div>
                <div class="u-medals" v-if="medals && medals.length">
                    <span class="u-medal" v-for="(item, i) in medals" :key="i">
                        <img
                            :src="item.medal | showTeamMedal"
                            :title="medal_map[item.medal]"
                        />
                    </span>
                </div>
            </div>
        </div>
        <div class="m-credit">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="u-dot">
                        <div class="u-credit-name">
                            <i class="el-icon-sugar"></i> 积分
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.points }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href
                                >兑换</a
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-coin">
                        <div class="u-credit-name">
                            <i class="el-icon-coin"></i> 盒币
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.box_coin | formatCredit }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href
                                >充值</a
                            >
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href
                                >提现</a
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-packet">
                        <div class="u-credit-name">
                            <i class="el-icon-bank-card"></i> 红包
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.red_packet | formatCredit }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini"
                                href="/vip/credit#/packet"
                                >提现</a
                            >
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="u-gift">
                        <div class="u-credit-name">
                            <i class="el-icon-present"></i> 订单
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.gift || 0 }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href
                                >查看</a
                            >
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- TODO: -->
        <!-- 积分兑换好物推荐、积分策略链接 -->
    </div>
</template>

<script>
import { __userGroup, __imgPath,default_avatar } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import dateFormat from "../utils/dateFormat";
import { getUserMedals, getUserInfo } from "@/service/index.js";
import { getFrames } from "@/service/profile.js";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import { getAsset, hasPRO, hasVIP } from "@jx3box/jx3box-common/js/pay";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
export default {
    name: "index",
    props: [],
    data: function() {
        return {
            uid: User.getInfo().uid,
            info: {
                uid: 8,
                name: "匿名",
                avatar: "https://img.jx3box.com/image/common/avatar.png",
                avatar_frame: "default",
                group: 0,
                exp: 0,
                status: 0,
                verify_email: 0,
                verify_phone: 0,
                bio: "-",
                server: "蝶恋花",
                created_at: "2019-08-28T01:03:51.000Z",
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
            medal_map,
            frames,
        };
    },
    computed: {
        isVIP: function() {
            return hasVIP(this.asset) || false;
        },
        isPRO: function() {
            return hasPRO(this.asset) || false;
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
        frameName: function() {
            return this.info.avatar_frame && this.frames[this.info.avatar_frame]
                ? this.info.avatar_frame
                : "";
        },
        frameUrl: function() {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files.m.file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function() {
            return (
                this.frameName && this.frames[this.frameName].style == "circle"
            );
        },
    },
    methods: {
        loadUserInfo: function() {
            getUserInfo(this.uid).then((res) => {
                this.info = res.data.data;
            });
        },
        loadAsset: function() {
            getAsset().then((data) => {
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
        showTeamMedal: function(val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
        showAvatar : function (val){
            return val && getThumbnail(val,120,true) || getThumbnail(default_avatar,120,true)
        }
    },
    mounted: function() {
        this.loadUserInfo();
        this.loadAsset();
        this.loadMedals();
        this.loadFrames();
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
