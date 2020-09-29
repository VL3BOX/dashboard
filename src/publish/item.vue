<template>
    <div class="m-publish-box">
        <!-- 头部 -->
        <pubheader name="物品百科" :localDraft="false">
            <slot name="header"></slot>
        </pubheader>

        <h1 class="m-publish-item-header">贡献攻略</h1>
        <el-form label-position="left" label-width="80px" class="m-publish-item">
            <!-- 💛 栏目字段 -->
            <el-form-item label="物品选择">
                <el-select
                        class="u-item_id"
                        v-model="post.source_id"
                        filterable
                        remote
                        reserve-keyword
                        :disabled="!!post.id"
                        placeholder="输入物品名称/物品描述"
                        :remote-method="search_items"
                        :loading="options.search_loading"
                >
                    <el-option v-for="item in options.items" :key="item.UiID" :label="item.Name" :value="item.UiID">
                        <div class="m-selector-item">
                            <img class="u-icon" :src="icon_url_filter(item.IconID)" :alt="item.Name"/>
                            <span class="u-name" v-text="item.Name"></span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="综合难度">
                <el-rate v-model="post.level" class="u-level"></el-rate>
            </el-form-item>

            <el-form-item label="修订说明">
                <el-input v-model="post.remark" placeholder="请简单描述一下本次修订的说明"></el-input>
            </el-form-item>

            <el-form-item label="攻略正文" class="m-publish-item-content">
                <Tinymce
                        v-model="post.content"
                        :attachmentEnable="true"
                        :resourceEnable="true"
                        :height="400"
                />
                <el-button class="u-publish" icon="el-icon-s-promotion" type="success" @click="toPublish"
                           :disabled="processing">提交攻略
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import pubheader from "@/components/publish/pubheader.vue";
    import Tinymce from '@jx3box/jx3box-editor/src/Tinymce'

    // 本地依赖
    import {JX3BOX} from "@jx3box/jx3box-common";
    import {search_items, get_item_newest_post, create_item_post} from "../service/item";

    const qs = require("qs");
    const lodash = require("lodash");

    export default {
        name: "item",
        props: [],
        data: function () {
            return {
                //选项 - 加载可选项
                options: {
                    items: null,
                    search_loading: false,
                },

                //文章 - 主表数据
                post: {
                    id: "",     // 文章ID
                    content: "",
                    source_id: "",
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
            processing: function () {
                return this.$store.state.processing
            }
        },
        methods: {
            toPublish: function () {
                if (!this.post.source_id) {
                    this.$message({message: "请选择要修订攻略的物品", type: "warning"});
                    return;
                }

                if (!this.post.content) {
                    this.$message({message: "要编写攻略正文哦", type: "warning"});
                    return;
                }

                if (!this.post.remark) {
                    this.$message({message: "请简单描述本次修订说明", type: "warning"});
                    return;
                }

                this.$store.commit('startProcess');
                create_item_post(this.post).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.$message({
                            message: "提交成功，请等待审核", type: "success", onClose: () => {
                                this.$router.go(0);
                            }
                        });
                    } else {
                        this.$message({message: `${data.message}`, type: "warning",});
                    }
                });
            },
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__imgPath}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
                }
            },
            // 物品搜索
            search_items(keyword = '') {
                this.options.search_loading = true;
                search_items(keyword, 10).then(
                    (data) => {
                        data = data.data;
                        this.options.items = data.code === 200 ? data.data.data : false;
                        this.options.search_loading = false;
                    },
                    () => {
                        this.options.items = false;
                    }
                );
            },
        },
        mounted() {
            this.search_items();

            // 获取物品ID并通过watch获取攻略
            let id = this.$route.params.source_id;
            this.post.source_id = id ? id : null;

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
            "post.source_id": {
                handler() {
                    if (!this.post.source_id) return;
                    get_item_newest_post(this.post.source_id)
                        .then((res) => {
                            let data = res.data;
                            data = data.code === 200 ? data.data : false;

                            // 数据填充
                            let post = data.post;
                            let item = data.source;
                            if (post) {
                                this.post.source_id = post.source_id;
                                this.post.level = post.level || 1;
                                this.post.remark = "";
                                this.post.content = post.content;
                            } else {
                                this.post.source_id = this.post.source_id ? this.post.source_id : "";
                                this.post.level = 3;
                                this.post.remark = "";
                                this.post.content = "";
                            }

                            if (item) {
                                // 将选择项恢复至下拉框
                                let exist = false;
                                this.options.items = this.options.items || [];
                                for (let index in this.options.items) {
                                    if (this.options.items[index].UiID == this.post.source_id) {
                                        exist = true;
                                        break;
                                    }
                                }
                                if (!exist) this.options.items.push(item);
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
    @import "../assets/css/publish/item.less";
</style>
