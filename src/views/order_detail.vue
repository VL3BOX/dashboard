<template>
    <div class="m-mall-detail">
        <div class="m-breadcrumb">
            <span @click="goBack" class="u-back"><i class="el-icon-arrow-left"></i> 返回</span>
        </div>

        <div class="m-content">
            <!-- 订单进度条 -->
            <el-steps :active="2" finish-status="success" align-center>
                <el-step title="兑换商品" description="2022-12-24 12:22:54"></el-step>
                <el-step title="积分扣除" description="2022-12-24 12:22:54"></el-step>
                <el-step title="物品发货" description="2022-12-24 12:22:54"></el-step>
                <el-step title="确认收货" description=""></el-step>
                <el-step title="评价" description=""></el-step>
                <el-step title="订单关闭" description=""></el-step>
            </el-steps>

            <!-- 订单详情 -->
            <div class="m-order" v-if="order">
                <div class="m-address">
                    <div class="u-line u-name">
                        <span class="u-label">收货地址：</span>
                        <span class="u-value">
                            {{ address.actual_contact }} , {{ address.actual_phone }} ,
                            {{ address.actual_address }}
                        </span>
                    </div>
                    <div class="u-line u-order">
                        <span class="u-label">下单时间：</span>
                        <span class="u-value">{{ order.created_at }}</span>
                    </div>
                    <div class="u-line u-order">
                        <span class="u-label">订单编号：</span>
                        <span class="u-value">{{ order.order_no }}</span>
                    </div>
                    <div class="u-line u-remark">
                        <span class="u-label">留言：</span>
                        <span class="u-value">{{ address.remark || "-" }}</span>
                    </div>
                </div>
                <div class="m-goods">
                    <img class="u-img" :src="goods.goods_images[0]" />
                    <div class="m-info">
                        <span class="u-title">{{ goods.title }}</span>
                        <span>购买数量：{{ order.goods_num }}</span>
                        <div class="u-consume">
                            <span>购买消耗：</span>
                            <div class="u-box">
                                <span v-if="goods.price_cny">金箔：<b>{{ goods.price_cny * order.goods_num }}</b></span>
                                <span v-if="goods.price_boxcoin"
                                    >盒币：<b>{{ goods.price_boxcoin * order.goods_num }}</b></span
                                >
                                <span v-if="goods.price_points">积分：<b>{{ goods.price_points * order.goods_num }}</b></span>
                            </div>
                        </div>
                        <span>邮费：{{ goods.postage ? goods.postage / 100 + "元" : "包邮" }}</span>
                        <span v-if="goods.postage">邮费状态：{{ order.postage_status }}</span>
                        <span>支付状态：{{ payStatus[order.pay_status] }} </span>
                        <span>订单状态：{{ orderStatus[order.order_status] }} </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getOrderId } from "@/service/goods";
import { orderStatus, payStatus } from "../assets/data/mall.json";
export default {
    name: "orderDetail",
    data: function () {
        return {
            data: {},
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        address() {
            return this.data.shipAddress || {};
        },
        order() {
            return this.data.order;
        },
        goods() {
            return this.data.goods;
        },
        payStatus() {
            return payStatus;
        },
        orderStatus() {
            return orderStatus;
        },
    },

    methods: {
        load() {
            getOrderId(this.id).then((res) => {
                this.data = res.data.data;
                console.log(this.data);
            });
        },
        goBack() {
            this.$router.go(-1);
        },
    },
    mounted() {
        if (this.id) this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/order_detail.less";
</style>
