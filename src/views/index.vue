<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <i class="u-avatar">
                <i class="u-avatar-avt"
                    ><img class="u-avatar-avt-pic" :src="info.avatar"
                /></i>
                <!-- TODO:头像框 <i class="u-avatar-frame"><img class="u-avatar-frame-pic" src="../assets/img/1.png" /></i> -->
            </i>
            <div class="u-info">
                <h1 class="u-name">
                    {{ info.name }}
                    <!-- TODO:vip标识 -->
                </h1>
                <div class="u-identity">
                    <span class="u-uid">
                        <em>UID</em><b>{{ info.uid }}</b>
                    </span>
                    <span class="u-group">
                        <em>Group</em><b>{{ info.group | showGroupName }}</b>
                    </span>
                    <!-- TODO: 等级 -->
                    <!-- <span class="u-level">
                        <em>Level</em><b>{{ level }}</b>
                    </span> -->
                </div>
                <div class="u-medals" v-if="medals && medals.length">
                    <span class="u-medal" v-for="(item, i) in medals" :key="i"
                        ><img
                            :src="item.medal | showTeamMedal"
                            :title="medal_map[item.medal]"
                    /></span>
                </div>
            </div>
        </div>
        <div class="m-credit">
            <el-row :gutter="20">
                <el-col :span="6"
                    ><div class="u-dot">
                        <div class="u-credit-name">
                            <i class="el-icon-coin"></i> 积分
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.points }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href=""
                                >兑换</a
                            >
                        </div>
                    </div></el-col
                >
                <el-col :span="6"
                    ><div class="u-coin">
                        <div class="u-credit-name">
                            <i class="el-icon-coin"></i> 盒币
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.box_coin | formatCredit }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href=""
                                >充值</a
                            ><a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href=""
                                >提现</a
                            >
                        </div>
                    </div></el-col
                >
                <el-col :span="6"
                    ><div class="u-packet">
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
                    </div></el-col
                >
                <el-col :span="6"
                    ><div class="u-gift">
                        <div class="u-credit-name">
                            <i class="el-icon-present"></i> 礼品/订单
                        </div>
                        <div class="u-credit-value">
                            <b>{{ asset.gift }}</b>
                        </div>
                        <div class="u-credit-op">
                            <a
                                class="el-button el-button--primary el-button--mini is-disabled"
                                href=""
                                >查看</a
                            >
                        </div>
                    </div></el-col
                >
            </el-row>
        </div>

        <!-- TODO: -->
        <!-- 动态、任务、成就 -->
    </div>
</template>

<script>
import { JX3BOX, User, Utils } from "@jx3box/jx3box-common";
import { getUserInfo } from "../service/profile";
import dateFormat from "../utils/dateFormat";
import { getMyAsset, getUserMedals } from "@/service/index.js";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "index",
    props: [],
    data: function() {
        return {
            info: {
                avatar: "",
                name: "",
                uid: "",
                group: 0,
                level: "-",
                join: "",
                bio: "",
            },
            asset: {
                points: 0, //积分
                box_coin: 0, //盒币
                red_packet: 0, //红包
                gift: 0, //礼品、商城订单
            },
            medals: [],
            medal_map,
        };
    },
    computed: {},
    methods: {
        renderInfo: function() {
            this.info.avatar = Utils.showAvatar(
                User.getInfo().avatar_origin,
                "l"
            );

            let _info = User.getInfo();
            this.info.name = _info.name || "匿名";
            this.info.uid = _info.uid || 0;
            this.info.group = _info.group || 0;
        },
        loadAsset: function() {
            getMyAsset().then((res) => {
                this.asset.box_coin = res.data.data.box_coin;
                this.asset.points = res.data.data.points;
                this.asset.red_packet = res.data.data.red_packet;
            });
        },
        loadMedals: function() {
            if (!this.info.uid) return;
            getUserMedals(this.info.uid).then((res) => {
                this.medals = res.data.data;
            });
        },
    },
    filters: {
        groupicon: function(groupid) {
            return JX3BOX.__imgPath + "image/group/" + groupid + ".svg";
        },
        showGroupName: function(val) {
            return val ? JX3BOX.__userGroup[val] : "游客";
        },
        formatCredit: function(val) {
            return val ? (val / 100).toFixed(2) : "0.00";
        },
        showTeamMedal: function(val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
    },
    mounted: function() {
        this.renderInfo();
        this.loadAsset();
        this.loadMedals();
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
