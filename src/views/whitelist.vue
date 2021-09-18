<template>
    <div class="m-dashboard m-dashboard-profile m-dashboard-work m-dashboard-whitelist m-whitelist">
        <div class="m-whitelist-primary" v-loading="loading">
            <h2 class="m-whitelist-title u-title">
                <i class="el-icon-ship"></i> 我的亲友
                <span
                    class="u-sort"
                    @click="isDraggable = !isDraggable"
                    :class="{on:isDraggable}"
                >
                    <i class="el-icon-sort"></i>
                    {{isDraggable ? '退出' : '开启'}}排序
                </span>
            </h2>

            <draggable
                class="m-whitelist-list u-list"
                :list="list"
                draggable=".u-item"
                v-bind="{ animation: 150, scrollSensitivity: 200 }"
                :disabled="!isDraggable"
                :class="{isDraggable:isDraggable}"
                @end="sort"
            >
                <transition-group type="transition">
                    <div class="u-item" v-for="(item,i) in list" :key="item.kith_id">
                        <a class="u-item-pic" :href="item.kith_id | authorLink" target="_blank">
                            <img
                                class="u-item-avatar"
                                :src="item.kith_info.user_avatar | showAvatar"
                            />
                            <!-- <i class="u-item-status el-icon-loading"></i> -->
                        </a>
                        <a
                            class="u-item-name"
                            :href="item.kith_id | authorLink"
                            target="_blank"
                        >{{ item.kith_info.display_name }}</a>
                        <span class="u-item-remark" v-if="item.status">备注：{{ item.remark || '无' }}</span>
                        <span class="u-item-remark" v-else>
                            <i class="el-icon-loading"></i> 等待确认中...
                        </span>
                        <div class="u-item-btns">
                            <el-popconfirm title="确认删除亲友关系吗？" @confirm="remove(item.kith_id,i)">
                                <el-button
                                    slot="reference"
                                    type="warning"
                                    size="mini"
                                    icon="el-icon-delete"
                                >删除</el-button>
                            </el-popconfirm>

                            <el-button
                                @click="edit(item.kith_id,item)"
                                size="mini"
                                icon="el-icon-edit"
                                class="u-btn-edit"
                            >编辑</el-button>
                        </div>
                    </div>
                </transition-group>
            </draggable>
        </div>
        <!-- 添加亲友 -->
        <div class="m-whitelist-sidebar">
            <div class="u-title">
                <i class="el-icon-news"></i> 添加亲友
            </div>
            <el-input
                class="u-input"
                v-model.number="uid"
                placeholder="输入UID添加"
                suffix-icon="el-icon-search"
                @keyup.enter.native="addKith"
            ></el-input>
            <div class="u-list" v-if="userdata">
                <div class="u-item">
                    <img
                        class="u-item-avatar"
                        :src="userdata.user_avatar | showAvatar"
                        :alt="userdata.display_name"
                    />
                    <div class="u-item-info">
                        <span class="u-item-uid">UID：{{ userdata.ID }}</span>
                        <b class="u-item-name">{{ userdata.display_name }}</b>
                    </div>
                </div>
            </div>
            <div class="u-null" v-if="isNull">
                <el-alert title="无搜索结果" type="info" show-icon :closable="false"></el-alert>
            </div>
            <div class="u-null" v-if="!isNewKith">
                <el-alert title="已添加过该亲友" type="info" show-icon :closable="false"></el-alert>
            </div>
            <el-button
                class="u-submit"
                type="success"
                :disabled="!allowAppend"
                @click="addKith"
            >添加亲友 ({{ total }} / {{ limit }})</el-button>
        </div>
    </div>
</template>
<script>
import {
    searchUserById,
    addKith,
    getKithList,
    editKith,
    removeKith,
    sortKith,
} from "@/service/whitelist.js";
import User from "@jx3box/jx3box-common/js/user.js";
import draggable from "vuedraggable";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "whitelist",
    props: [],
    data: function () {
        return {
            // 列表区
            isDraggable: false,
            list: [],
            loading: false,

            // 侧边栏
            uid: "",
            userdata: "",

            // 上限
            limit_map : {
                member : 5,
                vip : 20,
                pro : 100,
            },
            identity : 'member'
        };
    },
    computed: {
        allowAppend: function () {
            // 有搜索结果
            // 且未达到上限
            // 且未重复添加
            return this.userdata && (this.total < this.limit) && this.isNewKith
        },
        // 未重复
        isNewKith : function (){
            let kith_id = this.userdata?.ID
            return !this.currentIdList.includes(kith_id)
        },
        // 当前用户UID列表
        currentIdList : function (){
            return this.list.map((item) => {return item.kith_id})
        },
        // 上限
        limit: function () {
            return this.limit_map[this.identity] || 5
        },
        // 当前亲友总数
        total: function () {
            return this.list?.length;
        },
        // 当前排序索引
        sortArray: function () {
            let list = this.list;
            let len = list?.length;
            let _list = [];
            list.forEach((item, i) => {
                _list.push({
                    level: len - i,
                    kith_id: item.kith_id,
                });
            });
            return _list;
        },
        // 无搜索结果
        isNull: function () {
            return this.uid && !this.userdata;
        },
    },
    methods: {
        // 添加亲友
        addKith() {
            this.allowAppend && addKith(this.uid).then(() => {
                this.$notify({
                    title: "成功",
                    message: "添加成功",
                    type: "success",
                });
                this.list.push({
                    kith_id : this.uid,
                    level : 0,
                    status : 0,
                    kith_info : this.userdata
                })
            });
        },
        // 加载亲友列表
        loadList() {
            this.loading = true;
            getKithList()
                .then((res) => {
                    let list = res.data.data;
                    list = list.sort((a, b) => {
                        return b.level - a.level;
                    });
                    this.list = list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 删除亲友
        remove(kith_id, i) {
            removeKith(kith_id).then(() => {
                this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                });
                this.list.splice(i, 1);
            });
        },
        // 编辑备注
        edit(kith_id, item) {
            this.$prompt("请输入备注", "设置", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(({ value }) => {
                editKith(kith_id, { remark: value }).then(() => {
                    this.$notify({
                        title: "成功",
                        message: "编辑成功",
                        type: "success",
                    });
                    item.remark = value;
                });
            });
        },
        // 更新排序
        sort() {
            sortKith(this.sortArray).then(() => {
                this.$notify({
                    title: "成功",
                    message: "排序更新成功",
                    type: "success",
                });
            });
        },
    },
    watch: {
        uid: function (val) {
            if (!val || isNaN(val)) return;
            searchUserById(val).then((res) => {
                this.userdata = res.data.data;
            });
        },
    },
    mounted: function () {
        this.loadList();
        User.getAsset().then((asset) => {
            if(User._isPRO(asset)){
                this.identity = 'pro'
            }else if(User._isVIP(asset)){
                this.identity = 'vip'
            }else{
                this.identity = 'member'
            }
        });
    },
    filters: {
        showAvatar: function (val) {
            return showAvatar(val, 80);
        },
        authorLink,
    },
    components: { draggable },
};
</script>

<style scoped lang="less">
@import "../assets/css/whitelist.less";
</style>
