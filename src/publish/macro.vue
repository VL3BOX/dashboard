<template>
    <div class="m-dashboard-publish-macro">
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
            :excerptEnable="true"
            :tagEnable="false"
            :notifyEnable="true"
            :bannerEnable="true"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <!-- 1.选择资料片 -->
                <el-form-item label="资料片">
                    <el-select
                        class="m-macro-zlp"
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
                <el-form-item label="心法" class="m-macro-xf">
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

                <!-- 3.宏区域 -->
                <div class="m-macro-box">
                    <el-button
                        class="m-macro-addbutton"
                        icon="el-icon-circle-plus-outline"
                        type="primary"
                        @click="addMacro"
                        >添加宏</el-button
                    >
                    <a
                        class="m-macro-docs el-button el-button--success"
                        target="_blank"
                        href="https://www.jx3box.com/tool/265/"
                        ><i class="el-icon-s-management"></i>
                        宏命令完整参考手册</a
                    >

                    <el-tabs
                        v-model="activeMacroIndex"
                        type="border-card"
                        closable
                        @tab-remove="removeMacro"
                    >
                        <el-tab-pane
                            v-for="(item, i) in post.post_meta.data"
                            :key="i"
                            :label="i + 1 + '-' + item.name"
                            :name="i + 1 + ''"
                        >
                            <el-form-item label="名称" class="m-macro-name">
                                <el-input
                                    v-model="item.name"
                                    placeholder="每个宏名称请使用自己名下唯一命名"
                                    :minlength="1"
                                    :maxlength="20"
                                    show-word-limit
                                    @change="checkDataName(item)"
                                    ><template slot="prepend"
                                        ><b class="u-feed"
                                            >{{ nickname }}#{{ item.name }}</b
                                        ></template
                                    ><template slot="append"
                                        ><a class="u-help" href=""
                                            ><i class="el-icon-info"></i>
                                            更多帮助</a
                                        ></template
                                    ></el-input
                                >
                            </el-form-item>
                            <el-form-item label="奇穴" class="m-macro-talent">
                                <el-input
                                    class="u-talent"
                                    v-model="item.talent"
                                    placeholder="奇穴方案编码"
                                    @change="checkTalent(item)"
                                    ><template slot="prepend"
                                        ><a class="u-get" href=""
                                            ><i class="el-icon-warning"></i>
                                            获取编码</a
                                        ></template
                                    ><template slot="append"
                                        ><a class="u-help" href=""
                                            ><i class="el-icon-info"></i>
                                            更多帮助</a
                                        ></template
                                    ></el-input
                                >
                            </el-form-item>
                            <el-form-item label="宏" class="m-macro-macro">
                                <el-input
                                    v-model="item.macro"
                                    placeholder="宏内容,注释请写在说明中,勿写在宏内部"
                                    :minlength="1"
                                    :maxlength="128"
                                    show-word-limit
                                    type="textarea"
                                    :rows="12"
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="其它" class="m-macro-misc">
                                <el-row>
                                    <el-col :span="8" class="u-speed"
                                        ><el-input
                                            v-model="item.speed"
                                            placeholder="填写推荐的急速阈值"
                                        >
                                            <template slot="prepend"
                                                >急速阈值</template
                                            >
                                        </el-input></el-col
                                    >
                                    <el-col :span="8" class="u-equip"
                                        ><el-input
                                            v-model="item.equip"
                                            placeholder="配装方案编号,即将推出"
                                            disabled
                                            ><template slot="prepend"
                                                >配装方案</template
                                            ></el-input
                                        ></el-col
                                    >
                                    <el-col :span="8"></el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="说明" class="m-macro-desc">
                                <el-input
                                    v-model="item.desc"
                                    type="textarea"
                                    placeholder="补充说明.."
                                ></el-input>
                            </el-form-item>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "@/components/publish/boilerplate";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { syncRedis } from "../service/macro.js";
import { sterilizer } from "sterilizer/index.js";
export default {
    name: "macro",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "macro",
            name: "剑三宏",
            loaded: false,

            //选项
            options: {
                zlps: ["结庐江湖", "凌雪藏锋", "怒海争锋"],
                xfmap: xfmap,
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
                    zlp: "结庐江湖",
                    data: [
                        {
                            name: "宏名称",
                            talent: "",
                            macro: "",
                            speed: "",
                            equip: "",
                            desc: "",
                        },
                    ],
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

            // 其它
            activeMacroIndex: "1",
            nickname: User.getInfo().name,
        };
    },
    computed: {},
    methods: {
        // 发布
        toPublish: function() {
            // console.log(this.build());
            this.doPublish(this.build(), this, false).then((res) => {
                let data = res.data.data;
                let msg = res.data.msg;
                let id = res.data.data.ID;
                let type = this.type;

                syncRedis(data, this).then((res) => {
                    this.finish(msg, id, type);
                });
            });
            // console.log(this.$store.state);
        },
        finish: function(msg, id, type) {
            this.$message({
                message: msg,
                type: "success",
            });
            setTimeout(() => {
                location.href = "/" + type + "/?pid=" + id;
            }, 500);
        },
        // 草稿
        toDraft: function() {
            this.doDraft(this.build(), this);
            // console.log(this.$store.state);
        },
        // 加载
        init: function() {
            return this.doLoad(this).then((data) => {});
        },
        // 设置检索meta
        build: function() {
            let data = this.$store.state;
            data.post.meta_1 = data.post.post_meta.zlp; //资料片
            return data;
        },

        // 添加宏
        addMacro: function() {
            if (this.post.post_meta.data.length > 7) {
                this.$alert("已经达到添加上限", "消息", {
                    confirmButtonText: "确定",
                });
                return;
            }

            let index = this.post.post_meta.data.length + 1 + "";
            this.post.post_meta.data.push({
                name: "宏名称",
                talent: "",
                macro: "",
                speed: "",
                equip: "",
                desc: "",
            });
            this.activeMacroIndex = index;
        },
        // 删除宏
        removeMacro: function(name) {
            if (this.post.post_meta.data.length < 2) {
                this.$alert("必须保留1个宏", "消息", {
                    confirmButtonText: "确定",
                });
                return;
            }

            // 删除
            let i = ~~name - 1;
            this.post.post_meta.data.splice(i, 1);

            // 调整focus位置
            let current = ~~this.activeMacroIndex - 1;
            this.activeMacroIndex = current + "";
        },

        // 检查版本名
        checkDataName: function(data) {
            let name = sterilizer(data.name).removeSpace();
            name = sterilizer(name).kill();
            this.$set(data, "name", name);
        },
        checkTalent: function(data) {
            try {
                JSON.parse(data.talent);
            } catch (e) {
                this.$notify.error({
                    title: "错误",
                    message: "奇穴编码格式错误",
                });
            }
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            console.log("Init Post:", this.post);
        });
    },
    filters: {
        xficon: function(id) {
            return __ossMirror + "image/xf/" + id + ".png";
        },
    },
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/macro.less";
</style>
