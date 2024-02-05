<template>
    <div class="m-dashboard-keycode m-credit">
        <h2 class="u-title"><i class="el-icon-bank-card"></i> {{ $t('我的卡密') }}</h2>
        <el-alert class="m-boxcoin-tip" :title="$t('请务必妥善保管，并注意过期时间。')" type="warning" show-icon>
            <a href="https://charge.xoyo.com/pay?item=jx3&way=kcard" target="_blank">{{ $t('金山一卡通充值页面') }}</a>
        </el-alert>
        <div class="m-keycode-tab">
            <el-tabs type="border-card" v-model="tab" @tab-click="tabClick">
                <el-tab-pane :label="$t('一卡通')" name="keycode">
                    <el-table
                        class="m-table"
                        v-if="filteredList.length"
                        :data="filteredList"
                        show-header
                        v-loading="loading"
                    >
                        <el-table-column prop="type" :label="$t('类型')" width="140">
                            <template slot-scope="scope">{{ keycodeOptions.types[scope.row.type] || "其他" }}</template>
                        </el-table-column>
                        <el-table-column prop="subtype" :label="$t('渠道')" width="140">
                            <template slot-scope="scope">{{
                                keycodeOptions.subtypes[scope.row.subtype] || $t('其他')
                            }}</template>
                        </el-table-column>
                        <el-table-column :label="$t('面额')" width="120">
                            <template slot-scope="scope">{{ scope.row.count }}</template>
                        </el-table-column>
                        <el-table-column :label="$t('卡密')" min-width="330">
                            <template slot-scope="scope">
                                <div class="u-card">
                                    <div class="u-count">
                                        <div class="u-line">
                                            <span>{{ $t('卡号：') + (scope.row.key || "****************") }}</span>
                                            <el-button
                                                class="u-btn"
                                                v-if="scope.row.key"
                                                type="txt"
                                                size="mini"
                                                icon="el-icon-document-copy"
                                                v-clipboard:copy="'' + scope.row.key"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                >{{ $t('复制卡号') }}</el-button
                                            >
                                        </div>
                                        <div class="u-line">
                                            <span>{{ $t('卡密：') + (scope.row.code || "****************") }} </span>
                                            <el-button
                                                v-if="!scope.row.code"
                                                type="primary"
                                                icon="el-icon-view"
                                                @click="getKeycode(scope.$index, scope.row)"
                                                size="mini"
                                                plain
                                                >{{ $t('点击查看') }}</el-button
                                            >
                                            <el-button
                                                class="u-btn"
                                                v-if="scope.row.code"
                                                type="txt"
                                                size="mini"
                                                icon="el-icon-document-copy"
                                                v-clipboard:copy="'' + scope.row.code"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                >{{ $t('复制卡密') }}</el-button
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('过期时间')" min-width="180">
                            <template slot-scope="scope">
                                <div class="u-time" v-if="scope.row.expire_at">
                                    <span class="u-tag" :class="compareTime(scope.row.expire_at, 'tag')">{{
                                        compareTime(scope.row.expire_at, "time")
                                    }}</span
                                    ><span>{{ scope.row.expire_at }}</span>
                                </div>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('发放时间')" min-width="180" prop="grant_at"></el-table-column>
                        <el-table-column prop="remark" :label="$t('备注')" min-width="200"> </el-table-column>
                        <el-table-column prop="used_by_self" :label="$t('是否使用')">
                            <template slot-scope="scope">
                                {{ scope.row.used_by_self ? $t('是') : $t('否') }}

                                <el-button
                                    v-show="!scope.row.used_by_self"
                                    type="text"
                                    size="mini"
                                    @click="onKeyCodeUsedClick(scope.row)"
                                    >{{ $t('（标记使用）') }}</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-alert
                        v-else
                        class="m-credit-null m-packet-null"
                        :title="$t('没有找到任何记录')"
                        type="info"
                        center
                        show-icon
                    ></el-alert>
                    <el-pagination
                        v-if="showPagination"
                        @current-change="currentChange"
                        class="m-credit-pages"
                        background
                        :page-size="per"
                        :hide-on-single-page="true"
                        :current-page.sync="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="$t('激活码')" name="sn">
                    <el-table
                        class="m-table"
                        v-if="filteredList.length"
                        :data="filteredList"
                        show-header
                        cell-class-name="u-table-cell"
                        header-cell-class-name="u-header-cell"
                        v-loading="loading"
                    >
                        <el-table-column prop="type" :label="$t('类型')">
                            <template slot-scope="scope">{{
                                snOptions.types[scope.row.type] || scope.row.type || $t('其他')
                            }}</template>
                        </el-table-column>
                        <el-table-column prop="subtype" :label="$t('渠道')">
                            <template slot-scope="scope">{{
                                snOptions.subtypes[scope.row.subtype] || $t('其他')
                            }}</template>
                        </el-table-column>
                        <el-table-column prop="describe" :label="$t('描述')"> </el-table-column>
                        <el-table-column :label="$t('激活码')" min-width="300">
                            <template slot-scope="scope">
                                <div class="u-code">
                                    <span class="u-txt">{{ scope.row.code || "****************" }}</span>
                                    <el-button
                                        v-if="!scope.row.code"
                                        type="primary"
                                        icon="el-icon-view"
                                        @click="getSn(scope.$index, scope.row)"
                                        size="mini"
                                        plain
                                        >{{ $t('点击查看') }}</el-button
                                    >
                                    <el-button
                                        class="u-btn"
                                        v-else
                                        type="txt"
                                        size="mini"
                                        icon="el-icon-document-copy"
                                        v-clipboard:copy="'' + scope.row.code"
                                        v-clipboard:success="onCopy"
                                        v-clipboard:error="onError"
                                        >{{ $t('复制') }}</el-button
                                    >
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('过期时间')" min-width="180">
                            <template slot-scope="scope">
                                <div class="u-time" v-if="scope.row.expire_at">
                                    <span class="u-tag" :class="compareTime(scope.row.expire_at, 'tag')">{{
                                        compareTime(scope.row.expire_at, "time")
                                    }}</span
                                    ><span>{{ scope.row.expire_at }}</span>
                                </div>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('发放时间')" min-width="180" prop="grant_at"></el-table-column>
                        <el-table-column prop="remark" :label="$t('备注')" min-width="300"> </el-table-column>
                        <el-table-column prop="used_by_self" :label="$t('是否使用')">
                            <template slot-scope="scope">
                                {{ scope.row.used_by_self ? $t('是') : $t('否') }}

                                <el-button
                                    v-show="!scope.row.used_by_self"
                                    type="text"
                                    size="mini"
                                    @click="onSnUsedClick(scope.row)"
                                    >{{ $t('（标记使用）') }}</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-alert
                        v-else
                        class="m-credit-null m-packet-null"
                        :title="$t('没有找到任何记录')"
                        type="info"
                        center
                        show-icon
                    ></el-alert>
                    <el-pagination
                        v-if="showPagination"
                        @current-change="currentChange"
                        class="m-credit-pages"
                        background
                        :page-size="per"
                        :hide-on-single-page="true"
                        :current-page.sync="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="$t('虚拟商品')" name="virtual">
                    <el-table
                        class="m-table"
                        v-if="virtualList.length"
                        :data="virtualList"
                        show-header
                        v-loading="loading"
                    >
                        <el-table-column :label="$t('名称')">
                            <template slot-scope="scope">{{ scope.row.goods.title || "-" }}</template>
                        </el-table-column>
                        <el-table-column :label="$t('卡密')" min-width="330">
                            <template slot-scope="scope">
                                <div class="u-card">
                                    <div class="u-count">
                                        <template v-if="scope.row.goods.sub_category == 'keycode'">
                                            <div class="u-line">
                                                <span
                                                    >卡号：{{ scope.row.goods.good_number || "****************" }}</span
                                                >
                                                <el-button
                                                    class="u-btn"
                                                    v-if="scope.row.goods.good_number"
                                                    type="txt"
                                                    size="mini"
                                                    icon="el-icon-document-copy"
                                                    v-clipboard:copy="'' + scope.row.goods.good_number"
                                                    v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError"
                                                    >{{ $t('复制卡号') }}</el-button
                                                >
                                            </div>
                                            <div class="u-line">
                                                <span
                                                    >{{ $t('卡密：') + (scope.row.goods.goods_secret || "****************") }}
                                                </span>
                                                <el-button
                                                    v-if="!scope.row.goods.goods_secret"
                                                    type="primary"
                                                    icon="el-icon-view"
                                                    @click="getVirtualCode(scope.$index, scope.row)"
                                                    size="mini"
                                                    plain
                                                    >{{ $t('点击查看') }}</el-button
                                                >
                                                <el-button
                                                    class="u-btn"
                                                    v-if="scope.row.goods.goods_secret"
                                                    type="txt"
                                                    size="mini"
                                                    icon="el-icon-document-copy"
                                                    v-clipboard:copy="'' + scope.row.goods.goods_secret"
                                                    v-clipboard:success="onCopy"
                                                    v-clipboard:error="onError"
                                                >
                                                    {{ $t('复制卡密') }}
                                                </el-button>
                                            </div>
                                        </template>
                                        <div class="u-line" v-else>
                                            <span> {{ scope.row.goods.good_number }}</span>
                                            <el-button
                                                class="u-btn"
                                                type="primary"
                                                size="mini"
                                                icon="el-icon-document-copy"
                                                plain
                                                v-clipboard:copy="'' + scope.row.goods.good_number"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                            >
                                                {{ $t('复制卡号') }}
                                            </el-button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('过期时间')" min-width="180">
                            <template slot-scope="scope">
                                <div class="u-time" v-if="scope.row.goods.expire_at">
                                    <span class="u-tag" :class="compareTime(scope.row.goods.expire_at, 'tag')">{{
                                        compareTime(scope.row.goods.expire_at, "time")
                                    }}</span
                                    ><span>{{ scope.row.goods.expire_at }}</span>
                                </div>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('备注')" min-width="200">
                            <template slot-scope="scope">
                                {{ scope.row.goods.mark || scope.row.goods.subtitle }}
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="used_by_self" :label="$t('是否使用')">
                        <template slot-scope="scope">
                            {{ scope.row.used_by_self ? "是" : "否" }}

                            <el-button
                                v-show="!scope.row.used_by_self"
                                type="text"
                                size="mini"
                                @click="onKeyCodeUsedClick(scope.row)"
                                >（标记使用）</el-button
                            >
                        </template>
                    </el-table-column> -->
                    </el-table>
                    <el-alert
                        v-else
                        class="m-credit-null m-packet-null"
                        :title="$t('没有找到任何记录')"
                        type="info"
                        center
                        show-icon
                    ></el-alert>
                    <el-pagination
                        v-if="showPagination"
                        @current-change="currentChange"
                        class="m-credit-pages"
                        background
                        :page-size="per"
                        :hide-on-single-page="true"
                        :current-page.sync="page"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </el-tab-pane>
            </el-tabs>
            <div class="u-only" v-if="tab !== 'virtual'">
                <el-switch v-model="onlyNew" :active-text="$t('仅查看未使用')"></el-switch>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getKeycodeList,
    getSnList,
    activationKeycode,
    activationSn,
    markSn,
    markKeycode,
    getVirtualCode,
} from "@/service/card.js";
import { getVirtual } from "@/service/goods";
import keycodeOptions from "@/assets/data/card_keycode.json";
import snOptions from "@/assets/data/card_sn.json";

