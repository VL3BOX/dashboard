<template>
    <div class="m-dashboard m-dashboard-index">

        <div class="m-basicinfo">
            <img :src="avatar" class="u-avatar">
            <h1 class="u-name">{{name}}</h1>
            <div class="u-uid"><em>UID : </em><b>{{uid}}</b></div>
            <div class="u-group"><em>Group : </em>{{group}}</div>
            <!-- <div class="u-level">等级</div> -->
            <!-- <div class="u-credit">积分</div> -->
        </div>
        
        <!-- 任务 -->

        <!-- 勋章 -->

        <!-- 积分兑换 -->

    </div>
</template>

<script>
const { User,JX3BOX,Utils } = require("@jx3box/jx3box-common");
    export default {
        name : 'index',
        props:[],
        data : function(){
            return {
                avatar : '',
                name : '',
                uid : '',
                group : ''
            }
        },
        computed:{},
        methods:{},
        mounted:function(){
            this.avatar = Utils.showAvatar(User.getInfo().avatar_origin,'l')
            this.name = User.getInfo().name
            this.uid = User.getInfo().uid
            this.group = JX3BOX.__userGroup[User.getInfo().group]
        },
    }
</script>

<style lang="less">
    @import '../assets/css/index.less';
</style>