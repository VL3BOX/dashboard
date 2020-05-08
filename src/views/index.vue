<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <i class="u-avatar">
                <i class="u-avatar-avt"><img class="u-avatar-avt-pic" :src="avatar" /></i>
                <!-- <i class="u-avatar-frame"><img class="u-avatar-frame-pic" src="../assets/img/1.png" /></i> -->
            </i>
            <h1 class="u-name">{{ name }}</h1>
            <!-- <i class="u-group"><img :src="group | groupicon"></i> -->
            <div class="u-uid">
                <em>UID</em><b>{{ uid }}</b>
            </div>
            <!-- <div class="u-level"></div> -->
            <!-- <div class="u-credit">积分</div> -->
            <div class="u-join">加入于{{ join }}</div>
            <div class="u-bio">{{ bio }}</div>
        </div>

        <!-- 任务 -->

        <!-- 勋章 -->

        <!-- 积分兑换 -->
    </div>
</template>

<script>
import dateFormat from '../utils/dateFormat'
const { User, JX3BOX, Utils } = require("@jx3box/jx3box-common");
const API = JX3BOX.__server;
// const API = "http://localhost:5160/";

export default {
    name: "index",
    props: [],
    data: function() {
        return {
            avatar: "",
            name: "",
            uid: "",
            group: 0,
            join: "",
            bio : ''
        };
    },
    computed: {},
    methods: {},
    filters:{
        groupicon : function (groupid){
            return JX3BOX.__ossMirror + 'image/group/' + groupid + '.svg'
        }
    },
    mounted: function() {
        this.avatar = Utils.showAvatar(User.getInfo().avatar_origin, "l");

        let _info = User.getInfo()
        this.name = _info.name;
        this.uid = _info.uid;
        this.bio = _info.bio;
        this.group = _info.group

        this.$axios
            .get(API + "user/info", {
                params: {
                    uid: 8, //this.uid
                },
            })
            .then((res) => {
                this.join = dateFormat(new Date(res.data.data.created_at));
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
