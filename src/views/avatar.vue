<template>
    <div class="m-dashboard m-dashboard-avatar">
        <img class="u-avatar" :src="avatar" />
        <el-upload
            class="u-upload"
            drag
            :action="upload_url"
            with-credentials
            :on-success="success"
            :on-error="fail"
            accept="image/png,image/gif,image/jpeg"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em><br />
                <span class="u-tip">只能上传jpg/png/gif文件</span>
            </div>
        </el-upload>
        <p class="u-btng">
            <el-button type="primary" @click="submit">确认</el-button>
            <el-button @click="reset">重置</el-button>
        </p>
    </div>
</template>

<script>
import { JX3BOX, User, Utils } from "@jx3box/jx3box-common";
import { updateAvatar } from "../service/profile";
const API = JX3BOX.__server;

export default {
    name: "avatar",
    props: [],
    data: function() {
        return {
            avatar: "",
            bak: "",
            upload_url: API + "upload/avatar",
            path: "",
        };
    },
    computed: {},
    methods: {
        success: function(res) {
            this.$message({
                message: "上传成功",
                type: "success",
            });
            this.avatar = Utils.showAvatar(res.data.list[0], "l");
            this.path = res.data.list[0];
        },
        fail: function(err) {
            this.$message.error("上传失败,网络异常或非法请求");
        },
        reset: function() {
            this.avatar = this.bak;
        },
        submit: function() {
            updateAvatar({
                uid: User.getInfo().uid,
                path: this.path,
            })
                .then((res) => {
                    User.refresh("avatar", this.path);

                    this.$message({
                        message: "头像更新成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    this.failCallback(err, this);
                });
        },
    },
    mounted: function() {
        this.avatar = Utils.showAvatar(User.getInfo().avatar_origin, "l");
        this.bak = this.avatar;
    },
};
</script>

<style lang="less">
@import "../assets/css/avatar.less";
</style>
