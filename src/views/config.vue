<template>
    <div class="m-dashboard m-dashboard-config">
        <h2 class="u-title">通知设置</h2>
        <el-form label-position="left" label-width="120px">
            <el-form-item label="评论邮件通知">
                <el-switch v-model="conf.cmt_email" active-color="#13ce66" active-text="开启" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <!-- <el-form-item label="茗伊插件设置">
                <el-switch v-model="conf.tinymins_status" active-color="#13ce66" active-text="公开"  :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item> -->
            <el-form-item label="" class="u-btns">
                <el-button
                    class="u-publish"
                    type="primary"
                    @click="publish"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getConf, setConf } from "@/service/profile";
export default {
    name: "config",
    props: [],
    data: function() {
        return {
            conf : {
                cmt_email: 0,
                // tinymins_status : 0
            }
        };
    },
    computed: {
    },
    methods: {
        publish: function() {
            setConf(this.conf).then((res) => {
                this.$message({
                    message: '设置更新成功',
                    type: 'success'
                });
            })
        },
        load : function (){
            getConf().then((res) => {
                this.conf = res.data.data
            })
        }
    },
    mounted: function() {
        this.load()
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/dashboard/config.less";
</style>
