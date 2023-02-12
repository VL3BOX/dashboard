<template>
    <uc class="m-dashboard-avatar">
        <div class="m-profile-avatar">
            <div class="m-profile-avatar-primary">
                <div class="u-avatar">
                    <img class="u-avatar u-avatar-l" :src="avatar | showAvatar" />
                </div>
                <el-upload
                    class="u-upload"
                    drag
                    accept="image/png, image/gif, image/jpeg"
                    :on-change="upload"
                    action="upload/avatar"
                    :auto-upload="false"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                        <br />
                        <span class="u-tip">只能上传jpg/png/gif文件</span>
                    </div>
                </el-upload>
                <p class="u-btng">
                    <el-button type="primary" @click="submit">确认</el-button>
                    <el-button @click="reset">重置</el-button>
                </p>
            </div>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { updateAvatar, uploadAvatar, getFrames, getUserOverview } from "@/service/profile";
import { getDecoration, setDecoration, getDecorationJson } from "@/service/decoration";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { flatten } from "lodash";
export default {
    name: "avatar",
    props: [],
    data: function () {
        return {
            // 备份
            bak: "",
            // 数据
            avatar: "",
            frame: "",
            // VIP
            isVIP: false,
            uid: User.getInfo().uid,
            // 头像框
            frames,
            tabActivate: "0",
            decorationJson: {},
            decoration: [],
            decorationActivate: null,
            originalActivateName: null,
            selectAll: [],
            noDecoration: false,
        };
    },
    computed: {
        data: function () {
            return {
                user_avatar: this.avatar,
            };
        },
    },
    methods: {
        upload: function (file, fileList) {
            let formdata = new FormData();
            let filedata = file.raw;
            formdata.append("avatar", filedata);
            uploadAvatar(formdata).then((res) => {
                this.$message({
                    message: "上传成功",
                    type: "success",
                });
                this.avatar = res.data.data[0];
            });
        },
        reset: function () {
            this.avatar = this.bak;
        },
        submit: function () {
            // this.decorationSubmit();
            // if (!this.isVIP) {
            //     if (this.frame) {
            //         this.$notify({
            //             title: "头像框未生效",
            //             message: "头像框仅高级/专业账号可用",
            //             type: "warning",
            //         });
            //     }
            //     this.frame = "";
            // }
            updateAvatar(this.data).then((res) => {
                User.refresh("avatar", this.avatar);
                this.$message({
                    message: "头像更新成功",
                    type: "success",
                });
            });
        },
        showFrame: function (name) {
            // if (process.env.NODE_ENV == "development") {
            //     return `temp/avatar/${name}/${name}.svg`;
            // }
            return __imgPath + `avatar/images/${name}/${name}.svg`;
        },
        init: function () {
            this.avatar = this.bak = User.getInfo().avatar_origin;
            getUserOverview(this.uid).then((res) => {
                this.frame = res.data.data.user_avatar_frame || "";
            });
        },
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val, 480, false);
        },
        showSmallAvatar: function (val) {
            return showAvatar(val, 136, false);
        },
    },
    created: function () {
        this.init();
    },
    components: {
        uc,
    },
};
</script>

<style lang="less">
@import "../assets/css/profile/avatar.less";
</style>