// import _ from "lodash";
export default {
    name: "card",
    data: function () {
        return {
            loading: false,
            per: 10,
            page: 1,
            total: 0,

            tab: "keycode",
            list: [],

            keycodeOptions,
            snOptions,
            showPagination: true,
            onlyNew: false,
            virtualList: [],
        };
    },

    computed: {
        params() {
            return {
                tab: this.tab,
                pageIndex: this.page,
                pageSize: this.per,
            };
        },
        loadName() {
            return "load" + this.tab.slice(0, 1).toUpperCase() + this.tab.slice(1);
        },
        filteredList() {
            return this.onlyNew ? this.list.filter((i) => !i.used_by_self) : this.list;
        },
    },
    methods: {
        // 获取一卡通列表
        loadKeycode() {
            this.loading = true;
            this.$router.push({
                name: "card",
                query: {
                    tab: "keycode",
                    page: this.page,
                },
            });
            this.showPagination = false;
            getKeycodeList(this.params)
                .then((res) => {
                    let list = res.data.data.list || [];
                    this.list = list.map((item) => {
                        item.code = "";
                        return item;
                    });
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                    this.showPagination = true;
                });
        },
        // 获取激活码列表
        loadSn() {
            this.loading = true;
            this.$router.push({
                name: "card",
                query: {
                    tab: "sn",
                    page: this.page,
                },
            });
            this.showPagination = false;
            getSnList(this.params)
                .then((res) => {
                    let list = res.data.data.list || [];
                    this.list = list.map((item) => {
                        item.sn = "";
                        item.code = "";
                        return item;
                    });
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                    this.showPagination = true;
                });
        },
        // 获取激活码列表
        loadVirtual() {
            this.loading = true;
            this.$router.push({
                name: "card",
                query: {
                    tab: "virtual",
                    page: this.page,
                },
            });
            this.showPagination = false;
            getVirtual({ sub_category: "codesn", virtual_type: 1 })
                .then((res) => {
                    let list = res.data.data.list || [];
                    this.virtualList = list.map((item) => {
                        item.goods.goods_secret = "";
                        return item;
                    });
                    this.total = res.data.data.page.total;
                })
                .finally(() => {
                    this.loading = false;
                    this.showPagination = true;
                });
        },
        //  获取单个卡密
        getKeycode(index, row) {
            this.$prompt(this.$t("请输入密码"), this.$t("提示"), {
                confirmButtonText: this.$t("确定"),
                cancelButtonText: this.$t("取消"),
                inputType: "password",
            }).then(({ value }) => {
                activationKeycode(row.id, { password: value }).then((res) => {
                    let { code, key } = res.data.data;
                    row.code = code;
                    row.key = key;
                    this.$set(this.list, index, row);
                });
            });
        },
        //  获取单个激活码
        getSn(index, row) {
            this.$prompt(this.$t("请输入密码"), this.$t("提示"), {
                confirmButtonText: this.$t("确定"),
                cancelButtonText: this.$t("取消"),
                inputType: "password",
            }).then(({ value }) => {
                activationSn(row.id, { password: value }).then((res) => {
                    row.code = res.data.data.sn;
                    this.$set(this.list, index, row);
                });
            });
        },
        // 获取虚拟卡密
        getVirtualCode(index, row) {
            this.$prompt(this.$t("请输入密码"), this.$t("提示"), {
                confirmButtonText: this.$t("确定"),
                cancelButtonText: this.$t("取消"),
                inputType: "password",
            }).then(({ value }) => {
                getVirtualCode(row.goods.id, { password: value }).then((res) => {
                    let { good_number, goods_secret } = res.data.data;
                    row.goods.good_number = good_number;
                    row.goods.goods_secret = goods_secret;
                    this.$set(this.virtualList, index, row);
                });
            });
        },
        // 判断过期时间
        compareTime(date, type) {
            const key = new Date(date).getTime() > Date.now() ? 0 : 1;
            const _tag = {
                0: "green",
                1: "gray",
            };
            const _status = {
                0: "未过期",
                1: "已过期",
            };

            return type == "tag" ? _tag[key] : _status[key];
        },

        // 标记使用
        onKeyCodeUsedClick(row) {
            this.$confirm(this.$t("确认标记为已使用吗？"), this.$t("提示"), {
                confirmButtonText: this.$t("确定"),
                cancelButtonText: this.$t("取消"),
                type: "warning",
            })
                .then(() => {
                    markKeycode(row.id, "used").then((res) => {
                        this.$message({
                            type: "success",
                            message: this.$t("标记成功!"),
                        });
                        this.loadKeycode();
                    });
                })
                .catch(() => {});
        },
        onSnUsedClick(row) {
            this.$confirm(this.$t("确认标记为已使用吗？"), this.$t("提示"), {
                confirmButtonText: this.$t("确定"),
                cancelButtonText: this.$t("取消"),
                type: "warning",
            })
                .then(() => {
                    markSn(row.id, "used").then((res) => {
                        this.$message({
                            type: "success",
                            message: this.$t("标记成功!"),
                        });
                        this.loadSn();
                    });
                })
                .catch(() => {});
        },

        onCopy: function (val) {
            this.$notify({
                title: this.$t("复制成功"),
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function () {
            this.$notify.error({
                title: this.$t("复制失败"),
                message: this.$t("请手动复制"),
            });
        },
        currentChange(val) {
            this.page = val;
            this[this.loadName]();
        },
        tabClick(tab) {
            this.page = 1;
            this.tab = tab.name;
            this[this.loadName]();
        },
    },
    mounted() {
        if (this.$route.query.tab) this.tab = this.$route.query.tab;
        this.page = Number(this.$route.query.page || 1);
        this.loadName && this[this.loadName]();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/keycode.less";
</style>
