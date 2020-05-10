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
            <template v-if="ready">

                <!-- 1.选择资料片 -->
                <el-form-item label="资料片">
                    <el-radio
                        v-for="(zlp, i) in zlp_list"
                        :label="zlp"
                        border
                        :key="i"
                        v-model="meta.fb_zlp"
                        >{{ zlp }}</el-radio
                    >
                </el-form-item>

                <!-- 2.选择副本名称 -->
                <el-form-item label="副本名称">
                    <el-radio
                        class="u-fb-thumbnail"
                        v-for="(fb, key) in fb_list"
                        :label="key"
                        :key="key"
                        v-model="meta.fb_name"
                    >
                        <img :src="fb.icon | thumbnail(fb.icon)" :alt="key" />
                        <span>{{ key }}</span>
                    </el-radio>
                </el-form-item>

                <!-- 选择BOSS -->
                <el-form-item label="首领名称">
                    <el-checkbox-group v-model="meta.fb_boss">
                        <el-checkbox-button
                            v-for="(boss, i) in boss_list"
                            :label="boss.name"
                            :key="i"
                            >{{ boss.name }}</el-checkbox-button
                        >
                    </el-checkbox-group>
                </el-form-item>

                <!-- 选择难度模式 -->
                <el-form-item label="难度模式">
                    <el-checkbox-group v-model="meta.fb_level">
                        <el-checkbox
                            v-for="(level, i) in level_list"
                            :label="level.mode"
                            :key="i"
                            :title="'地图ID : ' + level.map_id"
                        ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

// 本地依赖
import { LoadFBList } from "../service/fb";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";

export default {
    name: "fb",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "fb",
            name: "副本攻略",

            //选项 - 加载可选项
            options: {
                map: {},
            },

            //字段 - meta表数据,可设置默认值
            meta: {
                fb_zlp: "世外蓬莱",
                fb_name: "范阳夜变",
                fb_boss: [],
                fb_level: [],
            },

            //文章 - 主表数据
            post: {
                ID: "",                      //文章ID
                post_mode: "tinymce",        //编辑模式(会影响文章详情页渲染规则)
                post_title: "",              //标题
                post_content: "",            //主表内容字段,由后端接口配置是否双存储至meta表
                post_excerpt: "",            //主表摘要
                post_tags: [],               //标签列表
                post_banner: "",             //头条图,管理员可见
            },

            //扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false,      //是否通知订阅用户,由后端接口实现
                followEnable: false,    //是否通知粉丝,由后端接口实现
                weiboEnable: false,     //前端发起请求
                tuilanEnable: false,    //前端发起请求
            },
        };
    },
    computed: {
        // 是否选项加载就绪
        ready:function (){
            return Object.keys(this.options.map).length
        },
        zlp_list :function (){
            return Object.keys(this.options.map)
        },
        fb_list : function (){
            return this.options.map[this.meta.fb_zlp]['dungeon']
        },
        boss_list : function (){
            return this.fb_list[this.meta.fb_name]['detail']['boss_infos']
        },
        level_list : function (){
            return this.fb_list[this.meta.fb_name]['maps']
        }
    },
    methods: {
        // 发布
        toPublish: function() {
            console.log(this.$store.state)
            // 如使用默认发布接口publishDefault="true"时，可不执行任何操作
        },
        // 草稿
        toDraft: function() {
            console.log(this.$store.state)
            // 如使用默认发布接口publishDefault="true"时，可不执行任何操作
        },
        // 加载
        init: function() {
            // 编辑模式时需加载原内容 ?edit=id
            // toLoad参数2为需要格式化为数组的meta_key
            return this.doLoad(this, ["fb_boss", "fb_level"]);
        },
        // 初始化选项数据
        optionsInit: function() {
            return LoadFBList().then((res) => {
                this.options.map = res.data
            });
        },
    },
    mounted: function() {
        // 初始化选项数据
        this.optionsInit().then(() => {
            // 初始化默认文章数据
            this.init().then(() => {
                console.log(this.post,this.meta)
            })
        })
    },
    filters: {
        thumbnail: function(url) {
            return __ossMirror + url;
        },
    },
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/fb.less";
</style>
