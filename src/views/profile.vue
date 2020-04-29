<template>
    <div class="m-dashboard m-dashboard-profile">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item class="u-name" label="昵称">
                <div class="u-value">
                    {{ form.name }}
                    <i
                        class="u-edit el-icon-edit"
                        :class="{ disabled: form.renaming }"
                        title="修改昵称"
                        @click="changename"
                    ></i>
                </div>
                <div class="u-rename" v-show="form.renaming">
                    <el-input
                        v-model="form.rename"
                        maxlength="20"
                        @change="checkname"
                        show-word-limit
                    ></el-input>
                    <i
                        v-show="form.checkname"
                        class="el-icon-success el-icons-status"
                    ></i>
                    <el-alert
                        v-show="!form.checkname"
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
                    v-model="form.rebio"
                    show-word-limit
                >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="submit"
                    :disabled="form.renaming && !form.checkname"
                    >修改</el-button
                >
                <el-button @click="reset">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
const { JX3BOX, User } = require("@jx3box/jx3box-common");
// const API = JX3BOX.__server

// FIXME:test
const API = "http://localhost:5160/";

export default {
    name: "profile",
    props: [],
    data: function() {
        return {
            form: {
                name: "",
                rename: "",
                renaming: false,
                checkname: true,

                bio: "",
                rebio: "",
            },
        };
    },
    computed: {},
    methods: {
        checkname() {
            this.$axios
                .get(API + "dashboard/nickname/check", {
                    params: {
                        name: this.form.rename,
                    },
                })
                .then((res) => {
                    this.form.checkname = true;
                })
                .catch((err) => {
                    if (err.response.data.code == 10029) {
                        this.form.checkname = false;
                        return;
                    }
                    this.$message.error("网络请求异常");
                });
        },
        changename() {
            this.form.renaming = true;
        },
        reset() {
            this.form.renaming = false;
            this.form.rename = this.form.name;
            this.form.rebio = this.form.bio;
        },
        submit() {
            if (this.form.renaming == true && !this.form.checkname) {
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
                bio: this.form.rebio,
            };

            if (this.form.renaming == true && this.form.checkname) {
                data = Object.assign(data, {
                    name: this.form.rename,
                });
            }

            this.$axios
                .post(API + "dashboard/profile/update", data)
                .then((res) => {
                    this.form.name = this.form.rename
                    this.form.bio = this.form.rebio
                    User.refresh('name',this.form.rename)
                    User.refresh('bio',this.form.rebio)

                    this.$message({
                        message: '资料修改成功',
                        type: 'success'
                    });
                })
                .catch((err) => {
                    this.$message.error(
                        `[${err.response.data.code}]${err.response.data.msg}`
                    );
                });
        },
    },
    mounted: function() {
        this.form.name = this.form.rename = User.getInfo().name;
        this.form.bio = this.form.rebio = User.getInfo().bio;
    },
};
</script>

<style lang="less">
@import "../assets/css/profile.less";
</style>
