<template>
    <div class="m-publish-index">
        <div class="u-nav">
            <el-divider content-position="left">PVE / PVP</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/macro"
                            ><img
                                svg-inline
                                src="../assets/img/channel/macro.svg"
                            /><span>剑三宏</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/jx3dat"
                            ><img
                                svg-inline
                                src="../assets/img/channel/jx3dat.svg"
                            /><span>插件数据</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/fb"
                            ><img
                                svg-inline
                                src="../assets/img/channel/fb.svg"
                            /><span>副本攻略</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/bps"
                            ><img
                                svg-inline
                                src="../assets/img/channel/bps.svg"
                            /><span>职业攻略</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>

            <el-divider content-position="left">PVX / PVN</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/achievement"
                            ><img
                                svg-inline
                                src="../assets/img/channel/achievement.svg"
                            /><span>成就攻略</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/item"
                            ><img
                                svg-inline
                                src="../assets/img/channel/item.svg"
                            /><span>物品攻略</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/knowledge"
                            ><img
                                svg-inline
                                src="../assets/img/channel/knowledge.svg"
                            /><span>通识百科</span></router-link
                        ></el-card
                    ></el-col
                >
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/house"
                            ><img
                                svg-inline
                                src="../assets/img/channel/house.svg"
                            /><span>家园分享</span></router-link
                        ></el-card
                    ></el-col
                > -->
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/share"
                            ><img
                                svg-inline
                                src="../assets/img/channel/share.svg"
                            /><span>捏脸分享</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>

            <el-divider content-position="left">其它</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/tool"
                            ><img
                                svg-inline
                                src="../assets/img/channel/tool.svg"
                            /><span>教程工具</span></router-link
                        ></el-card
                    ></el-col
                >

                <el-col :span="4"
                    ><el-card
                        ><router-link to="/bbs"
                            ><img
                                svg-inline
                                src="../assets/img/channel/post.svg"
                            /><span>茶馆交流</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>

            <el-divider content-position="left">应用</el-divider>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-card>
                        <router-link to="/collection">
                            <img
                                svg-inline
                                src="../assets/img/publish/collection.svg"
                            />
                            <span>文集小册</span>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <el-card>
                        <router-link to="/item/plan">
                            <img
                                svg-inline
                                src="../assets/img/channel/item_plan.svg"
                            />
                            <span>物品清单</span>
                        </router-link>
                    </el-card>
                </el-col>
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/exam"
                            ><img
                                svg-inline
                                src="../assets/img/channel/100.svg"
                            /><span>趣味题库</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/namespace"
                            ><i class="el-icon-postcard"></i
                            ><span>剑三铭牌</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/publish/index.less";
</style>
