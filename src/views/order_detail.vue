<template>
    <div class="m-mall-detail">
        <div class="m-breadcrumb">
            <span @click="goBack" class="u-back"><i class="el-icon-arrow-left"></i> 返回</span>
        </div>

        <div class="m-content">
            <!-- 收货地址 -->
            <!-- 订单详情 -->
        </div>
    </div>
</template>

<script>
import { getOrderId } from "@/service/goods";
export default {
    name: "record",
    data: function () {
        return {
            data: [],
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
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
