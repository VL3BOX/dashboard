<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        敬请期待新版本。
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { themeTab } from "@/assets/data/tabs.json";
export default {
    name: "frame",
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
