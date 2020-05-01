<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader :name="name"><slot name="header"></slot></pubheader>

        <el-form label-position="top" label-width="80px">
            <!-- 标题 -->
            <Title :title="title"><slot name="title"></slot></Title>

            <!-- 栏目特定字段 -->
            <el-divider content-position="left">信息</el-divider>
            <div class="m-dashboard-publish-info">
                <slot></slot>
            </div>

            <!-- 正文之前 -->
            <el-divider content-position="left">正文</el-divider>
            <div class="m-dashboard-publish-prepend">
                <el-radio-group v-model="e_mode" class="u-editor-mode">
                    <el-radio-button label="tinymce"></el-radio-button>
                    <el-radio-button label="markdown"></el-radio-button>
                </el-radio-group>

                <upload class="u-editor-upload" />

                <slot name="prepend"></slot>
            </div>

            <!-- 正文区域 -->
            <div class="m-dashboard-publish-content">
                <tinymce :content="content" v-show="e_mode == 'tinymce'" />
                <markdown :content="content" v-show="e_mode == 'markdown'" />
            </div>

            <!-- 正文之后 -->
            <el-divider content-position="left">附加</el-divider>
            <div class="m-dashboard-publish-append">
                <pubtag :tags="tags"></pubtag>
                <excerpt :digest="digest"></excerpt>
                <slot name="append"></slot>
            </div>

            <!-- 扩展功能 -->
            <el-divider content-position="left">扩展</el-divider>
            <div class="m-dashboard-publish-extend">
                <notify :notify_conf="notify_conf"/>
                <slot name="extend"></slot>
            </div>

            <!-- 管理功能 -->
            <div class="m-dashboard-publish-admin">
                <el-divider content-position="left">管理</el-divider>
                <banner />
            </div>

            <!-- 按钮 -->
            <action />
        </el-form>
    </div>
</template>

<script>
import pubheader from "./pubheader.vue";
import Title from "./title.vue";
import upload from "./upload.vue";
import tinymce from "./tinymce.vue";
import markdown from "./markdown.vue";
import pubtag from "./pubtag.vue";
import excerpt from "./excerpt.vue";
import notify from "./notify.vue";
import banner from "./banner.vue";
import action from "./action.vue";

export default {
    name: "boilerplate",
    props: ["name", "title", "mode", "content","digest","tags","notify_conf"],
    data: function() {
        return {
            e_mode : this.mode
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        pubheader,
        Title,
        upload,
        tinymce,
        markdown,
        pubtag,
        excerpt,
        notify,
        banner,
        action
    },
};
</script>
