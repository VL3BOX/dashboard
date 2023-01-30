<template>
    <div class="m-credit m-tasks">
        <h2 class="u-title"><i class="el-icon-coffee-cup"></i> 任务中心</h2>
        <div class="m-tasks-list" v-loading="loading">
            <div class="u-item" v-for="(item, index) in list" :key="index">
                <img class="u-img" :src="item.task.task_icon || defaultTaskIcon" :alt="item.task.action_type_desc" />
                <div class="u-box">
                    <div class="u-info">
                        <a class="u-title" :href="item.task.task_url" target="_blank">{{ item.task.action_type_desc }}</a>
                        <span class="u-desc">
                            {{item.task.task_detail}} ∕
                            <span v-for="(attr, key) in item.attr" :key="key" class="u-attr">
                                {{ attr_name[attr.name] }} +{{ attr.count }}
                            </span>
                        </span>
                    </div>
                    <div class="u-btn">
                        <el-button
                            size="small"
                            :type="item.hasFinish ? 'success' : 'warning'"
                            :disabled="item.hasFinish"
                            :icon="item.hasFinish && 'el-icon-check' || ''"
                            @click="checkFinish(item.task.id)"
                            >{{item.hasFinish ? '已完成' : '接受任务'}}</el-button
                        >
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
        defaultTaskIcon() {
            return __imgPath + "image/common/jx3box_black.svg";
        },
    },
    watch: {},
    methods: {
        // 加载任务列表
        loadTasks() {
            this.loading = true;
            getTasks({ is_limit_everyday: 0, os_visible: 1 })
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
<style lang="less">
@import "~@/assets/css/tasks.less";
</style>
