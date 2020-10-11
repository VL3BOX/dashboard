<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <i class="u-avatar">
                <i class="u-avatar-avt"
                    ><img class="u-avatar-avt-pic" :src="avatar"
                /></i>
                <!-- <i class="u-avatar-frame"><img class="u-avatar-frame-pic" src="../assets/img/1.png" /></i> -->
            </i>
            <div class="u-info">
                <h1 class="u-name">{{ name }}</h1>
                <div class="u-uid">
                    <em>UID</em><b>{{ uid }}</b>
                    <i class="u-group"><img :src="group | groupicon"></i>
                </div>
                <!-- <div class="u-level">等级</div> -->
                <!-- <div class="u-credit">积分</div>  -->
                <!-- 盒币充值与打赏 -->
                <div class="u-join">加入于{{ join }}</div>
                <div class="u-bio">{{ bio }}</div>
            </div>
        </div>
        <!-- TODO: -->
        <!-- 勋章 -->
        <!-- 积分兑换商城 -->
    </div>
</template>

<script>
import { JX3BOX, User, Utils } from "@jx3box/jx3box-common";
import { getUserInfo } from "../service/profile";
import dateFormat from "../utils/dateFormat";

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
            bio: "",
        };
    },
    computed: {},
    methods: {},
    filters: {
        groupicon: function(groupid) {
            return JX3BOX.__imgPath + "image/group/" + groupid + ".svg";
        },
    },
    mounted: function() {
        this.avatar = Utils.showAvatar(User.getInfo().avatar_origin, "l");

        let _info = User.getInfo();
        this.name = _info.name;
        this.uid = _info.uid;
        this.group = _info.group;

        if (this.uid) {
            getUserInfo(this.uid).then((res) => {
                let data = res.data.data;
                this.join = dateFormat(new Date(data.user_registered));
                this.bio = data.user_bio;
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
