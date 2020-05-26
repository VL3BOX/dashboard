<template>
    <div class="m-publish-jx3dat">
        <!-- 💛 预设选项 -->
        <!-- 
            localDraft : 是否显示本地草稿按钮
            infoEnable : 是否包含自定义字段
            markdownEnable : 是否开启markdown编辑器
            excerptEnable : 是否开启摘要
            tagEnable : 是否开启标签
            notifyEnable : 是否开启通知等扩展功能
            bannerEnable : 是否开启头条图功能,开启后仍旧需要签约作者及管理员才可见
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
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <!-- 1.数据类型 -->
                <el-form-item label="数据类型" class="m-jx3dat-subtypes">
                    <el-radio
                        v-for="(name, key) in options.type_map"
                        :label="key"
                        border
                        :key="key"
                        v-model="post.post_meta.type"
                        @change="changeSubtype(post.post_meta.type)"
                        >{{ name }}</el-radio
                    >
                </el-form-item>

                <!-- 2.团控数据类型字段 -->
                <template v-if="post.post_meta.type == 1">
                    <!-- TODO:云数据ID -->

                    <!-- 数据列表 -->
                    <el-alert
                        class="u-data-tips"
                        title="设置不公开后,仍然可以通过订阅名下载,仅不做展示"
                        type="warning"
                        description="不指定版本时,默认下载第一个主版本,默认最多可设置3个版本"
                        show-icon
                    >
                    </el-alert>
                    <div class="m-jx3dat-upload-wrapper">
                        <el-row class="u-thead">
                            <el-col :span="4">版本名称</el-col>
                            <el-col :span="4">订阅地址</el-col>
                            <el-col :span="8">数据说明</el-col>
                            <el-col :span="2">公开</el-col>
                            <el-col :span="3">数据</el-col>
                            <el-col :span="3">操作</el-col>
                        </el-row>
                        <div class="u-tbody">
                            <el-row
                                class="u-tr"
                                v-for="(data, i) in post.post_meta.data"
                                :key="i"
                            >
                                <el-col :span="4" v-if="i == 0"
                                    ><el-input
                                        v-model="data.name"
                                        placeholder="默认版"
                                        disabled
                                    ></el-input
                                ></el-col>
                                <el-col :span="4" v-else
                                    ><el-input
                                        v-model="data.name"
                                        placeholder="版本名，例：团长版"
                                    ></el-input
                                ></el-col>

                                <el-col
                                    :span="4"
                                    class="u-feed u-feed-first"
                                    v-if="i == 0"
                                    >{{ user.name + "@jx3box" }}</el-col
                                >
                                <el-col :span="4" class="u-feed" v-else>{{
                                    user.name + "@jx3box@" + data.name
                                }}</el-col>

                                <el-col :span="8"
                                    ><el-input
                                        v-model="data.desc"
                                        placeholder="请输入数据说明"
                                    ></el-input
                                ></el-col>
                                <el-col :span="2"  class="u-status"
                                    ><el-switch
                                        v-model="data.status"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                    >
                                    </el-switch>
                                </el-col>
                                <el-col :span="3" class="u-action">
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
                                    <span
                                        class="u-data-ready"
                                        v-if="!!data.file"
                                    >
                                        <i class="el-icon-success"></i>
                                        已上传
                                    </span>
                                </el-col>
                                <el-col :span="3" class="u-action">
                                    <!-- 增加 -->
                                    <el-button
                                        size="small"
                                        plain
                                        @click="addDBM(i)"
                                        >增加</el-button
                                    >

                                    <!-- 删除 -->
                                    <el-button
                                        size="small"
                                        type="danger"
                                        v-if="i !== 0"
                                        @click="delDBM(i)"
                                        >删除</el-button
                                    >
                                </el-col>
                            </el-row>
                        </div>
                    </div>

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
                    <el-form-item label="标签子类">
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
                <el-form-item label="其它数据">
                    <span class="u-data-name" v-if="post.post_meta.down">
                        <i class="el-icon-success"></i>
                        {{ post.post_meta.down.split("/").pop() }}
                    </span>
                    <input
                        class="u-data-input"
                        type="file"
                        id="otherdata"
                        @change="uploadDat($event)"
                    />
                    <el-button
                        type="primary"
                        plain
                        size="medium"
                        @click="selectDat($event)"
                        >点击上传<i class="el-icon-upload el-icon--right"></i
                    ></el-button>
                </el-form-item>
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

import { uploadHub, uploadData, publishToRedis } from "../service/jx3dat.js";
import User from "@jx3box/jx3box-common/js/user";
import { jx3dat_types, jx3dat_tags } from "@jx3box/jx3box-common/js/types";

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
                type_map: jx3dat_types,
                tag_list: jx3dat_tags,
            },

            //字段 - meta表数据,可设置默认值
            meta: {},

            //文章 - 主表数据
            post: {
                ID: "", //文章ID
                // post_author               //无需设置,由token自动获取
                // post_type:"",             //类型(默认由boilerplate托管)
                post_subtype: "1", //子类型(过滤查询用)
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
                    down: "",
                },
                post_excerpt: "", //主表摘要
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_status: "", //由发布按钮、草稿按钮决定
                post_banner: "", //头条图,管理员可见
                // post_tags: [], //标签列表
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
            // 检测当为团控数据时，数据状态不能为否
            if (this.post.post_meta.type == 1) {
                for (let val of this.post.post_meta.data) {
                    if (!val.file) {
                        this.$message.error(val.name + "数据不能为空!");
                        return;
                    }
                }
            }
            this.doPublish(this.$store.state, this,false).then((res) => {
                let pid = res.data.data.ID;
            });
            console.log(this.$store.state);
        },
        // 草稿
        toDraft: function() {
            this.doDraft(this.$store.state, this);
            console.log(this.$store.state);
        },
        // 加载
        init: function() {
            return this.doLoad(this);
        },
        // 子类型
        changeSubtype:function (subtype){
            this.$store.commit('changeSubtype',subtype)
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
            uploadHub(formdata,this).then((res) => {
                if(res){
                    item.file = res.download_url;
                }
            })
        },
        // 添加行
        addDBM: function(i) {
            // 目前设置最多3个版本
            if (this.post.post_meta.data.length >= 3) {
                this.$message.error("默认上限3个");
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
            uploadData(formdata,this).then((res) => {
                this.post.post_meta.down = res.data.data.list[0];

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
        this.init().then(() => {
            console.log(this.post);
        });
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
