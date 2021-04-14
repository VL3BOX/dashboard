<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-orders">
        <div class="m-dashboard-orders-cont">
            <!-- title -->
            <h2 class="u-title">
                <span class="i-title">
                    <i class="el-icon-shopping-bag-1"></i> 我的订单
                </span>
            </h2>
            <!-- 表单 -->
            <div class="m-order-list" v-if="list && list.length">
                <table>
                    <thead>
                        <th>订单编号</th>
                        <th>产品</th>
                        <th>金额</th>
                        <th>支付方式</th>
                        <th>交易号</th>
                        <th>交易状态</th>
                        <th>订单创建时间</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in list" :key="i">
                            <td>{{item.id}}</td>
                            <td>{{item.product_id | showProduct}}</td>
                            <td>¥{{item.total_fee | showPrice}}</td>
                            <td>{{item.pay_type | showPayType}}</td>
                            <td>{{item.transaction_id}}</td>
                            <td>{{item.pay_status | showPayStatus}}</td>
                            <td>{{item.created_time | showTime}}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 分页 -->
                <div class="m-order-pages">
                    <el-pagination
                        background
                        layout="total, prev, pager, next,jumper"
                        :page-size="per"
                        :total="total"
                        :current-page.sync="page"
                    ></el-pagination>
                </div>
            </div>
            <div class="m-order-null" v-else>
                <el-alert title="还有任何订单记录" type="info" show-icon></el-alert>
            </div>
        </div>
    </div>
</template>
<script>
import { getOrderslist } from "@/service/order.js";
import { products, pay_status, pay_types } from "@/assets/data/pay_order.json";
import {showTime } from '@jx3box/jx3box-common/js/moment'
export default {
    name: "oeders",
    props: [],
    data: function () {
        return {
            list: [],
            per: 10,
            total: 1,
            page: 1,
        };
    },
    computed: {
        params: function () {
            return {
                pageIndex: this.page,
                pageSize: this.per,
            };
        },
    },
    methods: {
        loadData() {
            getOrderslist(this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
            });
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    filters: {
        showProduct: function (val) {
            return products[val];
        },
        showPayStatus : function (val){
            return pay_status[val]
        },
        showPayType : function (val){
            return pay_types[val]
        },
        showPrice : function (val){
            return val ? (val / 100).toFixed(2) : '0.00'
        },
        showTime
    },
    mounted: function () {},
};
</script>
<style scoped lang="less">
@import "../assets/css/orders.less";
</style>
