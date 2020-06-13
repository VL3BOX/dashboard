<template>
    <div class="m-publish-index">
        <div class="u-nav">
            <el-alert title="部分栏目发布系统尚在重构中,仍需前往老版发布中心发布,可能需要在老版登陆系统进行二次登陆,请知晓" type="warning" show-icon>
            </el-alert>

            <el-divider content-position="left">PVE / PVP</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/macro"
                            ><img
                                svg-inline
                                src="../assets/img/channel/macro.svg"
                            /><span>剑三宏</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/jx3dat"
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
                        ><router-link
                            to="/bps"
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
                        ><router-link to="/cj"
                            ><img
                                svg-inline
                                src="../assets/img/channel/cj.svg"
                            /><span>成就攻略</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link to="/house"
                            ><img
                                svg-inline
                                src="../assets/img/channel/house.svg"
                            /><span>家园分享</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/share"
                            href="https://www.jx3box.com/post/?pt=share"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/share.svg"
                            /><span>捏脸分享</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/tool"
                            href="https://www.jx3box.com/post/?pt=tool"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/tool.svg"
                            /><span>工具资源</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>

            <el-divider content-position="left">PVBB</el-divider>
            <el-row :gutter="20">
                <!-- <el-col :span="4"
                    ><el-card
                        ><router-link to="/wiki"
                            ><img
                                svg-inline
                                src="../assets/img/channel/wiki.svg"
                            /><span>百科词条</span></router-link
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
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/fb"
                            href="https://www.jx3box.com/post/?pt=bbs"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/fb.svg"
                            /><span>回忆录</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/bbs"
                            href="https://www.jx3box.com/post/?pt=bbs"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/post.svg"
                            /><span>茶馆闲聊</span></router-link
                        ></el-card
                    ></el-col
                >
            </el-row>

            <!-- <el-divider content-position="left">JX3BOX</el-divider>
            <el-row :gutter="20">
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/bbs"
                            href="https://www.jx3box.com/post/?pt=bbs"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/post.svg"
                            /><span>系统公告</span></router-link
                        ></el-card
                    ></el-col
                >
                <el-col :span="4"
                    ><el-card
                        ><router-link
                            to="/bbs"
                            href="https://www.jx3box.com/post/?pt=bbs"
                            target="_blank"
                            ><img
                                svg-inline
                                src="../assets/img/channel/post.svg"
                            /><span>帮助手册</span></router-link
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
