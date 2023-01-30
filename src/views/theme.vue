<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <div class="u-tips">
            <i class="el-icon-warning-outline"></i>仅限同主题配置，该主题下部位可分别激活，<a
                href="/vip/mall/#/list?type=virtual&subtype=skin"
                target="_blank"
                >前往购买主题装扮。</a>
        </div>
        <div class="m-theme-box">
            <!-- 左右两侧 -->
            <div class="m-theme-left">
                <div class="u-top">
                    <img :src="previewUrl" class="u-img" fit="contain" v-if="previewUrl"/>
                    <div class="u-no-preview" v-else>
                            暂 无<br/>
                            预 览
                        </div>
                </div>
                <div class="u-bottom">
                    <div class="u-type-box" v-for="(item, index) in themeType" :key="index">
                        <img :src="getActiveImg(item)" class="u-img" fit="contain" v-if="isStatus(item)" @click="preview(item)"/>
                        <div class="u-no-select" v-else-if="!item.statue">
                            敬 请<br/>
                            期 待
                        </div>
                        <div class="u-no-select" v-else>
                            暂 无<br/>
                            设 置
                        </div>
                        <div class="u-title">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            <div class="m-theme-right">
                <div class="u-no-theme" :class="decorationActivate==null?'select':''" @click="noSet">不设置主题</div>
                <!-- 主题渲染列表 -->
                <div class="u-theme">
                    <div class="u-decoration-list" v-for="(item, i) in decoration" :key="i + item.val">
                        <div class="u-title">
                            {{ item.name }}
                        </div>
                        <div class="u-decoration-item">
                            <div v-for="(item2, i2) in item.list" :key="'c' + i2" :title="item2.name" class="u-picbox">
                                <div
                                    class="u-pic"
                                    :class="item2.isHave ? (item2.using ? 'select' : '') : 'noHave'"
                                    @click="setStatus(i, i2, item2)"
                                >
                                    <!-- <img :src="item2 | showDecoration"/> -->
                                    <el-image :src="item2 | showDecoration" fit="contain" />
                                </div>
                                <div class="u-decoration-name">{{ item2.text }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="u-btn">
                    <el-button type="primary" @click="decorationSubmit">确认</el-button>
                    <el-button @click="reset">重置</el-button>
                </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { getDecoration, setDecoration, getDecorationJson } from "@/service/decoration";
import User from "@jx3box/jx3box-common/js/user";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep, flatten } from "lodash";
import { themeTab } from "@/assets/data/tabs.json";
import { find } from "domutils";
export default {
    name: "theme",
    props: [],
    data: function () {
        return {
            tabList: themeTab,
            uid: User.getInfo().uid,
            themeType: [
                { name: "艾特卡", type: "atcard", statue: 1 },
                { name: "主页背景", type: "homebg", statue: 1 },
                { name: "侧边栏", type: "sidebar", statue: 1 },
                { name: "日历", type: "calendar", statue: 1 },
                { name: "社区称号", type: "", statue: 0 },
            ],
            // bg: "url('https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg')", //预览合成背景
            previewUrl:'',
            decoration: [],
            decorationJson: [], //远程json
            decorationActivate: null,
            originalActivateName: null,
            back:{}
        };
    },
    computed: {},
    methods: {
        reset(){
            let back=cloneDeep(this.back)
            // let back=this.back
            this.previewUrl=''
            this.decoration=back.decoration
            this.decorationActivate= back.decorationActivate
            this.originalActivateName= back.originalActivateName
        },
        loadDecoration() {
            getDecorationJson().then((res) => {
                sessionStorage.setItem("decoration_json", JSON.stringify(res.data));
                this.decorationJson = res.data;
                getDecoration().then((res) => {
                    let typeArr = ["atcard", "homebg", "sidebar", "calendar"];
                    let arr = res.data.data.filter((item) => item.type != "" && typeArr.indexOf(item.type) != -1);
                    this.decoration = this.formattingData(arr, "val");
                    this.back.decoration=cloneDeep(this.decoration)
                    this.back.decorationActivate=cloneDeep(this.decorationActivate)
                    this.back.originalActivateName=cloneDeep(this.originalActivateName)
                });
            });
        },
        //数据分组，设置已激活name
        formattingData(arr, group_key) {
            let map = {},
                res = [];
            let options = [
                { type: "atcard", text: "艾特卡", sort: 1, isHave: 0, using: 0 },
                { type: "homebg", text: "主页背景", sort: 2, isHave: 0, using: 0 },
                { type: "sidebar", text: "侧边栏", sort: 3, isHave: 0, using: 0 },
                { type: "calendar", text: "日历", sort: 4, isHave: 0, using: 0 },
            ];
            arr.forEach((item, i) => {
                let sortFind = options.find((e) => e.type == item.type);
                if (sortFind) {
                    item.sort = sortFind.sort;
                    if (!map[item[group_key]]) {
                        map[item[group_key]] = [item];
                    } else {
                        map[item[group_key]].push(item);
                    }
                    if (item.using) {
                        this.originalActivateName = item[group_key];
                    }
                }
            });
            let sortBy = function (sort) {
                return (x, y) => {
                    return x[sort] - y[sort];
                };
            };
            //去重并判断是否拥有
            let uniqueFromObject = function (arr, uniId, key) {
                let res = new Map(),
                    newArr = [];
                let optionsClone = cloneDeep(options);
                let filterArr = arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
                optionsClone.forEach((item, i) => {
                    let find = filterArr.find((e) => e.type == item.type);
                    item.val = key;
                    if (find) {
                        item.isHave = 1;
                        item.using = find.using;
                    }
                    newArr.push(item);
                });
                return newArr;
            };
            let decorationJson = cloneDeep(this.decorationJson);
            Object.keys(decorationJson).forEach((key, i) => {
                if (!map[key] && decorationJson[key].status == 1) {
                    let optionsClone = cloneDeep(options);
                    let newArr = [];
                    optionsClone.forEach((item) => {
                        item.val = key;
                        newArr.push(item);
                    });
                    map[key] = newArr;
                }
            });
            Object.keys(map).forEach((key, i) => {
                if (i !== 0) {
                    if (key == this.originalActivateName) {
                        this.decorationActivate = i;
                    }
                }
                res.push({
                    [group_key]: key,
                    name: decorationJson[key].desc,
                    list: uniqueFromObject(map[key], "type", key).sort(sortBy("sort")),
                });
            });
            return res;
        },
        noSet(){
            let decorationActivate = this.decorationActivate;
            let res = this.decoration[decorationActivate] ? this.decoration[decorationActivate].list : [];
            for (let k = 0; k < res.length; k++) {
                res[k].using = 0;
            }
            this.decorationActivate = null
            this.previewUrl=''
        },
        //设置选中/取消
        setStatus(i, i2, item) {
            if (!item.isHave) {
                return;
            }
            item.using == 1 ? (item.using = 0) : (item.using = 1);
            let decorationActivate = this.decorationActivate;
            //需判断点击项目和原有已选择项目是否一致，不一致取消原有全部
            if (i != decorationActivate) {
                //需先把原有的置空再勾选点击项目
                let res = this.decoration[decorationActivate] ? this.decoration[decorationActivate].list : [];
                for (let k = 0; k < res.length; k++) {
                    res[k].using = 0;
                }
                //勾选当前选择
                this.decorationActivate = i;
            }
        },
        isStatus(item){
            let decorationActivate = this.decorationActivate;
            let res = this.decoration[decorationActivate] ? this.decoration[decorationActivate].list : [];
            let findSelect = res.find((e) => e.type == item.type && e.using == 1);
            if (findSelect) return true;
            else return false;
        },
        preview(item){
            this.previewUrl=this.getActiveImg(item)
        },
        getActiveImg(item) {
            let decorationActivate = this.decorationActivate;
            let val = this.decoration[decorationActivate] ? this.decoration[decorationActivate].val : null;
            let defaultImg = "https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg";
            if (val) return __imgPath + `decoration/images/${val}/${item.type}_preview.png`;
            else return defaultImg;
        },
        decorationSubmit() {
            let decorationActivate = this.decorationActivate,
                activateType = [];
            let decorationName = decorationActivate ? this.decoration[decorationActivate].val : "";
            //激活主题
            const _decorations = flatten(this.decoration.map((item) => item.list));
            const params = _decorations.map((item) => {
                if (item.using == 1) activateType.push(item.type);
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
                    type: activateType, //主题激活部位，
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
    },
    mounted: function () {
        this.loadDecoration();
    },
    filters: {
        showDecoration: function (item) {
            return __imgPath + `decoration/images/${item.val}/${item.type}_preview.png`;
        },
    },
    components: {
        uc,
    },
};
</script>
<style lang="less">
@import "../assets/css/theme.less";
</style>
