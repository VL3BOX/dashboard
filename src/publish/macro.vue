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
            :infoEnable="true"
            :contentEnable="true"
            :markdownEnable="false"
            :excerptEnable="false"
            :tagEnable="false"
            :notifyEnable="true"
            :bannerEnable="true"
            @publish="toPublish"
            publish_text="发布为公开"
            @draft="toDraft"
            draft_text="发布为私有"
        >
            <!-- 💛 栏目字段 -->
            <template>
                <el-form-item label="原创">
                    <el-switch v-model="post.original" active-color="#13ce66">
                    </el-switch>
                </el-form-item>

                <el-form-item label="语言">
                    <el-radio-group v-model="post.post_meta.lang">
                        <el-radio label="cn">简体中文</el-radio>
                        <el-radio label="tr">繁體中文</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!-- 1.选择资料片 -->
                <el-form-item label="资料片">
                    <el-select
                        class="m-publish-zlp m-macro-zlp"
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
                <el-form-item label="心法" class="m-publish-xf m-macro-xf">
                    <el-radio
                        v-for="(item, i) in options.xfmap"
                        v-model="post.post_subtype"
                        :label="item.name"
                        :key="i"
                        @change="changeSubtype"
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
                <el-divider content-position="left">宏</el-divider>
                <div class="m-macro-box">
                    <div class="m-macro-header">
                        <el-button
                            class="m-macro-addbutton"
                            icon="el-icon-circle-plus-outline"
                            type="primary"
                            @click="addMacro"
                            >添加宏</el-button
                        >
                        <a
                            class="m-macro-docs el-button el-button--primary is-plain el-button--small"
                            target="_blank"
                            href="https://www.jx3box.com/tool/265/"
                            ><i class="el-icon-s-management"></i>
                            宏命令完整参考手册</a
                        >
                        <a
                            class="m-macro-help el-button el-button--success is-plain el-button--small"
                            href="https://www.jx3box.com/tool/14671/"
                            target="_blank"
                        >
                            <i class="el-icon-info"></i> 点击查看发布帮助
                        </a>
                    </div>

                    <el-tabs
                        v-model="activeMacroIndex"
                        type="card"
                        closable
                        @tab-remove="removeMacro"
                    >
                        <el-tab-pane
                            v-for="(item, i) in post.post_meta.data"
                            :key="i"
                            :name="i + 1 + ''"
                        >
                            <span slot="label"
                                ><img class="u-tabicon" :src="icon(item)" />{{
                                    i + 1 + "号位-" + item.name
                                }}</span
                            >
                            <div class="m-macro-cloud m-macro-item">
                                <h5 class="u-title">
                                    云端宏图标/名称
                                    <a
                                        class="u-icon-links"
                                        href="/app/icons"
                                        target="_blank"
                                        ><i class="el-icon-question"></i>
                                        图标大全</a
                                    >
                                </h5>
                                <div class="u-group">
                                    <div class="u-subblock m-macro-icon">
                                        <el-input
                                            v-model="item.icon"
                                            placeholder="图标ID"
                                            :minlength="1"
                                            :maxlength="10"
                                            :max="30000"
                                            :min="0"
                                        >
                                            <template slot="prepend">
                                                <img
                                                    class="u-icon"
                                                    :src="icon(item)"
                                                />
                                            </template>
                                        </el-input>
                                    </div>
                                    <div class="u-subblock m-macro-name">
                                        <el-input
                                            v-model="item.name"
                                            placeholder="每个宏名称请使用自己名下唯一命名"
                                            :minlength="1"
                                            :maxlength="20"
                                            show-word-limit
                                            @change="checkDataName(item)"
                                        >
                                            <template slot="prepend"
                                                ><b class="u-feed"
                                                    >{{ nickname }}#{{
                                                        item.name
                                                    }}</b
                                                ></template
                                            >
                                        </el-input>
                                    </div>
                                </div>
                            </div>
                            <div class="m-macro-talent m-macro-item">
                                <h5 class="u-title">
                                    奇穴方案
                                </h5>
                                <div class="m-macro-talent-simulator">
                                    <div class="qx-container"></div>
                                </div>
                                <el-input
                                    v-model="item.talent"
                                    placeholder="奇穴方案编码"
                                    @change="checkTalent(item)"
                                    ><template slot="prepend"
                                        ><a
                                            class="u-get"
                                            target="_blank"
                                            href="/app/talent"
                                            ><i class="el-icon-warning"></i>
                                            获取编码</a
                                        ></template
                                    ></el-input
                                >
                            </div>
                            <div class="m-macro-macro">
                                <h5 class="u-title">
                                    宏内容
                                    <a
                                        class="u-icon-links"
                                        href="/app/macroeditor"
                                        target="_blank"
                                        ><i class="el-icon-question"></i>
                                        智能中文宏编辑器</a
                                    >
                                </h5>
                                <el-input
                                    v-model="item.macro"
                                    placeholder="注释请写在说明中,勿写在宏内部"
                                    :minlength="1"
                                    :maxlength="128"
                                    show-word-limit
                                    type="textarea"
                                    :rows="12"
                                >
                                </el-input>
                            </div>
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
import {
    __ossMirror,
    __iconPath,
    __imgPath,
} from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import { syncRedis } from "../service/macro.js";
import { sterilizer } from "sterilizer/index.js";
import lodash from "lodash";
import zlps from "../assets/data/zlps.json";
const default_meta = {
    zlp: zlps[0],
    lang: "cn",
    data: [
        {
            name: "",
            icon: 13,
            talent: "",
            macro: "",
            speed: "",
            equip: "",
            desc: "",
        },
    ],
};

