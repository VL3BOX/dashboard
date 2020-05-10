<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader :name="name" :localDraft="localDraft"><slot name="header"></slot></pubheader>

        <el-form :label-position="labelPostion" label-width="80px">
            <!-- 标题 -->
            <post_title :title="title"><slot name="title"></slot></post_title>

            <!-- 栏目特定字段 -->
            <div class="m-publish-info" v-if="infoEnable">
                <el-divider content-position="left">信息</el-divider>
                <slot></slot>
            </div>

            <!-- 正文之前 -->
            <div class="m-publish-prepend">
                <el-divider content-position="left">正文</el-divider>
                <el-radio-group v-model="e_mode" class="u-editor-mode">
                    <el-radio-button label="tinymce"></el-radio-button>
                    <el-radio-button label="markdown" v-if="markdownEnable"></el-radio-button>
                </el-radio-group>

                <upload class="u-editor-upload"/>

                <slot name="prepend"></slot>
            </div>

            <!-- 正文区域 -->
            <div class="m-publish-content">
                <tinymce :content="content" v-show="e_mode == 'tinymce'" />
                <markdown v-if="markdownEnable" :content="content" v-show="e_mode == 'markdown'" />
            </div>

            <!-- 正文之后 -->
            <div class="m-publish-append" v-if="excerptEnable">
                <el-divider content-position="left">附加</el-divider>
                <post_tag :tags="tags" v-if="tagEnable"></post_tag>
                <post_excerpt :excerpt="excerpt"></post_excerpt>
                <slot name="append"></slot>
            </div>

            <!-- 扩展功能 -->
            <div class="m-publish-extend" v-if="notifyEnable">
                <el-divider content-position="left">扩展</el-divider>
                <post_notify :notify="notify" />
                <slot name="extend"></slot>
            </div>

            <!-- 管理功能 -->
            <div class="m-publish-admin" v-if="isAdmin"> 
                <el-divider content-position="left">管理</el-divider>
                <post_banner :banner="banner" v-if="bannerEnable"/>
            </div>
         
            <!-- 按钮 -->
            <div class="m-publish-buttons">
                <el-button type="primary" @click="publish">发 &nbsp;&nbsp; 布</el-button>
                <el-button type="plain" @click="draft">保存为草稿</el-button>
            </div>
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
import { autoSavePost } from "@/utils/autoSave";
import User from '@jx3box/jx3box-common/js/user';

export default {
    name: "boilerplate",
    props: [
        "name",
        "type",
        "localDraft",
        "labelPostion",
        "title",
        "infoEnable",

        "mode",
        "markdownEnable",
        "content",

        "excerptEnable",
        "excerpt",

        "tagEnable",
        "tags",

        "notifyEnable",
        "notify",
        
        "bannerEnable",
        "banner",

        "publishDefault"
    ],
    data: function() {
        return {
            e_mode: this.mode || 'tinymce',
            draft_key : '',
            isAdmin : User.getInfo().group > 30,
        };
    },
    computed: {
        // 引用store
        dbdata: function() {
            return this.$store.state;
        },
    },
    watch : {
        // 反向监听store全部内容受组件影响时,更新本地草稿
        dbdata: {
            handler: function(data) {
                autoSavePost(this.draft_key, data);
            },
            deep: true,
        },
        e_mode : function (val){
            this.$store.commit('changeMode',val)
        },
    },
    methods: {
        publish : function (){
            // 检查标题长度
            let title = this.$store.state.post.post_title.trim()
            if(!title.length){
                this.$message.error('标题不能为空');
                return
            }
            // 使用默认发布接口
            if(this.publishDefault){
                this.doPublish(this.type, this.$store.state, this);
            }

            this.$emit('publish')
        },
        draft : function (){
            // 使用默认发布接口
            if(this.publishDefault){
                this.doDraft(this.type, this.$store.state, this);
            }

            this.$emit('draft')
        }
    },
    mounted: function() {
        this.draft_key = new Date().toUTCString();
    },
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
    padding:30px 40px;
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
