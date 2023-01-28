<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <div class="m-theme-box">
            <!-- 左右两侧 -->
            <div class="m-theme-left">
                <div class="u-top">

                </div>
                <div class="u-bottom">
                    <div class="u-type-box" v-for="(item,index) in themeType" :key="index">
                        <img src="https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg" class="u-img"/>
                        <div class="u-title">{{item.name}}</div>
                    </div>
                </div>
            </div>
            <div class="m-theme-right">
                <div class="u-no-theme on">
                    不设置主题
                </div>
                <!-- 主题渲染列表 -->
                <div class="u-theme">
                    <div class="u-decoration-list" v-for="(item) in decoration" :key="item.val">
                                <div class="u-title">
                                   {{item.name}}
                                </div>
                                <div class="u-decoration-item">
                                    <div
                                        v-for="(item2, i2) in item.list"
                                        :key="'c' + i2"
                                        :title="item2.name"
                                        class="u-picbox"
                                        
                                    >
                                    <div class="u-pic" :class="item2.using ? 'select' : ''">
                                        <img src="https://cdn.jx3box.com/static/dashboard/img/no.5fe91973.svg"/>
                                    </div>
                                     
                                        <div class="u-decoration-name">{{ item2.name }}</div>
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
export default {
    name: "theme",
    props: [],
    data: function() {
        return {
            tabList: [
                { name: "frame", icon: "el-icon-camera", label: "头像框" },
                { name: "theme", icon: "el-icon-s-shop", label: "主题风格" },
                { name: "emotion", icon: "el-icon-picture-outline-round", label: "表情包" },
                { name: "honor", icon: "el-icon-s-flag", label: "称号" }
            ],
            themeType:[
                {name:'艾特卡',val:'atcard',statue:1},
                {name:'主页背景',val:'homebanner',statue:1},
                {name:'侧边栏',val:'sidebar',statue:1},
                {name:'日历',val:'calendar',statue:1},
                {name:'社区称号',val:'',statue:0}
            ],
            decoration:[
                {name:'xxxx',val:'xxx',list:[{name:'xxx',val:'xxx',using:0},{name:'xxx',val:'xxx',using:1}]}
            ]
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        uc
    },
}
</script>
<style lang="less">
@import "../assets/css/theme.less";
</style>
