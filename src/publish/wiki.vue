<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader name="百科词条"><slot name="header"></slot></pubheader>

        <h1 class="m-publish-wiki-header">贡献词条</h1>
        <el-form
            label-position="left"
            label-width="80px"
            class="m-publish-wiki"
        >
            <el-form-item label="类别" class="m-publish-wiki-type">
                <el-radio-group v-model="primary.type">
                    <el-radio
                        :label="type"
                        border
                        v-for="(label, type) in types"
                        :key="type"
                        >{{ label }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>

            <el-form-item label="名称" class="m-publish-wiki-title">
                <el-input
                    v-model="primary.title"
                    placeholder="请输入词条名称"
                ></el-input>
            </el-form-item>

            <el-form-item label="内容" class="m-publish-wiki-content">
                <Tinymce
                    v-model="primary.content"
                    :attachmentEnable="true"
                    :resourceEnable="true"
                    :height="600"
                />
            </el-form-item>

            <el-form-item label="标签" class="m-publish-wiki-tags">
                <el-tag
                    :key="tag"
                    v-for="tag in primary.tag"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                >
                    {{ tag }}
                </el-tag>
                <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    placeholder="回车以添加"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ 添加标签</el-button
                >
            </el-form-item>

            <el-form-item label="批注" class="m-publish-wiki-remark">
                <el-input
                    v-model="primary.remark"
                    :maxlength="200"
                    :minlength="2"
                    show-word-limit
                    required
                    :rows="3"
                    type="textarea"
                    placeholder="填写本次修订说明"
                ></el-input>
            </el-form-item>

            <el-form-item label="" class="m-publish-wiki-publish">
                <el-button
                    class="u-publish"
                    icon="el-icon-s-promotion"
                    type="primary"
                    @click="publish"
                    :disabled="processing"
                    >提交词条</el-button
                >

                <el-checkbox class="u-anonymous" v-model="primary.anonymous">匿名</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import pubheader from "@/components/publish/pubheader.vue";
import { types } from "@/assets/data/wiki.json";
import Tinymce from "@jx3box/jx3box-editor/src/Tinymce";
import User from "@jx3box/jx3box-common/js/user";
import { addWiki } from "../service/bb";
export default {
    name: "wiki",
    props: [],
    data: function() {
        return {
            primary: {
                wiki_id: "",
                type: "",
                title: "",
                content: "",
                tag: [],
                remark: "",
                reference: [],
                anonymous: 0,
            },
            types,

            inputVisible: false,
            inputValue: "",
        };
    },
    computed: {
        id: function() {
            return this.$route.params.id;
        },
        isNew: function() {
            return !this.id;
        },
        processing: function() {
            return this.$store.state.processing;
        },
    },
    watch: {},
    methods: {
        publish: function() {
            this.$store.commit("startProcess");
            console.log(this.primary)
            addWiki(this.primary).then((res) => {
                console.log(res.data)
                this.success(res);
            });
        },
        success: function(res) {
            this.$message({
                message: res.data.msg || "提交成功",
                type: "success",
            });
            // this.$router.push({ path: "/" });
        },
        loadData: function() {
            // getQuestion(this.id, this).then((res) => {
            //     let data = res.data;
            //     this.primary.title = data.title;
            //     this.primary.type = data.type;
            //     this.primary.options = JSON.parse(data.options);
            //     this.primary.answer = data.answerList;
            //     this.primary.hardStar = data.hardStar;
            //     this.primary.tags = JSON.parse(data.tags);

            //     this.primary.pool = data.pool;

            //     this.primary.whyami = data.whyami;
            // });
        },
        updateTags: function(val) {
            // console.log(val);
            // this.tags = val;
        },
        validate: function() {
            // 1.检查必填项：remark
        },
        handleClose(tag) {
            this.primary.tag.splice(this.primary.tag.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.primary.tag.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
    },
    created: function() {
        if (this.id) {
            this.loadData();
        }
    },
    components: {
        pubheader,
        Tinymce,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/wiki.less";
</style>
