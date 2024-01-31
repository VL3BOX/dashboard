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
                    <Avatar
                        class="u-author-avatar"
                        :uid="uid"
                        :url="avatar"
                        :size="avatarSize()"
                        :frame="avatar_frame"
                    />
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
                        <div
                            class="u-honor"
                            v-if="!isSelect.isCustomize"
                            :style="{ backgroundImage: `url(${imgUrl(isSelect)})` }"
                        >
                            <span :style="{ color: isSelect.color }">{{ isSelect.honor }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="m-honor-right">
                <div class="u-honor-list">
                    <div class="u-title">
                        <span class="u-name"><i class="el-icon-collection-tag"></i>称号</span>
                        <a class="u-buy" :href="`/vip/mall?category=virtual&sub_category=honor`" target="_blank"
                            ><i class="el-icon-shopping-cart-2"></i> 前往获取</a
                        >
                    </div>
                    <div class="u-honor-item">
                        <div class="u-picbox" v-for="(item, i) in list" :key="i">
                            <el-tooltip effect="dark" placement="top" :open-delay="200">
                                <div slot="content">{{ item.honor }}</div>
                                <div class="u-pic" :class="setClass(item)" @click="selectChange(item)">
                                    <el-image :src="imgUrl(item)" fit="contain" v-if="!item.isCustomize" />
                                    <div v-else class="u-noHonor"></div>
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
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
import { getDecoration, setDecoration, getHonor, getUserHonors, setHonor, cancelHonor } from "@/service/decoration";
import { cloneDeep, inRange } from "lodash";
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
                user_avatar: `${__imgPath}/image/common/avatar.png`,
                user_avatar_frame: "default",
                bio: "-",
                sign: 0,
            },
            list: [],
            listBak: [],
            isSelect: {},
            isSelectBak: {},
            honorList: {},
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
        imgUrl: function (item) {
            if (!item || item.isCustomize || !item.val) return;
            if (item.isImgIndex) {
                return __imgPath + `decoration/honor/${item.val}/${item.val}_${item.imgIndex}.${item.ext}`;
            }
            return __imgPath + `decoration/honor/${item.val}/${item.val}.${item.ext}`;
        },
        setClass(item) {
            if (!item.isHave) return "noHave";
            if (item.using) return "select";
        },
        avatarSize() {
            let w = document.body.clientWidth || document.documentElement.clientWidth;
            if (w > 500) {
                return "m";
            } else {
                return "s";
            }
        },
        loadUserInfo: function () {
            getMyInfo().then((res) => {
                if (res.data.data) {
                    this.info = res.data.data;
                }
            });
        },
        loadHonor() {
            getHonor().then((res) => {
                this.honorList = res.data;
                this.loadDecoration();
            });
        },
        loadDecoration() {
            getUserHonors(this.uid).then((data) => {
                let res = data || [];
                let honorList = this.honorList;
                let newArr = [];
                Object.keys(honorList).forEach((key, i) => {
                    let data = res.find((item) => item?.honor?.img == key);
                    let honorConfig = honorList[key];

                    let disposeHonor = function (honor) {
                        const data = honor?.honor || {};
                        //正则取出前缀
                        let only = honorConfig.only;
                        let prefix = honorConfig.prefix;
                        let regPrefix = honorConfig.prefix.match(/(?<=\{)(.+?)(?=\})/g);
                        let ranking = honorConfig.ranking;
                        let honorStr = honorConfig.year || "";
                        if (!only) {
                            if (regPrefix) {
                                if (data) {
                                    honorStr = honorStr + (honor?.[regPrefix[0]] || "");
                                }
                            } else {
                                honorStr = honorStr + prefix;
                            }
                        } else {
                            honorStr = prefix;
                        }
                        //排名处理
                        if (ranking.length > 0 && data) {
                            data.imgIndex = 0;
                            for (let i = 0; i < ranking.length; i++) {
                                //处在范围内取数组第三个值进行称号拼接
                                if (
                                    honor?.ranking != undefined &&
                                    inRange(Number(honor?.ranking), ranking[i][0], ranking[i][1])
                                ) {
                                    data.imgIndex = i;
                                    let str = ranking[i][2];
                                    //正则取出需替换值，如果没有则直接拼接
                                    let regStr = str.match(/(?<=\{)(.+?)(?=\})/g);
                                    if (regStr) {
                                        //包含花括号替换
                                        honorStr =
                                            honorStr +
                                            str.replace(/\{([^{}]+?)\}/g, function (match, p1) {
                                                return data[p1] || honor[p1] || "";
                                            });
                                    } else {
                                        honorStr = honorStr + str;
                                    }
                                    break;
                                }
                            }
                        }
                        return honorStr + honorConfig.suffix;
                    };
                    if (data) {
                        data.honor = disposeHonor(data);
                        data.color = honorConfig.color;
                        data.ext = honorConfig.ext;
                        data.val = key;
                        data.isHave = true;
                        data.imgIndex = data.honor?.imgIndex || 0;
                        (data.isImgIndex = honorConfig.ranking.length > 0 ? true : false), newArr.push(data);
                    } else {
                        let json = {
                            color: honorConfig.color,
                            ext: honorConfig.ext,
                            honor: disposeHonor(),
                            extra: "尚未获取的称号框",
                            using: 0,
                            type: "honor",
                            val: key,
                            isHave: false,
                            imgIndex: 0,
                            isImgIndex: honorConfig.ranking.length > 0 ? true : false,
                        };
                        newArr.push(json);
                    }
                });
                let isUsing = newArr.find((item) => item.using == 1);
                this.list = newArr || [];
                let isCustomize = {
                    type: "honor_customize",
                    val: "不佩戴称号",
                    honor: "取消佩戴称号",
                    using: isUsing ? 0 : 1,
                    isHave: true,
                    isCustomize: true, //是否是自己定义的
                };
                if (isUsing) {
                    this.isSelect = isUsing;
                } else {
                    this.isSelect = isCustomize;
                }
                this.list.unshift(isCustomize);
                this.isSelectBak = cloneDeep(this.isSelect);
                this.listBak = cloneDeep(this.list);
            });
            // getDecoration({ type: "honor" }).then((data) => {
            //     let res = data.data.data;
            //     // let res = [];
            //     let honorList = this.honorList;
            //     let newArr = [];
            //     Object.keys(honorList).forEach((key, i) => {
            //         let data = res.find((item) => item.val == key);
            //         let honorConfig = honorList[key];

            //         let disposeHonor = function (data) {
            //             //正则取出前缀
            //             let prefix = honorConfig.prefix;
            //             let regPrefix = honorConfig.prefix.match(/(?<=\{)(.+?)(?=\})/g);
            //             let ranking = honorConfig.ranking;
            //             let honorStr = honorConfig.year || "";
            //             if (regPrefix) {
            //                 if (data) {
            //                     honorStr = honorStr + (data[regPrefix[0]] || "");
            //                 }
            //             } else {
            //                 honorStr = honorStr + prefix;
            //             }
            //             //排名处理
            //             if (ranking.length > 0 && data) {
            //                 data.imgIndex = 0;
            //                 for (let i = 0; i < ranking.length; i++) {
            //                     //处在范围内取数组第三个值进行称号拼接
            //                     if (
            //                         data.ranking != undefined &&
            //                         inRange(Number(data.ranking), ranking[i][0], ranking[i][1])
            //                     ) {
            //                         data.imgIndex = i;
            //                         let str = ranking[i][2];
            //                         //正则取出需替换值，如果没有则直接拼接
            //                         let regStr = str.match(/(?<=\{)(.+?)(?=\})/g);
            //                         if (regStr) {
            //                             //包含花括号替换
            //                             honorStr = honorStr + str.replace(/\{(.+?)\}/g, data[regStr[0]]);
            //                         } else {
            //                             honorStr = honorStr + str;
            //                         }
            //                         break;
            //                     }
            //                 }
            //             }
            //             return honorStr + honorConfig.suffix;
            //         };
            //         if (data) {
            //             data.honor = disposeHonor(data);
            //             data.color = honorConfig.color;
            //             data.ext = honorConfig.ext;
            //             data.isHave = true;
            //             (data.isImgIndex = honorConfig.ranking.length > 0 ? true : false), newArr.push(data);
            //         } else {
            //             let json = {
            //                 color: honorConfig.color,
            //                 ext: honorConfig.ext,
            //                 honor: disposeHonor(),
            //                 extra: "尚未获取的称号框",
            //                 using: 0,
            //                 type: "honor",
            //                 val: key,
            //                 isHave: false,
            //                 imgIndex: 0,
            //                 isImgIndex: honorConfig.ranking.length > 0 ? true : false,
            //             };
            //             newArr.push(json);
            //         }
            //     });
            //     let isUsing = newArr.find((item) => item.using == 1);
            //     this.list = newArr || [];
            //     let isCustomize = {
            //         type: "honor_customize",
            //         val: "不佩戴称号",
            //         honor: "取消佩戴称号",
            //         using: isUsing ? 0 : 1,
            //         isHave: true,
            //         isCustomize: true, //是否是自己定义的
            //     };
            //     if (isUsing) {
            //         this.isSelect = isUsing;
            //     } else {
            //         this.isSelect = isCustomize;
            //     }
            //     this.list.unshift(isCustomize);
            //     this.isSelectBak = cloneDeep(this.isSelect);
            //     this.listBak = cloneDeep(this.list);
            // });
        },

        selectChange(item) {
            if (!item.isHave) return;
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
            const item = this.list?.find((e) => e.using == 1);
            if (item?.honor_id) {
                setHonor(item.honor_id).then((res) => {
                    this.$message({
                        message: "称号更新成功",
                        type: "success",
                    });
                });
            } else {
                cancelHonor().then((res) => {
                    this.$message({
                        message: "称号更新成功",
                        type: "success",
                    });
                });
            }
        },
    },
    mounted: function () {
        this.loadUserInfo();
        this.loadHonor();
    },
    components: {
        uc,
    },
};
</script>
<style lang="less">
@import "../assets/css/honor.less";
</style>
