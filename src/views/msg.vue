<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-msg">
        <div class="m-dashboard-msg-header">
            <h2 class="u-title">
                <i class="el-icon-bell"></i> 我的消息
            </h2>
            <el-button
                class="u-read-all"
                type="primary"
                size="mini"
                @click="read(null)"
                :disabled="!unread_total"
            >
                <i class="el-icon el-icon-check"></i>
                <span v-text="'全部设为已读'"></span>
            </el-button>
        </div>
        <el-input
            class="m-dashboard-work-search"
            placeholder="请输入搜索内容"
            v-model="keyword"
            @keyup.enter.native="changePage(1)"
        >
            <template slot="prepend">关键词</template>
            <el-button slot="append" icon="el-icon-search" @click="changePage(1)"></el-button>
        </el-input>
        <ul class="m-dashboard-box-list" v-if="data.length">
            <li
                v-for="(item, i) in data"
                :key="i"
                :class="{ on: item.read == 1 }"
                v-show="item.deleted == 0"
            >
                <div class="u-primary">
                    <span class="u-content">
                        <span class="u-label u-hasChecked" v-if="item.read == 1">已读</span>
                        <span class="u-label u-hasNotChecked" v-else>未读</span>
                        <span v-html="item.content"></span>
                        <a
                            :href="item | msgLink"
                            class="u-msg-link"
                            v-if="hasLink(item)"
                            @click="read(item)"
                            target="_blank"
                        >
                            <i class="el-icon-link"></i> 点击查看
                        </a>
                    </span>
                    <time class="u-time">
                        <i class="el-icon-phone-outline"></i>
                        {{ dateFormat(~~item.created) }}
                    </time>
                </div>
                <el-button-group class="u-action">
                    <el-button
                        size="mini"
                        icon="el-icon-check"
                        title="设为已读"
                        @click="read(item)"
                        :disabled="item.read == 1"
                    ></el-button>
                    <el-button size="mini" icon="el-icon-delete" title="删除" @click="del(item)"></el-button>
                </el-button-group>
            </li>
        </ul>
        <el-alert v-else class="m-dashboard-box-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
        <el-pagination
            class="m-dashboard-box-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
import { getMsgs, readMsg, removeMsg } from "../service/msg.js";
import { showDate, showTime } from "@jx3box/jx3box-common/js/moment.js";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { Base64 } from "js-base64";
const ignoreLinkTypes = ["namespace"];
export default {
    name: "msg",
    props: [],
    data: function () {
        return {
            keyword: "",
            type: "all",
            data: [],
            unread_total: 0,
            total: 1,
            page: 1,
        };
    },
    methods: {
        changePage: function (i = 1) {
            this.page = i;
            getMsgs({
                where: {
                    content: this.keyword,
                },
                page: i,
            }).then((res) => {
                this.unread_total = res.data.data.unread_count;
                this.total = res.data.data.total;
                this.data = res.data.data.messages;
            });
        },
        read(item) {
            readMsg(item ? [item.ID] : null).then((res) => {
                if (res.data.code === 200) {
                    if (item) {
                        item.read = 1;
                    } else {
                        this.changePage(this.page);
                    }
                } else {
                    this.$notify.error({ title: res.data.message });
                }
            });
        },
        del(item) {
            removeMsg([item.ID]).then((res) => {
                if (res.data.code === 200) {
                    item.deleted = Math.round(new Date() / 1000);
                } else {
                    this.$notify.error({ title: res.data.message });
                }
            });
        },
        dateFormat: function (val) {
            return showTime(new Date(val * 1000));
        },
        hasLink: function (item) {
            if (ignoreLinkTypes.includes(item.source_type)) {
                return false;
            } else if (item.source_id && item.source_type) {
                return true;
            }
            return false;
        },
    },
    filters: {
        msgLink: function (item) {
            let source_id = item.source_id;
            let source_type = item.source_type;
            if (source_type == "birthday") {
                return (
                    `/author/birthday/${item.user_id}?code=` +
                    Base64.encode(source_id)
                );
            } else if (source_type == "sign") {
                return `/dashboard/#/cooperation`;
            } else if (source_type == "callback") {
                let info = encodeURIComponent(
                    Base64.encode(JSON.stringify(item))
                );
                return `/dashboard/#/${item.type}/${item.subtype}?info=${info}`;
            } else if(source_type == 'box_coin' || source_type == 'boxcoin'){
                return `/dashboard/#/boxcoin`;
            } else if(item.subtype == 'team_join'){
                return `/team/member/list`;
            } else {
                return getLink(source_type, source_id);
            }
        },
    },
    mounted: function () {
        this.changePage();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/msg.less";
</style>
