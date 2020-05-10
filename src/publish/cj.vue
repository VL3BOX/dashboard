<template>
    <div class="m-publish-cj">
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
            :localDraft="true"
            labelPostion="left"
            :title="post.post_title"
            :infoEnable="true"
            :mode="post.post_mode"
            :markdownEnable="false"
            :content="post.post_content"
            :excerptEnable="false"
            :excerpt="post.post_excerpt"
            :tagEnable="false"
            :tags="post.post_tags"
            :notifyEnable="true"
            :notify="extend"
            :bannerEnable="false"
            :banner="post.post_banner"
            :publishDefault="false"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <el-form-item label="综合难度">
                <el-select
                    class="u-achievement_id"
                    v-model="post.achievement_id"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="输入成就名称/成就描述/称号/奖励物品"
                    :remote-method="search_achievements_handle"
                    :loading="options.search_loading"
                >
                    <el-option
                        v-for="item in options.achievements"
                        :key="item.ID"
                        :label="item.Name"
                        :value="item.ID"
                    >
                        <div class="m-selector-item">
                            <img
                                class="u-icon"
                                :src="icon_url_filter(item.IconID)"
                                :alt="item.Name"
                            />
                            <span class="u-name" v-text="item.Name"></span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="综合难度">
                <el-rate v-model="meta.level" class="u-level"></el-rate>
            </el-form-item>

            <el-form-item label="修订说明">
                <el-input
                    v-model="meta.remark"
                    placeholder="请简单描述一下本次修订的说明"
                ></el-input>
            </el-form-item>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

// 本地依赖
import {axios as $http} from '../service/axios'
import { JX3BOX } from "@jx3box/jx3box-common";

export default {
    name: "demo",
    props: [],
    data: function() {
        return {
            // 基本 - 类型设置
            type: "cj",
            name: "成就攻略",

            //选项 - 加载可选项
            options : {
                achievements: null,
                search_loading: false,
            },

            //字段 - meta表数据,可设置默认值
            meta :{
                level: 3,
                remark: "",
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

            // 扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false,
                followEnable: false,
                weiboEnable: false,
                tuilanEnable: false,
            },
            
        };
    },
    computed: {},
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
    },
    methods: {
        toPublish: function() {
            console.log(this.$store.state);
        },
        toDraft: function() {
            console.log(this.$store.state)
        },
        get_achievement_post(achievement_id) {
            if (!achievement_id) return;
            $http({
                url: `${JX3BOX.__helperUrl}api/achievement/${achievement_id}/post`,
                headers: { Accept: "application/prs.helper.v2+json" },
            })
                .then((res) => {
                    this.post = res.data.data.post || {};
                })
                .catch((err) => {
                    this.post = null;
                });
        },
        icon_url_filter(icon_id) {
            if (isNaN(parseInt(icon_id))) {
                return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
            } else {
                return `${JX3BOX.__ossMirror}icon/${icon_id}.png`;
            }
        },
        async search_achievements_handle(keyword) {
            this.options.search_loading = true;
            let data = await this.search_achievements(keyword, 10);
            this.options.achievements = data.achievements;
            this.options.search_loading = false;
        },
        // 成就搜索
        search_achievements(keyword, length) {
            return new Promise((resolve, reject) => {
                $http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/achievement/search`,
                    headers: { Accept: "application/prs.helper.v2+json" },
                    params: { keyword: keyword, limit: length },
                }).then(
                    function(data) {
                        data = data.data;
                        resolve(data.code === 200 ? data.data : false);
                    },
                    function() {
                        resolve(false);
                    }
                );
            });
        },
    },
    mounted: function() {

        this.search_achievements_handle("");

    },
    filters: {},
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/cj.less";
</style>
