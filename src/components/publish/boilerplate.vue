<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader :name="name" :localDraft="localDraft"><slot name="header"></slot></pubheader>

        <el-form :label-position="labelPostion" label-width="80px">
            <!-- 标题 -->
            <post_title :title="title"><slot name="title"></slot></post_title>

            <!-- 栏目特定字段 -->
            <el-divider content-position="left">信息</el-divider>
            <div class="m-publish-info">
                <slot></slot>
            </div>

            <!-- 正文之前 -->
            <el-divider content-position="left">正文</el-divider>
            <div class="m-publish-prepend">
                <el-radio-group v-model="e_mode" class="u-editor-mode">
                    <el-radio-button label="tinymce"></el-radio-button>
                    <el-radio-button label="markdown"></el-radio-button>
                </el-radio-group>

                <upload class="u-editor-upload"/>

                <slot name="prepend"></slot>
            </div>

            <!-- 正文区域 -->
            <div class="m-publish-content">
                <tinymce :content="content" v-show="e_mode == 'tinymce'" />
                <markdown :content="content" v-show="e_mode == 'markdown'" />
            </div>

            <!-- 正文之后 -->
            <el-divider content-position="left">附加</el-divider>
            <div class="m-publish-append">
                <post_tag :tags="tags" v-if="tagEnable"></post_tag>
                <post_excerpt :excerpt="excerpt"></post_excerpt>
                <slot name="append"></slot>
            </div>

            <!-- 扩展功能 -->
            <el-divider content-position="left">扩展</el-divider>
            <div class="m-publish-extend">
                <post_notify :notify="notify" />
                <slot name="extend"></slot>
            </div>

            <!-- 管理功能 -->
            <div class="m-publish-admin" v-if="isAdmin">
                <el-divider content-position="left">管理</el-divider>
                <post_banner :banner="banner" />
            </div>

            <!-- 按钮 -->
            <div class="m-publish-buttons">
                <el-button type="primary" @click="publishPost">发 &nbsp;&nbsp; 布</el-button>
                <el-button type="plain" @click="saveDraft">保存为草稿</el-button>
            </div>
            <action />
        </el-form>
    </div>
</template>

<script>
import pubheader from "./pubheader.vue";
import upload from "./upload.vue";
import tinymce from "./tinymce.vue";
import markdown from "./markdown.vue";
import post_title from "./post_title.vue";
import post_excerpt from "./post_excerpt.vue";
import post_tag from "./post_tag.vue";
import post_notify from "./post_notify.vue";
import post_banner from "./post_banner.vue";
const User = require('@jx3box/jx3box-common/js/user');

export default {
    name: "boilerplate",
    props: [
        "name",
        "localDraft",
        "labelPostion",
        "mode",
        "tagEnable",
        "notify",
        
        "title",
        "content",
        "excerpt",
        "tags",
        "banner"
    ],
    data: function() {
        return {
            e_mode: this.mode,
            isAdmin : User.getInfo().group == 64
        };
    },
    watch : {
        e_mode : function (val){
            this.$store.commit('changeMode',val)
        }
    },
    computed: {},
    methods: {
        publishPost : function (){
            this.$store.commit('publishPost')
        },
        saveDraft : function (){
            this.$store.commit('saveDraft')
        }
    },
    mounted: function() {},
    components: {
        pubheader,
        upload,
        tinymce,
        markdown,
        post_title,
        post_tag,
        post_excerpt,
        post_notify,
        post_banner,
    },
};
</script>

<style lang="less">
.m-publish-box {
    padding:40px;
    .el-divider__text {
        color: #888;
        font-weight: 300;
    }
}
@media screen and (max-width:@ipad){
    .m-publish-box {
        padding:20px;
    }
}

@media screen and (max-width:@phone){
    .el-form-item__label{
        float:none;
    }
    .el-form-item__content{
        margin-left:0 !important;
    }
}

.m-publish-prepend {
    .mb(10px);
    .u-editor-mode {
        .clearfix;
        .fr;
    }
    .clearfix;
}
@media screen and (max-width:@ip5){
    .m-publish-prepend{
        .u-editor-mode{
            float:none;
            .mb(10px);
        }
    }
}

.m-publish-buttons{
    padding:40px 0;
    .x;

    button{
        .w(120px);
    }
}


</style>
