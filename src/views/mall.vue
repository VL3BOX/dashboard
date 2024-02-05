<template>
    <uc icon="el-icon-shopping-bag-1" :title="$t('订单中心')" :tabList="tabList">
        <div class="m-page-record p-mall-orders" v-loading="loading">
            <div class="m-content">
                <el-table :data="list" size="small">
                    <el-table-column prop="order.created_at" :label="$t('兑换时间')" width="180"> </el-table-column>
                    <el-table-column :label="$t('兑换商品')">
                        <template slot-scope="scope">
                            <div class="m-line">
                                {{ scope.row.goods.title }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('订单号')">
                        <template slot-scope="scope">
                            <div class="m-line">
                                {{ scope.row.order.order_no }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="order.goods_num" :label="$t('数量')" width="80"> </el-table-column>
                    <el-table-column :label="$t('订单状态')" width="160">
                        <template slot-scope="scope">
                            {{ orderStatus[scope.row.order.order_status] }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('付款状态')" width="160">
                        <template slot-scope="scope">
                            {{ payStatus[scope.row.order.pay_status] }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('是否为赠送')" width="160">
                        <template slot-scope="scope">
                            {{ scope.row.order.is_vitural_gift_order ? "是" : "否" }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="order.remark" :label="$t('备注')"> </el-table-column> -->

                    <el-table-column :label="$t('操作')" min-width="220">
                        <template slot-scope="scope">
                            <div class="m-button">
                                <!-- <template v-if="scope.row.goods.sub_category !== 'emotion'"> -->
                                <el-button size="small" @click="showDetail(scope.row)" icon="el-icon-link">
                                    {{ $t('查看详情') }}
                                </el-button>
                                <!-- </template> -->

                                <!-- 未支付 -->
                                <el-button
                                    size="small"
                                    type="primary"
                                    icon="el-icon-position"
                                    v-if="showPay(scope.row.order)"
                                    @click="toPay(scope.row)"
                                    >{{ $t('点击支付') }}</el-button
                                >

                                <!-- 已发货操作： 确认收货&申请退货 -->
                                <template v-if="scope.row.order.order_status == 3">
                                    <el-button
                                        size="small"
                                        type="success"
                                        icon="el-icon-circle-check"
                                        @click="isReceipt(scope.row.order.id)"
                                        >{{ $t('确认收货') }}</el-button
                                    >
                                    <!-- <el-button type="text">{{ $t('申请退货') }}</el-button> -->
                                </template>

                                <!-- 未发货允许操作： 取消订单 -->
                                <el-popconfirm
                                    :confirm-button-text="$t('确定')"
                                    :cancel-button-text="$t('取消')"
                                    icon="el-icon-info"
                                    :title="$t('确定取消吗？')"
                                    @confirm="cancel(scope.row.order.id)"
                                >
                                    <el-button
                                        v-if="scope.row.order.order_status == 0"
                                        size="small"
                                        slot="reference"
                                        type="info"
                                        plain
                                        icon="el-icon-circle-close"
                                        >{{ $t('取消订单') }}</el-button
                                    >
                                </el-popconfirm>

                                <!-- 已收货操作： 评价 -->
                                <template v-if="scope.row.order.order_status == 4">
                                    <el-button @click="handleShow('comment', scope.row.order.id)" type="text" size="small">
                                        {{ $t('评价商品') }}
                                    </el-button>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="m-record-pages">
                <el-pagination
                    background
                    layout="total, prev, pager, next,jumper"
                    :page-size="pageSize"
                    :total="total"
                    :current-page.sync="pageIndex"
                    :hide-on-single-page="true"
                ></el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <GoodComment :order_id="order_id" :type="type" @close="handleClose" />
        </el-dialog>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import GoodComment from "@/components/form/comment.vue";
import { getOrder, closeOrder, toPay, toConfirm } from "@/service/goods";
import { payStatus, orderStatus } from "@/assets/data/mall.json";
import { mallTab } from "@/assets/data/tabs.json";
export default {
    name: "mall",
    components: {
        uc,
        GoodComment,
    },
    data: function () {
        return {
            list: [],

            total: 0,
            pageIndex: 1,
            pageSize: 10,
            loading: false,

            payStatus,
            orderStatus,

            order_id: "",

            tabList: mallTab,
            dialogVisible: false,
            type: "",
        };
    },
    computed: {
        params() {
            const _params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            };
            return _params;
        },
        params_pageIndex() {
            return this.$route.params.pageIndex;
        },
        title() {
            const data = {
                comment: "商品评价",
                append: "追加评价",
            };
            return data[this.type] || "";
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function () {
                this.load();
            },
        },
        params_pageIndex: {
            immediate: true,
            handler: function (val) {
                if (val) this.pageIndex = val;
            },
        },
    },
    methods: {
        load() {
            this.loading = true;
            getOrder(this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
                this.loading = false;
            });
        },
        // 显示支付按钮
        showPay({ order_status, pay_status }) {
            if (order_status == 1 || order_status == 2 || order_status == 7) return false;
            return pay_status == 0 ? true : false;
        },
        // 查看详情
        showDetail({ order }) {
            this.$router.push({
                name: "order-detail",
                params: {
                    id: order.id,
                    pageIndex: this.pageIndex,
                },
            });
        },
        // 关闭订单
        cancel(id) {
            closeOrder(id).then(() => {
                this.$message({
                    message: this.$t("关闭订单成功"),
                    type: "success",
                });
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.order_status = 1;
                    return item;
                });
            });
        },
        // 付款
        toPay(row) {
            const id = row.order.id;
            toPay(id).then(() => {
                this.$message({
                    message: this.$t("付款成功"),
                    type: "success",
                });
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.pay_status = 1;
                    return item;
                });
            });
        },
        // 确认收货
        isReceipt(id) {
            toConfirm(id).then(() => {
                this.$message({
                    message: this.$t("收货成功"),
                    type: "success",
                });
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.order_status = 4;
                    return item;
                });
            });
        },
        handleShow(type, id) {
            this.type = type;
            this.order_id = id;
            this.dialogVisible = true;
        },
        handleClose(id) {
            this.dialogVisible = false;
            this.order_id = "";
            this.type = "";
            if (id) {
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.order_status = 5;
                    return item;
                });
            }
        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/record.less";
</style>
