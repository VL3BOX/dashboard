<template>
    <el-upload
        class="c-editor-upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="10"
        :accept="accept"
        :with-credentials="true"
        :file-list="fileList"
        :on-preview="insert"
    >
        <el-button type="primary"
            ><i class="el-icon-upload el-icon--right"></i> 上传附件</el-button
        >
    </el-upload>
</template>

<script>
export default {
    name: "upload",
    props: [],
    data: function() {
        return {
            fileList: [
                {
                    name: "food.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
                },
            ],
            accept:
                "image/jpeg,image/gif,image/png,image/bmp,text/plain,text/csv,text/jx3dat,text/dat,application/pdf,application/zip,application/rar,application/x-7z-compressed,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/octet-stream",
        };
    },
    computed: {},
    methods: {
        insert: function(file) {},
    },
    mounted: function() {
    },
    components: {},
};
</script>

<style lang="less">
.c-editor-upload {
    .el-upload-list {
        padding: 5px;
        border: 1px solid #ddd;
        margin: 10px auto;
        border-radius: 4px;
        background: #fafbfc;

        &:before{
            content:"♬ 单个附件大小不超过2M,一次不超过10个文件,限图片/文档/数据/压缩文件";
            .fz(12px,2);
            color:#999;
            padding-left:5px;
        }
    }
}
</style>
