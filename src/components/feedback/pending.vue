<template>
    <div class="m-feedback-list" v-loading="loading">
        <el-table
            :data="data"
            highlight-current-row
            size="small"
            @row-click="viewFeedback"
            row-class-name="u-row"
            @filter-change="filterChange"
        >
            <el-table-column label="状态" prop="status" column-key="status" :filters="filterOptions.status" :filter-multiple="false">
                <template #default="{ row }">
                    <span class="u-status" :style="{ backgroundColor: statusColors[row.status] }">{{
                        statusMap[row.status]
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column label="客户端" prop="client" column-key="client" :filters="filterOptions.client" :filter-multiple="false">
                <template #default="{ row }">
                    <span class="u-client" :class="'i-client-' + row.client">{{ formatClient(row.client) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="来源" prop="type">
                <template #default="{ row }">
                    {{ types[row.type] }}
                </template>
            </el-table-column>
            <el-table-column label="类型" prop="subtype">
                <template #default="{ row }">
                    {{ subtypes[row.subtype] }}
                </template>
            </el-table-column>
            <el-table-column label="指派给">
                <template #default="{ row }">
                    <div class="m-assign" v-if="row.assign_user && row.assign_user.length">
                        <a
                            class="u-assign"
                            :href="authorLink(assign.id)"
                            target="_blank"
                            v-for="assign in row.assign_user"
                            :key="assign.id"
                        >
                            <img class="u-assign-avatar" :src="showAvatar(assign.avatar)" />
                            <span class="u-assign-name">{{ assign.display_name }}</span>
                        </a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="提交时间" prop="created_at">
                <template #default="{ row }">
                    {{ formatTime(row.created_at) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template #default>
                    <el-button type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="m-credit-pages m-packet-pages"
            background
            :page-size="per"
            :hide-on-single-page="true"
            :current-page.sync="page"
            @current-change="currentChange"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
import { getMiscfeedback } from "@/service/feedback";
import { types, subtypes, statusMap, statusColors, filterOptions } from "@/assets/data/feedback.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import moment from "moment";
export default {
    name: "pendingList",
    props: {
        onlyMe: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            data: [],
            loading: false,
            page: 1,
            per: 10,
            total: 0,
            filterOptions,
            filters: {
                status: '',
                client: ''
            },

            types,
            subtypes,
            statusMap,
            statusColors,
        };
    },
    mounted() {
        this.getData();
    },
    computed: {
        user() {
            return User.getInfo();
        },
    },
    watch: {
        onlyMe() {
            this.page = 1;
            this.getData();
        },
    },
    methods: {
        showAvatar,
        authorLink,
        async getData() {
            try {
                this.loading = true;
                const params = {
                    pageIndex: this.page,
                    pageSize: this.per,
                    ...this.filters,
                };
                this.onlyMe && (params.assign = this.user.uid);
                let res = await getMiscfeedback(params);
                this.data = res.data.data.list || [];
                this.total = res.data.data.page.total;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }
        },
        formatTime(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        },
        formatClient(client) {
            const _client = client || "std";
            return _client === "std" ? "重制" : "缘起";
        },
        handleView(row) {
            window.open(`/dashboard/feedback/${row.id}`, "_blank");
        },
        currentChange(val) {
            this.page = val;
            this.getData();
        },
        viewFeedback: function (row) {
            window.open("/feedback/" + row.id, "_blank");
        },
        filterChange(filters) {
            Object.entries(filters).forEach(([key, value]) => {
                this.filters[key] = value.length ? value[0] : '';
            });

            this.getData();
        }
    },
};
</script>

<style lang="less" scoped>
.m-feedback-list {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .u-row * {
        .pointer !important;
    }

    .u-status {
        color: #fff;
        padding: 2px 5px;
        .r(2px);
    }
    .u-client {
        padding: 2px 5px;
        .r(2px);
    }

    .m-assign {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        .u-assign {
            display: flex;
            align-items: center;
            .u-assign-avatar {
                .size(24px);
                .r(100%);
                .mr(5px);
            }
        }
    }
}
</style>
