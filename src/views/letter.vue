<!-- 私信系统 -->
<template>
    <uc class="m-dashboard-frame m-dashboard-skin" icon="el-icon-bell" :title="$t('我的消息')" :tab-list="tabList">
        <div class="m-dashboard-letter" v-if="hasData">
            <div class="m-dashboard-letter__left">
                <div class="u-title">{{ $t('近期消息') }} <span class="u-limit">{{ $t('每日上限') + total_limit + $t('条') }}</span></div>
                <contact-list
                    @update:contact="updateContact"
                    @check:contacts="checkContacts"
                    ref="contacts"
                    :can-op="canOp"
                />
            </div>
            <div class="m-dashboard-letter__right">
                <letter-list :contact="contact" @update:contact="letterUpdateContact" :can-op="canOp" />
            </div>
        </div>
        <div class="u-null" v-else>
            <el-empty :image="emptyPng" :description="$t('这里什么都没有呢~')"></el-empty>
        </div>
    </uc>
</template>

<script>
// data
import { msgTab } from "@/assets/data/tabs.json";
// utils
import { cloneDeep } from "lodash";
import { getMyInfo } from "@/service/index.js";
// components
import uc from "@/components/uc.vue";
import contactList from "@/components/letter/contacts.vue";
import letterList from "@/components/letter/list.vue";
import User from "@jx3box/jx3box-common/js/user";
import { getConfig } from "@/service/letter";
export default {
    name: "letter",
    components: {
        uc,
        contactList,
        letterList,
    },
    data() {
        return {
            tabList: msgTab,
            hasData: true,
            info: {
                uid: 8,
                name: this.$t("匿名"),
                user_avatar: "https://img.jx3box.com/image/common/avatar.png",
                user_avatar_frame: "default",
                bio: "-",
                sign: 0,
                experience: 0,
            },

            contact: {},
            total_limit: 0,
        };
    },
    computed: {
        emptyPng() {
            return require("@/assets/img/null.png");
        },
        userLevel() {
            return User.getLevel(this.info?.experience || 0);
        },
        canOp() {
            return this.userLevel >= 3;
        },
    },
    mounted() {
        this.loadUserInfo();
        this.loadConf();
    },
    methods: {
        // 更新联系人
        updateContact(item) {
            this.contact = cloneDeep(item);
        },
        checkContacts(hasData) {
            this.hasData = hasData;
        },
        letterUpdateContact() {
            this.$refs.contacts?.getContacts();
        },

        loadUserInfo: function () {
            getMyInfo().then((res) => {
                if (res.data.data) {
                    this.info = res.data.data;
                }
            });
        },
        loadConf() {
            getConfig({ key: "private_letter_everyday_count_limit" }).then((res) => {
                this.total_limit = ~~res.data.data.val;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/letter.less";
</style>
