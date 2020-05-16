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
         -->
        <boilerplate
            :name="name"
            :type="type"
            :post="post"
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
            <el-form-item label="成就选择">
                <el-select
                        class="u-achievement_id"
                        v-model="post.achievement_id"
                        filterable
                        remote
                        reserve-keyword
                        :disabled="!!post.ID"
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
                <el-rate v-model="post.level" class="u-level"></el-rate>
            </el-form-item>

            <el-form-item label="修订说明">
                <el-input
                        v-model="post.remark"
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
    import {JX3BOX} from "@jx3box/jx3box-common";

    const {User} = require('@jx3box/jx3box-common');
    const qs = require("qs");
    const lodash = require('lodash');

    export default {
        name: "cj",
        props: [],
        data: function () {
            return {
                // 基本 - 类型设置
                type: "cj",
                name: "成就攻略",

                //选项 - 加载可选项
                options: {
                    achievements: null,
                    search_loading: false,
                },

                //文章 - 主表数据
                post: {
                    ID: "",                      //文章ID
                    post_mode: "tinymce",        //编辑模式(会影响文章详情页渲染规则)
                    // post_title: "",              //标题
                    post_content: "",            //主表内容字段,由后端接口配置是否双存储至meta表
                    achievement_id: "",
                    level: 3,
                    remark: "",
                    // post_excerpt: "",            //主表摘要
                    // post_tags: [],               //标签列表
                    // post_banner: "",             //头条图,管理员可见
                },


                // 扩展 - 部分栏目文章不应启用该功能
                extend: {
                    feedEnable: false,           //是否通知订阅用户
                    followEnable: false,         //是否通知粉丝
                    tencentEnable: false,        //是否同步至腾讯文档
                    weiboEnable: false,          //是否同步至微博头条文章
                    tuilanEnable: false,         //是否同步至推栏
                },

            };
        },
        computed: {},
        methods: {
            toPublish: function () {
                if (!this.post.achievement_id) {
                    this.$message({message: '请选择要修订攻略的成就', type: 'warning'});
                    return;
                }

                if (!this.post.post_content) {
                    this.$message({message: '要编写攻略正文哦', type: 'warning'});
                    return;
                }

                if (!this.post.remark) {
                    this.$message({message: '请简单描述本次修订说明', type: 'warning'});
                    return;
                }

                let cj = lodash.merge(this.$store.state.post,this.post)
                console.log(cj)
                return 

                $http({
                    method: "POST",
                    url: `${JX3BOX.__helperUrl}api/achievement/${this.post.achievement_id}/post`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    data: qs.stringify({
                        post: {
                            level: this.post.level,
                            user_nickname: User.getInfo().name,
                            content: this.post.post_content,
                            remark: this.post.remark,
                        },
                    }),
                })
                    .then((data) => {
                        data = data.data;
                        if (data.code === 200) {
                            this.$message({
                                message: "提交成功，请等待审核", type: 'success', onClose: (() => {
                                    this.$router.push({path: '/'});
                                })
                            });
                        } else {
                            this.$message({message: `${data.message}`, type: 'warning'});
                        }
                    })
                    .catch(() => {
                        this.$message({message: "网络异常，提交失败", type: 'error'});
                    })
                    .finally(() => {
                        //this.isEditMode = false;
                    });
            },
            toDraft: function () {
                console.log(this.$store.state)
            },
            get_achievement_newest_post(achievement_id) {
                return new Promise((resolve, reject) => {
                    if (!achievement_id) resolve(false);
                    $http({
                        url: `${JX3BOX.__helperUrl}api/achievement/${achievement_id}/post`,
                        headers: {Accept: "application/prs.helper.v2+json"},
                    })
                        .then((res) => {
                            let data = res.data;
                            resolve(data.code === 200 ? data.data : false);
                        })
                        .catch((err) => {
                            resolve(false);
                        });
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
                        headers: {Accept: "application/prs.helper.v2+json"},
                        params: {keyword: keyword, limit: length},
                    }).then(
                        function (data) {
                            data = data.data;
                            resolve(data.code === 200 ? data.data : false);
                        },
                        function () {
                            resolve(false);
                        }
                    );
                });
            },
        },
        async mounted() {
            await this.search_achievements_handle("");

            // 获取成就ID并通过watch获取攻略
            let achievement_id = this.$route.params.achievement_id;
            this.post.achievement_id = achievement_id ? parseInt(achievement_id) : null;

            // 去掉标题
            document.getElementsByClassName('m-publish-title').forEach((item) => {
                item.remove()
            });
            // 去掉草稿
            document.getElementsByClassName('el-button--plain').forEach((item) => {
                item.remove()
            });
        },
        watch: {
            'post.achievement_id': {
                async handler() {
                    let data = await this.get_achievement_newest_post(this.post.achievement_id);
                    let post = data.post;
                    let achievement = data.achievement;
                    if (post) {
                        // 富文本框赋值
                        let _interval = setInterval(() => {
                            this.post.post_content = '';
                            this.$store.state.post.post_content = '';
                            this.post.post_content = post.content;
                            this.$store.state.post.post_content = post.content;

                            if (!post.content || tinyMCE.activeEditor.getContent()) clearInterval(_interval);
                        }, 200);

                        // 数据填充
                        this.post.achievement_id = parseInt(post.achievement_id);
                        this.post.level = post.level || 1;
                        this.post.remark = '';
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
                }
            }
        },
        components: {
            boilerplate,
        },
    };
</script>

<style lang="less">
    @import "../assets/css/publish/cj.less";
</style>
