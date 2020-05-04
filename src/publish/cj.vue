<template>
    <div class="m-publish-cj">
        <!-- 💛 预设选项 -->
        <boilerplate

            :name="name"
            :localDraft="true"
            labelPostion="left"
            :title="post.title"

            mode="tinymce"
            :content="post.content"

            :excerptEnable="false"
            :excerpt="post.excerpt"

            :tagEnable="false"
            :tags="post.tags"

            :notifyEnable="false"
            :notify="notify"

            :bannerEnable="false"
            :banner="post.banner"

            @publish="toPublish"
            @draft="toDraft"
        >

        <!-- 💛 栏目字段 -->
            <!-- TODO:设置栏目特殊字段 -->
            <el-form-item label="标签">
                ...
            </el-form-item>

        </boilerplate>

    </div>
</template>

<script>
import boilerplate from "../components/publish/boilerplate";

// 依赖
// TODO:你的依赖

export default {
    name: "demo",
    props: [],
    data: function() {
        return {

            // TODO:4.选项数据设置
            // begin>>---------------------
            name: "成就攻略",

            //选项
            options: {
                xx : []
            },

            //取值
            info: {
                xx : ''
            },

            // <<end---------------------

            //文章
            post : {
                title : '',
                content : '',
                excerpt : '',
                tags : [],
                banner : ''
            },

            //部分栏目默认不要开启相关功能
            notify : {
                feedEnable: false,
                followEnable: false,
                weiboEnable: false,
                tuilanEnable: false,
            },
        };
    },
    computed: {},
    watch : {
        info : function (val){
            this.$store.commit('editInfo',val)
        }
    },
    methods: {
        // TODO:加载编辑内容,接口需要进行鉴权
        loadOrigin:function (){
            // ?edit=123
            // this.$axios.get(API,{
            //     params : {}
            // }).then((res) => {
            //     this.post.title = res.data.data.title 
            // })
        },

        // TODO:7.发布逻辑,拿store内容提交至对应接口
        toPublish:function (){
            console.log(this.$store.state)
            // this.toBuild()
        },
        toDraft : function (){
            console.log(this.$store.state)
            // this.toBuild()
        },
        toBuild : function (){
            // publish与draft提交的publish_status字段不一样
            // draft默认不应该对消息通知等进行处理
            // 可将公共处理部分写在此
            // 如没有草稿逻辑可自行做精简
        },

        // 8.栏目本地相关方法
        // TODO:...
    },
    mounted: function() {
        // 初始化选项数据
        // TODO:栏目本地选项数据

        // 初始化文章数据,如果是编辑模式,则应加载对应内容
        if(location.search.indexOf('edit') >= 0){
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
