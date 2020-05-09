<template>
    <div class="m-publish-banner">
        <el-upload
            class="avatar-uploader"
            :action="url"
            :show-file-list="false"
            :on-success="done"
            :on-error="fail"
        >
            <img v-if="post_banner" :src="post_banner" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
const { __server } = require("@jx3box/jx3box-common/js/jx3box");
const API = __server + 'upload'
// const API = "http://localhost:5160/" + "publish/upload";

export default {
    name: "post_banner",
    props: ["banner"],
    data() {
        return {
            post_banner: this.banner,
            url: API,
        };
    },
    methods: {
        done(res, file) {
            this.post_banner = res.data.list[0];
            this.$store.commit("editBanner", this.post_banner);
        },
        fail(err, file, fileList){
            try{
                let response = JSON.parse(err.message)
                this.$message.error(
                    `[${response.code}]${response.msg}`
                );
            }catch{
                this.$message.error("网络请求异常");
            }
        }
    },
};
</script>

<style lang="less">
.m-publish-banner {
    img {
        max-width: 100%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
}
</style>
