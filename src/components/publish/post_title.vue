<template>
    <div class="m-publish-title">
        <el-divider content-position="left">标题</el-divider>
            <el-input
                v-model="post_title"
                maxlength="30"
                minlength="2"
                show-word-limit
                required
                placeholder="请填写标题"
                @change="done"
            ></el-input>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "post_title",
    props: ["title"],
    data: function() {
        return {
            post_title: this.title,
        };
    },
    computed: {},
    methods: {
        done: function() {
            this.$store.commit("editTitle", this.post_title);
        },
    },
    mounted: function() {},
    components: {},
};
</script>
