<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader name="成就百科" :localDraft="false">
            <slot name="header"></slot>
        </pubheader>

        <h1 class="m-publish-cj-header">贡献攻略</h1>
        <el-form
                label-position="left"
                label-width="80px"
                class="m-publish-cj"
        >
            <!-- 💛 栏目字段 -->
            <el-form-item label="成就选择">
                <el-select
                    class="u-achievement_id"
                    v-model="post.achievement_id"
                    filterable
                    :disabled="!!post.id"
                    placeholder="输入成就名称/成就描述/称号/奖励物品并按『回车』进行搜索"
                    :filter-method="search_achievements_handle"
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
                <el-rate v-model="post.level" class="u-level"></el-rate>
            </el-form-item>

            <el-form-item label="修订说明">
                <el-input
                    v-model="post.remark"
                    placeholder="请简单描述一下本次修订的说明"
                ></el-input>
            </el-form-item>

            <el-form-item label="攻略正文" class="m-publish-cj-content">
                <Tinymce
                        v-model="post.content"
                        :attachmentEnable="true"
                        :resourceEnable="true"
                        :height="400"
                />
                <el-button
                        class="u-publish"
                        icon="el-icon-s-promotion"
                        type="success"
                        @click="toPublish"
                        :disabled="processing"
                >提交攻略</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import pubheader from "@/components/publish/pubheader.vue";
import Tinymce from '@jx3box/jx3box-editor/src/Tinymce'

// 本地依赖
import { $ as $http } from "../service/axios";
import { JX3BOX } from "@jx3box/jx3box-common";

const { User } = require("@jx3box/jx3box-common");
const qs = require("qs");
const lodash = require("lodash");

export default {
    name: "cj",
    props: [],
    data: function() {
        return {
            //选项 - 加载可选项
            options: {
                achievements: null,
                search_loading: false,
            },

            //文章 - 主表数据
            post: {
                id: "",     // 文章ID
                content: "",
                achievement_id: "",
                level: 3,
                remark: "",
            },

            // 扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false, //是否通知订阅用户
                followEnable: false, //是否通知粉丝
                tencentEnable: false, //是否同步至腾讯文档
                weiboEnable: false, //是否同步至微博头条文章
                tuilanEnable: false, //是否同步至推栏
            },
        };
    },
    computed: {
        processing:function (){
            return this.$store.state.processing
        }
    },
    methods: {
        toPublish: function() {
            if (!this.post.achievement_id) {
                this.$message({
                    message: "请选择要修订攻略的成就",
                    type: "warning",
                });
                return;
            }

            if (!this.post.content) {
                this.$message({ message: "要编写攻略正文哦", type: "warning" });
                return;
            }

            if (!this.post.remark) {
                this.$message({
                    message: "请简单描述本次修订说明",
                    type: "warning",
                });
                return;
            }

            this.$store.commit('startProcess');
            $http({
                method: "POST",
                url: `${JX3BOX.__helperUrl}api/achievement/${this.post.achievement_id}/post`,
                headers: { Accept: "application/prs.helper.v2+json" },
                data: qs.stringify({
                    post: {
                        level: this.post.level,
                        user_nickname: User.getInfo().name,
                        content: this.post.content,
                        remark: this.post.remark,
                    },
                }),
            })
                .then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.$message({
                            message: "提交成功，请等待审核",
                            type: "success",
                            onClose: () => {
                                this.$router.go(0);
                            },
                        });
                    } else {
                        this.$message({
                            message: `${data.message}`,
                            type: "warning",
                        });
                    }
                })
        },
        get_achievement_newest_post(achievement_id) {
            return $http({
                url: `${JX3BOX.__helperUrl}api/achievement/${achievement_id}/post`,
                headers: {Accept: "application/prs.helper.v2+json"},
            }).catch((err) => {
                resolve(false);
            });
        },
        icon_url_filter(icon_id) {
            if (isNaN(parseInt(icon_id))) {
                return `${JX3BOX.__imgPath}image/common/nullicon.png`;
            } else {
                return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
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
    async mounted() {
        await this.search_achievements_handle("");

        // 获取成就ID并通过watch获取攻略
        let id = this.$route.params.achievement_id;
        this.post.achievement_id = id ? parseInt(id) : null;

        // 去掉标题
        document.getElementsByClassName("m-publish-title").forEach((item) => {
            item.remove();
        });
        // 去掉草稿
        document.getElementsByClassName("el-button--plain").forEach((item) => {
            item.remove();
        });
    },
    watch: {
        "post.achievement_id": {
            handler() {
                if(!this.post.achievement_id) return;
                this.get_achievement_newest_post(this.post.achievement_id)
                    .then((res) => {
                    let data = res.data;
                    data = data.code === 200 ? data.data : false;

                    // 数据填充
                    let post = data.post;
                    let achievement = data.achievement;
                    if (post) {
                        this.post.achievement_id = parseInt(post.achievement_id);
                        this.post.level = post.level || 1;
                        this.post.remark = "";
                        let content = post.content;
                        content = content.replace(/(<p>)?\s*◆成就难度 [★]+\s*(<\/p>)?/ig,'');
                        content = content.replace(/(<p>)?\s*◆花费时长 [★]+\s*(<\/p>)?/ig,'');
                        content = content.replace(/(<p>)?\s*◆成就攻略\s*(<\/p>)?/ig,'');
                        this.post.content = content;
                    } else {
                        this.post.achievement_id = this.post.achievement_id
                            ? parseInt(this.post.achievement_id)
                            : "";
                        this.post.level = 3;
                        this.post.remark = "";
                        this.post.content = "";
                    }

                    if (achievement) {
                        // 将选择项恢复至下拉框
                        let exist = false;
                        this.options.achievements = this.options.achievements || [];
                        for (let index in this.options.achievements) {
                            if (this.options.achievements[index].ID == this.post.achievement_id) {
                                exist = true;
                                break;
                            }
                        }
                        if (!exist) this.options.achievements.push(achievement);
                    }
                });
            },
        },
    },
    components: {
        pubheader,
        Tinymce,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/cj.less";
</style>
