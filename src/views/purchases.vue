<template>
    <div class="m-dashboard m-dashboard-work m-dashboard-purchases">
        <h2 class="u-title"><i class="el-icon-shopping-cart-2"></i> 我的购买</h2>
    </div>
</template>


<script>
import { getPurchases } from "@/service/purchases"
export default {
    name: 'purchasesList',
    data () {
        return {
            list: [],
            page: 1,
            limit: 10,
            total: 0,
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        loadData() {
            getPurchases().then(res => {
                this.list = res.data.data.list || []
                this.page = res.data.data.page.index || 1
                this.limit = res.data.data.page.pageSize || 10
                this.total = res.data.data.page.total || 0
            })
        }
    }
}
</script>
