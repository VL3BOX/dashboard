<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
export default {
    name: "frame",
    props: [],
    data: function() {
        return {
            tabList: [
                { name: "frame", icon: "el-icon-camera", label: "头像框" },
                { name: "theme", icon: "el-icon-s-shop", label: "主题风格" },
                { name: "emotion", icon: "el-icon-picture-outline-round", label: "表情包" },
                { name: "honor", icon: "el-icon-s-flag", label: "称号" }
            ],
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
