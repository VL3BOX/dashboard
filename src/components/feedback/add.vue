<template>
    <div class="m-add-feedback">
        <div class="type-box">
            <el-form inline>
                <el-form-item label="来源">
                    <el-select v-model="form.type" placeholder="请选择问题来源" size="small">
                        <el-option v-for="(value, key) in types" :key="key" :value="key" :label="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类别">
                    <el-select v-model="form.subtype" placeholder="请选择问题类别" size="small">
                        <el-option v-for="(value, key) in subtypes" :key="key" :value="key" :label="value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- <div class="type-box-item">
                <span class="u-label">来源：</span>
                <el-select v-model="form.type" placeholder="请选择问题来源" size="small">
                    <el-option v-for="(value, key) in types" :key="key" :value="key" :label="value"></el-option>
                </el-select>
            </div>
            <div class="type-box-item">
                <span class="u-label">类别：</span>
                <el-select v-model="form.subtype" placeholder="请选择问题类别" size="small">
                    <el-option v-for="(value, key) in subtypes" :key="key" :value="key" :label="value"></el-option>
                </el-select>
            </div> -->
        </div>
        <div class="m-content">
            <el-input v-model="form.content" type="textarea" :rows="10" placeholder="输入反馈内容"></el-input>
        </div>
        <div class="m-feedback-actions">
            <div class="m-feedback-attachment">
                <el-upload
                    ref="upload"
                    class="u-upload avatar-uploader"
                    :action="url"
                    list-type="picture-card"
                    :on-remove="remove"
                    :on-success="done"
                    :on-error="fail"
                    :on-exceed="exceed"
                    :before-upload="beforeUpload"
                    :limit="max"
                    title="上传图片"
                    with-credentials
                    accept="image/jpg, image/jpeg, image/gif, image/png, image/bmp"
                    size="small"
                    multiple
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="m-feedback-visible">
                <span class="u-label">是否公开：</span>
                <el-checkbox class="u-checkbox" :true-label="1" :false-label="0" v-model="form.public"></el-checkbox>
                <!-- <el-tooltip v-show="!canSubmit" content="必须先填写类型，子类和内容">
                    <i class="el-icon-question"></i>
                </el-tooltip> -->
            </div>
            <div class="m-feedback-btn">
                <el-button
                    class="u-submit"
                    icon="el-icon-s-promotion"
                    type="primary"
                    :disabled="!canSubmit"
                    @click="submit"
                    :loading="loading"
                    >提交</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { types, subtypes } from "@/assets/data/feedback.json";
import { __cms } from "@jx3box/jx3box-common/data/jx3box.json";
const API_Root = process.env.NODE_ENV === "production" ? __cms : "/";
const API = API_Root + "api/cms/upload";

import { feedback } from "@/service/feedback";

export default {
    name: "AddFeedback",
    props: {
        max: {
            type: Number,
            default: 6,
        },
    },
    data() {
        return {
            types,
            subtypes,

            form: {
                type: "",
                subtype: "",
                content: "",
                public: 0,
            },
            url: API,
            imgs: [],
            loading: false,
        };
    },
    computed: {
        canSubmit() {
            return this.form.type && this.form.subtype && this.form.content;
        },
        client() {
            return this.$store.state.client;
        },
        refer() {
            return this.$route.query?.refer ? decodeURIComponent(this.$route.query?.refer) : "";
        },
    },
    methods: {
        beforeUpload: function (file){
            // 判断上传的文件类型
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp';
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG/GIF/BMP 格式!');
                return false
            }
        },
        // 提交图片成功
        done: function (res) {
            this.imgs = [...this.imgs, res.data[0]];
        },
        // 提交图片失败
        fail: function (err) {
            try {
                let response = JSON.parse(err.message);
                this.$message.error(`[${response.code}]${response.msg}`);
            } catch {
                this.$message.error("网络请求异常");
            }
        },
        // 图片上限
        exceed: function () {
            this.$message.warning(`上传的图片个数最多为${this.max}个`);
        },
        // 移除图片
        remove: function (file) {
            this.imgs = this.imgs.filter((img) => img !== file?.response?.data[0]);
        },
        submit() {
            this.loading = true;
            const data = {
                ...this.form,
                images: this.imgs,
                client: this.client,
            };
            this.refer && (data.refer = this.refer);
            feedback(data)
                .then((res) => {
                    this.$message.success("提交成功");
                    this.$refs.upload.clearFiles();
                    this.form = this.$options.data().form;
                    this.imgs = [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less" scoped>
.m-add-feedback {
    .type-box {
        .el-form-item {
            margin-bottom: 0;
        }
    }

    .m-content {
        margin-top: 20px;
    }
    .m-feedback-actions {
        // display: flex;
        align-items: flex-end;
        justify-content: space-between;
        // .clearfix;
        .mt(20px);
        // .mb(10px);
        .u-upload {
            .el-upload--picture-card,
            .el-upload-list__item {
                height: 40px;
                width: 40px;
                line-height: 40px;
            }
            .el-icon-plus {
                .fz(16px);
            }
        }
    }
    .m-public {
        .mb(10px);
        .fr;

        .u-label {
            margin-right: 5px;
        }

        .u-checkbox {
            margin-right: 10px;
        }

        .u-submit {
            margin-left: 10px;
        }
    }
}
.m-feedback-visible,.m-feedback-btn{
    .x(right);
    .mt(10px);
}
.m-feedback-btn .el-button{
    padding-left:40px;
    padding-right:40px;
}
</style>
