<template>
    <div class="m-send-tools">
        <div class="m-upload">
            <i class="el-icon-picture-outline u-upload-icon" @click="select"></i>
            <input
                class="u-upload-file"
                type="file"
                @change="upload"
                ref="uploadInput"
                accept=".jpg, .jpeg, .png, .gif, .bmp,.webp"
            />
        </div>
    </div>
</template>

<script>
import { upload } from "@/service";
export default {
    name: "sendTools",
    emits: ["update:image"],
    data() {
        return {
            data: ""
        }
    },
    computed: {
        fileInput: function () {
            return this.$refs.uploadInput;
        },
    },
    methods: {
        select() {
            this.fileInput.dispatchEvent(
                new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                })
            );
        },
        upload() {
            const file = this.fileInput.files[0];
            if (!file) return;
            if (file.size > 2 * 1024 * 1024) {
                this.$message.error("图片大小不能超过" + 2 + "M");
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            upload(formData).then((res) => {
                this.data = res.data.data[0];
                this.$emit("update:image", this.data);
            });
        },
    }
}
</script>

<style lang="less">
</style>
