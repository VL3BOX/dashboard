<template>
    <div class="m-page-record">
        <!-- 标题 -->
        <h2 class="u-title">
            <span class="i-title"> <i class="el-icon-document"></i> 商城订单</span>
        </h2>
        <!--  -->
        <div class="m-content">
            <el-table :data="list">
                <el-table-column prop="order.created_at" label="兑换时间" width="180"> </el-table-column>
                <el-table-column label="兑换商品">
                    <template slot-scope="scope">
                        <div class="m-line">
                            {{ scope.row.goods.title }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单号">
                    <template slot-scope="scope">
                        <div class="m-line">
                            {{ scope.row.order.order_no }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order.goods_num" label="数量" width="80"> </el-table-column>
                <el-table-column label="订单状态" width="160">
                    <template slot-scope="scope">
                        {{ orderStatus[scope.row.order.order_status] }}
                    </template>
                </el-table-column>
                <el-table-column label="付款状态" width="160">
                    <template slot-scope="scope">
                        {{ payStatus[scope.row.order.pay_status] }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="order.remark" label="备注"> </el-table-column> -->

                <el-table-column label="操作" min-width="200px">
                    <template slot-scope="scope">
                        <div class="m-button">
                            <el-button type="text" @click="showDetail(scope.row.order.id)">查看详情</el-button>
                            <!-- 未支付 -->
                            <el-button type="text" v-if="showPay(scope.row.order)" @click="toPay(scope.row)">
                                点击支付
                            </el-button>
                            <!-- 未发货允许操作： 取消订单 -->
                            <el-popconfirm
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                                icon="el-icon-info"
                                title="确定取消吗？"
                                @confirm="cancel(scope.row.order.id)"
                            >
                                <el-button v-if="scope.row.order.order_status == 0" type="text" slot="reference"
                                    >取消订单</el-button
                                >
                            </el-popconfirm>
                            <!-- 已发货操作： 确认收货&申请退货 -->
                            <template v-if="scope.row.order.order_status == 3">
                                <el-button type="text" @click="isReceipt">确认收货</el-button>
                                <!-- <el-button type="text">申请退货</el-button> -->
                            </template>

                            <!-- 已收货操作： 评价 -->
                            <!-- <template v-if="scope.row.order.order_status == 4">
                                <el-button type="text">评价商品</el-button>
                            </template> -->
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
</template>

<script>
import { getOrder, closeOrder, toPay } from "@/service/goods";
import { payStatus, orderStatus } from "@/assets/data/mall.json";
export default {
    name: "record",
    data: function () {
        return {
            list: [],

            total: 0,
            pageIndex: 1,
            pageSize: 10,

            payStatus,
            orderStatus,

            order_id: "",
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
            getOrder(this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
            });
        },
        // 显示支付按钮
        showPay({ order_status, pay_status }) {
            if (order_status == 1 || order_status == 2 || order_status == 7) return false;
            return pay_status == 0 ? true : false;
        },
        // 查看详情
        showDetail(id) {
            this.$router.push({
                name: "order-detail",
                params: {
                    id,
                    pageIndex: this.pageIndex,
                },
            });
        },
        // 关闭订单
        cancel(id) {
            closeOrder(id).then((res) => {
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
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.pay_status = 1;
                    return item;
                });
            });
        },
        // 确认收货
        isReceipt(id) {},
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/record.less";
</style>
