<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <div class="m-theme-box">
            <!-- 左右两侧 -->
            <div class="m-theme-left">
                <div class="u-top" :style="{ backgroundImage: bg }">
                    <!-- <img src="https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg" class="u-img"/> -->
                </div>
                <div class="u-bottom">
                    <div class="u-type-box" v-for="(item, index) in themeType" :key="index">
                        <!-- <img src="https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg" class="u-img" /> -->
                        <el-image src="https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg" fit="contain" class="u-img"></el-image>
                        <div class="u-title">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            <div class="m-theme-right">
                <div class="u-no-theme select">
                    不设置主题
                </div>
                <!-- 主题渲染列表 -->
                <div class="u-theme">
                    <div class="u-decoration-list" v-for="(item, i) in decoration" :key="i + item.val">
                        <div class="u-title">
                            {{ item.name }}
                        </div>
                        <div class="u-decoration-item">
                            <div v-for="(item2, i2) in item.list" :key="'c' + i2" :title="item2.name" class="u-picbox">
                                <div class="u-pic" :class="item2.using ? 'select' : ''">
                                    <!-- <img :src="item2 | showDecoration"/> -->
                                    <el-image :src="item2 | showDecoration" fit="contain"></el-image>
                                </div>
                                <div class="u-decoration-name">{{ item2.text }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { getDecoration, setDecoration, getDecorationJson } from "@/service/decoration";
import User from "@jx3box/jx3box-common/js/user";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { cloneDeep,orderBy,includes,groupBy } from "lodash";
export default {
    name: "theme",
    props: [],
    data: function () {
        return {
            tabList: [
                { name: "frame", icon: "el-icon-camera", label: "头像框" },
                { name: "theme", icon: "el-icon-s-shop", label: "主题风格" },
                { name: "emotion", icon: "el-icon-picture-outline-round", label: "表情包" },
                { name: "honor", icon: "el-icon-s-flag", label: "称号" }
            ],
            themeType: [
                { name: '艾特卡', val: 'atcard', statue: 1 },
                { name: '主页背景', val: 'homebanner', statue: 1 },
                { name: '侧边栏', val: 'sidebar', statue: 1 },
                { name: '日历', val: 'calendar', statue: 1 },
                { name: '社区称号', val: '', statue: 0 }
            ],
            bg: "url('https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg')", //预览合成背景
            decoration: [],
            decorationJson:[]
        };
    },
    computed: {},
    methods: {
        loadDecoration() {
            getDecorationJson().then((res) => {
                sessionStorage.setItem("decoration_json", JSON.stringify(res.data));
                this.decorationJson = res.data;
                getDecoration().then((res) => {
                    let typeArr=['atcard','homebg','sidebar','calendar']
                    let arr = res.data.data.filter((item) => item.type != "" && typeArr.indexOf(item.type) != -1);
                    this.decoration = this.formattingData(arr, "val");
                    // this.selectAllInit();
                });
            });
        },
        //数据分组，设置已激活name
        formattingData(arr, group_key) {
            // let arr=
            let map = {};
            let res = [];
            let _this = this;
            let options = [
                { type: "atcard", text: "艾特卡", sort: 1,isHave:0,using:0 },
                { type: "homebg", text: "主页背景", sort: 2,isHave:0,using:0 },
                { type: "sidebar", text: "侧边栏", sort: 3,isHave:0,using:0 },
                { type: "calendar", text: "日历", sort: 4,isHave:0,using:0 },
            ];
            for (let i = 0; i < arr.length; i++) {
                let ai = arr[i];
                let sortFind = options.find((e) => e.type == ai.type);
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
            //去重并判断是否拥有
            let uniqueFromObject = function (arr, uniId,key) {
                const res = new Map();
                let optionsClone=cloneDeep(options)
                let filterArr = arr.filter( (item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
                let newArr=[]
                for(let i =0;i<optionsClone.length;i++){
                    let find = filterArr.find((e) => e.type == optionsClone[i].type);
                    optionsClone[i].val=key
                    if(find){
                        optionsClone[i].isHave=1
                        optionsClone[i].using=find.using
                    }
                    newArr.push(optionsClone[i])
                }
               return newArr
            };
            let decorationJson=cloneDeep(this.decorationJson)
            Object.keys(decorationJson).forEach((key,i)=>{
                if(!map[key] && decorationJson[key].status ==1){
                    let optionsClone=cloneDeep(options)
                    let newArr=[]
                    optionsClone.forEach((item)=>{
                        item.val=key
                        newArr.push(item)
                    })
                    map[key]=newArr
                }
            })
            // return;
            Object.keys(map).forEach((key, i) => {
                if (i !== 0) {
                    if (key == _this.originalActivateName) {
                        _this.decorationActivate = i;
                    }
                }
                // uniqueFromObject(map[key], "type",key)
                res.push({
                    [group_key]: key,
                    name: decorationJson[key].desc,
                    list: uniqueFromObject(map[key], "type",key).sort(sortBy("sort")),
                });
            });
            console.log(res)
            return res;
        },
    },
    mounted: function () {
        this.loadDecoration()
    },
    filters: {
        showDecoration: function (item) {
            return __imgPath + `decoration/images/${item.val}/${item.type}_preview.png`;
        },
        showDecorationName: function (val) {
            let options = [
                { name: "atcard", text: "艾特卡" },
                { name: "homebg", text: "主页背景" },
                { name: "sidebar", text: "侧边栏" },
                { name: "calendar", text: "日历" },
            ];
            let res = options.find((item) => item.name == val);
            if (res) {
                return res.text;
            }
            return "无";
        },
    },
    components: {
        uc
    },
}
</script>
<style lang="less">
@import "../assets/css/theme.less";
</style>
