<template>
    <uc class="m-dashboard-honor m-dashboard-skin" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <template #header>
            <a
                class="u-link el-button el-button--default el-button--mini is-round is-plain"
                href="/vip/mall/?type=virtual"
                target="_blank"
                ><i class="el-icon-shopping-cart-2"></i> 前往获取装扮</a
            >
        </template>
        敬请期待。
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { themeTab } from "@/assets/data/tabs.json";
export default {
    name: "honor",
    props: [],
    data: function () {
        return {
            tabList: themeTab,
        };
    },
    computed: {},
    methods: {},
    mounted: function () {},
    components: {
        uc,
    },
};
</script>
