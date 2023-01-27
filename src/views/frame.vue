<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { tabList } from "@/assets/data/theme.json";
export default {
    name: "frame",
    props: [],
    data: function() {
        return {
            tabList
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
