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
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insert">{{
                        buttonTXT
                    }}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
const { savePost } = require("../../utils/autoSave");
export default {
    name: "pubheader",
    props: ["name", "localDraft"],
    data: function() {
        return {
            dialogVisible: false,
            selectedCount: 0,
        };
    },
    computed: {
        buttonTXT: function() {
            return this.selectedCount ? "插 入" : "确 定";
        },
    },
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
    .fr;
    .pa;
    .rt(0);
}
</style>
