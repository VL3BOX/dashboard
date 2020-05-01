<template>
    <div class="m-dashboard-publish-notify">
        <el-switch
            v-model="notify_conf.feedEnable"
            active-color="#0366d6"
            inactive-color="#999"
            active-text="通知订阅用户"
        >
        </el-switch>
        <el-switch
            v-model="notify_conf.followEnable"
            active-color="#0366d6"
            inactive-color="#999"
            active-text="通知粉丝"
        >
        </el-switch>
        <el-switch
            v-model="notify_conf.weiboEnable"
            active-color="#0366d6"
            inactive-color="#999"
            disabled
            active-text="同步至微博文章"
        >
        </el-switch>
        <el-switch
            v-model="notify_conf.tuilanEnable"
            active-color="#0366d6"
            inactive-color="#999"
            disabled
            active-text="同步至推栏"
        >
        </el-switch>
    </div>
</template>

<script>
export default {
    name: "notify",
    props: ['notify_conf'],
    data: function() {
        return {
            
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
.m-dashboard-publish-notify {
    .el-switch {
        .mr(40px);
    }
}
</style>
