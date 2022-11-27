<template>
    <div class="m-page-record">
        <!-- 标题 -->
        <h2 class="u-title">
            <span class="i-title"> <i class="el-icon-document"></i> 商城订单</span>
        </h2>
        <!--  -->
        <div class="m-content">
            <el-table :data="list">
                <el-table-column prop="order.created_at" label="时间" width="180"> </el-table-column>
                <el-table-column prop="goods.title" label="标题" width="180"> </el-table-column>
                <el-table-column prop="order.order_no" label="订单号" width="180"> </el-table-column>
                <el-table-column prop="order.goods_num" label="数量" width="80"> </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        {{ scope.row.order.order_status }}
                    </template>
                </el-table-column>
                <el-table-column label="付款状态">
                    <template slot-scope="scope">
                        {{ scope.row.order.pay_status }}
                    </template>
                </el-table-column>
                <el-table-column prop="order.remark" label="备注"> </el-table-column>

                <el-table-column label="操作" min-width="200px">
                    <template slot-scope="scope">
                        <div class="m-button">
                            <el-button type="text" @click="showDetail(scope.row.order.id)">查看详情</el-button>
                            <el-popconfirm
                                confirm-button-text="确定"
                                cancel-button-text="取消"
                                icon="el-icon-info"
                                title="确定取消吗？"
                                @confirm="cancel(scope.row.order.id)"
                            >
                                <el-button slot="reference" type="text">取消订单</el-button>
                            </el-popconfirm>
                            <!-- <el-button type="text" @click="edit(item)">确认收货</el-button>
                            <el-button type="text" @click="edit(item)">评价商品</el-button> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getOrder } from "@/service/goods";
export default {
    name: "record",
    data: function () {
        return {
            list: [],

            total: 0,
            pageIndex: 1,
            pageSize: 1,
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
    },
    methods: {
        load() {
            getOrder(this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
            });
        },
        showDetail(id) {
            console.log(id)
        },
        cancel(id) {},
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/record.less";
</style>
