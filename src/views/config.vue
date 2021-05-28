<template>
    <div class="m-dashboard m-dashboard-config">
        <h2 class="u-title"><i class="el-icon-setting"></i> 同步设置</h2>
        <el-form label-position="left" label-width="120px">
            <!-- <el-form-item label="评论邮件通知">
                <el-switch v-model="conf.cmt_email" active-color="#13ce66" active-text="开启" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item> -->
            <el-form-item label="快捷键">
                <el-switch v-model="conf.hotkey" active-color="#13ce66" active-text="同步"  :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="游戏设置">
                <el-switch v-model="conf.game_setting" active-color="#13ce66" active-text="同步"  :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="自定义界面">
                <el-switch v-model="conf.custom_ui" active-color="#13ce66" active-text="同步"  :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="插件设置">
                <el-switch v-model="conf.plugin_setting" active-color="#13ce66" active-text="同步"  :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="成就进度">
                <el-switch v-model="conf.achievement_process" active-color="#13ce66" active-text="同步"  :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <!-- <el-form-item label="" class="u-btns">
                <el-button class="u-publish" type="primary" @click="submit" disabled
                    >保存</el-button
                >
            </el-form-item> -->
        </el-form>
    </div>
</template>

<script>
// import { getConf, setConf } from "@/service/profile";
export default {
    name: "config",
    props: [],
    data: function() {
        return {
            conf: {
                // cmt_email: 0,
                hotkey:false,
                game_setting:false,
                custom_ui:false,
                plugin_setting:false,
                achievement_process:false,
                plugin_setting_my : false,
                plugin_setting_lr : false,
                plugin_setting_jx : false,
                plugin_setting_fy : false,
            },
        };
    },
    computed: {},
    methods: {
        submit: function() {
            // setConf(this.conf).then((res) => {
            //     this.$message({
            //         message: '设置更新成功',
            //         type: 'success'
            //     });
            // })
        },
        load: function() {
            // getConf().then((res) => {
            //     this.conf = res.data.data
            // })
        },
    },
    mounted: function() {
        // this.load();
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/config.less";
</style>
