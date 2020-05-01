<template>
    <div class="m-publish-title">
        <el-divider content-position="left">标题</el-divider>
        <el-input
            v-model="title"
            maxlength="30"
            minlength="2"
            show-word-limit
        ></el-input>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "Title",
    props: ["title"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>
