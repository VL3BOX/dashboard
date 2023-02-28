<template>
    <el-tabs class="m-dashboard-tabs" v-model="active" @tab-click="changeTab">
        <el-tab-pane v-for="item in tabs" :key="item.name" :name="item.name">
            <span slot="label"><i :class="item.icon" class="u-tab-icon"></i> {{ item.label }}</span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "",
    props: {
        tabs: {
            type: Array,
            default: () => [],
        }
    },
    data: function () {
        return {
            active: "",
        };
    },
    watch: {
        $route: function () {
            this.active = this.$route.name;
        },
    },
    computed: {},
    methods: {
        changeTab: function () {
            this.$router.push({ name: this.active });
        },
    },
    mounted: function () {
        this.active = this.$route.name;
    },
    components: {},
};
</script>
