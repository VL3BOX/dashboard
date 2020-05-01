<template>
    <div class="m-dashboard-publish-button">
        <el-button type="primary">发 &nbsp;&nbsp; 布</el-button>
        <el-button type="plain">保存为草稿</el-button>
    </div>
</template>

<script>
export default {
    name: "action",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
    .m-dashboard-publish-button{
        padding:40px 0;
        .x;

        button{
            .w(120px);
        }
    }
</style>