export default {
    name: "macro",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "macro",
            name: "云端宏",
            loaded: false,

            //选项
            options: {
                zlps: zlps,
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
                post_meta: default_meta,
                post_excerpt: "", //主表摘要
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_banner: "", //头条图,管理员可见
                post_status: "", //由发布按钮、草稿按钮决定
                // post_tags: [],            //标签列表
                original: 0,
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
                syncRedis(res.data.data, this).then((redis_result) => {
                    this.finish(res.data.msg, res.data.data.ID, this.type);
                });
            });
        },
        // 草稿
        toDraft: function() {
            this.doDraft(this.build(), this, false).then((res) => {
                syncRedis(res.data.data, this).then((redis_result) => {
                    this.finish(res.data.msg, res.data.data.ID, this.type);
                });
            });
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
        // 加载
        init: function() {
            return this.doLoad(this).then((data) => {});
        },
        // 设置检索meta
        build: function() {
            let data = this.$store.state;
            data.post.meta_1 = data.post.post_meta.zlp; //资料片
            data.post.meta_2 = ~~lodash.get(
                xfmap[data.post.post_subtype],
                "id"
            ); //心法id
            data.post.meta_4 = data.post.post_meta.lang; //语言
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
                name: "",
                icon: 13,
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

            this.$alert("确定删除这个宏吗，删除后无法找回", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        // 删除
                        let i = ~~name - 1;
                        this.post.post_meta.data.splice(i, 1);
                        // 调整focus位置
                        this.activeMacroIndex = i + "";
                    }
                },
            });
        },

        // 检查版本名
        checkDataName: function(data) {
            let name = sterilizer(data.name).removeSpace();
            if (!name) {
                this.$notify.error({
                    title: "错误",
                    message: "宏名称不能为空",
                });
                return;
            }
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

        // 图标
        icon: function(item) {
            let id = isNaN(item.icon) ? 13 : ~~item.icon;
            id = Math.max(0, Math.min(id, 30000));
            this.$set(item, "icon", id);
            return __iconPath + "icon/" + id + ".png";
        },
        changeSubtype: function() {
            let iconid = xfmap[this.post.post_subtype]["icon"];
            this.$set(this.post.post_meta.data[0], "icon", iconid);
        },
    },
    filters: {
        xficon: function(id) {
            return __imgPath + "image/xf/" + id + ".png";
        },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            if (!this.post.post_meta) this.post.post_meta = default_meta;
            console.log("Init Post:", this.post);
        });
    },
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/macro.less";
</style>
