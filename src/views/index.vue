<template>
    <div class="m-dashboard m-dashboard-index">
        <div class="m-basicinfo">
            <i class="u-avatar">
                <i class="u-avatar-avt"
                    ><img class="u-avatar-avt-pic" :src="avatar"
                /></i>
                <!-- TODO:头像框 <i class="u-avatar-frame"><img class="u-avatar-frame-pic" src="../assets/img/1.png" /></i> -->
            </i>
            <div class="u-info">
                <h1 class="u-name">
                    {{ name }}
                    <!-- TODO: <div class="u-level">等级</div> -->
                    
                </h1>
                <div class="u-uid">
                    <em>UID</em><b>{{ uid }}</b>
                    <i class="u-group" v-if="group > 60"
                        >({{ group | showGroupName }})</i
                    >
                    <!-- TODO:vip标识 -->
                </div>
                <div class="u-bio">{{ bio || "凭栏望千里，煮酒论江湖。" }}</div>
                <div class="u-medals">
                    <!-- TODO:个人勋章列表 -->
                </div>
            </div>
        </div>
        <!-- TODO: -->
        <!-- 盒币、积分余额 -->
        <!-- 充值&兑换 -->
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
        showGroupName: function(val) {
            return val ? JX3BOX.__userGroup[val] : "游客";
        },
    },
    mounted: function() {
        this.avatar = Utils.showAvatar(User.getInfo().avatar_origin, "l");

        let _info = User.getInfo();
        this.name = _info.name || "匿名";
        this.uid = _info.uid || 0;
        this.group = _info.group || 0;

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
