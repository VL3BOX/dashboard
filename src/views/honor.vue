<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <template #header>
            <a class="u-link" href="/vip/mall">前往获取装扮</a>
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
    data: function() {
        return {
            tabList: themeTab,
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        uc
    },
}
</script>
