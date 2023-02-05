<template>
    <uc class="m-dashboard-avatar">
        <div class="m-profile-avatar">
            <div class="m-profile-avatar-primary">
                <div class="u-avatar">
                    <img class="u-avatar u-avatar-l" :src="avatar | showAvatar" />
                </div>
                <el-upload
                    class="u-upload"
                    drag
                    accept="image/png, image/gif, image/jpeg"
                    :on-change="upload"
                    action="upload/avatar"
                    :auto-upload="false"
                >
                    <!-- <el-tooltip
                        class="item"
                        effect="dark"
                        content="点击上传，只能上传jpg/png/gif文件"
                        placement="top-start"
                    >
                        <div class="u-avatar">
                            <img class="u-avatar u-avatar-l" :src="avatar | showAvatar" />
                        </div>
                    </el-tooltip> -->
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                        <br />
                        <span class="u-tip">只能上传jpg/png/gif文件</span>
                    </div>
                </el-upload>
                <!-- 选中展示区，左头像框右主题小图 -->
                <!-- <span class="u-tip">当前装扮</span>
                <div class="u-select">
                    <div class="u-avatar">
                        <img :src="showFrame(frame)" v-if="frame" />
                    </div>
                    <div class="u-decoration">
                        <img
                            :src="decoration[decorationActivate].list[0] | showDecoration"
                            v-if="
                                decoration.length > 0 &&
                                decorationActivate != null &&
                                decoration[decorationActivate].val !== '无主题'
                            "
                        />
                    </div>
                </div> -->
                <p class="u-btng">
                    <el-button type="primary" @click="submit">确认</el-button>
                    <el-button @click="reset">重置</el-button>
                </p>
            </div>
            <!-- <div class="m-profile-avatar-frame">
                <el-tabs v-model="tabActivate" type="card">
                    <el-tab-pane label="头像框" name="0" class="m-profile-tab">
                        <h3 class="u-title">
                            自定义头像框
                            <span class="u-limit" :class="{ on: isVIP }">
                                ( <i :class="isVIP ? 'el-icon-unlock' : 'el-icon-lock'"></i>仅<a
                                    href="/vip/premium?from=dashboard_avatar"
                                    target="_blank"
                                    >高级/专业版</a
                                >账户适用 )
                            </span>
                        </h3>
                        <div class="u-list" v-if="frames">
                            <li class="u-item" :class="{ on: !frame }" @click="selectFrame('')">
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    content="无边框"
                                    placement="top"
                                    :open-delay="200"
                                >
                                    <div>
                                        <img :src="avatar | showSmallAvatar" v-show="!frame" class="u-pic" />
                                        <i class="u-frame u-frame-none"></i>
                                    </div>
                                </el-tooltip>
                            </li>
                            <li
                                class="u-item"
                                :class="{ on: name == frame }"
                                v-for="(item, name) in frames"
                                :key="name"
                                @click="selectFrame(item)"
                            >
                                <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="item.desc"
                                    placement="top"
                                    :open-delay="300"
                                >
                                    <div :class="{ 'u-blocked': !item.status }">
                                        <img
                                            :src="avatar | showSmallAvatar"
                                            v-show="name == frame"
                                            class="u-pic isCircle"
                                        />
                                        <i class="u-frame">
                                            <img :src="showFrame(item.name)" />
                                        </i>
                                    </div>
                                </el-tooltip>
                            </li>
                        </div>
                        <div class="u-tip">
                            <i class="el-icon-warning-outline"></i>
                            「限定头像框」仅在指定时间段可选择激活。
                        </div>
                    </el-tab-pane> -->
            <!-- <el-tab-pane label="主题装扮" name="1" class="m-profile-tab">
                        <el-tag type="info" class="u-empty" v-if="decoration.length == 0">暂无装扮</el-tag>
                        <div class="u-decoration-box">
                            <div class="u-decoration-list" v-for="(item, i) in decoration" :key="item.val">
                                <div class="u-title">
                                    {{ decorationJson[item.val] ? decorationJson[item.val].desc : "取消主题" }} &nbsp;
                                    <el-checkbox v-model="selectAll[i]" @change="selectAllChange($event, i)">{{
                                        i == 0 ? "选中" : "全选"
                                    }}</el-checkbox>
                                </div>
                                <div class="u-decoration-item">
                                    <div
                                        class="u-picbox"
                                        :class="selectAll[i] ? 'select' : ''"
                                        @click="selectAllChange(true, i)"
                                        v-show="item.list.length === 0"
                                    >
                                        <img :src="require('@/assets/img/avatar/no.svg')" class="u-pic" />
                                        <div class="u-decoration-name">取消主题</div>
                                    </div>

                                    <div
                                        v-for="(item2, i2) in item.list"
                                        :key="'c' + i2"
                                        :title="item2.type | showDecorationName"
                                        class="u-picbox"
                                        :class="item2.using ? 'select' : ''"
                                        @click="decorationStatus(item2, i2, i)"
                                    >
                                        <img :src="item2 | showDecoration" class="u-pic" />
                                        <div class="u-decoration-name">{{ item2.type | showDecorationName }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="u-tip">
                            <i class="el-icon-warning-outline"></i>
                            仅展示已拥有装扮，同主题部分可分别激活
                        </div>
                    </el-tab-pane> -->
            <!-- </el-tabs> -->
            <!-- </div> -->
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { updateAvatar, uploadAvatar, getFrames, getUserOverview } from "@/service/profile";
import { getDecoration, setDecoration, getDecorationJson } from "@/service/decoration";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { flatten } from "lodash";
export default {
    name: "avatar",
    props: [],
    data: function () {
        return {
            // 备份
            bak: "",
            // 数据
            avatar: "",
            frame: "",
            // VIP
            isVIP: false,
            uid: User.getInfo().uid,
            // 头像框
            frames,
            tabActivate: "0",
            decorationJson: {},
            decoration: [],
            decorationActivate: null,
            originalActivateName: null,
            selectAll: [],
            noDecoration: false,
        };
    },
    computed: {
        data: function () {
            return {
                user_avatar: this.avatar,
                user_avatar_frame: this.frame,
            };
        },
    },
    methods: {
        upload: function (file, fileList) {
            let formdata = new FormData();
            let filedata = file.raw;
            formdata.append("avatar", filedata);
            uploadAvatar(formdata).then((res) => {
                this.$message({
                    message: "上传成功",
                    type: "success",
                });
                this.avatar = res.data.data[0];
            });
        },
        reset: function () {
            this.avatar = this.bak;
        },
        submit: function () {
            // this.decorationSubmit();
            // if (!this.isVIP) {
            //     if (this.frame) {
            //         this.$notify({
            //             title: "头像框未生效",
            //             message: "头像框仅高级/专业账号可用",
            //             type: "warning",
            //         });
            //     }
            //     this.frame = "";
            // }
            updateAvatar(this.data).then((res) => {
                User.refresh("avatar", this.avatar);
                this.$message({
                    message: "头像更新成功",
                    type: "success",
                });
            });
        },
        decorationSubmit() {
            let tabActivate = this.decorationActivate;
            let decorationName = tabActivate ? this.decoration[tabActivate].val : "";
            //激活主题
            const _decorations = flatten(this.decoration.map((item) => item.list));
            let activate = this.getActivate();
            const params = _decorations.map((item) => {
                return {
                    val: item.val,
                    using: item.using,
                    type: item.type,
                };
            });
            setDecoration(params).then((data) => {
                //开始设置主题缓存,设置执行持久缓存，同时设置session,其他库优先获取session,无则获取local,还没数据则请求库所在主题位置接口
                let decoration_res = {
                    name: decorationName, //主题名称
                    type: activate, //主题激活部位，
                };
                if (!decorationName) {
                    decoration_res.name = false;
                }
                localStorage.setItem("decoration_all", JSON.stringify(decoration_res));
                //removeItem 个人相关部位
                sessionStorage.removeItem("decoration_me" + this.uid);
                sessionStorage.removeItem("decoration_sidebar" + this.uid);
                sessionStorage.removeItem("decoration_calendar");
                sessionStorage.removeItem("decoration_atcard" + this.uid);
                this.$message({
                    message: "主题更新成功",
                    type: "success",
                });
            });
        },
        //数据分组，设置已激活name
        formattingData(arr, group_key) {
            // let arr=
            let map = { 无主题: [] };
            let res = [];
            let _this = this;
            let options = [
                // { name: "homebanner", text: "资料卡", sort: 1 },
                { name: "atcard", text: "个人名片", sort: 2 },
                { name: "homebg", text: "主页风格", sort: 3 },
                { name: "sidebar", text: "侧边栏主题", sort: 4 },
                { name: "calendar", text: "首页日历", sort: 5 },
            ];

            for (let i = 0; i < arr.length; i++) {
                let ai = arr[i];
                let sortFind = options.find((e) => e.name == ai.type);
                if (sortFind) {
                    ai.sort = sortFind.sort;
                    if (!map[ai[group_key]]) {
                        map[ai[group_key]] = [ai];
                    } else {
                        map[ai[group_key]].push(ai);
                    }
                    if (ai.using) {
                        this.originalActivateName = ai[group_key];
                    }
                }
            }
            let sortBy = function (sort) {
                return (x, y) => {
                    return x[sort] - y[sort];
                };
            };
            let uniqueFromObject = function (arr, uniId) {
                const res = new Map();
                return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
            };

            Object.keys(map).forEach((key, i) => {
                if (i !== 0) {
                    // let j = {
                    //     type: "homebanner",
                    //     using: 0,
                    //     val: key,
                    //     sort: 1,
                    // };
                    if (key == _this.originalActivateName) {
                        _this.decorationActivate = i;
                        // j.using = 1;
                    }
                    // if (map[key].find((item) => item.type == "homebanner")) {
                    // } else {
                    //     map[key].push(j);
                    // }
                    //默认填充banner
                    // map[key].push(j)
                }
                res.push({
                    [group_key]: key,
                    list: uniqueFromObject(map[key], "type").sort(sortBy("sort")),
                });
            });
            return res;
        },
        loadFrames: function () {
            getFrames().then((res) => {
                this.frames = res.data;
            });
            getDecorationJson().then((res) => {
                sessionStorage.setItem("decoration_json", JSON.stringify(res.data));
                this.decorationJson = res.data;
                getDecoration().then((res) => {
                    let arr = res.data.data.filter((item) => item.type != "");
                    this.decoration = this.formattingData(arr, "val");
                    this.selectAllInit();
                });
            });
        },
        showFrame: function (name) {
            // if (process.env.NODE_ENV == "development") {
            //     return `temp/avatar/${name}/${name}.svg`;
            // }
            return __imgPath + `avatar/images/${name}/${name}.svg`;
        },
        selectFrame: function (item) {
            if (!item) {
                this.frame = "";
                return;
            }
            if (item.status) {
                this.frame = item.name;
            }
        },
        init: function () {
            this.loadFrames();
            User.isVIP().then((data) => {
                this.isVIP = data;
            });

            this.avatar = this.bak = User.getInfo().avatar_origin;
            getUserOverview(this.uid).then((res) => {
                this.frame = res.data.data.user_avatar_frame || "";
            });
        },
        decorationStatus(item, i2, i) {
            if (item.type == "homebanner") {
                return;
            }
            if (item.using == 1) {
                item.using = 0;
            } else {
                item.using = 1;
                // this.decoration[i].list.using=1
            }
            //需判断点击项目和原有已选择项目是否一致，不一致取消原有全部
            if (i != this.decorationActivate) {
                //需先把原有的置空再勾选点击项目
                let res = this.decoration[this.decorationActivate] ? this.decoration[this.decorationActivate].list : [];
                for (let k = 0; k < res.length; k++) {
                    res[k].using = 0;
                }
                this.selectAll[this.decorationActivate] = false;
                //勾选当前选择
                this.decorationActivate = i;
                // let homebanner = this.decoration[i].list.find((item) => item.type == "homebanner");
                // homebanner.using = 1;
            } else {
                //相同主题要判断全选//取消时判断该主题是否还有其他选择项目
                let res = this.decoration[i].list;
                let using = false,
                    selectStatus = true;
                for (let k = 0; k < res.length; k++) {
                    if (res[k].using && res[k].type != "homebanner") {
                        using = true;
                    } else {
                        selectStatus = false;
                    }
                }
                if (using) {
                    this.decorationActivate = i;
                } else {
                    // let homebanner = this.decoration[i].list.find((item) => item.type == "homebanner");
                    // homebanner.using = 0;
                    this.decorationActivate = null;
                }
                this.selectAll[i] = selectStatus;
            }
        },
        getActivate() {
            let tabActivate = this.decorationActivate;
            let arr = [],
                res = tabActivate ? this.decoration[tabActivate].list : [];
            for (let i = 0; i < res.length; i++) {
                if (res[i].using) {
                    arr.push(res[i].type);
                }
            }
            return arr;
        },
        //全选状态初始化
        selectAllInit() {
            let activate = this.decorationActivate;
            if (activate == null) {
                this.selectAll[0] = true;
                return;
            }
            let selectAll = true;
            let res = this.decoration[activate].list;
            for (let i = 0; i < res.length; i++) {
                if (!res[i].using) {
                    selectAll = false;
                }
            }
            this.selectAll[activate] = selectAll;
        },
        selectAllChange(e, index) {
            if (e) {
                this.decorationActivate = index;
            } else {
                this.decorationActivate = null;
            }
            let arr = [];
            for (let i = 0; i < this.selectAll.length; i++) {
                if (i != index) {
                    arr.push(false);
                } else {
                    arr.push(e);
                }
            }
            let res = this.decoration;
            for (let i = 0; i < res.length; i++) {
                let list = res[i].list;
                for (let k = 0; k < list.length; k++) {
                    if (i === index) {
                        if (e) {
                            list[k].using = 1;
                        } else {
                            list[k].using = 0;
                        }
                    } else {
                        list[k].using = 0;
                    }
                }
            }
            this.$set(this, "decoration", res);
            this.selectAll = arr;
        },
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val, 480, false);
        },
        showSmallAvatar: function (val) {
            return showAvatar(val, 136, false);
        },
        showDecoration: function (item) {
            return __imgPath + `decoration/images/${item.val}/${item.type}_preview.png`;
        },
        showDecorationName: function (val) {
            let options = [
                { name: "homebanner", text: "资料卡(默认)" },
                { name: "atcard", text: "个人名片" },
                { name: "homebg", text: "主页风格" },
                { name: "sidebar", text: "侧边栏主题" },
                { name: "calendar", text: "首页日历" },
            ];
            let res = options.find((item) => item.name == val);
            if (res) {
                return res.text;
            }
            return "无";
        },
    },
    created: function () {
        this.init();
    },
    components: {
        uc,
    },
};
</script>

<style lang="less">
@import "../assets/css/profile/avatar.less";
</style>
