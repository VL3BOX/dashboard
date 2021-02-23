<template>
    <div class="m-dashboard m-dashboard-email">
        <img
            class="u-pic"
            svg-inline
            src="../assets/img/setting/email_done.svg"
        />

        <!-- 已绑定 -->
        <div v-if="status == true" class="u-done">
            <template v-if="verified == true">
                <h1 class="u-title">已绑定邮箱</h1>
                <p class="u-address">{{ address }}</p>
                <el-alert
                    class="u-tip"
                    title="已验证邮箱"
                    type="success"
                    description="仅绑定邮箱用户支持邮件订阅通知等功能"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <div class="u-btngroup">
                    <el-button
                        type="primary"
                        class="u-button"
                        @click="changeEmail"
                        icon="el-icon-edit"
                        >修改邮箱</el-button
                    >
                </div>
            </template>

            <template v-if="verified == false">
                <h1 class="u-title">未验证邮箱</h1>
                <p class="u-address">{{ address }}</p>
                <el-alert
                    title="未验证邮箱"
                    class="u-tip"
                    type="warning"
                    description="请尽快进行邮箱验证,否则您的账号将面临风险与权限受阻"
                    show-icon
                    :closable="false"
                >
                </el-alert>
                <div class="u-btngroup">
                    <el-button
                        type="primary"
                        class="u-button"
                        @click="verify"
                        icon="el-icon-s-promotion"
                        >验证邮箱</el-button
                    >
                    <el-button
                        type="primary"
                        class="u-button"
                        @click="changeEmail"
                        icon="el-icon-edit"
                        >修改邮箱</el-button
                    >
                </div>
            </template>
        </div>

        <!-- 未绑定 -->
        <div v-if="status == false" class="u-none">
            <h1 class="u-title">
                {{ changeEmailMode ? "修改邮箱" : "未绑定邮箱" }}
            </h1>

            <div class="u-email">
                <el-input
                    class="u-text u-email"
                    v-model="email"
                    placeholder="邮箱地址"
                    minlength="3"
                    maxlength="50"
                    @change="checkEmail"
                >
                    <template slot="prepend">
                        <img
                            class="i-mail"
                            svg-inline
                            src="../assets/img/nav/mail.svg"
                        />
                    </template>
                </el-input>
                <div class="u-error">
                    <el-alert
                        v-show="email_validate == false"
                        :title="email_validate_tip"
                        type="error"
                        show-icon
                        :closable="false"
                    ></el-alert>
                    <el-alert
                        v-show="email_available == false"
                        :title="email_available_tip"
                        type="error"
                        show-icon
                        :closable="false"
                    ></el-alert>
                </div>
                <i v-show="ready" class="el-icon-success el-icons-status"></i>
            </div>

            <el-alert
                title="请填写正确的邮箱地址"
                class="u-tip"
                type="warning"
                description="绑定邮箱后将可以使用邮箱进行登录,当第三方登录出现异常时不会受影响"
                show-icon
                :closable="false"
            >
            </el-alert>

            <div class="u-btngroup">
                <el-button
                    type="primary"
                    class="u-button"
                    @click="bind"
                    :disabled="!ready"
                    >绑定邮箱</el-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { validator } from "sterilizer";
import User from "@jx3box/jx3box-common/js/user";
import {
    sendVerifyEmail,
    sendBindEmail,
    checkEmailAvailable,
    checkEmailStatus,
} from "../service/profile";

export default {
    name: "email",
    props: [],
    data: function() {
        return {
            status: null,
            uid: User.getInfo().uid,
            address: "",
            verified: null,

            email: "",
            email_validate: null,
            email_validate_tip: "邮箱格式不正确或长度超出限制",
            email_available: null,
            email_available_tip: "邮箱已被使用,请更换",

            changeEmailMode: false,
        };
    },
    computed: {
        ready: function() {
            return this.email_validate && this.email_available;
        },
    },
    methods: {
        verify: function() {
            sendVerifyEmail(this.uid).then((res) => {
                this.$message({
                    message: "邮件已发送请查收",
                    type: "success",
                });
            });
        },
        checkEmail: function() {
            // 如果为空
            if (this.email == "") {
                this.email_validate = null;
                this.email_available = null;
                return;
            }

            // 校验格式
            let result = validator(this.email, {
                isEmail: true,
                len: [3, 50],
            });
            this.email_validate = result;
            if (!result) return;

            // 邮箱是否可用
            checkEmailAvailable(this.email).then((res) => {
                this.email_available = res.data.data;
            });
        },
        bind: function() {
            if (!this.ready) {
                this.$message.error("邮箱地址不合法");
                return;
            }

            sendBindEmail({
                uid: this.uid,
                email: this.email,
            }).then((res) => {
                if (!res.data.code) {
                    this.$alert("申请提交成功,请前往邮箱验证", "消息", {
                        confirmButtonText: "确定",
                    });
                    this.status = true;
                    this.verified = false;
                    this.address = this.email;
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        changeEmail: function() {
            this.status = false;
            this.changeEmailMode = true;
        },
    },
    mounted: function() {
        this.uid = User.getInfo().uid;
        checkEmailStatus().then((res) => {
            if (res.data.data.email) {
                this.status = true;
                this.address = res.data.data.email;
                this.verified = !!parseInt(res.data.data.verified);
            } else {
                this.status = false;
            }
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/dashboard/email.less";
</style>
