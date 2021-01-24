<template>
    <div class="m-publish-post-collection">
        <el-form-item label="关联文集">
            <el-input v-model.number="local_data" placeholder="请输入文集ID（可选，非必填）"></el-input>
        </el-form-item>
    </div>
</template>

<script>
export default {
    props: ["data"],
    data: function() {
        return {
            local_data : ''
        };
    },
    model: {
        prop: "data",
        event: "update",
    },
    computed: {
    },
    watch: {
        local_data: function(val) {
            this.$emit("update", val);
        },
        data : function (val){
            this.local_data = val
        }
    },
    mounted: function() {
        this.local_data = this.data
    },
};
</script>

<style lang="less">
.m-publish-post-collection {
}
</style>
