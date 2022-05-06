<template>
    <div class="m-credit m-tasks">
        <h2 class="u-title">
            <i class="el-icon-coffee-cup"></i> 我的任务
        </h2>
        <div class="m-tasks-list">
            <div class="u-item" v-for="item in 4" :key="item">
                <img class="u-img" src="" alt="">
                <div class="u-box">
                    <div class="u-info">
                        <span class="u-title">我是标题</span>
                        <span class="u-desc">我是介绍</span>
                    </div>
                    <div class="u-btn">
                        <el-button type="primary">主要按钮</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//import { demo } from '@/utils/common.js';
//import xSearch from '@/components/search.vue';
export default {
    name: "tasks",
    props: [],
    components: {
        //demo
    },
    data: function () {
        return {
            loading: false,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>
<style lang='less'>
    @import "~@/assets/css/tasks.less";
</style>