<template>
    <div class="m-publish-excerpt">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="摘要信息"
            v-model="post_excerpt"
            @change="done"
        >
        </el-input>
    </div>
</template>

<script>
    export default {
        name : 'post_excerpt',
        props:['excerpt'],
        data : function(){
            return {
                post_excerpt : this.excerpt
            }
        },
        computed:{},
        methods:{
            done : function (){
                this.$store.commit('editExcerpt',this.post_excerpt)
            }
        },
        mounted:function(){},
        components : {
        }
    }
</script>

<style lang="less">
    .m-publish-excerpt{
        .mt(10px);

        textarea{
            font-family: inherit;
        }
    }
</style>