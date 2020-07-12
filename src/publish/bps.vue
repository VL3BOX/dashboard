<template>
    <div class="m-dashboard-publish-bps">
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
            :contentEnable="true"
            :markdownEnable="false"
            :excerptEnable="false"
            :tagEnable="false"
            :notifyEnable="true"
            :bannerEnable="true"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <el-form-item label="原创">
                    <el-switch
                        v-model="post.original"
                        active-color="#13ce66"
                    >
                    </el-switch>
                </el-form-item>
                <!-- 1.选择资料片 -->
                <el-form-item label="资料片">
                    <el-select
                        class="m-publish-zlp m-bps-zlp"
                        v-model="post.post_meta.zlp"
                        filterable
                        placeholder="资料片"
                    >
                        <el-option
                            v-for="item in options.zlps"
                            :key="item"
                            :label="item"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <!-- 2.选择心法 -->
                <el-form-item label="心法" class="m-publish-xf m-bps-xf">
                    <el-radio
                        v-for="(item, i) in options.xfmap"
                        v-model="post.post_subtype"
                        :label="item.name"
                        :key="i"
                    >
                        <img
                            class="u-pic"
                            :src="item.id | xficon"
                            :alt="item.name"
                        />
                        <span class="u-txt">{{ item.name }}</span>
                    </el-radio>
                </el-form-item>

                <!-- 3.选择方向 -->
                <el-form-item label="方向" class="m-bps-pvmode">
                    <el-radio-group v-model="post.post_meta.pvmode">
                        <el-radio
                            v-for="(item, i) in options.pvmode"
                            :label="item ? item : '全部'"
                            :key="i"
                        ></el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 4.内容要点 -->
                <!-- <el-form-item label="要点" class="m-bps-points">
                    <el-checkbox-group v-model="post.post_meta.points">
                        <el-checkbox
                            :label="item"
                            v-for="item in options.points"
                            :key="item"
                        ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "@/components/publish/boilerplate";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import lodash from "lodash";
import zlps from "../assets/data/zlps.json";
// import { points } from "../assets/data/bps.json";

export default {
    name: "bps",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "bps",
            name: "职业攻略",
            loaded: false,

            //选项
            options: {
                zlps: zlps,
                xfmap: xfmap,
                pvmode: ["PVE", "PVP", "PVX", ""],
                // points: points,
            },

            //字段
            meta: {},

            //文章 - 主表数据
            post: {
                ID: "", //文章ID
                // post_author               //无需设置,由token自动获取
                // post_type:"",             //类型(默认由boilerplate托管)
                post_subtype: "通用", //子类型(过滤查询用)
                post_title: "", //标题
                post_content: "", //主表内容字段,由后端接口配置是否双存储至meta表
                post_meta: {
                    zlp: zlps[0],
                    pvmode: "",
                    // points: [],
                },
                post_excerpt: "", //主表摘要
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_banner: "", //头条图,管理员可见
                post_status: "", //由发布按钮、草稿按钮决定
                // post_tags: [],            //标签列表
                original:0
            },

            //扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false, //是否通知订阅用户
                followEnable: false, //是否通知粉丝
                tencentEnable: false, //是否同步至腾讯文档
                weiboEnable: false, //是否同步至微博头条文章
                tuilanEnable: false, //是否同步至推栏
            },
        };
    },
    computed: {},
    methods: {
        // 发布
        toPublish: function() {
            // console.log(this.build());
            this.doPublish(this.build(), this);
        },
        // 草稿
        toDraft: function() {
            this.doDraft(this.build(), this);
        },
        // 加载
        init: function() {
            return this.doLoad(this).then((data) => {});
        },
        // 设置检索meta
        build: function() {
            let data = this.$store.state;
            data.post.meta_1 = data.post.post_meta.zlp; //资料片
            data.post.meta_2 = data.post.post_meta.pvmode; //PVE|PVP|PVX
            return data;
        },
    },
    filters: {
        xficon: function(id) {
            return __ossMirror + "image/xf/" + id + ".png";
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            console.log("Init Post:", this.post);
        });
    },
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/bps.less";
</style>
