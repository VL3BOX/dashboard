<template>
    <div class="m-feedback-erase">
        <div class="m-feedback-article">
            <div v-html="article"></div>
        </div>
        <div class="u-tips">
            <el-checkbox v-model="agree">我已知晓并同意上述规则</el-checkbox>
            <el-button size="small" type="danger" :disabled="!agree" @click="handleConfirm">确认注销</el-button>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { getArticle } from "@jx3box/jx3box-common/js/api_misc";
export default {
    name: "FeedbackErase",
    data() {
        return {
            agree: false,

            article: '',
        };
    },
    mounted() {
        this.loadAlertInfo();
    },
    methods: {
        handleConfirm() {
            this.$confirm("所有财富（例如盒币，红包，积分等将永远无法再使用，也不会退回），本账号绑定的邮箱手机等不可用于再次注册, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "注销成功",
                    });
                    // User.destroy();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        loadAlertInfo() {
            getArticle(43049).then((res) => {
                this.article = res;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.m-feedback-erase {
    .m-feedback-article {
        padding: 20px;
        font-size: 14px;
        color: #666;
        line-height: 1.5;
    }

    .u-tips {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
}
</style>
