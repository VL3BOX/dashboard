<template>
    <uc class="m-dashboard-honor m-dashboard-skin" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <template #header>
            <a
                class="u-link el-button el-button--default el-button--mini is-round is-plain"
                href="/vip/mall?category=virtual"
                target="_blank"
                ><i class="el-icon-shopping-cart-2"></i> 前往获取装扮</a
            >
        </template>
        <div class="m-honor">
            <div class="m-honor-left">
                <div class="u-header-info">
                    <Avatar class="u-author-avatar" :uid="uid" :url="avatar" :frame="avatar_frame" />
                    <div class="u-author-info">
                        <span class="u-name">
                            <span @click="copyData(data.display_name || '匿名')">{{ data.display_name || "匿名" }}</span
                            >&nbsp;<span class="u-uid" @click="copyData(data.ID || 0)">(UID : {{ data.ID || 0 }})</span>
                        </span>
                        <div class="u-tips">
                            <el-tooltip :content="`当前经验 ${data.experience || 0}`" placement="top">
                                <span
                                    class="u-level"
                                    :class="'lv-' + level"
                                    :style="{ backgroundColor: showLevelColor(level) }"
                                    >Lv.{{ level }}</span
                                >
                            </el-tooltip>
                            <el-tooltip :content="vipTypeTitle" v-if="isPRO || isVIP" placement="top">
                                <span class="u-vip" target="_blank">
                                    <i class="u-icon vip">{{ vipType }}</i>
                                </span>
                            </el-tooltip>
                            <el-tooltip content="签约作者" v-if="isSuperAuthor" placement="top">
                                <span class="u-superauthor">
                                    <i class="u-icon superauthor">签约作者</i>
                                </span>
                            </el-tooltip>
                        </div>
                        <div class="u-honor" v-if="!isSelect.isCustomize">{{ isSelect.val }}</div>
                    </div>
                </div>
            </div>

            <div class="m-honor-right">
                <div
                    class="u-btn"
                    :class="item.using ? 'on' : ''"
                    v-for="(item, i) in list"
                    :key="i"
                    @click="selectChange(item)"
                >
                    {{ item.val }}
                </div>
            </div>
        </div>
        <div class="m-btn">
            <el-button type="primary" @click="submit">确认</el-button>
            <el-button @click="reset">重置</el-button>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { themeTab } from "@/assets/data/tabs.json";
import User from "@jx3box/jx3box-common/js/user";
import { getMyInfo } from "@/service/index.js";
import { __userLevelColor, __imgPath } from "@jx3box/jx3box-common/data/jx3box";
import { getDecoration, setDecoration } from "@/service/decoration";
import { cloneDeep } from "lodash";
export default {
    name: "honor",
    props: [],
    data: function () {
        return {
            tabList: themeTab,
            isVIP: false,
            info: {
                uid: User.getInfo().uid,
                name: "匿名",
                user_avatar: "https://img.jx3box.com/image/common/avatar.png",
                user_avatar_frame: "default",
                bio: "-",
                sign: 0,
            },
            list: [],
            listBak: [],
            isSelect: {},
            isSelectBak: {},
        };
    },
    computed: {
        uid: function () {
            return User.getInfo().uid;
        },
        data: function () {
            return this.info;
        },
        avatar: function () {
            return this.data.user_avatar || "";
        },
        avatar_frame: function () {
            return this.data.user_avatar_frame || "";
        },
        isPRO: function () {
            return this.data?.is_pro;
        },
        isSuperAuthor: function () {
            return !!this.data?.sign;
        },
        vipType: function () {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTitle: function () {
            return this.isPRO ? "专业版会员用户" : "高级版会员用户";
        },
        level: function () {
            return User.getLevel(this.data?.experience || 0);
        },
    },
    methods: {
        loadUserInfo: function () {
            getMyInfo().then((res) => {
                if (res.data.data) {
                    this.info = res.data.data;
                }
            });
        },
        loadDecoration() {
            getDecoration({ type: "honor" }).then((data) => {
                let res = data.data.data;
                let filter = res.filter((item) => item.using == 1);
                this.list = res || [];
                let isCustomize = {
                    type: "honor_customize",
                    val: "不佩戴称号",
                    using: filter.length ? 0 : 1,
                    isCustomize: true,
                };
                if (filter.length) {
                    this.isSelect = filter[0];
                } else {
                    this.isSelect = isCustomize;
                }

                this.list.unshift(isCustomize);
                this.isSelectBak = cloneDeep(this.isSelect);
                this.listBak = cloneDeep(this.list);
            });
        },
        selectChange(item) {
            let list = this.list;
            let find = list.find((e) => e.using == 1);
            if (find) find.using = 0;
            item.using = 1;
            this.isSelect = item;
        },
        reset() {
            this.$set(this, "list", cloneDeep(this.listBak));
            this.$set(this, "isSelect", cloneDeep(this.isSelectBak));
        },
        showLevelColor: function (level) {
            return __userLevelColor[level];
        },
        submit() {
            setDecoration(this.list).then((data) => {
                this.$message({
                    message: "称号更新成功",
                    type: "success",
                });
            });
        },
    },
    mounted: function () {
        this.loadUserInfo();
        this.loadDecoration();
    },
    components: {
        uc,
    },
};
</script>
<style lang="less">
@import "../assets/css/honor.less";
</style>
