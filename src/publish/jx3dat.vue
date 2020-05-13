<template>
    <div class="m-publish-fb">
        <!-- 💛 预设选项 -->
        <!-- 
            localDraft : 是否显示本地草稿按钮
            infoEnable : 是否包含自定义字段
            markdownEnable : 是否开启markdown编辑器
            excerptEnable : 是否开启摘要
            tagEnable : 是否开启标签
            notifyEnable : 是否开启通知等扩展功能
            bannerEnable : 是否开启头条图功能,开启后仍旧需要签约作者及管理员才可见
            publishDefault : 是否启用默认发布接口
         -->
        <boilerplate
            :name="name"
            :type="type"
            :post="post"
            :meta="meta"
            :extend="extend"
            :localDraft="true"
            :infoEnable="true"
            :markdownEnable="false"
            :excerptEnable="true"
            :tagEnable="false"
            :notifyEnable="true"
            :bannerEnable="true"
            :publishDefault="true"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <!-- 1.数据类型 -->
                <el-form-item label="数据类型">
                    <el-radio
                        v-for="(name, key) in options.type_map"
                        :label="key"
                        border
                        :key="key"
                        v-model="post.post_meta.type"
                        >{{ name }}</el-radio
                    >
                </el-form-item>

                <!-- 2.团控数据类型字段 -->
                <template v-if="post.post_meta.type == 1">
                    <!-- TODO:云数据ID -->

                    <!-- 数据列表 -->
                    <el-form-item label="站内数据">
                        <div class="m-jx3dat-upload-wrapper">
                            <el-row class="u-thead">
                                <el-col :span="4">版本名称</el-col>
                                <el-col :span="4">订阅地址</el-col>
                                <el-col :span="8">数据说明</el-col>
                                <el-col :span="2">是否公开</el-col>
                                <el-col :span="6">操作</el-col>
                            </el-row>
                            <div class="u-tbody">
                            <el-row
                                class="u-tr"
                                v-for="(data, i) in post.post_meta.data"
                                :key="i"
                            >
                                <el-col :span="4"
                                    ><el-input
                                        v-model="data.name"
                                        placeholder="请输入版本名"
                                    ></el-input
                                ></el-col>

                                <el-col :span="4" class="u-feed u-feed-first" v-if="i==0">{{
                                    user.name + "@jx3box"
                                }}</el-col>
                                <el-col :span="4" class="u-feed" v-else>{{
                                    user.name + "@jx3box@" + data.name
                                }}</el-col>

                                <el-col :span="8"
                                    ><el-input
                                        v-model="data.desc"
                                        placeholder="请输入数据说明"
                                    ></el-input
                                ></el-col>
                                <el-col :span="2"
                                    ><el-switch
                                        v-model="data.status"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                    >
                                    </el-switch>
                                </el-col>
                                <el-col :span="6">
                                    <!-- 上传 -->
                                    <input
                                        class="u-data-input"
                                        type="file"
                                        :id="'jx3dat_' + i"
                                        @change="uploadDBM($event, data)"
                                    />
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="selectDBM(i)"
                                        >上传</el-button
                                    >

                                    <!-- 删除 -->
                                    <el-button
                                        size="small"
                                        type="danger"
                                        v-if="i !== 0"
                                        @click="delDBM(i)"
                                        >删除</el-button
                                    >

                                    <!-- 增加 -->
                                    <el-button
                                        size="small"
                                        plain
                                        @click="addDBM(i)"
                                        >增加</el-button
                                    ></el-col
                                >
                            </el-row>
                            </div>
                        </div>
                    </el-form-item>

                    <!-- 其它订阅号 -->
                    <el-form-item label="站外数据" class="m-jx3dat-otherfeed">
                        <el-input
                            v-model="post.post_meta.github"
                            placeholder="Github订阅号 (非必填)"
                        ></el-input>
                        <el-input
                            v-model="post.post_meta.gitee"
                            placeholder="Gitee订阅号 (非必填)"
                        ></el-input>
                        <el-input
                            v-model="post.post_meta.aliyun"
                            placeholder="Aliyun订阅号 (非必填)"
                        ></el-input>
                    </el-form-item>

                    <!-- 标签 -->
                    <el-form-item label="标签">
                        <el-checkbox-group v-model="post.post_meta.tag">
                            <el-checkbox
                                v-for="(item, i) in options.tag_list"
                                :label="item"
                                :key="i"
                            ></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </template>

                <!-- 3.其它类型上传字段 -->
                <el-form-item label="上传数据" v-else>
                    <input
                        class="u-data-input"
                        type="file"
                        id="otherdata"
                        @change="uploadDat($event)"
                    />
                    <el-button
                        type="success"
                        size="medium"
                        @click="selectDat($event)"
                        >点击上传<i class="el-icon-upload el-icon--right"></i
                    ></el-button>
                    <span class="u-data-name" v-if="tempname">
                        <i class="el-icon-success"></i> {{ tempname }}
                    </span>
                </el-form-item>
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

