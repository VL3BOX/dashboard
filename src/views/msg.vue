<template>
    <div class="m-dashboard m-dashboard-msg">
        消息列表
        https://github.com/notifications

        状态：未读，已读
        消息收到日期
        消息内容
        消息类别/子类别
    </div>
</template>

<script>
    export default {
        name : 'msg',
        props:[],
        data : function(){
            return {
                
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
    }
</script>

<style lang="less">
    @import '../assets/css/msg.less';
</style>