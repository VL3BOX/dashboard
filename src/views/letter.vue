<!-- 私信系统 -->
<template>
    <uc class="m-dashboard-frame m-dashboard-skin" icon="el-icon-bell" title="我的消息" :tab-list="tabList">
        <div class="m-dashboard-letter" v-if="hasData">
            <div class="m-dashboard-letter__left">
                <div class="u-title">近期消息</div>
                <contact-list @update:contact="updateContact" @check:contacts="checkContacts" ref="contacts" />
            </div>
            <div class="m-dashboard-letter__right">
                <letter-list :contact="contact" @update:contact="letterUpdateContact" />
            </div>
        </div>
        <div class="u-null" v-else>
            <el-empty :image="emptyPng" description="这里什么都没有呢"></el-empty>
        </div>
    </uc>
</template>

<script>
// data
import { msgTab } from "@/assets/data/tabs.json";
// utils
import { cloneDeep } from "lodash";
// components
import uc from "@/components/uc.vue";
import contactList from "@/components/letter/contacts.vue";
import letterList from "@/components/letter/list.vue";
export default {
    name: "letter",
    components: {
        uc,
        contactList,
        letterList
    },
    data() {
        return {
            tabList: msgTab,
            hasData: true,

            contact: {}
        }
    },
    computed: {
        emptyPng() {
            return require("@/assets/img/null.png");
        }
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
        }
    }
}
</script>

<style lang="less">
@import "~@/assets/css/letter.less";
</style>
