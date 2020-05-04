<template>
    <div class="m-publish-cj">
        <boilerplate
            :name="name"
            :localDraft="true"
            :mode="mode"
            :content="post.content"
            :tags="post.tags"
            :digest="post.digest"
            :notify_conf="notify_conf"
        >
        栏目特殊字段
        </boilerplate>
    </div>
</template>

<script>
const Article = require('../store/publish');
import boilerplate from "../components/publish/boilerplate";
export default {
    name: "cj",
    props: [],
    data: function() {
        return {
            name: "成就攻略",
            mode: "tinymce",
            post: {
                title: '',
                content: "测试内容",
                digest : '摘要内容',
                tags : []
            },
            notify_conf : {
                feedEnable: true,
                followEnable: true,
                weiboEnable : false,
                tuilanEnable:false
            }
        };
    },
    computed: {},
    methods: {
    },
    mounted: function() {
        Article.$on('title',data => {
            this.title = data
            console.log(data)
        })
    },
    components: {
        boilerplate
    },
};
</script>

<style lang="less">
    @import '../assets/css/publish/cj.less';
</style>