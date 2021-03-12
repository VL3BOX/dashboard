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
                    accept="image/png,image/gif,image/jpeg"
                    :on-change="upload"
                    action="upload/avatar"
                    :auto-upload="false"
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
            <div class="m-profile-avatar-frame">
                <h3 class="u-title">
                    自定义头像框
                    <span class="u-limit" :class="{ on: isVIP }"
                        >(
                        <i
                            :class="isVIP ? 'el-icon-unlock' : 'el-icon-lock'"
                        ></i>
                        仅高级/专业版账户适用 )</span
                    >
                </h3>
                <div class="u-list" v-if="frames">
                    <li class="u-item" :class="{ on: !frame }" @click="selectFrame('')" title="无边框">
                        <img
                            :src="avatar | showSmallAvatar"
                            v-if="!frame"
                            class="u-pic"
                        />
                        <i class="u-frame u-frame-none"></i>
                    </li>
                    <li
                        class="u-item"
                        :class="{ on: name == frame }"
                        v-for="(item, name) in frames"
                        :key="name"
                        @click="selectFrame(name)"
                        :title="item.desc"
                    >
                        <img
                            :src="avatar | showSmallAvatar"
                            v-if="name == frame"
                            class="u-pic"
                            :class="{isCircle:item.style=='circle'}"
                        />
                        <i class="u-frame"
                            ><img :src="showFrame(item.name, item.files.s.file)"
                        /></i>
                    </li>
                    <i class="u-mask" v-if="!isVIP"></i>
                </div>
            </div>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { updateAvatar, uploadAvatar, getFrames,getUserOverview } from "@/service/profile";
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
            isVIP: true,
            uid : User.getInfo().uid,
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
        },
        selectFrame: function(name) {
            if (this.isVIP) {
                this.frame = name;
            }
        },
        init: function() {
            this.loadFrames();
            isVIP().then((data) => {
                this.isVIP = data;
            });

            this.avatar = this.bak = User.getInfo().avatar_origin;
            getUserOverview(this.uid).then((res) => {
                this.frame = res.data.data.avatar_frame || ''
            })
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
