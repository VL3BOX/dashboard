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
            <div class="m-order">
                <div class="m-address">
                    <div class="u-line u-name">
                        <span class="u-label">收货地址：</span>
                        <span class="u-value">
                            {{ address.actual_contact }} , {{ address.actual_phone }} ,
                            {{ address.actual_address }}
                        </span>
                    </div>
                    <div class="u-line u-order">
                        <span class="u-label">订单编号：</span>
                        <span class="u-value">{{ address.order_no }}</span>
                    </div>
                    <div class="u-line u-remark">
                        <span class="u-label">留言：</span>
                        <span class="u-value">{{ address.remark || "-" }}</span>
                    </div>
                </div>
                <div class="m-goods"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getOrderId } from "@/service/goods";
export default {
    name: "record",
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
        goods() {
            return this.data.order;
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
