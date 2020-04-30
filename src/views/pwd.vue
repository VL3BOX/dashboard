<template>
    <div class="m-dashboard m-dashboard-pwd">
        <img class="u-pic" svg-inline src="../assets/img/pwd.svg" />
        <form>
            <el-alert
                class="u-ac"
                title="请妥善保管"
                type="warning"
                description="未绑定邮箱用户将无法使用找回密码功能"
                show-icon
                :closable="false"
            >
            </el-alert>

            <!-- 新密码 -->
            <div class="u-pass">
                <el-input
                    class="u-text"
                    placeholder="新密码"
                    v-model="pwd1"
                    show-password
                    @change="checkPass"
                >
                    <template slot="prepend">
                        <img
                            class="i-pass"
                            svg-inline
                            src="../assets/img/pass.svg"
                        />
                    </template>
                </el-input>
                <div class="u-tip">
                    <el-alert
                        v-show="pass_validate == false"
                        :title="pass_validate_tip"
                        type="error"
                        show-icon
                        :closable="false"
                    ></el-alert>
                </div>
            </div>

            <!-- 重复密码 -->
            <div class="u-pass">
                <el-input
                    class="u-text"
                    placeholder="重复密码"
                    v-model="pwd2"
                    show-password
                    @input="checkPass"
                >
                    <template slot="prepend">
                        <img
                            class="i-pass"
                            svg-inline
                            src="../assets/img/pass.svg"
                        />
                    </template>
                </el-input>
                <div class="u-tip">
                    <el-alert
                        v-show="pwd2 && accordance == false"
                        :title="pass_accordance_tip"
                        type="error"
                        show-icon
                        :closable="false"
                    ></el-alert>
                </div>
            </div>

            <!-- 提交 -->
            <el-button
                class="u-submit u-button"
                type="primary"
                @click="done"
                :disabled="!ready"
                >提交</el-button
            >
        </form>
    </div>
</template>

<script>
const { validator } = require("sterilizer");
const { JX3BOX, User } = require("@jx3box/jx3box-common");
const API = JX3BOX.__server
// const API = "http://localhost:5160/";
export default {
    name: "pwd",
    props: [],
    data: function() {
        return {
            pwd1: "",
            pwd2: "",
            pass_validate: null,
            pass_validate_tip: "密码有效长度为6-50个字符",
            pass_accordance_tip: "两次密码不一致",
        };
    },
    computed: {
        accordance: function() {
            return this.pwd1 === this.pwd2;
        },
        ready: function() {
            return this.pass_validate && this.accordance;
        },
    },
    methods: {
        checkPass: function() {
            // 如果为空
            if (this.pwd1 == "") {
                this.pass_validate = null;
            }

            // 校验第1个值
            this.pass_validate = validator(this.pwd1, {
                len: [6, 50],
            });
        },
        done: function() {
            this.$axios
                .post(API + "dashboard/password/update", {
                    uid: User.getInfo().uid,
                    pwd1: this.pwd1,
                    pwd2: this.pwd2,
                })
                .then((res) => {
                    this.$message({
                        message: "密码修改成功",
                        type: "success",
                    });
                })
                .catch((err) => {
                    if (err.response.data.code) {
                        this.$message.error(
                            `[${err.response.data.code}]${err.response.data.msg}`
                        );
                    } else {
                        this.$message.error("网络请求异常");
                    }
                });
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/pwd.less";
</style>
