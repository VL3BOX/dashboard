<template>
    <div class="m-dashboard-publish-fb">
        <boilerplate
            :name="name"
            :mode="mode"
            :title="post.title"
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
import boilerplate from "../components/publish/boilerplate";

export default {
    name: "fb",
    props: [],
    data: function() {
        return {
            name: "副本攻略",
            mode: "tinymce",
            post: {
                title: "",
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
    methods: {},
    mounted: function() {},
    components: {
        boilerplate
    },
};
</script>

<style lang="less">
@import "../assets/css/publish/fb.less";
</style>