import { uploadHub, uploadData } from "../service/jx3dat.js";
import { User } from "@jx3box/jx3box-common";

export default {
    name: "jx3dat",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "jx3dat",
            name: "插件数据",

            //选项 - 加载可选项
            options: {
                type_map: {
                    "1": "团队监控数据",
                    "2": "目标监控数据",
                    "3": "团队面板buff数据",
                    "4": "团队面板UI皮肤",
                    "5": "其它",
                },
                tag_list: [
                    "PVE",
                    "PVP",
                    "抓马",
                    "宠物",
                    "奇遇",
                    "浪客行",
                    "其它",
                ],
            },

            //字段 - meta表数据,可设置默认值
            meta: {},

            //文章 - 主表数据
            post: {
                ID: "", //文章ID
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_title: "", //标题
                post_content: "", //主表内容字段,由后端接口配置是否双存储至meta表
                post_meta: {
                    //新版,字段表合并至主表,减少数据库查询次数
                    type: "1",
                    data: [
                        {
                            name: "",
                            desc: "",
                            status: true,
                            file: "",
                        },
                    ],
                    tag: [],
                    github: "",
                    gitee: "",
                    aliyun: "",
                    other: "",
                },
                post_excerpt: "", //主表摘要
                post_tags: [], //标签列表
                post_banner: "", //头条图,管理员可见
            },

            //扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false, //是否通知订阅用户
                followEnable: false, //是否通知粉丝
                tencentEnable: false, //是否同步至腾讯文档
                weiboEnable: false, //是否同步至微博头条文章
                tuilanEnable: false, //是否同步至推栏
            },

            // 杂项
            user: {},
            tempname: "",
        };
    },
    computed: {},
    methods: {
        // 发布
        toPublish: function() {
            console.log(this.$store.state);
            // 如使用默认发布接口publishDefault="true"时，可不执行任何操作
        },
        // 草稿
        toDraft: function() {
            console.log(this.$store.state);
            // 如使用默认发布接口publishDefault="true"时，可不执行任何操作
        },
        // 加载
        init: function() {
            // 编辑模式时需加载原内容 ?edit=id
            // toLoad参数2为需要格式化为数组的meta_key
            // return this.doLoad(this, ["fb_boss", "fb_level"]);
        },
        // 上传DBM
        selectDBM: function(i) {
            let fileInput = document.getElementById("jx3dat_" + i);
            fileInput.dispatchEvent(new MouseEvent("click"));
        },
        uploadDBM: function(e, item) {
            let formdata = new FormData();
            let file = e.target.files[0];
            formdata.append("jx3dat", file, "data.jx3dat");
            uploadHub(formdata).then((res) => {
                console.log(res);
            });
        },
        // 添加行
        addDBM: function(i) {
            // 目前设置最多5个版本
            if (this.post.post_meta.data.length >= 5) {
                this.$message.error("目前上限5个");
                return;
            }
            this.post.post_meta.data.push({
                name: "",
                desc: "",
                status: true,
                file: "",
            });
        },
        // 删除行
        delDBM: function(i) {
            this.post.post_meta.data.splice(i, 1);
        },
        // 上传其他数据
        selectDat: function() {
            let fileInput = document.getElementById("otherdata");
            fileInput.dispatchEvent(new MouseEvent("click"));
        },
        uploadDat: function(e) {
            let formdata = new FormData();
            let file = e.target.files[0];
            formdata.append("file", file, "data.jx3dat");
            uploadData(formdata).then((res) => {
                this.post.post_meta.other = res.data.data.list[0];

                this.$message({
                    message: res.data.msg,
                    type: "success",
                });

                this.tempname = file.name;
            });
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        // this.init().then(() => {
        //     console.log(this.post,this.meta)
        // })
        this.user = User.getInfo();
    },
    filters: {},
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/jx3dat.less";
</style>
