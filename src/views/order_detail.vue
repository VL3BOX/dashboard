<template>
    <div class="m-mall-detail">
        <div class="m-breadcrumb">
            <span @click="goBack" class="u-back"><i class="el-icon-arrow-left"></i> 返回</span>
        </div>

        <div class="m-content">
            <div class="m-address el-card">
                <span>收件人：{{ address.actual_contact }}</span>
                <span>联系电话：{{ address.actual_phone }}</span>
                <span>收货地址： {{ address.actual_address }}</span>
            </div>
            <div class="m-order el-card" v-if="goods">
                <img class="u-img" :src="goods.goods_images[0]" />
                <div class="m-box">
                    <span class="u-title">{{ goods.title }}</span>
                    <span>订单编号：{{ order.order_no }}</span>
                    <span>下单时间：{{ order.created_at }}</span>
                    <span>购买数量：{{ order.goods_num }}</span>
                    <span>邮费：{{ goods.postage ? goods.postage / 100 + "元" : "包邮" }}</span>
                    <span>支付状态：{{ payStatus[order.pay_status] }} </span>
                    <span>订单状态：{{ orderStatus[order.order_status] }} </span>
                    <div class="u-consume">
                        <span>购买消耗：</span>
                        <div class="u-box">
                            <span v-if="goods.price_cny"
                                >金箔：<b>{{ goods.price_cny * order.goods_num }}</b></span
                            >
                            <span v-if="goods.price_boxcoin"
                                >盒币：<b>{{ goods.price_boxcoin * order.goods_num }}</b></span
                            >
                            <span v-if="goods.price_points"
                                >积分：<b>{{ goods.price_points * order.goods_num }}</b></span
                            >
                        </div>
                    </div>
                    <span>备注：{{ address.remark || "-" }}</span>
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
