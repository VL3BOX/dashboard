<template>
    <div class="m-dashboard-publish-excerpt">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="摘要信息"
            v-model="textarea"
        >
        </el-input>
    </div>
</template>

<script>
    export default {
        name : 'excerpt',
        props:['digest'],
        data : function(){
            return {
                textarea : ''
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
        components : {
        }
    }
</script>

<style lang="less">
    .m-dashboard-publish-excerpt{
        .mt(10px);

        textarea{
            font-family: inherit;
        }
    }
</style>