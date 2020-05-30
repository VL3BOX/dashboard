<template>
    <div class="m-dashboard-publish-house">
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
            :name="name"
            :type="type"
            :post="post"
            :meta="meta"
            :extend="extend"
            :localDraft="true"
            :infoEnable="true"
            :markdownEnable="false"
            :excerptEnable="true"
            :tagEnable="false"
            :notifyEnable="false"
            :bannerEnable="false"
            @publish="toPublish"
            @draft="toDraft"
        >
            <!-- 💛 栏目字段 -->
            <template v-if="ready">
                <!-- 1.选择坐标 -->
                <el-form-item label="府邸坐标" class="m-house-coord">
                    <el-row>
                        <el-col :span="8"
                            ><el-input
                                v-model="post.post_meta.server"
                                placeholder="服务器名"
                            ></el-input
                        ></el-col>
                        <el-col :span="8"
                            ><el-input
                                v-model="post.post_meta.area"
                                placeholder="所在分线"
                            ></el-input
                            >线</el-col
                        >
                        <el-col :span="8"
                            ><el-input
                                v-model="post.post_meta.num"
                                placeholder="所在房号"
                            ></el-input
                            >号</el-col
                        >
                    </el-row>
                </el-form-item>

                <!-- 1.选择全屋还是局部蓝图 -->
                <el-form-item label="蓝图类型">
                    <el-radio
                        label="house"
                        border
                        key="house"
                        v-model="post.post_meta.house_blueprint_type"
                        >全屋蓝图</el-radio
                    >
                    <el-radio
                        label="partial"
                        border
                        key="partial"
                        v-model="post.post_meta.house_blueprint_type"
                        >局部蓝图</el-radio
                    >
                </el-form-item>

                <!-- 2.选择房子 -->
                <el-form-item label="选择房型">
                    <el-cascader
                        v-model="post.post_meta.house_type"
                        :options="houseNumberFilterOptions"
                        :props="{ expandTrigger: 'hover', value: 'id' }"
                        placeholder="请选择"
                        clearable
                        :show-all-levels="true"
                        @visible-change="handleClickShowCascader"
                        @change="handleChangeSelectedItem"
                        @expand-change="handleChangeSelectedItem"
                        ref="cascader"
                    >
                        <template slot-scope="{ node, data }">
                            <span style="float: left">{{
                                data.name ? data.name : data.label
                            }}</span>
                            <span
                                v-if="node.isLeaf"
                                style="float: right; color: #8492a6; font-size: 13px"
                                >#{{ data.id }}</span
                            >
                        </template>
                    </el-cascader>
                </el-form-item>

                <!-- 3.选择家园等级 -->
                <el-form-item label="家园等级" class="form-item-level">
                    <el-slider
                        v-model="post.post_meta.house_level"
                        show-stops
                        :show-tooltip="false"
                        :min="1"
                        :max="4"
                        label="家园等级滑块"
                        :marks="levelFilterSliderMarks"
                    ></el-slider>
                </el-form-item>

                <!-- 4.上传封面图（可选） -->
                <el-form-item label="封面图" class="form-item-cover">
                    <el-upload
                        class="cover-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleCoverSuccess"
                        :before-upload="beforeCoverUpload"
                    >
                        <img
                            v-if="post.post_meta.house_cover_url"
                            :src="post.post_meta.house_cover_url"
                            class="cover"
                        />
                        <i v-else class="el-icon-plus cover-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过2MB。建议上传16:9的图片。不上传默认选择正文第一张图片作为封面。
                        </div>
                    </el-upload>
                </el-form-item>
            </template>
        </boilerplate>
    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";
