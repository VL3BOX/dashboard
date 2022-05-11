<template>
    <div class="m-credit m-tasks">
        <h2 class="u-title">
            <i class="el-icon-coffee-cup"></i> 我的任务
        </h2>
        <div class="m-tasks-list" v-loading="loading">
            <div class="u-item" v-for="(item,index) in list" :key="index">
                <img class="u-img" :src="imgPath" :alt="item.task.action_type_desc">
                <div class="u-box">
                    <div class="u-info">
                        <span class="u-title">{{item.task.action_type_desc}}</span>
                        <span class="u-desc">
                            <span v-for="(attr,key) in item.attr" :key="key" class="u-attr">
                                {{attr_name[attr.name]}}+{{attr.count}}
                            </span>
                        </span>
                    </div>
                    <div class="u-btn">
                        <el-button type="primary" :disabled="item.hasFinish" icon="el-icon-check" @click="checkFinish(item.task.id)">已完成</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getTasks, getCheckTasks } from "@/service/tasks.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "tasks",
    props: [],

    data: function () {
        return {
            loading: false,
            list: [],
            attr_name: {
                experience: "经验",
                points: "积分",
            },
        };
    },
    computed: {
        imgPath() {
            return __imgPath + "image/other/avatar.png";
        },
    },
    watch: {},
    methods: {
        // 加载任务列表
        loadTasks() {
            this.loading = true;
            getTasks()
                .then((res) => {
                    this.list = res.data.data.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 点击完成
        checkFinish(id) {
            getCheckTasks(id).then((res) => {
                if (res.data.data.hasFinish) {
                    this.$notify({
                        title: "成功",
                        message: "完成任务，获得奖励",
                        type: "success",
                    });
                    location.reload();
                } else {
                    this.$notify({
                        title: "提示",
                        message: "您没有完成任务",
                        type: "warning",
                    });
                }
            });
        },
    },
    mounted: function () {
        this.loadTasks();
    },
};
</script>
<style lang='less'>
    @import "~@/assets/css/tasks.less";
</style>