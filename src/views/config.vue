<template>
    <div class="m-dashboard m-dashboard-config">
        <h2 class="u-title"><i class="el-icon-setting"></i> 全局设置</h2>
        <el-form class="m-config-form" label-position="left" label-width="120px">
            <el-form-item label="编辑器模式">
                <el-radio-group v-model="conf.editor_mode" size="small">
                    <el-radio-button label="tinymce">可视化</el-radio-button>
                    <el-radio-button label="markdown">Markdown</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="评论默认排序">
                <el-radio-group v-model="conf.cmt_order" size="small">
                    <el-radio-button label="DESC">最新靠前</el-radio-button>
                    <el-radio-button label="ASC">最早靠前</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="接受赠礼">
                <el-switch v-model="conf.allow_cny" active-color="#13ce66" active-text="开启" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>


            <!-- <el-form-item label="评论邮件通知">
                <el-switch v-model="conf.cmt_email" active-color="#13ce66" active-text="开启" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item> -->

            <!-- <el-form-item label="快捷键">
                <el-switch v-model="conf.hotkey" active-color="#13ce66" active-text="同步" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="游戏设置">
                <el-switch v-model="conf.game_setting" active-color="#13ce66" active-text="同步" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="自定义界面">
                <el-switch v-model="conf.custom_ui" active-color="#13ce66" active-text="同步" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="插件设置">
                <el-switch v-model="conf.plugin_setting" active-color="#13ce66" active-text="同步" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item>
            <el-form-item label="成就进度">
                <el-switch v-model="conf.achievement_process" active-color="#13ce66" active-text="同步" :active-value="1" :inactive-value="0" disabled></el-switch>
            </el-form-item> -->
            <el-form-item label="" class="u-btns">
                <el-button class="u-publish" type="primary" @click="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getUserConf, setUserConf } from "@/service/conf";
export default {
    name: "config",
    props: [],
    data: function() {
        return {
            conf: {
                cmt_email: 0,
                cmt_order: "DESC",
                editor_mode: "tinymce",
                allow_cny: 1,
                // hotkey: false,
                // game_setting: false,
                // custom_ui: false,
                // plugin_setting: false,
                // achievement_process: false,
                // plugin_setting_my: false,
                // plugin_setting_lr: false,
                // plugin_setting_jx: false,
                // plugin_setting_fy: false,
            },
        };
    },
    computed: {
    },
    methods: {
        loadData: function() {
            getUserConf().then((res) => {
                this.conf = res?.data?.data;
            });
        },
        submit: function() {
            setUserConf(this.conf).then((res) => {
                this.$message({
                    message: "设置更新成功",
                    type: "success",
                });
            });
        },
    },
    mounted: function() {
        this.loadData();
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/config.less";
</style>
