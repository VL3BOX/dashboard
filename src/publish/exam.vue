<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader name="趣味题库" :localDraft="false"
            ><slot name="header"></slot
        ></pubheader>

        <h1 class="m-publish-exam-header">贡献题目</h1>
        <el-form
            label-position="left"
            label-width="80px"
            class="m-publish-exam"
        >
            <el-form-item label="题目" class="m-publish-exam-title">
                <el-input
                    v-model="primary.title"
                    maxlength="120"
                    minlength="2"
                    show-word-limit
                    required
                    :rows="3"
                    type="textarea"
                    placeholder="请填写题目内容"
                ></el-input>
            </el-form-item>
            <el-form-item label="题型" class="m-publish-exam-type">
                <el-radio-group v-model="primary.type">
                    <el-radio label="radio" border>单选题</el-radio>
                    <el-radio label="checkbox" border>多选题</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选项" class="m-publish-exam-options">
                <el-input placeholder="选项1" v-model="primary.options[0]"
                    ><template slot="prepend">A</template></el-input
                >
                <el-input placeholder="选项2" v-model="primary.options[1]"
                    ><template slot="prepend">B</template></el-input
                >
                <el-input placeholder="选项3" v-model="primary.options[2]"
                    ><template slot="prepend">C</template></el-input
                >
                <el-input placeholder="选项4" v-model="primary.options[3]"
                    ><template slot="prepend">D</template></el-input
                >
            </el-form-item>
            <el-form-item label="答案" class="m-publish-exam-answer">
                <el-checkbox-group v-model="primary.answer">
                    <el-checkbox :label="0">A</el-checkbox>
                    <el-checkbox :label="1">B</el-checkbox>
                    <el-checkbox :label="2">C</el-checkbox>
                    <el-checkbox :label="3">D</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="难度" class="m-publish-exam-level">
                <el-rate v-model="primary.hardStar"></el-rate>
            </el-form-item>

            <el-form-item label="标签" class="m-publish-exam-tags">
                <el-tag
                    :key="tag"
                    v-for="tag in primary.tags"
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
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ 添加</el-button
                >
            </el-form-item>

            <el-form-item label="答案解析" class="m-publish-exam-content">
                <tinymce :content="primary.whyami" :height="400" />
                <upload class="u-editor-upload" />
                <el-button
                    class="u-publish"
                    icon="el-icon-s-promotion"
                    type="success"
                    @click="publish"
                    :disabled="processing"
                    >提交题目</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import pubheader from "@/components/publish/pubheader.vue";
import upload from "@/components/publish/upload.vue";
import tinymce from "@/components/publish/tinymce.vue";
import User from "@jx3box/jx3box-common/js/user";
import {postSubject} from '../service/exam'
export default {
    name: "exam",
    props: [],
    data: function() {
        return {
            processing: false,
            inputVisible: false,
            inputValue: "",
            primary: {
                title: "",
                type: "radio",
                options: ["", "", "", ""],
                answer: [],
                hardStar: 0,
                tags: ["PVE", "PVP", "PVX"],
                whyami: "",
                pool: "common"
            },
        };
    },
    computed: {},
    watch: {},
    methods: {
        publish: function() {
            this.processing = true
            this.primary.whyami = this.$store.state.post.post_content
            postSubject(this.primary,this).then((res) => {
                this.$message({
                    message: res.data.msg || '提交成功',
                    type: "success",
                });
                this.$router.push({ path: '/' })
            })
        },
        // TAG
        handleClose(tag) {
            this.primary.tags.splice(this.primary.tags.indexOf(tag), 1);
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
                this.primary.tags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
    },
    mounted: function() {
    },
    components: {
        pubheader,
        upload,
        tinymce,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/exam.less";
</style>