export default {
    name: "house",
    props: [],
    data: function() {
        return {
            //基本 - 类型设置
            type: "house",
            name: "家园蓝图",
            //选项 - 加载可选项

            cascaderShowScroll: false,
            houseNumberFilterOptions: [
                {
                    id: "0",
                    label: "广陵邑",
                    children: [
                        {
                            id: "size1200",
                            label: "1200m²",
                            children: [
                                { id: "5", cityid: "455", label: "挂剑里四邻" },
                                {
                                    id: "15",
                                    cityid: "455",
                                    label: "清茨里一邻",
                                },
                                {
                                    id: "24",
                                    cityid: "455",
                                    label: "吴亭里五邻",
                                },
                                {
                                    id: "26",
                                    cityid: "455",
                                    label: "吴亭里七邻",
                                },
                                {
                                    id: "27",
                                    cityid: "455",
                                    label: "襟江里一邻",
                                },
                                {
                                    id: "32",
                                    cityid: "455",
                                    label: "襟江里六邻",
                                },
                            ],
                        },
                        {
                            id: "size2080",
                            label: "2080m²",
                            children: [
                                { id: "2", cityid: "455", label: "挂剑里一邻" },
                                { id: "4", cityid: "455", label: "挂剑里三邻" },
                                { id: "7", cityid: "455", label: "通寰里二邻" },
                                { id: "8", cityid: "455", label: "通寰里三邻" },
                                { id: "9", cityid: "455", label: "通寰里四邻" },
                                {
                                    id: "10",
                                    cityid: "455",
                                    label: "通寰里五邻",
                                },
                                {
                                    id: "12",
                                    cityid: "455",
                                    label: "观桥里二邻",
                                },
                                {
                                    id: "13",
                                    cityid: "455",
                                    label: "观桥里三邻",
                                },
                                {
                                    id: "14",
                                    cityid: "455",
                                    label: "观桥里四邻",
                                },
                                {
                                    id: "16",
                                    cityid: "455",
                                    label: "清茨里二邻",
                                },
                                {
                                    id: "17",
                                    cityid: "455",
                                    label: "鱼雁里一邻",
                                },
                                {
                                    id: "18",
                                    cityid: "455",
                                    label: "鱼雁里二邻",
                                },
                                {
                                    id: "20",
                                    cityid: "455",
                                    label: "吴亭里一邻",
                                },
                                {
                                    id: "22",
                                    cityid: "455",
                                    label: "吴亭里三邻",
                                },
                                {
                                    id: "23",
                                    cityid: "455",
                                    label: "吴亭里四邻",
                                },
                                {
                                    id: "25",
                                    cityid: "455",
                                    label: "吴亭里六邻",
                                },
                                {
                                    id: "28",
                                    cityid: "455",
                                    label: "襟江里二邻",
                                },
                                {
                                    id: "30",
                                    cityid: "455",
                                    label: "襟江里四邻",
                                },
                                {
                                    id: "31",
                                    cityid: "455",
                                    label: "襟江里五邻",
                                },
                                {
                                    id: "33",
                                    cityid: "455",
                                    label: "襟江里七邻",
                                },
                            ],
                        },
                        {
                            id: "size3640",
                            label: "3640m²",
                            children: [
                                { id: "3", cityid: "455", label: "挂剑里二保" },
                                { id: "6", cityid: "455", label: "通寰里一保" },
                                {
                                    id: "11",
                                    cityid: "455",
                                    label: "观桥里一保",
                                },
                                {
                                    id: "19",
                                    cityid: "455",
                                    label: "鱼雁里三保",
                                },
                                {
                                    id: "21",
                                    cityid: "455",
                                    label: "吴亭里二保",
                                },
                                {
                                    id: "29",
                                    cityid: "455",
                                    label: "襟江里三保",
                                },
                            ],
                        },
                        {
                            id: "size7000",
                            label: "7000m²",
                            children: [
                                { id: "1", cityid: "455", label: "句容里一保" },
                            ],
                        },
                    ],
                },
                {
                    id: "1",
                    label: "望扬镇",
                    children: [
                        {
                            id: "size1200",
                            label: "1200m²",
                            children: [
                                { id: "5", cityid: "455", label: "挂剑里四邻" },
                                {
                                    id: "15",
                                    cityid: "455",
                                    label: "清茨里一邻",
                                },
                                {
                                    id: "24",
                                    cityid: "455",
                                    label: "吴亭里五邻",
                                },
                                {
                                    id: "26",
                                    cityid: "455",
                                    label: "吴亭里七邻",
                                },
                                {
                                    id: "27",
                                    cityid: "455",
                                    label: "襟江里一邻",
                                },
                                {
                                    id: "32",
                                    cityid: "455",
                                    label: "襟江里六邻",
                                },
                            ],
                        },
                        {
                            id: "size2080",
                            label: "2080m²",
                            children: [
                                { id: "2", cityid: "455", label: "挂剑里一邻" },
                                { id: "4", cityid: "455", label: "挂剑里三邻" },
                                { id: "7", cityid: "455", label: "通寰里二邻" },
                                { id: "8", cityid: "455", label: "通寰里三邻" },
                                { id: "9", cityid: "455", label: "通寰里四邻" },
                                {
                                    id: "10",
                                    cityid: "455",
                                    label: "通寰里五邻",
                                },
                                {
                                    id: "12",
                                    cityid: "455",
                                    label: "观桥里二邻",
                                },
                                {
                                    id: "13",
                                    cityid: "455",
                                    label: "观桥里三邻",
                                },
                                {
                                    id: "14",
                                    cityid: "455",
                                    label: "观桥里四邻",
                                },
                                {
                                    id: "16",
                                    cityid: "455",
                                    label: "清茨里二邻",
                                },
                                {
                                    id: "17",
                                    cityid: "455",
                                    label: "鱼雁里一邻",
                                },
                                {
                                    id: "18",
                                    cityid: "455",
                                    label: "鱼雁里二邻",
                                },
                                {
                                    id: "20",
                                    cityid: "455",
                                    label: "吴亭里一邻",
                                },
                                {
                                    id: "22",
                                    cityid: "455",
                                    label: "吴亭里三邻",
                                },
                                {
                                    id: "23",
                                    cityid: "455",
                                    label: "吴亭里四邻",
                                },
                                {
                                    id: "25",
                                    cityid: "455",
                                    label: "吴亭里六邻",
                                },
                                {
                                    id: "28",
                                    cityid: "455",
                                    label: "襟江里二邻",
                                },
                                {
                                    id: "30",
                                    cityid: "455",
                                    label: "襟江里四邻",
                                },
                                {
                                    id: "31",
                                    cityid: "455",
                                    label: "襟江里五邻",
                                },
                                {
                                    id: "33",
                                    cityid: "455",
                                    label: "襟江里七邻",
                                },
                            ],
                        },
                        {
                            id: "size3640",
                            label: "3640m²",
                            children: [
                                { id: "3", cityid: "455", label: "挂剑里二保" },
                                { id: "6", cityid: "455", label: "通寰里一保" },
                                {
                                    id: "11",
                                    cityid: "455",
                                    label: "观桥里一保",
                                },
                                {
                                    id: "19",
                                    cityid: "455",
                                    label: "鱼雁里三保",
                                },
                                {
                                    id: "21",
                                    cityid: "455",
                                    label: "吴亭里二保",
                                },
                                {
                                    id: "29",
                                    cityid: "455",
                                    label: "襟江里三保",
                                },
                            ],
                        },
                        {
                            id: "size7000",
                            label: "7000m²",
                            children: [
                                { id: "1", cityid: "455", label: "句容里一保" },
                            ],
                        },
                    ],
                },
                {
                    id: "2",
                    label: "九寨沟",
                    children: [
                        {
                            id: "size1200",
                            label: "1200m²",
                            children: [
                                { id: "5", cityid: "455", label: "挂剑里四邻" },
                                {
                                    id: "15",
                                    cityid: "455",
                                    label: "清茨里一邻",
                                },
                                {
                                    id: "24",
                                    cityid: "455",
                                    label: "吴亭里五邻",
                                },
                                {
                                    id: "26",
                                    cityid: "455",
                                    label: "吴亭里七邻",
                                },
                                {
                                    id: "27",
                                    cityid: "455",
                                    label: "襟江里一邻",
                                },
                                {
                                    id: "32",
                                    cityid: "455",
                                    label: "襟江里六邻",
                                },
                            ],
                        },
                        {
                            id: "size2080",
                            label: "2080m²",
                            children: [
                                { id: "2", cityid: "455", label: "挂剑里一邻" },
                                { id: "4", cityid: "455", label: "挂剑里三邻" },
                                { id: "7", cityid: "455", label: "通寰里二邻" },
                                { id: "8", cityid: "455", label: "通寰里三邻" },
                                { id: "9", cityid: "455", label: "通寰里四邻" },
                                {
                                    id: "10",
                                    cityid: "455",
                                    label: "通寰里五邻",
                                },
                                {
                                    id: "12",
                                    cityid: "455",
                                    label: "观桥里二邻",
                                },
                                {
                                    id: "13",
                                    cityid: "455",
                                    label: "观桥里三邻",
                                },
                                {
                                    id: "14",
                                    cityid: "455",
                                    label: "观桥里四邻",
                                },
                                {
                                    id: "16",
                                    cityid: "455",
                                    label: "清茨里二邻",
                                },
                                {
                                    id: "17",
                                    cityid: "455",
                                    label: "鱼雁里一邻",
                                },
                                {
                                    id: "18",
                                    cityid: "455",
                                    label: "鱼雁里二邻",
                                },
                                {
                                    id: "20",
                                    cityid: "455",
                                    label: "吴亭里一邻",
                                },
                                {
                                    id: "22",
                                    cityid: "455",
                                    label: "吴亭里三邻",
                                },
                                {
                                    id: "23",
                                    cityid: "455",
                                    label: "吴亭里四邻",
                                },
                                {
                                    id: "25",
                                    cityid: "455",
                                    label: "吴亭里六邻",
                                },
                                {
                                    id: "28",
                                    cityid: "455",
                                    label: "襟江里二邻",
                                },
                                {
                                    id: "30",
                                    cityid: "455",
                                    label: "襟江里四邻",
                                },
                                {
                                    id: "31",
                                    cityid: "455",
                                    label: "襟江里五邻",
                                },
                                {
                                    id: "33",
                                    cityid: "455",
                                    label: "襟江里七邻",
                                },
                            ],
                        },
                        {
                            id: "size3640",
                            label: "3640m²",
                            children: [
                                { id: "3", cityid: "455", label: "挂剑里二保" },
                                { id: "6", cityid: "455", label: "通寰里一保" },
                                {
                                    id: "11",
                                    cityid: "455",
                                    label: "观桥里一保",
                                },
                                {
                                    id: "19",
                                    cityid: "455",
                                    label: "鱼雁里三保",
                                },
                                {
                                    id: "21",
                                    cityid: "455",
                                    label: "吴亭里二保",
                                },
                                {
                                    id: "29",
                                    cityid: "455",
                                    label: "襟江里三保",
                                },
                            ],
                        },
                        {
                            id: "size7000",
                            label: "7000m²",
                            children: [
                                { id: "1", cityid: "455", label: "句容里一保" },
                            ],
                        },
                    ],
                },
                {
                    id: "3",
                    label: "七秀",
                    children: [
                        {
                            id: "size1200",
                            label: "1200m²",
                            children: [
                                { id: "5", cityid: "455", label: "挂剑里四邻" },
                                {
                                    id: "15",
                                    cityid: "455",
                                    label: "清茨里一邻",
                                },
                                {
                                    id: "24",
                                    cityid: "455",
                                    label: "吴亭里五邻",
                                },
                                {
                                    id: "26",
                                    cityid: "455",
                                    label: "吴亭里七邻",
                                },
                                {
                                    id: "27",
                                    cityid: "455",
                                    label: "襟江里一邻",
                                },
                                {
                                    id: "32",
                                    cityid: "455",
                                    label: "襟江里六邻",
                                },
                            ],
                        },
                        {
                            id: "size2080",
                            label: "2080m²",
                            children: [
                                { id: "2", cityid: "455", label: "挂剑里一邻" },
                                { id: "4", cityid: "455", label: "挂剑里三邻" },
                                { id: "7", cityid: "455", label: "通寰里二邻" },
                                { id: "8", cityid: "455", label: "通寰里三邻" },
                                { id: "9", cityid: "455", label: "通寰里四邻" },
                                {
                                    id: "10",
                                    cityid: "455",
                                    label: "通寰里五邻",
                                },
                                {
                                    id: "12",
                                    cityid: "455",
                                    label: "观桥里二邻",
                                },
                                {
                                    id: "13",
                                    cityid: "455",
                                    label: "观桥里三邻",
                                },
                                {
                                    id: "14",
                                    cityid: "455",
                                    label: "观桥里四邻",
                                },
                                {
                                    id: "16",
                                    cityid: "455",
                                    label: "清茨里二邻",
                                },
                                {
                                    id: "17",
                                    cityid: "455",
                                    label: "鱼雁里一邻",
                                },
                                {
                                    id: "18",
                                    cityid: "455",
                                    label: "鱼雁里二邻",
                                },
                                {
                                    id: "20",
                                    cityid: "455",
                                    label: "吴亭里一邻",
                                },
                                {
                                    id: "22",
                                    cityid: "455",
                                    label: "吴亭里三邻",
                                },
                                {
                                    id: "23",
                                    cityid: "455",
                                    label: "吴亭里四邻",
                                },
                                {
                                    id: "25",
                                    cityid: "455",
                                    label: "吴亭里六邻",
                                },
                                {
                                    id: "28",
                                    cityid: "455",
                                    label: "襟江里二邻",
                                },
                                {
                                    id: "30",
                                    cityid: "455",
                                    label: "襟江里四邻",
                                },
                                {
                                    id: "31",
                                    cityid: "455",
                                    label: "襟江里五邻",
                                },
                                {
                                    id: "33",
                                    cityid: "455",
                                    label: "襟江里七邻",
                                },
                            ],
                        },
                        {
                            id: "size3640",
                            label: "3640m²",
                            children: [
                                { id: "3", cityid: "455", label: "挂剑里二保" },
                                { id: "6", cityid: "455", label: "通寰里一保" },
                                {
                                    id: "11",
                                    cityid: "455",
                                    label: "观桥里一保",
                                },
                                {
                                    id: "19",
                                    cityid: "455",
                                    label: "鱼雁里三保",
                                },
                                {
                                    id: "21",
                                    cityid: "455",
                                    label: "吴亭里二保",
                                },
                                {
                                    id: "29",
                                    cityid: "455",
                                    label: "襟江里三保",
                                },
                            ],
                        },
                        {
                            id: "size7000",
                            label: "7000m²",
                            children: [
                                { id: "1", cityid: "455", label: "句容里一保" },
                            ],
                        },
                    ],
                },
            ],
            levelFilterSliderMarks: { 1: "1", 2: "2", 3: "3", 4: "4" },
            //字段 - meta表数据,可设置默认值
            meta: {},

            //文章 - 主表数据
            post: {
                ID: "", //文章ID
                // post_author               //无需设置,由token自动获取
                // post_type:"",             //类型(默认由boilerplate托管)
                post_subtype: "", //子类型(过滤查询用)
                post_title: "", //标题
                post_content: "", //主表内容字段,由后端接口配置是否双存储至meta表
                post_meta: {
                    house_blueprint_type: "house", // house或partial
                    house_type: "",
                    house_level: 1,
                    house_cover_url: "",
                },
                post_excerpt: "", //主表摘要
                post_mode: "tinymce", //编辑模式(会影响文章详情页渲染规则)
                post_banner: "", //头条图,管理员可见
                post_status: "", //由发布按钮、草稿按钮决定
                // post_tags: [],            //标签列表
            },

            //扩展 - 部分栏目文章不应启用该功能
            extend: {
                feedEnable: false, //是否通知订阅用户
                followEnable: false, //是否通知粉丝
                tencentEnable: false, //是否同步至腾讯文档
                weiboEnable: false, //是否同步至微博头条文章
                tuilanEnable: false, //是否同步至推栏
            },

            // 测试用数据
            ready: true,
        };
    },
    computed: {
        // 是否选项加载就绪
        // ready: function() {
        //     return Object.keys(this.options.map).length;
        // },
    },
    methods: {
        // 发布
        toPublish: function() {
            this.doPublish(this.$store.state, this, false).then((res) => {});
            console.log(this.$store.state);
        },
        // 草稿
        toDraft: function() {
            // this.doDraft(this.$store.state, this)
            console.log(this.$store.state);
        },
        // 加载
        init: function() {
            return this.doLoad(this);
        },
        queryServer: function() {},
        selectSerevr: function() {},

        handleCoverSuccess(res, file) {
            this.post.post_meta.house_cover_url = URL.createObjectURL(file.raw);
        },
        beforeCoverUpload(file) {
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传的封面图只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传的封面图图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        handleClickShowCascader(value) {
            let popper = this.$refs.cascader.$refs.popper;
            if (value) {
                this.$nextTick(() => {
                    let popperWidth = popper.clientWidth;
                    if (popperWidth > window.innerWidth - 5) {
                        // console.log('超过啦')
                        popper.classList.add("cascader-show-scroll");
                    }
                });
            } else {
                popper.classList.remove("cascader-show-scroll");
            }
        },
        handleChangeSelectedItem(value) {
            let popper = this.$refs.cascader.$refs.popper;
            popper.classList.remove("cascader-show-scroll");
            this.$nextTick(() => {
                let popperWidth = popper.clientWidth;
                if (popperWidth > window.innerWidth - 5) {
                    // console.log('超过啦')
                    popper.classList.add("cascader-show-scroll");
                }
            });
        },
        // 初始化选项数据
        // optionsInit: function() {
        //     return LoadFBList().then((res) => {
        //         this.options.map = res.data
        //     });
        // },
    },
    mounted: function() {
        // 初始化默认文章数据
        this.init().then(() => {
            console.log("Init Post:", this.post);
        });
    },
    filters: {
        // thumbnail: function(url) {
        //     return __imgPath + url + '?v20200510';
        // }
    },
    components: {
        boilerplate,
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/house.less";
</style>
