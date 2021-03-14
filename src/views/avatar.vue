<template>
    <uc class="m-dashboard-avatar">
        <div class="m-profile-avatar">
            <div class="m-profile-avatar-primary">
                <div class="u-avatar">
                    <img
                        class="u-avatar u-avatar-l"
                        :src="avatar | showAvatar"
                    />
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
            <div class="m-profile-avatar-frame">
                <h3 class="u-title">
                    自定义头像框
                    <span class="u-limit" :class="{ on: isVIP }">
                        (
                        <i
                            :class="isVIP ? 'el-icon-unlock' : 'el-icon-lock'"
                        ></i>
                        仅<a
                            href="/vip/premium?from=dashboard_avatar"
                            target="_blank"
                            >高级/专业版</a
                        >账户适用 )
                    </span>
                </h3>
                <div class="u-list" v-if="frames">
                    <li
                        class="u-item"
                        :class="{ on: !frame }"
                        @click="selectFrame('')"
                    >
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="无边框"
                            placement="top"
                            :open-delay="200"
                        >
                            <div>
                                <img
                                    :src="avatar | showSmallAvatar"
                                    v-if="!frame"
                                    class="u-pic"
                                />
                                <i class="u-frame u-frame-none"></i>
                            </div>
                        </el-tooltip>
                    </li>
                    <li
                        class="u-item"
                        :class="{ on: name == frame }"
                        v-for="(item, name) in frames"
                        :key="name"
                        @click="selectFrame(item)"
                    >
                        <el-tooltip
                            class="item"
                            effect="dark"
                            :content="item.desc"
                            placement="top"
                            :open-delay="300"
                        >
                            <div :class="{ 'u-blocked': !item.status }">
                                <img
                                    :src="avatar | showSmallAvatar"
                                    v-if="name == frame"
                                    class="u-pic"
                                    :class="{
                                        isCircle: item.style == 'circle',
                                    }"
                                />
                                <i class="u-frame">
                                    <img
                                        :src="
                                            showFrame(
                                                item.name,
                                                item.files.s.file
                                            )
                                        "
                                    />
                                </i>
                            </div>
                        </el-tooltip>
                    </li>
                </div>
                <div class="u-tip">
                    <i class="el-icon-warning-outline"></i>
                    「限定头像框」仅在指定时间段可选择激活。
                </div>
            </div>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import {
    updateAvatar,
    uploadAvatar,
    getFrames,
    getUserOverview,
} from "@/service/profile";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { isVIP } from "@jx3box/jx3box-common/js/pay";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "avatar",
    props: [],
    data: function() {
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
        };
    },
    computed: {
        data: function() {
            return {
                user_avatar: this.avatar,
                user_avatar_frame: this.frame,
            };
        },
    },
    methods: {
        upload: function(file, fileList) {
            let formdata = new FormData();
            let filedata = file.raw;
            formdata.append("file", filedata);
            uploadAvatar(formdata).then((res) => {
                this.$message({
                    message: "上传成功",
                    type: "success",
                });
                this.avatar = res.data.data.list[0];
            });
        },
        reset: function() {
            this.avatar = this.bak;
        },
        submit: function() {
            if (!this.isVIP) {
                if (this.frame) {
                    this.$notify({
                        title: "头像框未生效",
                        message: "头像框仅高级/专业账号可用",
                        type: "warning",
                    });
                }
                this.frame = "";
            }
            updateAvatar(this.data).then((res) => {
                User.refresh("avatar", this.avatar);
                this.$message({
                    message: "头像更新成功",
                    type: "success",
                });
            });
        },
        loadFrames: function() {
            getFrames().then((res) => {
                this.frames = res.data;
            });
        },
        showFrame: function(name, filename) {
            return __imgPath + `image/avatar/${name}/${filename}`;
            return `temp/avatar/${name}/${filename}`;
        },
        selectFrame: function(item) {
            if (!item) {
                this.frame = "";
                return;
            }
            if (item.status) {
                this.frame = item.name;
            }
        },
        init: function() {
            this.loadFrames();
            isVIP().then((data) => {
                this.isVIP = data;
            });

            this.avatar = this.bak = User.getInfo().avatar_origin;
            getUserOverview(this.uid).then((res) => {
                this.frame = res.data.data.avatar_frame || "";
            });
        },
    },
    filters: {
        showAvatar: function(val) {
            return showAvatar(val, "l");
        },
        showSmallAvatar: function(val) {
            return getThumbnail(val, 68, true);
        },
    },
    created: function() {
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
