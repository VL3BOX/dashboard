<template>
    <div class="m-publish-cj">
        <!-- 💛 预设选项 -->
        <boilerplate
                :name="name"
                :localDraft="true"
                labelPostion="left"
                :title="post.title"

                mode="tinymce"
                :markdownEnable="false"
                :content="post.content"

                :notifyEnable="false"
                :notify="notify"

                @publish="toPublish"
                @draft="toDraft"
        >

            <!-- 💛 栏目字段 -->
            <el-form-item label="综合难度">
                <el-select
                        class="u-achievement_id"
                        v-model="post.achievement_id"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="输入成就名称/成就描述/称号/奖励物品"
                        :remote-method="search_achievements_handle"
                        :loading="search_loading">
                    <el-option
                            v-for="item in achievements"
                            :key="item.ID"
                            :label="item.Name"
                            :value="item.ID">
                        <div class="m-selector-item">
                            <img class="u-icon" :src="icon_url_filter(item.IconID)" :alt="item.Name"/>
                            <span class="u-name" v-text="item.Name"></span>
                        </div>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="综合难度">
                <el-rate v-model="post.level" class="u-level"></el-rate>
            </el-form-item>

            <el-form-item label="修订说明">
                <el-input v-model="post.remark" placeholder="请简单描述一下本次修订的说明"></el-input>
            </el-form-item>

        </boilerplate>

    </div>
</template>

<script>
    import boilerplate from "../components/publish/boilerplate";

    const {JX3BOX} = require("@jx3box/jx3box-common");

    // 依赖
    // TODO:你的依赖

    export default {
        name: "demo",
        props: [],
        data: function () {
            return {

                // TODO:4.选项数据设置
                // begin>>---------------------
                name: "成就攻略",

                search_loading: false,

                //选项
                options: {
                    xx: []
                },

                //取值
                info: {
                    xx: ''
                },

                // <<end---------------------

                //文章
                post: {
                    title: '',
                    content: '',
                    level: 3,
                    remark: '',
                },

                notify: {
                    feedEnable: false,
                    followEnable: false,
                    weiboEnable: false,
                    tuilanEnable: false,
                },

                achievements: null,
            };
        },
        computed: {},
        watch: {
            info: function (val) {
                this.$store.commit('editInfo', val)
            }
        },
        methods: {
            // TODO:加载编辑内容,接口需要进行鉴权
            loadOrigin: function () {
                // ?edit=123
                // this.$axios.get(API,{
                //     params : {}
                // }).then((res) => {
                //     this.post.title = res.data.data.title
                // })
            },

            // TODO:7.发布逻辑,拿store内容提交至对应接口
            toPublish: function () {
                console.log(this.$store.state)
                // this.toBuild()
            },
            toDraft: function () {
                console.log(this.$store.state)
                // this.toBuild()
            },
            toBuild: function () {
                // publish与draft提交的publish_status字段不一样
                // draft默认不应该对消息通知等进行处理
                // 可将公共处理部分写在此
                // 如没有草稿逻辑可自行做精简
            },
            get_achievement_post(achievement_id) {
                if (!achievement_id) return;
                let that = this;
                that.$http({
                    url: `${JX3BOX.__helperUrl}api/achievement/${achievement_id}/post`,
                    headers: {Accept: "application/prs.helper.v2+json"}
                }).then(res => {
                    this.post = res.data.data.post || {};
                }).catch(err => {
                    this.post = null;
                });
            },
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__ossMirror}icon/${icon_id}.png`;
                }
            },
            async search_achievements_handle(keyword) {
                this.search_loading = true;
                let data = await this.search_achievements(keyword, 10);
                this.achievements = data.achievements;
                this.search_loading = false;
            },
            // 成就搜索
            search_achievements(keyword, length) {
                let that = this;
                return new Promise((resolve, reject) => {
                    that.$http({
                        method: 'GET',
                        url: `${JX3BOX.__helperUrl}api/achievement/search`,
                        headers: {Accept: "application/prs.helper.v2+json"},
                        params: {keyword: keyword, limit: length}
                    }).then(function (data) {
                        data = data.data;
                        resolve(data.code === 200 ? data.data : false);
                    }, function () {
                        resolve(false);
                    });
                });
            }

            // 8.栏目本地相关方法
            // TODO:...
        },
        mounted: function () {
            // 初始化选项数据
            // TODO:栏目本地选项数据

            this.search_achievements_handle('');

            setTimeout(() => {
                this.$store.state.post.post_title = '66666';
                this.$store.state.post.post_content = '123123123';
                console.log(51234421, this.post)
            }, 1000);

            // 初始化文章数据,如果是编辑模式,则应加载对应内容
            if (location.search.indexOf('edit') >= 0) {
                this.loadOrigin()
            }

        },
        filters: {},
        components: {
            boilerplate,
        },
    };
</script>

<style lang="less">
    @import "../assets/css/publish/cj.less";
</style>
