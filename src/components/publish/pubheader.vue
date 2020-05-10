<template>
    <div class="m-publish-header">
        <el-page-header @back="goBack" :content="name"></el-page-header>
        <div class="m-publish-store" v-if="localDraft">
            <el-button
                type="primary"
                icon="el-icon-folder"
                @click="openDraftBox"
                >本地历史存档</el-button
            >
            <el-dialog
                class="c-large-dialog"
                title="本地备份"
                :visible.sync="dialogVisible"
            >
                <!-- 清空按钮 -->
                <el-button
                    class="u-clear"
                    plain
                    icon="el-icon-delete"
                    size="small"
                    @click="clear"
                    >清空</el-button
                >
                <el-table :data="tableData" class="m-publish-store-list">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <h2>{{ props.row.title }}</h2>
                            <p>{{ props.row.content }}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="缓存标识" prop="key">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="useDraft(scope.$index, scope.row.key)"
                                >使用</el-button
                            >
                            <el-button
                                size="mini"
                                type="danger"
                                @click="
                                    deleteDraft(scope.$index, scope.row.key)
                                "
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="closeDraftBox"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { DB, savePost } from "../../utils/autoSave";

export default {
    name: "pubheader",
    props: ["name", "localDraft"],
    data: function() {
        return {
            dialogVisible: false,
            selectedCount: 0,
            tableData: [],
        };
    },
    computed: {},
    methods: {
        goBack: function() {
            this.$alert(
                "当前页面内容将丢失,但仍可在本地历史存档中找到",
                "提醒",
                {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        savePost(this.name, this.$store.state);
                        this.$root.$router.push("/");
                    },
                }
            );
        },
        openDraftBox: function() {
            this.dialogVisible = true;
            this.loadDrafts();
        },
        closeDraftBox: function() {
            this.dialogVisible = false;
        },
        loadDrafts: function() {
            this.tableData = [];
            //当草稿超过50篇时,自动清空
            DB.length().then((len) => {
                if(len > 50) DB.clear()
            })

            DB.iterate((val, key, i) => {
                this.tableData.push({
                    key: key,
                    title: val.post.post_title,
                    content: val.post.post_content,
                });
            })
                .then(function() {
                    console.log("[IDB] Iteration has completed");
                })
                .catch(function(err) {
                    console.log(err);
                });
        },
        clear: function() {
            this.$alert("确认清除全部缓存归档么", "信息", {
                confirmButtonText: "确定",
                callback: (action) => {
                    DB.clear();
                    this.tableData = [];
                },
            });
        },
        useDraft: function(i, key) {
            DB.getItem(key).then((data) => {
                this.$store.replaceState(data);
                this.closeDraftBox();
            });
        },
        deleteDraft: function(i, key) {
            this.tableData.splice(i, 1);
            DB.removeItem(key);
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/components/large-dialog.less";
.m-publish-header {
    .pr;
    .clearfix;
}
.m-publish-store {
    .pa;
    .rt(0);
    .u-clear {
        .pa;
        .lt(100px, 16px);
    }
    .m-publish-store-list {
        .el-table__header-wrapper {
            tr th:nth-child(3) {
                .x(right);
            }
        }
        .el-table__body {
            td:last-child .cell {
                .fr;
            }
        }
    }
}
</style>
