<template>
    <div class="m-publish-header">
        <el-page-header @back="goBack" :content="name"></el-page-header>
    </div>
</template>

<script>
export default {
    name: "pubheader",
    props: ["name"],
    data: function() {
        return {};
    },
    computed: {},
    methods: {
        goBack : function (){
            // TODO:切换路由
        }
    },
    mounted: function() {
    },
    components: {},
};
</script>


