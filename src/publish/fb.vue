<template>
    <div class="m-publish-fb">
        <!-- 💛 预设选项 -->
        <boilerplate
            :name="name"
            :localDraft="true"
            labelPostion="left"
            :title="post.title"
            :infoEnable="true"
            :mode="post.mode"
            :markdownEnable="false"
            :content="post.content"
            :excerptEnable="true"
            :excerpt="post.excerpt"
            :tagEnable="false"
            :tags="post.tags"
            :notifyEnable="true"
            :notify="extend"
            :bannerEnable="true"
            :banner="post.banner"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template v-if="options.list.length">

                <!-- 1.选择资料片 -->
                <el-form-item label="资料片">
                    <el-radio
                        v-for="(devide, i) in zlp_list"
                        :label="devide.devide_name"
                        border
                        :key="i"
                        @change="selectLevel1(i)"
                        v-model="meta.fb_zlp"
                        >{{ devide.devide_name }}</el-radio
                    >
                </el-form-item>

                <!-- 2.选择副本名称 -->
                <el-form-item label="副本名称">
                    <el-radio
                        class="u-fb-thumbnail"
                        v-for="(fb, i) in fb_list"
                        :label="fb.name"
                        :key="i"
                        @change="selectLevel2(i, fb.cat_id)"
                        v-model="meta.fb_name"
                    >
                        <img :src="fb.icon | thumbnail(fb.icon)" :alt="fb.name" />
                        <span>{{ fb.name }}</span>
                    </el-radio>
                </el-form-item>

                <!-- 选择BOSS -->
                <el-form-item label="首领名称">
                    <el-checkbox-group v-model="meta.fb_boss">
                        <el-checkbox-button
                            v-for="(boss, i) in boss_list"
                            :label="boss.name"
                            :key="boss.name"
                            @change="selectLevel3(i, boss.name)"
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

// 依赖
import { LoadFBList, LoadFBDetails } from "../service/fb";

// 依赖 TODO:改为一个全局使用cdn图片路径的方法
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";

// 快捷方法 TODO:改为模板内置
const { autoSavePost } = require("../utils/autoSave");

export default {
    name: "fb",
    props: [],
    data: function() {
        return {
            type: "fb",
            name: "副本攻略",

            //选项
            options: {
                list: [],
                detail: [],
                level1:0,
                level2:0,
                level3:'fanyangyebian'
            },

            //字段
            meta: {
                fb_zlp: "世外蓬莱",
                fb_name: "范阳夜变",
                fb_boss: [],
                fb_level: [],
            },

            //文章
            post: {
                id: "",
                mode: "tinymce",
                title: "",
                content: "",
                excerpt: "",
                tags: [],
                banner: "",
            },

            //扩展
            //TODO:目前请勿启用，接口未做处理，且部分栏目文章不应启用该功能
            extend: {
                feedEnable: false,
                followEnable: false,
                weiboEnable: false,
                tuilanEnable: false,
            },
        };
    },
    computed: {
        // 引用store
        dbdata: function() {
            return this.$store.state;
        },
        // 字段
        zlp_list :function (){
            return this.options.list
        },
        fb_list : function (){
            return this.options.list[this.options.level1]['dungeon_infos']
        },
        boss_list : function (){
            return this.options.detail
        },
        level_list : function (){
            return this.options.list[this.options.level1]['dungeon_infos'][this.options.level2]['maps']
        }

    },
    watch: {
        // 通过编辑模式进行加载时
        post: {
            handler: function(val) {
                this.$store.commit("editPost", val);
            },
            deep: true,
        },
        // 修改自定义字段时
        meta: {
            handler: function(val) {
                this.$store.commit("editMeta", val);
            },
            deep: true,
        },
        // 反向监听store全部内容受组件影响时,更新本地草稿
        dbdata: {
            handler: function(data) {
                autoSavePost(name, data);
            },
            deep: true,
        },
    },
    methods: {
        // 发布
        toPublish: function() {
            this.doPublish(this.type, this.$store.state, this);
        },
        // 草稿
        toDraft: function() {
            this.doDraft(this.type, this.$store.state, this);
        },
        // 加载(编辑模式需加载原内容)
        init: function() {
            return this.doLoad(this, ["fb_boss", "fb_level"]);
        },
        // 初始化选项数据 //TODO:自动关联加载数据的索引
        optionsInit: function() {
            LoadFBList().then((res) => {
                this.options.list = res.data;
            });
            LoadFBDetails(this.options.level3).then((res) => {
                this.options.detail = res.data.data.info.boss_infos;
            });
        },

        // 本地操作方法
        selectLevel1: function(i) {
            this.options.level1 = i;
            this.options.level2 = 0; //重置为0
        },
        selectLevel2: function(i, cat_id) {
            this.options.level2 = i;
            this.options.level3 = cat_id;
            LoadFBDetails(cat_id).then((res) => {
                this.options.detail = res.data.data.info.boss_infos;
            });
        },
        selectLevel3: function(i, boss) {
            this.options.level3 = i;
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            // 初始化选项数据
            this.optionsInit();
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
