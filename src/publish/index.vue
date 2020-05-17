<template>
    <div class="m-publish-index">
        <div class="u-nav">
            
            <!-- <el-divider content-position="left">PVE / PVP</el-divider>
            <el-row :gutter="20"> -->
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/macro"
                            ><img
                                svg-inline
                                src="../assets/img/channel/macro.svg"
                            /><span>剑三宏</span></router-link
                        ></el-card
                    ></el-col
                > -->
                <!-- <el-col :span="4"
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
                > -->
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/bps"
                            ><img
                                svg-inline
                                src="../assets/img/channel/bps.svg"
                            /><span>职业攻略</span></router-link
                        ></el-card
                    ></el-col
                > -->
            <!-- </el-row> -->

            <!-- <el-divider content-position="left">PVE / PVP / PVX</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/wiki"
                            ><img
                                svg-inline
                                src="../assets/img/channel/wiki.svg"
                            /><span>百科词条</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/tool"
                            ><img
                                svg-inline
                                src="../assets/img/channel/bps.svg"
                            /><span>干货教程</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/tool"
                            ><img
                                svg-inline
                                src="../assets/img/channel/tool.svg"
                            /><span>工具资源</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row> -->

            <el-divider content-position="left">PVX</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/cj"
                            ><img
                                svg-inline
                                src="../assets/img/channel/cj.svg"
                            /><span>成就攻略</span></router-link
                        ></el-card
                    ></el-col
                >
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/share"
                            ><img
                                svg-inline
                                src="../assets/img/channel/share.svg"
                            /><span>捏脸分享</span></router-link
                        ></el-card
                    ></el-col
                > -->
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/house"
                            ><img
                                svg-inline
                                src="../assets/img/channel/house.svg"
                            /><span>家园蓝图</span></router-link
                        ></el-card
                    ></el-col
                > -->
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/emotion"
                            ><img
                                svg-inline
                                src="../assets/img/channel/emotion.svg"
                            /><span>沙雕表情</span></router-link
                        ></el-card
                    ></el-col
                > -->
            </el-row>

            <!-- <el-divider content-position="left">PVN</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/fb"
                            ><img
                                svg-inline
                                src="../assets/img/channel/fb.svg"
                            /><span>回忆录</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/bbs"
                            ><img
                                svg-inline
                                src="../assets/img/channel/post.svg"
                            /><span>茶馆闲聊</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row> -->
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
