<template>
    <div class="m-dashboard-profile">
        <!-- <h1>资料</h1> -->

        <el-form
            class="m-profile-name"
            ref="form"
            label-width="100px"
            :label-position="position"
        >
            <el-form-item class="u-name" label="昵称">
                <div class="u-value">
                    {{ nickname }}
                    <a
                        class="u-edit el-button el-button--primary el-button--mini"
                        href="/vip/rename"
                        target="_blank"
                        ><i class="el-icon-edit"></i> 修改昵称</a
                    >
                </div>
            </el-form-item>

            <el-form-item class="u-name" label="服务器">
                <el-select
                    class="u-server"
                    v-model="form.jx3_server"
                    filterable
                    placeholder="请输入服务器"
                >
                    <el-option
                        v-for="item in servers"
                        :key="item"
                        :label="item"
                        :value="item"
                    >
                    </el-option>
                </el-select>
                <span class="u-server-tip"><i class="el-icon-question"></i> 部分应用将使用此服务器作为默认服务器</span>
            </el-form-item>

            <el-form-item class="u-name" label="推栏ID">
                <el-input
                    v-model="form.tuilan_id"
                    placeholder="请输入推栏数字ID"
                ></el-input>
            </el-form-item>

            <el-form-item class="u-name">
                <div slot="label">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="此项不会被公开,仅用于赛事联系或其它确认"
                        placement="left"
                    >
                        <div><i class="el-icon-lock"></i> QQ</div>
                    </el-tooltip>
                </div>
                <el-input
                    v-model="form.qq_number"
                    placeholder="请输入QQ号码"
                ></el-input>
            </el-form-item>

            <el-form-item class="u-phone">
                <div slot="label">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="此项不会被公开,仅用于礼品发放"
                        placement="left"
                    >
                        <div><i class="el-icon-lock"></i> 联系电话</div>
                    </el-tooltip>
                </div>
                <el-input
                    v-model="form.phone"
                    placeholder="请输入收货电话"
                ></el-input>
            </el-form-item>

            <el-form-item class="u-address">
                <div slot="label">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="此项不会被公开,仅用于礼品发放"
                        placement="left"
                    >
                        <div><i class="el-icon-lock"></i> 联系地址</div>
                    </el-tooltip>
                </div>
                <el-input
                    v-model="form.address"
                    placeholder="请输入收货地址"
                    type="textarea"
                ></el-input>
            </el-form-item>

            <el-form-item class="u-name" label="签名">
                <el-input
                    type="textarea"
                    :rows="4"
                    maxlength="80"
                    placeholder="签名内容"
                    v-model="form.user_bio"
                    show-word-limit
                >
                </el-input>
            </el-form-item>

            <el-form-item class="u-btns" label="">
                <el-button
                    type="primary"
                    class="u-submit"
                    @click="submit"
                    >提交</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { JX3BOX, User } from "@jx3box/jx3box-common";
import { updateProfile, getProfile } from "../service/profile";
import { sterilizer } from "sterilizer/index.js";
import servers from "@jx3box/jx3box-data/data/server/server_list.json";

export default {
    name: "profile",
    props: [],
    data: function() {
        return {
            nickname: User.getInfo().name,
            servers,
            form: {
                jx3_server: "",
                user_bio: "",
                qq_number: "",
                phone: "",
                address: "",
                tuilan_id:""
            },
            position : window.innerWidth < 768 ? 'top' : 'left'
        };
    },
    computed: {},
    methods: {
        // 提交资料
        submit() {
            updateProfile(this.form).then((res) => {

                if(!res.data.code){
                    // User.refresh("bio", this.form.user_bio);
                    this.$message({
                        message: "资料修改成功",
                        type: "success",
                    });
                }
                
            });
        },
        // 获取资料
        getProfile() {
            getProfile().then((res) => {
                if(!res.data.code){
                    this.form = res.data.data
                }
            });
        },
    },
    mounted: function() {
        this.getProfile();
    },
};
</script>

<style lang="less">
@import "../assets/css/dashboard/profile.less";
</style>
