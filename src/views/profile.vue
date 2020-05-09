<template>
    <div class="m-dashboard m-dashboard-profile">
        <el-form ref="form" label-width="80px">
            <el-form-item class="u-name" label="昵称">
                <div class="u-value">
                    {{ name }}
                    <el-button
                        class="u-edit"
                        :disabled="renaming"
                        title="修改昵称"
                        @click="changename"
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        >修改昵称</el-button
                    >
                </div>
                <div class="u-rename" v-show="renaming">
                    <el-input
                        v-model="rename"
                        maxlength="20"
                        @change="check"
                        show-word-limit
                    ></el-input>
                    <i
                        v-show="checkname"
                        class="el-icon-success el-icons-status"
                    ></i>
                    <el-alert
                        v-show="!checkname"
                        title="昵称已被使用"
                        type="error"
                        show-icon
                    >
                    </el-alert>
                </div>
            </el-form-item>
            <el-form-item class="u-bio" label="签名">
                <el-input
                    type="textarea"
                    :rows="4"
                    maxlength="80"
                    placeholder="签名内容"
                    v-model="rebio"
                    show-word-limit
                >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submit"
                    :disabled="renaming && !checkname"
                    >修改</el-button
                >
                <el-button @click="reset">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { JX3BOX, User } from "@jx3box/jx3box-common";
import { checkNickname, updateProfile } from "../service/profile";

export default {
    name: "profile",
    props: [],
    data: function() {
        return {
            name: "",
            rename: "",
            renaming: false,
            checkname: true,

            bio: "",
            rebio: "",
        };
    },
    computed: {},
    methods: {
        check() {
            checkNickname(this.rename)
                .then((res) => {
                    this.checkname = true;
                })
                .catch((err) => {
                    this.failCallback(err, this);
                });
        },
        changename() {
            this.renaming = true;
        },
        reset() {
            this.renaming = false;
            this.rename = this.name;
            this.rebio = this.bio;
        },
        submit() {
            if (this.renaming == true && !this.checkname) {
                this.$alert("用户名已被使用", "提交失败", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.$message.error("用户名已被使用");
                    },
                });
                return;
            }

            let data = {
                uid: User.getInfo().uid,
                bio: this.rebio,
            };

            if (this.renaming == true && this.checkname) {
                data = Object.assign(data, {
                    name: this.rename,
                });
            }

            updateProfile(data)
                .then((res) => {
                    this.name = this.rename;
                    this.bio = this.rebio;
                    User.refresh("name", this.rename);
                    User.refresh("bio", this.rebio);

                    this.$message({
                        message: "资料修改成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    this.failCallback(err, this);
                });
        },
    },
    mounted: function() {
        this.name = this.rename = User.getInfo().name;
        this.bio = this.rebio = User.getInfo().bio;
    },
};
</script>

<style lang="less">
@import "../assets/css/profile.less";
</style>
