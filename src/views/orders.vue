<template>
  <div class="m-dashboard m-dashboard-work m-dashboard-orders">
    <div class="m-dashboard-orders-cont">
      <!-- title -->
      <h2 class="u-title">
        <span class="i-title"> <i class="el-icon-s-order"></i> 我的订单 </span>
      </h2>
      <!-- 表单 -->
      <div class="m-tabel">
        <el-table :data="list" stripe border style="width: 100%">
          <el-table-column prop="created_time" label="日期" width="180"> </el-table-column>
          <el-table-column prop="user_id" label="姓名" width="180"> </el-table-column>
          <el-table-column prop="category" label="地址"> </el-table-column>
          <el-table-column prop="product_id" label="id"> </el-table-column>
          <el-table-column prop="pay_status" label="支付状态"> </el-table-column>
          <el-table-column prop="pay_type" label="支付渠道"> </el-table-column>
          <el-table-column prop="product_price" label="价格"> </el-table-column>
          <el-table-column prop="total_fee" label="实际支付"> </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="m-pages">
        <el-pagination background layout="total, prev, pager, next,jumper" :page-size="per" :total="total" :current-page.sync="page"> </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderslist } from '@/service/order.js'
export default {
  name: 'oeders',
  props: [],
  data: function() {
    return {
      list: [],
      per: 24,
      total: 1,
      page: 1,
    }
  },
  computed: {},
  methods: {
    getlist() {
      getOrderslist()
        .then((res) => {
          this.list = res.data.data.list
          console.log(this.list)
        })
        .catch((err) => {})
    },
  },
  mounted: function() {
    this.getlist()
  },
}
</script>
<style scoped lang="less">
@import '../assets/css/orders.less';
</style>
