<template>
    <div class="m-dashboard-publish-house">
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
            v-if="loaded"
            :name="name"
            :type="type"
            :post="post"
            :meta="meta"
            :extend="extend"
            :localDraft="true"
            :infoEnable="true"
            :markdownEnable="false"
            :excerptEnable="false"
            :tagEnable="false"
            :notifyEnable="false"
            :bannerEnable="false"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <!-- 1.选择坐标 -->
                <el-form-item label="府邸坐标" class="m-house-coord">
                    <el-row :gutter="20">
                        <el-col :span="8"
                            ><el-input
                                v-model="post.post_meta.server"
                                placeholder="服务器名"
                            ></el-input
                        ></el-col>
                        <el-col :span="8"
                            ><el-input
                                v-model="post.post_meta.area"
                                placeholder="所在分线"
                                ><template slot="append">线</template></el-input
                            ></el-col
                        >
                        <el-col :span="8"
                            ><el-input v-model="post.post_meta.num" placeholder="所在房号"
                                ><template slot="append">号</template></el-input
                            ></el-col
                        >
                    </el-row>
                </el-form-item>

                <!-- 2.家园图片 -->
                <el-form-item label="家园图赏">
                    <album :imgList="post.post_meta.pics" @albumChange="updateAlbum"></album>
                </el-form-item>

                <!-- 3.蓝图分享 -->
                <el-form-item label="蓝图分享">
                    <el-switch v-model="post.post_meta.hasData"></el-switch>
                </el-form-item>
                <div class="m-publish-datalist" v-if="post.post_meta.hasData">
                    <div class="u-wrapper">
                        <el-row class="u-thead">
                            <el-col :span="6">类型</el-col>
                            <el-col :span="6">说明</el-col>
                            <el-col :span="6">数据</el-col>
                            <el-col :span="6">操作</el-col>
                        </el-row>
                        <div class="u-tbody">
                            <el-row
                                class="u-tr"
                                v-for="(data, i) in post.post_meta.blueprint"
                                :key="i"
                            >
                                <el-col :span="6">
                                    <el-radio-group v-model="data.type">
                                        <el-radio-button
                                            label="整园蓝图"
                                        ></el-radio-button>
                                        <el-radio-button
                                            label="局部蓝图"
                                        ></el-radio-button>
                                    </el-radio-group>
                                </el-col>

                                <el-col :span="6"
                                    ><el-input
                                        v-model="data.desc"
                                        placeholder="蓝图说明"
                                    ></el-input
                                ></el-col>

                                <el-col :span="6" class="u-action">
                                    <!-- 上传 -->
                                    <input
                                        class="u-data-input"
                                        type="file"
                                        :id="'data_' + i"
                                        @change="uploadData($event, data, i)"
                                    />
                                    <el-button
                                        type="primary"
                                        @click="selectData(i)"
                                        >上传</el-button
                                    >
                                    <span
                                        class="u-data-ready"
                                        v-show="data.file"
                                    >
                                        <i class="el-icon-success"></i>
                                        已上传
                                    </span>
                                </el-col>

                                <el-col :span="6" class="u-action">
                                    <!-- 增加 -->
                                    <el-button plain @click="addData(i)"
                                        >增加</el-button
                                    >

                                    <!-- 删除 -->
                                    <el-button
                                        type="danger"
                                        v-if="i !== 0"
                                        @click="delData(i)"
                                        >删除</el-button
                                    >
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "@/components/publish/boilerplate";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
const API = __server + "upload";
import { uploadData } from "../service/house";
import album from "@/components/publish/album.vue";

export default {
    name: "house",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "house",
            name: "家园分享",
            loaded: false,

            //字段 - meta表数据,可设置默认值

            meta: {},

            //文章 - 主表数据
            post: {
                ID: "", //文章ID
                // post_author               //无需设置,由token自动获取
                // post_type:"",             //类型(默认由boilerplate托管)
                post_subtype: "广陵邑", //子类型(过滤查询用)
                post_title: "", //标题
                post_content: "", //主表内容字段,由后端接口配置是否双存储至meta表
                post_meta: {
                    server: "", //服务器
                    area: "", //分线
                    num: "", //房号
                    map: "广陵邑", //地图
                    pics: [], //图册
                    hasData: true,
                    blueprint: [
                        {
                            type: "整园蓝图",
                            desc: "",
                            file: "",
                        },
                    ], //蓝图
                },
                post_excerpt: "", //主表摘要
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_banner: "", //头条图,管理员可见
                post_status: "", //由发布按钮、草稿按钮决定
                // post_tags: [],            //标签列表
            },

            //扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false, //是否通知订阅用户
                followEnable: false, //是否通知粉丝
                tencentEnable: false, //是否同步至腾讯文档
                weiboEnable: false, //是否同步至微博头条文章
                tuilanEnable: false, //是否同步至推栏
            },

            // 临时
            dialogImageUrl: "",
            dialogVisible: false,
            upload_url: API,
        };
    },
    computed: {},
    methods: {
        // 发布
        toPublish: function() {
            this.doPublish(this.$store.state, this,false)
            console.log(this.$store.state);
        },
        // 草稿
        toDraft: function() {
            // this.doDraft(this.$store.state, this);
            console.log(this.$store.state);
        },
        // 加载
        init: function() {
            return this.doLoad(this);
        },

        // 蓝图
        selectData: function(i) {
            let fileInput = document.getElementById("data_" + i);
            fileInput.dispatchEvent(new MouseEvent("click"));
        },
        uploadData: function(e, item, i) {
            let formdata = new FormData();
            let file = e.target.files[0];
            formdata.append("file", file);
            uploadData(formdata, this).then((res) => {
                item.file = res.data.data.list[0];
                this.$message({
                    message: res.data.msg,
                    type: "success",
                });
            });
        },
        // 添加行
        addData: function(i) {
            // 目前设置最多10个版本
            if (this.post.post_meta.blueprint.length > 10) {
                this.$message.error("默认上限10个");
                return;
            }
            this.post.post_meta.blueprint.push({
                type: "整园蓝图",
                desc: "",
                file: "",
            });
        },
        // 删除行
        delData: function(i) {
            this.post.post_meta.blueprint.splice(i, 1);
        },

        // 图集
        updateAlbum: function(filelist) {
            let imglist = [];
            filelist.forEach((img) => {
                imglist.push({
                    name: img.name,
                    url: img.url,
                });
            });
            this.post.post_meta.pics = imglist;
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            console.log("Init Post:", this.post);
        });
    },
    filters: {
        // thumbnail: function(url) {
        //     return __imgPath + url + '?v20200510';
        // }
    },
    components: {
        boilerplate,
        album,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/house.less";
</style>
