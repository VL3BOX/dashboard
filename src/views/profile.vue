<template>
    <div class="m-dashboard m-dashboard-profile">
        <h1>资料</h1>

        <el-form class="m-profile-name" ref="form" label-width="80px">
            <el-divider content-position="left">昵称</el-divider>
            <el-alert
                class="u-tip"
                title="昵称将作为唯一识别符，默认只能修改1次，请谨慎操作"
                type="warning"
                show-icon
            ></el-alert>
            <el-form-item class="u-name" label="当前昵称">
                <div class="u-value">
                    {{ name }}
                    <el-button
                        class="u-edit"
                        :disabled="renaming"
                        title="修改昵称"
                        @click="startChangeName"
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        >修改昵称</el-button
                    >
                </div>
            </el-form-item>
            <div class="u-rename" v-show="renaming">
                <el-input
                    class="u-rename-input"
                    v-model="rename"
                    minlength="2"
                    maxlength="12"
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
                <el-button
                    type="primary"
                    @click="submitChangeName"
                    :disabled="renaming && !checkname"
                    >修改</el-button
                >
                <el-button @click="endChangeName">取消</el-button>
            </div>
        </el-form>

        <el-form
            class="m-profile-other"
            ref="form"
            label-width="80px"
            :class="{ disabled: renaming }"
        >
            <el-divider content-position="left">签名</el-divider>
            <el-input
                type="textarea"
                :rows="4"
                maxlength="80"
                placeholder="签名内容"
                v-model="rebio"
                show-word-limit
            >
            </el-input>
            <div class="m-profile-btns">
                <el-button type="primary" @click="submitChangeProfile"
                    >提交</el-button
                >
                <!-- <el-button @click="reset">取消</el-button> -->
            </div>
        </el-form>
    </div>
</template>

<script>
import { JX3BOX, User } from "@jx3box/jx3box-common";
import {
    checkNickname,
    updateNickname,
    updateProfile,
} from "../service/profile";
import { sterilizer } from "sterilizer/index.js";

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
        // 昵称
        startChangeName() {
            this.renaming = true;
        },
        check() {
            this.rename = this.rename.trim();
            if(this.rename < 2 || this.rename.length > 12){
                this.$message.error("昵称长度限制为2~12个字符");
                return 
            }
            // 禁用符号
            this.rename = sterilizer(this.rename).kill()
            this.rename = sterilizer(this.rename).removeSpace()

            checkNickname(this.rename)
                .then((res) => {
                    this.checkname = true;
                })
                .catch((err) => {
                    this.checkname = false;
                    this.failCallback(err, this);
                });
        },
        submitChangeName() {
            if (!this.checkname) {
                this.$alert("昵称不合法", "提交失败", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        this.$message.error("用户名已被使用或包含禁用字符");
                    },
                });
                return;
            }

            this.$alert(`确定修改为 ${this.rename} 吗`, "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    updateNickname(this.rename)
                        .then((res) => {
                            this.name = this.rename;
                            User.refresh("name", this.rename);

                            this.renaming = false;
                            this.$message({
                                message: "资料修改成功",
                                type: "success",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            this.failCallback(err, this);
                        });
                },
            });
        },
        endChangeName() {
            this.renaming = false;
            this.rename = this.name;
            this.rebio = this.bio;
        },
        // 其它
        submitChangeProfile() {
            let data = {
                bio: this.rebio,
            };

            updateProfile(data)
                .then((res) => {
                    this.bio = this.rebio;
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
