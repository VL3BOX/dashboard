<!-- 私信系统 -->
<template>
    <uc class="m-dashboard-frame m-dashboard-skin" icon="el-icon-bell" title="我的消息" :tab-list="tabList">

    </uc>
</template>

<script>
import { msgTab } from "@/assets/data/tabs.json";
// components
import uc from "@/components/uc.vue";
export default {
    name: "letter",
    components: {
        uc,
    },
    data() {
        return {
            tabList: msgTab,
        }
    }
}
</script>
