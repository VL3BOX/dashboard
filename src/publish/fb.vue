<template>
    <div class="m-publish-fb">
        <!-- 💛 预设选项 -->
        <boilerplate
            :name="name"
            :localDraft="true"
            labelPostion="left"
            mode="tinymce"
            :tagEnable="false"
            :notify="notify"

            :title="post.title"
            :content="post.content"
            :excerpt="post.excerpt"
            :tags="post.tags"
            :banner="post.banner"
        >

        <!-- 💛 栏目字段 -->
            <!-- 1.选择资料片 -->
            <el-form-item label="资料片">
                <el-radio
                    v-for="(devide, i) in options.fb_list"
                    :label="devide.devide_name"
                    border
                    :key="i"
                    @change="selectLevel1(i)"
                    v-model="info.fb_zlp"
                    >{{ devide.devide_name }}</el-radio
                >
            </el-form-item>

            <!-- 2.选择副本名称 -->
            <el-form-item label="副本名称" v-if="options.fb_list.length">
                <el-radio
                    class="u-fb-thumbnail"
                    v-for="(fb, i) in options.fb_list[options.level1][
                        'dungeon_infos'
                    ]"
                    :label="fb.name"
                    :key="i"
                    @change="selectLevel2(i, fb.cat_id)"
                    v-model="info.fb_name"
                >
                    <img
                        :src="fb.icon | thumbnail(fb.icon)"
                        :alt="fb.name"
                    />
                    <span>{{ fb.name }}</span>
                </el-radio>
            </el-form-item>

            <!-- 选择BOSS -->
            <el-form-item label="首领名称" v-if="options.fb_list.length">
                <el-checkbox-group v-model="info.fb_boss">
                    <el-checkbox-button
                        v-for="(boss, i) in options.boss_list"
                        :label="boss.name"
                        :key="boss.name"
                        @change="selectLevel3(i, boss.name)"
                        >{{ boss.name }}</el-checkbox-button
                    >
                </el-checkbox-group>
            </el-form-item>

            <!-- 选择难度模式 -->
            <el-form-item label="难度模式" v-if="options.fb_list.length">
                <el-checkbox-group v-model="info.fb_level">
                    <el-checkbox
                        v-for="(level, i) in options.fb_list[
                            options.level1
                        ]['dungeon_infos'][options.level2]['maps']"
                        :label="level.mode"
                        :key="i"
                        :title="'地图ID : '+level.map_id"
                    ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

// 依赖
const { __ossMirror } = require("@jx3box/jx3box-common/js/jx3box");
const { dataPath } = require("@jx3box/jx3box-common/js/utils");
const fbListURL = dataPath("fb/fb_list.json", "0.0.1");

export default {
    name: "fb",
    props: [],
    data: function() {
        return {
            name: "副本攻略",

            //选项
            options: {
                fb_list: [],
                boss_list: [],
                level1: 0,
                level2: 0,
                level3: "fanyangyebian",
            },

            //取值
            info: {
                fb_zlp: "世外蓬莱",
                fb_name: "范阳夜变",
                fb_boss: [],
                fb_level: [],
            },

            //文章
            post : {
                title : '',
                content : '',
                excerpt : '',
                tags : [],
                banner : ''
            },

            //!接口都没写,一个都别启用,有些栏目默认就不太合适默认启用
            notify : {
                feedEnable: false,
                followEnable: false,
                weiboEnable: false,
                tuilanEnable: false,
            },
        };
    },
    computed: {},
    methods: {
        // 切换展示相关方法
        selectLevel1: function(i) {
            this.options.level1 = i;
        },
        selectLevel2: function(i, cat_id) {
            this.options.level2 = i;
            this.options.level3 = cat_id;
            this.$http
                .get(dataPath(`fb/fb_detail/${cat_id}.json`))
                .then((res) => {
                    this.options.boss_list = res.data.data.info.boss_infos;
                });
        },
        selectLevel3: function(i, boss) {
            this.options.level3 = i;
        },
        loadLevel1List: function() {
            this.$http.get(fbListURL).then((res) => {
                this.options.fb_list = res.data;
            });
        },
        loadBossList: function() {
            this.$http
                .get(dataPath(`fb/fb_detail/${this.options.level3}.json`))
                .then((res) => {
                    this.options.boss_list = res.data.data.info.boss_infos;
                });
        },
    },
    mounted: function() {
        // 初始化选项数据
        this.loadLevel1List();
        this.loadBossList();

        // 初始化文章数据
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
