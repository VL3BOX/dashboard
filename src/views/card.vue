<template>
    <div class="m-dashboard-card m-credit">
        <h2 class="u-title"><i class="el-icon-bank-card"></i> 我的卡密</h2>
        <el-tabs type="border-card" v-model="tab">
            <el-tab-pane label="一卡通" name="card">
                <el-table class="m-table" :data="list" show-header cell-class-name="u-table-cell" header-cell-class-name="u-header-cell" v-loading="loading">
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">{{ scope.row.type =='seasun_ykt'?'金山一卡通':'其他'}}</template>
                    </el-table-column>
                    <el-table-column prop="subtype" label="渠道">
                        <template slot-scope="scope">{{ subtypes[scope.row.subtype]  }}</template>
                    </el-table-column>
                    <el-table-column label="面额" width="80">
                        <template slot-scope="scope">{{ scope.row.count}}</template>
                    </el-table-column>
                    <el-table-column label="激活码" width="320">
                        <template slot-scope="scope">
                            <div class="u-card">
                                <div class="u-count">
                                    <div>卡号：**************** <el-button v-if="show" type="primary" @click="open" size="mini" plain>点击复制</el-button>
                                    </div>
                                    <div>卡密：**************** <el-button v-if="show" type="primary" @click="open" size="mini" plain>点击复制</el-button>
                                    </div>
                                </div>
                                <el-button v-if="!show" type="primary" icon="el-icon-view" @click="toCard(scope.row.id)" size="small" plain>点击查看</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="过期时间" width="140">
                        <template slot-scope="scope">{{ scope.row.expire_at || '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="激活码" name="code">
                <el-table class="m-table" :data="list" show-header cell-class-name="u-table-cell" header-cell-class-name="u-header-cell" v-loading="loading">
                    <el-table-column prop="type" label="类型">
                        <template slot-scope="scope">{{types[scope.row.type] }}</template>
                    </el-table-column>
                    <el-table-column prop="subtype" label="渠道">
                        <template slot-scope="scope">{{ subtypes[scope.row.subtype]  }}</template>
                    </el-table-column>
                    <el-table-column label="激活码" width="300">
                        <template slot-scope="scope">
                            <div class="u-card">
                                <span>****************</span>
                                <el-button v-if="!show" type="primary" icon="el-icon-view" @click="toCard(scope.row.id)" size="small" plain>点击查看</el-button>
                                <el-button v-else type="primary" size="mini" plain>点击复制</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="过期时间" width="140">
                        <template slot-scope="scope">{{ scope.row.expire_at || '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
import { getCardList, getCodeList, sendCard, sendCode } from "@/service/card.js";

export default {
    name: "card",
    data: function () {
        return {
            loading: false,
            tab: "",
            types: {
                tf: "体服激活码",
                game: "游戏内激活码",
            },
            code_types: {
                tf: "体服激活码",
                game: "游戏内激活码",
            },
            subtypes: {
                jdt_tf: "百强体服激活码",
                point_lottery: "积分抽奖",
                boxcoin: "盒币兑换",
            },
            show: false,
            list: [],
        };
    },
    computed: {},
    watch: {
        tab(tab) {
            this.list = [];
            tab == "card" ? this.loadCard() : this.LoadCode();
            this.$router.push({ name: "card", query: { tab } });
        },
    },
    methods: {
        loadCard() {
            this.loading = true;
            getCardList()
                .then((res) => {
                    this.list = res.data.data.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        LoadCode() {
            this.loading = true;
            getCodeList()
                .then((res) => {
                    this.list = res.data.data.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        toCard(id) {
            this.$prompt("请输入密码", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(({ password }) => {
                sendCard(id, { password }).then((res) => {
                    console.log(res);
                });
            });
        },
        toCode(id) {
            this.$prompt("请输入密码", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(({ password }) => {
                sendCode(id, { password }).then((res) => {
                    console.log(res);
                });
            });
        },
        cardStatus(key) {
            let data = {
                0: "未使用",
                1: "已使用",
                2: "无效",
            };
            return data[key];
        },
    },
    mounted: function () {
        this.tab = this.$route.query.tab ? this.$route.query.tab : "card";
    },
};
</script>

<style lang='less'>
    @import "~@/assets/css/card.less";
</style>